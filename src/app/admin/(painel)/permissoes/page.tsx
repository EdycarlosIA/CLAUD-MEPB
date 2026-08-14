"use client";

import { Check, Minus } from "lucide-react";
import { CabecalhoAdmin, AvisoPrototipo, Painel, Tabela } from "@/components/admin/UI";
import { PaginaCrud } from "@/components/admin/PaginaCrud";
import { Selo } from "@/components/ui/Selo";
import { cn } from "@/lib/utils";

/**
 * Gestão de usuários e papéis.
 *
 * O modelo é de controle de acesso baseado em papéis (RBAC), com escopo por
 * estado: uma secretaria estadual enxerga e edita apenas o conteúdo do seu
 * estado, enquanto a Sede Nacional tem visão consolidada.
 */

interface Usuario {
  nome: string;
  email: string;
  papel: "Administrador Nacional" | "Secretaria Estadual" | "Comunicação" | "Missionário" | "Departamento";
  escopo: string;
  situacao: "Ativo" | "Convite pendente" | "Inativo";
  ultimoAcesso: string;
}

const USUARIOS: Usuario[] = [
  { nome: "Pr. José Azemar", email: "jose.azemar@mepb.org.br", papel: "Administrador Nacional", escopo: "Nacional", situacao: "Ativo", ultimoAcesso: "hoje, 09h14" },
  { nome: "Pr. Marcos Vinícius Teixeira", email: "marcos.teixeira@mepb.org.br", papel: "Secretaria Estadual", escopo: "Ceará", situacao: "Ativo", ultimoAcesso: "ontem, 16h02" },
  { nome: "Irmã Neide Barros de Souza", email: "neide.souza@mepb.org.br", papel: "Departamento", escopo: "Mulheres", situacao: "Ativo", ultimoAcesso: "há 2 dias" },
  { nome: "Secretaria de Comunicação", email: "comunicacao@mepb.org.br", papel: "Comunicação", escopo: "Nacional", situacao: "Ativo", ultimoAcesso: "hoje, 08h30" },
  { nome: "Missionário Paulo Tavares", email: "paulo.tavares@mepb.org.br", papel: "Missionário", escopo: "Rio Negro (AM)", situacao: "Ativo", ultimoAcesso: "há 11 dias" },
  { nome: "Pr. Elias Ferreira do Nascimento", email: "elias.nascimento@mepb.org.br", papel: "Secretaria Estadual", escopo: "Amazonas", situacao: "Ativo", ultimoAcesso: "há 4 dias" },
  { nome: "Pr. Gilberto Almeida Santos", email: "gilberto.santos@mepb.org.br", papel: "Secretaria Estadual", escopo: "Bahia", situacao: "Convite pendente", ultimoAcesso: "—" },
  { nome: "Pr. Reginaldo Alves Braga", email: "reginaldo.braga@mepb.org.br", papel: "Secretaria Estadual", escopo: "Distrito Federal", situacao: "Inativo", ultimoAcesso: "há 8 meses" },
];

/** Matriz de permissões por papel. */
const RECURSOS = ["Igrejas", "Pastores", "Eventos", "Notícias", "Missionários", "Mídia", "Permissões"];

const MATRIZ: Record<string, Record<string, "total" | "escopo" | "leitura" | "nenhum">> = {
  "Administrador Nacional": {
    Igrejas: "total", Pastores: "total", Eventos: "total", Notícias: "total",
    Missionários: "total", Mídia: "total", Permissões: "total",
  },
  "Secretaria Estadual": {
    Igrejas: "escopo", Pastores: "escopo", Eventos: "escopo", Notícias: "escopo",
    Missionários: "leitura", Mídia: "escopo", Permissões: "nenhum",
  },
  Comunicação: {
    Igrejas: "leitura", Pastores: "leitura", Eventos: "total", Notícias: "total",
    Missionários: "leitura", Mídia: "total", Permissões: "nenhum",
  },
  Departamento: {
    Igrejas: "leitura", Pastores: "nenhum", Eventos: "escopo", Notícias: "escopo",
    Missionários: "nenhum", Mídia: "escopo", Permissões: "nenhum",
  },
  Missionário: {
    Igrejas: "nenhum", Pastores: "nenhum", Eventos: "nenhum", Notícias: "leitura",
    Missionários: "escopo", Mídia: "nenhum", Permissões: "nenhum",
  },
};

const LEGENDA = {
  total: { rotulo: "Total", classe: "bg-support-subtle text-support" },
  escopo: { rotulo: "No escopo", classe: "bg-accent-subtle text-accent" },
  leitura: { rotulo: "Leitura", classe: "bg-bg-muted text-fg-muted" },
  nenhum: { rotulo: "Sem acesso", classe: "text-fg-subtle" },
} as const;

export default function AdminPermissoesPage() {
  return (
    <>
      <PaginaCrud<Usuario>
        titulo="Permissões"
        descricao="Usuários com acesso ao painel, seus papéis e o escopo de atuação de cada um."
        rotuloNovo="Convidar usuário"
        registros={USUARIOS}
        camposBusca={(u) => [u.nome, u.email, u.papel, u.escopo]}
        colunas={[
          { chave: "nome", rotulo: "Usuário" },
          { chave: "papel", rotulo: "Papel" },
          { chave: "escopo", rotulo: "Escopo" },
          { chave: "situacao", rotulo: "Situação" },
          { chave: "acesso", rotulo: "Último acesso", alinhamento: "direita" },
        ]}
        linha={(usuario) => ({
          nome: (
            <div>
              <p className="font-medium">{usuario.nome}</p>
              <p className="text-xs text-fg-subtle">{usuario.email}</p>
            </div>
          ),
          papel: <Selo tom={usuario.papel === "Administrador Nacional" ? "primario" : "neutro"}>{usuario.papel}</Selo>,
          escopo: <span className="whitespace-nowrap text-fg-muted">{usuario.escopo}</span>,
          situacao: (
            <Selo
              tom={
                usuario.situacao === "Ativo" ? "verde" : usuario.situacao === "Convite pendente" ? "azul" : "neutro"
              }
            >
              {usuario.situacao}
            </Selo>
          ),
          acesso: (
            <span className="whitespace-nowrap text-fg-muted">{usuario.ultimoAcesso}</span>
          ),
        })}
        aviso={
          <AvisoPrototipo>
            O controle de acesso é baseado em papéis com escopo por estado ou departamento:
            uma secretaria estadual edita apenas o conteúdo do seu estado; a Sede Nacional
            tem visão consolidada de tudo.
          </AvisoPrototipo>
        }
      />

      {/* Matriz de permissões */}
      <div className="mt-6">
        <Painel
          titulo="Matriz de permissões por papel"
          descricao="O que cada papel pode fazer em cada área do painel."
        >
          <Tabela
            colunas={[
              { chave: "papel", rotulo: "Papel" },
              ...RECURSOS.map((r) => ({ chave: r, rotulo: r })),
            ]}
            linhas={Object.entries(MATRIZ).map(([papel, permissoes]) => ({
              papel: <span className="whitespace-nowrap font-medium">{papel}</span>,
              ...Object.fromEntries(
                RECURSOS.map((recurso) => {
                  const nivel = permissoes[recurso];
                  const info = LEGENDA[nivel];
                  return [
                    recurso,
                    nivel === "nenhum" ? (
                      <span className="inline-flex items-center gap-1 text-xs text-fg-subtle">
                        <Minus aria-hidden="true" className="h-3.5 w-3.5" />
                        <span className="sr-only">{info.rotulo}</span>
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
                          info.classe,
                        )}
                      >
                        {nivel === "total" && <Check aria-hidden="true" className="h-3.5 w-3.5" />}
                        {info.rotulo}
                      </span>
                    ),
                  ];
                }),
              ),
            }))}
          />

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-5 text-xs">
            {Object.entries(LEGENDA).map(([chave, info]) => (
              <div key={chave} className="flex items-center gap-2">
                <dt className={cn("rounded-full px-2.5 py-1 font-semibold", info.classe)}>
                  {info.rotulo}
                </dt>
                <dd className="text-fg-subtle">
                  {chave === "total" && "cria, edita e exclui em todo o país"}
                  {chave === "escopo" && "cria e edita apenas dentro do seu escopo"}
                  {chave === "leitura" && "apenas visualiza"}
                  {chave === "nenhum" && "área não disponível"}
                </dd>
              </div>
            ))}
          </dl>
        </Painel>
      </div>
    </>
  );
}
