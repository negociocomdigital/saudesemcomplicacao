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

const CTA_PADRAO_POR_CATEGORIA: Record<Categoria, string> = {
  "Marmita Congelada":
    "Quer aprender a congelar marmita sem perder sabor nem tempo?",
  "Marmita Fit": "Quer montar marmitas fit sem complicação toda semana?",
  "Marmitas em Campinas":
    "Quer organizar suas marmitas em Campinas sem enrolação?",
  "Renda Extra com Marmitas":
    "Quer transformar sua cozinha em uma renda extra de verdade?",
};

export interface CtaConteudo {
  badge: string;
  titulo: string;
  subtitulo: string;
  botao: string;
  link?: string;
}

export function getCtaContent(artigo: ArticleFrontmatter): CtaConteudo {
  return {
    badge: artigo.cta_badge || "Saúde Sem Complicação",
    titulo: artigo.cta_titulo || CTA_PADRAO_POR_CATEGORIA[artigo.categoria],
    subtitulo: artigo.cta_subtitulo || "Em breve, por aqui. Sem compromisso.",
    botao: artigo.cta_botao || "Quero saber mais",
    link: artigo.cta_link,
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
