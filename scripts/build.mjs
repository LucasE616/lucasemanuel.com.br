// Build do site: copia site/ para dist/ e troca o ?v= dos CSS e JS nos HTMLs por uma versão
// calculada a partir do conteúdo de todos os CSS e JS. Assim, qualquer mudança neles gera uma
// versão nova em todas as páginas, sem precisar aumentar o ?v= à mão.
//
// Uso: node scripts/build.mjs   (sem dependências; só o Node 18+)
//
// A versão é uma só para o site todo, e não uma por arquivo, porque os jogos repassam o ?v=
// de um arquivo para outro (damas-ia.js → damas-worker.js → damas-ia.js). Uma versão única
// garante que nenhum deles fique com cache antigo.

import { cp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, relative, sep } from "node:path";

const SRC = "site";
const OUT = "dist";
const VERSIONED = /\.(css|js)$/;
const ASSET_REF = /(\.(?:css|js))\?v=[\w.-]+/g;

async function listFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(path)));
    else files.push(path);
  }
  return files.sort();
}

const toPosix = (path) => path.split(sep).join("/");

await rm(OUT, { recursive: true, force: true });
await cp(SRC, OUT, { recursive: true });

const files = await listFiles(OUT);

const hash = createHash("sha256");
for (const file of files.filter((f) => VERSIONED.test(f))) {
  hash.update(toPosix(relative(OUT, file)));
  hash.update(await readFile(file));
}
const version = hash.digest("hex").slice(0, 10);

let pages = 0;
let refs = 0;
for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  const updated = html.replace(ASSET_REF, (_, ext) => {
    refs++;
    return `${ext}?v=${version}`;
  });
  if (updated !== html) {
    await writeFile(file, updated);
    pages++;
  }
}

console.log(`Build concluído em ${OUT}/: versão ${version}, ${refs} referências em ${pages} páginas.`);
