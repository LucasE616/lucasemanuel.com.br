// Web Worker das damas: calcula o lance da máquina fora da página, para ela não travar enquanto a IA pensa.
// Carrega as regras com a mesma ?v= do worker, para não misturar versões do cache.
importScripts("damas-ia.js" + self.location.search);

self.onmessage = (e) => {
  const { id, board, me, level } = e.data;
  self.postMessage({ id, move: self.Damas.bestMove(board, me, level) });
};
