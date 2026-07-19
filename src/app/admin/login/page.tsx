"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "No se pudo iniciar sesión.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-panel border border-line rounded-2xl p-8"
      >
        <p className="text-accent text-xs tracking-[0.35em] uppercase mb-2">
          Acceso Restringido
        </p>
        <h1 className="font-display text-2xl mb-8">Panel de Administración</h1>

        <label className="flex flex-col gap-2 text-sm mb-5">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Usuario
          </span>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            autoFocus
            className="bg-background border border-line rounded-lg px-4 py-3 outline-none focus:border-accent transition-colors"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm mb-6">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Contraseña
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background border border-line rounded-lg px-4 py-3 outline-none focus:border-accent transition-colors"
          />
        </label>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center text-xs tracking-[0.3em] uppercase px-6 py-3.5 bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
