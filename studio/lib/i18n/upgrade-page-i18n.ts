import { deepMergePublicPages } from "./deep-merge-public-pages"
import { PUBLIC_PAGES_EN } from "./public-pages-en"
import { UPGRADE_PAGE_CJK_HE_PATCH_BY_LANG } from "./upgrade-page-i18n-cjk-he"

type UpgradePayload = { upgrade: typeof PUBLIC_PAGES_EN.upgrade }

const U = PUBLIC_PAGES_EN.upgrade as unknown as Record<string, unknown>

function mergeUpgrade(patch: Record<string, unknown>): typeof PUBLIC_PAGES_EN.upgrade {
  return deepMergePublicPages(U, patch) as unknown as typeof PUBLIC_PAGES_EN.upgrade
}

const EN: UpgradePayload = { upgrade: PUBLIC_PAGES_EN.upgrade }

const ES: UpgradePayload = {
  upgrade: mergeUpgrade({
    heroBadge: "Planes y precios",
    heroTitle: "Mejore su infraestructura de cumplimiento",
    heroSubtitle:
      "Pase de la gestión manual del cumplimiento a una plataforma de preparación para auditorías totalmente automatizada.",
    intro:
      "Opticini ayuda a los equipos a gestionar la visibilidad de la infraestructura, la recopilación de evidencias, el monitoreo de riesgos y la preparación para auditorías desde una sola plataforma. Ya sea su primer marco de cumplimiento o varios a la vez, Opticini escala con su organización.",
    whyTitle: "Por qué actualizar",
    whySub:
      "El cumplimiento actual exige más que hojas de cálculo y herramientas dispersas. Opticini ofrece una plataforma unificada que conecta:",
    whyBullets: [
      "Descubrimiento de infraestructura",
      "Monitorización de seguridad",
      "Marcos de cumplimiento",
      "Evidencias de auditoría",
      "Gestión de riesgos",
      "Flujos de gobierno",
    ],
    whyClosing:
      "Actualice su espacio de trabajo para desbloquear más automatización, informes y preparación para auditorías.",
    plansTitle: "Planes",
    plansSub: "Elija el plan que se adapte a las necesidades de su organización.",
    mostPopular: "Más popular",
    includesLabel: "Incluye",
    bestForLabel: "Ideal para",
    requestDemo: "Solicitar demo",
    plans: [
      {
        id: "starter",
        name: "Starter",
        tagline: "Ideal para equipos en fase inicial que comienzan su viaje de cumplimiento",
        description:
          "Starter ofrece las herramientas básicas para entender los activos de infraestructura y empezar a organizar los procesos de cumplimiento.",
        includes: [
          "Descubrimiento de infraestructura",
          "Inventario de activos",
          "Información básica de seguridad",
          "Espacio de trabajo de cumplimiento",
          "Biblioteca de políticas y controles",
          "Carga manual de evidencias",
          "Visibilidad en panel",
          "Un solo marco de cumplimiento",
        ],
        bestFor: [
          "Startups",
          "Preparación temprana de cumplimiento",
          "Equipos DevOps pequeños",
        ],
        closing:
          "Starter ayuda a los equipos a adoptar un enfoque estructurado del cumplimiento manteniendo la simplicidad.",
      },
      {
        id: "growth",
        name: "Growth",
        tagline: "Para organizaciones que se preparan activamente para auditorías de cumplimiento",
        description:
          "Growth amplía la plataforma con automatización e integraciones que agilizan la recopilación de evidencias y la monitorización del cumplimiento.",
        includes: [
          "Todo lo de Starter más",
          "Recopilación automatizada de evidencias",
          "Integraciones con plataformas de infraestructura",
          "Monitorización de configuración",
          "Seguimiento de riesgos",
          "Soporte multi-entorno",
          "Espacio de preparación para auditorías",
          "Informes de cumplimiento",
          "Marcos adicionales",
        ],
        bestFor: [
          "SaaS en crecimiento",
          "Preparación SOC 2 o ISO",
          "Equipos de seguridad que escalan",
        ],
        closing:
          "Growth permite ir más allá de los procesos manuales y operar con visibilidad continua del cumplimiento.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Para organizaciones con programas de cumplimiento maduros",
        description:
          "Business añade gobierno avanzado y flujos de trabajo que sostienen el cumplimiento continuo entre varios equipos.",
        includes: [
          "Todo lo de Growth más",
          "Flujos de prueba de controles",
          "Seguimiento de remediación",
          "Gestión de excepciones",
          "Paneles avanzados",
          "Gestión del ciclo de auditoría",
          "Controles de acceso por rol",
          "Herramientas de colaboración entre equipos",
        ],
        bestFor: [
          "Empresas con certificaciones anuales",
          "Equipos internos de cumplimiento",
          "Gobernanza multidisciplinar",
        ],
        closing:
          "Business está pensado para organizaciones con auditorías recurrentes y cumplimiento como programa continuo.",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "Para grandes organizaciones y entornos de cumplimiento complejos",
        description:
          "Enterprise ofrece todo el potencial de Opticini con personalización avanzada, integración e opciones de despliegue.",
        includes: [
          "Todo lo de Business más",
          "Arquitectura multi-organización",
          "Marcos de cumplimiento ilimitados",
          "Integraciones enterprise",
          "API y webhooks",
          "Inicio de sesión único (SSO / SAML)",
          "Informes personalizados",
          "Onboarding y soporte dedicados",
        ],
        bestFor: [
          "Grandes empresas",
          "Sectores regulados",
          "Organizaciones con varias filiales",
        ],
        closing:
          "Enterprise permite operar el cumplimiento en entornos de infraestructura globales.",
      },
    ],
    consultantTitle: "Programa para consultores y auditores",
    consultantLead: "Haga crecer su práctica de cumplimiento con Opticini",
    consultantBody:
      "Opticini se asocia con consultores, auditores y firmas de asesoría para ayudar a sus clientes a alcanzar el cumplimiento más rápido y con mayor eficacia. Con el programa de consultores de Opticini, los socios pueden:",
    consultantBullets: [
      "Incorporar a sus propios clientes",
      "Gestionar varias organizaciones desde un espacio unificado",
      "Realizar evaluaciones de preparación para el cumplimiento",
      "Preparar a los clientes para auditorías formales",
    ],
    consultantClosing:
      "Los consultores reciben ingresos por afiliación por las suscripciones de los clientes y pueden prestar sus servicios de asesoramiento directamente en la plataforma. Este modelo permite escalar la práctica mientras los clientes obtienen una plataforma moderna de gestión del cumplimiento.",
    learnPartner: "Conozca el programa para partners",
    implementationTitle: "Implementación y asesoramiento",
    implementationIntro:
      "Muchas organizaciones se benefician de orientación experta al implementar marcos de cumplimiento. Opticini ofrece servicios opcionales de implementación que incluyen:",
    implementationServices: [
      "Configuración del marco de cumplimiento",
      "Integraciones de infraestructura",
      "Mapeo de políticas y controles",
      "Preparación para la auditoría",
    ],
    implementationClosing:
      "Estos servicios ayudan a los equipos a operar con eficacia en la plataforma desde el primer día.",
    finalCtaTitle: "Comience hoy su viaje de cumplimiento con Opticini",
    finalCtaSub:
      "Elija el plan adecuado para su organización y construya un programa de cumplimiento estructurado y escalable.",
    seePlatform: "Ver la plataforma",
  }),
}

const FR: UpgradePayload = {
  upgrade: mergeUpgrade({
    heroBadge: "Offres et tarifs",
    heroTitle: "Renforcez votre infrastructure de conformité",
    heroSubtitle:
      "Passez d'une gestion manuelle de la conformité à une plateforme d'audit entièrement automatisée.",
    intro:
      "Opticini aide les équipes à gérer la visibilité infrastructure, la collecte de preuves, la surveillance des risques et la préparation aux audits depuis une seule plateforme. Premier cadre ou multiples environnements, Opticini s'adapte à votre organisation.",
    whyTitle: "Pourquoi passer à un niveau supérieur",
    whySub:
      "La conformité exige plus que des tableurs et des outils épars. Opticini unifie :",
    whyBullets: [
      "Découverte d'infrastructure",
      "Surveillance de la sécurité",
      "Cadres de conformité",
      "Preuves d'audit",
      "Gestion des risques",
      "Flux de gouvernance",
    ],
    whyClosing:
      "Passez à un workspace supérieur pour débloquer plus d'automatisation, de reporting et de préparation aux audits.",
    plansTitle: "Offres",
    plansSub: "Choisissez l'offre adaptée aux besoins de votre organisation.",
    mostPopular: "Le plus populaire",
    includesLabel: "Comprend",
    bestForLabel: "Idéal pour",
    requestDemo: "Demander une démo",
    plans: [
      {
        id: "starter",
        name: "Starter",
        tagline: "Pour les équipes en démarrage qui débutent leur parcours conformité",
        description:
          "Starter fournit les fondations pour comprendre les actifs infrastructure et structurer les processus conformité.",
        includes: [
          "Découverte d'infrastructure",
          "Inventaire des actifs",
          "Insights sécurité de base",
          "Espace de travail conformité",
          "Bibliothèque politiques et contrôles",
          "Téléversement manuel de preuves",
          "Visibilité tableau de bord",
          "Un cadre de conformité",
        ],
        bestFor: ["Startups", "Première préparation conformité", "Petites équipes DevOps"],
        closing:
          "Starter aide à structurer la conformité tout en restant simple.",
      },
      {
        id: "growth",
        name: "Growth",
        tagline: "Pour les organisations qui préparent activement des audits",
        description:
          "Growth enrichit la plateforme d'automatisation et d'intégrations pour fluidifier preuves et suivi conformité.",
        includes: [
          "Tout Starter plus",
          "Collecte automatisée de preuves",
          "Intégrations plateformes infrastructure",
          "Surveillance de configuration",
          "Suivi des risques",
          "Multi-environnements",
          "Espace préparation audit",
          "Reporting conformité",
          "Cadres supplémentaires",
        ],
        bestFor: ["SaaS en croissance", "Préparation SOC 2 ou ISO", "Équipes sécurité qui montent en charge"],
        closing:
          "Growth permet de dépasser le manuel et d'opérer avec une visibilité conformité continue.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Pour les programmes de conformité matures",
        description:
          "Business ajoute gouvernance avancée et workflows pour un conformité continue multi-équipes.",
        includes: [
          "Tout Growth plus",
          "Workflows de test des contrôles",
          "Suivi des remédiations",
          "Gestion des exceptions",
          "Tableaux de bord avancés",
          "Cycle de vie d'audit",
          "Contrôles d'accès par rôle",
          "Outils de collaboration",
        ],
        bestFor: [
          "Entreprises avec certifications annuelles",
          "Équipes conformité internes",
          "Gouvernance multi-départements",
        ],
        closing:
          "Business convient aux audits récurrents et à la conformité comme programme continu.",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "Pour les grands groupes et environnements complexes",
        description:
          "Enterprise déploie toute la puissance d'Opticini avec personnalisation, intégration et déploiement avancés.",
        includes: [
          "Tout Business plus",
          "Architecture multi-organisation",
          "Cadres de conformité illimités",
          "Intégrations entreprise",
          "API et webhooks",
          "SSO / SAML",
          "Reporting personnalisé",
          "Onboarding et support dédiés",
        ],
        bestFor: ["Grandes entreprises", "Secteurs réglementés", "Organisations multi-filiales"],
        closing:
          "Enterprise permet d'opérer la conformité à l'échelle mondiale.",
      },
    ],
    consultantTitle: "Programme consultants et auditeurs",
    consultantLead: "Développez votre pratique conformité avec Opticini",
    consultantBody:
      "Opticini s'associe aux cabinets et auditeurs pour aider leurs clients à aller plus vite. Avec le programme partenaire, vous pouvez :",
    consultantBullets: [
      "Onboarder vos clients",
      "Gérer plusieurs organisations depuis un espace unique",
      "Réaliser des évaluations de préparation",
      "Préparer les clients aux audits formels",
    ],
    consultantClosing:
      "Les consultants perçoivent des revenus d'affiliation et peuvent livrer leurs conseils sur la plateforme, pour scaler tout en offrant une solution moderne.",
    learnPartner: "Découvrir le programme partenaire",
    implementationTitle: "Implementation et conseil",
    implementationIntro:
      "Beaucoup d'organisations bénéficient d'un accompagnement expert. Opticini propose des services optionnels :",
    implementationServices: [
      "Configuration des cadres conformité",
      "Intégrations infrastructure",
      "Cartographie politiques et contrôles",
      "Préparation audit",
    ],
    implementationClosing:
      "Ces services permettent d'être opérationnel efficacement dès le premier jour.",
    finalCtaTitle: "Démarrez votre parcours conformité avec Opticini",
    finalCtaSub:
      "Choisissez l'offre adaptée et construisez un programme conformité structuré et scalable.",
    seePlatform: "Voir la plateforme",
  }),
}

const DE: UpgradePayload = {
  upgrade: mergeUpgrade({
    heroBadge: "Pläne & Preise",
    heroTitle: "Compliance-Infrastruktur ausbauen",
    heroSubtitle:
      "Von manuellem Compliance-Management zu einer voll automatisierten Audit-Readiness-Plattform.",
    intro:
      "Opticini hilft Teams, Infrastruktur-Sichtbarkeit, Belegsammlung, Risikoüberwachung und Auditvorbereitung von einer Plattform aus zu steuern – ob erster Rahmen oder mehrere Umgebungen, Opticini skaliert mit Ihrer Organisation.",
    whyTitle: "Warum upgraden",
    whySub:
      "Compliance braucht mehr als Tabellen und verstreute Tools. Opticini verbindet:",
    whyBullets: [
      "Infrastruktur-Erkennung",
      "Sicherheitsüberwachung",
      "Compliance-Rahmenwerke",
      "Audit-Nachweise",
      "Risikomanagement",
      "Governance-Workflows",
    ],
    whyClosing:
      "Upgraden Sie Ihren Workspace für mehr Automatisierung, Reporting und Auditvorbereitung.",
    plansTitle: "Pläne",
    plansSub: "Wählen Sie den Plan, der zu Ihrer Organisation passt.",
    mostPopular: "Am beliebtesten",
    includesLabel: "Umfasst",
    bestForLabel: "Ideal für",
    requestDemo: "Demo anfragen",
    plans: [
      {
        id: "starter",
        name: "Starter",
        tagline: "Für frühe Teams am Beginn der Compliance-Reise",
        description:
          "Starter liefert Grundlagen, um Infrastruktur-Assets zu verstehen und Compliance-Prozesse zu strukturieren.",
        includes: [
          "Infrastruktur-Erkennung",
          "Asset-Inventar",
          "Grundlegende Sicherheitseinblicke",
          "Compliance-Arbeitsbereich",
          "Richtlinien- und Kontrollbibliothek",
          "Manuelle Beleg-Uploads",
          "Dashboard-Sichtbarkeit",
          "Ein Compliance-Rahmenwerk",
        ],
        bestFor: ["Startups", "Frühe Compliance-Vorbereitung", "Kleine DevOps-Teams"],
        closing:
          "Starter hilft, Compliance strukturiert und dennoch einfach anzugehen.",
      },
      {
        id: "growth",
        name: "Growth",
        tagline: "Für Organisationen in aktiver Auditvorbereitung",
        description:
          "Growth erweitert die Plattform um Automatisierung und Integrationen für Belegsammlung und Compliance-Monitoring.",
        includes: [
          "Alles aus Starter plus",
          "Automatisierte Belegsammlung",
          "Integrationen mit Infrastrukturplattformen",
          "Konfigurationsüberwachung",
          "Risikoverfolgung",
          "Multi-Umgebung",
          "Auditvorbereitungs-Workspace",
          "Compliance-Reporting",
          "Zusätzliche Rahmenwerke",
        ],
        bestFor: ["Wachsende SaaS-Unternehmen", "SOC-2- oder ISO-Vorbereitung", "Skalierende Security-Teams"],
        closing:
          "Growth ermöglicht über manuelle Prozesse hinaus mit kontinuierlicher Compliance-Sichtbarkeit zu arbeiten.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Für ausgereifte Compliance-Programme",
        description:
          "Business fügt erweiterte Governance und Workflows für laufendes Compliance-Betriebs über Teams hinweg hinzu.",
        includes: [
          "Alles aus Growth plus",
          "Kontrolltest-Workflows",
          "Remediation-Tracking",
          "Ausnahmemanagement",
          "Erweiterte Dashboards",
          "Audit-Lebenszyklus",
          "Rollenbasierte Zugriffe",
          "Team-Kollaboration",
        ],
        bestFor: [
          "Unternehmen mit jährlichen Zertifizierungen",
          "Interne Compliance-Teams",
          "Multi-Abteilungs-Governance",
        ],
        closing:
          "Business ist für wiederkehrende Audits und Compliance als Dauerprogramm gedacht.",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "Für Großorganisationen und komplexe Umgebungen",
        description:
          "Enterprise bietet die volle Opticini-Leistung mit erweiterter Anpassung, Integration und Deployment.",
        includes: [
          "Alles aus Business plus",
          "Multi-Organisations-Architektur",
          "Unbegrenzte Compliance-Rahmenwerke",
          "Enterprise-Integrationen",
          "API und Webhooks",
          "SSO / SAML",
          "Individuelles Reporting",
          "Dediziertes Onboarding und Support",
        ],
        bestFor: ["Großunternehmen", "Regulierte Branchen", "Multi-Tochter-Gesellschaften"],
        closing:
          "Enterprise ermöglicht Compliance über globale Infrastrukturen hinweg.",
      },
    ],
    consultantTitle: "Berater- und Auditor-Programm",
    consultantLead: "Wachsen Sie Ihre Compliance-Praxis mit Opticini",
    consultantBody:
      "Opticini arbeitet mit Beratern, Auditoren und Beratungsfirmen zusammen. Partner können:",
    consultantBullets: [
      "Eigene Kunden onboarden",
      "Mehrere Organisationen aus einem Workspace verwalten",
      "Compliance-Readiness-Bewertungen durchführen",
      "Kunden auf formelle Audits vorbereiten",
    ],
    consultantClosing:
      "Berater erhalten Affiliate-Einnahmen und können Beratung direkt über die Plattform liefern – skalierbar mit moderner Compliance-Plattform.",
    learnPartner: "Partnerprogramm entdecken",
    implementationTitle: "Implementierung & Beratung",
    implementationIntro:
      "Viele Organisationen profitieren von Expertenbegleitung. Opticini bietet optionale Implementierungsleistungen:",
    implementationServices: [
      "Konfiguration eines Compliance-Rahmens",
      "Infrastruktur-Integrationen",
      "Policy- und Kontroll-Mapping",
      "Auditvorbereitung",
    ],
    implementationClosing:
      "So können Teams von Tag eins effektiv arbeiten.",
    finalCtaTitle: "Starten Sie heute Ihre Compliance-Reise mit Opticini",
    finalCtaSub:
      "Wählen Sie den passenden Plan und bauen Sie ein strukturiertes, skalierbares Compliance-Programm auf.",
    seePlatform: "Plattform ansehen",
  }),
}

const IT: UpgradePayload = {
  upgrade: mergeUpgrade({
    heroBadge: "Piani e prezzi",
    heroTitle: "Potenziate l'infrastruttura di conformità",
    heroSubtitle:
      "Passate dalla gestione manuale della conformità a una piattaforma di audit readiness completamente automatizzata.",
    intro:
      "Opticini aiuta i team a gestire visibilità infrastrutturale, raccolta evidenzia, monitoraggio rischi e preparazione agli audit da un'unica piattaforma. Primo framework o più ambienti, Opticini scala con la vostra organizzazione.",
    whyTitle: "Perché aggiornare",
    whySub:
      "La conformità richiede più di fogli e strumenti sparsi. Opticini unifica:",
    whyBullets: [
      "Discovery infrastruttura",
      "Monitoraggio sicurezza",
      "Framework di conformità",
      "Evidenze di audit",
      "Gestione rischi",
      "Workflow di governance",
    ],
    whyClosing:
      "Aggiornate il workspace per sbloccare più automazione, reporting e preparazione agli audit.",
    plansTitle: "Piani",
    plansSub: "Scegliete il piano adatto alle esigenze della vostra organizzazione.",
    mostPopular: "Più popolare",
    includesLabel: "Include",
    bestForLabel: "Ideale per",
    requestDemo: "Richiedi demo",
    plans: [
      {
        id: "starter",
        name: "Starter",
        tagline: "Per team alle prime fasi del percorso di conformità",
        description:
          "Starter offre gli strumenti fondamentali per comprendere gli asset e organizzare i processi di conformità.",
        includes: [
          "Discovery infrastruttura",
          "Inventario asset",
          "Insight sicurezza di base",
          "Workspace di conformità",
          "Libreria policy e controlli",
          "Caricamento manuale evidenze",
          "Visibilità dashboard",
          "Un solo framework di conformità",
        ],
        bestFor: ["Startup", "Prime preparazioni alla conformità", "Piccoli team DevOps"],
        closing:
          "Starter aiuta a stabilire un approccio strutturato mantenendo semplicità.",
      },
      {
        id: "growth",
        name: "Growth",
        tagline: "Per organizzazioni che si preparano attivamente agli audit",
        description:
          "Growth espande la piattaforma con automazione e integrazioni per evidenze e monitoraggio della conformità.",
        includes: [
          "Tutto Starter più",
          "Raccolta evidenze automatizzata",
          "Integrazioni con piattaforme infrastrutturali",
          "Monitoraggio configurazione",
          "Tracciamento rischi",
          "Supporto multi-ambiente",
          "Workspace preparazione audit",
          "Reporting conformità",
          "Framework aggiuntivi",
        ],
        bestFor: ["SaaS in crescita", "Preparazione SOC 2 o ISO", "Team security in scala"],
        closing:
          "Growth permette di andare oltre i processi manuali con visibilità continua sulla conformità.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Per programmi di conformità maturi",
        description:
          "Business introduce governance avanzata e workflow per operazioni di conformità continue tra più team.",
        includes: [
          "Tutto Growth più",
          "Workflow test dei controlli",
          "Tracciamento remediation",
          "Gestione eccezioni",
          "Dashboard avanzate",
          "Gestione ciclo di vita audit",
          "Controlli accesso basati su ruolo",
          "Strumenti collaborazione cross-team",
        ],
        bestFor: [
          "Aziende con certificazioni annuali",
          "Team interni di conformità",
          "Governance multi-dipartimento",
        ],
        closing:
          "Business è pensato per audit ricorrenti e conformità come programma continuo.",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "Per grandi organizzazioni e ambienti complessi",
        description:
          "Enterprise offre tutta la potenza di Opticini con personalizzazione, integrazione e deployment avanzati.",
        includes: [
          "Tutto Business più",
          "Architettura multi-organizzazione",
          "Framework di conformità illimitati",
          "Integrazioni enterprise",
          "API e webhook",
          "SSO / SAML",
          "Reporting personalizzato",
          "Onboarding e supporto dedicati",
        ],
        bestFor: ["Grandi imprese", "Settori regolamentati", "Organizzazioni multi-sussidiaria"],
        closing:
          "Enterprise consente di operare la conformità su infrastrutture globali.",
      },
    ],
    consultantTitle: "Programma consulenti e revisori",
    consultantLead: "Fate crescere la vostra pratica di conformità con Opticini",
    consultantBody:
      "Opticini collabora con consulenti, revisori e firm di advisory. I partner possono:",
    consultantBullets: [
      "Onboardare i propri clienti",
      "Gestire più organizzazioni da un workspace unificato",
      "Eseguire valutazioni di readiness",
      "Preparare i clienti agli audit formali",
    ],
    consultantClosing:
      "I consulenti ricevono ricavi affiliate e possono erogare servizi sulla piattaforma, scalando con una soluzione moderna.",
    learnPartner: "Scopri il programma partner",
    implementationTitle: "Implementazione e advisory",
    implementationIntro:
      "Molte organizzazioni beneficiano di una guida esperta. Opticini offre servizi opzionali:",
    implementationServices: [
      "Configurazione framework di conformità",
      "Integrazioni infrastrutturali",
      "Mappatura policy e controlli",
      "Preparazione audit",
    ],
    implementationClosing:
      "Così i team possono operare efficacemente fin dal primo giorno.",
    finalCtaTitle: "Iniziate oggi il percorso di conformità con Opticini",
    finalCtaSub:
      "Scegliete il piano giusto e costruite un programma di conformità strutturato e scalabile.",
    seePlatform: "Vedi la piattaforma",
  }),
}

const PT: UpgradePayload = {
  upgrade: mergeUpgrade({
    heroBadge: "Planos e preços",
    heroTitle: "Potencie a sua infraestrutura de conformidade",
    heroSubtitle:
      "Passe da gestão manual da conformidade para uma plataforma de prontidão para auditorias totalmente automatizada.",
    intro:
      "A Opticini ajuda as equipas a gerir visibilidade da infraestrutura, recolha de evidências, monitorização de riscos e preparação para auditorias numa única plataforma. Primeiro quadro ou vários ambientes, a Opticini escala com a sua organização.",
    whyTitle: "Porquê atualizar",
    whySub:
      "A conformidade exige mais do que folhas de cálculo e ferramentas dispersas. A Opticini unifica:",
    whyBullets: [
      "Descoberta de infraestrutura",
      "Monitorização de segurança",
      "Quadros de conformidade",
      "Evidências de auditoria",
      "Gestão de riscos",
      "Fluxos de governação",
    ],
    whyClosing:
      "Atualize o seu espaço de trabalho para desbloquear mais automatização, relatórios e preparação para auditorias.",
    plansTitle: "Planos",
    plansSub: "Escolha o plano que corresponde às necessidades da sua organização.",
    mostPopular: "Mais popular",
    includesLabel: "Inclui",
    bestForLabel: "Ideal para",
    requestDemo: "Pedir demonstração",
    plans: [
      {
        id: "starter",
        name: "Starter",
        tagline: "Perfeito para equipas em fase inicial na jornada de conformidade",
        description:
          "O Starter fornece as ferramentas fundamentais para compreender ativos de infraestrutura e organizar processos de conformidade.",
        includes: [
          "Descoberta de infraestrutura",
          "Inventário de ativos",
          "Informação básica de segurança",
          "Espaço de trabalho de conformidade",
          "Biblioteca de políticas e controlos",
          "Carregamento manual de evidências",
          "Visibilidade no painel",
          "Um único quadro de conformidade",
        ],
        bestFor: ["Startups", "Preparação inicial de conformidade", "Equipas DevOps pequenas"],
        closing:
          "O Starter ajuda a adotar uma abordagem estruturada mantendo simplicidade.",
      },
      {
        id: "growth",
        name: "Growth",
        tagline: "Para organizações a preparar-se ativamente para auditorias",
        description:
          "O Growth amplia a plataforma com automatização e integrações que agilizam a recolha de evidências e a monitorização.",
        includes: [
          "Tudo do Starter mais",
          "Recolha automatizada de evidências",
          "Integrações com plataformas de infraestrutura",
          "Monitorização de configuração",
          "Acompanhamento de riscos",
          "Suporte multi-ambiente",
          "Espaço de preparação para auditorias",
          "Relatórios de conformidade",
          "Quadros adicionais",
        ],
        bestFor: ["SaaS em crescimento", "Preparação SOC 2 ou ISO", "Equipas de segurança a escalar"],
        closing:
          "O Growth permite ir além dos processos manuais com visibilidade contínua da conformidade.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Para programas de conformidade maduros",
        description:
          "O Business introduz governação avançada e fluxos de trabalho para conformidade contínua entre várias equipas.",
        includes: [
          "Tudo do Growth mais",
          "Fluxos de teste de controlos",
          "Acompanhamento de remediação",
          "Gestão de exceções",
          "Painéis avançados",
          "Gestão do ciclo de vida da auditoria",
          "Controlos de acesso por função",
          "Ferramentas de colaboração entre equipas",
        ],
        bestFor: [
          "Empresas com certificações anuais",
          "Equipas internas de conformidade",
          "Governança multidisciplinar",
        ],
        closing:
          "O Business destina-se a auditorias recorrentes e conformidade como programa contínuo.",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "Para grandes organizações e ambientes complexos",
        description:
          "O Enterprise oferece a plena potência da Opticini com personalização, integração e opções de implementação avançadas.",
        includes: [
          "Tudo do Business mais",
          "Arquitetura multi-organização",
          "Quadros de conformidade ilimitados",
          "Integrações enterprise",
          "API e webhooks",
          "SSO / SAML",
          "Relatórios personalizados",
          "Onboarding e suporte dedicados",
        ],
        bestFor: ["Grandes empresas", "Setores regulados", "Organizações com várias subsidiárias"],
        closing:
          "O Enterprise permite operar a conformidade em ambientes de infraestrutura globais.",
      },
    ],
    consultantTitle: "Programa para consultores e auditores",
    consultantLead: "Faça crescer a sua prática de conformidade com a Opticini",
    consultantBody:
      "A Opticini associa-se a consultores, auditores e firmas de advisory para ajudar os clientes a alcançar a conformidade mais depressa. Os parceiros podem:",
    consultantBullets: [
      "Integrar os seus próprios clientes",
      "Gerir várias organizações a partir de um espaço unificado",
      "Realizar avaliações de prontidão",
      "Preparar clientes para auditorias formais",
    ],
    consultantClosing:
      "Os consultores recebem receitas de afiliação e podem prestar serviços de advisory diretamente na plataforma, escalando com uma solução moderna.",
    learnPartner: "Saiba mais sobre o programa de parceiros",
    implementationTitle: "Implementação e assessoria",
    implementationIntro:
      "Muitas organizações beneficiam de orientação especializada. A Opticini oferece serviços opcionais de implementação:",
    implementationServices: [
      "Configuração do quadro de conformidade",
      "Integrações de infraestrutura",
      "Mapeamento de políticas e controlos",
      "Preparação para auditoria",
    ],
    implementationClosing:
      "Estes serviços garantem que as equipas possam operar eficazmente desde o primeiro dia.",
    finalCtaTitle: "Comece hoje a sua jornada de conformidade com a Opticini",
    finalCtaSub:
      "Escolha o plano certo e construa um programa de conformidade estruturado e escalável.",
    seePlatform: "Ver a plataforma",
  }),
}

const RU: UpgradePayload = {
  upgrade: mergeUpgrade({
    heroBadge: "Тарифы",
    heroTitle: "Развивайте инфраструктуру комплаенса",
    heroSubtitle:
      "Перейдите от ручного управления комплаенсом к полностью автоматизированной готовности к аудиту.",
    intro:
      "Opticini помогает командам управлять видимостью инфраструктуры, сбором доказательств, мониторингом рисков и подготовкой к аудитам с одной платформы — первый фреймворк или несколько сред, Opticini масштабируется вместе с организацией.",
    whyTitle: "Зачем переходить на новый уровень",
    whySub:
      "Современный комплаенс требует больше, чем таблицы и разрозненные инструменты. Opticini объединяет:",
    whyBullets: [
      "Обнаружение инфраструктуры",
      "Мониторинг безопасности",
      "Рамки комплаенса",
      "Аудиторские доказательства",
      "Управление рисками",
      "Процессы управления",
    ],
    whyClosing:
      "Обновите рабочее пространство для большей автоматизации, отчётности и готовности к аудиту.",
    plansTitle: "Тарифы",
    plansSub: "Выберите план под задачи организации.",
    mostPopular: "Популярный",
    includesLabel: "Включает",
    bestForLabel: "Подходит для",
    requestDemo: "Запросить демо",
    plans: [
      {
        id: "starter",
        name: "Starter",
        tagline: "Для команд на старте пути комплаенса",
        description:
          "Starter даёт базовые инструменты для понимания активов и организации процессов комплаенса.",
        includes: [
          "Обнаружение инфраструктуры",
          "Инвентаризация активов",
          "Базовые сведения о безопасности",
          "Рабочее пространство комплаенса",
          "Библиотека политик и контролей",
          "Ручная загрузка доказательств",
          "Видимость на дашборде",
          "Один фреймворк комплаенса",
        ],
        bestFor: ["Стартапы", "Ранняя подготовка к комплаенсу", "Небольшие DevOps-команды"],
        closing:
          "Starter помогает выстроить структурированный подход, оставаясь простым.",
      },
      {
        id: "growth",
        name: "Growth",
        tagline: "Для организаций, активно готовящихся к аудитам",
        description:
          "Growth расширяет платформу автоматизацией и интеграциями для сбора доказательств и мониторинга.",
        includes: [
          "Всё из Starter плюс",
          "Автоматический сбор доказательств",
          "Интеграции с платформами инфраструктуры",
          "Мониторинг конфигураций",
          "Отслеживание рисков",
          "Несколько сред",
          "Пространство подготовки к аудиту",
          "Отчётность по комплаенсу",
          "Дополнительные фреймворки",
        ],
        bestFor: ["Растущий SaaS", "Подготовка SOC 2 или ISO", "Масштабируемые команды безопасности"],
        closing:
          "Growth выводит за пределы ручных процессов с непрерывной видимостью комплаенса.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Для зрелых программ комплаенса",
        description:
          "Business добавляет продвинутое управление и процессы для непрерывного комплаенса между командами.",
        includes: [
          "Всё из Growth плюс",
          "Процессы тестирования контролей",
          "Отслеживание устранения",
          "Управление исключениями",
          "Расширенные дашборды",
          "Управление жизненным циклом аудита",
          "Ролевой доступ",
          "Инструменты совместной работы",
        ],
        bestFor: [
          "Компании с ежегодными сертификациями",
          "Внутренние команды комплаенса",
          "Межотдельное управление",
        ],
        closing:
          "Business для повторяющихся аудитов и комплаенса как постоянной программы.",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "Для крупных организаций и сложных сред",
        description:
          "Enterprise раскрывает полную мощь Opticini с расширенной настройкой, интеграцией и развёртыванием.",
        includes: [
          "Всё из Business плюс",
          "Мультиорганизационная архитектура",
          "Неограниченное число фреймворков",
          "Корпоративные интеграции",
          "API и вебхуки",
          "SSO / SAML",
          "Пользовательская отчётность",
          "Выделенный онбординг и поддержка",
        ],
        bestFor: ["Крупный бизнес", "Регулируемые отрасли", "Холдинги с дочерними компаниями"],
        closing:
          "Enterprise для комплаенса в глобальных инфраструктурах.",
      },
    ],
    consultantTitle: "Программа для консультантов и аудиторов",
    consultantLead: "Развивайте практику комплаенса с Opticini",
    consultantBody:
      "Opticini сотрудничает с консультантами, аудиторами и advisory. Партнёры могут:",
    consultantBullets: [
      "Подключать своих клиентов",
      "Управлять несколькими организациями из одного пространства",
      "Проводить оценки готовности",
      "Готовить клиентов к формальным аудитам",
    ],
    consultantClosing:
      "Консультанты получают партнёрские выплаты и могут оказывать услуги на платформе, масштабируя практику.",
    learnPartner: "О программе для партнёров",
    implementationTitle: "Внедрение и консалтинг",
    implementationIntro:
      "Многим организациям нужна экспертная поддержка. Opticini предлагает опциональные услуги внедрения:",
    implementationServices: [
      "Настройка фреймворка комплаенса",
      "Интеграции инфраструктуры",
      "Маппинг политик и контролей",
      "Подготовка к аудиту",
    ],
    implementationClosing:
      "Команды могут эффективно работать с первого дня.",
    finalCtaTitle: "Начните путь комплаенса с Opticini уже сегодня",
    finalCtaSub:
      "Выберите подходящий план и постройте структурированную масштабируемую программу.",
    seePlatform: "Смотреть платформу",
  }),
}

const SV: UpgradePayload = {
  upgrade: mergeUpgrade({
    heroBadge: "Planer & priser",
    heroTitle: "Uppgradera er compliance-infrastruktur",
    heroSubtitle:
      "Gå från manuell compliance-hantering till en fullt automatiserad plattform för audit readiness.",
    intro:
      "Opticini hjälper team att hantera infrastruktursynlighet, bevisinsamling, riskövervakning och auditförberedelse från en plattform – första ramverket eller flera miljöer, Opticini skalar med er organisation.",
    whyTitle: "Varför uppgradera",
    whySub:
      "Compliance kräver mer än kalkylark och utspridda verktyg. Opticini förenar:",
    whyBullets: [
      "Infrastrukturupptäckt",
      "Säkerhetsövervakning",
      "Compliance-ramverk",
      "Auditbevis",
      "Riskhantering",
      "Styrningsflöden",
    ],
    whyClosing:
      "Uppgradera arbetsytan för mer automatisering, rapportering och auditberedskap.",
    plansTitle: "Planer",
    plansSub: "Välj den plan som passar er organisations behov.",
    mostPopular: "Mest populär",
    includesLabel: "Inkluderar",
    bestForLabel: "Bäst för",
    requestDemo: "Begär demo",
    plans: [
      {
        id: "starter",
        name: "Starter",
        tagline: "Perfekt för tidiga team som börjar sin compliance-resa",
        description:
          "Starter ger grundverktyg för att förstå tillgångar och strukturera compliance-processer.",
        includes: [
          "Infrastrukturupptäckt",
          "Tillgångsinventering",
          "Grundläggande säkerhetsinsikter",
          "Compliance-arbetsyta",
          "Policy- och kontrollbibliotek",
          "Manuella bevisuppladdningar",
          "Dashboard-synlighet",
          "Ett compliance-ramverk",
        ],
        bestFor: ["Startups", "Tidig compliance-förberedelse", "Små DevOps-team"],
        closing:
          "Starter hjälper till med strukturerat förhållningssätt med enkelhet.",
      },
      {
        id: "growth",
        name: "Growth",
        tagline: "För organisationer som aktivt förbereder revisioner",
        description:
          "Growth utökar plattformen med automation och integrationer för bevis och övervakning.",
        includes: [
          "Allt i Starter plus",
          "Automatiserad bevisinsamling",
          "Integrationer med infrastrukturplattformar",
          "Konfigurationsövervakning",
          "Riskspårning",
          "Multi-miljö",
          "Auditförberedelse-arbetsyta",
          "Compliance-rapportering",
          "Ytterligare ramverk",
        ],
        bestFor: ["Växande SaaS", "SOC 2- eller ISO-förberedelse", "Skalande säkerhetsteam"],
        closing:
          "Growth tar er förbi manuella processer med kontinuerlig compliance-synlighet.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "För mogna compliance-program",
        description:
          "Business lägger till avancerad styrning och arbetsflöden för löpande compliance över team.",
        includes: [
          "Allt i Growth plus",
          "Kontrolltestningsflöden",
          "Remediation-spårning",
          "Undantagshantering",
          "Avancerade dashboards",
          "Audit-livscykelhantering",
          "Rollbaserad åtkomst",
          "Samarbetsverktyg",
        ],
        bestFor: [
          "Företag med årliga certifieringar",
          "Interna compliance-team",
          "Multi-avdelningsstyrning",
        ],
        closing:
          "Business är för återkommande revisioner och compliance som kontinuerligt program.",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "För stora organisationer och komplexa miljöer",
        description:
          "Enterprise ger full Opticini-kraft med avancerad anpassning, integration och driftsättning.",
        includes: [
          "Allt i Business plus",
          "Multi-organisationsarkitektur",
          "Obegränsade compliance-ramverk",
          "Enterprise-integrationer",
          "API och webhooks",
          "SSO / SAML",
          "Anpassad rapportering",
          "Dedikerad onboarding och support",
        ],
        bestFor: ["Stora företag", "Reglerade branscher", "Multi-dotterbolag"],
        closing:
          "Enterprise möjliggör compliance över global infrastruktur.",
      },
    ],
    consultantTitle: "Konsult- och revisorprogram",
    consultantLead: "Väx er compliance-praktik med Opticini",
    consultantBody:
      "Opticini samarbetar med konsulter, revisorer och rådgivare. Partners kan:",
    consultantBullets: [
      "Onboarda egna kunder",
      "Hantera flera organisationer från en yta",
      "Genomföra readiness-bedömningar",
      "Förbereda kunder för formella revisioner",
    ],
    consultantClosing:
      "Konsulter får affiliate-intäkter och kan leverera rådgivning via plattformen.",
    learnPartner: "Läs om partnerprogrammet",
    implementationTitle: "Implementering & rådgivning",
    implementationIntro:
      "Många organisationer behöver expertstöd. Opticini erbjuder valfria implementeringstjänster:",
    implementationServices: [
      "Konfiguration av compliance-ramverk",
      "Infrastrukturintegrationer",
      "Policy- och kontrollmappning",
      "Auditförberedelse",
    ],
    implementationClosing:
      "Så kan team arbeta effektivt från dag ett.",
    finalCtaTitle: "Starta er compliance-resa med Opticini idag",
    finalCtaSub:
      "Välj rätt plan och bygg ett strukturerat, skalbart compliance-program.",
    seePlatform: "Se plattformen",
  }),
}

const NO: UpgradePayload = {
  upgrade: mergeUpgrade({
    heroBadge: "Planer og priser",
    heroTitle: "Oppgrader compliance-infrastrukturen",
    heroSubtitle:
      "Gå fra manuell compliance til en fullt automatisert plattform for auditberedskap.",
    intro:
      "Opticini hjelper team med infrastruktursynlighet, bevisinnsamling, risikoovervåking og revisjonsforberedelse fra én plattform – Opticini skalerer med organisasjonen.",
    whyTitle: "Hvorfor oppgradere",
    whySub:
      "Compliance krever mer enn regneark og spredte verktøy. Opticini samler:",
    whyBullets: [
      "Infrastrukturoppdagelse",
      "Sikkerhetsovervåking",
      "Compliance-rammeverk",
      "Revisjonsbevis",
      "Risikostyring",
      "Styringsflyter",
    ],
    whyClosing:
      "Oppgrader arbeidsområdet for mer automatisering, rapportering og beredskap.",
    plansTitle: "Planer",
    plansSub: "Velg planen som passer organisasjonen.",
    mostPopular: "Mest populær",
    includesLabel: "Inkluderer",
    bestForLabel: "Best for",
    requestDemo: "Be om demo",
    plans: [
      {
        id: "starter",
        name: "Starter",
        tagline: "For tidlige team som starter compliance-reisen",
        description:
          "Starter gir grunnleggende verktøy for å forstå eiendeler og organisere compliance.",
        includes: [
          "Infrastrukturoppdagelse",
          "Eiendelsinventar",
          "Grunnleggende sikkerhetsinnsikt",
          "Compliance-arbeidsområde",
          "Policy- og kontrollbibliotek",
          "Manuelle bevisopplastinger",
          "Dashbordsynlighet",
          "Ett compliance-rammeverk",
        ],
        bestFor: ["Startups", "Tidlig compliance-forberedelse", "Små DevOps-team"],
        closing: "Starter hjelper med struktur og enkelhet.",
      },
      {
        id: "growth",
        name: "Growth",
        tagline: "For organisasjoner som forbereder revisjoner",
        description:
          "Growth utvider plattformen med automatisering og integrasjoner.",
        includes: [
          "Alt i Starter pluss",
          "Automatisert bevisinnsamling",
          "Integrasjoner med infrastrukturplattformer",
          "Konfigurasjonsovervåking",
          "Risikosporing",
          "Multi-miljø",
          "Revisjonsforberedelsesarbeidsområde",
          "Compliance-rapportering",
          "Flere rammeverk",
        ],
        bestFor: ["Voksende SaaS", "SOC 2- eller ISO-forberedelse", "Skalerende sikkerhetsteam"],
        closing: "Growth gir kontinuerlig compliance-synlighet utover manuelle prosesser.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "For modne compliance-programmer",
        description:
          "Business legger til avansert styring og arbeidsflyter på tvers av team.",
        includes: [
          "Alt i Growth pluss",
          "Kontrolltestflyter",
          "Remediation-sporing",
          "Unntakshåndtering",
          "Avanserte dashbord",
          "Revisjonslivssyklus",
          "Rollebasert tilgang",
          "Samarbeidsverktøy",
        ],
        bestFor: ["Årlige sertifiseringer", "Interne compliance-team", "Multi-avdeling"],
        closing: "Business er for gjentatte revisjoner og løpende compliance.",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "For store organisasjoner og komplekse miljøer",
        description:
          "Enterprise gir full Opticini-kraft med tilpasning og integrasjon.",
        includes: [
          "Alt i Business pluss",
          "Multi-organisasjonsarkitektur",
          "Ubegrensede rammeverk",
          "Enterprise-integrasjoner",
          "API og webhooks",
          "SSO / SAML",
          "Tilpasset rapportering",
          "Dedikert onboarding og støtte",
        ],
        bestFor: ["Store selskaper", "Regulerte bransjer", "Multi-datterselskap"],
        closing: "Enterprise for compliance i globale miljøer.",
      },
    ],
    consultantTitle: "Konsulent- og revisorprogram",
    consultantLead: "Voks compliance-praksisen med Opticini",
    consultantBody:
      "Opticini samarbeider med konsulenter og revisorer. Partnere kan:",
    consultantBullets: [
      "Onboarde egne kunder",
      "Administrere flere organisasjoner fra én flate",
      "Gjennomføre readiness-vurderinger",
      "Forberede kunder til formelle revisjoner",
    ],
    consultantClosing:
      "Konsulenter får affiliate-inntekter og kan levere rådgivning på plattformen.",
    learnPartner: "Les om partnerprogrammet",
    implementationTitle: "Implementering og rådgivning",
    implementationIntro:
      "Mange trenger ekspertstøtte. Opticini tilbyr valgfrie implementeringstjenester:",
    implementationServices: [
      "Konfigurasjon av compliance-rammeverk",
      "Infrastrukturintegrasjoner",
      "Policy- og kontrollkartlegging",
      "Revisjonsforberedelse",
    ],
    implementationClosing: "Team kan operere effektivt fra dag én.",
    finalCtaTitle: "Start compliance-reisen med Opticini i dag",
    finalCtaSub:
      "Velg riktig plan og bygg et strukturert, skalerbart compliance-program.",
    seePlatform: "Se plattformen",
  }),
}

const DA: UpgradePayload = {
  upgrade: mergeUpgrade({
    heroBadge: "Planer og priser",
    heroTitle: "Opgrader jeres compliance-infrastruktur",
    heroSubtitle:
      "Gå fra manuel compliance-styring til en fuldt automatiseret audit-klar platform.",
    intro:
      "Opticini hjælper teams med infrastruktursynlighed, bevisindsamling, risikoovervågning og revisionsforberedelse fra én platform – Opticini skalerer med organisationen.",
    whyTitle: "Hvorfor opgradere",
    whySub:
      "Compliance kræver mere end regneark og spredte værktøjer. Opticini samler:",
    whyBullets: [
      "Infrastrukturopdagelse",
      "Sikkerhedsovervågning",
      "Compliance-rammeværk",
      "Revisionsbevis",
      "Risikostyring",
      "Styringsworkflows",
    ],
    whyClosing:
      "Opgrader arbejdsområdet for mere automatisering, rapportering og beredskab.",
    plansTitle: "Planer",
    plansSub: "Vælg den plan, der matcher organisationens behov.",
    mostPopular: "Mest populære",
    includesLabel: "Omfatter",
    bestForLabel: "Bedst til",
    requestDemo: "Anmod om demo",
    plans: [
      {
        id: "starter",
        name: "Starter",
        tagline: "Til tidlige teams på compliance-rejsen",
        description:
          "Starter giver grundværktøjer til at forstå aktiver og organisere compliance.",
        includes: [
          "Infrastrukturopdagelse",
          "Aktivinventar",
          "Grundlæggende sikkerhedsindsigt",
          "Compliance-arbejdsområde",
          "Policy- og kontrolbibliotek",
          "Manuelle bevisuploads",
          "Dashboard-synlighed",
          "Ét compliance-rammeværk",
        ],
        bestFor: ["Startups", "Tidlig compliance-forberedelse", "Små DevOps-team"],
        closing: "Starter hjælper med struktur og enkelhed.",
      },
      {
        id: "growth",
        name: "Growth",
        tagline: "Til organisationer der forbereder revisioner",
        description:
          "Growth udvider platformen med automatisering og integrationer.",
        includes: [
          "Alt i Starter plus",
          "Automatiseret bevisindsamling",
          "Integrationer med infrastrukturplatforme",
          "Konfigurationsovervågning",
          "Risikosporing",
          "Multi-miljø",
          "Revisionsforberedelsesarbejdsområde",
          "Compliance-rapportering",
          "Yderligere rammeværk",
        ],
        bestFor: ["Voksende SaaS", "SOC 2- eller ISO-forberedelse", "Skalerende sikkerhedsteams"],
        closing: "Growth giver kontinuerlig compliance-synlighed.",
      },
      {
        id: "business",
        name: "Business",
        tagline: "Til modne compliance-programmer",
        description:
          "Business tilføjer avanceret styring og workflows på tværs af teams.",
        includes: [
          "Alt i Growth plus",
          "Kontroltest-workflows",
          "Remediation-sporing",
          "Undtagelseshåndtering",
          "Avancerede dashboards",
          "Revisionslivscyklus",
          "Rollebaseret adgang",
          "Samarbejdsværktøjer",
        ],
        bestFor: ["Årlige certificeringer", "Interne compliance-team", "Multi-afdeling"],
        closing: "Business er til gentagne revisioner og løbende compliance.",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "Til store organisationer og komplekse miljøer",
        description:
          "Enterprise giver fuld Opticini-kraft med tilpasning og integration.",
        includes: [
          "Alt i Business plus",
          "Multi-organisationsarkitektur",
          "Ubegrænsede rammeværk",
          "Enterprise-integrationer",
          "API og webhooks",
          "SSO / SAML",
          "Tilpasset rapportering",
          "Dedikeret onboarding og support",
        ],
        bestFor: ["Store virksomheder", "Regulerede brancher", "Multi-datterselskaber"],
        closing: "Enterprise til compliance i globale miljøer.",
      },
    ],
    consultantTitle: "Konsulent- og revisorprogram",
    consultantLead: "Voks jeres compliance-praksis med Opticini",
    consultantBody:
      "Opticini samarbejder med konsulenter og revisorer. Partnere kan:",
    consultantBullets: [
      "Onboarde egne kunder",
      "Administrere flere organisationer fra ét sted",
      "Gennemføre readiness-vurderinger",
      "Forberede kunder til formelle revisioner",
    ],
    consultantClosing:
      "Konsulenter modtager affiliate-indtægter og kan levere rådgivning på platformen.",
    learnPartner: "Læs om partnerprogrammet",
    implementationTitle: "Implementering og rådgivning",
    implementationIntro:
      "Mange har brug for ekspertstøtte. Opticini tilbyder valgfrie implementeringstjenester:",
    implementationServices: [
      "Konfiguration af compliance-rammeværk",
      "Infrastrukturintegrationer",
      "Policy- og kontrolkortlægning",
      "Revisionsforberedelse",
    ],
    implementationClosing: "Teams kan operere effektivt fra dag ét.",
    finalCtaTitle: "Start jeres compliance-rejse med Opticini i dag",
    finalCtaSub:
      "Vælg den rigtige plan og byg et struktureret, skalerbart compliance-program.",
    seePlatform: "Se platformen",
  }),
}

/** Per-locale upgrade page trees merged in `buildPublicPagesBundle`. Locales without an entry keep English from `PUBLIC_PAGES_EN`. */
export const UPGRADE_PAGE_PATCH_BY_LANG: Record<string, UpgradePayload> = {
  en: EN,
  es: ES,
  fr: FR,
  de: DE,
  it: IT,
  pt: PT,
  ru: RU,
  sv: SV,
  no: NO,
  da: DA,
  ...UPGRADE_PAGE_CJK_HE_PATCH_BY_LANG,
}
