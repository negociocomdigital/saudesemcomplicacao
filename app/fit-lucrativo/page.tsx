import type { Metadata } from "next";
import Image from "next/image";
import PromoBanner from "@/components/PromoBanner";

const CHECKOUT_URL = "https://pay.kiwify.com.br/7LMCUbG";
const HERO_IMAGE = "/fit-lucrativo-hero.jpg";

export const metadata: Metadata = {
  title: "Fit Lucrativo — Marmita fit, tempo de volta e renda extra",
  description:
    "O método passo a passo para organizar suas marmitas fit, economizar tempo na cozinha e, se quiser, transformar isso em renda extra vendendo marmitas.",
  alternates: { canonical: "/fit-lucrativo" },
  openGraph: {
    title: "Fit Lucrativo — Marmita fit, tempo de volta e renda extra",
    description:
      "O método passo a passo para organizar suas marmitas fit, economizar tempo na cozinha e, se quiser, transformar isso em renda extra vendendo marmitas.",
    images: [HERO_IMAGE],
  },
};

const STATS = [
  { valor: "Único", legenda: "pagamento" },
  { valor: "7 dias", legenda: "de garantia" },
  { valor: "Vitalício", legenda: "o acesso" },
];

const BENEFICIOS = [
  {
    titulo: "Tempo de volta",
    texto:
      "Prepare a semana inteira de marmitas em poucas horas e nunca mais perca tempo decidindo o que comer todo dia.",
    icone: <path d="M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />,
  },
  {
    titulo: "Alimentação mais leve",
    texto:
      "Refeições equilibradas e saborosas, pensadas para caber na sua rotina real — sem contar caloria a vida toda.",
    icone: (
      <path d="M12 21s-7-4.35-9.5-8.5C.7 8.6 2.4 5 6 5c2 0 3.3 1.1 4 2 .7-.9 2-2 4-2 3.6 0 5.3 3.6 3.5 7.5C19 16.65 12 21 12 21Z" />
    ),
  },
  {
    titulo: "Cozinha organizada",
    texto:
      "Um sistema simples de potes, freezer e planejamento semanal para parar de improvisar toda semana.",
    icone: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M3 11h18M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      </>
    ),
  },
  {
    titulo: "Renda extra, se quiser",
    texto:
      "O mesmo método vira negócio: aprenda a precificar, vender e organizar entregas de marmita fit.",
    icone: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 15.5c.5 1 1.5 1.5 2.5 1.5 1.7 0 3-1 3-2.3 0-3-5-1.5-5-4.2C10 9 11.3 8 13 8c1 0 2 .5 2.5 1.5M12 6.5v1M12 16.5v1" />
      </>
    ),
  },
];

const COMO_FUNCIONA = [
  {
    numero: "01",
    titulo: "Você garante seu acesso",
    texto: "Pagamento único, direto pela Kiwify, com seus dados protegidos.",
  },
  {
    numero: "02",
    titulo: "Acesso liberado na hora",
    texto:
      "Assim que o pagamento é confirmado, o método completo cai no seu e-mail — sem espera.",
  },
  {
    numero: "03",
    titulo: "Você aplica no seu ritmo",
    texto:
      "Sem prazo, sem pressão. Você segue o passo a passo no tempo que fizer sentido pra sua rotina.",
  },
];

const PERSONAS = [
  {
    titulo: "Rotina corrida",
    texto: "Trabalha fora e cansou de decidir o que comer todo dia.",
  },
  {
    titulo: "Quer comer melhor",
    texto:
      "Busca alimentação equilibrada sem depender de restaurante ou aplicativo de entrega.",
  },
  {
    titulo: "Quer organizar a cozinha",
    texto: "Cansou de improvisar toda semana e quer um sistema que funcione.",
  },
  {
    titulo: "Quer renda extra",
    texto:
      "Quer transformar o mesmo método em uma fonte de renda, no seu próprio horário.",
  },
];

const INCLUSOS = [
  "Método completo, passo a passo, do zero",
  "Mais de 50 receitas testadas",
  "Guia de precificação e vendas, para quem quiser lucrar",
  "Acesso vitalício, sem mensalidade",
  "Garantia incondicional de 7 dias",
];

const FAQ = [
  {
    pergunta: "Preciso ter experiência para começar?",
    resposta:
      "Não. O método foi pensado para quem nunca fez marmita fit nem vendeu nada antes — o passo a passo parte do zero.",
  },
  {
    pergunta:
      "Serve só para quem quer vender, ou também para quem só quer organizar a própria rotina?",
    resposta:
      "Serve para os dois casos. Você pode usar só para facilitar sua própria alimentação, ou seguir também a parte de como vender e lucrar com isso — a escolha é sua.",
  },
  {
    pergunta: "Funciona em qualquer cidade?",
    resposta:
      "Sim. O método de preparo, organização e precificação vale para qualquer lugar do Brasil.",
  },
  {
    pergunta: "E se eu não gostar?",
    resposta:
      "Você tem 7 dias de garantia incondicional. Se não for para você, é só pedir e devolvemos 100% do valor.",
  },
  {
    pergunta: "Como recebo o acesso?",
    resposta:
      "Assim que o pagamento é confirmado pela Kiwify, o acesso é liberado na hora, direto no seu e-mail.",
  },
];

function IconeIndice({ n }: { n: string }) {
  return (
    <span className="font-serif text-4xl leading-none text-salvia/35 md:text-5xl">
      {n}
    </span>
  );
}

export default function FitLucrativoPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Hero */}
      <section className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <span className="tag-pill mb-5 w-fit">Método Fit Lucrativo</span>
          <h1 className="mb-5 font-serif text-3xl leading-tight text-chumbo md:text-4xl">
            Coma melhor, ganhe tempo de volta e, se quiser, transforme suas
            marmitas em renda extra
          </h1>
          <p className="mb-7 text-chumbo-claro">
            Um passo a passo simples para sair da bagunça na cozinha: menos
            tempo perdido decidindo o que comer, mais controle da sua
            alimentação — e um caminho real para vender marmita fit, se você
            quiser lucrar com isso.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={CHECKOUT_URL} className="btn-pill">
              Quero começar agora
            </a>
            <a
              href="#beneficios"
              className="inline-flex items-center rounded-pill px-6 py-3 text-sm font-semibold text-salvia-escuro ring-1 ring-inset ring-salvia/40 transition-colors hover:bg-salvia/10"
            >
              Ver o que tem dentro
            </a>
          </div>

          <div className="mt-9 grid grid-cols-3 divide-x divide-black/10 border-y border-black/10 py-5">
            {STATS.map((s) => (
              <div key={s.legenda} className="text-center">
                <p className="font-serif text-lg text-chumbo md:text-xl">
                  {s.valor}
                </p>
                <p className="text-xs text-chumbo-claro">{s.legenda}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card relative aspect-square w-full overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt="Marmitas fit organizadas em potes de vidro, prontas para a semana"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* O que você ganha — intro */}
      <section id="beneficios" className="mt-24">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <span className="tag-pill mb-4 w-fit mx-auto">O que você ganha</span>
          <h2 className="mb-3 font-serif text-2xl text-chumbo md:text-3xl">
            Por que o Fit Lucrativo funciona
          </h2>
          <p className="text-chumbo-claro">
            Tudo em um método só: preparo, organização e, se você quiser,
            também o caminho para vender. Nenhum curso extra, nenhum passo
            escondido.
          </p>
        </div>

        <div className="divide-y divide-black/10">
          {BENEFICIOS.map((b, i) => (
            <div
              key={b.titulo}
              className="grid items-center gap-4 py-8 first:pt-0 last:pb-0 md:grid-cols-[3.5rem_1fr_3.5rem] md:gap-8"
            >
              <IconeIndice n={String(i + 1).padStart(2, "0")} />
              <div>
                <h3 className="mb-1 font-serif text-xl text-chumbo md:text-2xl">
                  {b.titulo}
                </h3>
                <p className="text-chumbo-claro">{b.texto}</p>
              </div>
              <div className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-salvia/10 md:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#728A6E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {b.icone}
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="mt-24">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <span className="tag-pill mb-4 w-fit mx-auto">Como funciona</span>
          <h2 className="font-serif text-2xl text-chumbo md:text-3xl">
            Do pagamento ao primeiro passo, sem enrolação
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {COMO_FUNCIONA.map((c) => (
            <div key={c.numero} className="card p-6">
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-salvia-escuro text-sm font-bold text-white">
                {c.numero}
              </span>
              <h3 className="mb-1 font-serif text-lg text-chumbo">
                {c.titulo}
              </h3>
              <p className="text-sm text-chumbo-claro">{c.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Para quem é */}
      <section className="mt-24">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <span className="tag-pill mb-4 w-fit mx-auto">Para quem é</span>
          <h2 className="font-serif text-2xl text-chumbo md:text-3xl">
            Se você se identifica com algum desses, o Fit Lucrativo é pra você
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PERSONAS.map((p) => (
            <div key={p.titulo} className="card p-6">
              <h3 className="mb-1 font-serif text-lg text-chumbo">
                {p.titulo}
              </h3>
              <p className="text-sm text-chumbo-claro">{p.texto}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl rounded-xl bg-salvia/10 p-4 text-center text-sm font-semibold text-salvia-escuro">
          Não precisa de experiência prévia — o método guia você passo a
          passo, do zero.
        </p>
      </section>

      {/* Preço */}
      <section className="mt-24">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <span className="tag-pill mb-4 w-fit mx-auto">Investimento</span>
          <h2 className="font-serif text-2xl text-chumbo md:text-3xl">
            Um pagamento. Acesso vitalício.
          </h2>
        </div>
        <div className="card mx-auto max-w-xl overflow-hidden">
          <div className="p-8 md:p-10">
            <p className="mb-4 font-serif text-lg text-chumbo">
              Método Fit Lucrativo
            </p>
            <ul className="mb-8 space-y-3">
              {INCLUSOS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-salvia/15 text-xs font-bold text-salvia-escuro">
                    ✓
                  </span>
                  <span className="text-sm text-chumbo-claro">{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-black/10 pt-6 text-center">
              <p className="text-chumbo-claro line-through">De R$ 97,00</p>
              <p className="mb-1 font-serif text-4xl text-chumbo md:text-5xl">
                R$ 27,00
              </p>
              <p className="mb-6 text-sm text-chumbo-claro">
                Pagamento único · Sem mensalidades
              </p>
              <a href={CHECKOUT_URL} className="btn-pill w-full">
                Garantir meu acesso
              </a>
              <p className="mt-5 text-xs text-chumbo-claro">
                Garantia de 7 dias — se não for para você, devolvemos 100% do
                valor. Pagamento processado com segurança pela Kiwify.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-24">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <span className="tag-pill mb-4 w-fit mx-auto">FAQ</span>
          <h2 className="font-serif text-2xl text-chumbo md:text-3xl">
            Perguntas frequentes
          </h2>
        </div>
        <div className="mx-auto max-w-2xl">
          {FAQ.map((f) => (
            <details
              key={f.pergunta}
              className="group border-b border-black/10 py-4 [&::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-chumbo">
                {f.pergunta}
                <span className="flex-shrink-0 text-salvia-escuro transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-chumbo-claro">{f.resposta}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mt-24">
        <div className="mx-auto mb-8 max-w-xl text-center">
          <h2 className="mb-3 font-serif text-2xl text-chumbo md:text-3xl">
            Hoje é mais fácil começar do que daqui a 6 meses
          </h2>
          <p className="text-chumbo-claro">
            Enquanto você decide, sua rotina continua do mesmo jeito. O
            método fica pronto assim que você garantir o acesso.
          </p>
        </div>
        <PromoBanner
          cta={{
            badge: "Fit Lucrativo",
            titulo: "Pronta para organizar suas marmitas de vez?",
            subtitulo: "Acesso vitalício por R$ 27,00, com garantia de 7 dias.",
            botao: "Garantir meu acesso",
            link: CHECKOUT_URL,
          }}
        />
      </section>
    </div>
  );
}
