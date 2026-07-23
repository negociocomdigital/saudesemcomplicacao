import type { CtaConteudo } from "@/lib/articles";

export default function PromoBanner({ cta }: { cta: CtaConteudo }) {
  const ButtonTag = cta.link ? "a" : "span";

  return (
    <aside
      aria-label="Chamada para ação"
      className="not-prose relative my-8 w-full overflow-hidden rounded-xl shadow-lg"
      style={{
        background: "linear-gradient(90deg, #3c4f3f 0%, #23281f 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-1"
        style={{
          background: "linear-gradient(#c9dcc4 0%, #8fa98a 50%, #6f8a6a 100%)",
          boxShadow: "0 0 12px rgba(143, 169, 138, 0.6)",
        }}
      />
      <div className="relative flex flex-col items-center gap-6 p-6 text-center md:flex-row md:gap-8 md:p-8 md:text-left">
        <div
          className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c9dcc4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
            style={{ color: "#c9dcc4", backgroundColor: "rgba(143,169,138,0.16)" }}
          >
            {cta.badge}
          </span>
          <h3
            className="mb-2 font-serif leading-tight text-white"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
          >
            {cta.titulo}
          </h3>
          <p className="mb-5 text-sm md:text-base" style={{ color: "#d1d5db" }}>
            {cta.subtitulo}
          </p>
          <ButtonTag
            {...(cta.link
              ? { href: cta.link, target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex select-none items-center gap-2 rounded-pill px-5 py-3 text-sm font-bold text-[#1f2419] transition-colors hover:brightness-110 md:text-base"
            style={{ backgroundColor: "#8fa98a" }}
          >
            {cta.botao}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </ButtonTag>
        </div>
      </div>
    </aside>
  );
}
