"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products-db";

const categoryOptions = ["CRM", "Software", "Suscripciones", "Otro"];

const emptyForm = {
  title: "",
  description: "",
  price: "",
  category: categoryOptions[0],
  imageUrl: "",
};

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function loadProducts() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      title: product.title,
      description: product.description,
      price: String(product.price),
      category: product.category,
      imageUrl: product.imageUrl ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const price = Number(form.price);
    if (!form.title.trim() || !form.description.trim() || !form.category.trim()) {
      setError("Completa título, descripción y lugar/categoría.");
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      setError("El costo en soles debe ser un número válido.");
      return;
    }

    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      price,
      category: form.category.trim(),
      imageUrl: form.imageUrl.trim() || undefined,
    };

    const res = await fetch(
      editingId ? `/api/products/${editingId}` : "/api/products",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Ocurrió un error al guardar el producto.");
      return;
    }

    cancelEdit();
    await loadProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) {
      return;
    }
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      if (editingId === id) cancelEdit();
      await loadProducts();
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-6 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <p className="text-accent text-xs tracking-[0.35em] uppercase mb-3">
              Panel de Administración
            </p>
            <h1 className="font-display text-3xl md:text-4xl">
              Gestionar Productos
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-1"
          >
            Cerrar sesión
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5 bg-panel border border-line rounded-2xl p-6 md:p-8 mb-16"
        >
          <div className="md:col-span-2 flex items-center justify-between">
            <h2 className="font-display text-xl">
              {editingId ? "Editar producto" : "Nuevo producto"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancelar edición
              </button>
            )}
          </div>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Título
            </span>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Ej. Licencia CRM Pro"
              className="bg-background border border-line rounded-lg px-4 py-3 outline-none focus:border-accent transition-colors"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Costo en soles (S/)
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="99.00"
              className="bg-background border border-line rounded-lg px-4 py-3 outline-none focus:border-accent transition-colors"
            />
          </label>

          <label className="md:col-span-2 flex flex-col gap-2 text-sm">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Descripción
            </span>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe brevemente el producto"
              rows={3}
              className="bg-background border border-line rounded-lg px-4 py-3 outline-none focus:border-accent transition-colors resize-none"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Lugar / Categoría
            </span>
            <input
              list="category-options"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Ej. CRM, Software, Suscripciones"
              className="bg-background border border-line rounded-lg px-4 py-3 outline-none focus:border-accent transition-colors"
            />
            <datalist id="category-options">
              {categoryOptions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              URL de imagen (opcional)
            </span>
            <input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
              className="bg-background border border-line rounded-lg px-4 py-3 outline-none focus:border-accent transition-colors"
            />
          </label>

          {error && (
            <p className="md:col-span-2 text-sm text-red-600">{error}</p>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center text-xs tracking-[0.3em] uppercase px-6 py-3.5 bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving
                ? "Guardando..."
                : editingId
                ? "Guardar cambios"
                : "Publicar producto"}
            </button>
          </div>
        </form>

        <h2 className="font-display text-xl mb-6">
          Productos publicados ({products.length})
        </h2>

        {loading ? (
          <p className="text-muted-foreground text-sm">Cargando...</p>
        ) : products.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Aún no has publicado ningún producto.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <div
                key={p.id}
                className="border border-line rounded-2xl p-5 bg-panel flex flex-col gap-3"
              >
                {p.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                )}
                <p className="text-[10px] tracking-[0.25em] uppercase text-accent">
                  {p.category}
                </p>
                <h3 className="font-display text-lg leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {p.description}
                </p>
                <p className="font-display text-lg">
                  S/ {p.price.toFixed(2)}
                </p>
                <div className="flex gap-3 pt-2 mt-auto">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-xs tracking-[0.2em] uppercase text-foreground hover:text-accent transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-xs tracking-[0.2em] uppercase text-red-600 hover:text-red-500 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
