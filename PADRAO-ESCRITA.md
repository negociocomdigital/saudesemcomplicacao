# Padrão de escrita (SEO + GEO/AEO)

Extraído do material em `treinamento-projeto-claude/` (13 transcrições sobre
SEO, GEO e AEO). Regras que todo artigo do blog Saúde Sem Complicação deve
seguir a partir de agora — geradas por Claude ou por qualquer rotina
automática.

## 1. Abertura: resposta direta primeiro

O primeiro parágrafo (2 a 4 frases) responde diretamente a pergunta implícita
no título/palavra-chave, sem introdução de contexto, sem "cenário do dia a
dia" antes da resposta. Só depois de responder é que o texto pode expandir,
contextualizar ou dar exemplo.

Errado (como os artigos antigos abriam): "Se você já abriu a geladeira no
fim de um dia corrido e não teve energia pra pensar no jantar..."

Certo: "Marmita congelada é preparar as refeições da semana de uma vez,
guardar em potes bem fechados e congelar em porções individuais para
esquentar quando precisar. Feita do jeito certo, ela mantém sabor e textura
por até três meses."

## 2. H1 e H2

- O H1 (título) já carrega a palavra-chave principal — não mudar isso.
- Os H2 são "capítulos", organizados por sub-perguntas reais que quem
  pesquisa aquele tema teria (como fazer, quanto dura, como não errar, quanto
  custa, etc.), não frases de efeito genéricas.
- Cada H2 deve poder ser lido isoladamente e ainda fazer sentido — pensando
  em IA de busca que pode citar só aquele trecho.

## 3. Tom e linguagem

- Direto ao leitor, com "você", conversacional mas sem enrolação.
- Palavra-chave aparece naturalmente no título, no primeiro parágrafo e mais
  1-2 vezes ao longo do texto — nunca forçada ou repetida em sequência.
- Frases curtas. Parágrafos de 2 a 4 frases.

## 4. Fugir do "commodity"

Conteúdo genérico (o que "qualquer IA geraria") não se destaca. Cada artigo
deve ter pelo menos um detalhe específico e concreto — um número, um prazo,
um exemplo prático, uma situação real — em vez de só afirmações vagas tipo
"economize tempo e dinheiro".

## 5. Estrutura pensada para citação por IA

- Frases que respondem sozinhas, sem depender do parágrafo anterior para
  fazer sentido (fácil de "cortar e citar").
- Listas (`-`) para passos, critérios ou exemplos — IA de busca prefere
  extrair listas a parágrafos longos.
- Sem conclusão genérica tipo "resumindo, é isso". Fechar com CTA prática,
  como já definido no `ROTINA.md`.

## 6. Prompt de imagem: evite temas que a IA distorce

Geradores como o Flux (usado pela Pollinations) renderizam mal telas de
celular/computador, ícones de app, texto na cena e mãos manipulando objetos
pequenos como um telefone. Isso produz imagens visivelmente quebradas
(rostos/ícones deformados, texto ilegível).

**Nunca usar no prompt:** phone, smartphone, screen, display, app, whatsapp,
instagram, laptop, computer, tablet, typing, keyboard, chat, message, icon,
logo, interface, website, texto/legenda na cena.

**Prefira sempre:** comida, potes/embalagens, mãos com comida ou embalagens
(não com aparelhos), cenas de cozinha, freezer, prateleiras, entrega de
sacola — fotografia realista simples, sem telas nem texto. Exemplo seguro
para um tema de "divulgação/vendas": "hands packing labeled meal prep
containers into a delivery bag on a kitchen table, warm natural light, food
photography" em vez de "smartphone showing whatsapp chat...".

O `scripts/validar-imagens.mjs` bloqueia automaticamente prompts com essas
palavras de risco — se ele reprovar por isso, troque o tema do prompt (não
adianta só trocar uma palavra, mude a cena inteira para algo sem tela/app).

## 7. Checklist antes de publicar qualquer artigo

1. Primeiro parágrafo responde a pergunta direta, sem rodeio.
2. H2s cobrem sub-perguntas reais do tema, não frases de efeito.
3. Pelo menos um detalhe concreto e específico no corpo do texto.
4. Título, slug e categoria batem com o frontmatter.
5. `imagem_capa` é uma URL Pollinations válida e testada, sem temas de risco
   de distorção (ver item 6 acima e `scripts/validar-imagens.mjs` —
   **obrigatório, nenhum artigo publica sem isso**).
6. 600–900 palavras.
7. Termina com CTA genérica sobre organizar a rotina de marmitas.
