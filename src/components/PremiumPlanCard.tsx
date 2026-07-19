"use client";

import { useState } from "react";
import { Lens } from "@/components/ui/lens";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function LensDemo() {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="w-full relative rounded-3xl overflow-hidden max-w-md mx-auto bg-neutral-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]">
      <div className="relative z-10">
        <div className="p-4">
          <Lens hovering={hovering} setHovering={setHovering}>
            <img
              src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1400&auto=format&fit=crop"
              alt="Mikey Pro"
              width={500}
              height={500}
              className="rounded-2xl w-full object-cover aspect-[4/3]"
            />
          </Lens>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate={{ filter: hovering ? "blur(2px)" : "blur(0px)" }}
          className="px-8 pb-8 pt-2 relative z-20"
        >
          <motion.h2
            variants={item}
            className="text-neutral-900 text-2xl text-left font-bold"
          >
            Paquete de Software Mikey Pro
          </motion.h2>

          <motion.p variants={item} className="text-neutral-600 text-left mt-4">
            Potencia tu negocio con nuestra suite premium de CRM,
            productividad y seguridad. Activación inmediata.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex items-baseline gap-1.5">
            <span className="text-neutral-900 text-4xl font-bold tracking-tight">
              $299
            </span>
            <span className="text-neutral-500 text-sm">/mes</span>
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease }}
              className="w-full rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 text-white text-sm font-semibold tracking-wide py-3.5 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_26px_-6px_rgba(0,0,0,0.6)] transition-shadow"
            >
              Elegir Plan
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
