"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { CampoCheckbox, CampoSelect, CampoTexto, CampoTextarea } from "@/components/ui/Campo";
import { Botao } from "@/components/ui/Botao";
import { Card, CardCorpo } from "@/components/ui/Card";

/**
 * Formulário genérico do portal, com validação no cliente.
 *
 * Regras de acessibilidade aplicadas (ver `docs/01-arquitetura-da-informacao.md`):
 *  - a validação só roda no envio, nunca a cada tecla — validar enquanto o
 *    usuário ainda digita produz erro antes de haver erro;
 *  - ao falhar, o foco vai para o primeiro campo inválido e um resumo é
 *    anunciado em `role="alert"`;
 *  - cada mensagem de erro fica junto ao seu campo, ligada por `aria-describedby`.
 *
 * No protótipo o envio é simulado. Em produção, apontar para a rota de API que
 * grava no Strapi e dispara a notificação por e-mail.
 */

export type CampoConfig =
  | {
      tipo: "texto" | "email" | "tel";
      nome: string;
      rotulo: string;
      obrigatorio?: boolean;
      placeholder?: string;
      ajuda?: string;
      largura?: "total" | "metade";
    }
  | {
      tipo: "textarea";
      nome: string;
      rotulo: string;
      obrigatorio?: boolean;
      placeholder?: string;
      ajuda?: string;
      largura?: "total" | "metade";
    }
  | {
      tipo: "select";
      nome: string;
      rotulo: string;
      obrigatorio?: boolean;
      opcoes: string[];
      ajuda?: string;
      largura?: "total" | "metade";
    }
  | {
      tipo: "checkbox";
      nome: string;
      rotulo: string;
      obrigatorio?: boolean;
      largura?: "total" | "metade";
    };

export function Formulario({
  campos,
  rotuloEnvio = "Enviar",
  mensagemSucesso = "Mensagem enviada. Em breve entraremos em contato.",
  nota,
}: {
  campos: CampoConfig[];
  rotuloEnvio?: string;
  mensagemSucesso?: string;
  /** Texto complementar exibido acima do botão (ex.: aviso de LGPD). */
  nota?: string;
}) {
  const [valores, setValores] = useState<Record<string, string | boolean>>({});
  const [erros, setErros] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  function definir(nome: string, valor: string | boolean) {
    setValores((v) => ({ ...v, [nome]: valor }));
    // Limpa o erro do campo assim que o usuário o corrige
    setErros((e) => {
      if (!e[nome]) return e;
      const { [nome]: _, ...resto } = e;
      return resto;
    });
  }

  function validar(): Record<string, string> {
    const novos: Record<string, string> = {};

    for (const campo of campos) {
      const valor = valores[campo.nome];

      if (campo.tipo === "checkbox") {
        if (campo.obrigatorio && !valor) {
          novos[campo.nome] = "É necessário marcar esta opção para continuar.";
        }
        continue;
      }

      const texto = typeof valor === "string" ? valor.trim() : "";

      if (campo.obrigatorio && !texto) {
        novos[campo.nome] = `Informe ${campo.rotulo.toLowerCase()}.`;
        continue;
      }

      if (!texto) continue;

      if (campo.tipo === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(texto)) {
        novos[campo.nome] = "Informe um e-mail válido, como nome@exemplo.com.br.";
      }

      if (campo.tipo === "tel" && texto.replace(/\D/g, "").length < 10) {
        novos[campo.nome] = "Informe o telefone com DDD, como (84) 98800-0000.";
      }
    }

    return novos;
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const novos = validar();
    setErros(novos);

    if (Object.keys(novos).length > 0) {
      // Move o foco para o primeiro campo com erro
      const primeiro = campos.find((c) => novos[c.nome]);
      if (primeiro) document.getElementById(primeiro.nome)?.focus();
      return;
    }

    setEnviando(true);
    // Simulação de envio — substituir pela chamada real à API.
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
    }, 600);
  }

  if (enviado) {
    return (
      <Card>
        <CardCorpo className="p-10 text-center">
          <CheckCircle2 aria-hidden="true" className="mx-auto h-12 w-12 text-support" />
          <h3 className="mt-5 text-xl font-semibold">Recebemos sua mensagem</h3>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-fg-muted">{mensagemSucesso}</p>
          <Botao
            variante="contorno"
            className="mt-8"
            onClick={() => {
              setEnviado(false);
              setValores({});
            }}
          >
            Enviar outra mensagem
          </Botao>
        </CardCorpo>
      </Card>
    );
  }

  const totalErros = Object.keys(erros).length;

  return (
    <Card>
      <CardCorpo className="p-6 md:p-8">
        <form onSubmit={enviar} noValidate>
          {/* Resumo de erros, anunciado por leitores de tela */}
          {totalErros > 0 && (
            <div
              role="alert"
              className="mb-8 rounded-[var(--radius-md)] border border-danger bg-primary-subtle px-5 py-4"
            >
              <p className="font-semibold text-danger">
                {totalErros === 1
                  ? "Há 1 campo que precisa da sua atenção."
                  : `Há ${totalErros} campos que precisam da sua atenção.`}
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                As mensagens aparecem logo abaixo de cada campo.
              </p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            {campos.map((campo) => {
              const classe = campo.largura === "metade" ? "" : "sm:col-span-2";
              const comum = {
                id: campo.nome,
                name: campo.nome,
                rotulo: campo.rotulo,
                obrigatorio: campo.obrigatorio,
                erro: erros[campo.nome],
                className: classe,
              };

              if (campo.tipo === "textarea") {
                return (
                  <CampoTextarea
                    key={campo.nome}
                    {...comum}
                    ajuda={campo.ajuda}
                    placeholder={campo.placeholder}
                    value={(valores[campo.nome] as string) ?? ""}
                    onChange={(e) => definir(campo.nome, e.target.value)}
                  />
                );
              }

              if (campo.tipo === "select") {
                return (
                  <CampoSelect
                    key={campo.nome}
                    {...comum}
                    ajuda={campo.ajuda}
                    value={(valores[campo.nome] as string) ?? ""}
                    onChange={(e) => definir(campo.nome, e.target.value)}
                  >
                    <option value="">Selecione…</option>
                    {campo.opcoes.map((opcao) => (
                      <option key={opcao} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </CampoSelect>
                );
              }

              if (campo.tipo === "checkbox") {
                return (
                  <CampoCheckbox
                    key={campo.nome}
                    {...comum}
                    checked={Boolean(valores[campo.nome])}
                    onChange={(e) => definir(campo.nome, e.target.checked)}
                  />
                );
              }

              return (
                <CampoTexto
                  key={campo.nome}
                  {...comum}
                  ajuda={campo.ajuda}
                  type={campo.tipo === "texto" ? "text" : campo.tipo}
                  inputMode={campo.tipo === "tel" ? "tel" : undefined}
                  autoComplete={
                    campo.tipo === "email" ? "email" : campo.tipo === "tel" ? "tel" : undefined
                  }
                  placeholder={campo.placeholder}
                  value={(valores[campo.nome] as string) ?? ""}
                  onChange={(e) => definir(campo.nome, e.target.value)}
                />
              );
            })}
          </div>

          {nota && <p className="mt-7 text-sm leading-relaxed text-fg-muted">{nota}</p>}

          <Botao type="submit" variante="primario" tamanho="lg" className="mt-8" disabled={enviando}>
            {enviando ? "Enviando…" : rotuloEnvio}
          </Botao>

          <p className="mt-5 text-xs text-fg-subtle">
            Este é um protótipo: nenhum dado é efetivamente transmitido ou armazenado.
          </p>
        </form>
      </CardCorpo>
    </Card>
  );
}
