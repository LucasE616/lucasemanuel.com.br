// Aplica o tema antes de desenhar a página, para não piscar o tema errado.
// Carregado no <head>, antes do style.css, sem defer nem async: precisa rodar antes da primeira pintura.
// Fica num arquivo (e não inline) para o CSP poder usar só script-src 'self'.
(() => {
  let pref = null;
  try {
    pref = localStorage.getItem("theme");
  } catch {}
  const light = pref === "light" || (pref !== "dark" && window.matchMedia?.("(prefers-color-scheme: light)").matches);
  document.documentElement.dataset.theme = light ? "light" : "dark";
})();
