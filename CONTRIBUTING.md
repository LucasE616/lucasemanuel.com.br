# Como contribuir

Este é o portfólio pessoal do Lucas Emanuel, mas o fluxo segue o de um time: nada entra na `main` nem na
`develop` sem Pull Request. O plano completo está em [PLANO-DE-MELHORIAS.md](PLANO-DE-MELHORIAS.md).

## Branches e ambientes

| Branch | Ambiente | Recebe |
|---|---|---|
| `main` | Produção: https://lucasemanuel.com.br | Só PRs de **release** (vindos da `develop`) e de **hotfix** |
| `develop` (padrão) | Homologação: https://dev.lucasemanuel.com.br | PRs de trabalho do dia a dia |
| `feature/*`, `fix/*`, `docs/*`, `refactor/*`, `chore/*` | Preview do PR: `<branch>.lucasemanuel.pages.dev` | Commits de trabalho |
| `hotfix/*` | Preview do PR | Correção urgente feita a partir da `main` |

As duas branches principais são protegidas por um ruleset: sem push direto, sem force push e sem exclusão.

```
feature/*, fix/* ──PR (squash)──► develop ──PR de release (merge commit)──► main
hotfix/*  ──PR (squash)──► main ──PR de volta (merge commit)──► develop
```

## Fluxo do dia a dia

1. Atualize a `develop` e crie uma branch a partir dela:
   ```bash
   git switch develop
   git pull
   git switch -c feature/nome-curto
   ```
2. Faça commits pequenos, no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
   ```
   feat(projetos): página de projetos com dados em JSON
   fix(terminal): Ctrl+C não dá mais dois lances seguidos
   docs: atualiza o README
   ```
   Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`.
3. Envie a branch e abra o Pull Request para a `develop` (é o destino padrão):
   ```bash
   git push -u origin feature/nome-curto
   ```
4. Preencha o template, teste o **preview** (o Cloudflare comenta o link no PR) e revise a aba **Files changed**.
5. Merge com **Squash and merge**. A branch é apagada automaticamente.
6. Confira o resultado em https://dev.lucasemanuel.com.br.

## Release (develop → main)

Quando o que está em dev estiver bom para ir ao ar:

1. Abra um PR com **base `main`** e **compare `develop`**.
2. Título: `release: <resumo>` (ex.: `release: cabeçalhos de segurança e fluxo com develop`).
3. Merge com **Create a merge commit** (nunca squash). Assim a `develop` continua contida na `main`, e a próxima
   release não repete commits nem gera conflito.
4. **Não apague a `develop`** (o ruleset também impede).

## Hotfix (correção urgente em produção)

1. Crie a branch a partir da `main`: `git switch main`, `git pull`, `git switch -c hotfix/nome-curto`.
2. PR para a `main`, com **Squash and merge**.
3. Logo depois, abra um PR com **base `develop`** e **compare `main`**, e faça o merge com **Create a merge commit**,
   para a correção chegar também à `develop`.

## Rodar localmente

```bash
py -m http.server 5500 -d site      # Windows
python3 -m http.server 5500 -d site # Linux/macOS
```

Abra http://localhost:5500. Para testar o build: `node scripts/build.mjs` e sirva a pasta `dist` no lugar de `site`.

Cada PR também ganha um **preview** no Cloudflare Pages: o link aparece num comentário do PR.

## Regras que valem para todo PR

- **Cache:** nos HTMLs, CSS e JS entram com `?v=dev`. O build troca pela versão; não aumente à mão.
- **Contatos:** e-mails e telefone nunca em texto puro no HTML (ver `CLAUDE.md`).
- **Acessibilidade:** teclado, `aria-*` e `prefers-reduced-motion` continuam funcionando.
- **Temas:** testar no claro e no escuro.
- **Roadmap:** se o PR conclui um item do `ROADMAP.md` ou do plano, atualize o status no mesmo PR.
