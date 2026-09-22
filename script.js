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

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copiado: ${text}`);
    } catch {
      showToast("Não foi possível copiar");
    }
  };

  document.querySelectorAll("[data-copy]").forEach((btn) =>
    btn.addEventListener("click", () => copy(btn.dataset.copy))
  );

  // Paleta de comandos
  const go = (hash) => () => document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
  const open = (url) => () => window.open(url, "_blank", "noopener");

  const commands = [
    { group: "Navegação", label: "Início", hint: "#", run: go("#inicio") },
    { group: "Navegação", label: "Skills", hint: "#", run: go("#skills") },
    { group: "Navegação", label: "Contato", hint: "#", run: go("#contato") },
    { group: "Contato", label: "Copiar e-mail", hint: "gmail", run: () => copy("lucase616@gmail.com") },
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
      li.innerHTML = `<span></span><small></small>`;
      li.firstChild.textContent = cmd.label;
      li.lastChild.textContent = cmd.hint;
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
    filtered = commands.filter((c) => normalize(`${c.label} ${c.group} ${c.hint}`).includes(q));
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
    } else if (e.key === "Escape" && !palette.hidden) {
      closePalette();
    }
  });

  document.querySelectorAll("[data-open-palette]").forEach((b) => b.addEventListener("click", openPalette));
  document.querySelectorAll("[data-close-palette]").forEach((b) => b.addEventListener("click", closePalette));
})();
