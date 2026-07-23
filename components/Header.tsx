import Link from "next/link";
import { CATEGORIAS, slugify } from "@/lib/articles";

export default function Header() {
  return (
    <header className="border-b border-black/5 bg-bege/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-6">
        <Link href="/" className="font-serif text-2xl italic text-chumbo">
          Saúde Sem Complicação
        </Link>
        <nav className="flex flex-wrap justify-center gap-2">
          {CATEGORIAS.map((categoria) => (
            <Link
              key={categoria}
              href={`/categoria/${slugify(categoria)}`}
              className="tag-pill hover:bg-salvia/20"
            >
              {categoria}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
