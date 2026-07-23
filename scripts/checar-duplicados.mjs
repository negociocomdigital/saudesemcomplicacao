import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content", "articles");
const files = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))
  : [];

function readFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^"|"$/g, "");
    data[key] = value;
  }
  return data;
}

const artigos = files.map((f) => {
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  return readFrontmatter(raw);
});

console.log(`Total de artigos existentes: ${artigos.length}\n`);

const porCategoria = {};
for (const a of artigos) {
  porCategoria[a.categoria] = (porCategoria[a.categoria] || 0) + 1;
}

console.log("Distribuição por categoria:");
for (const [categoria, total] of Object.entries(porCategoria)) {
  console.log(`  - ${categoria}: ${total}`);
}

console.log("\nTítulos e slugs já usados (use para evitar repetição):");
for (const a of artigos) {
  console.log(`  - [${a.categoria}] ${a.titulo} (${a.slug})`);
}
