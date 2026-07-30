# Modelo de Conteúdo — do protótipo ao CMS

Este documento é o contrato entre o front-end e o CMS. Os tipos em
[`src/content/types.ts`](../src/content/types.ts) são a fonte de verdade: cada
interface corresponde a uma *collection type* do Strapi.

---

## 1. Estratégia de migração

O protótipo lê dados de módulos TypeScript em `src/content/`. As páginas **nunca**
importam esses módulos diretamente pensando em "dados fictícios" — elas consomem
os tipos. Isso torna a migração uma troca de origem de dados, não uma reescrita.

```
HOJE                                    EM PRODUÇÃO
src/content/igrejas.ts                  Strapi → collection `igreja`
  └── IGREJAS: Igreja[]                   └── GET /api/igrejas?populate=*
        ↓                                       ↓
  getIgreja(slug)                         src/lib/api.ts → getIgreja(slug)
        ↓                                       ↓
  app/(portal)/igrejas/[slug]/page.tsx   (mesmo arquivo, sem alteração)
```

Passo a passo:

1. Criar as collections no Strapi conforme as tabelas abaixo.
2. Criar `src/lib/api.ts` expondo as mesmas funções que hoje vivem em
   `src/content/*.ts` (`getIgreja`, `getNoticia`, `getEvento`…), agora com `fetch`.
3. Trocar os imports de `@/content/*` por `@/lib/api` nas páginas.
4. Trocar `ImagemDemo` por `next/image`.

Os tipos não mudam em nenhum dos passos.

---

## 2. Collections

### `igreja` — alimenta o Localizador

| Campo | Tipo Strapi | Obrigatório | Observação |
| --- | --- | --- | --- |
| `slug` | UID (origem: `nome`) | ✅ | Chave da rota `/igrejas/[slug]` |
| `nome` | Text | ✅ | |
| `tipo` | Enumeration | ✅ | `sede-nacional` · `sede-estadual` · `igreja` · `congregacao` |
| `cidade` | Text | ✅ | |
| `uf` | Enumeration (27 UFs) | ✅ | Alimenta o filtro e o mapa |
| `bairro`, `endereco`, `cep` | Text | ✅ | |
| `telefone`, `whatsapp`, `email`, `instagram` | Text | — | `whatsapp` no formato `55DDDNNNNNNNNN` |
| `coordenadas` | Component `geo` (`lat`, `lng`) | ✅ | Link "Como chegar" e JSON-LD |
| `pastor` | Component `pastor` | ✅ | `nome`, `desde`, `bio`, `foto` |
| `cultos` | Component repetível `culto` | ✅ | `dia`, `horario`, `descricao` |
| `descricao` | Rich Text | ✅ | |
| `fundacao` | Number (integer) | ✅ | |
| `departamentos` | JSON / relação | — | Rótulos convertidos em slug de rota |
| `fotos` | Media (múltipla) | ✅ | **`alternativeText` obrigatório** |

> O campo `alt` é obrigatório no tipo `Imagem`. Configure `alternativeText` como
> campo requerido na biblioteca de mídia do Strapi para manter essa garantia.

### `noticia`

| Campo | Tipo | Observação |
| --- | --- | --- |
| `slug` | UID | |
| `titulo`, `resumo` | Text | `resumo` alimenta a meta description e o Open Graph |
| `categoria` | Enumeration | Institucional · Missões · Eventos · Departamentos · Educação · Ação Social |
| `data` | Date | |
| `autor` | Text | |
| `destaque` | Boolean | Controla a matéria principal da home |
| `imagem` | Media | |
| `corpo` | Rich Text | No protótipo, `string[]` de parágrafos |
| `tags` | JSON | |
| `tempoLeitura` | Number | Pode ser calculado no CMS a partir de `corpo` |

### `evento`

`slug` · `titulo` · `tipo` (Congresso, Convenção, Seminário, Culto, Retiro,
Capacitação) · `dataInicio` · `dataFim` · `cidade` · `uf` · `local` · `endereco` ·
`descricao` · `imagem` · `destaque` · `inscricoesAbertas` · `valor` · `publico` ·
`programacao` (componente repetível: `horario`, `atividade`, `responsavel`) ·
`materiais` (componente repetível: `titulo`, `formato`, `tamanho`).

### `departamento`

`slug` · `nome` · `lema` · `icone` (nome do ícone lucide) · `faixaEtaria` ·
`descricao` · `sobre` (Rich Text) · `coordenador` (componente) · `atividades`
(repetível) · `versiculo` (componente: `texto`, `referencia`) · `imagem`.

### `missionario`

`slug` · `nome` · `campo` · `pais` · `continente` · `desde` · `resumo` ·
`historia` (Rich Text) · `foco` (JSON) · `pedidosOracao` (JSON) · `foto`.

Collection auxiliar `campo-missionario`: `pais` · `continente` · `x` · `y`
(percentuais no diagrama) · `missionarios` · `desde`.

### `midia` — TV MEPB

`slug` · `titulo` · `tipo` (Mensagem, Série, Podcast, Live, Documentário) ·
`preletor` · `data` · `duracao` · `descricao` · `serie` · `destaque` · `capa` ·
`youtubeId`.

> Os vídeos ficam no YouTube. O portal armazena apenas metadados e capa.
> Ao embutir o player, use uma *facade* (capa clicável que só carrega o iframe
> ao clique) — o embed do YouTube custa cerca de 900 KB no carregamento inicial.

### `documento` — Biblioteca

`slug` · `titulo` · `categoria` · `descricao` · `formato` · `tamanho` ·
`atualizadoEm` · `downloads` · `restrito` (Boolean) · `arquivo` (Media).

Documentos com `restrito: true` exigem autenticação. No Strapi, controle isso
pela camada de permissões da role, **não escondendo apenas no front-end**.

### Demais collections

`faq` (`pergunta`, `resposta`, `categoria`), `galeria` (`titulo`, `categoria`,
`tipo`, `data`, `local`, `imagem`), `presidente`, `marco-historico`,
`artigo-fe` e o single type `configuracao-site` (dados da sede, redes sociais,
versículo institucional).

---

## 3. Papéis e permissões

O painel implementa RBAC com **escopo por estado ou departamento**. A matriz
completa está na tela `/admin/permissoes`.

| Papel | Escopo | Resumo |
| --- | --- | --- |
| Administrador Nacional | Nacional | Acesso total, incluindo permissões |
| Secretaria Estadual | Um estado | Cria e edita apenas conteúdo do seu estado |
| Comunicação | Nacional | Notícias, eventos e mídia; leitura no restante |
| Departamento | Um departamento | Eventos, notícias e mídia do departamento |
| Missionário | Próprio perfil | Atualiza o próprio perfil e pedidos de oração |

No Strapi, o escopo por estado é implementado com uma política que injeta o
filtro `uf` do usuário em toda consulta da collection `igreja`.

---

## 4. Infraestrutura

O `docker-compose.yml` na raiz sobe PostgreSQL 16 e Strapi 5 para
desenvolvimento local:

```bash
docker compose up -d          # Postgres + Strapi
# Strapi:   http://localhost:1337/admin
# Portal:   npm run dev  →  http://localhost:3000
```

Variáveis usadas pelo portal (ver `.env.example`):

```
NEXT_PUBLIC_SITE_URL=https://www.mepb.org.br
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=          # token de leitura, gerado no painel do Strapi
```

---

## 5. Aviso sobre os dados do protótipo

Os dados em `src/content/` são **fictícios**, criados para a demonstração — com
uma exceção: os marcos históricos em `institucional.ts` referenciam fatos
divulgados publicamente pela própria denominação (fundação em 1939 em Manaus
pelo casal Graham, primeiro culto oficial em Natal, organização estatutária em
1965, primeira Convenção Nacional em 1966, sede em Natal/RN, presença em 21
estados, seminários em Fortaleza e Natal, barco *Missionária Ethel Matson*).

Nomes de pastores, presidentes, membros do Supremo Concílio, endereços,
telefones e a declaração de fé **precisam ser substituídos pelos registros
oficiais** antes de qualquer publicação. Os textos jurídicos (Política de
Privacidade e LGPD) são modelos e exigem revisão por assessoria jurídica.
