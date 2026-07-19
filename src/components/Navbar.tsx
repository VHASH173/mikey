"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Producto", href: "#producto" },
  { label: "Precios", href: "#precios" },
  { label: "Empresas", href: "#empresas" },
  { label: "Contacto", href: "#footer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md border-b border-white/10"
          : "bg-black/20 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 h-16 md:h-20 flex items-center justify-between gap-3">
        <a
          href="#top"
          className="flex items-center gap-2 shrink-0 font-display text-sm sm:text-lg tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white"
        >
          <span className="h-2.5 w-2.5 rounded-sm bg-accent shrink-0" />
          Licencias Mikey
        </a>

        <ul className="hidden md:flex items-center gap-10 text-xs tracking-[0.3em] uppercase text-white/80">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative pb-1 hover:text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#precios"
          className="hidden md:inline-flex items-center text-xs tracking-[0.3em] uppercase px-5 py-3 bg-transparent border border-white/30 text-white hover:border-white transition-colors"
        >
          Ver Planes
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 h-9 w-9 shrink-0"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-white block"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-px w-6 bg-white block"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-white block"
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-md border-b border-white/10"
          >
            <ul className="flex flex-col px-4 sm:px-6 py-4 gap-1 text-sm tracking-[0.2em] uppercase text-white/85">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#precios"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center px-5 py-3 border border-white/30 text-white hover:border-white transition-colors"
                >
                  Ver Planes
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
