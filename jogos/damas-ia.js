// Damas em tabuleiro 6×6 (item 30 do ROADMAP): regras, IA e placar, usados pela página /jogos, pelo
// comando `play damas` do terminal e pelo Web Worker (damas-worker.js), que roda a IA em segundo plano.
//
// Tabuleiro: array de 36 casas (linha * 6 + coluna, linha 0 em cima). Peças: 1 = peça comum do lado de
// baixo (o visitante), 2 = dama do lado de baixo, -1 e -2 = as do lado de cima (a máquina); 0 = vazia.
// As peças ficam nas casas escuras, onde linha + coluna é ímpar. O lado 1 anda para cima; o -1, para baixo.
//
// Regras (base nas damas brasileiras): captura obrigatória, também para trás; captura em sequência;
// lei da maioria (vale o lance que captura mais peças); dama voadora; a peça comum só vira dama se
// terminar o lance na última fileira. Empate com 3 repetições da mesma posição ou 20 lances de cada
// lado só com damas e sem captura.
self.Damas = (() => {
  const N = 6;
  const DIRS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  const LEVELS = ["facil", "medio", "dificil"];
  const LEVEL_NAMES = { facil: "Fácil", medio: "Médio", dificil: "Difícil" };
  // Quantos lances à frente a IA pensa e o tempo máximo por jogada
  const SEARCH = { facil: { depth: 2, ms: 300 }, medio: { depth: 6, ms: 700 }, dificil: { depth: 14, ms: 1500 } };
  const QUIET_LIMIT = 40; // 20 lances de cada lado
  const WIN = 100000;

  const inside = (r, c) => r >= 0 && r < N && c >= 0 && c < N;
  const dark = (i) => (Math.floor(i / N) + (i % N)) % 2 === 1;
  const side = (p) => Math.sign(p);
  const isKing = (p) => Math.abs(p) === 2;
  // Nome da casa como no tabuleiro de verdade: colunas a–f e fileiras 1–6 a partir de baixo
  const name = (i) => "abcdef"[i % N] + (N - Math.floor(i / N));
  const parse = (s) => {
    const m = /^([a-f])([1-6])$/.exec(s);
    return m ? (N - Number(m[2])) * N + "abcdef".indexOf(m[1]) : -1;
  };

  const initial = () =>
    Array.from({ length: N * N }, (_, i) => {
      if (!dark(i)) return 0;
      const r = Math.floor(i / N);
      return r < 2 ? -1 : r >= N - 2 ? 1 : 0;
    });

  // Capturas a partir de `from`: busca em profundidade. As peças capturadas ficam no tabuleiro até o fim
  // do lance, então não podem ser puladas duas vezes e bloqueiam o caminho (como na regra oficial).
  const captureSeqs = (b, from, out) => {
    const piece = b[from];
    const me = side(piece);
    const king = isKing(piece);
    const caps = [];
    const path = [];
    b[from] = 0; // a casa de origem fica livre durante a sequência
    const dfs = (pos) => {
      const r = Math.floor(pos / N);
      const c = pos % N;
      let more = false;
      for (const [dr, dc] of DIRS) {
        let rr = r + dr;
        let cc = c + dc;
        if (king) while (inside(rr, cc) && b[rr * N + cc] === 0) (rr += dr), (cc += dc);
        if (!inside(rr, cc)) continue;
        const over = rr * N + cc;
        if (side(b[over]) !== -me || caps.includes(over)) continue;
        // Casas de pouso depois da peça capturada: só a seguinte para a peça comum, qualquer uma livre para a dama
        for (let lr = rr + dr, lc = cc + dc; inside(lr, lc) && b[lr * N + lc] === 0; lr += dr, lc += dc) {
          const land = lr * N + lc;
          more = true;
          caps.push(over);
          path.push(land);
          dfs(land);
          caps.pop();
          path.pop();
          if (!king) break;
        }
      }
      if (!more && caps.length) out.push({ from, path: path.slice(), caps: caps.slice() });
    };
    dfs(from);
    b[from] = piece;
  };

  // Todos os lances legais do lado `me`. Com captura possível, só valem as que capturam mais peças.
  const moves = (b, me) => {
    const caps = [];
    for (let i = 0; i < b.length; i++) if (side(b[i]) === me) captureSeqs(b, i, caps);
    if (caps.length) {
      const most = Math.max(...caps.map((m) => m.caps.length));
      return caps.filter((m) => m.caps.length === most);
    }
    const list = [];
    for (let i = 0; i < b.length; i++) {
      if (side(b[i]) !== me) continue;
      const r = Math.floor(i / N);
      const c = i % N;
      for (const [dr, dc] of DIRS) {
        if (!isKing(b[i]) && dr !== -me) continue; // peça comum só anda para a frente
        for (let rr = r + dr, cc = c + dc; inside(rr, cc) && b[rr * N + cc] === 0; rr += dr, cc += dc) {
          list.push({ from: i, path: [rr * N + cc], caps: [] });
          if (!isKing(b[i])) break;
        }
      }
    }
    return list;
  };

  const to = (m) => m.path[m.path.length - 1];

  const apply = (b, m) => {
    const nb = b.slice();
    let p = nb[m.from];
    nb[m.from] = 0;
    for (const i of m.caps) nb[i] = 0;
    const end = to(m);
    const row = Math.floor(end / N);
    if (!isKing(p) && row === (p > 0 ? 0 : N - 1)) p *= 2;
    nb[end] = p;
    return nb;
  };

  // Lance em texto: c3-d4 (movimento) ou c3xe5xc3 (capturas)
  const notation = (m) => [m.from, ...m.path].map(name).join(m.caps.length ? "x" : "-");

  // ---------- Avaliação ----------
  // Pontos do ponto de vista de `me`: material (dama vale ~3 peças), avanço das peças comuns,
  // controle do centro e peças guardando a última fileira (que impedem o adversário de virar dama).
  const evaluate = (b, me) => {
    let s = 0;
    for (let i = 0; i < b.length; i++) {
      const p = b[i];
      if (!p) continue;
      const r = Math.floor(i / N);
      const c = i % N;
      let v;
      if (isKing(p)) v = 300;
      else {
        const adv = p > 0 ? N - 1 - r : r;
        v = 100 + adv * 6 + (adv === 0 ? 5 : 0);
      }
      if (r >= 2 && r <= 3 && c >= 1 && c <= 4) v += 6;
      s += p > 0 ? v : -v;
    }
    return s * me;
  };

  // ---------- Busca: minimax (na forma negamax) com poda alfa-beta ----------
  class Timeout extends Error {}

  const search = (b, me, depth, alpha, beta, ply, ctx) => {
    if ((++ctx.nodes & 1023) === 0 && Date.now() > ctx.deadline) throw new Timeout();
    const list = moves(b, me);
    if (!list.length) return -WIN + ply; // sem lances: perdeu (vitórias mais rápidas valem mais)
    // Na profundidade limite, só continua se houver captura obrigatória (evita parar no meio de uma troca)
    if ((depth <= 0 && !list[0].caps.length) || ply >= 40) return evaluate(b, me);
    let best = -Infinity;
    for (const m of list) {
      const s = -search(apply(b, m), -me, depth - 1, -beta, -alpha, ply + 1, ctx);
      if (s > best) best = s;
      if (s > alpha) alpha = s;
      if (alpha >= beta) break;
    }
    return best;
  };

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Melhor lance para `me`. Aprofundamento iterativo: pensa 1 lance à frente, depois 2, 3..., até o limite
  // do nível ou do tempo, e fica com o resultado da última profundidade completa.
  const bestMove = (b, me, level = "medio") => {
    const list = shuffle(moves(b, me)); // embaralha para lances igualmente bons variarem entre partidas
    if (list.length <= 1) return list[0] || null;
    if (level === "facil" && Math.random() < 0.3) return list[0];
    const { depth: maxDepth, ms } = SEARCH[level] || SEARCH.medio;
    const ctx = { nodes: 0, deadline: Date.now() + ms };
    let best = list[0];
    for (let depth = 1; depth <= maxDepth; depth++) {
      let alpha = -Infinity;
      let found = null;
      try {
        for (const m of list) {
          const s = -search(apply(b, m), -me, depth - 1, -Infinity, -alpha, 1, ctx);
          if (s > alpha) {
            alpha = s;
            found = m;
          }
        }
      } catch (e) {
        if (e instanceof Timeout) break;
        throw e;
      }
      best = found;
      // O melhor lance vai para a frente: na próxima profundidade ele é analisado primeiro e poda mais
      list.splice(list.indexOf(found), 1);
      list.unshift(found);
      if (alpha >= WIN - 100) break; // vitória garantida encontrada
    }
    return best;
  };

  // ---------- IA em segundo plano ----------
  // O worker é criado a partir do endereço deste arquivo (mesma pasta e mesma ?v=), então funciona tanto
  // em /jogos quanto no terminal. Sem worker (navegador antigo ou erro), calcula na própria página.
  const SRC = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : "";
  let worker = null;
  let seq = 0;
  const pending = new Map();
  const getWorker = () => {
    if (worker || !SRC || typeof Worker === "undefined") return worker;
    try {
      worker = new Worker(SRC.replace(/damas-ia\.js/, "damas-worker.js"));
      worker.onmessage = (e) => {
        const job = pending.get(e.data.id);
        if (!job) return;
        pending.delete(e.data.id);
        job.resolve(e.data.move);
      };
      worker.onerror = () => {
        worker = null;
        for (const job of pending.values()) job.resolve(bestMove(job.b, job.me, job.level));
        pending.clear();
      };
    } catch {
      worker = null;
    }
    return worker;
  };
  const think = (b, me, level) =>
    new Promise((resolve) => {
      const w = getWorker();
      if (!w) return setTimeout(() => resolve(bestMove(b, me, level)), 0);
      const id = ++seq;
      pending.set(id, { resolve, b, me, level });
      w.postMessage({ id, board: b, me, level });
    });

  // ---------- Partida: vez, empates e fim ----------
  // `first`: 1 se o visitante começa, -1 se a máquina começa
  const newGame = (first = 1) => {
    const g = { board: initial(), turn: first, quiet: 0, seen: new Map(), last: null, result: null };
    g.seen.set(g.board.join() + g.turn, 1);
    return g;
  };
  // Aplica o lance e atualiza o resultado: 1 ou -1 (quem venceu), "empate" ou null
  const play = (g, m) => {
    const king = isKing(g.board[m.from]);
    g.board = apply(g.board, m);
    g.turn = -g.turn;
    g.last = m;
    g.quiet = !m.caps.length && king ? g.quiet + 1 : 0;
    const key = g.board.join() + g.turn;
    const reps = (g.seen.get(key) || 0) + 1;
    g.seen.set(key, reps);
    if (!moves(g.board, g.turn).length) g.result = -g.turn;
    else if (reps >= 3 || g.quiet >= QUIET_LIMIT) g.result = "empate";
    return g.result;
  };

  // ---------- Placar (página e terminal) ----------
  const KEY = "damas-placar";
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
  // Resultado do ponto de vista do visitante (lado 1)
  const record = (result) => {
    const s = loadScore();
    if (result === "empate") s.empates++;
    else if (result === 1) s.vitorias++;
    else s.derrotas++;
    saveScore(s);
    return s;
  };
  const resetScore = () => saveScore({ vitorias: 0, empates: 0, derrotas: 0 });

  return {
    N, LEVELS, LEVEL_NAMES, QUIET_LIMIT,
    dark, side, isKing, name, parse, to, notation,
    initial, moves, apply, evaluate, bestMove, think,
    newGame, play, loadScore, record, resetScore,
  };
})();
