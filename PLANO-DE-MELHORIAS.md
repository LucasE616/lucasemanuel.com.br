# Plano de melhorias — lucasemanuel.com.br

Análise feita em 24/10/2026 sobre o commit `65afb94` da `main`. Objetivo: transformar o site num
portfólio **seguro, profissional e coeso**, com um ciclo de desenvolvimento parecido com o de uma
empresa (branches, PR, code review, CI e URL de dev), **sério, mas sem perder as partes divertidas**.

> Acompanhamento: o status de cada item é atualizado no mesmo PR que o conclui.
>
> Este arquivo é interno. Depois da Fase 2, ele fica fora da pasta publicada (`site/`).

Status: ⬜ a fazer · 🟡 em andamento · ✅ feito

---

## Princípios

1. **O site mostra o Lucas, não o site.** Em 30 segundos, um recrutador precisa achar: quem é, o que faz,
   projetos (provas) e contato.
2. **Diversão é opcional.** Terminal, jogos, `/cli` e tema jornal ficam, mas nunca no caminho principal.
3. **Nada entra na `main` sem PR e CI verde.**
4. **Sem dependências em produção.** Ferramentas de lint, teste e build entram só como `devDependencies`;
   o site publicado continua HTML, CSS e JavaScript puros.
5. **Não usar Next.js nem Vercel** (decisão anterior mantida).

---

## Diagnóstico resumido

| Área | Situação atual | Problema |
|---|---|---|
| Conteúdo | Sem página de projetos | Portfólio sem provas do trabalho |
| Conteúdo | Hero e skills: JavaScript, C, Python, Node.js | Não mostra a stack do cargo atual de back-end |
| Conteúdo | Currículo com 4 vínculos sobrepostos em 2025–2026 | Sem explicação, parece erro |
| Conteúdo | `/servicos` no menu principal (formatação a R$ 25, Office 2010/2007) | Destoa de "Dev Back-end"; Office 2010 sem suporte desde 2020 |
| Visual | 4 linguagens visuais e 4–5 fontes; dois cabeçalhos diferentes | Falta de identidade única |
| Código | `<style>` falso `.mmf` só para o makemefindable | Código escrito para agradar uma ferramenta |
| Segurança | GitHub Pages não permite cabeçalhos HTTP | Sem CSP, HSTS, anti-clickjacking etc. |
| Segurança | `CLAUDE.md` e `ROADMAP.md` publicados no domínio | Notas internas expostas sem necessidade |
| Segurança | `/cli` mostra o Gmail em texto puro | Incoerente com o "mostrar e-mail" do site |
| Segurança | Commits com o Gmail pessoal | E-mail coletável pela API do GitHub |
| Processo | 86 commits direto na `main`, uma branch, sem CI | Nenhuma prova de processo profissional |

---

## Fase 1 — Higiene da conta e do repositório (≈ 1 dia)

- ⬜ Ativar **2FA** na conta do GitHub.
- ⬜ Usar o e-mail **noreply** do GitHub nos commits:
  ```bash
  git config --global user.email "<id>+LucasE616@users.noreply.github.com"
  ```
  E marcar em Settings → Emails: "Keep my email addresses private" e "Block command line pushes that expose my email".
- ⬜ Ativar **Secret scanning** e **Push protection** (Settings → Code security). Grátis em repositório público.
- ⬜ Ativar **Dependabot** só para GitHub Actions (`.github/dependabot.yml`).
- ✅ Adicionar `LICENSE`. Feito em 25/10/2026, MIT simples.
- ✅ Adicionar `SECURITY.md`. Feito em 25/10/2026, com relato privado pelo GitHub (sem expor e-mail).
- ⬜ Ativar **Private vulnerability reporting** (Settings → Code security), que o `SECURITY.md` usa.
- ✅ Remover o Gmail em texto puro do `/cli`. Feito em 25/10/2026: agora aponta para `/#contato`.

**Pronto quando:** 2FA ativo, novo commit aparece com o e-mail noreply e o secret scanning está ligado.

---

## Fase 2 — Infraestrutura: build, ambientes e cabeçalhos

### 2.1 Estrutura de pastas

- ✅ Mover tudo o que é publicado para `site/`. Na raiz ficam só arquivos do projeto. Feito em 25/10/2026.

```
lucasemanuel.com.br/
├── .github/
│   ├── workflows/ci.yml
│   ├── pull_request_template.md
│   ├── CODEOWNERS
│   └── dependabot.yml
├── scripts/
│   └── build.mjs
├── tests/
├── site/                 ← único conteúdo publicado
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── _headers
│   ├── 404.html, robots.txt, sitemap.xml, cli, favicon.svg, og-image.png
│   ├── fonts/  setup/  curriculo/  servicos/  terminal/  jogos/
├── CLAUDE.md  ROADMAP.md  PLANO-DE-MELHORIAS.md  README.md
├── CONTRIBUTING.md  SECURITY.md  LICENSE  CHANGELOG.md
└── package.json
```

- ✅ `CNAME` e `.nojekyll` removidos (25/10/2026), depois da migração para o Cloudflare Pages.

### 2.2 Script de build

- ✅ Criar `scripts/build.mjs`: copia `site/` para `dist/` e troca o `?v=` manual por um hash. Feito em 25/10/2026.
  A versão final usa **um hash único** de todos os CSS e JS (não um por arquivo), porque os jogos repassam o `?v=`
  de um arquivo para outro. No código-fonte, os HTMLs usam `?v=dev`. O código abaixo foi a proposta inicial; a fonte
  da verdade é o `scripts/build.mjs`.
  Isso elimina a regra de "aumentar o `?v=` em todos os HTMLs".

```js
// scripts/build.mjs — copia site/ para dist/ e versiona CSS e JS pelo conteúdo
import { cp, rm, readFile, writeFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";

const SRC = "site";
const OUT = "dist";
const ASSET = /((?:\.\.\/|\.\/|\/)?[\w\-./]+?\.(?:css|js))\?v=[\w.]+/g;

await rm(OUT, { recursive: true, force: true });
await cp(SRC, OUT, { recursive: true });

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

const cache = new Map();
async function hashOf(file) {
  if (!cache.has(file)) {
    const buf = await readFile(file);
    cache.set(file, createHash("sha256").update(buf).digest("hex").slice(0, 10));
  }
  return cache.get(file);
}

for await (const html of htmlFiles(OUT)) {
  let text = await readFile(html, "utf8");
  for (const [match, ref] of [...text.matchAll(ASSET)]) {
    const file = ref.startsWith("/") ? join(OUT, ref) : join(dirname(html), ref);
    text = text.replace(match, `${ref}?v=${await hashOf(file)}`);
  }
  await writeFile(html, text);
}

console.log("Build concluído em dist/");
```

### 2.3 Hospedagem com ambientes (Cloudflare Pages)

Troca o GitHub Pages pelo Cloudflare Pages ligado ao repositório. Resolve de uma vez a URL de dev, os
previews de PR e os cabeçalhos de segurança. Também cobre os itens 35 e 40 do ROADMAP.

- ✅ Passar o DNS do Registro.br para o Cloudflare. Feito em 25/10/2026 (nameservers `newt` e `raquel`).
- ✅ Criar o projeto no Cloudflare Pages (`lucasemanuel`), conectado ao GitHub. Feito em 25/10/2026, primeiro sem build
  (raiz) e, junto com o PR da pasta `site/`, com a configuração abaixo:
  - Comando de build: `node scripts/build.mjs`
  - Pasta de saída: `dist`
  - Branch de produção: `main`
  - Previews: todas as outras branches
- ✅ Domínios: produção (`lucasemanuel.com.br` e `www`) em 25/10/2026 e `dev.` → alias `develop` em 27/10/2026.

| Branch | Endereço | Papel |
|---|---|---|
| `main` | `lucasemanuel.com.br` | Produção |
| `develop` | `dev.lucasemanuel.com.br` | Homologação |
| PR / outras | `<hash>.<projeto>.pages.dev` | Preview automático para revisão |

  Para o `dev.`, apontar um CNAME para o alias da branch (`develop.<projeto>.pages.dev`); conferir o passo a passo
  atual na documentação do Cloudflare Pages.
- ⬜ Redirecionar `www` → raiz com 301.
- ✅ GitHub Pages despublicado em 25/10/2026, depois de validar a produção no Cloudflare.

### 2.4 Cabeçalhos de segurança (`site/_headers`)

- ⬜ Mover o script de tema inline para um arquivo **ou** calcular o hash dele para o CSP.
- ✅ Remover o `<style>` `.mmf`. Feito em 25/10/2026, por decisão do Lucas: código mais limpo; o aviso do makemefindable volta.
- ⬜ Criar o `_headers`:

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-<hash do script de tema>'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; worker-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()

https://:project.pages.dev/*
  X-Robots-Tag: noindex

https://dev.lucasemanuel.com.br/*
  X-Robots-Tag: noindex
```

Observações:
- O JSON-LD (`type="application/ld+json"`) não é executado e não é bloqueado pelo CSP.
- O `worker-src 'self'` cobre o Web Worker das damas.
- Começar o HSTS sem `preload`; só adicionar depois de semanas sem problemas.
- Validar com `securityheaders.com` e com o console do navegador (erros de CSP) em todas as páginas,
  incluindo `/terminal` e `/jogos`.

**Pronto quando:** produção servida pelo Cloudflare, `dev.` funcionando, PR gera preview, `/CLAUDE.md`
dá 404 e o securityheaders.com dá nota A.

---

## Fase 3 — Processo: branches, PR, review e CI

### 3.1 Estratégia de branches

```
feature/<nome>  ─┐
fix/<nome>      ─┼─► PR ► develop (dev.) ─► PR de release ► main (produção) ─► tag vX.Y.Z
docs/<nome>     ─┘
hotfix/<nome>   ─────────────────────────► PR ► main  (e depois merge de volta em develop)
```

- ✅ Criar a branch `develop` a partir da `main` (27/10/2026). Ela é a branch padrão do repositório.
- ✅ Nomes de branch: `feature/pagina-projetos`, `fix/cabecalho-estoura`, `docs/readme`, `chore/ci` (no `CONTRIBUTING.md`).

### 3.2 Regras do GitHub (Settings → Rules → Rulesets)

- 🟡 Ruleset para `main` e `develop` (27/10/2026: "Proteção da main e develop", alvos pelo nome). Falta exigir os checks
  do CI (Fase 3.4). Ajuste em relação à proposta: **sem histórico linear** e com **merge commit** liberado, porque as
  releases `develop` → `main` usam merge commit:
  - Exigir Pull Request antes do merge.
  - Exigir checks verdes do CI (`validar`).
  - Exigir branch atualizada antes do merge.
  - Bloquear force push e exclusão.
  - Exigir histórico linear (squash merge).
- ✅ Aprovações: decisão do Lucas (25/10/2026): **ele mesmo revisa e faz o merge**, com 0 aprovações obrigatórias, sem
  revisor automático. Opções avaliadas:
  - 0 aprovações obrigatórias + checks obrigatórios (mais simples para projeto solo);
  - revisor automático (Copilot code review ou Claude Code GitHub Action) comentando cada PR;
  - convidar um colega como revisor e exigir 1 aprovação.
- ✅ `.github/CODEOWNERS` (25/10/2026):
  ```
  * @LucasE616
  ```

### 3.3 Template de PR (`.github/pull_request_template.md`) — ✅ 25/10/2026, versão sem preview

```markdown
## O que muda
<!-- Resumo em 1–3 frases -->

## Por quê
<!-- Issue relacionada: Closes #123 -->

## Como testar
1. Abrir o preview do PR
2. ...

## Checklist
- [ ] Testei no preview (desktop e celular)
- [ ] Testei nos temas claro e escuro
- [ ] Sem erros no console (inclusive de CSP)
- [ ] Acessibilidade: navegação por teclado e `prefers-reduced-motion`
- [ ] CHANGELOG atualizado (se for mudança visível)

## Capturas de tela
<!-- Antes / depois, se for visual -->
```

### 3.4 CI (`.github/workflows/ci.yml`)

- ⬜ Criar `package.json` só com `devDependencies` e os scripts `lint`, `test` e `build`.
- ⬜ Ferramentas sugeridas: `html-validate`, `stylelint`, `eslint`, `prettier --check`, `lychee` (links),
  `@playwright/test` + `@axe-core/playwright` (fumaça e acessibilidade), `@lhci/cli` (Lighthouse).
- ⬜ Testes unitários com `node:test` para `velha-ia.js` e `damas-ia.js` (o minimax vira prova técnica).

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main, develop]

permissions:
  contents: read

jobs:
  validar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4        # fixar por SHA depois
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint                # html-validate, stylelint, eslint, prettier --check
      - run: npm test                    # node:test (IAs dos jogos)
      - run: npm run build
      - uses: lycheeverse/lychee-action@v2
        with:
          args: --offline --no-progress dist
      - run: npx playwright install --with-deps chromium
      - run: npm run test:e2e            # fumaça + axe em todas as páginas
```

- ⬜ Fixar as actions por SHA do commit (boa prática de segurança da cadeia de suprimentos).
- ⬜ Lighthouse CI com metas mínimas (ex.: 90 em desempenho, 100 em acessibilidade e boas práticas).

### 3.5 Convenções

- ✅ **Conventional Commits** (em uso desde o PR #1): `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.
  Ex.: `feat(projetos): página de projetos com dados em JSON`.
- ⬜ **Versionamento semântico** com tags (`v1.0.0`) e **GitHub Releases**.
- ⬜ `CHANGELOG.md` no formato *Keep a Changelog*.
- ✅ `CONTRIBUTING.md` (25/10/2026; fluxo com `develop`, release e hotfix em 27/10/2026) descrevendo o fluxo acima (serve de documentação do processo para quem visita o repo).
- ⬜ Migrar os itens abertos do `ROADMAP.md` para **Issues**, com labels (`conteúdo`, `visual`, `segurança`,
  `bug`, `processo`, `playground`) e um quadro no **GitHub Projects** (A fazer / Em andamento / Em revisão / Feito).
  O ROADMAP pode continuar como registro de decisões.

**Pronto quando:** nenhum push direto na `main` é aceito, todo PR tem preview e CI, e existe a tag `v1.0.0`.

---

## Fase 4 — Conteúdo coerente

### 4.1 Projetos (item 1 do ROADMAP — passa a ser prioridade)

- ⬜ Criar `/projetos` com 3 a 4 projetos. Para cada um:
  - problema → solução → stack → o que aprendeu → links (repositório, demo);
  - dados em `site/data/projetos.json` (já preparando o item 21).
- ⬜ Incluir **o próprio site** como estudo de caso: arquitetura, fluxo de PR, CI, cabeçalhos e badge do CI.
- ⬜ Candidatos: `servidor-http`, `ged-offline`, `encrypt`, `FutebolAPI`, IAs dos jogos.
- ⬜ Adicionar "Projetos" ao menu principal e ao terminal (`projetos`).

### 4.2 Hero e skills

- ⬜ Revisar a stack do hero e das skills para refletir o trabalho atual de back-end
  (ex.: Java, Vue.js, AWS, Grafana), separando "uso no trabalho" de "estudo".
- ⬜ Adicionar uma frase de proposta de valor no hero (o que você resolve, não só o cargo).
- ⬜ Manter o "Pressione Ctrl K" e mostrar uma alternativa visível no celular.

### 4.3 Currículo

- ⬜ Explicar os vínculos sobrepostos de 2025–2026 (PJ, meio período, freelance).
- ⬜ Conferir a descrição repetida de e-paper e Rlv Tecnologia.
- ⬜ Trocar "Entendimento em…" por evidência (ex.: "Scrum e Kanban no projeto X").
- ⬜ Mover *A Teoria da Relatividade* e o livro do Manual do Mundo para "Outras leituras".
- ⬜ Completar datas, carga horária e links de verificação dos cursos (pendência do item 24).

### 4.4 Serviços

- ✅ Tirar "Serviços" do menu principal. Feito em 25/10/2026: fica no rodapé, na paleta e no atalho V.
- ✅ Remover versões específicas de software. Feito em 25/10/2026: "pacote Office".
- ⬜ Deixar "Desenvolvimento" como primeiro bloco e com mais destaque que formatação.

**Pronto quando:** um recrutador encontra projetos, stack atual e contato em até 30 segundos a partir da home.

---

## Fase 5 — Identidade visual única

- ⬜ Definir **dois modos**:
  - **Sério:** home, projetos, currículo e serviços — um cabeçalho, uma paleta, no máximo 3 fontes.
  - **Playground:** terminal, jogos, `/cli` e tema jornal — liberdade visual total.
- ⬜ Centralizar os tokens (cores, espaçamentos, raios, tamanhos) no topo do `style.css` e documentá-los.
- ⬜ Unificar o cabeçalho: a home passa a ter a mesma caixa "Buscar… Ctrl K" das outras páginas.
- ⬜ Fontes do modo sério: Verdana, Times New Roman e JetBrains Mono. Chomsky só no tema jornal.
- ⬜ Arquivar a Michelangelus (item 48) até a identidade estar fechada.
- ⬜ Corrigir o cabeçalho que estoura a largura (item 38).

---

## Fase 6 — Playground (a parte divertida, organizada)

- ⬜ Item "Lab" (ou "Playground") no menu agrupando terminal, jogos e `/cli`.
- ⬜ Aba **"Como a IA pensa"** (item 30): minimax e poda alfa-beta explicados, com link para o código e os testes.
- ⬜ Easter eggs no terminal, ex.: `sudo contratar` (abre o contato), `git blame lucas`, `man lucas`.
- ⬜ Corrigir os bugs do terminal (itens 31 e 32) com teste automatizado para cada um.
- ⬜ Manter o `printf("página feita com muito café ☕\n");`.

---

## Ordem de execução

| # | Fase | Esforço | Depende de |
|---|---|---|---|
| 1 | Higiene | baixo | — |
| 2 | Infraestrutura (build, Cloudflare Pages, `_headers`) | médio | 1 |
| 3 | Processo (branches, rulesets, CI) | médio | 2 |
| 4 | Conteúdo (projetos, skills, currículo, serviços) | médio | 3 (já entra por PR) |
| 5 | Identidade visual | médio | 4 |
| 6 | Playground | baixo a médio | 3 |

Depois disso, seguir o ROADMAP: área administrativa (21), versão em inglês (8) e back-end (40 a 44).
O item 40 (Cloudflare) fica praticamente resolvido pela Fase 2.

---

## Primeiros PRs sugeridos

1. `chore/estrutura-site` — mover arquivos para `site/` e criar `scripts/build.mjs`.
2. `chore/ci` — `package.json`, linters e `ci.yml`.
3. `feat/headers-seguranca` — `_headers`, script de tema em arquivo, remoção do `.mmf`.
4. `docs/processo` — `CONTRIBUTING.md`, template de PR, `CODEOWNERS`, `SECURITY.md`, `LICENSE`, `CHANGELOG.md`.
5. `feat/pagina-projetos` — primeira entrega de conteúdo já no fluxo novo.
