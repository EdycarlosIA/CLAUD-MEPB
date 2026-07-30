# Portal MEPB — Missão Evangélica Pentecostal do Brasil

Protótipo navegável do novo portal institucional da MEPB: 50 rotas, arquitetura
de design tokens em três camadas, acessibilidade WCAG 2.2 AA e uma área
administrativa completa.

```bash
npm install
npm run dev          # http://localhost:3000
```

Outros comandos:

```bash
npm run build        # build de produção
npm start            # servir o build
npm run typecheck    # verificação de tipos
EXPORT=1 npm run build   # exportação estática em ./out (sem servidor Node)
```

---

## Documentação

Leia nesta ordem — o projeto foi desenhado antes de ser codado.

| Documento | Conteúdo |
| --- | --- |
| [`docs/01-arquitetura-da-informacao.md`](docs/01-arquitetura-da-informacao.md) | Diagnóstico do site atual, públicos, sitemap completo, wireframes e estratégia de UX |
| [`docs/02-design-system.md`](docs/02-design-system.md) | Tokens, paleta com contraste verificado, tipografia, estados e movimento |
| [`docs/03-modelo-de-conteudo.md`](docs/03-modelo-de-conteudo.md) | Mapeamento para as collections do Strapi e passo a passo da migração |

---

## Estrutura

```
src/
├── app/
│   ├── layout.tsx              Fontes, metadados, tema (script anti-piscada), JSON-LD
│   ├── globals.css             ★ Arquitetura de tokens em três camadas
│   ├── (portal)/               Site público — navbar + rodapé
│   │   ├── page.tsx            Home
│   │   ├── sobre/              História · Missão · Nossa Fé · Liderança
│   │   ├── igrejas/            Localizador + ficha individual
│   │   ├── missoes/            Campos, missionários, testemunhos
│   │   ├── noticias/  agenda/  departamentos/  tv/
│   │   ├── biblioteca/  galeria/
│   │   ├── conheca-jesus/  participe/  oracao/  contato/  faq/
│   │   └── privacidade/  lgpd/  mapa-do-site/
│   └── admin/                  Área administrativa — chrome próprio
│       ├── login/              Fora do grupo (painel): sem barra lateral
│       └── (painel)/           Dashboard + 7 telas de gestão
├── components/
│   ├── marca/                  Logo, Tocha (assinatura visual), mapas SVG
│   ├── ui/                     Botão, Card, Selo, Campo, Acordeão, Reveal
│   ├── layout/                 Navbar, Rodapé, PageHero, Trilha
│   ├── cards/                  Um cartão por tipo de conteúdo
│   ├── admin/                  Chrome, gráficos SVG, tabela, CRUD genérico
│   └── …                       Componentes por seção
├── content/                    ★ Dados fictícios tipados = contrato do CMS
└── lib/utils.ts                Datas em pt-BR, busca sem acento, links
```

---

## Decisões técnicas

**Mapa do Brasil em cartograma de blocos, não contorno geográfico.** Os estados
pequenos do Nordeste — onde a MEPB é mais forte — ficam grandes o suficiente
para toque de 44px no celular, cada estado é um `<button>` real navegável por
teclado, e o SVG pesa poucos KB em vez de centenas.

**Sem biblioteca de gráficos e sem biblioteca de mapas.** Para o volume de dados
de um painel institucional, uma dependência de 50 a 150 KB não se justifica. O
SVG autoral herda os tokens de cor e funciona no modo escuro sem configuração.

**Framer Motion só onde o CSS não resolve.** As dezenas de animações de entrada
por página usam CSS + IntersectionObserver. O Framer Motion cobre apenas a
animação de *saída* de submenus e do drawer, que exige manter o elemento montado.

**Componentes de servidor por padrão.** `"use client"` aparece somente onde há
interação real: navbar, filtros, formulários, acordeões e o painel.

**Filtros do localizador refletidos na URL.** `?uf=RN&cidade=Natal` permite
compartilhar um resultado por WhatsApp — o canal real do público.

---

## Acessibilidade

Verificado, não presumido:

- **Contraste ≥ 4.5:1** em todas as combinações de texto — tabela completa em
  `docs/02-design-system.md`. No tema escuro o vermelho institucional é clareado,
  porque `#c8202f` sobre fundo escuro reprova.
- **Alvos de toque ≥ 44×44px** em todo botão, link de navegação e controle.
- **Navegação por teclado** completa: skip-link, foco visível global de 2px,
  `Esc` fecha menus e drawer.
- **Formulários** com label sempre visível, erro adjacente ao campo,
  `aria-describedby` e `aria-invalid`; a validação roda no envio, não a cada
  tecla, e o foco vai para o primeiro campo inválido.
- **`prefers-reduced-motion`** respeitado no CSS e no Framer Motion.
- **Conteúdo dinâmico** anunciado em `aria-live` (contagem de resultados).
- **Sem JavaScript o portal continua legível** — o estado inicial das animações
  de entrada só é aplicado sob `html.js`. Verificado com JS desativado.

---

## SEO

Metadados por rota, Open Graph, `sitemap.xml` e `robots.txt` gerados a partir do
próprio conteúdo, e JSON-LD por tipo de página: `Organization` no layout raiz,
`Church` nas fichas de igreja, `Event` nos eventos, `NewsArticle` nas matérias e
`FAQPage` nas perguntas frequentes. A área administrativa fica fora do índice.

---

## Sobre os dados

O conteúdo em `src/content/` é **fictício**, criado para a demonstração. Os
marcos históricos referenciam fatos divulgados publicamente pela denominação;
nomes de pastores e de presidentes, endereços, telefones e a declaração de fé
precisam ser substituídos pelos registros oficiais antes de qualquer publicação.
Os textos de Política de Privacidade e LGPD são modelos e exigem revisão
jurídica.

As imagens são placeholders SVG gerados em tempo de renderização — não há
nenhum binário no repositório. Ver `ImagemDemo` em `docs/02-design-system.md`.
