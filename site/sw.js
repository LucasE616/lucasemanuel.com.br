// Service worker do PWA (item 51 do ROADMAP): deixa o site instalável e abrindo sem internet.
//
// - Páginas (HTML): rede primeiro. Online, o visitante sempre vê a versão nova, e a cópia fica guardada;
//   offline, abre a cópia guardada ou, se a página nunca foi visitada, a página /offline/.
// - CSS e JS com ?v=: cache primeiro. O build troca o ?v= a cada mudança, então a URL nova nunca está no cache velho.
// - Outros arquivos do site (fontes, ícones, imagens): devolve o que está guardado e atualiza por trás.
// - Outros domínios (API do GitHub), pedidos com cache "no-store" (ping do terminal) ou com outra query: não mexe.
//
// O build (scripts/build.mjs) troca os dois "dev" abaixo:
// - VERSION: o ?v= dos CSS e JS, o mesmo das páginas;
// - BUILD: um hash de todos os arquivos publicados. Qualquer mudança no site (até só num HTML) muda este arquivo,
//   o navegador instala o service worker novo e ele guarda as páginas de novo.
// Com "dev" (servidor local sobre a pasta site/), o service worker não guarda nada, para não servir CSS e JS velhos
// durante o desenvolvimento. Para testar o cache: node scripts/build.mjs e py -m http.server 5500 -d dist.

const VERSION = "dev";
const BUILD = "dev";
const CACHE = `le-${BUILD}`;
const DEV = VERSION === "dev";
const OFFLINE = "/offline/";

const PAGES = ["/", "/setup/", "/curriculo/", "/servicos/", "/jogos/", "/terminal/", OFFLINE];
const VERSIONED = [
  "/style.css",
  "/theme.js",
  "/script.js",
  "/jogos/velha-ia.js",
  "/jogos/jogos.js",
  "/jogos/damas-ia.js",
  "/jogos/damas-worker.js",
  "/jogos/damas.js",
  "/jogos/carrinho.js",
  "/terminal/terminal.js",
].map((path) => `${path}?v=${VERSION}`);
const FILES = [
  "/favicon.svg",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/fonts/jetbrains-mono-latin.woff2",
  "/fonts/jetbrains-mono-latin-ext.woff2",
  "/fonts/chomsky.woff2",
];

// Uma resposta que veio de um redirecionamento não pode responder a uma navegação: copia só o conteúdo
const clean = async (res) =>
  res.redirected ? new Response(await res.blob(), { status: res.status, statusText: res.statusText, headers: res.headers }) : res;

// Páginas são guardadas sem a query (?t=...), para /setup/?x e /setup/ serem a mesma cópia
const pageKey = (url) => url.origin + url.pathname;

self.addEventListener("install", (event) => {
  if (DEV) return self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await Promise.all(
        [...PAGES, ...VERSIONED, ...FILES].map(async (path) => {
          const res = await fetch(path, { cache: "reload" });
          if (!res.ok) throw new Error(`${path}: ${res.status}`);
          await cache.put(path, await clean(res));
        })
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.filter((name) => name.startsWith("le-") && name !== CACHE).map((name) => caches.delete(name)));
      await self.clients.claim();
    })()
  );
});

const isPage = (req, url) => req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith(".html");

const networkFirst = async (req, url) => {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok && res.type === "basic" && !res.redirected) cache.put(pageKey(url), res.clone()).catch(() => {});
    return res;
  } catch (err) {
    const cached = await cache.match(pageKey(url));
    if (cached) return cached;
    if (req.mode === "navigate") {
      const offline = await cache.match(OFFLINE);
      if (offline) return offline;
    }
    throw err;
  }
};

const cacheFirst = async (req) => {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok && res.type === "basic") cache.put(req, res.clone()).catch(() => {});
  return res;
};

const staleWhileRevalidate = async (req, event) => {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  const update = fetch(req).then((res) => {
    if (res.ok && res.type === "basic") cache.put(req, res.clone()).catch(() => {});
    return res;
  });
  if (cached) {
    event.waitUntil(update.catch(() => {}));
    return cached;
  }
  return update;
};

self.addEventListener("fetch", (event) => {
  if (DEV) return;
  const req = event.request;
  if (req.method !== "GET" || req.cache === "no-store") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isPage(req, url)) return event.respondWith(networkFirst(req, url));

  const params = [...url.searchParams.keys()];
  if (params.length === 1 && params[0] === "v") return event.respondWith(cacheFirst(req));
  if (params.length === 0) return event.respondWith(staleWhileRevalidate(req, event));
});
