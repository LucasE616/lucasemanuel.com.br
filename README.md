# lucasemanuel.com.br

Portfólio pessoal de Lucas Emanuel — Dev Back-end & Analista de Sistemas.

Site estático (HTML, CSS e JavaScript puros, sem framework e sem dependências), publicado com Cloudflare Pages em
[lucasemanuel.com.br](https://lucasemanuel.com.br). Cada merge na `main` publica o site em cerca de um minuto, e cada
Pull Request ganha uma URL de preview. O fluxo de trabalho está no [CONTRIBUTING.md](CONTRIBUTING.md).

## Páginas

| Endereço | Conteúdo |
|---|---|
| [`/`](https://lucasemanuel.com.br) | Apresentação, skills e contato |
| [`/setup`](https://lucasemanuel.com.br/setup/) | Equipamentos e ferramentas, em lista ou grade |
| [`/curriculo`](https://lucasemanuel.com.br/curriculo/) | Experiência, formação, cursos, habilidades, idiomas e livros; o PDF é a própria página impressa |
| [`/servicos`](https://lucasemanuel.com.br/servicos/) | Desenvolvimento, formatação e configuração de PC, impressoras e contato |
| [`/terminal`](https://lucasemanuel.com.br/terminal/) | O site em linha de comando (digite `help`) |
| [`/jogos`](https://lucasemanuel.com.br/jogos/) | Jogo da velha e damas contra a máquina (minimax com poda alfa-beta) e um jogo de carrinho |

Cartão de visita no terminal:

```bash
curl lucasemanuel.com.br/cli
```

## Atalhos

`Ctrl K` (ou `⌘ K`) abre a paleta de comandos. Fora de campos de texto:

| Tecla | Vai para |
|---|---|
| `I` | Início |
| `S` | Skills |
| `C` | Contato |
| `U` | Setup |
| `E` | Currículo |
| `V` | Serviços |
| `T` ou `` ` `` | Terminal |
| `J` | Jogos |

## Rodar localmente

Na raiz do projeto, sirva a pasta `site/`:

```bash
python -m http.server 5500 -d site
```

No Windows, se o comando `python` não existir, use `py -m http.server 5500 -d site`. Depois abra http://localhost:5500.

Para testar o resultado do build (o mesmo que vai para o ar):

```bash
node scripts/build.mjs
python -m http.server 5500 -d dist
```

## Estrutura

Tudo o que é publicado fica em `site/`:

| Arquivo (em `site/`) | Conteúdo |
|---|---|
| `index.html` | Home: apresentação, README com skills e contato, modal e paleta |
| `setup/`, `curriculo/`, `servicos/` | Páginas de conteúdo, cada uma com o seu `index.html` |
| `terminal/` | `index.html` e `terminal.js`, com a lista de comandos |
| `jogos/` | `index.html`, regras e IA (`velha-ia.js`, `damas-ia.js`, `damas-worker.js`) e interfaces (`jogos.js`, `damas.js`, `carrinho.js`) |
| `style.css` | Estilos de todas as páginas, com os temas claro e escuro |
| `script.js` | Paleta de comandos, atalhos, tema, modais, botões de copiar e contatos protegidos |
| `404.html` | Página de erro |
| `fonts/` | JetBrains Mono e Chomsky, com as licenças OFL |
| `cli` | Cartão de visita com cores ANSI, para o `curl` |
| `favicon.svg`, `og-image.png` | Ícone e imagem de prévia dos links |
| `robots.txt`, `sitemap.xml` | Indexação nos buscadores |

Na raiz do repositório (fora do site):

| Arquivo | Conteúdo |
|---|---|
| `scripts/build.mjs` | Build: copia `site/` para `dist/` e versiona o CSS e o JS |
| `.github/` | Template de PR e `CODEOWNERS` |
| `PLANO-DE-MELHORIAS.md` | Plano de melhorias, com o status de cada item |
| `ROADMAP.md` | Melhorias planejadas e correções |
| `CLAUDE.md` | Decisões, padrões e preferências do projeto |
| `CONTRIBUTING.md`, `SECURITY.md` | Fluxo de contribuição e como reportar falhas |
| `LICENSE` | Licença MIT |

## Ao alterar o site

- Os HTMLs pedem o CSS e o JS com `?v=dev`. O build troca pela versão calculada do conteúdo; não é preciso mexer à mão.
- Página nova: entra no `sitemap.xml` e segue o checklist de "Toda página nova precisa de" no `CLAUDE.md`.

## Licença

O código e o conteúdo do site estão sob a [Licença MIT](LICENSE). As fontes em `site/fonts/` (JetBrains Mono e Chomsky)
seguem a SIL Open Font License 1.1, com os textos das licenças na mesma pasta.
