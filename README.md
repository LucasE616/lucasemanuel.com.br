# lucasemanuel.com.br

Portfólio pessoal de Lucas Emanuel — Dev Back-end & Analista de Sistemas.

Site estático (HTML, CSS e JavaScript puros, sem framework, sem build e sem dependências), publicado com GitHub Pages em
[lucasemanuel.com.br](https://lucasemanuel.com.br). Cada push na `main` publica o site em menos de um minuto.

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

Na raiz do projeto:

```bash
python -m http.server 5500
```

No Windows, se o comando `python` não existir, use `py -m http.server 5500`. Depois abra http://localhost:5500.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home: apresentação, README com skills e contato, modal e paleta |
| `setup/`, `curriculo/`, `servicos/` | Páginas de conteúdo, cada uma com o seu `index.html` |
| `terminal/` | `index.html` e `terminal.js`, com a lista de comandos |
| `jogos/` | `index.html`, regras e IA (`velha-ia.js`, `damas-ia.js`, `damas-worker.js`) e interfaces (`jogos.js`, `damas.js`, `carrinho.js`) |
| `style.css` | Estilos de todas as páginas, com os temas claro e escuro |
| `script.js` | Paleta de comandos, atalhos, tema, modais, botões de copiar e contatos protegidos |
| `404.html` | Página de erro do GitHub Pages |
| `fonts/` | JetBrains Mono e Chomsky, com as licenças OFL |
| `cli` | Cartão de visita com cores ANSI, para o `curl` |
| `favicon.svg`, `og-image.png` | Ícone e imagem de prévia dos links |
| `robots.txt`, `sitemap.xml` | Indexação nos buscadores |
| `CNAME`, `.nojekyll` | Domínio do GitHub Pages e publicação dos arquivos como estão |
| `ROADMAP.md` | Melhorias planejadas e correções |
| `CLAUDE.md` | Decisões, padrões e preferências do projeto |
| `LICENSE` | Licença MIT |

## Ao alterar o site

- Os HTMLs pedem o CSS e o JS com `?v=AAAAMMDD.N`. Ao mudar `style.css`, `script.js`, `terminal/terminal.js` ou os
  arquivos de `jogos/`, aumente o `?v=` em todos os HTMLs, no mesmo commit; senão o cache do navegador mistura versões.
- Página nova: entra no `sitemap.xml` e segue o checklist de "Toda página nova precisa de" no `CLAUDE.md`.

## Licença

O código e o conteúdo do site estão sob a [Licença MIT](LICENSE). As fontes em `fonts/` (JetBrains Mono e Chomsky)
seguem a SIL Open Font License 1.1, com os textos das licenças na mesma pasta.
