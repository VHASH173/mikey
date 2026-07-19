"use client";

import { motion } from "framer-motion";
import { LensDemo } from "./PremiumPlanCard";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PremiumPlanSection() {
  return (
    <section className="bg-panel py-28 md:py-36 border-y border-line">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <p className="text-accent text-xs tracking-[0.35em] uppercase mb-4">
            Plan Insignia
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            El paquete completo, sin límites
          </h2>
        </motion.div>

        <LensDemo />
      </div>
    </section>
  );
}
