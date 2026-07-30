import type { Metadata } from "next";
import { AdminChrome } from "@/components/admin/Chrome";

export const metadata: Metadata = {
  title: { default: "Área Administrativa", template: "%s · Painel MEPB" },
  // O painel nunca deve ser indexado
  robots: { index: false, follow: false },
};

/**
 * Layout do painel. A tela de login fica fora deste grupo de rotas, por isso
 * não herda a barra lateral.
 */
export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return <AdminChrome>{children}</AdminChrome>;
}
