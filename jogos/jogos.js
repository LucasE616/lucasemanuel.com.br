// Página /jogos: abas dos jogos e interface do jogo da velha. Regras, IA e placar ficam em velha-ia.js.

// Abas: mostra só o jogo do hash (#velha ou #carrinho); sem hash, o jogo da velha
(() => {
  const tabs = [...document.querySelectorAll("[data-game-tab]")];
  const games = tabs.map((t) => document.getElementById(t.dataset.gameTab));
  const show = () => {
    const id = location.hash.slice(1);
    const active = games.some((g) => g.id === id) ? id : games[0].id;
    games.forEach((g) => (g.hidden = g.id !== active));
    tabs.forEach((t) => t.setAttribute("aria-current", String(t.dataset.gameTab === active)));
    window.scrollTo(0, 0);
  };
  addEventListener("hashchange", show);
  show();
})();

(() => {
  const V = window.Velha;
  const boardEl = document.getElementById("velha-board");
  const statusEl = document.getElementById("velha-status");
  const opts = document.getElementById("velha-opts");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let board, human, ai, level, turn, over, thinking, timer;

  // Casas: botões com rótulo para leitor de tela; as setas movem o foco (tabindex móvel)
  const cells = Array.from({ length: 9 }, (_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "velha-cell";
    b.tabIndex = i === 0 ? 0 : -1;
    b.addEventListener("click", () => play(i));
    boardEl.append(b);
    return b;
  });

  const label = (i) => `Linha ${Math.floor(i / 3) + 1}, coluna ${(i % 3) + 1}: ${board[i] || "vazia"}`;

  const render = (winLine = []) => {
    cells.forEach((c, i) => {
      c.textContent = board[i] || "";
      c.dataset.mark = board[i] || "";
      c.classList.toggle("is-win", winLine.includes(i));
      c.setAttribute("aria-label", label(i));
      c.setAttribute("aria-disabled", String(over || thinking || !!board[i]));
    });
    boardEl.classList.toggle("is-over", over);
  };

  const renderScore = (s = V.loadScore()) => {
    for (const k of ["vitorias", "empates", "derrotas"]) document.getElementById(`score-${k}`).textContent = s[k];
  };

  const setStatus = (text) => (statusEl.textContent = text);

  const finish = (r) => {
    over = true;
    renderScore(V.record(r, human));
    if (r === "empate") setStatus("Empate. Nova partida?");
    else if (r.player === human) setStatus("Você venceu! 🎉");
    else setStatus("A máquina venceu.");
    render(r === "empate" ? [] : r.line);
  };

  // Aplica um lance e passa a vez; devolve true se a partida acabou
  const move = (i, who) => {
    board[i] = who;
    const r = V.result(board);
    if (r) {
      finish(r);
      return true;
    }
    turn = V.other(who);
    return false;
  };

  const aiTurn = () => {
    thinking = true;
    setStatus("A máquina está pensando…");
    render();
    timer = setTimeout(() => {
      thinking = false;
      const i = V.bestMove(board, ai, level);
      if (!move(i, ai)) {
        setStatus(`A máquina jogou na linha ${Math.floor(i / 3) + 1}, coluna ${(i % 3) + 1}. Sua vez (${human}).`);
        render();
      }
    }, reduced ? 0 : 350);
  };

  const play = (i) => {
    if (over || thinking || turn !== human || board[i]) return;
    if (!move(i, human)) {
      render();
      aiTurn();
    }
  };

  const newGame = () => {
    clearTimeout(timer);
    const f = new FormData(opts);
    human = f.get("simbolo");
    ai = V.other(human);
    level = f.get("nivel");
    board = Array(9).fill(null);
    over = false;
    thinking = false;
    // Quem começa joga com o símbolo escolhido; X não é obrigado a começar
    turn = f.get("inicio") === "voce" ? human : ai;
    render();
    if (turn === ai) aiTurn();
    else setStatus(`Sua vez (${human}). Nível ${V.LEVEL_NAMES[level]}.`);
  };

  boardEl.addEventListener("keydown", (e) => {
    const i = cells.indexOf(document.activeElement);
    if (i < 0) return;
    const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 }[e.key];
    if (delta == null) return;
    e.preventDefault();
    const next = (i + delta + 9) % 9;
    cells[i].tabIndex = -1;
    cells[next].tabIndex = 0;
    cells[next].focus();
  });

  opts.addEventListener("change", newGame);
  document.getElementById("velha-new").addEventListener("click", newGame);
  document.getElementById("velha-reset").addEventListener("click", () => {
    V.resetScore();
    renderScore();
  });

  renderScore();
  newGame();
})();
