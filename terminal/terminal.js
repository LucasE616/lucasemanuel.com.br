// Site em linha de comando (item 23 do ROADMAP).
// Os comandos são uma lista fechada (objeto `cmds`): nada do que o visitante digita passa por eval.
// O conteúdo (skills, contatos, setup) é lido das páginas do próprio site, sem duplicar dados.
(() => {
  const screen = document.getElementById("term-screen");
  const form = document.getElementById("term-form");
  const input = document.getElementById("term-input");
  const promptEl = document.getElementById("term-prompt");
  const titleEl = document.querySelector(".term-title");

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FIRST_COMMIT = new Date("2026-09-22T11:52:24-03:00");
  const REPO = "LucasE616/lucasemanuel.com.br";
  const USER = "lucas@lucasemanuel";

  // ---------- Saída ----------
  const h = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  };
  const span = (cls, text) => h("span", cls, text);
  const link = (href, text) => {
    const a = h("a", "t-link", text ?? href);
    a.href = href;
    if (/^https?:/.test(href)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    return a;
  };

  const scrollDown = () => {
    screen.scrollTop = screen.scrollHeight;
  };
  const print = (...parts) => {
    const line = h("div", "t-out");
    parts.forEach((p) => line.append(p instanceof Node ? p : document.createTextNode(String(p))));
    screen.insertBefore(line, form);
    scrollDown();
    return line;
  };
  const say = (text, cls) => print(cls ? span(cls, text) : text);
  const blank = () => print("");
  const clearScreen = () => [...screen.children].filter((c) => c !== form).forEach((c) => c.remove());

  // ---------- Tempo e animação ----------
  let busy = false;
  let aborted = false;
  let fast = false; // pula a animação de boot ao apertar qualquer tecla
  class Abort extends Error {}
  const sleep = (ms) =>
    new Promise((resolve, reject) =>
      setTimeout(() => (aborted ? reject(new Abort()) : resolve()), reduced || fast ? 0 : ms)
    );

  const uptime = () => {
    const mins = Math.max(0, Math.floor((Date.now() - FIRST_COMMIT.getTime()) / 60000));
    const d = Math.floor(mins / 1440);
    const hr = Math.floor((mins % 1440) / 60);
    return `${d} ${d === 1 ? "dia" : "dias"}, ${hr} h, ${mins % 60} min`;
  };
  const dateFmt = (d) =>
    new Intl.DateTimeFormat("pt-BR", { dateStyle: "full", timeStyle: "medium" }).format(d);

  // ---------- Dados do site ----------
  const txt = (el) => (el ? el.textContent.trim().replace(/\s+/g, " ") : "");
  const parseDoc = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url}: ${res.status}`);
    return new DOMParser().parseFromString(await res.text(), "text/html");
  };

  let dataPromise = null;
  const loadData = () => {
    dataPromise ??= (async () => {
      const [home, setup] = await Promise.all([parseDoc("../"), parseDoc("../setup/")]);
      const contacts = [...home.querySelectorAll('[data-topic="contato"] .contacts li')].map((li) => ({
        label: txt(li.querySelector(".label")),
        links: [...li.querySelectorAll(".value a")].map((a) => ({ text: txt(a), href: a.getAttribute("href") })),
      }));
      // Redes para `open`: pelo rótulo (GitHub, LinkedIn, Instagram) e o link "WhatsApp"
      const socials = {};
      contacts.forEach((c) =>
        c.links.forEach((l) => {
          if (/^https?:/.test(l.href)) socials[(l.text === "WhatsApp" ? l.text : c.label).toLowerCase()] = l.href;
        })
      );
      const data = {
        name: txt(home.querySelector(".hero h1")),
        role: txt(home.querySelector(".hero .role")),
        stack: txt(home.querySelector(".hero .stack")),
        greeting: txt(home.querySelector(".readme-body h2")).replace(/\s*👋$/, ""),
        langs: [...home.querySelectorAll('[data-topic="skills"] .tags li')].map(txt),
        exp: [...home.querySelectorAll('[data-topic="skills"] .list li')].map(txt),
        contacts,
        socials,
        email: contacts.flatMap((c) => c.links).find((l) => l.href.startsWith("mailto:"))?.text,
        printf: txt(home.querySelector(".printf code")),
        setup: [...setup.querySelectorAll(".paper-section")].map((s) => ({
          id: s.id,
          title: txt(s.querySelector("h2")),
          items: [...s.querySelectorAll(".items li")].map((li) => ({
            name: txt(li.querySelector(".item-name")),
            tag: txt(li.querySelector(".item-tag")),
          })),
          featured: s.querySelector(".featured")
            ? {
                name: txt(s.querySelector(".featured-name")),
                specs: [...s.querySelectorAll(".specs > div")].map((d) => [txt(d.querySelector("dt")), txt(d.querySelector("dd"))]),
              }
            : null,
        })),
      };
      return data;
    })().catch((err) => {
      dataPromise = null;
      throw err;
    });
    return dataPromise;
  };

  // ---------- Conteúdo ----------
  const showSkills = (d) => {
    say("Linguagens & tecnologias", "t-head");
    print(d.langs.map((l) => `[${l}]`).join(" "));
    blank();
    say("Experiência", "t-head");
    d.exp.forEach((e) => print(span("t-accent", "  ◆ "), e));
  };

  const showContato = (d, hint = true) => {
    d.contacts.forEach((c) => {
      const parts = [span("t-dim", c.label.padEnd(10))];
      c.links.forEach((l, i) => {
        if (i) parts.push("  ");
        parts.push(link(l.href, l.text));
      });
      print(...parts);
    });
    if (hint) say("Dica: copy email copia o e-mail; open github abre a rede.", "t-dim");
  };

  const showSetupSection = (s) => {
    say(s.title, "t-head");
    if (s.featured) {
      print(span("t-accent", "  ◆ "), s.featured.name);
      s.featured.specs.forEach(([k, v]) => print(span("t-dim", `      ${k.padEnd(14)}`), v));
    }
    s.items.forEach((it) => print(span("t-accent", "  ◆ "), it.name, "  ", span("t-dim", it.tag)));
  };

  const showSetup = (d) =>
    d.setup.forEach((s, i) => {
      if (i) blank();
      showSetupSection(s);
    });

  const HELLO_C = [
    "#include <stdio.h>",
    "",
    "int main(void) {",
    '    printf("página feita com muito café ☕\\n");',
    "    return 0;",
    "}",
  ];

  const showReadme = (d) => {
    say(`# ${d.greeting}`, "t-head");
    say(`${d.role}  |  ${d.stack}`, "t-dim");
    blank();
    showSkills(d);
    blank();
    say("Contato", "t-head");
    showContato(d, false);
    blank();
    say(d.printf, "t-dim");
  };

  // ---------- Sistema de arquivos fictício ----------
  const dir = (children) => ({ dir: true, children });
  const file = (show) => ({ show });
  let fs = null;
  let cwd = [];

  const buildFs = (d) =>
    dir({
      "README.md": file(() => showReadme(d)),
      "contato.md": file(() => showContato(d)),
      "hello.c": file(() => HELLO_C.forEach((l) => say(l))),
      skills: dir({
        "linguagens.md": file(() => print(d.langs.map((l) => `[${l}]`).join(" "))),
        "experiencia.md": file(() => d.exp.forEach((e) => print(span("t-accent", "  ◆ "), e))),
      }),
      setup: dir(Object.fromEntries(d.setup.map((s) => [`${s.id}.md`, file(() => showSetupSection(s))]))),
    });

  const resolve = (p) => {
    let parts = cwd.slice();
    let rest = p;
    if (rest.startsWith("/") || rest.startsWith("~")) {
      parts = [];
      rest = rest.replace(/^(~|\/)/, "");
    }
    for (const seg of rest.split("/").filter(Boolean)) {
      if (seg === ".") continue;
      if (seg === "..") parts.pop();
      else parts.push(seg);
    }
    let node = fs;
    for (const seg of parts) {
      node = node.dir ? node.children[seg] : undefined;
      if (!node) return null;
    }
    return { node, parts };
  };

  const cwdLabel = () => "~" + cwd.map((s) => `/${s}`).join("");
  const setPrompt = () => {
    const text = mode ? mode.prompt : `${USER}:${cwdLabel()}$`;
    promptEl.textContent = text;
    if (titleEl) titleEl.textContent = mode ? mode.title : `lucas@lucasemanuel: ${cwdLabel()}`;
  };

  const lsLine = (node) => {
    const names = Object.keys(node.children).sort();
    const parts = [];
    names.forEach((n, i) => {
      if (i) parts.push("  ");
      parts.push(node.children[n].dir ? span("t-accent", `${n}/`) : n);
    });
    print(...parts);
  };

  const treeLines = (node, prefix = "") => {
    const names = Object.keys(node.children).sort();
    names.forEach((n, i) => {
      const last = i === names.length - 1;
      const child = node.children[n];
      print(span("t-dim", prefix + (last ? "└── " : "├── ")), child.dir ? span("t-accent", `${n}/`) : n);
      if (child.dir) treeLines(child, prefix + (last ? "    " : "│   "));
    });
  };

  // ---------- Modos (python, vim) ----------
  let mode = null;
  const pythonMode = {
    prompt: ">>>",
    title: "python",
    handle: (line) => {
      const p = line.match(/^print\((["'])(.*)\1\)$/);
      if (p) return say(p[2]);
      const canned = {
        "1 + 1": "2",
        "2 + 2": "4",
        "import this": "Bonito é melhor que feio. Explícito é melhor que implícito. Simples é melhor que complexo.",
        "import antigravity": "xkcd.com/353: voando com Python.",
        "help": "Este REPL só tem respostas prontas. Tente print(\"oi\"), 2 + 2 ou exit().",
      };
      if (Object.hasOwn(canned, line)) return say(canned[line]);
      if (line === "exit()" || line === "quit()") {
        mode = null;
        return setPrompt();
      }
      say("NameError: este mini REPL não executa código. Tente print(\"oi\"), 2 + 2 ou exit().", "t-err");
    },
  };
  const vimMode = {
    prompt: ":",
    title: "vim",
    handle: (line) => {
      if (/^:(q!?|wq|x)$/.test(line)) {
        mode = null;
        setPrompt();
        return say("Você conseguiu sair. Parabéns.", "t-dim");
      }
      say("-- INSERT --  (dica clássica: tente :q)", "t-dim");
    },
  };

  // ---------- Utilidades ----------
  const distance = (a, b) => {
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return dp[a.length][b.length];
  };

  const copyText = (text) => {
    // Reaproveita o manipulador de [data-copy] do script.js (toast e plano B fora do HTTPS)
    const b = h("button");
    b.dataset.copy = text;
    document.body.append(b);
    b.click();
    b.remove();
  };

  const progress = async (label) => {
    const bar = print("");
    for (let i = 0; i <= 20; i++) {
      bar.textContent = `${label} [${"#".repeat(i)}${".".repeat(20 - i)}] ${i * 5}%`;
      scrollDown();
      await sleep(60);
    }
  };

  const matrix = () =>
    new Promise((resolve) => {
      if (reduced) {
        say("matrix: animação desativada (prefers-reduced-motion).", "t-dim");
        return resolve();
      }
      const canvas = h("canvas", "term-matrix");
      const ctx = canvas.getContext("2d");
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      document.body.append(canvas);
      const size = 16;
      const drops = Array(Math.ceil(canvas.width / size)).fill(0);
      const glyphs = "アイウエオカキクケコ0123456789ABCDEF".split("");
      const stop = () => {
        clearInterval(timer);
        removeEventListener("keydown", stop);
        canvas.removeEventListener("click", stop);
        canvas.remove();
        resolve();
      };
      const started = Date.now();
      const timer = setInterval(() => {
        if (aborted || Date.now() - started > 10000) return stop();
        // Efeito fixo (preto e verde), independente do tema
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#50fa7b";
        ctx.font = `${size}px monospace`;
        drops.forEach((y, i) => {
          ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * size, y * size);
          drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
        });
      }, 50);
      addEventListener("keydown", stop);
      canvas.addEventListener("click", stop);
    });

  // ---------- Comandos ----------
  const HELP = [
    ["Conteúdo", [
      ["whoami", "nome e cargo"],
      ["cat README.md", "apresentação, como na home"],
      ["skills", "linguagens e experiência"],
      ["contato", "contatos com links clicáveis"],
      ["copy email", "copia o e-mail"],
      ["setup", "equipamentos e ferramentas"],
      ["open <rede>", "github, linkedin, instagram ou whatsapp"],
    ]],
    ["Navegação", [
      ["ls, cd, pwd, tree", "explorar as \"pastas\" do site"],
      ["cat <arquivo>", "ler um arquivo"],
    ]],
    ["Terminal", [
      ["history, clear", "histórico e limpar a tela (Ctrl+L)"],
      ["theme <claro|escuro|sistema>", "troca o tema"],
      ["exit ou gui", "volta ao site visual"],
    ]],
  ];

  const cmds = {
    help: async () => {
      HELP.forEach(([title, rows], i) => {
        if (i) blank();
        say(title, "t-head");
        rows.forEach(([c, d]) => print(span("t-accent", `  ${c.padEnd(30)}`), d));
      });
      blank();
      say("Tem mais comandos escondidos. Tab autocompleta e ↑/↓ percorre o histórico.", "t-dim");
    },

    whoami: async () => {
      const d = await loadData();
      say(d.name, "t-head");
      print(d.role);
      say(d.stack, "t-dim");
    },

    skills: async () => showSkills(await loadData()),
    contato: async () => showContato(await loadData()),
    setup: async () => showSetup(await loadData()),

    copy: async (args) => {
      if (args[0] !== "email") return say("uso: copy email", "t-err");
      const d = await loadData();
      copyText(d.email);
    },

    open: async (args) => {
      const d = await loadData();
      const key = (args[0] || "").toLowerCase();
      const url = d.socials[key];
      if (!url) return say(`uso: open <${Object.keys(d.socials).join("|")}>`, "t-err");
      say(`Abrindo ${url}`, "t-dim");
      window.open(url, "_blank", "noopener");
    },

    ls: async (args) => {
      await loadData();
      const target = resolve(args.find((a) => !a.startsWith("-")) || ".");
      if (!target) return say(`ls: não foi possível acessar '${args.find((a) => !a.startsWith("-"))}': arquivo ou diretório inexistente`, "t-err");
      if (!target.node.dir) return say(args.find((a) => !a.startsWith("-")));
      lsLine(target.node);
    },

    cd: async (args) => {
      await loadData();
      const target = resolve(args[0] || "~");
      if (!target) return say(`cd: ${args[0]}: arquivo ou diretório inexistente`, "t-err");
      if (!target.node.dir) return say(`cd: ${args[0]}: não é um diretório`, "t-err");
      cwd = target.parts;
      setPrompt();
    },

    pwd: async () => say(`/home/lucas${cwdLabel().slice(1)}`),

    tree: async (args) => {
      await loadData();
      const target = resolve(args[0] || ".");
      if (!target?.node.dir) return say(`tree: ${args[0]}: diretório inexistente`, "t-err");
      say(args[0] || ".", "t-accent");
      treeLines(target.node);
    },

    cat: async (args) => {
      await loadData();
      if (!args[0]) return say("cat: falta o operando (tente: cat README.md)", "t-err");
      const target = resolve(args[0]);
      if (!target) return say(`cat: ${args[0]}: arquivo ou diretório inexistente`, "t-err");
      if (target.node.dir) return say(`cat: ${args[0]}: é um diretório`, "t-err");
      target.node.show();
    },

    history: async () => history.forEach((c, i) => print(span("t-dim", String(i + 1).padStart(4)), `  ${c}`)),
    clear: async () => clearScreen(),

    theme: async (args) => {
      const map = { claro: "light", light: "light", escuro: "dark", dark: "dark", sistema: "system", system: "system" };
      const choice = map[(args[0] || "").toLowerCase()];
      if (!choice) return say("uso: theme <claro|escuro|sistema>", "t-err");
      document.querySelector(`[data-theme-choice="${choice}"]`)?.click();
      input.focus();
    },

    exit: async () => {
      say("Voltando ao site visual…", "t-dim");
      location.href = "../";
    },
    gui: async () => cmds.exit(),

    // ----- Linux -----
    neofetch: async () => {
      const d = await loadData();
      const nb = d.setup.find((s) => s.id === "notebook")?.featured;
      const spec = (k) => nb?.specs.find(([n]) => n === k)?.[1];
      const logo = [" _        ", "| |       ", "| |   ___ ", "| |  / _ \\", "| | |  __/", "|_|  \\___|", "          "];
      const info = [
        [`${USER}`, ""],
        ["-".repeat(USER.length), ""],
        ["Host: ", nb?.name],
        ["CPU: ", spec("CPU")],
        ["GPU: ", spec("GPU")],
        ["Memória: ", spec("RAM")],
        ["Uptime: ", `${uptime()} (desde o primeiro commit)`],
        ["Site: ", "lucasemanuel.com.br"],
      ];
      info.forEach(([k, v], i) => print(span("t-accent", (logo[i] ?? " ".repeat(10)) + "  "), span("t-head", k), v ?? ""));
    },
    sudo: async (args) =>
      say(args.length ? "lucas não está no arquivo sudoers. Este incidente será reportado." : "uso: sudo <comando>", args.length ? "t-err" : ""),
    rm: async (args) =>
      say(args.includes("/") ? "rm: recusado. Boa tentativa, mas aqui nada é apagado." : "rm: operação não permitida: sistema de arquivos somente leitura.", "t-err"),
    uname: async () => say("Linux lucasemanuel 6.1.0-portfolio #1 SMP PREEMPT x86_64 GNU/Linux"),
    man: async (args) => {
      if (args[0] !== "lucas") return say(`Nenhuma entrada de manual para ${args[0] || "(nada)"}. Tente: man lucas`, "t-err");
      const d = await loadData();
      say("LUCAS(1)                     Manual do Portfólio", "t-head");
      blank();
      say("NOME", "t-head");
      print(`    lucas - ${d.role}`);
      say("SINOPSE", "t-head");
      print("    lucas [--skills] [--contato] [--setup]");
      say("STACK", "t-head");
      print(`    ${d.stack}`);
      say("VEJA TAMBÉM", "t-head");
      print("    help(1), skills(1), contato(1), setup(1)");
    },
    fortune: async () => {
      const quotes = [
        "Funciona na minha máquina.",
        "Existem só duas coisas difíceis em computação: invalidar cache, dar nome às coisas e erros de off-by-one.",
        "Primeiro faça funcionar, depois faça bonito, depois faça rápido.",
        "Se está no README, não é bug: é feature documentada.",
      ];
      say(quotes[Math.floor(Math.random() * quotes.length)]);
    },
    cowsay: async (args) => {
      const t = args.join(" ") || "Muuu";
      print(
        [
          ` ${"_".repeat(t.length + 2)}`,
          `< ${t} >`,
          ` ${"-".repeat(t.length + 2)}`,
          "        \\   ^__^",
          "         \\  (oo)\\_______",
          "            (__)\\       )\\/\\",
          "                ||----w |",
          "                ||     ||",
        ].join("\n")
      );
    },
    top: async () => {
      say("PID  USUÁRIO  %CPU  %MEM  COMANDO", "t-head");
      [
        ["1", "root", "0.1", "0.3", "systemd"],
        ["42", "lucas", "99.9", "12.0", "cafe"],
        ["77", "lucas", "3.2", "4.1", "node"],
        ["108", "lucas", "1.0", "0.8", "portfolio"],
        ["256", "lucas", "0.0", "0.1", "sleep"],
      ].forEach((r) => print(`${r[0].padEnd(5)}${r[1].padEnd(9)}${r[2].padEnd(6)}${r[3].padEnd(6)}${r[4]}`));
    },
    vim: async () => {
      mode = vimMode;
      setPrompt();
      clearScreen();
      for (let i = 0; i < 6; i++) say("~", "t-accent");
      say("VIM - Vi IMproved   (dica: tente :q)", "t-dim");
    },
    sl: async () => say("Você quis dizer ls? (o trem ainda está na garagem)", "t-dim"),
    matrix: async () => matrix(),

    // ----- C -----
    gcc: async (args) => {
      if (!args.includes("hello.c")) return say("gcc: erro fatal: nenhum arquivo de entrada (tente: gcc hello.c)", "t-err");
      compiled = true;
    },
    make: async () => {
      say("gcc -o hello hello.c");
      compiled = true;
      say("pronto.", "t-dim");
    },
    "./a.out": async () => {
      if (!compiled) return say("bash: ./a.out: arquivo ou diretório inexistente (compile antes: gcc hello.c)", "t-err");
      const d = await loadData();
      say(d.printf.replace(/^printf\("/, "").replace(/\\n"\);$/, ""));
    },
    "./hello": async () => cmds["./a.out"](),
    "./segfault": async () => say("Falha de segmentação (imagem do núcleo gravada)", "t-err"),
    printf: async () => say((await loadData()).printf.replace(/^printf\("/, "").replace(/\\n"\);$/, "")),

    // ----- Python -----
    python: async () => {
      mode = pythonMode;
      setPrompt();
      say("Python (mini REPL do portfólio: só respostas prontas). exit() para sair.", "t-dim");
    },
    python3: async () => cmds.python(),
    import: async (args) =>
      args[0] === "antigravity"
        ? print("xkcd: ", link("https://xkcd.com/353/", "xkcd.com/353"))
        : say(`ModuleNotFoundError: No module named '${args[0] || ""}'`, "t-err"),
    pip: async (args) => {
      if (args[0] === "install" && args[1] === "cafe") {
        await progress("Baixando cafe");
        return say("Successfully installed cafe-1.0", "t-accent");
      }
      say("uso: pip install cafe", "t-dim");
    },

    // ----- JavaScript / Node -----
    node: async (args) => (args[0] === "-v" ? say("v22.11.0") : say("uso: node -v", "t-dim")),
    npm: async (args) => {
      if (args[0] === "install" && args[1] === "cafe") {
        await progress("npm install cafe");
        return say("adicionado 1 pacote em 1s. 0 vulnerabilidades.", "t-accent");
      }
      if (args[0] === "audit") {
        say("encontradas 0 vulnerabilidades");
        return say("1 problema crítico: falta de café.", "t-warn");
      }
      say("uso: npm install cafe | npm audit", "t-dim");
    },

    // ----- Servidores e DevOps -----
    ping: async () => {
      const times = [];
      for (let i = 1; i <= 4; i++) {
        const t0 = performance.now();
        try {
          await fetch(`../favicon.svg?t=${Math.random()}`, { cache: "no-store" });
          const ms = performance.now() - t0;
          times.push(ms);
          say(`resposta HTTP de lucasemanuel.com.br: seq=${i} tempo=${ms.toFixed(1)} ms`);
        } catch {
          say(`seq=${i}: sem resposta`, "t-err");
        }
        await sleep(300);
      }
      if (times.length)
        say(`min/média/máx = ${Math.min(...times).toFixed(1)}/${(times.reduce((a, b) => a + b, 0) / times.length).toFixed(1)}/${Math.max(...times).toFixed(1)} ms`, "t-dim");
    },
    curl: async () => {
      print("No terminal de verdade, rode: ", span("t-accent", "curl lucasemanuel.com.br/cli"));
      print("Ou abra: ", link("../cli", "lucasemanuel.com.br/cli"));
    },
    ssh: async () => say("ssh: connect to host lucasemanuel.com.br port 22: Connection refused (o site roda no GitHub Pages)", "t-err"),
    systemctl: async (args) => {
      if (args[0] !== "status" || args[1] !== "portfolio") return say("uso: systemctl status portfolio", "t-dim");
      print(span("t-accent", "● "), "portfolio.service - Portfólio do Lucas Emanuel");
      say("     Loaded: loaded (GitHub Pages)");
      print("     Active: ", span("t-accent", "active (running)"), ` desde ${dateFmt(FIRST_COMMIT)}`);
      say(`     Uptime: ${uptime()}`, "t-dim");
    },
    docker: async (args) =>
      args[0] === "ps"
        ? (say("CONTAINER ID   IMAGE   COMMAND   STATUS", "t-head"), say("(nenhum: o site é estático e roda no GitHub Pages)", "t-dim"))
        : say("uso: docker ps", "t-dim"),
    nginx: async () => say("nginx: comando não encontrado (o site é servido pelo GitHub Pages)", "t-err"),
    git: async (args) => {
      if (args[0] === "status") {
        say("No ramo main");
        return say("nada a submeter, diretório de trabalho limpo");
      }
      if (args[0] !== "log") return say("uso: git log | git status", "t-dim");
      say("Buscando commits na API do GitHub…", "t-dim");
      try {
        const res = await fetch(`https://api.github.com/repos/${REPO}/commits?per_page=8`);
        if (!res.ok) throw new Error(res.status);
        const commits = await res.json();
        commits.forEach((c) => {
          print(span("t-warn", `commit ${c.sha.slice(0, 7)}`));
          say(`Date:   ${dateFmt(new Date(c.commit.author.date))}`, "t-dim");
          print(`    ${c.commit.message.split("\n")[0]}`);
          blank();
        });
      } catch {
        say("git log: não foi possível consultar a API do GitHub agora (limite de requisições?).", "t-err");
      }
    },

    // ----- Extras -----
    coffee: async () =>
      print(["    ( (", "     ) )", "  ........", "  |      |]", "  \\      /", "   `----'", "Café servido. ☕"].join("\n")),
    hack: async () => {
      const steps = [
        "Iniciando varredura de portas",
        "Contornando o firewall",
        "Injetando payload",
        "Descriptografando o mainframe",
        "Baixando 1337 GB de memes",
      ];
      for (const s of steps) {
        say(`[+] ${s}…`, "t-accent");
        await sleep(450);
      }
      say("ACESSO CONCEDIDO", "t-head");
      say("(brincadeira: nada foi acessado)", "t-dim");
    },
    date: async () => say(dateFmt(new Date())),
    echo: async (args) => say(args.join(" ")),
  };

  let compiled = false;
  const history = [];
  let hIndex = 0;

  // ---------- Execução ----------
  const runOne = async (part) => {
    const line = part.trim();
    if (!line) return;
    const log = line.match(/^console\.log\((["'])(.*)\1\)$/);
    if (log) return say(log[2]);
    const [name, ...args] = line.split(/\s+/);
    if (Object.hasOwn(cmds, name)) return cmds[name](args);
    say(`${name}: comando não encontrado`, "t-err");
    const best = Object.keys(cmds)
      .map((c) => [c, distance(name.toLowerCase(), c)])
      .sort((a, b) => a[1] - b[1])[0];
    if (best && best[1] <= 2) print("Você quis dizer ", span("t-accent", best[0]), "?");
    else say("Digite help para ver os comandos.", "t-dim");
  };

  const execute = async (raw) => {
    print(span("t-prompt", promptEl.textContent + " "), raw);
    const line = raw.trim();
    if (!line) return;
    if (history[history.length - 1] !== line) history.push(line);
    hIndex = history.length;

    busy = true;
    aborted = false;
    input.readOnly = true;
    try {
      if (mode) await mode.handle(line);
      else for (const part of line.split("&&")) await runOne(part);
    } catch (err) {
      if (err instanceof Abort) say("^C", "t-dim");
      else say(`erro: ${err.message || err}`, "t-err");
    } finally {
      busy = false;
      input.readOnly = false;
      setPrompt();
      input.focus();
      scrollDown();
    }
  };

  // ---------- Entrada ----------
  const complete = () => {
    const value = input.value;
    const m = value.match(/^(\S*)$/);
    if (m && !mode) {
      const options = Object.keys(cmds).filter((c) => c.startsWith(m[1]));
      if (options.length === 1) input.value = options[0] + " ";
      else if (options.length > 1) {
        print(span("t-prompt", promptEl.textContent + " "), value);
        say(options.join("  "), "t-dim");
      }
      return;
    }
    if (mode || !fs) return;
    const last = value.split(/\s+/).pop();
    const slash = last.lastIndexOf("/");
    const base = last.slice(0, slash + 1);
    const target = resolve(base || ".");
    if (!target?.node.dir) return;
    const options = Object.keys(target.node.children).filter((n) => n.startsWith(last.slice(slash + 1)));
    if (options.length === 1) {
      const child = target.node.children[options[0]];
      input.value = value.slice(0, value.length - last.length) + base + options[0] + (child.dir ? "/" : " ");
    } else if (options.length > 1) {
      print(span("t-prompt", promptEl.textContent + " "), value);
      say(options.join("  "), "t-dim");
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (busy) return;
    const raw = input.value;
    input.value = "";
    execute(raw);
  });

  input.addEventListener("keydown", (e) => {
    if (busy) return;
    if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIndex > 0) input.value = history[--hIndex];
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hIndex = Math.min(hIndex + 1, history.length);
      input.value = history[hIndex] ?? "";
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      clearScreen();
    } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      print(span("t-prompt", promptEl.textContent + " "), input.value + "^C");
      input.value = "";
      if (mode) {
        mode = null;
        setPrompt();
      }
    }
  });

  // Ctrl+C também interrompe animações (com a entrada travada)
  document.addEventListener("keydown", (e) => {
    fast = true;
    if (busy && e.ctrlKey && e.key.toLowerCase() === "c") aborted = true;
  });

  // Tocar/clicar na tela foca a entrada, sem atrapalhar a seleção de texto nem os links
  screen.addEventListener("click", (e) => {
    if (e.target.closest("a") || getSelection().toString()) return;
    input.focus();
  });

  document.querySelectorAll("[data-run]").forEach((b) =>
    b.addEventListener("click", () => {
      if (busy) return;
      execute(b.dataset.run);
    })
  );

  // ---------- Boot ----------
  (async () => {
    busy = true;
    input.readOnly = true;
    try {
      say("lucasemanuel.com.br — terminal", "t-head");
      await sleep(150);
      let d;
      try {
        print(span("t-accent", "[  OK  ] "), "Carregando conteúdo do site");
        d = await loadData();
        fs = buildFs(d);
      } catch {
        print(span("t-err", "[ ERRO ] "), "Não foi possível ler o conteúdo (abra o site por http, não por file://).");
      }
      await sleep(150);
      print(span("t-accent", "[  OK  ] "), "Pronto.");
      blank();
      if (d) print(`Bem-vindo, visitante. Eu sou ${d.name}.`);
      print("Digite ", span("t-accent", "help"), " para ver os comandos.");
      blank();
    } finally {
      busy = false;
      fast = true;
      input.readOnly = false;
      setPrompt();
      input.focus();
    }
  })();
})();
