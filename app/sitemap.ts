import type { MetadataRoute } from "next";
import { getAllArticles, CATEGORIAS, slugify } from "@/lib/articles";

const BASE_URL = "https://saudesemcomplicacao.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const artigos = getAllArticles().map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: a.data_publicacao,
  }));

  const categorias = CATEGORIAS.map((c) => ({
    url: `${BASE_URL}/categoria/${slugify(c)}`,
  }));

  return [
    { url: BASE_URL },
    { url: `${BASE_URL}/blog` },
    { url: `${BASE_URL}/sobre` },
    { url: `${BASE_URL}/politica-de-privacidade` },
    ...categorias,
    ...artigos,
  ];
}
