// Página 404: mostra qual endereço não foi encontrado (textContent: nada do endereço vira HTML).
// Fica num arquivo (e não inline) para o CSP poder usar só script-src 'self'.
(() => {
  const path = location.pathname + location.search;
  document.querySelectorAll(".nf-path").forEach((el) => (el.textContent = path));
  document.title = `404 — ${path} — Lucas Emanuel`;
})();
