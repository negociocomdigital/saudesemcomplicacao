import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl text-chumbo">
        Página não encontrada
      </h1>
      <p className="mt-4 text-chumbo-claro">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Link href="/" className="btn-pill mt-8 inline-block">
        Voltar para o início
      </Link>
    </div>
  );
}
