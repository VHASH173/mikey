"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CtaBand() {
  return (
    <section className="relative bg-background py-28 md:py-36 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(169,117,39,0.15), transparent 60%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto max-w-3xl px-6 text-center flex flex-col items-center"
      >
        <p className="text-accent text-xs tracking-[0.35em] uppercase mb-6">
          Empieza Hoy
        </p>
        <h2 className="font-display text-4xl md:text-6xl leading-tight mb-8">
          Arma tu stack de software en minutos
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mb-10 max-w-md">
          Licencias originales, activación inmediata y soporte real para tu
          equipo.
        </p>
        <a
          href="#precios"
          className="inline-flex items-center gap-3 bg-foreground text-background text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-accent hover:text-white transition-colors"
        >
          Ver Planes
        </a>
      </motion.div>
    </section>
  );
}
