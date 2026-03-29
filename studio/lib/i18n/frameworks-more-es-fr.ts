import type { FrameworkContent } from "@/lib/frameworks-data"

/** SOC 2, NIST 800-53, NIST CSF, ISO 27001, PCI DSS, CIS — ES/FR; merged into `frameworks-pages-i18n`. */
export const FRAMEWORKS_MORE_ES: Record<string, FrameworkContent> = {
  soc2: {
    slug: "soc2",
    title: "SOC 2",
    subtitle: "Cumplimiento y preparación para auditorías",
    intro: [
      "SOC 2 es un marco de auditoría ampliamente reconocido que evalúa cómo las organizaciones gestionan los datos de los clientes según cinco principios de servicios de confianza.",
      "Desarrollado por el AICPA, SOC 2 es esencial para empresas SaaS y proveedores cloud que almacenan o procesan información de clientes.",
    ],
    sections: [
      {
        type: "table",
        heading: "Los cinco criterios de servicios de confianza",
        rows: [
          { label: "Seguridad", value: "Protección frente al acceso no autorizado" },
          { label: "Disponibilidad", value: "Los sistemas permanecen operativos y fiables" },
          { label: "Integridad del procesamiento", value: "Los sistemas funcionan según lo previsto sin errores" },
          { label: "Confidencialidad", value: "La información sensible está protegida" },
          { label: "Privacidad", value: "Los datos personales se tratan de forma responsable" },
        ],
        outro: "Las organizaciones pueden auditarse frente a uno o varios criterios según sus operaciones.",
      },
      {
        type: "bullets",
        heading: "SOC 2 Tipo I frente a Tipo II",
        items: [
          "Tipo I evalúa el diseño de los controles en un momento determinado",
          "Tipo II evalúa la eficacia operativa durante un periodo (normalmente 6–12 meses)",
        ],
      },
      {
        type: "bullets",
        heading: "Cómo ayuda Opticini",
        items: [
          "Organizar controles mapeados a los requisitos SOC",
          "Seguir la evidencia de auditoría de forma automatizada",
          "Gestionar pruebas de control y ciclos de revisión",
          "Monitorizar la postura de cumplimiento en tiempo real",
        ],
      },
      {
        type: "bullets",
        heading: "Por qué importa SOC 2",
        items: [
          "La certificación SOC 2 demuestra que la organización toma en serio la seguridad y la privacidad; es un requisito clave para vender a clientes enterprise.",
        ],
      },
    ],
  },
  "nist-800-53": {
    slug: "nist-800-53",
    title: "NIST SP 800-53",
    subtitle: "Controles de seguridad",
    intro: [
      "NIST SP 800-53 ofrece uno de los catálogos más completos de controles de seguridad y privacidad. Lo usan agencias federales y organizaciones que trabajan con sistemas gubernamentales.",
      "El marco define cientos de controles para asegurar sistemas de información en entornos complejos.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Quién utiliza NIST 800-53",
        items: [
          "Agencias del gobierno federal",
          "Contratistas de defensa",
          "Proveedores de servicios cloud",
          "Organizaciones de infraestructura crítica",
          "Empresas con fuerte enfoque en seguridad",
        ],
        outro: "Muchas organizaciones lo adoptan de forma voluntaria para alcanzar mayor madurez en ciberseguridad.",
      },
      {
        type: "bullets",
        heading: "Familias de controles",
        items: [
          "Control de acceso (AC)",
          "Auditoría y responsabilidad (AU)",
          "Gestión de la configuración (CM)",
          "Respuesta a incidentes (IR)",
          "Protección de sistemas y comunicaciones (SC)",
          "Identificación y autenticación (IA)",
          "Evaluación de riesgos (RA)",
        ],
      },
      {
        type: "bullets",
        heading: "Cómo ayuda Opticini",
        items: [
          "Estructurar familias de controles y mapeos",
          "Seguir el estado de implementación",
          "Gestionar planes de prueba y evaluaciones",
          "Mantener repositorios de evidencias",
        ],
      },
      {
        type: "bullets",
        heading: "Por qué importa NIST 800-53",
        items: [
          "Se considera el estándar de referencia para controles de seguridad y ofrece una base sólida para proteger sistemas críticos.",
        ],
      },
    ],
  },
  "nist-csf": {
    slug: "nist-csf",
    title: "Marco de ciberseguridad NIST",
    subtitle: "CSF",
    intro: [
      "El Marco de ciberseguridad NIST ofrece un enfoque flexible basado en el riesgo para gestionar la ciberseguridad en organizaciones de cualquier tamaño. Se usa en los sectores público y privado.",
      "Se centra en cinco funciones básicas que definen el ciclo de vida de la gestión de la ciberseguridad.",
    ],
    sections: [
      {
        type: "table",
        heading: "Funciones básicas",
        rows: [
          { label: "Identificar", value: "Comprender activos, riesgos y contexto del negocio" },
          { label: "Proteger", value: "Implementar salvaguardas para asegurar servicios críticos" },
          { label: "Detectar", value: "Identificar rápidamente eventos de ciberseguridad" },
          { label: "Responder", value: "Actuar cuando ocurren incidentes" },
          { label: "Recuperar", value: "Restaurar sistemas y mejorar la resiliencia tras un incidente" },
        ],
      },
      {
        type: "bullets",
        heading: "Quién utiliza NIST CSF",
        items: [
          "Operadores de infraestructura crítica",
          "Instituciones financieras",
          "Organizaciones sanitarias",
          "Empresas tecnológicas",
          "Agencias gubernamentales",
        ],
      },
      {
        type: "bullets",
        heading: "Cómo ayuda Opticini",
        items: [
          "Mapear controles a categorías del marco",
          "Monitorizar la postura de riesgo",
          "Seguir la preparación para respuesta a incidentes",
          "Generar informes de cumplimiento",
        ],
      },
      {
        type: "bullets",
        heading: "Por qué importa NIST CSF",
        items: [
          "Alinea la estrategia de ciberseguridad con los objetivos del negocio y mejora la resiliencia frente a amenazas.",
        ],
      },
    ],
  },
  "iso-27001": {
    slug: "iso-27001",
    title: "ISO/IEC 27001",
    subtitle: "Gestión de la seguridad de la información",
    intro: [
      "ISO/IEC 27001 es el estándar internacional para establecer, implementar y mantener un sistema de gestión de seguridad de la información (SGSI).",
      "Ofrece un enfoque estructurado para gestionar información sensible mediante gestión de riesgos, políticas, procedimientos y mejora continua.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Componentes clave",
        items: [
          "Evaluación y tratamiento de riesgos",
          "Gestión de políticas de seguridad",
          "Gobernanza organizativa",
          "Procesos de gestión de incidentes",
          "Mejora continua",
        ],
        outro: "La certificación demuestra un enfoque sistemático para gestionar datos sensibles.",
      },
      {
        type: "bullets",
        heading: "Quién utiliza ISO 27001",
        items: [
          "Empresas SaaS",
          "Grandes corporaciones globales",
          "Servicios financieros",
          "Proveedores de infraestructura cloud",
          "Contratistas gubernamentales",
        ],
      },
      {
        type: "bullets",
        heading: "Cómo ayuda Opticini",
        items: [
          "Gestionar el ciclo de vida del SGSI",
          "Seguir la implementación de controles",
          "Apoyar auditorías internas y externas",
          "Organizar evidencias y documentación",
        ],
      },
      {
        type: "bullets",
        heading: "Por qué importa ISO 27001",
        items: [
          "La certificación refuerza la gobernanza de seguridad y aumenta la confianza de clientes, reguladores y socios.",
        ],
      },
    ],
  },
  "pci-dss": {
    slug: "pci-dss",
    title: "PCI DSS",
    subtitle: "Cumplimiento",
    intro: [
      "El estándar de seguridad de datos de la industria de tarjetas de pago (PCI DSS) define requisitos para organizaciones que almacenan, procesan o transmiten datos de tarjetas.",
      "Fue creado por las principales marcas de tarjetas para reducir el fraude y proteger los datos del titular.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Quién debe cumplir",
        items: [
          "Comercio electrónico",
          "Procesadores de pagos",
          "Plataformas SaaS de facturación",
          "Instituciones financieras",
          "Cualquier organización que maneje datos de tarjetas",
        ],
      },
      {
        type: "bullets",
        heading: "Requisitos básicos de seguridad PCI",
        items: [
          "Configuración segura de la red",
          "Cifrado de datos del titular",
          "Gestión de vulnerabilidades",
          "Medidas sólidas de control de acceso",
          "Monitorización y registro",
          "Pruebas de seguridad periódicas",
        ],
      },
      {
        type: "bullets",
        heading: "Cómo ayuda Opticini",
        items: [
          "Seguir los requisitos de controles PCI",
          "Mantener evidencias de auditoría",
          "Gestionar evaluaciones de riesgo",
          "Monitorizar el estado de cumplimiento",
        ],
      },
      {
        type: "bullets",
        heading: "Por qué importa PCI",
        items: [
          "El incumplimiento puede conllevar sanciones económicas y daño reputacional; PCI DSS asegura un manejo seguro de los datos de pago.",
        ],
      },
    ],
  },
  "cis-controls": {
    slug: "cis-controls",
    title: "Controles críticos de seguridad CIS",
    subtitle: "Buenas prácticas priorizadas",
    intro: [
      "Los controles críticos de seguridad CIS ofrecen un conjunto priorizado de buenas prácticas para proteger a las organizaciones frente a los ciberataques más habituales.",
      "Desarrollados por el Center for Internet Security, son prácticos, medibles y ampliamente adoptados.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Áreas clave de control",
        items: [
          "Inventario y gestión de activos",
          "Gestión continua de vulnerabilidades",
          "Protección y cifrado de datos",
          "Gestión de cuentas y acceso",
          "Formación en concienciación de seguridad",
          "Planificación de respuesta a incidentes",
        ],
      },
      {
        type: "table",
        heading: "Grupos de implementación",
        rows: [
          { label: "IG1", value: "Ciberhigiene básica — PYMES" },
          { label: "IG2", value: "Seguridad avanzada — Datos sensibles" },
          { label: "IG3", value: "Programas maduros — Entornos muy expuestos" },
        ],
      },
      {
        type: "bullets",
        heading: "Cómo ayuda Opticini",
        items: [
          "Mapear controles a versiones CIS",
          "Seguir niveles de madurez",
          "Monitorizar métricas de cumplimiento",
          "Apoyar la mejora continua",
        ],
      },
      {
        type: "bullets",
        heading: "Por qué importan los controles CIS",
        items: [
          "CIS es uno de los marcos más prácticos y suele ser el punto de partida para programas de ciberseguridad.",
        ],
      },
    ],
  },
}

export const FRAMEWORKS_MORE_FR: Record<string, FrameworkContent> = {
  soc2: {
    slug: "soc2",
    title: "SOC 2",
    subtitle: "Conformité et préparation aux audits",
    intro: [
      "SOC 2 est un cadre d'audit reconnu qui évalue la manière dont les organisations gèrent les données clients selon cinq principes de services de confiance.",
      "Développé par l'AICPA, SOC 2 est essentiel pour les entreprises SaaS et les fournisseurs cloud qui stockent ou traitent des informations clients.",
    ],
    sections: [
      {
        type: "table",
        heading: "Les cinq critères de services de confiance",
        rows: [
          { label: "Sécurité", value: "Protection contre les accès non autorisés" },
          { label: "Disponibilité", value: "Les systèmes restent opérationnels et fiables" },
          { label: "Intégrité du traitement", value: "Les systèmes fonctionnent comme prévu sans erreurs" },
          { label: "Confidentialité", value: "Les informations sensibles sont protégées" },
          { label: "Vie privée", value: "Les données personnelles sont traitées de manière responsable" },
        ],
        outro: "Les organisations peuvent être auditées sur un ou plusieurs critères selon leurs opérations.",
      },
      {
        type: "bullets",
        heading: "SOC 2 Type I vs Type II",
        items: [
          "Le Type I évalue la conception des contrôles à un moment donné",
          "Le Type II évalue l'efficacité opérationnelle sur une période (généralement 6 à 12 mois)",
        ],
      },
      {
        type: "bullets",
        heading: "Comment Opticini aide",
        items: [
          "Organiser les contrôles mappés aux exigences SOC",
          "Suivre automatiquement les preuves d'audit",
          "Gérer les tests de contrôle et les cycles de revue",
          "Surveiller la posture de conformité en temps réel",
        ],
      },
      {
        type: "bullets",
        heading: "Pourquoi SOC 2 compte",
        items: [
          "La certification SOC 2 montre que l'organisation prend la sécurité et la confidentialité au sérieux ; c'est souvent indispensable pour vendre aux grands comptes.",
        ],
      },
    ],
  },
  "nist-800-53": {
    slug: "nist-800-53",
    title: "NIST SP 800-53",
    subtitle: "Contrôles de sécurité",
    intro: [
      "NIST SP 800-53 fournit l'un des catalogues les plus complets de contrôles de sécurité et de confidentialité. Il est largement utilisé par les agences fédérales et les organisations travaillant avec des systèmes gouvernementaux.",
      "Le cadre définit des centaines de contrôles pour sécuriser les systèmes d'information dans des environnements complexes.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Qui utilise NIST 800-53",
        items: [
          "Agences du gouvernement fédéral",
          "Entrepreneurs de défense",
          "Fournisseurs de services cloud",
          "Organisations d'infrastructures critiques",
          "Entreprises axées sur la sécurité",
        ],
        outro: "De nombreuses organisations l'adoptent volontairement pour accroître leur maturité cybersécurité.",
      },
      {
        type: "bullets",
        heading: "Familles de contrôles",
        items: [
          "Contrôle d'accès (AC)",
          "Audit et responsabilité (AU)",
          "Gestion de la configuration (CM)",
          "Réponse aux incidents (IR)",
          "Protection des systèmes et communications (SC)",
          "Identification et authentification (IA)",
          "Évaluation des risques (RA)",
        ],
      },
      {
        type: "bullets",
        heading: "Comment Opticini aide",
        items: [
          "Structurer les familles de contrôles et les mappages",
          "Suivre le statut de mise en œuvre",
          "Gérer les plans de test et les évaluations",
          "Maintenir des référentiels de preuves",
        ],
      },
      {
        type: "bullets",
        heading: "Pourquoi NIST 800-53 compte",
        items: [
          "Ce cadre est considéré comme la référence pour les contrôles de sécurité et offre une base solide pour protéger les systèmes critiques.",
        ],
      },
    ],
  },
  "nist-csf": {
    slug: "nist-csf",
    title: "Cadre de cybersécurité NIST",
    subtitle: "CSF",
    intro: [
      "Le NIST Cybersecurity Framework propose une approche flexible basée sur le risque pour gérer la cybersécurité dans les organisations de toutes tailles. Il est utilisé dans les secteurs public et privé.",
      "Il s'articule autour de cinq fonctions fondamentales qui définissent le cycle de vie de la gestion de la cybersécurité.",
    ],
    sections: [
      {
        type: "table",
        heading: "Fonctions fondamentales",
        rows: [
          { label: "Identifier", value: "Comprendre les actifs, risques et contexte métier" },
          { label: "Protéger", value: "Mettre en œuvre des mesures pour assurer les services critiques" },
          { label: "Détecter", value: "Identifier rapidement les événements de cybersécurité" },
          { label: "Répondre", value: "Agir lorsque des incidents surviennent" },
          { label: "Récupérer", value: "Restaurer les systèmes et renforcer la résilience après un incident" },
        ],
      },
      {
        type: "bullets",
        heading: "Qui utilise NIST CSF",
        items: [
          "Opérateurs d'infrastructures critiques",
          "Institutions financières",
          "Organisations de santé",
          "Entreprises technologiques",
          "Agences gouvernementales",
        ],
      },
      {
        type: "bullets",
        heading: "Comment Opticini aide",
        items: [
          "Mapper les contrôles aux catégories du cadre",
          "Surveiller la posture de risque",
          "Suivre la préparation à la réponse aux incidents",
          "Générer des rapports de conformité",
        ],
      },
      {
        type: "bullets",
        heading: "Pourquoi NIST CSF compte",
        items: [
          "Le cadre aligne la stratégie cybersécurité sur les objectifs métier tout en améliorant la résilience face aux menaces.",
        ],
      },
    ],
  },
  "iso-27001": {
    slug: "iso-27001",
    title: "ISO/IEC 27001",
    subtitle: "Management de la sécurité de l'information",
    intro: [
      "ISO/IEC 27001 est la norme internationale pour établir, mettre en œuvre et maintenir un système de management de la sécurité de l'information (SMSI).",
      "Elle offre une approche structurée pour gérer les informations sensibles via la gestion des risques, les politiques, les procédures et l'amélioration continue.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Composants clés",
        items: [
          "Évaluation et traitement des risques",
          "Gestion des politiques de sécurité",
          "Gouvernance organisationnelle",
          "Processus de gestion des incidents",
          "Amélioration continue",
        ],
        outro: "La certification démontre une approche systématique de la gestion des données sensibles.",
      },
      {
        type: "bullets",
        heading: "Qui utilise ISO 27001",
        items: [
          "Entreprises SaaS",
          "Grandes entreprises mondiales",
          "Services financiers",
          "Fournisseurs d'infrastructure cloud",
          "Contractants gouvernementaux",
        ],
      },
      {
        type: "bullets",
        heading: "Comment Opticini aide",
        items: [
          "Gérer le cycle de vie du SMSI",
          "Suivre la mise en œuvre des contrôles",
          "Soutenir les audits internes et externes",
          "Organiser les preuves et la documentation",
        ],
      },
      {
        type: "bullets",
        heading: "Pourquoi ISO 27001 compte",
        items: [
          "La certification renforce la gouvernance sécurité et accroît la confiance des clients, régulateurs et partenaires.",
        ],
      },
    ],
  },
  "pci-dss": {
    slug: "pci-dss",
    title: "PCI DSS",
    subtitle: "Conformité",
    intro: [
      "Le Payment Card Industry Data Security Standard (PCI DSS) définit les exigences de sécurité pour les organisations qui stockent, traitent ou transmettent des données de cartes de paiement.",
      "Il a été créé par les principaux réseaux de cartes pour réduire la fraude et protéger les données des porteurs.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Qui doit se conformer",
        items: [
          "Commerçants en ligne",
          "Processeurs de paiement",
          "Plateformes SaaS de facturation",
          "Institutions financières",
          "Toute organisation traitant des données de cartes",
        ],
      },
      {
        type: "bullets",
        heading: "Exigences PCI essentielles",
        items: [
          "Configuration réseau sécurisée",
          "Chiffrement des données du porteur",
          "Gestion des vulnérabilités",
          "Mesures solides de contrôle d'accès",
          "Surveillance et journalisation",
          "Tests de sécurité réguliers",
        ],
      },
      {
        type: "bullets",
        heading: "Comment Opticini aide",
        items: [
          "Suivre les exigences de contrôle PCI",
          "Maintenir les preuves d'audit",
          "Gérer les évaluations de risque",
          "Surveiller le statut de conformité",
        ],
      },
      {
        type: "bullets",
        heading: "Pourquoi PCI compte",
        items: [
          "La non-conformité peut entraîner des pénalités financières et une atteinte à la réputation ; PCI DSS assure une gestion sûre des données de paiement.",
        ],
      },
    ],
  },
  "cis-controls": {
    slug: "cis-controls",
    title: "Contrôles de sécurité critiques CIS",
    subtitle: "Bonnes pratiques priorisées",
    intro: [
      "Les CIS Critical Security Controls proposent un ensemble priorisé de bonnes pratiques pour protéger les organisations contre les cyberattaques les plus courantes.",
      "Développés par le Center for Internet Security, ils sont pratiques, mesurables et largement adoptés.",
    ],
    sections: [
      {
        type: "bullets",
        heading: "Domaines de contrôle clés",
        items: [
          "Inventaire et gestion des actifs",
          "Gestion continue des vulnérabilités",
          "Protection et chiffrement des données",
          "Gestion des comptes et des accès",
          "Sensibilisation à la sécurité",
          "Planification de la réponse aux incidents",
        ],
      },
      {
        type: "table",
        heading: "Groupes de mise en œuvre",
        rows: [
          { label: "IG1", value: "Hygiène cyber de base — PME" },
          { label: "IG2", value: "Sécurité avancée — Données sensibles" },
          { label: "IG3", value: "Programmes matures — Environnements très ciblés" },
        ],
      },
      {
        type: "bullets",
        heading: "Comment Opticini aide",
        items: [
          "Mapper les contrôles aux versions CIS",
          "Suivre les niveaux de maturité",
          "Surveiller les métriques de conformité",
          "Soutenir l'amélioration continue",
        ],
      },
      {
        type: "bullets",
        heading: "Pourquoi les contrôles CIS comptent",
        items: [
          "CIS est l'un des cadres les plus pratiques et sert souvent de point de départ pour bâtir un programme cybersécurité.",
        ],
      },
    ],
  },
}
