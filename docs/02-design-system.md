# Design System — Portal MEPB

Referência da linguagem visual. A implementação vive em
[`src/app/globals.css`](../src/app/globals.css).

---

## 1. Arquitetura de tokens em três camadas

```
CAMADA 1 — PRIMITIVA        --mepb-red-600: #c8202f
   ↓  valores brutos. Nunca consumidos diretamente por um componente.

CAMADA 2 — SEMÂNTICA        --sem-primary: var(--mepb-red-600)
   ↓  significado. É a única camada que o tema escuro sobrescreve.

CAMADA 3 — COMPONENTE       --btn-primary-bg: var(--sem-primary)
        amarrada a um componente específico.
```

**Regra de ouro:** se um componente referencia uma primitiva, o modo escuro
quebra — é o sinal de que falta um token semântico.

> Essa regra foi validada na prática: a logomarca inicialmente usava
> `--mepb-navy-900` fixo e ficava azul-escuro sobre o fundo escuro do tema
> noturno. A correção foi trocar por `--sem-fg`, não ajustar a cor.

---

## 2. Paleta

Extraída da logomarca oficial da MEPB.

### Primitivas de marca

| Token | Valor | Papel |
| --- | --- | --- |
| `--mepb-red-600` | `#c8202f` | Vermelho institucional — **acento**, nunca base |
| `--mepb-navy-900` | `#182050` | Azul-marinho institucional — faixas e superfícies escuras |
| `--mepb-blue-600` | `#2e5c99` | Azul médio do nome na logomarca — links e apoio |
| `--mepb-green-300` | `#8fc9a9` | Verde do mapa — **decorativo** |
| `--mepb-green-600` | `#2f7d5a` | Verde legível — mínimo para texto |
| `--mepb-gold-500` | `#c9a227` | Dourado sóbrio — apenas tocha e selos |

### Contraste verificado (WCAG 2.2 AA exige 4.5:1 para texto normal)

| Combinação | Razão | Situação |
| --- | --- | --- |
| `navy-900` sobre branco | **15.4:1** | ✅ AAA |
| `red-600` sobre branco | **5.67:1** | ✅ AA |
| `blue-600` sobre branco | **6.76:1** | ✅ AA |
| `neutral-600` sobre branco (texto secundário) | **6.29:1** | ✅ AA |
| `green-600` sobre branco | **5.0:1** | ✅ AA |
| `green-300` sobre branco | 1.8:1 | ❌ **decorativo apenas** |
| Branco sobre `navy-900` | **15.4:1** | ✅ AAA |
| `fg` sobre `bg` no tema escuro | **15.9:1** | ✅ AAA |

No tema escuro o vermelho é **clareado** para `--mepb-red-400` (`#e4696f`):
`#c8202f` sobre fundo escuro fica abaixo de 4.5:1.

---

## 3. Tipografia

| Papel | Família | Justificativa |
| --- | --- | --- |
| Títulos | **Source Serif 4** | Serifa de leitura com gravidade institucional, sem soar antiquada |
| Texto e interface | **Inter** | Legibilidade em telas pequenas, onde está a maior parte do público |

Escala modular de razão **1.25** (terça maior) sobre base de 16px:

```
xs .75  ·  sm .875  ·  base 1  ·  lg 1.125  ·  xl 1.375
2xl 1.75  ·  3xl 2.125  ·  4xl 2.75  ·  5xl 3.5  ·  6xl 4.25   (rem)
```

- Altura de linha: `1.18` em títulos, `1.65` em texto corrido.
- `text-wrap: balance` em títulos, `pretty` em parágrafos.
- Largura de leitura limitada a `42rem` (~68 caracteres) via `.prose-portal`.
- `font-variant-numeric: tabular-nums` em tudo que tenha `data-numeric` —
  indicadores, horários de culto e tabelas do painel.

---

## 4. Espaço, raio e elevação

- **Grade de 4px.** Respiro vertical de seção: `4rem` no mobile, `6rem` a partir de `md`.
- **Raios:** `sm .375` · `md .625` · `lg .875` · `xl 1.25` rem. Sem pílulas em blocos de conteúdo.
- **Sombras leves.** A profundidade vem do espaço em branco, não da sombra.
  A sombra mais forte usada em superfície clara é `--shadow-lg`, em cartões no hover.

---

## 5. Estados de componente

Todo componente interativo define os quatro estados:

| Estado | Tratamento |
| --- | --- |
| Padrão | Token de componente (`--btn-primary-bg`) |
| Hover | Um degrau na escala (`--btn-primary-bg-hover`) + elevação de sombra |
| Foco | Anel de 2px em `--sem-ring` com offset de 2px — **global**, via `:focus-visible` |
| Desabilitado | `opacity: .5` + `pointer-events: none` |

O anel de foco é definido uma única vez em `globals.css`. Nenhum componente
remove `outline` sem repor um indicador equivalente.

---

## 6. Alvos de toque

`--tap-target: 2.75rem` (44px) é a altura mínima de **todo** botão, link de
navegação, chip de filtro e campo de formulário. Aplicado via `min-h-11`.

---

## 7. Movimento

| Token | Valor |
| --- | --- |
| `--duration-fast` | 150ms |
| `--duration-base` | 250ms |
| `--duration-slow` | 420ms |
| `--ease-out-soft` | `cubic-bezier(.22, 1, .36, 1)` |

**Divisão de responsabilidade:**

- **CSS + IntersectionObserver** para as animações de entrada de seção
  (`.reveal`). São dezenas por página e não justificam JavaScript de biblioteca.
- **Framer Motion** apenas onde o CSS não resolve: animação de **saída** de
  submenus e do drawer, que exige manter o elemento montado durante a transição.

`prefers-reduced-motion: reduce` é respeitado em duas frentes: uma regra global
no CSS zera todas as transições, e o Navbar consulta `useReducedMotion()` para
zerar as durações do Framer Motion.

### Regra de segurança do `.reveal`

O estado inicial oculto só é aplicado sob `html.js`, classe adicionada pelo
script inline do layout. Sem essa guarda, uma falha de JavaScript deixaria o
conteúdo permanentemente invisível — presente no DOM, mas com `opacity: 0`.
Verificado com JavaScript desativado: a página renderiza integralmente.

---

## 8. Assinatura visual

**Uma só:** a tocha estilizada (`src/components/marca/Tocha.tsx`), usada como
marca d'água entre **4% e 8% de opacidade** em heros, faixas escuras e no rodapé.

A logomarca completa aparece em exatamente três lugares: navbar, rodapé e tela
de login. O vermelho institucional aparece como fio de 3px sob títulos de seção
(`.rule-accent`), em CTAs primários e no indicador de item ativo da navbar —
nunca em grandes áreas chapadas, o que empurraria o visual para o comercial.

---

## 9. Assets de demonstração

O portal ainda não tem banco de imagens. Cada `Imagem` do conteúdo é renderizada
por `ImagemDemo`, que gera um SVG determinístico a partir do hash do caminho do
arquivo: a mesma imagem tem sempre a mesma aparência, sem nenhum binário no
repositório e sem servidor de imagens.

Para migrar: trocar o corpo de `ImagemDemo` por `next/image` apontando para o
CMS. A assinatura (`imagem`, `className`, `proporcao`, `legenda`) permanece.

O tipo `Imagem` exige `alt` — não é opcional. A acessibilidade da imagem é
garantida pelo contrato de tipo, não pela disciplina do autor.
