"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const columns = [
  {
    title: "Producto",
    links: ["Mikey CRM", "Flowdesk Suite", "Sentinel Shield", "Comparar Planes"],
  },
  {
    title: "Empresa",
    links: ["Sobre Nosotros", "Distribuidores", "Prensa", "Trabaja con Nosotros"],
  },
  {
    title: "Atención al Cliente",
    links: ["Centro de Ayuda", "Estado del Servicio", "Facturación", "Contacto"],
  },
];

const socials = ["LinkedIn", "X", "Instagram"];

export default function Footer() {
  return (
    <footer id="footer" className="bg-panel text-foreground pt-24 pb-10 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="grid md:grid-cols-2 gap-14 pb-16 border-b border-line"
        >
          <div>
            <p className="font-display text-2xl tracking-[0.2em] uppercase mb-4 flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
              Licencias Mikey
            </p>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Distribuidor autorizado de licencias de software para
              empresas.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Novedades y Ofertas
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border-b border-line pb-2 max-w-md"
            >
              <input
                type="email"
                placeholder="tu@empresa.com"
                className="bg-transparent flex-1 text-sm placeholder:text-muted-foreground/60 outline-none"
              />
              <button
                type="submit"
                className="text-xs tracking-[0.25em] uppercase text-accent hover:text-foreground transition-colors"
              >
                Suscribir
              </button>
            </form>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 py-16">
          {columns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-5">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground/85 hover:text-accent transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 pt-10 border-t border-line">
          <p className="text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Licencias Mikey. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-accent transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
