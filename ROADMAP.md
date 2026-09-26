# Roadmap

Ideias de melhorias para o site. Esforço: **baixo**, **médio** ou **alto**.

Status: ⬜ a fazer · 🟡 em andamento · ✅ feito · ↪ incorporado a outro item · ⏸ arquivado (saiu do site, pode voltar)

## Conteúdo

1. ⬜ **Página de Projetos** (médio). Mostrar repositórios como `servidor-http`, `ged-offline`, `encrypt`, `FutebolAPI`, `Consumo-API` e `entendendo-C`, com descrição, tecnologias e links. Pode puxar os dados da API do GitHub para se atualizar sozinha.
2. ↪ **Currículo em PDF**. Incorporado ao item 24.
3. ↪ **Experiência e formação**. Incorporado ao item 24.
4. ⬜ **Sobre** (baixo). Foto e um parágrafo curto.
5. 🟡 **Setup completo** (baixo). Já tem Notebook, Periféricos, Mesa, Áudio, Mobile, Papelaria e Ferramentas. Falta a cadeira.
6. ⬜ **Página "Agora"** (baixo). O que está estudando ou construindo no momento.
7. ⬜ **Notas ou blog** (alto). Publicar notas do Obsidian (Markdown) como páginas do site.
24. ⬜ **Menu Educação / Currículo** (médio). Página com diplomas, certificados, livros técnicos lidos e experiências profissionais. Detalhes abaixo.
25. ⏸ **Curiosidades & indicações** (baixo para restaurar). Existiu no site e foi removido a pedido. Pode voltar quando o Lucas quiser. Detalhes abaixo.

## Funcionalidades

8. ⬜ **Versão em inglês** (médio). Para vagas de fora e remotas.
9. ✅ **Página 404 personalizada** (baixo). Feita em 26/09/2026: `404.html` com o mesmo visual, mostrando o endereço pedido no formato de erro do terminal.
10. ⬜ **Mais comandos na paleta** (baixo). Baixar currículo, copiar o link do site, abrir cada projeto.
11. ↪ **Terminal interativo**. Incorporado ao item 23.
12. ⬜ **Formulário de contato** (baixo). Via serviço como o Formspree, sem back-end próprio.
13. ⬜ **Estatísticas do GitHub** (médio). Linguagens mais usadas, repositórios recentes.
14. ↪ **Alternar tema claro/escuro**. Feito junto com o item 27.
23. 🟡 **Site em linha de comando** (médio). Feito em 26/09/2026: formas A (`/terminal`, atalho T ou crase) e B (`/cli`). Falta a forma C (`npx lucasemanuel`) e os comandos `sl`, `projetos` e `curriculo`. Versão do site em forma de terminal, com os comandos do conteúdo real e comandos lúdicos sobre Linux, C, Python, JS/Node e servidores. Detalhes abaixo.
27. ✅ **Tema escuro / claro / sistema** (médio). Feito em 26/09/2026, com o README da home em estilo de jornal no tema claro. Detalhes abaixo.
28. ⬜ **Idiomas: português, inglês, espanhol, japonês, italiano e alemão** (alto). Seletor de idioma com redirecionamento automático opcional, como o do akitaonrails.com. Detalhes abaixo.
29. ⬜ **Exportar o site em XML e JSON** (médio). Versões do conteúdo em formatos de máquina, seguindo o akitaonrails.com (RSS e sitemap em XML) e indo além dele com JSON. Detalhes abaixo.
30. ⬜ **Jogos contra a máquina: jogo da velha e damas em tabuleiro reduzido** (jogo da velha: baixo · damas: médio-alto). O visitante joga contra uma IA feita por você, o que também mostra algoritmos na prática. Detalhes abaixo.

## Visual

26. ✅ **Setup com a identidade visual do akitaonrails.com** (médio). Feito em 26/09/2026, mantendo Verdana (texto) e Times New Roman (títulos dos tópicos) no lugar das fontes do akitaonrails.com. Detalhes e decisões abaixo.
22. ✅ **Fonte Verdana** (baixo). Feito em 26/09/2026.
    - **Texto e títulos de página** (nome, "Setup"): Verdana, com alternativas `Verdana, Geneva, "DejaVu Sans", sans-serif` para celular e Linux.
    - **Títulos dos tópicos** (seções do README, títulos dos modais e categorias do setup): serifada, `"Times New Roman", Times, "Liberation Serif", serif`, em negrito e um pouco maiores, porque a Times parece menor que a Verdana no mesmo tamanho.
    - **Rótulos e códigos:** continuam em JetBrains Mono, por causa do estilo README.
    - Inter e Inter Tight saíram do Google Fonts. Agora só a JetBrains Mono é baixada.
    - Como a Verdana é larga, o nome encolhe abaixo de ~385px (33px em 320px) para caber numa linha. A partir de ~385px continua com 40px, e no computador nada mudou.

## Técnico

15. ⬜ **Imagem de prévia (Open Graph)** (baixo). Hoje o link compartilhado no LinkedIn/WhatsApp aparece sem imagem.
16. ⬜ **`sitemap.xml` e `robots.txt`** (baixo). Indexação no Google, incluindo `/setup`.
17. ✅ **Versão nos arquivos CSS e JS** (baixo). Feito em 26/09/2026 (`?v=AAAAMMDD.N`), depois que o cache misturou HTML novo com CSS/JS antigos e quebrou o botão de tema. A versão é trocada à mão a cada mudança no CSS ou no JS (regra no CLAUDE.md). Um próximo passo seria automatizar isso no GitHub Actions (item 20).
18. ⬜ **Analytics sem cookies** (baixo). GoatCounter ou Cloudflare Web Analytics, sem banner de consentimento.
19. ⬜ **Auditoria com Lighthouse** (baixo). Acessibilidade e desempenho.
20. ⬜ **Verificação no GitHub Actions** (médio). Validar HTML e checar links quebrados a cada push.
21. ⬜ **Área administrativa** (médio-alto). Editar o conteúdo do site por formulários, sem mexer no código.

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
| `projetos`, `curriculo` | Quando os itens 1 e 24 existirem |
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

**Onde:** página `/jogos` com os dois jogos, item no menu ou só na paleta (para não pesar o menu), atalho **J** e comandos `play velha` e `play damas` no terminal do item 23.

**Jogo da velha** (esforço baixo):

- Tabuleiro 3×3. O visitante escolhe se começa ou se deixa a máquina começar, e se joga com X ou O.
- **IA com minimax.** O jogo da velha é pequeno o bastante para a máquina calcular todas as jogadas possíveis. No nível máximo ela nunca perde: o melhor resultado possível para o visitante é empatar.
- **Níveis de dificuldade**, para não ser frustrante:
  - **Fácil:** jogadas aleatórias.
  - **Médio:** às vezes escolhe a melhor jogada, às vezes não.
  - **Impossível:** minimax completo.
- Destacar a linha vencedora e mostrar o placar (vitórias, empates e derrotas).

**Damas em tabuleiro reduzido** (esforço médio-alto):

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

## Fora da lista (já feito)

- ✅ Modais para Skills e Contato; atalhos I, S, C e U
- ✅ HTTPS com domínio próprio e redirecionamento HTTP → HTTPS
- ✅ Texto da apresentação maior em monitores
- ✅ Botão flutuante do terminal e personalização do terminal (layouts, cores e fonte), ver item 23

## Ordem sugerida

1. **Itens rápidos juntos:** 15, 9, 16, 17 e 22 (prévia, 404, sitemap, versão nos arquivos e fonte Verdana).
2. **Área administrativa (21)**, começando pelos pré-requisitos.
3. **Página de Projetos (1)**, já com os dados editáveis pelo painel.
4. **Menu Educação / Currículo (24)**, com o PDF.
5. **Site em linha de comando (23)**. Dá para começar pelo `curl` (forma B), que é rápido, e depois fazer o terminal dentro do site.
6. **Versão em inglês (8).**
