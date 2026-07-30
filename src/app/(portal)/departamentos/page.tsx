import type { Metadata } from "next";
import {
  Baby, Flame, Globe2, GraduationCap, Heart, Megaphone, Music, Sparkles, Users,
} from "lucide-react";
import { PageHero, TituloSecao, Versiculo } from "@/components/layout/Pagina";
import { Reveal } from "@/components/ui/Reveal";
import { CardDepartamento } from "@/components/cards";
import { DEPARTAMENTOS } from "@/content/departamentos";

export const metadata: Metadata = {
  title: "Departamentos",
  description:
    "Os nove departamentos nacionais da MEPB: Homens, Mulheres, Jovens, Adolescentes, Crianças, Louvor, Missões, Educação e Evangelismo.",
};

const ICONES = { Users, Heart, Flame, Sparkles, Baby, Music, Globe2, GraduationCap, Megaphone } as const;

export default function DepartamentosPage() {
  return (
    <>
      <PageHero
        compacto
        titulo="Departamentos"
        subtitulo="Nove departamentos nacionais organizam a vida e o serviço da igreja — do berçário ao campo missionário. Cada um com sua agenda, seus materiais e sua coordenação."
        trilha={[{ rotulo: "Departamentos" }]}
      />

      <section className="section-y">
        <div className="container-portal">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTAMENTOS.map((departamento, i) => (
              <Reveal as="li" key={departamento.slug} atraso={(i % 3) * 80}>
                <CardDepartamento
                  departamento={departamento}
                  Icone={ICONES[departamento.icone as keyof typeof ICONES]}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Como funcionam */}
      <section className="border-y border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Estrutura"
            titulo="Como os departamentos funcionam"
            centralizado
          />

          <ol className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              {
                titulo: "Coordenação nacional",
                texto:
                  "Cada departamento tem um coordenador nacional, responsável por definir as diretrizes, produzir materiais e organizar os encontros de âmbito nacional.",
              },
              {
                titulo: "Representação estadual",
                texto:
                  "Nos estados, coordenadores locais adaptam as diretrizes à realidade regional e articulam as igrejas da sua área.",
              },
              {
                titulo: "Atuação na igreja local",
                texto:
                  "É na igreja local que o trabalho acontece de fato — nas reuniões semanais, nas classes da Escola Dominical e nas ações comunitárias.",
              },
            ].map((etapa, i) => (
              <Reveal as="li" key={etapa.titulo} atraso={i * 100}>
                <span
                  aria-hidden="true"
                  data-numeric
                  className="font-serif text-4xl font-semibold text-line-strong"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{etapa.titulo}</h3>
                <p className="mt-2.5 leading-relaxed text-fg-muted">{etapa.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--mepb-navy-900)] py-20 text-white">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
        <div className="container-portal relative">
          <Versiculo
            claro
            texto="Ora, há diversidade de dons, mas o Espírito é o mesmo. E há diversidade de ministérios, mas o Senhor é o mesmo."
            referencia="1 Coríntios 12.4-5"
          />
        </div>
      </section>
    </>
  );
}
