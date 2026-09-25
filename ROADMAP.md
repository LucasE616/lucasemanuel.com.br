# Roadmap

Ideias de melhorias para o site. Esforço: **baixo**, **médio** ou **alto**.

Status: ⬜ a fazer · 🟡 em andamento · ✅ feito · ↪ incorporado a outro item

## Conteúdo

1. ⬜ **Página de Projetos** (médio). Mostrar repositórios como `servidor-http`, `ged-offline`, `encrypt`, `FutebolAPI`, `Consumo-API` e `entendendo-C`, com descrição, tecnologias e links. Pode puxar os dados da API do GitHub para se atualizar sozinha.
2. ↪ **Currículo em PDF**. Incorporado ao item 24.
3. ↪ **Experiência e formação**. Incorporado ao item 24.
4. ⬜ **Sobre** (baixo). Foto e um parágrafo curto.
5. 🟡 **Setup completo** (baixo). Já tem Notebook, Periféricos, Mesa, Áudio, Mobile, Papelaria e Ferramentas. Falta a cadeira.
6. ⬜ **Página "Agora"** (baixo). O que está estudando ou construindo no momento.
7. ⬜ **Notas ou blog** (alto). Publicar notas do Obsidian (Markdown) como páginas do site.
24. ⬜ **Menu Educação / Currículo** (médio). Página com diplomas, certificados, livros técnicos lidos e experiências profissionais. Detalhes abaixo.

## Funcionalidades

8. ⬜ **Versão em inglês** (médio). Para vagas de fora e remotas.
9. ⬜ **Página 404 personalizada** (baixo). O GitHub Pages usa o `404.html` automaticamente; mesmo visual e paleta.
10. ⬜ **Mais comandos na paleta** (baixo). Baixar currículo, copiar o link do site, abrir cada projeto.
11. ↪ **Terminal interativo**. Incorporado ao item 23.
12. ⬜ **Formulário de contato** (baixo). Via serviço como o Formspree, sem back-end próprio.
13. ⬜ **Estatísticas do GitHub** (médio). Linguagens mais usadas, repositórios recentes.
14. ⬜ **Alternar tema claro/escuro** (médio).
23. ⬜ **Site em linha de comando** (médio). Versão do site em forma de terminal, com os comandos do conteúdo real e comandos lúdicos sobre Linux, C, Python, JS/Node e servidores. Detalhes abaixo.

## Visual

22. ⬜ **Fonte Verdana** (baixo). Trocar a fonte do site para Verdana.
    - A Verdana já vem instalada no Windows e no macOS, então não precisa carregar nada do Google Fonts (e ela nem está lá). Android, iOS e Linux geralmente não têm Verdana, por isso a regra precisa de alternativas: `Verdana, Geneva, "DejaVu Sans", sans-serif`.
    - Decidir o alcance: só o texto (hoje Inter), também os títulos (hoje Inter Tight) ou o site inteiro. A JetBrains Mono dos rótulos e códigos provavelmente continua, por causa do estilo README.
    - Se a Inter e a Inter Tight saírem, remover o link do Google Fonts correspondente. O site fica mais leve.
    - A Verdana é bem mais larga que a Inter. Rodar o checklist de testes em 320px: nome em uma linha e menu com 4 links em uma linha.

## Técnico

15. ⬜ **Imagem de prévia (Open Graph)** (baixo). Hoje o link compartilhado no LinkedIn/WhatsApp aparece sem imagem.
16. ⬜ **`sitemap.xml` e `robots.txt`** (baixo). Indexação no Google, incluindo `/setup`.
17. ⬜ **Versão nos arquivos CSS e JS** (baixo), ex.: `style.css?v=2`. Evita que o visitante veja a versão antiga em cache após uma atualização.
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

## Fora da lista (já feito)

- ✅ Modais para Skills e Contato; atalhos I, S, C e U
- ✅ HTTPS com domínio próprio e redirecionamento HTTP → HTTPS
- ✅ Texto da apresentação maior em monitores

## Ordem sugerida

1. **Itens rápidos juntos:** 15, 9, 16, 17 e 22 (prévia, 404, sitemap, versão nos arquivos e fonte Verdana).
2. **Área administrativa (21)**, começando pelos pré-requisitos.
3. **Página de Projetos (1)**, já com os dados editáveis pelo painel.
4. **Menu Educação / Currículo (24)**, com o PDF.
5. **Site em linha de comando (23)**. Dá para começar pelo `curl` (forma B), que é rápido, e depois fazer o terminal dentro do site.
6. **Versão em inglês (8).**
