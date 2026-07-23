export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-white/60">
      <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-chumbo-claro">
        <p className="font-serif text-base text-chumbo">
          Saúde Sem Complicação
        </p>
        <p className="mt-2">
          Conteúdo prático sobre marmitas para o dia a dia: economia de tempo,
          organização e renda extra.
        </p>
        <p className="mt-4">
          © {new Date().getFullYear()} Saúde Sem Complicação. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}
