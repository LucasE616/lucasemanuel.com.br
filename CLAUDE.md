# Contexto do projeto: lucasemanuel.com.br

Portfólio pessoal de **Lucas Emanuel**, Dev Back-end e Analista de Sistemas. Este arquivo guarda
decisões, padrões e preferências de sessões anteriores com IA, para a próxima sessão não recomeçar
do zero. Converse com o Lucas em **português (pt-BR)**.

Planos e ideias ficam em [ROADMAP.md](ROADMAP.md). Consulte-o antes de sugerir melhorias e atualize o
status dos itens no mesmo commit em que forem concluídos.

## Stack e hospedagem

- **Site estático:** HTML, CSS e JavaScript puros, sem framework, sem build e sem dependências.
  O site antigo era Next.js na Vercel e foi abandonado por decisão do Lucas: **não usar Next.js nem Vercel**.
- **Hospedagem:** GitHub Pages, branch `main`, pasta raiz. Cada push publica em cerca de 30 a 45 segundos.
- **Repositório:** https://github.com/LucasE616/lucasemanuel.com.br. O usuário do GitHub se escreve
  `LucasE616` (antes era `lucase616`, que ainda redireciona).
- **Domínio:** `lucasemanuel.com.br`, registrado no Registro.br, com DNS nos servidores do próprio
  Registro.br (a Vercel não é mais usada):
  - 4 registros A: `185.199.108.153` a `185.199.111.153`
  - 4 registros AAAA: `2606:50c0:8000::153` a `2606:50c0:8003::153`
  - `www` CNAME → `lucase616.github.io`
- **HTTPS:** certificado da Let's Encrypt emitido pelo GitHub, com "Enforce HTTPS" ativo. HTTP e `www`
  redirecionam com 301 para `https://lucasemanuel.com.br`. A emissão só funcionou depois de remover e
  readicionar o domínio em Settings → Pages.
- **Arquivos de publicação:** `CNAME` (domínio) e `.nojekyll` (publica os arquivos como estão). Tudo no
  repositório fica acessível pelo site, inclusive os `.md`.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home: apresentação (hero), README com skills e contatos, modal e paleta |
| `setup/index.html` | Página `/setup`: equipamentos e ferramentas |
| `style.css` | Estilos compartilhados pelas duas páginas |
| `script.js` | Paleta de comandos, atalhos, modais, botões de copiar e navegação entre páginas |
| `favicon.svg` | Ícone "le" |
| `ROADMAP.md` | Melhorias planejadas (30 itens) |

## Visual

- Referências escolhidas pelo Lucas: **waldir.dev** (fundo escuro, nome grande, paleta Ctrl+K, redes no
  rodapé) e o antigo **lucasmontano.com** (site em estilo README do GitHub).
- **Dois temas** (item 27), escolhidos no seletor do cabeçalho ou na paleta: Claro, Escuro ou Sistema (padrão).
  - **Escuro:** variáveis no `:root` de `style.css`: `--bg #08070b`, `--surface`, `--surface-2`, `--border`,
    `--text #f2f2f2`, `--muted #8f9ba8` e `--accent #50fa7b` (verde do `printf`).
  - **Claro:** `:root[data-theme="light"]`, com creme `#faf7f0`, texto `#2a2622` e ferrugem `#a63a1e`
    (as cores da primeira versão do setup).
  - Nunca use cor fixa em componentes: use as variáveis (`--backdrop` e `--shadow` existem para fundos
    translúcidos e sombras), senão o elemento quebra num dos temas.
- **README da home no tema claro = primeira página do New York Times** (pedido do Lucas): título na fonte
  Chomsky (imitação livre, OFL, da letra gótica do cabeçalho do NYT, via jsDelivr), linha de data com a
  data do dia entre fios, texto em Times e seções em colunas com fios. Os estilos ficam em
  `:root[data-theme="light"] .readme...`; no escuro o README continua no estilo GitHub.
- **Fontes** (variáveis no `:root`):
  - `--sans` / `--display`: **Verdana** (fonte de sistema), para o texto e os títulos de página (nome, "Setup").
  - `--serif`: **Times New Roman** (fonte de sistema), para os títulos dos tópicos: `h2`/`h3` do README,
    títulos dos modais e categorias do setup. Em negrito e um pouco maior que o texto.
  - `--mono`: **JetBrains Mono**, a única baixada do Google Fonts, para rótulos, tags e código.
- Tamanhos com `clamp()`: `--title-size` controla o nome e o título do setup: 40px no celular, 72px em
  1920px e menos de 40px só abaixo de ~385px (33px em 320px), para o nome em Verdana caber numa linha.
- Na home, os blocos de conteúdo imitam arquivos: cabeçalho com nome de arquivo (`README.md`,
  `skills.md`, `contato.md`).
- **A página `/setup` usa a estrutura do akitaonrails.com** (item 26 do roadmap): marcadores ◆, tags
  `#tag`, sumário lateral, alternância Lista/Grade e bloco em destaque. **O fundo é o mesmo escuro do
  resto do site**, por pedido do Lucas (o fundo creme do akitaonrails.com foi descartado). Só o destaque
  muda: `--accent: #e8805f` em `body[data-page="setup"]`, um ferrugem clareado para ter ~7:1 de contraste
  no fundo escuro (o `#a63a1e` original teria ~3:1). As fontes continuam Verdana e Times New Roman.

## Padrões de código

- **Hero:** ocupa exatamente `100svh - var(--header-h)`. O README **nunca** pode aparecer na primeira
  tela, em nenhum tamanho de tela.
- **Modais de tópico:** o conteúdo vem do README por `data-topic="nome"` e é clonado para o modal, sem
  duplicar HTML. Os tópicos são registrados no objeto `topics` de `script.js`.
- **Toda página nova precisa de:** o script de tema no `<head>` (antes do `style.css`, copiado de
  `index.html`), o bloco `.header-actions` com o seletor de tema e a paleta, e o `script.js`.
  Chaves no `localStorage`: `theme` e `setup-view`.
- **Várias páginas:** `<body data-page="setup" data-root="../">`. Fora da home, Skills e Contato levam
  para `/#topico`, e a home abre o modal pelo hash e limpa a URL.
- **Atalhos de teclado:** I (Início, fecha o modal e vai ao topo), S (Skills), C (Contato) e U (Setup).
  São ignorados enquanto se digita e com a paleta aberta. Cada comando fica no array `commands` de
  `script.js`, que também alimenta a paleta.
- **Copiar:** `navigator.clipboard` só existe em HTTPS, então há um plano B com `execCommand`. Os
  botões usam `data-copy` com delegação de eventos, para funcionarem também dentro dos modais.
- **Setup:** cada categoria é uma `<section class="paper-section" id="...">` com `<h2>` e
  `<ul class="items">`. Cada item é `<li><span class="item-name">Nome</span><span class="item-tag">#rotulo</span></li>`,
  com a tag em minúsculas, sem acento e com hífen (`#apoio-de-pulso`). O notebook fica num
  `<details class="featured">` com `<dl class="specs">`. Ao criar uma categoria, adicione também o link
  no sumário (`<aside class="toc">`). O modo Grade é a classe `is-grid` nas `.items`, controlada pelo `script.js`.
- **Acessibilidade:** foco preso dentro do modal com Tab e devolvido ao elemento de origem ao fechar;
  `aria-current="page"` no menu; `prefers-reduced-motion` desliga as animações.

## Preferências do Lucas

- **Nunca inventar conteúdo pessoal:** frases de apresentação, experiências, itens ou comentários. Na
  apresentação ele pediu só nome, cargo e stack, sem frases. Quando faltar informação, pergunte.
- **Corrigir nomes de produtos e títulos**, e sempre avisar o que foi corrigido. Exemplos: Logitech,
  Faber-Castell EcoLápis, Pentel EnerGel, John Wick, Baby Driver, Zack Snyder, The Glenlivet, Sestini e
  10.000 mAh. Se não tiver certeza de um nome, pergunte antes de publicar. Foi assim com o "Trpad", que
  era o TinyRetroPad.
- Não publicar funcionalidade vazia (como um modal só com "Em breve"). Fazer o commit local e esperar o
  conteúdo.
- Os commits vão direto para a `main` e são enviados logo, o que publica o site. Quando um PR foi
  pedido, não havia branch separada, e o Lucas preferiu manter assim. Se ele pedir PR, crie a branch
  antes de commitar.
- Dados privados de planilhas (como anotações de empréstimo na coluna OBS) não vão para o site.

## Fluxo de trabalho (Windows)

- **Shell:** PowerShell 5.1. Mensagens de commit com aspas quebram no `-m`; escreva a mensagem num
  arquivo e use `git commit -F arquivo`.
- **Caminhos longos:** se a pasta tiver caminho longo, rode `git config core.longpaths true`.
- **Servidor local:** `python -m http.server 5500` na raiz do projeto. A config de preview fica em
  `.claude/launch.json`, que está no `.gitignore`.
- **Versão dos arquivos (obrigatório):** os dois HTMLs pedem `style.css?v=AAAAMMDD.N` e `script.js?v=AAAAMMDD.N`.
  **Sempre que mudar `style.css` ou `script.js`, aumente o `?v=` nos dois HTMLs** (`index.html` e
  `setup/index.html`), no mesmo commit. O GitHub Pages manda o navegador guardar os arquivos por 10 minutos
  (`max-age=600`); sem trocar a versão, o visitante recebe HTML novo com CSS/JS antigos, e o site quebra.
  Isso aconteceu em 26/09/2026: o botão de tema não funcionava e o cabeçalho ficou sem estilo.
- **Cache no teste local:** o navegador reaproveita `style.css` e `script.js` antigos. Antes de testar, force
  com `fetch(url, {cache: 'reload'})` ou troque o `href` com `?v=`. Isso já causou vários falsos alarmes.
- **Painel de navegador oculto:** quando o painel está escondido, o Chromium congela a renderização, e
  rolagem e screenshots falham. Verifique pelo DOM (medidas e contagens) antes de concluir que há bug.
  Transições CSS também congelam: ao medir cores depois de trocar o tema, desligue as transições
  (`*{transition:none!important}`) ou a medição mostra a cor antiga. `IntersectionObserver` e
  `requestAnimationFrame` também param, então prefira lógica baseada em eventos de rolagem.
- **Testar os dois temas:** troque `document.documentElement.dataset.theme` entre `light` e `dark` e rode o
  checklist em cada um.
- **Conferir o deploy:** depois do push, consulte o site com `curl.exe -s "https://lucasemanuel.com.br/...?t=aleatorio"`
  até o conteúdo novo aparecer.
- O `gh` CLI não está instalado. O Git usa o Git Credential Manager.

## Checklist de testes visuais

Testar em **1920×1080**, **1366×768**, **375×812** e **320×640**:

- sem rolagem lateral (`document.documentElement.scrollWidth === innerWidth`);
- README abaixo da primeira tela na home;
- os 4 links do menu numa linha só (abaixo de 360px o menu é compactado);
- modais cabendo na tela, com rolagem interna quando necessário.

## Pendências abertas

- Cadeira do setup: modelo ainda não informado.
- "Wh" no suporte de headset: confirmar se é a marca.

## Histórico resumido

1. Site estático criado com hero, README (skills e contatos), paleta Ctrl+K e deploy no GitHub Pages.
2. DNS migrado da Vercel para o Registro.br; HTTPS emitido e forçado.
3. Atalhos I/S/C; hero ajustado para esconder o README; plano B para copiar fora do HTTPS.
4. Skills e Contato passaram a abrir em modal em vez de rolar a página.
5. Página `/setup` com Notebook, Periféricos, Mesa, Áudio, Mobile, Papelaria e Ferramentas; atalho U.
6. Curiosidades & indicações: 45 livros (abas "Meus livros" e "PDF" da planilha `D:\Control Spreadsheets\Livros LCS.xlsx`),
   9 séries, 14 filmes e 9 produtos, num modal com barra de atalhos de seção.
7. Tipografia maior em monitores; ROADMAP.md com 21 itens, incluindo a área administrativa (item 21).
8. Item 22 (fonte Verdana) no roadmap; CLAUDE.md criado.
9. **Curiosidades & indicações removido do site** a pedido do Lucas. Não recriar sem ele pedir. Se pedir
   de volta, o conteúdo e o código completos estão no commit `71df592` (`git show 71df592`).
10. Roadmap ampliado até o item 30 (terminal, currículo, visual do akitaonrails.com no setup, temas, idiomas,
    XML/JSON e jogos). Fonte trocada para Verdana, com títulos dos tópicos em Times New Roman (item 22).
11. Página `/setup` refeita com a identidade visual do akitaonrails.com (item 26), mantendo as fontes.
    Logo depois, o Lucas pediu o fundo escuro do resto do site no lugar do creme.
12. Tema claro/escuro/sistema no site todo (item 27), com o creme e o ferrugem no claro e o README da
    home em estilo de primeira página do New York Times no tema claro.
13. Versão nos arquivos (`?v=`) depois que o cache misturou versões e quebrou o botão de tema (item 17).
