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
| `index.html` | Home: apresentação (hero), README com skills, contatos e curiosidades & indicações, modal e paleta |
| `setup/index.html` | Página `/setup`: equipamentos e ferramentas |
| `style.css` | Estilos compartilhados pelas duas páginas |
| `script.js` | Paleta de comandos, atalhos, modais, botões de copiar e navegação entre páginas |
| `favicon.svg` | Ícone "le" |
| `ROADMAP.md` | Melhorias planejadas (22 itens) |

## Visual

- Referências escolhidas pelo Lucas: **waldir.dev** (fundo escuro, nome grande, paleta Ctrl+K, redes no
  rodapé) e o antigo **lucasmontano.com** (site em estilo README do GitHub).
- Cores em variáveis no `:root` de `style.css`: `--bg #08070b`, `--surface`, `--surface-2`, `--border`,
  `--text #f2f2f2`, `--muted #8f9ba8` e `--accent #50fa7b` (verde do `printf`).
- Fontes do Google Fonts: Inter (texto), Inter Tight (títulos) e JetBrains Mono (rótulos e código).
- Tamanhos com `clamp()`: `--title-size` controla o nome e o título do setup (40px no celular, 72px em
  1920px). No celular os tamanhos devem continuar iguais.
- Blocos de conteúdo imitam arquivos: cabeçalho com nome de arquivo (`README.md`, `setup.md`,
  `skills.md`, `contato.md`, `indicacoes.md`).

## Padrões de código

- **Hero:** ocupa exatamente `100svh - var(--header-h)`. O README **nunca** pode aparecer na primeira
  tela, em nenhum tamanho de tela.
- **Modais de tópico:** o conteúdo vem do README por `data-topic="nome"` e é clonado para o modal, sem
  duplicar HTML. Conteúdo que só existe no modal fica num `<template data-topic="...">`, como as
  indicações. Os tópicos são registrados no objeto `topics` de `script.js`.
- **Botões que abrem modal:** usam `data-open-topic="nome"`. Atalhos de seção dentro do modal usam
  `data-jump` (no botão) e `data-section` (no destino).
- **Várias páginas:** `<body data-page="setup" data-root="../">`. Fora da home, Skills, Contato e
  Indicações levam para `/#topico`, e a home abre o modal pelo hash e limpa a URL.
- **Atalhos de teclado:** I (Início, fecha o modal e vai ao topo), S (Skills), C (Contato) e U (Setup).
  São ignorados enquanto se digita e com a paleta aberta. Cada comando fica no array `commands` de
  `script.js`, que também alimenta a paleta.
- **Copiar:** `navigator.clipboard` só existe em HTTPS, então há um plano B com `execCommand`. Os
  botões usam `data-copy` com delegação de eventos, para funcionarem também dentro dos modais.
- **Listas do setup:** `<ul class="gear">` com linhas `<span class="label">` + `<span class="value">`.
  Especificações do notebook em `<dl class="gear-specs">`.
- **Indicações:** livros em `<h4>` por tópico + `<ul class="picks">` (`pick-name` e `pick-meta`), em duas
  colunas a partir de 640px. Séries, filmes e produtos em `<ul class="tags">`.
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
- **Cache no teste:** o navegador reaproveita `style.css` e `script.js` antigos. Antes de testar, force
  com `fetch(url, {cache: 'reload'})` ou troque o `href` com `?v=`. Isso já causou vários falsos alarmes.
- **Painel de navegador oculto:** quando o painel está escondido, o Chromium congela a renderização, e
  rolagem e screenshots falham. Verifique pelo DOM (medidas e contagens) antes de concluir que há bug.
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
- "Lista de desejos" da planilha de livros (49 livros): ficou de fora; o Lucas pode querer uma seção "Quero ler".
- Livros de "Referência" (Constituição e dicionário ilustrado de inglês): confirmar se devem ficar nas indicações.
- "Curiosidades": o título promete fatos sobre o Lucas, mas por enquanto só há indicações.
- Atalho de teclado para as indicações: sugerido **R**, ainda não criado.

## Histórico resumido

1. Site estático criado com hero, README (skills e contatos), paleta Ctrl+K e deploy no GitHub Pages.
2. DNS migrado da Vercel para o Registro.br; HTTPS emitido e forçado.
3. Atalhos I/S/C; hero ajustado para esconder o README; plano B para copiar fora do HTTPS.
4. Skills e Contato passaram a abrir em modal em vez de rolar a página.
5. Página `/setup` com Notebook, Periféricos, Mesa, Áudio, Mobile, Papelaria e Ferramentas; atalho U.
6. Curiosidades & indicações: 45 livros (abas "Meus livros" e "PDF" da planilha `D:\Control Spreadsheets\Livros LCS.xlsx`),
   9 séries, 14 filmes e 9 produtos.
7. Tipografia maior em monitores; ROADMAP.md com 21 itens, incluindo a área administrativa (item 21).
