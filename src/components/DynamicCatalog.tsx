"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products-db";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function DynamicCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section id="catalogo" className="bg-background py-28 md:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <p className="text-accent text-xs tracking-[0.35em] uppercase mb-4">
            Catálogo
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Más productos disponibles
          </h2>
        </motion.div>

        {loading ? (
          <p className="text-center text-muted-foreground text-sm">Cargando...</p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((p) => (
              <motion.article
                key={p.id}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease }}
                className="flex flex-col rounded-2xl border border-line bg-panel overflow-hidden"
              >
                {p.imageUrl && (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col gap-2 flex-1">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-accent">
                    {p.category}
                  </p>
                  <h3 className="font-display text-xl leading-snug">{p.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    {p.description}
                  </p>
                  <p className="font-display text-2xl pt-2">
                    S/ {p.price.toFixed(2)}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
