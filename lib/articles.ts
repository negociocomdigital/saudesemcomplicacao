import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type Categoria =
  | "Marmita Congelada"
  | "Marmita Fit"
  | "Marmitas em Campinas"
  | "Renda Extra com Marmitas";

export type Funil = "Topo" | "Meio" | "Fundo";

export interface ArticleFrontmatter {
  titulo: string;
  slug: string;
  data_publicacao: string;
  categoria: Categoria;
  palavra_chave: string;
  angulo: string;
  funil: Funil;
  resumo: string;
  imagem_capa: string;
  cta_badge?: string;
  cta_titulo?: string;
  cta_subtitulo?: string;
  cta_botao?: string;
  cta_link?: string;
}

export interface Article extends ArticleFrontmatter {
  content: string;
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { ...(data as ArticleFrontmatter), content };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== null);

  return articles.sort(
    (a, b) =>
      new Date(b.data_publicacao).getTime() -
      new Date(a.data_publicacao).getTime()
  );
}

export function getArticlesByCategoria(categoria: string): Article[] {
  return getAllArticles().filter(
    (a) => slugify(a.categoria) === slugify(categoria)
  );
}

export const CATEGORIAS: Categoria[] = [
  "Marmita Congelada",
  "Marmita Fit",
  "Marmitas em Campinas",
  "Renda Extra com Marmitas",
];

const CURSO_LINK_PADRAO = "https://fitlucrativo.lovable.app/";
const CURSO_BADGE_PADRAO = "Fit Lucrativo";

// Tom por categoria: categorias de "ganhar dinheiro" vão direto e agressivo
// no tema de renda/lucro. As demais (mais sobre praticidade do dia a dia)
// vendem a ideia de ganhar tempo de volta e ter uma vida mais leve — o
// gancho bate com a intenção de quem está lendo aquele artigo específico.
const CTA_PADRAO_POR_CATEGORIA: Record<
  Categoria,
  { titulo: string; subtitulo: string; botao: string }
> = {
  "Marmita Congelada": {
    titulo: "Cansado de perder tempo decidindo o que comer todo dia?",
    subtitulo:
      "O Fit Lucrativo te mostra como ganhar esse tempo de volta e ter uma rotina mais leve.",
    botao: "Quero ganhar tempo",
  },
  "Marmita Fit": {
    titulo: "Quer uma vida mais leve, sem virar refém da cozinha toda semana?",
    subtitulo: "Veja como o Fit Lucrativo simplifica sua rotina fit de vez.",
    botao: "Quero uma rotina mais leve",
  },
  "Marmitas em Campinas": {
    titulo: "Quer ganhar tempo de volta com as marmitas da sua semana?",
    subtitulo: "O Fit Lucrativo mostra o caminho mais simples pra isso.",
    botao: "Quero ganhar tempo",
  },
  "Renda Extra com Marmitas": {
    titulo:
      "Cansado de bater o mês no zero a zero? Comece a lucrar vendendo marmita fit.",
    subtitulo:
      "O Fit Lucrativo é o passo a passo completo pra transformar sua cozinha numa fonte de renda extra real.",
    botao: "Quero lucrar com marmita fit",
  },
};

export interface CtaConteudo {
  badge: string;
  titulo: string;
  subtitulo: string;
  botao: string;
  link?: string;
}

export function getCtaContent(artigo: ArticleFrontmatter): CtaConteudo {
  const padrao = CTA_PADRAO_POR_CATEGORIA[artigo.categoria];
  return {
    badge: artigo.cta_badge || CURSO_BADGE_PADRAO,
    titulo: artigo.cta_titulo || padrao.titulo,
    subtitulo: artigo.cta_subtitulo || padrao.subtitulo,
    botao: artigo.cta_botao || padrao.botao,
    link: artigo.cta_link || CURSO_LINK_PADRAO,
  };
}

// Divide o artigo em "introdução" (parágrafo de resposta direta + a
// primeira seção de contexto) e "resto" — o banner de CTA entra entre os
// dois blocos, depois da introdução completa, não logo após a 1ª frase.
export function splitIntroSection(content: string): {
  primeiro: string;
  resto: string;
} {
  const trimmed = content.trimStart();
  const headingMatches = [...trimmed.matchAll(/\n##\s/g)];

  if (headingMatches.length >= 2) {
    const segundoTituloIdx = headingMatches[1].index!;
    return {
      primeiro: trimmed.slice(0, segundoTituloIdx).trimEnd(),
      resto: trimmed.slice(segundoTituloIdx).trimStart(),
    };
  }

  const idx = trimmed.indexOf("\n\n");
  if (idx === -1) return { primeiro: trimmed, resto: "" };
  return {
    primeiro: trimmed.slice(0, idx),
    resto: trimmed.slice(idx).trimStart(),
  };
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
