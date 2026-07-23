import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Todos os artigos sobre marmita congelada, marmita fit, marmitas em Campinas e renda extra com marmitas.",
};

export default function BlogPage() {
  const artigos = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 font-serif text-3xl text-chumbo">
        Todos os artigos
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artigos.map((artigo) => (
          <ArticleCard key={artigo.slug} article={artigo} />
        ))}
      </div>
    </div>
  );
}
