import type { LandingOverlay } from "./merge-landing"

export const HOME_EN = {
  hero: {
    badge: "B2B Infrastructure Compliance Platform",
    title1: "Complete Visibility.",
    title2: "Total Confidence.",
    subtitle:
      "One platform for discovery, operations, security, compliance, cost, and risk — across local, hybrid, and cloud infrastructure.",
    subline: "Know what you have · Know how it performs · Prove compliance · Reduce risk",
    requestDemo: "Request Demo",
  },
  trust: {
    signals: [
      "SOC 2 Ready",
      "ISO 27001",
      "HIPAA",
      "PCI DSS",
      "Agent-based or agentless",
    ],
  },
  challenge: {
    kicker: "The Challenge",
    title: "Modern infrastructure is fragmented",
    body: "Your tools don't talk to each other — leaving security and compliance gaps invisible until it's too late.",
    cards: [
      { title: "Monitoring tools", sub: "Only show performance metrics" },
      { title: "Security scanners", sub: "Only show vulnerability lists" },
      { title: "Compliance tools", sub: "Only show point-in-time evidence" },
      { title: "Finance tools", sub: "Only show disconnected cost data" },
    ],
    alertTitle: "None of them talk to each other.",
    alertBody:
      "Teams stitch together dashboards, screenshots, and spreadsheets — while risk quietly grows.",
  },
  solution: {
    kicker: "The Opticini Solution",
    title: "One unified insight plane",
    body: "Opticini replaces dozens of disconnected tools with a single, continuous view — mapped to health, security, compliance, cost, and risk in real time.",
    labels: [
      { emoji: "🖥️", label: "On-premise infrastructure" },
      { emoji: "☁️", label: "Cloud & hybrid environments" },
      { emoji: "🔌", label: "Apps, APIs & identity systems" },
    ],
    banner:
      "All mapped to health, security, compliance, cost, and risk — in real time.",
  },
  platform: {
    kicker: "Platform",
    title: "10 Insight Planes. One Platform.",
    body: "Each insight plane is deeply integrated — a change in one domain instantly surfaces across all others.",
    learnMore: "Learn more →",
    planes: [
      { slug: "discovery", emoji: "🔍", title: "Discovery", tagline: "Know everything that exists" },
      { slug: "health", emoji: "💓", title: "Health", tagline: "Know what's up — and what's about to go down" },
      { slug: "performance", emoji: "⚡", title: "Performance", tagline: "Measure what matters to users and teams" },
      { slug: "security", emoji: "🔐", title: "Security", tagline: "See risk before attackers do" },
      { slug: "configuration", emoji: "⚙️", title: "Configuration", tagline: "Prevent silent configuration decay" },
      { slug: "compliance", emoji: "📋", title: "Compliance", tagline: "Always audit-ready, never scrambling" },
      { slug: "evidence", emoji: "📂", title: "Evidence", tagline: "No screenshots. No spreadsheets." },
      { slug: "change", emoji: "🔄", title: "Change", tagline: "Every incident starts with a change" },
      { slug: "cost", emoji: "💰", title: "Cost", tagline: "Visibility before optimization" },
      { slug: "risk", emoji: "⚠️", title: "Risk", tagline: "Not all alerts are equal" },
    ],
  },
  audiences: {
    kicker: "Built for Teams",
    title: "The right insights for every stakeholder",
    items: [
      {
        emoji: "📊",
        role: "IT Operations & SRE",
        focus:
          "Real-time infrastructure health, uptime, and performance visibility across your entire stack.",
      },
      {
        emoji: "🛡️",
        role: "Security Teams",
        focus:
          "Continuous exposure monitoring, misconfiguration detection, and attack surface reduction.",
      },
      {
        emoji: "📋",
        role: "GRC & Compliance",
        focus: "Always-on control monitoring, automated evidence collection, and audit-ready reporting.",
      },
      {
        emoji: "💵",
        role: "FinOps & Finance",
        focus: "Cloud cost attribution, waste identification, and infrastructure spend optimization.",
      },
      {
        emoji: "🏢",
        role: "Executives",
        focus:
          "Real risk posture, operational readiness, and business-context insight — not dashboard noise.",
      },
    ],
  },
  comparison: {
    kicker: "Why Opticini",
    title: "The last tool you'll need to add",
    colOld: "Traditional Approach",
    colNew: "With Opticini",
    rows: [
      { old: "Siloed tools", new: "Unified insight platform" },
      { old: "Reactive alerts", new: "Continuous monitoring" },
      { old: "Point-in-time audits", new: "Always audit-ready" },
      { old: "Data overload", new: "Prioritized risk scores" },
      { old: "Manual evidence collection", new: "Automated proof" },
      { old: "Audit panic", new: "Compliance confidence" },
    ],
  },
  deploy: {
    kicker: "Deployment",
    title: "Works with your infrastructure, not against it",
    subtitle: "Agent-based or agentless. Your choice.",
    items: [
      { emoji: "🖥️", label: "On-Premise" },
      { emoji: "☁️", label: "Cloud (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "Hybrid" },
      { emoji: "📦", label: "Containers & K8s" },
      { emoji: "🔌", label: "APIs & Services" },
      { emoji: "🔑", label: "Identity Systems" },
      { emoji: "🌐", label: "Networks" },
    ],
  },
  finalCta: {
    title: "From visibility to confidence",
    body: "Opticini doesn't just show you data. It shows what matters, why it matters, and what to do next.",
    requestDemo: "Request Demo",
    footnote: "No credit card required · SOC 2 compliant · Enterprise-ready",
  },
}

export const FOOTER_EXTRA_EN = {
  landingCtaTitle: "Ready to bring clarity to your infrastructure?",
  landingCtaSubtitle:
    "Join teams using Opticini to unify visibility, compliance, and risk.",
  requestDemo: "Request Demo",
  brandTagline:
    "One platform for discovery, operations, security, compliance, cost, and risk.",
  copyrightLine: "© 2025 Opticini. All rights reserved.",
  colPlatform: "Platform",
  colCompany: "Company",
  colPartnerships: "Partnerships",
  colVerticals: "Verticals",
  colFrameworks: "Frameworks",
  linkAbout: "About",
  linkBlog: "Blog",
  linkRequestDemo: "Request Demo",
  linkContactSales: "Contact Sales",
  linkAffiliates: "Affiliates",
  linkConsultants: "Consultants",
  linkAuditPartners: "Audit Partners",
  linkTechnologyPartners: "Technology Partners",
  platformDiscovery: "Discovery",
  platformHealth: "Health",
  platformPerformance: "Performance",
  platformSecurity: "Security",
  platformConfiguration: "Configuration",
  platformCompliance: "Compliance",
  platformEvidence: "Evidence",
  platformChange: "Change",
  platformCost: "Cost",
  platformRisk: "Risk",
  verticalNonprofits: "Nonprofits",
  verticalStartups: "Startups",
  verticalSMB: "SMB",
  verticalGovernment: "Government",
  verticalHealthcare: "Healthcare",
  verticalFintech: "Fintech",
  verticalEducation: "Education",
  fwIso27002: "ISO/IEC 27002",
  fwHipaaRule: "HIPAA Security Rule",
  fwSoc2: "SOC 2",
  fwNist800: "NIST SP 800-53",
  fwNistCsf: "NIST Cybersecurity",
  fwIso27001: "ISO/IEC 27001",
  fwPciDss: "PCI DSS",
  fwCis: "CIS Critical Security",
}

export const NAV_EXTRA_EN = {
  allSystemsOperational: "All systems operational",
  talkToSales: "Talk to Sales",
  workspace: "Workspace",
}

export function ov(
  home: typeof HOME_EN,
  navigation: typeof NAV_EXTRA_EN,
  footer: typeof FOOTER_EXTRA_EN
): LandingOverlay {
  return {
    home: home as unknown as Record<string, unknown>,
    navigation,
    footer,
  }
}

export const HOME_ES = {
  hero: {
    badge: "Plataforma B2B de cumplimiento de infraestructura",
    title1: "Visibilidad completa.",
    title2: "Confianza total.",
    subtitle:
      "Una plataforma para descubrimiento, operaciones, seguridad, cumplimiento, costo y riesgo — en infraestructura local, híbrida y en la nube.",
    subline:
      "Sepa qué tiene · Sepa cómo rinde · Demuestre cumplimiento · Reduzca el riesgo",
    requestDemo: "Solicitar demo",
  },
  trust: {
    signals: [
      "Listo para SOC 2",
      "ISO 27001",
      "HIPAA",
      "PCI DSS",
      "Con o sin agente",
    ],
  },
  challenge: {
    kicker: "El reto",
    title: "La infraestructura moderna está fragmentada",
    body: "Sus herramientas no hablan entre sí — dejando lagunas de seguridad y cumplimiento invisibles hasta que es demasiado tarde.",
    cards: [
      { title: "Herramientas de monitorización", sub: "Solo muestran métricas de rendimiento" },
      { title: "Escáneres de seguridad", sub: "Solo muestran listas de vulnerabilidades" },
      { title: "Herramientas de cumplimiento", sub: "Solo muestran evidencia puntual" },
      { title: "Herramientas financieras", sub: "Solo muestran datos de coste desconectados" },
    ],
    alertTitle: "Ninguna habla con las demás.",
    alertBody:
      "Los equipos unen dashboards, capturas y hojas de cálculo — mientras el riesgo crece en silencio.",
  },
  solution: {
    kicker: "La solución Opticini",
    title: "Un plano de insight unificado",
    body: "Opticini sustituye decenas de herramientas desconectadas por una vista continua — mapeada a salud, seguridad, cumplimiento, coste y riesgo en tiempo real.",
    labels: [
      { emoji: "🖥️", label: "Infraestructura on-premise" },
      { emoji: "☁️", label: "Entornos cloud e híbridos" },
      { emoji: "🔌", label: "Apps, APIs e identidad" },
    ],
    banner:
      "Todo mapeado a salud, seguridad, cumplimiento, coste y riesgo — en tiempo real.",
  },
  platform: {
    kicker: "Plataforma",
    title: "10 planos de insight. Una plataforma.",
    body: "Cada plano está profundamente integrado — un cambio en un dominio se refleja al instante en los demás.",
    learnMore: "Saber más →",
    planes: [
      { slug: "discovery", emoji: "🔍", title: "Descubrimiento", tagline: "Sepa todo lo que existe" },
      { slug: "health", emoji: "💓", title: "Salud", tagline: "Sepa qué pasa — y qué está a punto de pasar" },
      { slug: "performance", emoji: "⚡", title: "Rendimiento", tagline: "Mida lo que importa a usuarios y equipos" },
      { slug: "security", emoji: "🔐", title: "Seguridad", tagline: "Vea el riesgo antes que los atacantes" },
      { slug: "configuration", emoji: "⚙️", title: "Configuración", tagline: "Evite el deterioro silencioso de la configuración" },
      { slug: "compliance", emoji: "📋", title: "Cumplimiento", tagline: "Siempre listo para auditoría, sin prisas de última hora" },
      { slug: "evidence", emoji: "📂", title: "Evidencia", tagline: "Sin capturas. Sin hojas de cálculo." },
      { slug: "change", emoji: "🔄", title: "Cambio", tagline: "Todo incidente empieza con un cambio" },
      { slug: "cost", emoji: "💰", title: "Coste", tagline: "Visibilidad antes de optimizar" },
      { slug: "risk", emoji: "⚠️", title: "Riesgo", tagline: "No todas las alertas son iguales" },
    ],
  },
  audiences: {
    kicker: "Hecho para equipos",
    title: "Los insights adecuados para cada stakeholder",
    items: [
      {
        emoji: "📊",
        role: "Operaciones de TI y SRE",
        focus:
          "Salud de la infraestructura, disponibilidad y rendimiento en tiempo real en toda su pila.",
      },
      {
        emoji: "🛡️",
        role: "Equipos de seguridad",
        focus:
          "Monitorización continua de exposición, detección de malas configuraciones y reducción de la superficie de ataque.",
      },
      {
        emoji: "📋",
        role: "GRC y cumplimiento",
        focus:
          "Controles siempre activos, recogida automática de evidencias e informes listos para auditoría.",
      },
      {
        emoji: "💵",
        role: "FinOps y finanzas",
        focus:
          "Atribución de costes cloud, identificación de desperdicio y optimización del gasto en infraestructura.",
      },
      {
        emoji: "🏢",
        role: "Ejecutivos",
        focus:
          "Postura de riesgo real, preparación operativa y contexto de negocio — no ruido de dashboards.",
      },
    ],
  },
  comparison: {
    kicker: "Por qué Opticini",
    title: "La última herramienta que necesitará añadir",
    colOld: "Enfoque tradicional",
    colNew: "Con Opticini",
    rows: [
      { old: "Herramientas aisladas", new: "Plataforma de insight unificada" },
      { old: "Alertas reactivas", new: "Monitorización continua" },
      { old: "Auditorías puntuales", new: "Siempre listo para auditoría" },
      { old: "Sobrecarga de datos", new: "Puntuaciones de riesgo priorizadas" },
      { old: "Recogida manual de evidencias", new: "Prueba automatizada" },
      { old: "Pánico de auditoría", new: "Confianza en el cumplimiento" },
    ],
  },
  deploy: {
    kicker: "Despliegue",
    title: "Funciona con su infraestructura, no en su contra",
    subtitle: "Con agente o sin agente. Usted elige.",
    items: [
      { emoji: "🖥️", label: "On-premise" },
      { emoji: "☁️", label: "Nube (AWS / GCP / Azure)" },
      { emoji: "🔀", label: "Híbrido" },
      { emoji: "📦", label: "Contenedores y K8s" },
      { emoji: "🔌", label: "APIs y servicios" },
      { emoji: "🔑", label: "Sistemas de identidad" },
      { emoji: "🌐", label: "Redes" },
    ],
  },
  finalCta: {
    title: "De la visibilidad a la confianza",
    body: "Opticini no solo muestra datos. Muestra qué importa, por qué importa y qué hacer a continuación.",
    requestDemo: "Solicitar demo",
    footnote: "Sin tarjeta de crédito · Compatible SOC 2 · Listo para empresas",
  },
}

export const FOOTER_EXTRA_ES = {
  landingCtaTitle: "¿Listo para dar claridad a su infraestructura?",
  landingCtaSubtitle:
    "Únase a equipos que usan Opticini para unificar visibilidad, cumplimiento y riesgo.",
  requestDemo: "Solicitar demo",
  brandTagline:
    "Una plataforma para descubrimiento, operaciones, seguridad, cumplimiento, coste y riesgo.",
  copyrightLine: "© 2025 Opticini. Todos los derechos reservados.",
  colPlatform: "Plataforma",
  colCompany: "Empresa",
  colPartnerships: "Alianzas",
  colVerticals: "Verticales",
  colFrameworks: "Marcos",
  linkAbout: "Acerca de",
  linkBlog: "Blog",
  linkRequestDemo: "Solicitar demo",
  linkContactSales: "Contactar ventas",
  linkAffiliates: "Afiliados",
  linkConsultants: "Consultores",
  linkAuditPartners: "Socios de auditoría",
  linkTechnologyPartners: "Socios tecnológicos",
  platformDiscovery: "Descubrimiento",
  platformHealth: "Salud",
  platformPerformance: "Rendimiento",
  platformSecurity: "Seguridad",
  platformConfiguration: "Configuración",
  platformCompliance: "Cumplimiento",
  platformEvidence: "Evidencia",
  platformChange: "Cambio",
  platformCost: "Coste",
  platformRisk: "Riesgo",
  verticalNonprofits: "Sin ánimo de lucro",
  verticalStartups: "Startups",
  verticalSMB: "PYME",
  verticalGovernment: "Gobierno",
  verticalHealthcare: "Sanidad",
  verticalFintech: "Fintech",
  verticalEducation: "Educación",
  fwIso27002: "ISO/IEC 27002",
  fwHipaaRule: "Regla de seguridad HIPAA",
  fwSoc2: "SOC 2",
  fwNist800: "NIST SP 800-53",
  fwNistCsf: "Ciberseguridad NIST",
  fwIso27001: "ISO/IEC 27001",
  fwPciDss: "PCI DSS",
  fwCis: "CIS Critical Security",
}

export const NAV_EXTRA_ES = {
  allSystemsOperational: "Todos los sistemas operativos",
  talkToSales: "Hablar con ventas",
  workspace: "Workspace",
}
