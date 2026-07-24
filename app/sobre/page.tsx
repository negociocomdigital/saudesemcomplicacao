import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça o Saúde Sem Complicação: um blog com dicas práticas de marmita congelada, marmita fit e renda extra com marmitas.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 font-serif text-3xl text-chumbo md:text-4xl">
        Sobre o Saúde Sem Complicação
      </h1>

      <div className="prose-artigo">
        <p>
          O Saúde Sem Complicação é um blog voltado para quem quer resolver a
          rotina de marmitas sem virar um problema: como preparar, congelar e
          organizar marmitas em casa, e como transformar essa prática em uma
          renda extra para quem quiser vender.
        </p>

        <h2>O que você encontra aqui</h2>
        <p>
          Guias diretos e práticos sobre marmita congelada, marmita fit,
          organização de freezer e potes, precificação e como começar a
          vender marmitas — inclusive com contexto específico para quem mora
          em Campinas e região.
        </p>

        <h2>Como produzimos o conteúdo</h2>
        <p>
          Nosso conteúdo é produzido e revisado pela nossa equipe, com foco em
          praticidade e clareza acima de tudo. Este site tem propósito
          informativo e prático — não substitui orientação nutricional ou
          médica individualizada. Para decisões específicas de saúde ou dieta,
          procure um profissional habilitado.
        </p>

        <h2>Contato</h2>
        <p>
          Dúvidas, sugestões ou parcerias:{" "}
          <a
            href="mailto:contato@negociocomdigital.com"
            className="text-salvia-escuro underline-offset-4 hover:underline"
          >
            contato@negociocomdigital.com
          </a>
        </p>
      </div>
    </div>
  );
}
