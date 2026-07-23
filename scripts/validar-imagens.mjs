import fs from "fs";
import path from "path";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const TIMEOUT_MS = 25000;

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

async function checkImage(url) {
  if (!url) return { ok: false, reason: "vazio" };
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    const contentType = res.headers.get("content-type") || "";
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    if (!contentType.startsWith("image/"))
      return { ok: false, reason: `content-type inesperado: ${contentType}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message || "erro de rede/timeout" };
  }
}

const files = fs.existsSync(ARTICLES_DIR)
  ? fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"))
  : [];

let brokenCount = 0;
const results = [];

for (const file of files) {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const data = readFrontmatter(raw);
  const check = await checkImage(data.imagem_capa);
  if (!check.ok) brokenCount++;
  results.push({ file, slug: data.slug, ok: check.ok, reason: check.reason });
}

for (const r of results) {
  console.log(`${r.ok ? "OK  " : "FALHA"} ${r.file}${r.ok ? "" : ` — ${r.reason}`}`);
}

console.log(
  `\n${results.length} artigos verificados, ${brokenCount} com imagem inválida/vazia.`
);

if (brokenCount > 0) process.exit(1);
