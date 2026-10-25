# Roadmap

Ideias de melhorias para o site. Esforço: **baixo**, **médio** ou **alto**.

Status: ⬜ a fazer · 🟡 em andamento · ✅ feito · ↪ incorporado a outro item · ⏸ arquivado (saiu do site, pode voltar) · 🔍 possibilidade a analisar

## Conteúdo

1. ⬜ **Página de Projetos** (médio). Mostrar repositórios como `servidor-http`, `ged-offline`, `encrypt`, `FutebolAPI`, `Consumo-API` e `entendendo-C`, com descrição, tecnologias e links. Pode puxar os dados da API do GitHub para se atualizar sozinha.
2. ↪ **Currículo em PDF**. Incorporado ao item 24.
3. ↪ **Experiência e formação**. Incorporado ao item 24.
4. ⬜ **Sobre** (baixo). Foto e um parágrafo curto.
5. 🟡 **Setup completo** (baixo). Já tem Notebook, Periféricos, Mesa, Áudio, Mobile, Papelaria e Ferramentas. Falta a cadeira.
6. ⬜ **Página "Agora"** (baixo). O que está estudando ou construindo no momento.
7. ⬜ **Notas ou blog** (alto). Publicar notas do Obsidian (Markdown) como páginas do site.
24. ✅ **Menu Educação / Currículo** (médio). Feito em 27/09/2026: página `/curriculo` (atalho E), com experiência, formação, cursos, habilidades, idiomas e livros técnicos, PDF pela impressão e comando `curriculo` no terminal. Faltam datas, carga horária e links de verificação dos cursos. Detalhes abaixo.
37. ✅ **Serviços** (baixo). Feito em 13/10/2026: página `/servicos` (atalho V), com desenvolvimento (sites, sistemas, softwares e apps), formatação de PC em 4 planos (R$ 25, 50, 75 e 100), configuração (PC novo ou antigo, celulares, eletrônicos e eletrodomésticos), impressoras e scanners (instalação, configuração e manutenção) e contato. Em 13/10/2026 os planos ganharam o conteúdo: 1, formatação; 2, + instalação de apps e atualização dos drivers; 3, + limpeza do Windows; 4, + backup.
39. ⬜ **Links: sites, canais do YouTube e ferramentas que uso** (baixo). Pedido em 18/10/2026. Antes, o Lucas precisa organizar quais links vão para o `/curriculo` e quais vão para o `/setup`. A lista ainda não foi enviada.
25. ⏸ **Curiosidades & indicações** (baixo para restaurar). Existiu no site e foi removido a pedido. Pode voltar quando o Lucas quiser. Detalhes abaixo.

## Funcionalidades

8. ⬜ **Versão em inglês** (médio). Para vagas de fora e remotas.
9. ✅ **Página 404 personalizada** (baixo). Feita em 26/09/2026: `404.html` com o mesmo visual, mostrando o endereço pedido no formato de erro do terminal.
10. ⬜ **Mais comandos na paleta** (baixo). Baixar currículo, copiar o link do site, abrir cada projeto.
11. ↪ **Terminal interativo**. Incorporado ao item 23.
12. ⬜ **Formulário de contato** (baixo). Via serviço como o Formspree, sem back-end próprio. Alternativa com back-end próprio no item 41.
13. ⬜ **Estatísticas do GitHub** (médio). Linguagens mais usadas, repositórios recentes.
14. ↪ **Alternar tema claro/escuro**. Feito junto com o item 27.
23. 🟡 **Site em linha de comando** (médio). Feito em 26/09/2026: formas A (`/terminal`, atalho T ou crase) e B (`/cli`). Falta a forma C (`npx lucasemanuel`) e os comandos `sl` e `projetos` (o `curriculo` foi feito em 27/09/2026, com o item 24). Versão do site em forma de terminal, com os comandos do conteúdo real e comandos lúdicos sobre Linux, C, Python, JS/Node e servidores. Detalhes abaixo.
27. ✅ **Tema escuro / claro / sistema** (médio). Feito em 26/09/2026, com o README da home em estilo de jornal no tema claro. Detalhes abaixo.
28. ⬜ **Idiomas: português, inglês, espanhol, japonês, italiano e alemão** (alto). Seletor de idioma com redirecionamento automático opcional, como o do akitaonrails.com. Detalhes abaixo.
29. ⬜ **Exportar o site em XML e JSON** (médio). Versões do conteúdo em formatos de máquina, seguindo o akitaonrails.com (RSS e sitemap em XML) e indo além dele com JSON. Detalhes abaixo.
30. 🟡 **Jogos contra a máquina: jogo da velha e damas em tabuleiro reduzido** (jogo da velha: baixo · damas: médio-alto). Feito em 26/09/2026: página `/jogos` (atalho J), com abas para o jogo da velha e para um jogo de carrinho (fora do plano original), e os dois também no terminal (`play velha` e `play carrinho`). Damas feitas em 27/09/2026 (aba na página e `play damas`). Falta a aba "Como a IA pensa". O visitante joga contra uma IA feita por você, o que também mostra algoritmos na prática. Detalhes abaixo.

## Visual

26. ✅ **Setup com a identidade visual do akitaonrails.com** (médio). Feito em 26/09/2026, mantendo Verdana (texto) e Times New Roman (títulos dos tópicos) no lugar das fontes do akitaonrails.com. Detalhes e decisões abaixo.
22. ✅ **Fonte Verdana** (baixo). Feito em 26/09/2026.
    - **Texto e títulos de página** (nome, "Setup"): Verdana, com alternativas `Verdana, Geneva, "DejaVu Sans", sans-serif` para celular e Linux.
    - **Títulos dos tópicos** (seções do README, títulos dos modais e categorias do setup): serifada, `"Times New Roman", Times, "Liberation Serif", serif`, em negrito e um pouco maiores, porque a Times parece menor que a Verdana no mesmo tamanho.
    - **Rótulos e códigos:** continuam em JetBrains Mono, por causa do estilo README.
    - Inter e Inter Tight saíram do Google Fonts. Agora só a JetBrains Mono é baixada.
    - Como a Verdana é larga, o nome encolhe abaixo de ~385px (33px em 320px) para caber numa linha. A partir de ~385px continua com 40px, e no computador nada mudou.
48. 🔍 **Fonte Michelangelus, da Microsoft** (baixo). Pedido em 18/10/2026: estudar em quais lugares do site usar a fonte. A Michelangelus é uma serifada gratuita lançada em 2026 pela Microsoft com o Vaticano, desenhada pela Studiogusto a partir das cartas de Michelangelo, com 4 estilos (normal, itálico, negrito e negrito itálico) e só alfabeto latino.
    - **Antes de tudo, a licença:** conferir se ela pode ser servida no site com `@font-face` (arquivo `.woff2` no repositório). Ser grátis para baixar não garante uso na web. Se não puder, só aparece para quem a tiver instalada, como a Verdana hoje.
    - **Lugares a avaliar:** os que hoje usam a Times New Roman (`--serif`: títulos dos tópicos, dos modais e das categorias do setup), o README da home no tema claro (estilo de jornal), o `/curriculo` e o nome no hero.
    - **Peso:** medir o tamanho dos arquivos, porque hoje só a JetBrains Mono é baixada.

## Técnico

15. ✅ **Imagem de prévia (Open Graph)** (baixo). Feito em 24/10/2026 (item 49): `og-image.png` em todas as páginas, para o link compartilhado no LinkedIn/WhatsApp aparecer com imagem.
16. ✅ **`sitemap.xml` e `robots.txt`** (baixo). Feito em 24/10/2026 (item 49): indexação no Google, incluindo `/setup`, `/terminal` e `/jogos`.
17. ✅ **Versão nos arquivos CSS e JS** (baixo). Feito em 26/09/2026 (`?v=AAAAMMDD.N`), depois que o cache misturou HTML novo com CSS/JS antigos e quebrou o botão de tema. A versão é trocada à mão a cada mudança no CSS ou no JS (regra no CLAUDE.md). Um próximo passo seria automatizar isso no GitHub Actions (item 20).
18. ⬜ **Analytics sem cookies** (baixo). GoatCounter ou Cloudflare Web Analytics, sem banner de consentimento. O Cloudflare entra no item 40.
19. ⬜ **Auditoria com Lighthouse** (baixo). Acessibilidade e desempenho.
20. ⬜ **Verificação no GitHub Actions** (médio). Validar HTML e checar links quebrados a cada push. Também pode trocar o `?v=` sozinho: hoje ele é trocado à mão em 18 lugares (5 HTMLs), e um esquecimento já quebrou o site em 26/09/2026 (item 17).
21. ⬜ **Área administrativa** (médio-alto). Editar o conteúdo do site por formulários, sem mexer no código.
49. ⬜ **Checklist do makemefindable** (baixo). Em 24/10/2026, o makemefindable.com deu 70,73% ao site, com 6 erros e 6 avisos. Inclui os itens 15 e 16. Checklist abaixo.

## Back-end e infraestrutura

Analisado em 13/10/2026: o que dá para usar de MongoDB, PostgreSQL, Cloudflare, OAuth2, JWT, AWS e nginx com o site no GitHub Pages. Tudo de 40 a 44 é gratuito dentro dos limites dos planos grátis. Detalhes e custos abaixo.

40. 🟡 **Cloudflare na frente do site** (baixo). **Em andamento desde 25/10/2026** (plano de melhorias, Fase 2): DNS no Cloudflare e site no Cloudflare Pages (o GitHub Pages foi despublicado); faltam HSTS (`_headers`), analytics e regras de cache. Texto original: DNS do Registro.br passa para o Cloudflare (o GitHub Pages continua), Web Analytics sem cookies (item 18), bloqueio de `/CLAUDE.md` e `/ROADMAP.md` (item 35), HSTS (item 49) e regras de cache. Sem programar. **Ao começar, lembrar o Lucas** (pedido em 24/10/2026) de ligar o HSTS e de decidir o analytics: GA4 ou sem cookies (ver "GA tags" no item 49).
41. ⬜ **Formulário de contato com back-end próprio** (médio). API no Cloudflare Workers, anti-robô com o Turnstile, mensagens salvas no banco (Neon/PostgreSQL ou MongoDB Atlas) e aviso por e-mail. Alternativa ao Formspree do item 12.
42. ⬜ **Ranking global dos jogos** (médio). Login com GitHub (OAuth2), sessão com JWT e placares da velha, das damas e do carrinho salvos no PostgreSQL. Hoje os placares ficam só no `localStorage` (item 30).
43. ⬜ **Login pelo GitHub e imagens da área administrativa** (médio). O OAuth do Decap/Sveltia CMS roda num Worker, e as imagens vão para o Cloudflare R2 ou para o próprio repositório. Feito junto com o item 21.
44. ⬜ **API do GitHub em cache** (baixo a médio). Um Worker agendado busca os repositórios e guarda no cache do Cloudflare, para a Página de Projetos (1), as Estatísticas do GitHub (13) e o `git log` do terminal (23), sem o limite de 60 consultas por hora.
45. 🔍 **Servidor próprio com nginx** (alto). Alternativa aos itens 41 a 44: VM grátis (Oracle ou Google) ou o PC + Cloudflare Tunnel, com nginx, HTTPS da Let's Encrypt e o banco na própria VM. Também tornaria possível o `ssh lucasemanuel.com.br` do item 23.
46. 🔍 **Outras ferramentas avaliadas** (variável). AWS S3 e EC2 (pagos depois de 6 meses), AEM da Adobe (caro e fora de escala), Supabase (pausa sem uso) e MongoDB com PostgreSQL ao mesmo tempo (redundante).
47. 🔍 **AWS IAM** (baixo). Permissões de acesso aos recursos da AWS: um usuário ou papel que só pode gravar no bucket do S3, usado pelo Worker para gerar os links de envio de imagens. O IAM é grátis, mas só faz sentido se a AWS entrar no projeto (item 46). Não é login de visitantes.

## Correções

Encontradas numa revisão do código em 27/09/2026. Detalhes abaixo.

31. ⬜ **Bug: Ctrl+C no terminal dá dois lances seguidos ao visitante** (baixo). Em `play velha` e `play damas`, apertar Ctrl+C enquanto a máquina "pensa" cancela o lance dela, mas a partida continua, e o visitante joga de novo.
32. ⬜ **Bug: terminal sem pastas se o boot falhar** (baixo). Se o conteúdo não carregar no boot, `ls`, `cd`, `cat` e `tree` dão erro mesmo depois que o conteúdo carrega.
33. ✅ **README.md desatualizado** (baixo). Feito em 24/10/2026: páginas, `curl` do cartão, todos os atalhos, servidor local (`python` ou `py`), estrutura completa (com `fonts/`, `robots.txt`, `sitemap.xml` e `og-image.png`) e a regra do `?v=`.
34. ✅ **Links do GitHub com o usuário antigo** (baixo). Feito em 24/10/2026: `github.com/lucase616` virou `github.com/LucasE616` nos HTMLs, no rodapé, na paleta e no `cli`. O Instagram continua `lucase616`, e o CNAME `lucase616.github.io` não muda (DNS não diferencia maiúsculas).
35. ✅ **`CLAUDE.md` e `ROADMAP.md` publicados no site** (baixo a médio). **Feito em 25/10/2026:** só a pasta `site/` é publicada, então os `.md` saíram do domínio sem precisar de regra no Cloudflare. Texto original: `lucasemanuel.com.br/CLAUDE.md` abre, com caminhos de arquivos do PC. Nada secreto, e o repositório é público, mas não precisa estar no domínio. Uma regra no Cloudflare (item 40) resolve sem mudar a publicação.
38. ⬜ **Bug: cabeçalho estoura a largura em algumas faixas** (baixo). Medido em 13/10/2026, antes do link Serviços: a home, `/jogos` e `/terminal` passam da largura da tela entre ~530 e 540px, e `/setup`, `/curriculo` e `/servicos` entre ~650 e 710px. São as faixas logo depois que o menu compacto (até 520px) e a busca só com ícone (até 640px) acabam. Correção sugerida: estender esses dois `@media` ou diminuir o espaçamento dos links nessas faixas.
36. ✅ **Contatos expostos a robôs de spam** (baixo). Feito em 27/09/2026: o telefone só aparece com um clique em "mostrar telefone", e o e-mail do Yahoo é montado pelo JavaScript. Em 24/10/2026 (item 49), os dois e-mails passaram a aparecer só com um clique em "mostrar e-mail".

### Detalhes das correções (itens 31 a 36)

**31. Ctrl+C durante o lance da máquina** (`terminal/terminal.js`, funções `aiPlay` de `velhaMode` e `damasMode`):

- Como acontece: o visitante joga, a máquina chama `sleep(300)`, o Ctrl+C liga `aborted` e o `sleep` rejeita com `Abort`. O `execute` mostra `^C`, mas `mode` continua sendo o jogo, com a vez da máquina pulada. No jogo da velha, o visitante marca outra casa; nas damas, `DM.play` aceita o lance do lado 1 mesmo com `game.turn === -1`.
- Correção sugerida: no `catch` do `execute`, se vier `Abort` com um jogo em andamento, encerrar a partida (`mode = null` e "Partida encerrada."). Outra opção é a máquina terminar o lance mesmo com o Ctrl+C.
- Testar: jogar, apertar Ctrl+C logo depois e conferir que não dá para jogar de novo na mesma vez.

**32. Boot sem conteúdo** (`terminal/terminal.js`, boot e `loadData`):

- Como acontece: `fs = buildFs(d)` só roda no boot. Se o `loadData()` falhar ali (sem internet, por exemplo), `fs` fica `null`. Depois, `ls`, `cd`, `cat` e `tree` chamam `await loadData()`, que pode dar certo, mas `resolve()` lê `fs` nulo e dá `TypeError`.
- Correção sugerida: montar o `fs` dentro do `loadData()` (ou depois de cada `await loadData()` quando `fs` for nulo).

**33. README.md:**

- `python -m http.server 5500` → `py -m http.server 5500` (neste PC o `python` não existe), ou citar os dois.
- Estrutura: incluir `404.html`, `terminal/`, `jogos/`, `cli` e `favicon.svg`.
- Atalhos: hoje diz I, S, C e U; faltam T (ou crase) e J.

**34. Usuário do GitHub** (o Instagram continua `lucase616`):

- `index.html`: contato (linha ~150) e rodapé (~171).
- `setup/index.html`: rodapé (~209).
- `script.js`: comando "GitHub" da paleta, link e `hint` (~281).
- `cli`: linha do GitHub.
- No mesmo commit, em `script.js` (~276), separar em duas linhas os comandos "Tema do sistema" e "Copiar e-mail", que ficaram grudados.
- Como mexe em `script.js`, aumentar o `?v=` em todos os HTMLs.

**35. Arquivos internos no site:**

- O GitHub Pages publica tudo o que está na raiz do repositório (ver CLAUDE.md).
- Opções: publicar só uma pasta (ex.: `site/`) pelo GitHub Actions, deixando `CLAUDE.md` e `ROADMAP.md` fora dela; ou manter como está e só evitar dados sensíveis nesses arquivos. Um `robots.txt` (item 16) com `Disallow` evita a indexação, mas não esconde os arquivos.

**36. Contatos em texto puro:**

- O problema: os dois e-mails e o telefone estavam em texto puro no HTML e no `script.js`, e robôs conseguiam coletá-los.
- Opções avaliadas: deixar como está; montar pelo JavaScript (barra os robôs que só leem o HTML, que são a maioria); mostrar só com um clique (barra quase todos, inclusive os que rodam JavaScript); ou trocar pelo formulário de contato (item 12).
- **Decisão do Lucas (27/09/2026), conforme a recomendação:**
  - **Telefone:** mostrado com clique. O bloco de contato tem o botão "mostrar telefone"; o clique troca todos os botões (README e modal) pelo link `tel:` e pelo WhatsApp. É o que mais valia proteger, porque o número leva ao WhatsApp, onde chegam golpes.
  - **Yahoo:** montado pelo JavaScript ao abrir a página. Sem JavaScript, aparece "ative o JavaScript para ver o e-mail".
  - **Gmail:** continuava em texto puro, inclusive no `/cli`. Em 24/10/2026 (item 49) passou a aparecer só com clique no site, e em 25/10/2026 saiu também do `/cli`, que agora aponta para `/#contato`. Ele já é público como e-mail de autor dos commits (a API do GitHub mostra). Para protegê-lo nos commits futuros, seria preciso usar o e-mail noreply do GitHub no `git config user.email`.
- **Implementação:** objeto `Contacts` em `script.js` (exposto como `window.Contacts`), com os valores em base64 fora do HTML, que só marca o lugar com `data-contact="yahoo"` ou `data-contact="phone"`. A paleta ("Copiar e-mail (Yahoo)", "Conversar no WhatsApp", "Copiar telefone") usa o mesmo objeto. O terminal chama `Contacts.revealEmails()` no HTML lido pelo `DOMParser`, mostra o telefone como "oculto" no `contato` e ganhou o comando `telefone`; o `open whatsapp` continua funcionando.
- **Limite:** protege contra coleta automática, não contra quem abre o site e clica. O base64 não é criptografia.

### Detalhes do item 21: área administrativa

**Obstáculo:** o site é estático (GitHub Pages), sem servidor nem banco de dados, e hoje o conteúdo está escrito direto no HTML. Um painel comum não teria onde gravar os dados.

**Pré-requisitos (valem para qualquer alternativa):**

1. **Separar o conteúdo do HTML.** Skills, contatos e setup vão para arquivos de dados, como `data/setup.json`. Projetos (1) e currículo (24) já nasceriam assim.
2. **Gerar as páginas a partir dos dados**, de um destes jeitos:
   - **No navegador (JavaScript):** mais simples, mas o Google e as prévias de link enxergam menos conteúdo.
   - **No GitHub Actions (recomendado):** a cada commit, um script gera o HTML final. O site continua em HTML puro, rápido e bem indexado.

**Alternativas:**

- **A. CMS baseado em Git (recomendado).** Painel em `/admin`, com login pela conta do GitHub. Cada "Salvar" vira um commit, e o GitHub Pages publica em cerca de 30 s. Sem servidor e sem custo.
  - **Sveltia CMS (preferido):** mais novo, permite entrar com um token do GitHub. Confirmar os detalhes ao implementar.
  - **Decap CMS:** precisa de um pequeno serviço extra para o login pelo GitHub (OAuth).
  - **Segurança:** `/admin` pode ser público. Só salva quem tem permissão de escrita no repositório, e nenhum token fica no código.
- **B. Painel próprio.** Página que usa a API do GitHub para editar os arquivos de dados. Mais trabalho, mas bom projeto de portfólio para um dev back-end.
- **C. Banco de dados externo** (Supabase, Firebase). Painel "de verdade", mas o site passa a depender de um serviço externo a cada visita. Exagero para este tamanho.
- **D. Editor do GitHub.** Apertar `.` no repositório abre um editor no navegador. Zero trabalho, mas fora do site e sem formulários.

**Ordem:** fazer **antes da Página de Projetos (1)**, para os projetos já nascerem como dados editáveis pelo painel.

### Detalhes do item 23: site em linha de comando

**Status:** feitas as formas A e B. A `/terminal` está em `terminal/index.html` e `terminal/terminal.js`; o `/cli` é o arquivo `cli`, com cores ANSI. O `sl` só mostra uma dica e o `matrix` respeita `prefers-reduced-motion`.

Substitui o item 11. A ideia é o visitante poder navegar pelo portfólio como se estivesse num terminal Linux.

**Formas de entregar (podem coexistir):**

- **A. Terminal dentro do site (recomendado primeiro).** Página `/terminal`, que também abre pela tecla **T** (ou `` ` ``, estilo console de jogo) e pela paleta. O comando `exit` (ou `gui`) volta ao site visual.
- **B. `curl lucasemanuel.com.br/cli`** (baixo). Um arquivo de texto com cores ANSI, servido pelo próprio GitHub Pages. Quem roda num terminal de verdade vê um cartão de visita colorido.
- **C. `npx lucasemanuel`** (médio). Pacote npm que mostra o cartão de visita no terminal, bem alinhado com Node. Exige conta no npm e publicar o pacote.
- **SSH** (`ssh lucasemanuel.com.br`): exigiria um servidor próprio, fora do GitHub Pages. Descartado por enquanto.

**Comandos com o conteúdo do site:**

| Comando | O que faz |
|---|---|
| `help` | Lista os comandos |
| `whoami` | Nome e cargo |
| `cat README.md` | Apresentação, como na home |
| `skills` ou `ls skills/` | Linguagens e experiência |
| `contato` | Contatos com links clicáveis |
| `copy email` | Copia o e-mail |
| `setup` ou `cat setup.md` | Equipamentos e ferramentas |
| `ls`, `cd`, `pwd`, `tree` | Navegar pelas "pastas" do site (`skills/`, `setup/`, `projetos/`, `curriculo/`) |
| `open github`, `open linkedin`, `open instagram`, `open whatsapp` | Abre as redes |
| `curriculo` (ou `cv`) | ✅ Currículo lido de `/curriculo/`; também em `ls curriculo/` e `cat curriculo/idiomas.md` |
| `projetos` | Quando o item 1 existir |
| `history`, `clear` | Histórico e limpar a tela |
| `exit` ou `gui` | Volta ao site visual |

**Comandos lúdicos:**

- **Linux:**
  - `neofetch`: logo "le" em ASCII com dados reais do setup (IdeaPad 3i, i7 10ª geração, MX330, 12 GB) e uptime contado desde o primeiro commit do site.
  - `sudo <qualquer coisa>` → "lucas não está no arquivo sudoers. Este incidente será reportado."
  - `rm -rf /` → recusa bem-humorada.
  - `uname -a`, `man lucas`, `fortune`, `cowsay`.
  - `top` ou `htop` com processos fictícios (`cafe` usando 99% de CPU).
  - `vim` → a piada clássica de não conseguir sair (`:q`).
  - `sl` (trem em ASCII) e `matrix` (chuva de caracteres).
- **C:**
  - `cat hello.c`, `gcc hello.c && ./a.out` e `make`.
  - `./segfault` → "Segmentation fault (core dumped)".
  - `printf`, em referência ao `printf` do README.
- **Python:**
  - `python` abre um mini REPL com respostas prontas.
  - `import antigravity` (referência ao xkcd) e `pip install cafe`.
- **JavaScript/Node:**
  - `node -v` e `console.log("oi")`.
  - `npm install cafe` com barra de progresso.
  - `npm audit` → "0 vulnerabilidades, 1 problema crítico: falta de café".
- **Servidores e DevOps:**
  - `ping lucasemanuel.com.br`, com a latência real medida pelo navegador.
  - `curl lucasemanuel.com.br` e `ssh`.
  - `systemctl status portfolio` → "active (running)" desde o primeiro commit.
  - `docker ps` e `nginx -t`.
  - `git log` com os commits reais do repositório, pela API do GitHub, e `git status`.
- **Extras:** `coffee`, `hack` (tela de "hacker" de filme), `date` e `echo`.

**Funcionalidades do terminal:**

- Prompt `lucas@lucasemanuel:~$`, cores do site e animação de boot.
- **Tab** autocompleta, **↑/↓** navega no histórico, **Ctrl+L** limpa e **Ctrl+C** cancela.
- Sugestão para erros de digitação: "comando não encontrado: skils. Você quis dizer `skills`?"
- No celular, botões com os comandos principais, porque digitar num terminal pelo celular é ruim.
- ✅ **Jogos** (26/09/2026): `play velha` e `play carrinho`, com botões "velha" e "carrinho" no celular (item 30).
- ✅ **Personalização** (26/09/2026): engrenagem na barra abre um painel com 3 layouts (Clássico, Tela cheia e Minimalista), cor do fundo, cor das letras e fonte (JetBrains Mono, Consolas, Courier New, Lucida Console, Verdana e Times New Roman). As escolhas ficam salvas no navegador.
- ✅ Bolinhas da barra em vermelho, amarelo e verde, como numa janela de macOS.
- ✅ Botão flutuante no canto inferior direito da home e do `/setup` que abre o terminal.

**Cuidados:**

- **Nunca usar `eval`** com o que o visitante digita. Os comandos são uma lista fechada.
- Usar os mesmos dados do site (lidos do DOM como fazem os modais, ou dos arquivos de dados do item 21), sem duplicar conteúdo.
- Piadas e easter eggs podem ser criação livre, mas fatos sobre o Lucas só com o que ele informar.
- Respeitar `prefers-reduced-motion` nas animações (boot, `matrix`, `sl`).

### Detalhes do item 24: menu Educação / Currículo

Substitui os itens 2 e 3.

**O que foi implementado (27/09/2026):**

- **Página `/curriculo`** (`curriculo/index.html`), no design do `/setup` (cabeçalho com busca, seções soltas e sumário "Nesta página"), com o destaque amarelo do site. A primeira versão tinha o conteúdo num bloco de arquivo `curriculo.md`, no estilo do README; o Lucas pediu o design do setup, porque o visual de README é só da home. Experiência e formação em linha do tempo; cursos, ferramentas e livros com ◆; idiomas numa lista de dois lados.
- **Conteúdo:** do currículo e da planilha enviados pelo Lucas, sem nada inventado. Correções avisadas: "Skrum" → Scrum, "Curso em Viideo" → Curso em Vídeo e "Introdução a Programação…" → "Introdução à Programação…". "Next.js - React Foundations" virou o curso React Foundations, da plataforma Next.js.
- **Experiência:** na ordem do currículo do Lucas (e-paper, FizPay, Plant Evolution, Rlv Tecnologia), com a descrição da empresa no lugar das atividades, que não foram informadas. Em 13/10/2026: entrou a DoctorSaaS (Out 2026 – Atual, em primeiro), e a e-paper e a FizPay foram encerradas em Out 2026. Ordem: os empregos atuais primeiro (DoctorSaaS, Plant Evolution), depois os encerrados do mais recente para o mais antigo (FizPay, e-paper, Rlv Tecnologia).
- **Livros técnicos:** os 7 livros do print da planilha `Livros LCS.xlsx` (as duas linhas sem título do print, "Dopamina" e o dicionário de inglês, ficaram de fora), numa lista só, em ordem alfabética do título (a pedido do Lucas, sem os grupos Lidos / Lendo agora / Na estante da primeira versão). A coluna OBS não foi lida. Em 18/10/2026: entrou *Competente o Suficiente*, de Fabio Akita, ainda sem editora (só o autor na tag).
- **Menu:** link "Currículo" em todas as páginas (classe `nav-wide`), mas só a partir de 480px: com 5 links o menu não cabe em 320–470px (medido). No celular, a página abre pela paleta e pelo atalho **E**.
- **PDF:** botão "Baixar PDF" no canto superior direito do conteúdo (onde o setup tem Lista/Grade) e comando "Baixar currículo (PDF)" na paleta (de outra página, abre `/curriculo/#pdf`, que imprime ao carregar). O `@media print` esconde cabeçalho, sumário e rodapé, mostra um cabeçalho com nome, cargo e contatos (sem telefone nem Yahoo, item 36), usa fundo branco e listas em duas colunas. Numa simulação em A4, deu cerca de 2 páginas.
- **SEO:** JSON-LD `ProfilePage` com `Person`, `alumniOf`, `worksFor`, `knowsLanguage` e 9 `EducationalOccupationalCredential` (a graduação e os 8 cursos).
- **Terminal:** comando `curriculo` (ou `cv`), pasta `curriculo/` com um arquivo por seção e botão "curriculo" no celular. Se a página do currículo não carregar, o resto do terminal continua funcionando.
- **Dados em HTML, não em JSON:** o conteúdo ficou no HTML, como no `/setup`, porque o terminal lê as páginas com `DOMParser` e o Google indexa melhor o HTML pronto. O `data/curriculo.json` fica para o item 21.

**Pendências (informações do Lucas):**

- Cursos: data de conclusão, carga horária e link de verificação (Credly, LinkedIn ou plataforma). O "HTML & CSS" não tem emissor.
- Atividades de cada experiência, se ele quiser ir além da descrição da empresa.
- "Atlassian Workspace": confirmar o nome (talvez Jira e Confluence).

**Planejamento original:**

**Onde:** página `/curriculo` (ou `/educacao`), com item no menu, atalho **E** e comando na paleta. Também vira o comando `curriculo` no terminal (23).

**Seções:**

- **Formação acadêmica:** curso, instituição, período e situação.
- **Cursos e certificados:** nome, emissor, data, carga horária e link de verificação (Credly, LinkedIn ou a plataforma do curso).
- **Experiência profissional:** cargo, empresa, período e atividades.
- **Livros técnicos lidos:** pode vir da planilha `Livros LCS.xlsx`, filtrando a categoria Técnico com Lido = Sim. Hoje isso dá só *Entendendo Algoritmos*, mais 2 em leitura, que podem aparecer como "Lendo agora".
- **Idiomas e habilidades**, ligados às Skills da home.

**Formato:** linha do tempo, no mesmo visual de arquivo (`curriculo.md`).

**PDF (antigo item 2):** gerar a partir da própria página com CSS de impressão (`@media print`). Assim, página e PDF saem da mesma fonte, com um botão "Baixar currículo".

**SEO:** dados estruturados em JSON-LD (schema.org `Person` e `EducationalOccupationalCredential`).

**Privacidade:** não publicar fotos de diplomas ou certificados com CPF, RG, matrícula ou assinatura. Preferir texto com link de verificação e, se usar imagem, tarjar esses dados.

**Conteúdo:** tudo informado pelo Lucas, nada inventado. O ideal é já nascer como arquivo de dados (`data/curriculo.json`), pensando no item 21.

### Detalhes do item 25: Curiosidades & indicações (arquivado)

**O que era:** um bloco no fim do README da home com o botão `abrir indicacoes.md →`, que abria um modal com:

- **Livros (45)**, das abas "Meus livros" e "PDF" da planilha `D:\Control Spreadsheets\Livros LCS.xlsx`, em 7 tópicos: Programação e computação, Ciência e matemática, Negócios e finanças, Clássicos, Ficção, HQs e Referência. Só título e autor.
- **Séries (9), filmes (14) e produtos (9)**, em etiquetas.
- Barra fixa de atalhos no modal (Livros · Séries · Filmes · Produtos), livros em duas colunas a partir de 640px e comando na paleta.

**Como restaurar:** tudo, conteúdo e código, está no commit `71df592` (a remoção foi no `074f545`). Dá para ver com `git show 71df592` e trazer de volta tudo ou só uma parte, por exemplo só os livros.

**Decisões que ficaram em aberto:**

- Incluir a aba "Lista de desejos" da planilha (49 livros) numa seção "Quero ler"?
- Manter os livros de "Referência" (Constituição e dicionário ilustrado de inglês)?
- "Curiosidades": o título prometia fatos sobre o Lucas, mas só havia indicações. Se voltar, pedir os fatos a ele.
- Atalho de teclado sugerido: **R** (recomendações).
- Se o item 26 (visual do akitaonrails.com) for feito antes, as indicações podem voltar já nesse visual, talvez como página própria em vez de modal.

### Detalhes do item 26: setup com a identidade visual do akitaonrails.com

**Decisão:** a página `/setup` não segue mais o layout atual (fundo escuro e bloco `setup.md` em estilo README). Ela passa a seguir a identidade visual do [akitaonrails.com](https://akitaonrails.com/).

**Como é o visual do akitaonrails.com** (analisado em 25/09/2026; o site é feito em Hugo com o tema Hextra):

- **Fundo creme** `#faf7f0`, como papel, com texto marrom-escuro `#2a2622`.
- **Texto com serifa:** Source Serif 4, em 19px, confortável para leitura longa.
- **Títulos sem serifa e em negrito:** Source Sans 3, com um traço fino embaixo das seções.
- **Links cor de ferrugem** `#a63a1e`, sublinhados.
- **Listas com marcador em losango** ◆ na cor dos links e **tags pequenas e discretas** no formato `#tag`.
- **Barra superior clara:** nome do site à esquerda; à direita, links, busca com atalho Ctrl K, RSS, seletor PT | EN com opção "auto" e botão de tema.
- **Sumário lateral** ("On this page") com âncoras para cada seção.
- **Alternância Lista / Grade** para ver os itens de formas diferentes.
- **Bloco recolhível** ("Featured" com botão Show).

**Como adaptar ao setup:**

- Cada categoria (Notebook, Periféricos, Mesa, Áudio, Mobile, Papelaria, Ferramentas) vira uma seção com título sem serifa e itens com ◆.
- O rótulo de cada item (Mouse, Monitor…) pode virar a tag discreta, no formato `#mouse`.
- Sumário lateral com as categorias no computador. No celular, ele vira uma lista no topo.
- Alternância Lista / Grade: na grade, cada item vira um cartão (bom para uma futura foto do equipamento).
- O Notebook pode ser o bloco em destaque, com as especificações recolhíveis.

**O que foi implementado (26/09/2026):**

- **Fundo:** começou creme, como o do akitaonrails.com, mas o Lucas pediu o **mesmo fundo escuro do resto do site**. O que ficou do akitaonrails.com é a estrutura e o destaque ferrugem, clareado para `#e8805f` (contraste ~7:1 no escuro; o `#a63a1e` original teria ~3:1). Ele é definido em `body[data-page="setup"]`.
- Barra superior clara, com os links à direita e uma **caixa de busca "Buscar… Ctrl K"** que abre a paleta. No celular, vira só o ícone.
- Seções com título em Times New Roman, itens com ◆ em ferrugem e tag discreta (`#mouse`).
- **Notebook em destaque** (`<details>`), com o botão "Mostrar/Ocultar" das especificações. Começa fechado, como o "Featured" do akitaonrails.com.
- **Sumário "Nesta página"** na lateral a partir de 1024px, acompanhando a rolagem e marcando a seção atual. Abaixo disso, vira uma lista no topo.
- **Alternância Lista / Grade**, com a escolha guardada no `localStorage` (chave `setup-view`).
- **Fontes:** Verdana e Times New Roman, por decisão do Lucas, no lugar da Source Serif 4 e da Source Sans 3 do akitaonrails.com.
- Com o fundo escuro, home e setup ficaram com a mesma base de cores. A diferença é a estrutura e o destaque ferrugem.

**Pontos que continuam para decidir:**

- **Tema claro:** com o item 27, o setup pode ganhar uma versão clara, e o creme do akitaonrails.com seria o candidato natural.
- **Não copiar:** seguir a identidade (cores, tipografia, organização), não copiar código nem textos do site dele.

### Detalhes do item 27: tema escuro / claro / sistema

**O que foi implementado (26/09/2026):**

- **Seletor** (ícone de lua/sol) no cabeçalho das duas páginas, com menu Claro / Escuro / Sistema, e três comandos na paleta ("Tema claro", "Tema escuro", "Tema do sistema"). O padrão é **Sistema**.
- A escolha fica no `localStorage` (chave `theme`; "Sistema" apaga a chave). Um script no `<head>` de cada página aplica `<html data-theme="light|dark">` antes de desenhar, para não piscar.
- **Cores do tema claro:** as da primeira versão do setup (creme `#faf7f0`, texto `#2a2622`, ferrugem `#a63a1e`), definidas em `:root[data-theme="light"]`. No escuro, o setup usa o ferrugem clareado `#e8805f`; no claro, o original `#a63a1e`.
- **README da home no tema claro, em estilo de primeira página do New York Times**, a pedido do Lucas:
  - "Olá, eu sou o Lucas Emanuel" na fonte **Chomsky**, que imita a letra gótica do cabeçalho do NYT. O logotipo real do NYT é exclusivo do jornal. A Chomsky tem licença OFL 1.1 e é carregada pelo jsDelivr, fixada no commit `30d941b` do repositório `ctrlcctrlv/chomsky`, e só é baixada no tema claro.
  - Linha de data entre fio simples e fio duplo: cargo, data do dia (gerada pelo JavaScript) e o domínio.
  - Texto em Times New Roman, seções em até 3 colunas com fios verticais (os contatos continuam na coluna seguinte, como numa matéria), linguagens como texto corrido separado por "·" e o emoji 👋 escondido.
  - No celular, uma coluna só, com a linha de data empilhada.
- No celular, os dois botões de ícone do cabeçalho estreitam (até 28px) para caber junto com o menu.

**Planejamento original:**

**Referência:** o botão de tema do akitaonrails.com abre um menu com **Light**, **Dark** e **System**.

- **Três opções:** Claro, Escuro e Sistema (segue a configuração do aparelho via `prefers-color-scheme`, inclusive quando ela muda com o site aberto).
- **Onde fica:** botão com ícone (sol/lua) na barra superior, em todas as páginas, mais comandos na paleta (e no terminal do item 23, `theme dark`).
- **Guarda a escolha** no `localStorage`. O padrão para quem nunca escolheu é **Sistema**.
- **Sem piscar:** um pequeno script no `<head>` aplica o tema antes de a página aparecer, para não mostrar o tema errado por um instante.
- **Implementação:** as cores já estão em variáveis CSS no `:root`, então basta um segundo conjunto de valores para `[data-theme="light"]`. O tema claro da home precisa ser desenhado (o atual só existe escuro). O setup no visual do item 26 já nasce claro e precisa de uma versão escura.
- **Contraste:** conferir legibilidade (WCAG AA) nos dois temas, principalmente cinzas e links.

### Detalhes do item 28: idiomas

**Idiomas:** português (padrão), inglês, espanhol, japonês, italiano e alemão.

**Referência:** o akitaonrails.com tem o seletor **PT | EN** na barra superior, com URL própria por idioma (`/` e `/en/`), e um interruptor **"auto"** que redireciona o visitante para o idioma do navegador e guarda a preferência num cookie por um ano.

**Como fazer aqui:**

- **Uma URL por idioma:** `/` (pt), `/en/`, `/es/`, `/ja/`, `/it/` e `/de/`. Isso é melhor para o Google do que trocar o texto via JavaScript na mesma URL.
- **Seletor** na barra superior: com seis idiomas, um menu suspenso funciona melhor que os links lado a lado do akitaonrails.com.
- **Detecção automática opcional**, como o "auto" do akitaonrails.com: usa `navigator.languages` e guarda a escolha (`localStorage` ou cookie). A escolha manual sempre vence.
- **SEO:** `<link rel="alternate" hreflang="...">` para cada idioma em todas as páginas, e `<html lang="...">` correto.
- **Organização:** textos da interface num arquivo por idioma (`i18n/pt.json`, `i18n/en.json`…) e o conteúdo gerado a partir deles. Com seis idiomas, gerar as páginas no GitHub Actions (item 21) evita manter seis cópias de cada HTML à mão.

**Cuidados:**

- **Tradução:** nomes de produtos, tecnologias e marcas não se traduzem. Textos pessoais precisam ser revisados pelo Lucas ou por alguém fluente, porque tradução automática sem revisão pode dizer algo que ele não disse.
- **Japonês:** precisa de uma fonte com os caracteres japoneses, como a Noto Sans JP. Verdana, Inter e Source Serif não têm. Também muda a quebra de linha e o espaçamento.
- **Alemão:** palavras longas podem estourar botões e o menu. Testar em 320px.
- **Atalhos de teclado:** as letras I, S, C e U vêm de palavras em português. Decidir se mudam por idioma ou ficam fixas.
- **Esforço alto** pelo volume: seis versões de cada página e de cada atualização futura.

### Detalhes do item 29: exportar o site em XML e JSON

**Referência:** o akitaonrails.com publica o feed RSS em `/index.xml` (e `/en/index.xml`) e o mapa do site em `/sitemap.xml`, com um ícone de RSS na barra superior. Ele **não** tem versão em JSON (`/index.json` retorna 404), então o JSON seria um diferencial.

**Arquivos propostos:**

- **`/index.xml` (RSS):** feed de novidades, como novos projetos, itens de setup e certificados. Quem usa leitor de RSS acompanha as atualizações.
- **`/sitemap.xml`:** lista de páginas para os buscadores (cobre o item 16).
- **`/site.json`:** o conteúdo inteiro do site em JSON (perfil, skills, contatos, setup, projetos, currículo), para quem quiser consumir via API.
- **`/feed.json`:** a versão JSON do feed, no padrão [JSON Feed](https://www.jsonfeed.org/).
- **`/resume.json`:** o currículo (item 24) no padrão [JSON Resume](https://jsonresume.org/), aceito por várias ferramentas e temas de currículo.
- Com o item 28, uma versão por idioma (`/en/index.xml`, `/en/site.json`…).

**Como oferecer:**

- Ícones de RSS e `{ }` (JSON) na barra superior ou no rodapé, como o RSS do akitaonrails.com.
- `<link rel="alternate">` no `<head>` para os navegadores e leitores de feed encontrarem sozinhos.
- Comandos na paleta ("Ver JSON do site", "Assinar RSS") e no terminal do item 23 (`curl lucasemanuel.com.br/site.json`).

**Como gerar:**

- Os arquivos não são escritos à mão: são gerados a partir dos mesmos arquivos de dados do item 21, a cada commit, no GitHub Actions. Assim o XML e o JSON nunca ficam diferentes do que está no site.
- Validar os arquivos gerados (XML bem formado, JSON válido e o RSS no validador do W3C) no próprio GitHub Actions (item 20).

### Detalhes do item 30: jogos contra a máquina

**Status:** jogo da velha feito. A página `/jogos` fica em `jogos/index.html` e `jogos/jogos.js`, e a regra, a IA
(minimax com poda alfa-beta) e o placar ficam em `jogos/velha-ia.js`, que também é carregado pelo terminal
(`play velha [facil|medio|impossivel] [o] [maquina]`). O placar (`velha-placar` no `localStorage`) é o mesmo
na página e no terminal. A página fica só na paleta e no atalho J, fora do menu. Testado: em todas as
sequências de lances possíveis (3.922 partidas), o nível Impossível nunca perde.

**Carrinho** (pedido do Lucas, fora do plano original): na mesma página, em `jogos/carrinho.js`. Canvas com
3 faixas, outros carros e barreiras aleatórios, sem fim, e velocidade que sobe de 230 a 720 px/s com a
distância. Cada fileira bloqueia no máximo 2 faixas, e o espaço entre fileiras cresce com a velocidade para
sempre dar tempo de trocar duas faixas (um piloto automático de teste andou 20 × ~10 min sem bater).
Controles: ←/→ ou A/D, toque no lado da pista, botões ◀ ▶, Espaço/P pausa. Pausa sozinho ao trocar de aba,
ao perder o foco e com a paleta aberta. Recorde em `carrinho-recorde` no `localStorage`. As abas da página
mostram um jogo por vez (`/jogos/#carrinho` abre direto no carrinho).

**Carrinho no terminal:** `play carrinho` roda uma versão em texto (pista de 3 faixas com caracteres de caixa,
14 linhas), com as mesmas regras. ←/→ ou A/D (ou toque nos lados da pista), `q` ou Ctrl+C sai. A velocidade
vai de 150 a 60 ms por linha. Recorde próprio (`carrinho-terminal-recorde`), porque a distância não se compara
com a da página.

**Onde:** página `/jogos`, só na paleta e no atalho **J** (fora do menu, que precisa caber numa linha), com uma
aba por jogo. No terminal do item 23: `play velha`, `play carrinho` e `play damas`.

**Jogo da velha** (esforço baixo):

- Tabuleiro 3×3. O visitante escolhe se começa ou se deixa a máquina começar, e se joga com X ou O.
- **IA com minimax.** O jogo da velha é pequeno o bastante para a máquina calcular todas as jogadas possíveis. No nível máximo ela nunca perde: o melhor resultado possível para o visitante é empatar.
- **Níveis de dificuldade**, para não ser frustrante:
  - **Fácil:** jogadas aleatórias.
  - **Médio:** às vezes escolhe a melhor jogada, às vezes não.
  - **Impossível:** minimax completo.
- Destacar a linha vencedora e mostrar o placar (vitórias, empates e derrotas).

**Damas em tabuleiro reduzido** (esforço médio-alto). **Feito em 27/09/2026:**

- Regras, IA e placar em `jogos/damas-ia.js` (usado pela página, pelo terminal e pelo worker), interface em
  `jogos/damas.js` e a IA em segundo plano em `jogos/damas-worker.js` (sem Worker, calcula na própria página).
- Regras implementadas sem simplificar: captura obrigatória, peça comum captura para trás, captura em
  sequência, **lei da maioria**, **dama voadora**, peças capturadas só saem no fim do lance (não podem ser
  puladas duas vezes) e a peça só vira dama se terminar o lance na última fileira. Empate com 3 repetições
  da posição ou 20 lances de cada lado só com damas e sem captura. Resumo num bloco "Regras" na aba.
- IA: minimax (negamax) com poda alfa-beta e aprofundamento iterativo, que continua a busca enquanto houver
  captura obrigatória. Fácil: 2 lances à frente e 30% de lances aleatórios; Médio: 6 lances; Difícil: até
  14 lances ou 1,5 s. Avaliação: material (dama ≈ 3 peças), avanço, centro e guarda da última fileira.
  Em testes IA × IA, o Difícil venceu todas contra Fácil e Médio e empatou contra si mesmo.
- Casas escuras com coordenadas (a–f, 1–6); captura em sequência escolhida uma casa por vez; destaque das
  peças que podem jogar, dos destinos e do último lance da máquina. Setas, Enter e Esc no teclado.
- Placar em `damas-placar` (página e terminal). No terminal: `play damas [facil|medio|dificil] [maquina]`,
  com lances como `c3 d4` ou `c3xe5xc3` e o comando `lances`.
- 8×8 opcional e a IA em C/WebAssembly continuam como ideias.

Plano original:


- **Tabuleiro 6×6** com 6 peças para cada lado, nas casas escuras das duas primeiras fileiras. O tabuleiro menor deixa as partidas curtas e a IA mais rápida. Um 8×8 opcional pode vir depois.
- **Regras** (base nas damas brasileiras, a definir e explicar numa tela de ajuda):
  - Captura obrigatória, e a peça comum pode capturar para trás.
  - Captura em sequência (várias peças na mesma jogada).
  - **Dama voadora**, que anda várias casas na diagonal. Pode ser simplificada para uma casa por vez, se ficar complexo.
  - **Lei da maioria** (é obrigatório capturar o maior número possível de peças). Também pode ser simplificada.
  - Empate por repetição ou por um número de lances sem captura, para a partida não ficar infinita.
- **IA com minimax e poda alfa-beta**, limitada por profundidade (quantos lances à frente ela pensa). A dificuldade é essa profundidade. A função de avaliação considera peças, damas, avanço e controle do centro.
- **Web Worker:** a IA calcula em segundo plano, para a página não travar enquanto ela "pensa". Mostrar um indicador "pensando…".
- Destacar os movimentos possíveis da peça selecionada e a última jogada da máquina.

**Para os dois jogos:**

- **Mouse, toque e teclado:** setas para mover o cursor e Enter para jogar, com `aria-label` em cada casa e anúncio da jogada da máquina para leitores de tela.
- **Placar salvo** no `localStorage`, com botão para zerar.
- **Visual** seguindo o site (e o tema do item 27). Animações leves, respeitando `prefers-reduced-motion`.
- **Sem dependências:** JavaScript puro, como o resto do site.

**Ideia para o portfólio:**

- Uma aba **"Como a IA pensa"** explicando o minimax e a poda alfa-beta em poucas linhas, com link para o código no GitHub. Isso transforma o jogo numa demonstração de algoritmos.
- **Opcional:** escrever a IA das damas em **C** e compilar para **WebAssembly**. Mostra a sua skill em C rodando no navegador e compara a velocidade com a versão em JavaScript. Exige um passo de build (Emscripten), que poderia rodar no GitHub Actions.

### Detalhes dos itens 40 a 47: back-end e infraestrutura

**Obstáculo:** o GitHub Pages não roda código no servidor. Banco de dados, OAuth2 e JWT precisam de um back-end. O Cloudflare Workers faz esse papel sem trocar o GitHub Pages (e sem voltar à Vercel):

```
Navegador ──► lucasemanuel.com.br (GitHub Pages, via Cloudflare)
          └─► api.lucasemanuel.com.br (Cloudflare Worker) ──► PostgreSQL / MongoDB / R2 / OAuth do GitHub
```

**Ordem:** 40 → 41 → 42 → 43 → 44. Cada etapa já entrega algo no site, e o site continua estático.

**O que é gratuito** (limites pesquisados em 13/10/2026; conferir as páginas oficiais antes de começar, porque mudam com frequência):

- **Cloudflare Free:** DNS, proxy e CDN, Web Analytics, Turnstile e regras de WAF e de cache. Sem cartão.
- **Cloudflare Workers Free:** 100 mil requisições por dia e 10 ms de CPU por requisição. Os Cron Triggers (rotinas agendadas) estão incluídos.
- **Workers KV:** 100 mil leituras e mil gravações por dia, 1 GB.
- **Hyperdrive** (Worker → PostgreSQL): 100 mil consultas por dia.
- **Cloudflare D1** (SQLite, alternativa ao Postgres): 5 GB no total e 5 milhões de linhas lidas por dia.
- **Cloudflare R2** (imagens, mesma API do S3): 10 GB e cerca de 1 milhão de gravações e 10 milhões de leituras por mês, sem taxa de saída. Pode pedir cartão para ativar.
- **Cloudflare Email Routing:** aviso por e-mail das mensagens do formulário.
- **Neon (PostgreSQL), recomendado:** 1 GB por projeto e 100 horas de computação por mês. Desliga sozinho quando fica parado, sem apagar os dados.
- **MongoDB Atlas M0:** 512 MB, grátis para sempre, até 100 operações por segundo, sem backup. A Data API do Atlas foi descontinuada: confirmar se o driver funciona no Workers.
- **GitHub OAuth App**, **JWT** (biblioteca `jose`), **Decap CMS** e **Sveltia CMS:** grátis.

**Cuidados:**

- **No Cloudflare Free, passar do limite não gera cobrança:** a requisição falha com erro, e o contador zera todo dia à meia-noite UTC.
- **Bancos grátis sem backup** (Atlas M0 e Supabase): exportar de vez em quando o que for importante.
- **JWT só com o Worker:** a chave secreta nunca vai para o navegador. O token fica num cookie `HttpOnly`, não no `localStorage`.
- **Ranking (42):** a partida roda no navegador, então dá para enviar um placar falso. Nas damas e na velha, o Worker pode refazer a partida a partir da lista de lances.
- **Área administrativa (43):** o caminho A do item 21 (CMS baseado em Git) não precisa de banco nem de JWT, porque cada "Salvar" vira um commit. Um painel próprio com OAuth2, JWT, banco e R2 seria o caminho B, mais trabalhoso.

**Item 45: servidor próprio com nginx (a analisar):**

- O nginx é grátis; o custo é a máquina onde ele roda. O GitHub Pages e o Workers não deixam instalar nada.
- Uso no site: proxy reverso com HTTPS na frente de uma API própria (Node, por exemplo) e do banco instalado na mesma VM.
- Servidores grátis:
  - **Oracle Cloud Always Free:** VM Arm com 2 núcleos e 12 GB de RAM (limite cortado pela metade em 2026) e 200 GB de disco. Pede cartão. A Oracle pode recuperar VMs quase sem uso por 7 dias.
  - **Google Cloud e2-micro:** 1 VM pequena (cerca de 1 GB de RAM) e 30 GB de disco, só em regiões dos EUA. Pede cartão. Só 1 GB de tráfego de saída grátis por mês, então o Cloudflare precisa estar na frente fazendo cache.
  - **PC próprio + Cloudflare Tunnel:** o Tunnel é grátis e não abre portas no roteador, mas o site só responde com o PC ligado.
- Certificado HTTPS: Let's Encrypt + Certbot, grátis.
- Atualizações do sistema, firewall e SSH (só por chave) passam a ser responsabilidade do Lucas.
- Para o site, o caminho Workers + Neon é mais simples. O nginx vale se o objetivo for aprender ou mostrar infraestrutura no portfólio.
- Teste local: o nginx no Windows pode substituir o `py -m http.server`.

**Item 46: outras ferramentas avaliadas (a analisar):**

- **AWS S3 e EC2 (pagos):** contas criadas depois de 15/07/2025 recebem créditos de US$ 100 a 200, e o plano grátis termina em 6 meses ou quando os créditos acabam. Depois, é pago (centavos para poucas imagens). No cadastro, escolher o plano "Free", que não cobra além dos créditos. O R2 cobre o mesmo uso sem custo.
- **"S2":** não existe na AWS. Provavelmente era o EC2.
- **AEM (Adobe Experience Manager):** CMS corporativo, licença cara e fora de escala para o site.
- **Supabase:** 500 MB e 2 projetos, mas o projeto é pausado depois de 1 semana sem uso, e não há backup.
- **MongoDB e PostgreSQL juntos:** redundante para dados deste tamanho. Só como exercício de estudo (Postgres para usuários e ranking, Mongo para mensagens e logs). Se for um só, o PostgreSQL combina melhor com o ranking.
- **Site inteiro no S3 + CloudFront:** troca o GitHub Pages, que é grátis e já funciona, por mais configuração e custo.

**Item 47: AWS IAM (a analisar):**

- **O que é:** o IAM (Identity and Access Management) controla quem pode fazer o quê dentro da conta da AWS: usuários, grupos, papéis (roles) e políticas em JSON.
- **Custo:** grátis, sem limite. O que se paga são os recursos que ele protege (S3, EC2...), então ele só entra se a AWS for usada (item 46).
- **Uso no site:** um usuário IAM com uma política de **menor privilégio**, que só permite `s3:PutObject` e `s3:GetObject` num bucket (ou numa pasta dele). O Worker guarda a chave desse usuário como segredo (`wrangler secret`) e gera URLs pré-assinadas para a área administrativa (43) enviar imagens. Se a chave vazar, o estrago fica limitado a esse bucket.
- **Boas práticas:** não usar a conta raiz (root) no dia a dia; ativar MFA na raiz e nos usuários; criar um usuário administrador para o console (ou usar o IAM Identity Center); nunca colocar chaves no repositório, que é público; trocar as chaves de tempos em tempos.
- **Não é login de visitantes:** para o visitante entrar no site, o equivalente da AWS é o **Amazon Cognito** (tem cota grátis; conferir os limites atuais). No projeto, o login com GitHub (itens 42 e 43) já cobre isso sem a AWS.
- **Valor para o portfólio:** escrever políticas de menor privilégio é uma habilidade pedida em vagas de back-end e de nuvem, mesmo num uso pequeno como este.

### Detalhes do item 49: checklist do makemefindable

Análise feita em 24/10/2026 no site publicado (curl, DNS e console do navegador). Marcar cada caixa ao concluir e rodar
a análise de novo no makemefindable.com no fim.

**No código (Claude faz):**

- [x] **Robots.txt** (erro). Feito em 24/10/2026: `/robots.txt` libera tudo e aponta para o sitemap (item 16). Sem `Disallow`
  para `/CLAUDE.md` e `/ROADMAP.md`, que só anunciaria os arquivos: isso fica para o item 35.
- [x] **Sitemap** (erro). Feito em 24/10/2026: `/sitemap.xml` com `/`, `/setup/`, `/curriculo/`, `/servicos/`, `/terminal/` e `/jogos/`,
  cada um com o `lastmod` do último commit da página (item 16).
- [x] **Meta title** (aviso). Feito em 24/10/2026: o título da home tinha 13 caracteres ("Lucas Emanuel") e passou a usar o texto
  do `og:title`, "Lucas Emanuel — Dev Back-end & Analista de Sistemas" (51).
- [x] **Meta description** (aviso). Feito em 24/10/2026: a da home tinha 95 caracteres e passou a 156, juntando a descrição antiga
  com a `og:description` (opção escolhida pelo Lucas entre 3, todas só com textos do site). O alerta "may contain too many
  descriptive words" **aparece sempre**: testado em 24/10/2026 com 4 textos (lista, frase em português, frase em inglês e o
  atual) e no próprio makemefindable.com e no MDN, todos com o mesmo aviso. Não há o que corrigir.
- [x] **Meta social media** (aviso). Feito em 24/10/2026: `og-image.png` (1200×630, uma só para o site todo, só com o "le" e o
  cursor amarelo, sem foto por enquanto) e as tags `og:image` e `twitter:card`/`title`/`description`/`image` nas 6 páginas, com os
  textos das `og:` de cada uma (item 15).

**Com o Lucas:**

- [x] **SPF DNS record** (erro). Feito em 24/10/2026 pelo Lucas, no painel do Registro.br, e confirmado no makemefindable. O domínio
  não tinha registro TXT (a verificação dele quebrava com "uncaught error"). Como ele não envia e-mail, ganhou TXT em
  `lucasemanuel.com.br` com `v=spf1 -all` e TXT em `_dmarc.lucasemanuel.com.br` com `v=DMARC1; p=reject;`, que impedem e-mail
  falso em nome do domínio.
- [x] **JS errors** (erro). Feito em 24/10/2026 e confirmado no makemefindable (0 erros). A API dele (`/api/execute?url=...`) só dá a
  contagem, e no Chrome não há erro. Para ver as mensagens, uma cópia temporária da home escrevia cada erro num `<h2>`, que
  ele lista em "Heading tags". O navegador dele (Chromium com user agent de Chrome 69) **não carrega nada de outro domínio**:
  a folha do Google Fonts e a fonte Chomsky do jsDelivr falhavam (status 0), e cada falha contava como erro. As duas fontes
  passaram para a pasta `fonts/` do site. Antes disso, as chamadas a `matchMedia` viraram `window.matchMedia?.(...)` e o
  carrinho passou a não montar sem canvas 2D, porque no jsdom a página dava `ReferenceError` (não era a causa, mas ficou).
- [ ] **Media query responsiveness** (aviso). **Revertido em 25/10/2026** (plano de melhorias): o `<style>` `.mmf` saiu das 7 páginas para deixar o código limpo, e o aviso do makemefindable volta, por decisão do Lucas. Histórico: em 24/10/2026, a pedido do Lucas, as 7 páginas ganharam, logo depois do
  `style.css`, um `<style>` comentado com uma `@media` sem efeito (classe `.mmf`, que não existe). Causa: **o makemefindable só conta `@media` dentro de
  `<style>` no próprio HTML** e ignora as folhas externas. Testado com páginas temporárias: o navegador dele lê as 12
  `@media` do `style.css`, mas o aviso continua; uma cópia da home com um `<style>` de uma linha passa ("1 media query"); e
  `media="screen"` no `<link>` não muda nada. O site é responsivo; o aviso é limitação da ferramenta (as tentativas
  anteriores, `crossorigin` e fontes locais, não eram a causa).
- [x] **Plaintext email** (erro). Feito em 24/10/2026, a confirmar no makemefindable. A ferramenta roda o JavaScript, então
  achava também o Yahoo, montado ao abrir a página (item 36). Agora os dois e-mails só aparecem com o clique em "mostrar
  e-mail", como o telefone, na home e no `/servicos`; o link "email" do rodapé abre o Gmail sem mostrá-lo, e o PDF do currículo
  o recebe na impressão. O Gmail continua no `cli` e no JSON-LD do `/curriculo`, por decisão do Lucas.
- [ ] **GA tags** (erro). Não é defeito: o site não tem analytics. **Decidido em 24/10/2026: fica para quando o Cloudflare
  entrar (item 40)**, e o Lucas pediu para ser lembrado. Pontos para a decisão: o GA4 grava cookies (banner de consentimento
  pela LGPD) e carrega o `gtag.js` de `googletagmanager.com`, que o navegador do makemefindable bloqueia, então o alerta de GA
  sairia mas os erros de JS provavelmente voltariam. O analytics sem cookies (item 18, Cloudflare Web Analytics ou
  GoatCounter) dispensa banner, mas o makemefindable procura só o GA4, e o alerta continuaria.

**Itens informativos (ícone cinza), revistos em 24/10/2026:**

- [x] **Heading tags** na home: listava um "Heading 2" vazio, o título do modal, preenchido só ao abrir. Feito em 24/10/2026:
  o `<h2 id="modal-title">` saiu do HTML e é criado pelo `script.js` na primeira vez que o modal abre.

- [x] **Structured data**. Feito em 24/10/2026: JSON-LD na home com `WebSite` e `Person` (nome, cargo, site, GitHub, LinkedIn,
  Instagram e as linguagens do hero), sem e-mail, para o "Plaintext email" não voltar. A `Person` do `/curriculo` ganhou o
  mesmo `@id` (`https://lucasemanuel.com.br/#person`), para o Google saber que é a mesma pessoa.
- [x] **Modern media**. Nada a fazer: a home não tem imagens. Se entrarem fotos (item 4, Sobre), usar WebP ou AVIF.
- [x] **Unsafe target="_blank" links**. Já está certo: todos os links que abrem em nova aba têm `rel="noopener"`.

**Outras páginas, analisadas em 24/10/2026** (uma por vez: o servidor do makemefindable cai com análises em paralelo).
Notas: `/setup`, `/curriculo`, `/servicos` e `/jogos` 85,37%; `/terminal` 82,93%. Sem erros de JS, e-mail ou media query em nenhuma.

- [x] **Meta description** fora da faixa de 120 a 160: `/setup` 113, `/servicos` 180 (o Google corta), `/terminal` 75 e
  `/jogos` 104. O `/curriculo` (152) está certo. Feito em 24/10/2026 com os textos aprovados pelo Lucas, só com o que já
  está no site: 149, 150, 132 e 131 caracteres. As `og:description` continuam curtas, de propósito.
- [x] **Heading tags** no `/terminal`: a página não tinha nenhum título. Feito em 24/10/2026: `<h1 class="sr-only">Terminal</h1>`
  no começo do `<main>`, visível só para leitores de tela e buscadores.
- Robots.txt e Sitemap reprovados em todas as subpáginas: **erro da ferramenta**, que procura os arquivos dentro da pasta
  da página (`/setup/robots.txt`), e não na raiz, que é o padrão. Nada a fazer.
- Structured data informativo nas que não têm JSON-LD (todas menos o `/curriculo`). Opcional.

**Depende de outro item ou não tem correção:**

- [ ] **HSTS** (aviso). O GitHub Pages não envia o cabeçalho `Strict-Transport-Security` em domínio próprio, e o HSTS por `<meta>`
  não funciona. Hoje o HTTP já redireciona para HTTPS com 301. **Decidido em 24/10/2026: fazer junto com o Cloudflare (item 40)**,
  ligando o HSTS no painel. Começar com `max-age` curto e aumentar depois; não ligar `includeSubDomains` nem `preload` sem pensar,
  porque sair da lista de preload dos navegadores demora meses.
- [ ] **Domain Age** (aviso). Sem correção: a ferramenta não consegue consultar domínios `.com.br` (só os registros internacionais)
  e assume que o domínio é novo. Pelo RDAP do Registro.br, ele foi registrado em 20/09/2025 e vence em 20/09/2027. O Google não usa
  a idade do domínio para ranquear.

## Fora da lista (já feito)

- ✅ Modais para Skills e Contato; atalhos I, S, C e U
- ✅ HTTPS com domínio próprio e redirecionamento HTTP → HTTPS
- ✅ Texto da apresentação maior em monitores
- ✅ Botão flutuante do terminal e personalização do terminal (layouts, cores e fonte), ver item 23
- ✅ Jogo de carrinho infinito, na página `/jogos` e em texto no terminal, ver item 30
- ✅ Jogos maiores no computador (27/09/2026): em telas a partir de 1024px, o jogo fica à esquerda, do tamanho que a altura da tela permite (até 680px), e as opções e o placar à direita
- ✅ Animações do terminal (`hack`, barras de progresso, `ping`) voltaram a ter pausas depois do boot

## Ordem sugerida

1. **Correções (31 a 34):** os dois bugs do terminal, o README.md e os links do GitHub. O item 35 depende de decisão do Lucas; o 36 já foi feito.
2. **Itens rápidos juntos:** 15 e 16 (prévia e sitemap), dentro do checklist do item 49. Os outros deste grupo (9, 17 e 22) já foram feitos.
3. **Área administrativa (21)**, começando pelos pré-requisitos.
4. **Página de Projetos (1)**, já com os dados editáveis pelo painel.
5. **Site em linha de comando (23)**. As formas A e B já estão no ar; falta a forma C (`npx lucasemanuel`).
6. **Versão em inglês (8).**
7. **Aba "Como a IA pensa" (30).** O jogo da velha, as damas e o carrinho já estão no ar.
8. **Back-end e infraestrutura (40 a 44)**, na ordem dos itens. O 40 pode vir antes, porque já resolve o 18 e o 35; o 43 entra junto com o 21 e o 44 com o 1. Os itens 45 a 47 dependem de análise do Lucas.
