import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIAS, getArticlesByCategoria, slugify } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export function generateStaticParams() {
  return CATEGORIAS.map((categoria) => ({ categoria: slugify(categoria) }));
}

function resolveCategoria(slug: string) {
  return CATEGORIAS.find((c) => slugify(c) === slug);
}

export function generateMetadata({
  params,
}: {
  params: { categoria: string };
}): Metadata {
  const categoria = resolveCategoria(params.categoria);
  if (!categoria) return {};
  return {
    title: categoria,
    description: `Artigos sobre ${categoria.toLowerCase()} no blog Saúde Sem Complicação.`,
  };
}

export default function CategoriaPage({
  params,
}: {
  params: { categoria: string };
}) {
  const categoria = resolveCategoria(params.categoria);
  if (!categoria) notFound();

  const artigos = getArticlesByCategoria(categoria);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <span className="tag-pill mb-4 w-fit">{categoria}</span>
      <h1 className="mb-8 font-serif text-3xl italic text-chumbo">
        {categoria}
      </h1>
      {artigos.length === 0 ? (
        <p className="text-chumbo-claro">
          Ainda não temos artigos nesta categoria. Volte em breve.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artigos.map((artigo) => (
            <ArticleCard key={artigo.slug} article={artigo} />
          ))}
        </div>
      )}
    </div>
  );
}
