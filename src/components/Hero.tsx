"use client";

import LiquidMetalHero from "@/components/ui/liquid-metal-hero";

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <div id="top">
      <LiquidMetalHero
        badge="Distribuidor Autorizado de Software"
        title="Licencias originales que arman tu negocio"
        subtitle="CRM, productividad y seguridad corporativa en un solo lugar. Activación inmediata, sin intermediarios."
        primaryCtaLabel="Ver Planes"
        secondaryCtaLabel="Conocer Más"
        onPrimaryCtaClick={() => scrollTo("#precios")}
        onSecondaryCtaClick={() => scrollTo("#empresas")}
        features={["Licencias 100% originales", "Activación inmediata", "Soporte real"]}
      />
    </div>
  );
}
