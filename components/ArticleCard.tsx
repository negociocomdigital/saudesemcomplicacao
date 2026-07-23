import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="card group flex flex-col">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-salvia/10">
        <Image
          src={article.imagem_capa}
          alt={article.titulo}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="tag-pill w-fit">{article.categoria}</span>
        <h3 className="font-serif text-lg italic leading-snug text-chumbo group-hover:text-salvia-escuro">
          {article.titulo}
        </h3>
        <p className="line-clamp-3 flex-1 text-sm text-chumbo-claro">
          {article.resumo}
        </p>
      </div>
    </Link>
  );
}
