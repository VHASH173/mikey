"use client";

import { motion } from "framer-motion";
import { CircularShowcase } from "./ui/circular-showcase";

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    name: "Mikey CRM — $29/mes",
    designation: "Gestión de clientes y ventas · Hasta 10 usuarios",
    quote:
      "Pipeline de ventas ilimitado, automatizaciones de seguimiento y reportes en tiempo real para que tu equipo comercial cierre más rápido.",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Flowdesk Suite — $19/mes",
    designation: "Productividad y colaboración · Hasta 25 usuarios",
    quote:
      "Documentos, hojas de cálculo, videollamadas ilimitadas y 2TB de almacenamiento en la nube para que tu equipo trabaje sin fricción.",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Sentinel Shield — $14/mes",
    designation: "Seguridad corporativa · Usuarios ilimitados",
    quote:
      "Protección endpoint 24/7, firewall administrado y backups cifrados automáticos para dormir tranquilo cada noche.",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function ProductShowcase() {
  return (
    <section id="precios" className="bg-background py-28 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-xl mx-auto mb-8"
        >
          <p className="text-accent text-xs tracking-[0.35em] uppercase mb-4">
            El Stack Completo
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Tres licencias, un solo negocio armado
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="flex justify-center"
        >
          <CircularShowcase
            items={items}
            autoplay
            colors={{
              name: "#201b13",
              designation: "#a97527",
              testimony: "#5c5142",
              arrowBackground: "#201b13",
              arrowForeground: "#f6f2e9",
              arrowHoverBackground: "#a97527",
            }}
            fontSizes={{ name: "1.75rem", designation: "0.7rem", quote: "1.05rem" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
