import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleSlugs,
  getCtaContent,
  slugify,
  splitIntroSection,
} from "@/lib/articles";
import PromoBanner from "@/components/PromoBanner";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const artigo = getArticleBySlug(params.slug);
  if (!artigo) return {};
  return {
    title: artigo.titulo,
    description: artigo.resumo,
    openGraph: {
      title: artigo.titulo,
      description: artigo.resumo,
      images: [artigo.imagem_capa],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const artigo = getArticleBySlug(params.slug);
  if (!artigo) notFound();
  const cta = getCtaContent(artigo);
  const { primeiro, resto } = splitIntroSection(artigo.content);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href={`/categoria/${slugify(artigo.categoria)}`}
        className="tag-pill mb-4 inline-block"
      >
        {artigo.categoria}
      </Link>
      <h1 className="mb-4 font-serif text-3xl leading-tight text-chumbo md:text-4xl">
        {artigo.titulo}
      </h1>
      <p className="mb-6 text-sm text-chumbo-claro">
        Publicado em{" "}
        {new Date(`${artigo.data_publicacao}T12:00:00`).toLocaleDateString(
          "pt-BR",
          { day: "2-digit", month: "long", year: "numeric" }
        )}
      </p>

      <div className="card relative mb-8 aspect-[3/2] w-full overflow-hidden">
        <Image
          src={artigo.imagem_capa}
          alt={artigo.titulo}
          fill
          unoptimized
          priority
          className="object-cover"
        />
      </div>

      <div className="prose-artigo">
        <MDXRemote source={primeiro} />
      </div>

      <PromoBanner cta={cta} />

      {resto && (
        <div className="prose-artigo">
          <MDXRemote source={resto} />
        </div>
      )}

      <PromoBanner cta={cta} />

      <RelatedArticles slugAtual={artigo.slug} categoria={artigo.categoria} />
    </div>
  );
}

function RelatedArticles({
  slugAtual,
  categoria,
}: {
  slugAtual: string;
  categoria: string;
}) {
  const relacionados = getAllArticles()
    .filter((a) => a.categoria === categoria && a.slug !== slugAtual)
    .slice(0, 3);

  if (relacionados.length === 0) return null;

  return (
    <div className="mt-14">
      <h2 className="mb-4 font-serif text-xl text-chumbo">
        Leia também
      </h2>
      <ul className="space-y-2">
        {relacionados.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/blog/${r.slug}`}
              className="text-salvia-escuro underline-offset-4 hover:underline"
            >
              {r.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
