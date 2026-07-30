import { Navbar } from "@/components/layout/Navbar";
import { Rodape } from "@/components/layout/Rodape";

/**
 * Chrome do portal público: navbar fixa, conteúdo e rodapé institucional.
 *
 * A Área Administrativa vive em outro grupo de rotas — `(admin)` — com chrome
 * próprio, o que sinaliza ao usuário que ele mudou de contexto e evita carregar
 * a navegação pública dentro do painel.
 */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="conteudo">{children}</main>
      <Rodape />
    </>
  );
}
