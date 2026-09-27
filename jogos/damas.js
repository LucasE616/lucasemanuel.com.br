// Página /jogos: interface das damas. Regras, IA (em Web Worker) e placar ficam em damas-ia.js.
// O visitante é sempre o lado de baixo (1); a máquina, o de cima (-1).
(() => {
  const D = window.Damas;
  const boardEl = document.getElementById("damas-board");
  if (!D || !boardEl) return;
  const statusEl = document.getElementById("damas-status");
  const opts = document.getElementById("damas-opts");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const HUMAN = 1;
  const AI = -1;

  let game, level, thinking, token = 0;
  // Seleção do visitante: peça escolhida e casas já percorridas numa captura em sequência
  let sel = null;
  let path = [];

  // Casas: botões nas escuras (com rótulo para leitor de tela); as claras são só decoração
  const cells = Array.from({ length: D.N * D.N }, (_, i) => {
    let el;
    if (D.dark(i)) {
      el = document.createElement("button");
      el.type = "button";
      el.tabIndex = -1;
      el.addEventListener("click", () => click(i));
    } else {
      el = document.createElement("div");
      el.setAttribute("aria-hidden", "true");
    }
    el.className = `damas-sq ${D.dark(i) ? "is-dark" : "is-light"}`;
    // Coordenadas nas bordas (a–f embaixo, 1–6 à esquerda), as mesmas usadas no status e no terminal
    if (i % D.N === 0) el.dataset.rank = D.name(i)[1];
    if (i >= D.N * (D.N - 1)) el.dataset.file = D.name(i)[0];
    boardEl.append(el);
    return el;
  });
  const firstDark = cells.findIndex((_, i) => D.dark(i));
  cells[firstDark].tabIndex = 0;

  const legal = () => (game.result || thinking || game.turn !== HUMAN ? [] : D.moves(game.board, HUMAN));
  // Lances que continuam o caminho já escolhido
  const candidates = () =>
    legal().filter((m) => m.from === sel && path.every((p, k) => m.path[k] === p));

  const PIECE_NAMES = { 1: "sua peça", 2: "sua dama", "-1": "peça da máquina", "-2": "dama da máquina" };

  const render = () => {
    const all = legal();
    const movable = new Set(all.map((m) => m.from));
    const cands = sel == null ? [] : candidates();
    const targets = new Set(cands.map((m) => m.path[path.length]));
    const captured = new Set(cands.length ? cands[0].caps.slice(0, path.length) : []);
    // Durante uma captura em sequência, a peça aparece na casa onde parou
    const b = game.board.slice();
    if (sel != null && path.length) {
      b[path[path.length - 1]] = b[sel];
      b[sel] = 0;
    }
    const last = game.last && game.turn === HUMAN ? game.last : null;
    const lastSquares = new Set(last ? [last.from, ...last.path] : []);

    cells.forEach((el, i) => {
      if (!D.dark(i)) return;
      const p = b[i];
      el.replaceChildren();
      if (p) {
        const piece = document.createElement("span");
        piece.className = `damas-piece ${p > 0 ? "is-mine" : "is-ai"}${D.isKing(p) ? " is-king" : ""}`;
        el.append(piece);
      }
      el.classList.toggle("is-movable", sel == null && movable.has(i));
      el.classList.toggle("is-selected", sel != null && i === (path.length ? path[path.length - 1] : sel));
      el.classList.toggle("is-target", targets.has(i));
      el.classList.toggle("is-captured", captured.has(i));
      el.classList.toggle("is-last", lastSquares.has(i));
      let label = `${D.name(i)}: ${p ? PIECE_NAMES[p] : "vazia"}`;
      if (captured.has(i)) label += ", capturada";
      if (targets.has(i)) label += ", destino possível";
      else if (sel == null && movable.has(i)) label += ", pode jogar";
      el.setAttribute("aria-label", label);
      el.setAttribute("aria-disabled", String(!(targets.has(i) || movable.has(i))));
    });
    boardEl.classList.toggle("is-over", !!game.result);
    boardEl.classList.toggle("is-thinking", !!thinking);
  };

  const renderScore = (s = D.loadScore()) => {
    for (const k of ["vitorias", "empates", "derrotas"]) document.getElementById(`damas-score-${k}`).textContent = s[k];
  };

  const setStatus = (text) => (statusEl.textContent = text);

  const describe = (m) => {
    const n = m.caps.length;
    return `${D.notation(m)}${n ? ` (capturou ${n} ${n > 1 ? "peças" : "peça"})` : ""}`;
  };

  const yourTurn = (prefix = "") => {
    const all = D.moves(game.board, HUMAN);
    const n = all[0]?.caps.length || 0;
    const must = n ? ` Captura obrigatória${n > 1 ? ` de ${n} peças` : ""}.` : "";
    setStatus(`${prefix}Sua vez.${must}`);
  };

  const finish = () => {
    renderScore(D.record(game.result));
    const r = game.result;
    const why = r === "empate" ? "" : r === HUMAN ? " A máquina ficou sem lances." : " Você ficou sem lances.";
    const prefix = game.last && game.turn === HUMAN ? `A máquina jogou ${describe(game.last)}. ` : "";
    if (r === "empate") setStatus(`${prefix}Empate (posição repetida ou ${D.QUIET_LIMIT / 2} lances sem captura). Nova partida?`);
    else if (r === HUMAN) setStatus(`Você venceu! 🎉${why}`);
    else setStatus(`${prefix}A máquina venceu.${why}`);
    render();
  };

  const aiTurn = async () => {
    const t = ++token;
    thinking = true;
    setStatus("A máquina está pensando…");
    render();
    const started = Date.now();
    const m = await D.think(game.board, AI, level);
    // Uma pausa mínima, para dar tempo de ver o próprio lance antes da resposta
    const wait = reduced ? 0 : Math.max(0, 450 - (Date.now() - started));
    if (wait) await new Promise((r) => setTimeout(r, wait));
    if (t !== token) return; // nova partida começou enquanto a máquina pensava
    thinking = false;
    D.play(game, m);
    if (game.result) return finish();
    yourTurn(`A máquina jogou ${describe(m)}. `);
    render();
  };

  const humanPlay = (m) => {
    sel = null;
    path = [];
    D.play(game, m);
    if (game.result) return finish();
    aiTurn();
  };

  const click = (i) => {
    if (game.result || thinking || game.turn !== HUMAN) return;
    const all = legal();
    // Clicar numa peça que pode jogar escolhe (ou troca) a peça, desde que a captura ainda não tenha começado
    if (!path.length && all.some((m) => m.from === i)) {
      sel = sel === i ? null : i;
      render();
      return;
    }
    if (sel == null) {
      if (Math.sign(game.board[i]) === HUMAN) setStatus(all[0]?.caps.length ? "Essa peça não pode jogar: a captura é obrigatória." : "Essa peça não tem para onde ir.");
      return;
    }
    const cands = candidates();
    if (cands.some((m) => m.path[path.length] === i)) {
      path.push(i);
      const done = cands.find((m) => m.path.length === path.length && m.path.every((p, k) => p === path[k]));
      if (done) return humanPlay(done);
      setStatus("Continue capturando.");
      render();
      return;
    }
    // Clique fora dos destinos: desfaz a seleção (ou a captura em andamento)
    sel = null;
    path = [];
    yourTurn();
    render();
  };

  const newGame = () => {
    token++;
    const f = new FormData(opts);
    level = f.get("nivel");
    game = D.newGame(f.get("inicio") === "maquina" ? AI : HUMAN);
    thinking = false;
    sel = null;
    path = [];
    render();
    if (game.turn === AI) aiTurn();
    else yourTurn(`Nível ${D.LEVEL_NAMES[level]}. `);
  };

  // Setas: ←/→ andam entre as casas escuras da fileira; ↑/↓ vão para a fileira de cima/baixo
  boardEl.addEventListener("keydown", (e) => {
    const i = cells.indexOf(document.activeElement);
    if (i < 0) return;
    const r = Math.floor(i / D.N);
    const c = i % D.N;
    let nr = r;
    let nc = c;
    if (e.key === "ArrowLeft") nc = c - 2;
    else if (e.key === "ArrowRight") nc = c + 2;
    else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      nr = r + (e.key === "ArrowUp" ? -1 : 1);
      nc = c + 1 < D.N ? c + 1 : c - 1;
    } else if (e.key === "Escape" && sel != null) {
      sel = null;
      path = [];
      yourTurn();
      return render();
    } else return;
    e.preventDefault();
    if (nr < 0 || nr >= D.N || nc < 0 || nc >= D.N) return;
    const next = nr * D.N + nc;
    cells[i].tabIndex = -1;
    cells[next].tabIndex = 0;
    cells[next].focus();
  });

  opts.addEventListener("change", newGame);
  document.getElementById("damas-new").addEventListener("click", newGame);
  document.getElementById("damas-reset").addEventListener("click", () => {
    D.resetScore();
    renderScore();
  });

  renderScore();
  newGame();
})();
