# Roadmap

Ideias de melhorias para o site. Esforço: **baixo**, **médio** ou **alto**.

Status: ⬜ a fazer · 🟡 em andamento · ✅ feito

## Conteúdo

1. ⬜ **Página de Projetos** (médio). Mostrar repositórios como `servidor-http`, `ged-offline`, `encrypt`, `FutebolAPI`, `Consumo-API` e `entendendo-C`, com descrição, tecnologias e links. Pode puxar os dados da API do GitHub para se atualizar sozinha.
2. ⬜ **Currículo em PDF** (baixo). Botão "Baixar currículo" e comando na paleta.
3. ⬜ **Experiência e formação** (baixo). Linha do tempo com empregos, cursos e certificações.
4. ⬜ **Sobre** (baixo). Foto e um parágrafo curto.
5. 🟡 **Setup completo** (baixo). Já tem Notebook, Periféricos, Mesa, Áudio, Mobile, Papelaria e Ferramentas. Falta a cadeira.
6. ⬜ **Página "Agora"** (baixo). O que está estudando ou construindo no momento.
7. ⬜ **Notas ou blog** (alto). Publicar notas do Obsidian (Markdown) como páginas do site.

## Funcionalidades

8. ⬜ **Versão em inglês** (médio). Para vagas de fora e remotas.
9. ⬜ **Página 404 personalizada** (baixo). O GitHub Pages usa o `404.html` automaticamente; mesmo visual e paleta.
10. ⬜ **Mais comandos na paleta** (baixo). Baixar currículo, copiar o link do site, abrir cada projeto.
11. ⬜ **Terminal interativo** como easter egg (médio). Comandos como `whoami`, `skills` e `contato`.
12. ⬜ **Formulário de contato** (baixo). Via serviço como o Formspree, sem back-end próprio.
13. ⬜ **Estatísticas do GitHub** (médio). Linguagens mais usadas, repositórios recentes.
14. ⬜ **Alternar tema claro/escuro** (médio).

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

1. **Separar o conteúdo do HTML.** Skills, contatos, setup e indicações vão para arquivos de dados, como `data/setup.json` e `data/indicacoes.json`.
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

## Fora da lista (já feito)

- ✅ Curiosidades & indicações: 45 livros, 9 séries, 14 filmes e 9 produtos, com barra de atalhos no modal
- ✅ Modais para Skills e Contato; atalhos I, S, C e U
- ✅ HTTPS com domínio próprio e redirecionamento HTTP → HTTPS
- ✅ Texto da apresentação maior em monitores

## Ordem sugerida

1. **Itens rápidos juntos:** 15, 9, 16 e 17 (prévia, 404, sitemap e versão nos arquivos).
2. **Área administrativa (21)**, começando pelos pré-requisitos.
3. **Página de Projetos (1)**, já com os dados editáveis pelo painel.
4. **Currículo em PDF e versão em inglês** (2 e 8).
