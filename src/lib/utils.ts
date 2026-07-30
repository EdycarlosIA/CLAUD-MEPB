/** Utilitários compartilhados por todo o portal. */

/**
 * Concatena classes CSS ignorando valores falsos.
 * Alternativa enxuta ao `clsx` — evita uma dependência para algo de cinco linhas.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

/**
 * Converte "2026-10-14" em partes de data.
 * Faz o parse manual para evitar o deslocamento de fuso que o construtor
 * `new Date("2026-10-14")` provoca ao interpretar a string como UTC.
 */
function partes(iso: string) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return { ano, mes, dia };
}

/** "2026-10-14" → "14 de outubro de 2026" */
export function formatarData(iso: string): string {
  const { ano, mes, dia } = partes(iso);
  return `${dia} de ${MESES[mes - 1]} de ${ano}`;
}

/** "2026-10-14" → "14 out 2026" */
export function formatarDataCurta(iso: string): string {
  const { ano, mes, dia } = partes(iso);
  return `${String(dia).padStart(2, "0")} ${MESES[mes - 1].slice(0, 3)} ${ano}`;
}

/** Retorna dia e mês abreviado, para o bloco de data dos cards de evento. */
export function blocoData(iso: string): { dia: string; mes: string; ano: string } {
  const { ano, mes, dia } = partes(iso);
  return {
    dia: String(dia).padStart(2, "0"),
    mes: MESES[mes - 1].slice(0, 3).toUpperCase(),
    ano: String(ano),
  };
}

/**
 * Formata o período de um evento da forma mais curta possível:
 * mesmo mês  → "14 a 17 de outubro de 2026"
 * meses      → "28 de outubro a 2 de novembro de 2026"
 * sem fim    → "14 de outubro de 2026"
 */
export function formatarPeriodo(inicio: string, fim?: string): string {
  if (!fim || fim === inicio) return formatarData(inicio);
  const a = partes(inicio);
  const b = partes(fim);
  if (a.ano === b.ano && a.mes === b.mes) {
    return `${a.dia} a ${b.dia} de ${MESES[a.mes - 1]} de ${a.ano}`;
  }
  if (a.ano === b.ano) {
    return `${a.dia} de ${MESES[a.mes - 1]} a ${b.dia} de ${MESES[b.mes - 1]} de ${a.ano}`;
  }
  return `${formatarData(inicio)} a ${formatarData(fim)}`;
}

/** Remove acentos e normaliza para busca sem diferenciação. */
export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Verifica se `termo` aparece em qualquer um dos campos informados. */
export function contem(termo: string, ...campos: (string | undefined)[]): boolean {
  if (!termo.trim()) return true;
  const alvo = normalizar(termo);
  return campos.some((campo) => campo && normalizar(campo).includes(alvo));
}

/** Milhar com separador brasileiro: 4820 → "4.820" */
export function milhar(n: number): string {
  return n.toLocaleString("pt-BR");
}

/** Monta o link do WhatsApp a partir do número no formato 55DDDNNNNNNNNN. */
export function linkWhatsApp(numero: string, mensagem?: string): string {
  const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : "";
  return `https://wa.me/${numero.replace(/\D/g, "")}${texto}`;
}

/** Monta o link de rota do Google Maps a partir das coordenadas. */
export function linkMapa(lat: number, lng: number, rotulo?: string): string {
  const destino = rotulo ? encodeURIComponent(rotulo) : `${lat},${lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${destino}&center=${lat},${lng}`;
}

/** "Educação" → "educacao". Usado para ligar rótulos de conteúdo a rotas. */
export function slug(texto: string): string {
  return normalizar(texto).replace(/\s+/g, "-");
}
