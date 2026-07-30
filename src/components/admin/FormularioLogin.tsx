"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { CampoCheckbox, CampoTexto } from "@/components/ui/Campo";
import { Botao } from "@/components/ui/Botao";

/**
 * Autenticação do painel — demonstração.
 *
 * Não há verificação real de credenciais: qualquer par válido em formato entra
 * no painel. Em produção, substituir por uma chamada ao provedor de identidade
 * (Strapi Users & Permissions ou NextAuth) com sessão em cookie httpOnly.
 */
export function FormularioLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erros, setErros] = useState<{ email?: string; senha?: string }>({});
  const [entrando, setEntrando] = useState(false);

  function enviar(e: FormEvent) {
    e.preventDefault();

    const novos: typeof erros = {};
    if (!email.trim()) {
      novos.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      novos.email = "Informe um e-mail válido, como nome@exemplo.com.br.";
    }
    if (!senha) {
      novos.senha = "Informe sua senha.";
    } else if (senha.length < 6) {
      novos.senha = "A senha deve ter ao menos 6 caracteres.";
    }

    setErros(novos);
    if (Object.keys(novos).length > 0) {
      document.getElementById(novos.email ? "email" : "senha")?.focus();
      return;
    }

    setEntrando(true);
    router.push("/admin");
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-6">
      <CampoTexto
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        rotulo="E-mail"
        obrigatorio
        placeholder="nome@mepb.org.br"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErros((x) => ({ ...x, email: undefined }));
        }}
        erro={erros.email}
      />

      <div className="relative">
        <CampoTexto
          id="senha"
          name="senha"
          type={mostrarSenha ? "text" : "password"}
          autoComplete="current-password"
          rotulo="Senha"
          obrigatorio
          placeholder="••••••••"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErros((x) => ({ ...x, senha: undefined }));
          }}
          erro={erros.senha}
          className="[&_input]:pr-12"
        />

        {/* Posicionado sobre o campo; `top` compensa a altura do rótulo */}
        <button
          type="button"
          onClick={() => setMostrarSenha((v) => !v)}
          aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-1 top-[1.85rem] inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-muted hover:text-fg"
        >
          {mostrarSenha ? (
            <EyeOff aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
          ) : (
            <Eye aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
          )}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <CampoCheckbox id="lembrar" name="lembrar" rotulo="Manter conectado" />
        <Link href="/contato" className="text-sm font-semibold text-primary hover:underline">
          Esqueci minha senha
        </Link>
      </div>

      <Botao type="submit" variante="primario" tamanho="lg" larguraTotal disabled={entrando}>
        {entrando ? "Entrando…" : "Entrar"}
      </Botao>

      <p className="rounded-[var(--radius-md)] border border-line bg-bg-subtle px-4 py-3 text-sm leading-relaxed text-fg-muted">
        <strong className="font-semibold text-fg">Demonstração:</strong> não há
        verificação real de credenciais. Informe um e-mail em formato válido e uma senha
        com pelo menos 6 caracteres para acessar o painel.
      </p>
    </form>
  );
}
