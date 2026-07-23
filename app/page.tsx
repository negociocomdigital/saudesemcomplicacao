import Link from "next/link";
import { getAllArticles, CATEGORIAS, slugify } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export default function HomePage() {
  const artigos = getAllArticles().slice(0, 8);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="mb-14 text-center">
        <h1 className="font-serif text-4xl italic text-chumbo md:text-5xl">
          Marmitas sem complicação
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-chumbo-claro">
          Dicas simples e práticas para fazer marmita congelada, montar
          marmitas fit em casa e até transformar isso em uma renda extra.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {CATEGORIAS.map((categoria) => (
            <Link
              key={categoria}
              href={`/categoria/${slugify(categoria)}`}
              className="tag-pill hover:bg-salvia/20"
            >
              {categoria}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 font-serif text-2xl italic text-chumbo">
          Artigos recentes
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artigos.map((artigo) => (
            <ArticleCard key={artigo.slug} article={artigo} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/blog" className="btn-pill">
            Ver todos os artigos
          </Link>
        </div>
      </section>
    </div>
  );
}
