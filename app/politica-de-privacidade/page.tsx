import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Saúde Sem Complicação usa cookies e trata dados pessoais, conforme a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 font-serif text-3xl text-chumbo md:text-4xl">
        Política de Privacidade
      </h1>

      <div className="prose-artigo">
        <p>
          Esta política explica, de forma simples, como o Saúde Sem
          Complicação usa cookies e trata dados pessoais de quem visita o
          site, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
        </p>

        <h2>Quais cookies usamos</h2>
        <p>
          Usamos o Google Tag Manager para organizar tags de medição, que
          podem incluir ferramentas de análise de audiência (como o Google
          Analytics). Essas ferramentas usam cookies para entender como as
          páginas são acessadas — por exemplo, quais artigos são mais lidos —
          e nos ajudam a melhorar o conteúdo do blog.
        </p>
        <p>
          Cookies de análise e publicidade só são ativados depois que você
          clica em &quot;Aceitar&quot; no aviso de cookies. Se você clicar em
          &quot;Recusar&quot;, esses cookies permanecem bloqueados.
        </p>

        <h2>Como controlar os cookies</h2>
        <p>
          Além da opção no próprio site, você pode bloquear ou apagar cookies
          a qualquer momento diretamente nas configurações do seu navegador.
        </p>

        <h2>Compartilhamento de dados</h2>
        <p>
          Não vendemos dados pessoais. Os dados de navegação coletados por
          ferramentas de análise podem ser processados por terceiros (como o
          Google), seguindo as políticas de privacidade desses fornecedores.
        </p>

        <h2>Seus direitos</h2>
        <p>
          Conforme a LGPD, você pode solicitar a qualquer momento: acesso aos
          seus dados, correção, exclusão ou informações sobre o
          compartilhamento deles. Para exercer esses direitos, entre em
          contato pelo e-mail{" "}
          <a
            href="mailto:contato@negociocomdigital.com"
            className="text-salvia-escuro underline-offset-4 hover:underline"
          >
            contato@negociocomdigital.com
          </a>
          .
        </p>

        <h2>Atualizações desta política</h2>
        <p>
          Esta política pode ser atualizada periodicamente para refletir
          mudanças no site ou na legislação. A versão mais recente estará
          sempre disponível nesta página.
        </p>
      </div>
    </div>
  );
}
