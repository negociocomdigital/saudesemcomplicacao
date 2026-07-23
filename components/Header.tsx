import Link from "next/link";
import Image from "next/image";
import { CATEGORIAS, slugify } from "@/lib/articles";

export default function Header() {
  return (
    <header className="border-b border-black/5 bg-bege/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-8">
        <Link href="/" className="block">
          <Image
            src="/logo.png"
            alt="Saúde Sem Complicação"
            width={1203}
            height={384}
            priority
            className="h-20 w-auto sm:h-24"
          />
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
