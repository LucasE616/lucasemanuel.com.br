// Jogo do carrinho (página /jogos): estrada infinita com 3 faixas e obstáculos aleatórios.
// A velocidade aumenta com a distância; a partida acaba na primeira batida.
(() => {
  const canvas = document.getElementById("car-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const statusEl = document.getElementById("car-status");
  const bestEl = document.getElementById("car-best");
  const startBtn = document.getElementById("car-start");
  const palette = document.getElementById("palette");

  // Coordenadas lógicas; o canvas é escalado pelo CSS e pelo devicePixelRatio
  const W = 300;
  const H = 450;
  const LANES = 3;
  const LANE_W = W / LANES;
  const CAR_W = 44;
  const CAR_H = 74;
  const CAR_Y = H - CAR_H - 22;
  const START_SPEED = 230; // px/s
  const MAX_SPEED = 720;
  const PX_PER_M = 20;
  // Cores fixas dos outros carros e da barreira: servem nos dois temas, como as bolinhas do terminal
  const TRAFFIC = ["#ff5f56", "#5ab0ff", "#c792ea", "#ff9f43"];
  const KEY = "carrinho-recorde";

  const laneX = (l) => l * LANE_W + LANE_W / 2;
  // A página mostra um jogo por vez (abas); fora da aba do carrinho, ele pausa e ignora o teclado
  const offTab = () => !!canvas.closest("[hidden]");
  const meters = (px) => Math.floor(px / PX_PER_M);

  let best = 0;
  try {
    best = Math.max(0, parseInt(localStorage.getItem(KEY), 10) || 0);
  } catch {}

  let state = "ready"; // ready | running | paused | over
  let lane, carX, obstacles, speed, dist, nextRow, stripe, last, newBest;

  // ---------- Cores do tema ----------
  let colors = {};
  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    const v = (name) => cs.getPropertyValue(name).trim();
    colors = { road: v("--surface-2"), edge: v("--border"), text: v("--text"), muted: v("--muted"), accent: v("--accent"), backdrop: v("--backdrop") };
  };
  new MutationObserver(() => {
    readColors();
    draw();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // ---------- Tamanho ----------
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  };

  // ---------- Partida ----------
  const reset = () => {
    lane = 1;
    carX = laneX(lane);
    obstacles = [];
    speed = START_SPEED;
    dist = 0;
    nextRow = H * 0.5;
    stripe = 0;
    newBest = false;
  };

  // Espaço entre fileiras: cresce com a velocidade, para sempre dar tempo de trocar duas faixas
  const rowGap = () => Math.max(CAR_H * 2.6, speed * 0.75) + Math.random() * 90;

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Uma fileira bloqueia 1 ou 2 faixas, nunca as 3; fileiras duplas ficam mais comuns com a distância
  const spawnRow = () => {
    const double = Math.random() < Math.min(0.55, 0.15 + dist / 25000);
    shuffle([0, 1, 2])
      .slice(0, double ? 2 : 1)
      .forEach((l) => {
        const car = Math.random() < 0.6;
        const w = car ? CAR_W : LANE_W - 22;
        const h = car ? CAR_H - 4 : 26;
        obstacles.push({ type: car ? "car" : "barrier", x: laneX(l), y: -h, w, h, color: TRAFFIC[Math.floor(Math.random() * TRAFFIC.length)] });
      });
  };

  const hit = (o) => {
    // Margem pequena para as batidas "de raspão" não contarem
    const m = 5;
    const ax = carX - CAR_W / 2 + m;
    const ay = CAR_Y + m;
    const bx = o.x - o.w / 2;
    return ax < bx + o.w && ax + CAR_W - 2 * m > bx && ay < o.y + o.h && ay + CAR_H - 2 * m > o.y;
  };

  const update = (dt) => {
    speed = Math.min(MAX_SPEED, START_SPEED + dist * 0.018);
    const dy = speed * dt;
    dist += dy;
    stripe = (stripe + dy) % 40;
    obstacles.forEach((o) => (o.y += dy));
    obstacles = obstacles.filter((o) => o.y < H);
    nextRow -= dy;
    if (nextRow <= 0) {
      spawnRow();
      nextRow = rowGap();
    }
    // Troca de faixa suave
    const target = laneX(lane);
    const step = 1100 * dt;
    carX = Math.abs(target - carX) <= step ? target : carX + Math.sign(target - carX) * step;
    if (obstacles.some(hit)) gameOver();
  };

  // ---------- Desenho ----------
  const roundRect = (x, y, w, h, r) => {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
  };

  // Carro visto de cima. `player`: faróis na frente; os outros mostram as lanternas traseiras
  const drawCar = (cx, y, w, h, color, player) => {
    ctx.fillStyle = "#111";
    for (const wy of [y + 10, y + h - 26]) {
      ctx.fillRect(cx - w / 2 - 3, wy, 6, 16);
      ctx.fillRect(cx + w / 2 - 3, wy, 6, 16);
    }
    ctx.fillStyle = color;
    roundRect(cx - w / 2, y, w, h, 9);
    ctx.fill();
    ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
    roundRect(cx - w / 2 + 6, y + (player ? 15 : h - 29), w - 12, 14, 4); // para-brisa
    ctx.fill();
    roundRect(cx - w / 2 + 8, y + (player ? h - 20 : 8), w - 16, 9, 3); // vidro de trás
    ctx.fill();
    ctx.fillStyle = player ? "#fff6c2" : "#ff2d2d";
    const ly = player ? y + 1 : y + h - 5;
    ctx.fillRect(cx - w / 2 + 5, ly, 9, 4);
    ctx.fillRect(cx + w / 2 - 14, ly, 9, 4);
  };

  const drawBarrier = (o) => {
    ctx.save();
    roundRect(o.x - o.w / 2, o.y, o.w, o.h, 4);
    ctx.clip();
    ctx.fillStyle = "#ffbd2e";
    ctx.fillRect(o.x - o.w / 2, o.y, o.w, o.h);
    ctx.fillStyle = "#1a1920";
    for (let x = o.x - o.w / 2 - o.h; x < o.x + o.w / 2; x += 18) {
      ctx.beginPath();
      ctx.moveTo(x, o.y + o.h);
      ctx.lineTo(x + 9, o.y + o.h);
      ctx.lineTo(x + 9 + o.h, o.y);
      ctx.lineTo(x + o.h, o.y);
      ctx.fill();
    }
    ctx.restore();
  };

  const text = (str, y, size, color = colors.text, weight = 500) => {
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px "JetBrains Mono", ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.fillText(str, W / 2, y);
  };

  const draw = () => {
    if (!lane && lane !== 0) return;
    ctx.fillStyle = colors.road;
    ctx.fillRect(0, 0, W, H);
    // Acostamento e faixas tracejadas
    ctx.fillStyle = colors.edge;
    ctx.fillRect(0, 0, 4, H);
    ctx.fillRect(W - 4, 0, 4, H);
    ctx.fillStyle = colors.muted;
    ctx.globalAlpha = 0.45;
    for (let i = 1; i < LANES; i++)
      for (let y = stripe - 40; y < H; y += 40) ctx.fillRect(i * LANE_W - 2, y, 4, 22);
    ctx.globalAlpha = 1;

    obstacles.forEach((o) => (o.type === "car" ? drawCar(o.x, o.y, o.w, o.h, o.color, false) : drawBarrier(o)));
    drawCar(carX, CAR_Y, CAR_W, CAR_H, colors.accent, true);

    // Placar na pista
    ctx.textAlign = "left";
    ctx.fillStyle = colors.text;
    ctx.font = '500 15px "JetBrains Mono", ui-monospace, monospace';
    ctx.fillText(`${meters(dist)} m`, 12, 24);
    ctx.textAlign = "right";
    ctx.fillStyle = colors.muted;
    ctx.fillText(`${Math.round(speed / 3)} km/h`, W - 12, 24);

    if (state === "running") return;
    ctx.fillStyle = colors.backdrop;
    ctx.fillRect(0, 0, W, H);
    if (state === "ready") {
      text("Carrinho", H / 2 - 30, 28);
      text("Espaço ou toque para começar", H / 2 + 6, 13, colors.muted, 400);
      text("← → para trocar de faixa", H / 2 + 28, 13, colors.muted, 400);
    } else if (state === "paused") {
      text("Pausado", H / 2 - 10, 28);
      text("Espaço ou toque para continuar", H / 2 + 22, 13, colors.muted, 400);
    } else {
      text("Bateu!", H / 2 - 44, 30, colors.accent);
      text(`${meters(dist)} m`, H / 2 - 6, 22);
      text(newBest ? "Novo recorde!" : `Recorde: ${best} m`, H / 2 + 22, 13, newBest ? colors.accent : colors.muted, 400);
      text("Espaço ou toque para jogar de novo", H / 2 + 52, 12, colors.muted, 400);
    }
  };

  // ---------- Estados ----------
  const setStatus = (msg) => (statusEl.textContent = msg);
  const showBest = () => (bestEl.textContent = `${best} m`);

  const loop = (t) => {
    if (state !== "running") return;
    // Abrir a paleta (Ctrl+K) pausa, para o carro não bater enquanto ela está aberta
    if ((palette && !palette.hidden) || offTab()) return pause();
    // dt limitado: se a aba ficar parada, o carro não "teleporta" para dentro de um obstáculo
    const dt = Math.min(0.05, (t - last) / 1000);
    last = t;
    update(dt);
    draw();
    if (state === "running") requestAnimationFrame(loop);
  };

  const run = () => {
    state = "running";
    startBtn.textContent = "Pausar";
    setStatus("Correndo.");
    last = performance.now();
    requestAnimationFrame(loop);
  };

  const start = () => {
    reset();
    run();
  };

  const pause = () => {
    if (state !== "running") return;
    state = "paused";
    startBtn.textContent = "Continuar";
    setStatus(`Pausado em ${meters(dist)} m.`);
    draw();
  };

  const gameOver = () => {
    state = "over";
    const m = meters(dist);
    newBest = m > best;
    if (newBest) {
      best = m;
      try {
        localStorage.setItem(KEY, String(best));
      } catch {}
      showBest();
    }
    startBtn.textContent = "Jogar de novo";
    setStatus(newBest ? `Bateu em ${m} m. Novo recorde!` : `Bateu em ${m} m. Recorde: ${best} m.`);
    draw();
  };

  // Botão principal e Espaço: começa, pausa, continua ou recomeça, conforme o estado
  const primary = () => {
    if (state === "running") pause();
    else if (state === "paused") run();
    else start();
  };

  const move = (d) => {
    if (state !== "running") return;
    lane = Math.max(0, Math.min(LANES - 1, lane + d));
  };

  // ---------- Controles ----------
  startBtn.addEventListener("click", primary);
  // pointerdown responde mais rápido que click no celular
  const hold = (id, d) =>
    document.getElementById(id).addEventListener("pointerdown", (e) => {
      e.preventDefault();
      if (state === "running") move(d);
      else primary();
    });
  hold("car-left", -1);
  hold("car-right", 1);
  // Teclado nos botões de faixa (pointerdown não dispara com Enter)
  document.getElementById("car-left").addEventListener("click", (e) => e.detail === 0 && move(-1));
  document.getElementById("car-right").addEventListener("click", (e) => e.detail === 0 && move(1));

  canvas.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    canvas.focus();
    if (state !== "running") return primary();
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    move(x < carX ? -1 : 1);
  });

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || (palette && !palette.hidden) || offTab()) return;
    const t = e.target;
    if (t.closest?.(".velha-board, .velha-opts") || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    const k = e.key.toLowerCase();
    // Espaço/Enter num botão já viram click; tratar aqui também acionaria duas vezes
    if (t.tagName === "BUTTON" && (k === " " || k === "enter")) return;
    const onGame = t === canvas;
    // Com a partida rolando, as setas controlam o carro em qualquer lugar da página
    if (state === "running" || onGame) {
      if (k === "arrowleft" || k === "a") {
        e.preventDefault();
        return state === "running" ? move(-1) : primary();
      }
      if (k === "arrowright" || k === "d") {
        e.preventDefault();
        return state === "running" ? move(1) : primary();
      }
    }
    // Depois da primeira partida, Espaço/P valem na página toda (pausar, continuar, jogar de novo)
    if ((k === " " || k === "p") && (state !== "ready" || onGame)) {
      e.preventDefault();
      primary();
    } else if (k === "enter" && onGame) {
      e.preventDefault();
      primary();
    }
  });

  document.addEventListener("visibilitychange", () => document.hidden && pause());
  window.addEventListener("blur", pause);

  document.getElementById("car-reset").addEventListener("click", () => {
    best = 0;
    try {
      localStorage.removeItem(KEY);
    } catch {}
    showBest();
    setStatus("Recorde zerado.");
    if (state !== "running") draw();
  });

  readColors();
  reset();
  showBest();
  resize();
  window.matchMedia?.("(resolution: 1dppx)").addEventListener?.("change", resize);
  // A fonte do Google chega depois; redesenha para o texto da tela inicial usar a JetBrains Mono
  document.fonts?.ready.then(draw);
})();
