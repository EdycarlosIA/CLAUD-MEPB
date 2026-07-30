# Arquitetura da Informação — Portal MEPB

> Documento de fundamentação do redesenho. Escrito **antes** do código e usado como
> contrato entre design, front-end e o futuro CMS.

---

## 1. Diagnóstico do portal atual (mepb.org.br)

O domínio `www.mepb.org.br` está atrás de proteção anti-bot (responde `403` a
requisições automatizadas), portanto a análise foi reconstruída a partir do índice
de busca pública, que expõe a estrutura de URLs real do site:

| URL indexada | Observação |
| --- | --- |
| `/` | Home |
| `/quem-somos` | Hub institucional |
| `/quem-somos/história` | Acentos e maiúsculas na URL |
| `/quem-somos/história/cronologia` | Terceiro nível |
| `/quem-somos/história/especial-80-anos` | Conteúdo comemorativo |
| `/quem-somos/nossa-missão` | — |
| `/quem-somos/nossa-missão/atuação` | Quarto nível de profundidade |
| `/quem-somos/nosso-credo` | Declaração de fé |
| `/quem-somos/presidentes` | Galeria de lideranças |
| `/contatos` | — |
| `/contatos/visite-nos` | — |

### Problemas identificados

1. **Arquitetura rasa em conteúdo, profunda em cliques.** Praticamente todo o site
   vive dentro de `/quem-somos`, com até quatro níveis de aninhamento. Uma
   denominação presente em 21 estados não tem, no site, uma forma de encontrar uma igreja.
2. **URLs com acentuação e maiúsculas** (`/história`, `/nossa-missão`, `/atuação`).
   Quebram ao serem compartilhadas em WhatsApp, prejudicam SEO e são frágeis em
   redirecionamentos.
3. **Ausência das funções de maior demanda real.** Não há localizador de igrejas,
   agenda nacional, área de mídia, biblioteca de documentos oficiais nem canal de
   pedido de oração — justamente o que membro e visitante procuram.
4. **Sem camada administrativa.** Todo conteúdo depende de edição manual na
   plataforma de site, o que trava a atualização descentralizada por estado/departamento.
5. **Site institucional voltado para dentro.** A comunicação fala ao já-membro. Falta
   a porta de entrada do visitante ("sou novo", "quero conhecer", "quero uma visita").

### O que preservamos

O acervo histórico é o maior ativo da MEPB e deve ser **promovido**, não diluído:
fundação em 1939 em Manaus pelo casal missionário Harland e Hazel Graham, primeiro
culto oficial em Natal/RN, estatuto e organização em 1965, primeira Convenção
Nacional em 1966, sede nacional em Natal/RN, presença em 21 estados, 16 capitais e
mais de 130 municípios, seminários teológicos em Fortaleza/CE e Natal/RN, e o
trabalho ribeirinho no Rio Negro com o barco *Missionária Ethel Matson*.

---

## 2. Público-alvo e tarefas primárias

A IA foi desenhada a partir de **quatro perfis** e da tarefa que cada um tenta cumprir.

| Perfil | Tarefa dominante | Rota mais curta desenhada |
| --- | --- | --- |
| **Visitante / não-membro** | "Onde tem uma igreja perto de mim?" | Hero → *Encontre uma Igreja* → ficha da igreja (2 cliques) |
| **Membro** | Agenda, notícias, mensagens, documentos | Navbar → Agenda / TV / Biblioteca (1 clique) |
| **Liderança (pastor, dirigente de departamento)** | Estatuto, regimento, manuais, logos, formulários | Navbar → Biblioteca (1 clique) |
| **Imprensa / parceiro / doador** | Quem é a MEPB, onde atua, como apoiar | Navbar → Sobre / Missões (1 clique) |

**Princípio-guia:** nenhuma tarefa primária pode exigir mais de **dois cliques** a partir da home.

---

## 3. Sitemap completo

```
/                                        Home
│
├── /sobre                               Sobre a MEPB (hub)
│   ├── /sobre/historia                  História + linha do tempo + acervo
│   ├── /sobre/missao-visao-valores      Missão, Visão, Valores, Atuação
│   ├── /sobre/nossa-fe                  Declaração de fé (o "credo")
│   └── /sobre/lideranca                 Supremo Concílio + galeria de presidentes
│
├── /igrejas                             Localizador de Igrejas  ★ função-âncora
│   └── /igrejas/[slug]                  Ficha individual da igreja
│
├── /missoes                             Missões (mapa mundial, campos, projetos)
│   └── /missoes/[slug]                  Perfil do missionário / projeto
│
├── /noticias                            Notícias (busca, categorias, filtros)
│   └── /noticias/[slug]                 Matéria
│
├── /agenda                              Agenda Nacional (calendário + lista)
│   └── /agenda/[slug]                   Página do evento + inscrição
│
├── /departamentos                       Departamentos (hub)
│   └── /departamentos/[slug]            Página própria de cada departamento
│         homens · mulheres · jovens · adolescentes · criancas
│         louvor · missoes · educacao · evangelismo
│
├── /biblioteca                          Biblioteca de documentos e materiais oficiais
│
├── /tv                                  TV MEPB (hub de mídia)
│   └── /tv/[slug]                       Player de mensagem / série / podcast
│
├── /galeria                             Galeria de fotos e vídeos
│
├── — Área do Visitante —
│   ├── /conheca-jesus                   Página de apresentação do Evangelho
│   ├── /participe                       Quero ser membro · servir · pedir visita
│   ├── /oracao                          Pedido de oração
│   ├── /contato                         Contato + sede nacional
│   └── /faq                             Perguntas frequentes
│
├── — Institucional / legal —
│   ├── /privacidade                     Política de Privacidade
│   ├── /lgpd                            Portal LGPD / titular de dados
│   └── /mapa-do-site                    Mapa do site (acessibilidade + SEO)
│
└── — Área Administrativa —
    ├── /admin/login                     Autenticação
    ├── /admin                           Dashboard (indicadores + gráficos)
    ├── /admin/igrejas                   CRUD de igrejas
    ├── /admin/pastores                  CRUD de pastores
    ├── /admin/eventos                   CRUD de eventos
    ├── /admin/noticias                  CRUD de notícias
    ├── /admin/missionarios              CRUD de missionários
    ├── /admin/midia                     Biblioteca de mídia / uploads
    └── /admin/permissoes                Usuários, papéis e permissões
```

**Todas as URLs em minúsculas, sem acento, sem stop-words** — corrigindo o problema nº 2 do diagnóstico.

---

## 4. Arquitetura da navegação

### Navbar (7 itens + 1 CTA)

O limite de sete itens é deliberado: reduz fadiga de decisão e cabe em uma linha
sem quebra em telas de 1280px.

```
[logo MEPB]   Sobre ▾   Igrejas   Missões   Notícias   Agenda   Departamentos ▾   Mídia ▾      [Encontre uma Igreja]
```

- **Sobre ▾** → História · Missão, Visão e Valores · Nossa Fé · Liderança
- **Departamentos ▾** → mega-menu em 3 colunas com os 9 departamentos
- **Mídia ▾** → TV MEPB · Galeria · Biblioteca
- **Igrejas, Missões, Notícias, Agenda** → link direto, sem submenu
- CTA persistente **"Encontre uma Igreja"** — a tarefa nº 1 do visitante nunca sai da tela

Comportamento: transparente sobre o hero, sólida com sombra sutil após ~24px de
rolagem. Em mobile, vira drawer lateral com acordeões e o CTA fixo no rodapé do drawer.

### Rodapé (4 colunas + faixa legal)

Institucional · Comunidade · Recursos · Sede Nacional & Redes → faixa com
Política de Privacidade, LGPD, Mapa do Site e crédito.

---

## 5. Wireframes

### 5.1 Home

```
┌──────────────────────────────────────────────────────────────┐
│ navbar transparente sobre a imagem                           │
│                                                              │
│      HERO (85vh)  imagem institucional + véu azul-marinho    │
│      ┌ tocha em marca d'água, canto direito, 6% opacidade    │
│      "Desde 1939, levando o Evangelho..."   ← h1 serifado    │
│      "Ide por todo o mundo..."  Marcos 16.15  ← versículo    │
│      [ Conheça a MEPB ]   [ Encontre uma Igreja ]            │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FAIXA DE NÚMEROS  — 21 estados · 16 capitais · 130+ municípios│
│                     4 continentes · 85+ anos                 │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ QUEM SOMOS   [texto 6col]              [mapa do Brasil 6col] │
│              histórico curto + link     SVG, estados ativos   │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ ACESSO RÁPIDO — 4 cards ícone+título+linha                   │
│ [Encontre uma Igreja] [Agenda] [TV MEPB] [Biblioteca]        │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ NOTÍCIAS — 1 destaque grande (7col) + 3 secundárias (5col)   │
│                                            [Todas as notícias]│
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ AGENDA — 3 cards de evento com data em bloco lateral         │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ MISSÕES — fundo azul-marinho, mapa-múndi pontilhado          │
│ países alcançados + CTA "Conheça o campo missionário"        │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ DEPARTAMENTOS — grade 3x3 de cards discretos                 │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ PALAVRA / CONVITE — bloco claro: "Conheça Jesus" + oração    │
└──────────────────────────────────────────────────────────────┘
│ RODAPÉ                                                       │
```

### 5.2 Localizador de Igrejas — a página mais importante do portal

Desenhada **mobile-first**: é a página que mais será aberta no celular, muitas vezes
na rua, procurando um culto no mesmo dia.

```
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌──────────────┐
│ Cabeçalho curto + busca           │    │ busca (full) │
│ ┌───────────────────────────────┐ │    ├──────────────┤
│ │ 🔍 nome, cidade ou bairro     │ │    │ [Estado ▾]   │
│ └───────────────────────────────┘ │    │ [Cidade ▾]   │
│ [Estado ▾] [Cidade ▾] [limpar]    │    ├──────────────┤
├─────────────────┬─────────────────┤    │  n resultados│
│ MAPA DO BRASIL  │ n resultados    │    │ ┌──────────┐ │
│ SVG interativo  │ ┌─────────────┐ │    │ │ card     │ │
│ estados com     │ │ card igreja │ │    │ ├──────────┤ │
│ igreja em azul; │ │ nome        │ │    │ │ card     │ │
│ clique filtra   │ │ endereço    │ │    │ └──────────┘ │
│                 │ │ horários    │ │    │              │
│                 │ │ [Ver ficha] │ │    │  (mapa vai   │
│                 │ └─────────────┘ │    │   abaixo)    │
└─────────────────┴─────────────────┘    └──────────────┘
```

Regras de UX: filtros refletidos na URL (`?uf=RN&cidade=Natal`) para permitir
compartilhamento; estado vazio com texto útil e ação de limpar filtros; contagem
de resultados anunciada em `aria-live` para leitores de tela.

### 5.3 Ficha da Igreja

```
┌──────────────────────────────────────────────────┐
│ breadcrumb: Início › Igrejas › Natal/RN › Nome   │
│ H1 nome da igreja                    [selo: sede]│
│ cidade/UF · bairro                               │
├────────────────────────────┬─────────────────────┤
│ galeria de fotos           │ CARD FIXO (sticky)  │
│                            │ ┌─────────────────┐ │
│ Pastor titular             │ │ Horários        │ │
│ ┌──┐ nome                  │ │ Dom 09h · 18h   │ │
│ │ph│ desde 20XX            │ │ Qua 19h30       │ │
│ └──┘                       │ ├─────────────────┤ │
│                            │ │ [Como chegar]   │ │
│ Sobre a igreja             │ │ [WhatsApp]      │ │
│ Departamentos ativos       │ │ [Instagram]     │ │
│ Endereço + mapa embed      │ │ [Telefone]      │ │
└────────────────────────────┴─────────────────────┘
```

O card de ações é `sticky` no desktop e vira barra fixa inferior no mobile — o botão
"Como chegar" fica sempre ao alcance do polegar.

### 5.4 Notícias, Agenda, Departamentos, TV, Biblioteca

Compartilham um **padrão único de página-índice**, o que reduz custo cognitivo e
custo de manutenção:

```
┌──────────────────────────────────────────────────┐
│ PageHero compacto (título + subtítulo + trilha)  │
│  ↳ tocha em marca d'água à direita, 5% opacidade │
├──────────────────────────────────────────────────┤
│ barra de filtros: busca + chips de categoria     │
├──────────────────────────────────────────────────┤
│ [destaque opcional em largura total]             │
│ grade responsiva 1 / 2 / 3 colunas               │
│ estado vazio tratado                             │
└──────────────────────────────────────────────────┘
```

### 5.5 Área Administrativa

Layout distinto do site público — sinaliza "você está em outro contexto":

```
┌────────────┬─────────────────────────────────────┐
│ SIDEBAR    │ topbar: busca · notificações · user │
│ (240px)    ├─────────────────────────────────────┤
│ Dashboard  │ 4 KPI cards                         │
│ Igrejas    │ ┌──────────────┬──────────────────┐ │
│ Pastores   │ │ gráfico de   │ igrejas por      │ │
│ Eventos    │ │ crescimento  │ região (barras)  │ │
│ Notícias   │ └──────────────┴──────────────────┘ │
│ Missionár. │ tabela: últimos cadastros           │
│ Mídia      │ [+ Novo]  [filtros]  [exportar]     │
│ Permissões │                                     │
└────────────┴─────────────────────────────────────┘
```

Gráficos desenhados em **SVG puro** (sem biblioteca) para manter o bundle leve.

---

## 6. Estratégia de UX

### 6.1 Hierarquia de intenção na home

A home responde, nesta ordem: **quem somos** → **onde estamos** → **o que está
acontecendo** → **como participar**. Cada seção tem um único CTA. Não há carrossel
automático — ele prejudica acessibilidade, esconde conteúdo e derruba a performance.

### 6.2 Reverência aplicada ao design, não como decoração

- **Versículos** aparecem em pontos de respiro, em serifa, com atribuição discreta —
  nunca como banner comercial.
- **Espaço em branco generoso** (seções com 96–128px de respiro vertical) comunica
  sobriedade melhor do que qualquer ornamento.
- **Uma única assinatura visual:** a tocha estilizada, usada como marca d'água a 5–8%
  de opacidade em heros e seções de destaque. A logo completa aparece só na navbar,
  no rodapé e na página Sobre. Nada de repetir o símbolo em cada seção.
- **Vermelho institucional é acento, não base.** Usado em CTAs primários, no
  indicador de link ativo e em fios de 3px sob títulos de seção — nunca em grandes
  áreas chapadas, o que empurraria o visual para o comercial.

### 6.3 Acessibilidade (WCAG 2.2 AA) — verificada, não presumida

| Requisito | Como foi atendido |
| --- | --- |
| Contraste ≥ 4.5:1 | Paleta ajustada; ver tabela de contraste em `docs/02-design-system.md` |
| Alvo de toque ≥ 44×44px | Altura mínima aplicada a todo botão, link de navbar e controle de filtro |
| Navegação por teclado | Foco visível com anel de 2px + offset; skip-link para o conteúdo; drawer e menus com Esc e trap de foco |
| `prefers-reduced-motion` | Todas as animações são suprimidas via media query global |
| Formulários | Label sempre visível (nunca só placeholder), erro adjacente ao campo, `aria-describedby`, `aria-invalid` |
| Estrutura semântica | Um `h1` por página, hierarquia sem saltos, landmarks `header/nav/main/footer` |
| Conteúdo dinâmico | Contagem de resultados do localizador em `aria-live="polite"` |

### 6.4 Mobile-first

Breakpoints: `base` (≤639px) → `sm` 640 → `md` 768 → `lg` 1024 → `xl` 1280.
O layout de cada página foi definido primeiro na coluna única de 360px. O
localizador de igrejas, o card de ações da ficha e a agenda foram desenhados
assumindo uso com uma mão.

### 6.5 Performance e SEO

- Componentes de servidor por padrão; `"use client"` apenas onde há interação real
  (navbar, filtros, acordeões, abas, formulários).
- Zero biblioteca de gráficos, zero biblioteca de mapas — SVG autoral.
- Fontes via `next/font` com `display: swap` e subset latino.
- Metadados por rota, Open Graph, `sitemap.ts` e `robots.ts` gerados.
- JSON-LD: `Organization` no layout raiz, `Church` nas fichas de igreja, `Event`
  nos eventos, `NewsArticle` nas matérias.

---

## 7. Da IA para o CMS

Cada nó dinâmico do sitemap corresponde a uma *collection* do Strapi, e cada card do
protótipo consome exatamente os campos que a collection define. O mapeamento está em
[`docs/03-modelo-de-conteudo.md`](./03-modelo-de-conteudo.md). Os dados fictícios em
`src/content/` já seguem esse formato — trocar o protótipo pelo CMS real significa
substituir a origem dos dados, não reescrever as páginas.
