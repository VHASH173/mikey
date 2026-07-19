"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/plans";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Features() {
  return (
    <section id="empresas" className="bg-panel py-28 md:py-36 border-y border-line">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-14 md:gap-10"
        >
          {features.map((f) => (
            <motion.div key={f.n} variants={item} className="max-w-sm">
              <span className="font-display text-accent text-lg tracking-[0.2em]">
                {f.n}
              </span>
              <h3 className="font-display text-2xl md:text-3xl mt-4 mb-4">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {f.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
