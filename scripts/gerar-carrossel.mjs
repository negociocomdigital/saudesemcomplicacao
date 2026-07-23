// Gera um carrossel de imagens (Instagram, 1080x1350) para um artigo do blog,
// reaproveitando a imagem de capa e a identidade visual do site (bege,
// verde-sálvia, serifada Playfair Display, pílulas).
//
// Uso:
//   node scripts/gerar-carrossel.mjs <slug>
//   node scripts/gerar-carrossel.mjs --all
//
// Saída: public/carrossel/<slug>/slide-1.jpg, slide-2.jpg, ...
// (fica publicamente acessível em https://saudesemcomplicacao.com.br/carrossel/<slug>/slide-N.jpg
// depois do deploy — necessário para o auto-post futuro via API do Instagram,
// que exige uma URL pública para cada imagem do carrossel.)

import fs from "fs";
import path from "path";
import satoriPkg from "satori";
import { Resvg } from "@resvg/resvg-js";
import matter from "gray-matter";
import sharp from "sharp";

const satori = satoriPkg.default || satoriPkg;

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const OUTPUT_DIR = path.join(process.cwd(), "public", "carrossel");
const WIDTH = 1080;
const HEIGHT = 1350;
const MAX_CONTENT_SLIDES = 6;

// Paleta e tipografia do site (ver app/globals.css, tailwind.config.js)
const CORES = {
  bege: "#FAF6EF",
  salvia: "#8FA98A",
  salviaEscuro: "#728A6E",
  chumbo: "#3E3E3C",
  chumboClaro: "#6B6B68",
  ctaGradInicio: "#3c4f3f",
  ctaGradFim: "#23281f",
};

function carregarFonte(pkg, arquivo) {
  return fs.readFileSync(
    path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", arquivo)
  );
}

const FONTS = [
  {
    name: "Playfair",
    data: carregarFonte("playfair-display", "playfair-display-latin-700-normal.woff"),
    weight: 700,
    style: "normal",
  },
  {
    name: "Playfair",
    data: carregarFonte("playfair-display", "playfair-display-latin-600-normal.woff"),
    weight: 600,
    style: "normal",
  },
  {
    name: "Inter",
    data: carregarFonte("inter", "inter-latin-400-normal.woff"),
    weight: 400,
    style: "normal",
  },
  {
    name: "Inter",
    data: carregarFonte("inter", "inter-latin-600-normal.woff"),
    weight: 600,
    style: "normal",
  },
  {
    name: "Inter",
    data: carregarFonte("inter", "inter-latin-700-normal.woff"),
    weight: 700,
    style: "normal",
  },
];

function limparMarkdown(texto) {
  return texto
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^- /gm, "")
    .replace(/\n+/g, " ")
    .trim();
}

function truncar(texto, max) {
  if (texto.length <= max) return texto;
  return texto.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function parseSecoes(content) {
  const partes = content.trim().split(/\n(?=## )/);
  const secoes = [];
  for (const parte of partes) {
    const m = parte.match(/^## (.+)\n([\s\S]*)/);
    if (!m) continue;
    secoes.push({
      titulo: m[1].trim(),
      corpo: truncar(limparMarkdown(m[2]), 260),
    });
  }
  return secoes;
}

async function baixarImagemBase64(url) {
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";
  return `data:${contentType};base64,${buf.toString("base64")}`;
}

function pillBadge(texto, { bg, color }) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignSelf: "flex-start",
        backgroundColor: bg,
        color,
        fontFamily: "Inter",
        fontWeight: 700,
        fontSize: 26,
        letterSpacing: 1,
        textTransform: "uppercase",
        padding: "12px 28px",
        borderRadius: 999,
      },
      children: texto,
    },
  };
}

function slideCapa({ imagemBase64, categoria, titulo }) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        position: "relative",
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: CORES.chumbo,
      },
      children: [
        {
          type: "img",
          props: {
            src: imagemBase64,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: WIDTH,
              height: HEIGHT,
              objectFit: "cover",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: HEIGHT * 0.58,
              background:
                "linear-gradient(to top, rgba(20,22,18,0.92) 10%, rgba(20,22,18,0.55) 60%, rgba(20,22,18,0) 100%)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", position: "absolute", top: 64, left: 64 },
            children: pillBadge(categoria, {
              bg: "rgba(250,246,239,0.92)",
              color: CORES.salviaEscuro,
            }),
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: 64,
              right: 64,
              bottom: 72,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: "#FFFFFF",
                    fontFamily: "Playfair",
                    fontWeight: 700,
                    fontSize: 66,
                    lineHeight: 1.15,
                  },
                  children: titulo,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    marginTop: 28,
                    color: CORES.salvia,
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: 28,
                  },
                  children: "Saúde Sem Complicação",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

function slideConteudo({ categoria, secaoTitulo, secaoCorpo, pagina, totalPaginas }) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        position: "relative",
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: CORES.bege,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 14,
              background: `linear-gradient(${CORES.salvia}, ${CORES.salviaEscuro})`,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: 100,
              left: 90,
              right: 90,
              bottom: 110,
            },
            children: [
              pillBadge(categoria, {
                bg: "rgba(143,169,138,0.14)",
                color: CORES.salviaEscuro,
              }),
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    marginTop: 48,
                    color: CORES.chumbo,
                    fontFamily: "Playfair",
                    fontWeight: 700,
                    fontSize: 58,
                    lineHeight: 1.2,
                  },
                  children: secaoTitulo,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    marginTop: 40,
                    color: CORES.chumbo,
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: 36,
                    lineHeight: 1.5,
                  },
                  children: secaoCorpo,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              position: "absolute",
              left: 90,
              bottom: 56,
              color: CORES.chumboClaro,
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 26,
            },
            children: "Saúde Sem Complicação",
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              position: "absolute",
              right: 90,
              bottom: 56,
              color: CORES.chumboClaro,
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 26,
            },
            children: `${pagina}/${totalPaginas}`,
          },
        },
      ],
    },
  };
}

function slideCta({ badge, titulo, subtitulo, botao }) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        position: "relative",
        width: WIDTH,
        height: HEIGHT,
        background: `linear-gradient(160deg, ${CORES.ctaGradInicio} 0%, ${CORES.ctaGradFim} 100%)`,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 14,
              background: "linear-gradient(#c9dcc4, #8fa98a 50%, #6f8a6a)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: 90,
              right: 90,
              top: HEIGHT * 0.32,
            },
            children: [
              pillBadge(badge, {
                bg: "rgba(143,169,138,0.18)",
                color: "#c9dcc4",
              }),
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    marginTop: 44,
                    color: "#FFFFFF",
                    fontFamily: "Playfair",
                    fontWeight: 700,
                    fontSize: 60,
                    lineHeight: 1.2,
                  },
                  children: titulo,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    marginTop: 32,
                    color: "#d1d5db",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: 34,
                    lineHeight: 1.5,
                  },
                  children: subtitulo,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    marginTop: 56,
                    alignSelf: "flex-start",
                    backgroundColor: CORES.salvia,
                    color: "#1f2419",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: 32,
                    padding: "22px 44px",
                    borderRadius: 999,
                  },
                  children: `${botao} >`,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    marginTop: 32,
                    color: "#8fa98a",
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: 30,
                  },
                  children: "Link na bio",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function renderizarSlide(elemento) {
  const svg = await satori(elemento, { width: WIDTH, height: HEIGHT, fonts: FONTS });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } });
  const png = resvg.render().asPng();
  // JPEG fica muito mais leve que PNG para slides com foto, e o Instagram
  // aceita JPEG normalmente — importante para não inflar o repositório.
  return sharp(png).flatten({ background: CORES.bege }).jpeg({ quality: 86 }).toBuffer();
}

// Tom do CTA por categoria — mesma lógica do banner do site (lib/articles.ts)
const CTA_POR_CATEGORIA = {
  "Marmita Congelada": {
    titulo: "Cansado de perder tempo decidindo o que comer todo dia?",
    subtitulo: "O Fit Lucrativo te mostra como ganhar esse tempo de volta.",
    botao: "Quero ganhar tempo",
  },
  "Marmita Fit": {
    titulo: "Quer uma vida mais leve, sem virar refém da cozinha?",
    subtitulo: "Veja como o Fit Lucrativo simplifica sua rotina fit de vez.",
    botao: "Quero uma rotina mais leve",
  },
  "Marmitas em Campinas": {
    titulo: "Quer ganhar tempo de volta com as marmitas da sua semana?",
    subtitulo: "O Fit Lucrativo mostra o caminho mais simples pra isso.",
    botao: "Quero ganhar tempo",
  },
  "Renda Extra com Marmitas": {
    titulo: "Cansado de bater o mês no zero a zero?",
    subtitulo: "Comece a lucrar vendendo marmita fit com o Fit Lucrativo.",
    botao: "Quero lucrar com marmita fit",
  },
};

async function gerarCarrosselDoArtigo(slug) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    console.log(`FALHA ${slug} — arquivo não encontrado`);
    return false;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const secoes = parseSecoes(content).slice(0, MAX_CONTENT_SLIDES);
  const cta = CTA_POR_CATEGORIA[data.categoria] || CTA_POR_CATEGORIA["Marmita Congelada"];

  const outDir = path.join(OUTPUT_DIR, slug);
  fs.mkdirSync(outDir, { recursive: true });

  const imagemBase64 = await baixarImagemBase64(data.imagem_capa);

  const slides = [];
  slides.push(slideCapa({ imagemBase64, categoria: data.categoria, titulo: data.titulo }));
  secoes.forEach((s, i) => {
    slides.push(
      slideConteudo({
        categoria: data.categoria,
        secaoTitulo: s.titulo,
        secaoCorpo: s.corpo,
        pagina: i + 2,
        totalPaginas: secoes.length + 2,
      })
    );
  });
  slides.push(
    slideCta({
      badge: data.cta_badge || "Fit Lucrativo",
      titulo: data.cta_titulo || cta.titulo,
      subtitulo: data.cta_subtitulo || cta.subtitulo,
      botao: data.cta_botao || cta.botao,
    })
  );

  for (let i = 0; i < slides.length; i++) {
    const jpg = await renderizarSlide(slides[i]);
    fs.writeFileSync(path.join(outDir, `slide-${i + 1}.jpg`), jpg);
  }

  console.log(`OK ${slug} — ${slides.length} slides em public/carrossel/${slug}/`);
  return true;
}

const args = process.argv.slice(2);

if (args[0] === "--all") {
  const slugs = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
  const resultados = [];
  for (const slug of slugs) {
    resultados.push(await gerarCarrosselDoArtigo(slug));
  }
  const ok = resultados.filter(Boolean).length;
  console.log(`\n${ok}/${slugs.length} carrosséis gerados.`);
} else if (args[0]) {
  try {
    await gerarCarrosselDoArtigo(args[0]);
  } catch (err) {
    console.error("ERRO:", err.message);
    process.exit(1);
  }
} else {
  console.log("Uso: node scripts/gerar-carrossel.mjs <slug>  ou  --all");
  process.exit(1);
}
