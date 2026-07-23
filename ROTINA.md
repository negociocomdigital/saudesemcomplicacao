# Rotina de geração de artigos

Este blog não usa banco de dados nem planilha. Cada artigo é um arquivo `.mdx`
dentro de `content/articles/`. O repositório vive em
https://github.com/negociocomdigital/saudesemcomplicacao e a Vercel publica
automaticamente a cada push na branch `main`.

A rotina roda **automaticamente todos os dias** via um agente de nuvem
agendado (Claude Code Routine). Este documento também serve como referência
caso alguém queira rodar um lote manualmente.

## Padrão de escrita

Todo artigo segue as regras de `PADRAO-ESCRITA.md` (resposta direta no
primeiro parágrafo, H2 organizados por sub-perguntas reais, sem enrolação,
detalhe concreto obrigatório). Leia esse arquivo antes de escrever qualquer
artigo novo.

## Antes de gerar: checar duplicidade

```bash
node scripts/checar-duplicados.mjs
```

Lista todos os títulos, slugs e a distribuição por categoria já publicados.
Sempre rodar antes de escrever um novo lote — nenhum título, slug ou ângulo
pode se repetir.

## Validação obrigatória de imagem (não pular)

```bash
node scripts/validar-imagens.mjs
```

Testa a URL `imagem_capa` de cada artigo (HTTP 200 + `content-type: image/*`)
**e também reprova prompts com temas que a IA de imagem costuma distorcer**
(telas de celular/computador, apps, texto na cena — ver seção 6 do
`PADRAO-ESCRITA.md`). **Nenhum artigo pode ser commitado/publicado com o
script retornando falha.** Se algum artigo aparecer com "FALHA", troque a
cena inteira do prompt (não só uma palavra) para algo sem tela/app/texto e
rode o script de novo até 100% OK.

## Prompt para gerar o próximo lote de 10 artigos

> Gere 10 novos artigos de SEO para o blog Saúde Sem Complicação
> (`content/articles/`) no repositório
> https://github.com/negociocomdigital/saudesemcomplicacao.
>
> 1. Rode `node scripts/checar-duplicados.mjs` e leia os `.mdx` existentes
>    para não repetir título, slug ou ângulo.
> 2. Leia `PADRAO-ESCRITA.md` e siga esse padrão de escrita em todos os 10
>    artigos: resposta direta no primeiro parágrafo (sem cenário/introdução
>    antes de responder), H2 organizados por sub-perguntas reais do tema,
>    frases curtas, pelo menos um detalhe concreto por artigo, sem enrolação.
> 3. Regras fixas do blog (não mudam entre lotes):
>    - Categorias a misturar entre os 10 artigos (não repetir a mesma
>      categoria em todos): Marmita Congelada, Marmita Fit, Marmitas em
>      Campinas, Renda Extra com Marmitas.
>    - Palavras-chave base, uma por artigo, de forma natural (sem forçar
>      densidade): "marmita congelada", "marmita fit", "Marmitas em
>      Campinas".
>    - Ângulos a variar: aprender a fazer marmita (passo a passo), como
>      fazer marmita fit em casa, como ganhar dinheiro vendendo marmita.
>    - Misturar etapas de funil (Topo, Meio, Fundo) entre os 10 artigos.
>    - Linguagem simples, sem termos técnicos de nutrição clínica. Nunca
>      citar "nutricionista" ou "consultoria nutricional" — o produto final
>      é um curso (próprio ou afiliado), não atendimento nutricional.
>    - Foco em praticidade, economia de tempo, organização e renda extra.
>    - 600 a 900 palavras por artigo, em Markdown simples (## para h2,
>      parágrafos, listas com `-`).
>    - Terminar cada artigo com um parágrafo de CTA genérico sobre organizar
>      a rotina de marmitas (sem citar nome de curso específico).
>    - Frontmatter seguindo exatamente os campos de `lib/articles.ts`
>      (`ArticleFrontmatter`): titulo, slug, data_publicacao, categoria,
>      palavra_chave, angulo, funil, resumo, imagem_capa.
>    - `imagem_capa`: URL da Pollinations no formato
>      `https://image.pollinations.ai/prompt/{prompt}?width=1024&height=683&nologo=true&model=flux`,
>      com `{prompt}` em inglês, montado especificamente para o tema daquele
>      artigo (nunca um prompt fixo repetido entre artigos). NUNCA descreva
>      telas de celular/computador, apps, ícones, whatsapp/instagram ou texto
>      na cena — a IA distorce isso visivelmente. Prefira comida, potes,
>      embalagens, mãos com comida (não com aparelhos), cozinha, freezer,
>      entrega de sacola.
>    - Slugs em minúsculas, com hífen, sem acento.
> 4. Rode `node scripts/validar-imagens.mjs` — se algum artigo falhar, gere
>    outra URL Pollinations para ele e valide de novo. Não prosseguir com
>    falhas pendentes.
> 5. Rode `node scripts/checar-duplicados.mjs` de novo para confirmar que
>    não há título/slug repetido.
> 6. Faça commit e push para `main`:
>    `git add content/articles && git commit -m "Adiciona 10 novos artigos"
>    && git push origin main`
> 7. Reporte os 10 títulos e categorias criados.

## Rotina automática diária

Configurada como uma **rotina local persistente** ("Artigos Diários"),
criada em `claude.ai/code/routines`, disparando todos os dias às ~12:00 o
prompt acima na íntegra, apontando para a pasta deste projeto. Sobrevive
independente de qualquer conversa aberta — só precisa do computador ligado
e conectado (mesmo padrão já usado no projeto irmão `artigos-ia`).

Publicação: o job faz `git push origin main`, e a Vercel publica sozinha a
cada push — a conexão Vercel↔GitHub já está feita (Project Settings → Git →
Connect Repository → `negociocomdigital/saudesemcomplicacao`).

Gerenciar/pausar/editar a rotina em https://claude.ai/code/routines.
