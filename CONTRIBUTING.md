# Como contribuir

Este é o portfólio pessoal do Lucas Emanuel, mas o fluxo segue o de um time: nada entra na `main` sem
Pull Request. O plano completo está em [PLANO-DE-MELHORIAS.md](PLANO-DE-MELHORIAS.md).

## Fluxo

1. Atualize a `main` e crie uma branch a partir dela:
   ```bash
   git switch main
   git pull
   git switch -c feature/nome-curto
   ```
   Prefixos: `feature/`, `fix/`, `docs/`, `refactor/`, `chore/`, `hotfix/`.
2. Faça commits pequenos, no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
   ```
   feat(projetos): página de projetos com dados em JSON
   fix(terminal): Ctrl+C não dá mais dois lances seguidos
   docs: atualiza o README
   ```
   Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`.
3. Envie a branch e abra o Pull Request para a `main`:
   ```bash
   git push -u origin feature/nome-curto
   ```
4. Preencha o template do PR e revise a aba **Files changed** antes de pedir o merge.
5. Merge com **Squash and merge**. A branch é apagada depois.

Quando a `develop` e o ambiente de dev existirem (passo E da Fase 2), os PRs passam a ir para a `develop`,
e a `main` recebe só PRs de release.

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
