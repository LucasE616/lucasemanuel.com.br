// Jogo da velha (item 30 do ROADMAP): regras, IA e placar, usados pela página /jogos e pelo
// comando `play velha` do terminal. O tabuleiro é um array de 9 casas: "X", "O" ou null.
window.Velha = (() => {
  const LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  const LEVELS = ["facil", "medio", "impossivel"];
  const LEVEL_NAMES = { facil: "Fácil", medio: "Médio", impossivel: "Impossível" };

  const other = (p) => (p === "X" ? "O" : "X");
  const free = (b) => b.flatMap((v, i) => (v ? [] : [i]));

  // { player, line } de quem venceu, "empate" ou null (partida em andamento)
  const result = (b) => {
    for (const line of LINES) {
      const [a, c, d] = line;
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return { player: b[a], line };
    }
    return free(b).length ? null : "empate";
  };

  // Minimax com poda alfa-beta: o tabuleiro é pequeno o bastante para calcular a partida até o fim.
  // Vitórias mais rápidas (e derrotas mais demoradas) valem mais, por isso o `depth`.
  const minimax = (b, turn, me, depth, alpha, beta) => {
    const r = result(b);
    if (r === "empate") return 0;
    if (r) return r.player === me ? 10 - depth : depth - 10;
    const maxing = turn === me;
    let best = maxing ? -Infinity : Infinity;
    for (const i of free(b)) {
      b[i] = turn;
      const s = minimax(b, other(turn), me, depth + 1, alpha, beta);
      b[i] = null;
      if (maxing) {
        best = Math.max(best, s);
        alpha = Math.max(alpha, s);
      } else {
        best = Math.min(best, s);
        beta = Math.min(beta, s);
      }
      if (alpha >= beta) break;
    }
    return best;
  };

  const random = (list) => list[Math.floor(Math.random() * list.length)];

  const bestMove = (board, me, level = "impossivel") => {
    const moves = free(board);
    if (!moves.length) return null;
    // Fácil: aleatório. Médio: metade das vezes joga o melhor lance.
    if (level === "facil" || (level === "medio" && Math.random() < 0.5)) return random(moves);
    const b = board.slice();
    let best = -Infinity;
    let options = [];
    for (const i of moves) {
      b[i] = me;
      // Janela cheia em cada lance da raiz: o valor sai exato, e os empates podem ser sorteados
      const s = minimax(b, other(me), me, 1, -Infinity, Infinity);
      b[i] = null;
      if (s > best) {
        best = s;
        options = [i];
      } else if (s === best) options.push(i);
    }
    // Entre lances igualmente bons, sorteia, para as partidas não serem sempre iguais
    return random(options);
  };

  // Placar compartilhado entre a página e o terminal
  const KEY = "velha-placar";
  const loadScore = () => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === "object") return { vitorias: +s.vitorias || 0, empates: +s.empates || 0, derrotas: +s.derrotas || 0 };
    } catch {}
    return { vitorias: 0, empates: 0, derrotas: 0 };
  };
  const saveScore = (s) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {}
  };
  // Soma o resultado de uma partida ao placar e devolve o placar novo
  const record = (r, human) => {
    const s = loadScore();
    if (r === "empate") s.empates++;
    else if (r.player === human) s.vitorias++;
    else s.derrotas++;
    saveScore(s);
    return s;
  };
  const resetScore = () => saveScore({ vitorias: 0, empates: 0, derrotas: 0 });

  return { LINES, LEVELS, LEVEL_NAMES, other, free, result, bestMove, loadScore, record, resetScore };
})();
