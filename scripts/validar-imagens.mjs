import fs from "fs";
import path from "path";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const TIMEOUT_MS = 60000;
const DELAY_BETWEEN_MS = 2500;
const MAX_RETRIES = 3;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Geradores de imagem por IA (Pollinations/Flux) costumam distorcer telas de
// celular/computador, ícones de apps e qualquer texto renderizado na cena.
// Bloqueamos esses temas de prompt aqui para não publicar imagem quebrada.
const PALAVRAS_DE_RISCO = [
  "phone",
  "smartphone",
  "iphone",
  "screen",
  "display",
  "app ",
  "whatsapp",
  "instagram",
  "facebook",
  "laptop",
  "computer",
  "tablet",
  "typing",
  "keyboard",
  "notification",
  "chat",
  "message",
  "icon",
  "logo",
  "interface",
  "website",
  "browser",
  "text on",
  "reading text",
];

function extrairPrompt(url) {
  const match = url.match(/\/prompt\/([^?]+)/);
  if (!match) return "";
  try {
    return decodeURIComponent(match[1]).toLowerCase();
  } catch {
    return match[1].toLowerCase();
  }
}

function checarPromptDeRisco(url) {
  const prompt = extrairPrompt(url);
  for (const palavra of PALAVRAS_DE_RISCO) {
    if (prompt.includes(palavra)) {
      return palavra;
    }
  }
  return null;
}

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

async function checkImageOnce(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    const contentType = res.headers.get("content-type") || "";
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}`, status: res.status };
    if (!contentType.startsWith("image/"))
      return { ok: false, reason: `content-type inesperado: ${contentType}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message || "erro de rede/timeout" };
  } finally {
    clearTimeout(timer);
  }
}

async function checkImage(url) {
  if (!url) return { ok: false, reason: "vazio" };
  const palavraDeRisco = checarPromptDeRisco(url);
  if (palavraDeRisco) {
    return {
      ok: false,
      reason: `prompt de risco de distorção ("${palavraDeRisco}") — evite telas, apps ou texto na cena`,
    };
  }
  let lastResult;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    lastResult = await checkImageOnce(url);
    if (lastResult.ok) return lastResult;
    // Pollinations gera a imagem sob demanda: 429 (rate limit) e timeout/abort
    // em prompts novos costumam ser lentidão passageira, não URL quebrada.
    // Vale tentar de novo com mais espera antes de marcar como falha real.
    if (attempt < MAX_RETRIES) {
      await sleep(DELAY_BETWEEN_MS * attempt * 4);
      continue;
    }
    break;
  }
  return lastResult;
}

const files = fs.existsSync(ARTICLES_DIR)
  ? fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"))
  : [];

let brokenCount = 0;
const results = [];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const data = readFrontmatter(raw);
  const check = await checkImage(data.imagem_capa);
  if (!check.ok) brokenCount++;
  results.push({ file, slug: data.slug, ok: check.ok, reason: check.reason });
  if (i < files.length - 1) await sleep(DELAY_BETWEEN_MS);
}

for (const r of results) {
  console.log(`${r.ok ? "OK  " : "FALHA"} ${r.file}${r.ok ? "" : ` — ${r.reason}`}`);
}

console.log(
  `\n${results.length} artigos verificados, ${brokenCount} com imagem inválida/vazia.`
);

if (brokenCount > 0) process.exit(1);
