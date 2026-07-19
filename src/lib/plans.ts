export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
  seats: string;
};

export const plans: Plan[] = [
  {
    id: "mikey-crm",
    name: "Mikey CRM",
    tagline: "Gestión de clientes y ventas",
    price: "$29",
    period: "/mes por licencia",
    seats: "Hasta 10 usuarios",
    features: [
      "Pipeline de ventas ilimitado",
      "Automatizaciones de seguimiento",
      "Reportes en tiempo real",
      "Soporte prioritario",
    ],
  },
  {
    id: "flowdesk-suite",
    name: "Flowdesk Suite",
    tagline: "Productividad y colaboración",
    price: "$19",
    period: "/mes por licencia",
    seats: "Hasta 25 usuarios",
    features: [
      "Documentos y hojas de cálculo",
      "Videollamadas ilimitadas",
      "Almacenamiento en la nube 2TB",
      "Integraciones API",
    ],
    highlight: true,
  },
  {
    id: "sentinel-shield",
    name: "Sentinel Shield",
    tagline: "Seguridad y antivirus corporativo",
    price: "$14",
    period: "/mes por licencia",
    seats: "Sin límite de usuarios",
    features: [
      "Protección endpoint 24/7",
      "Firewall administrado",
      "Backups cifrados automáticos",
      "Panel de administración central",
    ],
  },
];

export const features = [
  {
    n: "01",
    title: "Licencias 100% Originales",
    text: "Cada clave activa una licencia genuina emitida directamente por nosotros como desarrolladores y distribuidores autorizados.",
  },
  {
    n: "02",
    title: "Activación Inmediata",
    text: "Recibe tu clave y guía de activación al instante tras la compra, sin esperas ni intermediarios.",
  },
  {
    n: "03",
    title: "Soporte Real",
    text: "Un equipo humano responde tus dudas técnicas y de facturación, no un bot genérico.",
  },
];
