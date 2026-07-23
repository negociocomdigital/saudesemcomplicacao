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

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
