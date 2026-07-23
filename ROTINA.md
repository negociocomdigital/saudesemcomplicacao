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

Testa a URL `imagem_capa` de cada artigo (HTTP 200 + `content-type: image/*`).
**Nenhum artigo pode ser commitado/publicado com o script retornando falha.**
Se algum artigo aparecer com "FALHA", gere uma nova URL Pollinations com
prompt específico para aquele artigo e rode o script de novo até 100% OK.

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
>      artigo (nunca um prompt fixo repetido entre artigos).
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

Configurada como um cron local do Claude Code (`CronCreate`), disparando
todos os dias às 9h07 (horário local) o prompt acima na íntegra. Isso roda
dentro desta mesma sessão/ambiente local — o mesmo padrão já usado no
projeto irmão `artigos-ia`, que também gera conteúdo e publica via script
local em vez de um agente de nuvem.

**Limitações reais desse mecanismo (importante saber):**
- Só dispara enquanto o Claude Code estiver aberto no computador no horário
  agendado. Se o app estiver fechado, o disparo daquele dia é perdido.
- O agendamento expira sozinho depois de 7 dias e precisa ser recriado
  (`CronCreate` de novo com o mesmo prompt).
- É por sessão: se a sessão do Claude Code for encerrada, o agendamento some
  antes mesmo dos 7 dias.

Publicação: o job faz `git push origin main`, e a Vercel publica sozinha a
cada push — **desde que o projeto Vercel esteja conectado ao repositório
GitHub** (Vercel → Project Settings → Git → Connect Repository →
`negociocomdigital/saudesemcomplicacao`). Sem essa conexão, o push acontece
mas o site não atualiza sozinho.

Se quiser automação que sobreviva ao Claude Code fechado ou aos 7 dias, a
alternativa é a Claude Code Routine (agente de nuvem, `claude.ai/code/routines`),
que ficou pendente por falta de conexão da conta GitHub com o claude.ai.
