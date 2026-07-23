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
celular/computador, ícones de app, texto na cena e **qualquer ser humano**
(mãos com dedos errados, rostos deformados). Isso produz imagens
visivelmente quebradas.

**Regra número 1: nenhuma foto do blog pode ter ser humano na cena.** Nada
de mãos, rosto, corpo, "pessoa fazendo X" — nem de longe, nem desfocado.
Todo prompt descreve só objetos e ambientes: comida, potes, embalagens,
cozinha, freezer, prateleiras, sacola de entrega, caderno com anotação, rua,
etc.

**Nunca usar no prompt:** hand(s), finger(s), arm(s), body, face, woman,
man/men, person/people, human, chef, cook/cooking, worker, owner,
entrepreneur, customer, girl, boy — e também phone, smartphone, screen,
display, app, whatsapp, instagram, laptop, computer, tablet, typing,
keyboard, chat, message, icon, logo, interface, website, texto/legenda na
cena.

**Prefira sempre:** só o objeto/cena, sem ninguém manipulando nada. Exemplo
seguro para um tema de "divulgação/vendas": "neatly packed meal prep
containers ready for delivery inside an open paper bag on a wooden table,
warm natural light, food photography" — sem "hands", sem "person", sem
"woman".

O `scripts/validar-imagens.mjs` bloqueia automaticamente prompts com essas
palavras de risco (tela/app **ou humano**) — se ele reprovar, troque a cena
inteira do prompt (não adianta só trocar uma palavra).

**Cuidado extra:** verbo de ação em andamento (ex.: "container being
portioned and sealed", "meals being packed") faz a IA desenhar uma pessoa
fazendo aquilo — mesmo sem a palavra "hand"/"person" no prompt — e o
resultado sai com braço/mão deformado ao fundo. O validador não pega esse
caso automaticamente. Prefira descrever o **estado pronto/parado** do
objeto (sealed, labeled, lined up, stacked, ready to freeze) em vez da ação
sendo feita (being sealed, being packed, portioning).

## 7. Geolocalização (Campinas) em todo artigo

O material de treinamento (arquivos 04, 06, 11, 12, 13) mostra que ranquear
bem no Google e ser citado por IA depende muito de sinal geográfico —
sites que rankeiam associam o serviço a uma cidade/região específica, e
depois expandem para cidades vizinhas. Isso vale mesmo para palavras-chave
nacionais como "marmita fit" ou "marmita congelada".

**Regra: todo artigo, de qualquer categoria, precisa ter pelo menos uma
seção com sinal geográfico** — não só os da categoria "Marmitas em
Campinas". Para os artigos com palavra-chave nacional (marmita congelada,
marmita fit, renda extra), adicione um H2 curto do tipo "Isso muda se eu
morar em Campinas?" ou "Isso funciona em Campinas também?", respondendo em
2-4 frases e citando a cidade e, quando fizer sentido, um bairro (Cambuí,
Taquaral, Barão Geraldo, Vila Industrial, região central).

Não force a palavra-chave principal a virar "algo em Campinas" — o
ângulo geográfico é um H2 adicional, não o tema central do artigo (isso já
é papel da categoria "Marmitas em Campinas").

## 8. Checklist antes de publicar qualquer artigo

1. Primeiro parágrafo responde a pergunta direta, sem rodeio.
2. H2s cobrem sub-perguntas reais do tema, não frases de efeito.
3. Pelo menos um detalhe concreto e específico no corpo do texto.
4. Pelo menos uma seção com sinal geográfico (Campinas/bairro) — ver item 7.
5. Título, slug e categoria batem com o frontmatter.
6. `imagem_capa` é uma URL Pollinations válida e testada, sem temas de risco
   de distorção (ver item 6 acima e `scripts/validar-imagens.mjs` —
   **obrigatório, nenhum artigo publica sem isso**).
7. 600–900 palavras.
8. Termina com CTA genérica sobre organizar a rotina de marmitas.
