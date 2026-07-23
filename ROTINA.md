# Rotina de geração de artigos

Este blog não usa banco de dados nem planilha. Cada artigo é um arquivo `.mdx`
dentro de `content/articles/`. Para gerar um novo lote de artigos, use o
Claude Code (este mesmo assistente) com o prompt abaixo — ele lê os artigos
existentes, evita duplicação e escreve os arquivos direto no repositório.

## Antes de gerar: checar duplicidade

```bash
node scripts/checar-duplicados.mjs
```

Isso lista todos os títulos, slugs e a distribuição por categoria já
publicados. Sempre rode antes de pedir um novo lote.

## Prompt para gerar o próximo lote de 8 artigos

Copie e cole no Claude Code, ajustando a data:

> Gere 8 novos artigos de SEO para o blog Saúde Sem Complicação
> (`content/articles/`). Antes de escrever, rode
> `node scripts/checar-duplicados.mjs` e leia os `.mdx` existentes para não
> repetir título, slug ou ângulo.
>
> Regras fixas do blog (não mudam entre lotes):
> - Categorias a misturar (não repetir a mesma categoria nos 8 artigos):
>   Marmita Congelada, Marmita Fit, Marmitas em Campinas, Renda Extra com
>   Marmitas.
> - Palavras-chave base, uma por artigo, de forma natural (sem forçar
>   densidade): "marmita congelada", "marmita fit", "Marmitas em Campinas".
> - Ângulos a variar: aprender a fazer marmita (passo a passo), como fazer
>   marmita fit em casa, como ganhar dinheiro vendendo marmita.
> - Misturar etapas de funil (Topo, Meio, Fundo) entre os 8 artigos.
> - Linguagem simples, sem termos técnicos de nutrição clínica. Nunca citar
>   "nutricionista" ou "consultoria nutricional" — o produto final é um
>   curso (próprio ou afiliado), não atendimento nutricional.
> - Foco em praticidade, economia de tempo, organização e renda extra.
> - 600 a 900 palavras por artigo, em Markdown simples (## para h2,
>   parágrafos, listas com `-`).
> - Terminar cada artigo com um parágrafo de CTA genérico sobre organizar a
>   rotina de marmitas (sem citar nome de curso específico).
> - Frontmatter de cada `.mdx` seguindo exatamente os campos de
>   `lib/articles.ts` (`ArticleFrontmatter`): titulo, slug, data_publicacao,
>   categoria, palavra_chave, angulo, funil, resumo, imagem_capa.
> - `imagem_capa`: URL da Pollinations no formato
>   `https://image.pollinations.ai/prompt/{prompt}?width=1024&height=683&nologo=true&model=flux`,
>   com `{prompt}` em inglês, montado especificamente para o tema daquele
>   artigo (nunca um prompt fixo repetido entre artigos).
> - Slugs em minúsculas, com hífen, sem acento.
>
> Ao final, rode `node scripts/checar-duplicados.mjs` de novo para
> confirmar que não há título/slug repetido, e liste os 8 títulos e
> categorias criados.

## Frequência sugerida

Rode esse prompt sempre que quiser publicar um novo lote (por exemplo,
semanalmente). Não é necessário rodar nenhum script separado de geração —
o próprio Claude Code, seguindo este prompt, cuida da escrita, da
checagem de duplicidade e da criação dos arquivos.
