(() => {
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  if (isMac) document.querySelectorAll(".key-mod").forEach((k) => (k.textContent = "⌘"));

  // Toast + copiar
  const toast = document.getElementById("toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  };

  // navigator.clipboard só existe em contexto seguro (HTTPS), daí o plano B
  const legacyCopy = (text) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:-9999px";
    document.body.appendChild(ta);
    const previous = document.activeElement;
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
    previous?.focus?.();
    return ok;
  };

  const copy = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast(`Copiado: ${text}`);
        return;
      }
    } catch {
      // cai no plano B abaixo
    }
    showToast(legacyCopy(text) ? `Copiado: ${text}` : "Não foi possível copiar");
  };

  // Delegado para funcionar também nas cópias do conteúdo dentro do modal
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy]");
    if (btn) copy(btn.dataset.copy);
  });

  // Páginas: a home tem o README e o modal; as outras (ex.: /setup) apontam para a
  // raiz via data-root e mandam Skills/Contato para a home, que abre o modal pelo hash.
  const root = document.body.dataset.root || "./";
  const page = document.body.dataset.page || "home";
  const isHome = page === "home";

  // Tema: "light", "dark" ou "system" (padrão). O <head> já aplicou o tema antes de desenhar;
  // aqui ficam o menu, a troca e o acompanhamento do sistema quando a escolha é "Sistema".
  const html = document.documentElement;
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const prefersLight = matchMedia("(prefers-color-scheme: light)");
  const themeNames = { light: "claro", dark: "escuro", system: "do sistema" };

  const getThemePref = () => {
    try {
      const pref = localStorage.getItem("theme");
      return pref === "light" || pref === "dark" ? pref : "system";
    } catch {
      return "system";
    }
  };

  const applyTheme = () => {
    const pref = getThemePref();
    const theme = pref === "system" ? (prefersLight.matches ? "light" : "dark") : pref;
    html.dataset.theme = theme;
    themeMeta?.setAttribute("content", theme === "light" ? "#faf7f0" : "#08070b");
    document
      .querySelectorAll("[data-theme-choice]")
      .forEach((b) => b.setAttribute("aria-checked", String(b.dataset.themeChoice === pref)));
    document.querySelector(".theme-toggle")?.setAttribute("aria-label", `Tema ${themeNames[pref]}`);
  };

  const setTheme = (pref) => {
    try {
      if (pref === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", pref);
    } catch {
      // armazenamento bloqueado: o tema muda só nesta visita
    }
    applyTheme();
  };

  prefersLight.addEventListener("change", () => getThemePref() === "system" && applyTheme());
  applyTheme();

  const themeToggle = document.querySelector(".theme-toggle");
  const themeMenu = document.getElementById("theme-menu");
  const themeItems = [...document.querySelectorAll("[data-theme-choice]")];

  const closeThemeMenu = (returnFocus = false) => {
    if (!themeMenu || themeMenu.hidden) return false;
    themeMenu.hidden = true;
    themeToggle.setAttribute("aria-expanded", "false");
    if (returnFocus) themeToggle.focus();
    return true;
  };

  const openThemeMenu = () => {
    themeMenu.hidden = false;
    themeToggle.setAttribute("aria-expanded", "true");
    (themeItems.find((b) => b.getAttribute("aria-checked") === "true") || themeItems[0]).focus();
  };

  themeToggle?.addEventListener("click", () => (themeMenu.hidden ? openThemeMenu() : closeThemeMenu()));
  themeItems.forEach((b) =>
    b.addEventListener("click", () => {
      setTheme(b.dataset.themeChoice);
      closeThemeMenu(true);
    })
  );
  themeMenu?.addEventListener("keydown", (e) => {
    const i = themeItems.indexOf(document.activeElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (i + (e.key === "ArrowDown" ? 1 : -1) + themeItems.length) % themeItems.length;
      themeItems[next].focus();
    } else if (e.key === "Tab") {
      closeThemeMenu();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".theme-switch")) closeThemeMenu();
  });

  // Data da "edição" no README em estilo de jornal (tema claro)
  const today = new Date();
  document.querySelectorAll("[data-today]").forEach((el) => {
    const text = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(today);
    el.textContent = text.charAt(0).toUpperCase() + text.slice(1);
    el.dateTime = today.toISOString().slice(0, 10);
  });

  // Modal dos tópicos: o conteúdo vem do README ([data-topic]), sem duplicar HTML
  const topics = {
    skills: { title: "Skills", file: "skills.md" },
    contato: { title: "Contato", file: "contato.md" },
  };

  const modal = document.getElementById("modal");
  const modalBox = modal?.querySelector(".modal-box");
  const modalTitle = document.getElementById("modal-title");
  const modalFile = document.getElementById("modal-file");
  const modalContent = document.getElementById("modal-content");
  const modalClose = modal?.querySelector(".modal-close");
  let modalReturnFocus = null;

  const openTopic = (name) => () => {
    const source = document.querySelector(`[data-topic="${name}"]`);
    if (!modal || !source) {
      location.href = `${root}#${name}`;
      return;
    }
    const clone = source.cloneNode(true);
    clone.removeAttribute("data-topic");
    clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));

    modalTitle.textContent = topics[name].title;
    modalFile.textContent = topics[name].file;
    modalContent.replaceChildren(clone);

    if (modal.hidden) {
      modalReturnFocus = document.activeElement;
      modal.hidden = false;
      document.body.classList.add("modal-open");
    }
    modalContent.parentElement.scrollTop = 0;
    modalClose.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    modalReturnFocus?.focus?.();
  };

  const goHome = () => {
    if (!isHome) {
      location.href = root;
      return;
    }
    closeModal();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goSetup = () => {
    if (page === "setup") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    location.href = `${root}setup/`;
  };

  const navActions = { "#inicio": goHome, "#skills": openTopic("skills"), "#contato": openTopic("contato") };

  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const action = navActions[a.getAttribute("href")];
      if (!action) return;
      e.preventDefault();
      action();
    })
  );

  document.querySelectorAll("[data-close-modal]").forEach((b) => b.addEventListener("click", closeModal));

  // Vindo de outra página (ex.: /setup → Skills), abre o modal pedido e limpa o hash
  if (isHome && topics[location.hash.slice(1)]) {
    openTopic(location.hash.slice(1))();
    history.replaceState(null, "", location.pathname + location.search);
  }

  // Mantém o Tab dentro do modal enquanto ele estiver aberto
  modal?.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusables = [...modalBox.querySelectorAll("a[href], button:not([disabled])")];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Paleta de comandos
  const open = (url) => () => window.open(url, "_blank", "noopener");

  const commands = [
    { group: "Navegação", label: "Início", key: "I", run: goHome },
    { group: "Navegação", label: "Skills", key: "S", run: openTopic("skills") },
    { group: "Navegação", label: "Contato", key: "C", run: openTopic("contato") },
    { group: "Navegação", label: "Setup", key: "U", run: goSetup },
    { group: "Tema", label: "Tema claro", hint: "light", run: () => setTheme("light") },
    { group: "Tema", label: "Tema escuro", hint: "dark", run: () => setTheme("dark") },
    { group: "Tema", label: "Tema do sistema", hint: "system", run: () => setTheme("system") },    { group: "Contato", label: "Copiar e-mail", hint: "gmail", run: () => copy("lucase616@gmail.com") },
    { group: "Contato", label: "Enviar e-mail", hint: "gmail", run: () => (location.href = "mailto:lucase616@gmail.com") },
    { group: "Contato", label: "Copiar e-mail (Yahoo)", hint: "yahoo", run: () => copy("lucase393@yahoo.com") },
    { group: "Contato", label: "Conversar no WhatsApp", hint: "(38) 99813-0581", run: open("https://wa.me/5538998130581") },
    { group: "Contato", label: "Copiar telefone", hint: "(38) 99813-0581", run: () => copy("(38) 99813-0581") },
    { group: "Redes", label: "GitHub", hint: "lucase616", run: open("https://github.com/lucase616") },
    { group: "Redes", label: "LinkedIn", hint: "in", run: open("https://www.linkedin.com/in/lucas-emanuel-santos-martins-105304242/") },
    { group: "Redes", label: "Instagram", hint: "@lucase616", run: open("https://instagram.com/lucase616") },
  ];

  const palette = document.getElementById("palette");
  const input = document.getElementById("palette-input");
  const list = document.getElementById("palette-list");
  let filtered = commands;
  let active = 0;
  let lastFocus = null;

  const normalize = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  const render = () => {
    list.innerHTML = "";
    if (!filtered.length) {
      list.innerHTML = '<li class="palette-empty">Nenhum resultado</li>';
      return;
    }
    let group = null;
    filtered.forEach((cmd, i) => {
      if (cmd.group !== group) {
        group = cmd.group;
        const g = document.createElement("li");
        g.className = "palette-group";
        g.setAttribute("role", "presentation");
        g.textContent = group;
        list.appendChild(g);
      }
      const li = document.createElement("li");
      li.className = "palette-item";
      li.id = `cmd-${i}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(i === active));
      li.innerHTML = cmd.key ? `<span></span><kbd></kbd>` : `<span></span><small></small>`;
      li.firstChild.textContent = cmd.label;
      li.lastChild.textContent = cmd.key || cmd.hint;
      li.addEventListener("mousemove", () => setActive(i));
      li.addEventListener("click", () => execute(i));
      list.appendChild(li);
    });
    input.setAttribute("aria-activedescendant", `cmd-${active}`);
  };

  const setActive = (i) => {
    if (i === active) return;
    active = i;
    list.querySelectorAll(".palette-item").forEach((el, idx) => el.setAttribute("aria-selected", String(idx === i)));
    input.setAttribute("aria-activedescendant", `cmd-${i}`);
    document.getElementById(`cmd-${i}`)?.scrollIntoView({ block: "nearest" });
  };

  const openPalette = () => {
    lastFocus = document.activeElement;
    palette.hidden = false;
    input.value = "";
    filtered = commands;
    active = 0;
    render();
    input.focus();
  };

  const closePalette = () => {
    palette.hidden = true;
    lastFocus?.focus?.();
  };

  const execute = (i) => {
    const cmd = filtered[i];
    if (!cmd) return;
    closePalette();
    cmd.run();
  };

  input.addEventListener("input", () => {
    const q = normalize(input.value.trim());
    filtered = commands.filter((c) => normalize(`${c.label} ${c.group} ${c.hint || ""}`).includes(q));
    active = 0;
    render();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((active + 1) % filtered.length || 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((active - 1 + filtered.length) % filtered.length || 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(active);
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.hidden ? openPalette() : closePalette();
    } else if (e.key === "Escape") {
      // Esc fecha primeiro o que estiver por cima: menu de tema, paleta, depois modal
      if (closeThemeMenu(true)) return;
      if (!palette.hidden) closePalette();
      else closeModal();
    }
  });

  // Atalhos de uma tecla (I, S, C) — ignorados enquanto se digita ou com a paleta aberta.
  // Com o modal aberto continuam valendo: S/C trocam o tópico e I fecha e volta ao topo.
  const shortcuts = Object.fromEntries(commands.filter((c) => c.key).map((c) => [c.key.toLowerCase(), c]));

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat || !palette.hidden) return;
    const t = e.target;
    if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    const cmd = shortcuts[e.key.toLowerCase()];
    if (!cmd) return;
    e.preventDefault();
    cmd.run();
  });

  document.querySelectorAll("[data-open-palette]").forEach((b) => b.addEventListener("click", openPalette));
  document.querySelectorAll("[data-close-palette]").forEach((b) => b.addEventListener("click", closePalette));

  // Setup: alternância Lista/Grade (lembrada no navegador) e seção atual destacada no sumário
  if (page === "setup") {
    const viewButtons = document.querySelectorAll("[data-view]");
    const setView = (view) => {
      document.querySelectorAll(".items").forEach((ul) => ul.classList.toggle("is-grid", view === "grid"));
      viewButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
      try {
        localStorage.setItem("setup-view", view);
      } catch {
        // navegação privada ou armazenamento bloqueado: só não lembra a escolha
      }
    };

    let savedView = null;
    try {
      savedView = localStorage.getItem("setup-view");
    } catch {
      // idem
    }
    setView(savedView === "grid" ? "grid" : "list");
    viewButtons.forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));

    // A seção atual é a última cujo topo já passou um pouco abaixo do cabeçalho
    const tocLinks = [...document.querySelectorAll(".toc a")];
    const sections = tocLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const header = document.querySelector(".site-header");
    const markCurrent = () => {
      const line = header.offsetHeight + 120;
      let current = sections[0];
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= line) current = s;
      });
      // No fim da página, a última seção pode não chegar à linha: marca ela mesmo assim
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1];
      }
      tocLinks.forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === `#${current.id}`)));
    };
    if (sections.length) {
      markCurrent();
      window.addEventListener("scroll", markCurrent, { passive: true });
    }
  }
})();
