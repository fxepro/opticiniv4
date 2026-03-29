import type { VerticalContent } from "@/lib/verticals-data"

/** Footer vertical slugs not covered by nonprofits/smb patches — ES/FR; merged in `verticals-pages-i18n`. */
export const VERTICALS_FOOTER_ES: Record<string, VerticalContent> = {
  startups: {
    slug: "startups",
    title: "Startups",
    subtitle: "Cumplimiento que escala con su crecimiento",
    intro: [
      "Las startups avanzan rápido: producto, clientes y financiación con recursos limitados. En cuanto venden a empresas, el cumplimiento deja de ser opcional.",
      "Los compradores enterprise piden documentación y controles; los inversores esperan madurez operativa. Opticini ayuda a estructurar controles, evidencias y preparación para auditorías desde el principio.",
      "El cumplimiento pasa a ser parte del crecimiento, no una carrera de última hora antes de cerrar un gran cliente o una ronda.",
    ],
    sections: [
      {
        type: "features",
        heading: "Pensado para equipos ágiles",
        intro:
          "Casi nunca hay un departamento de cumplimiento dedicado. Fundadores, ingeniería y operaciones comparten la responsabilidad. Opticini ofrece un marco ligero para controles esenciales sin burocracia innecesaria.",
        features: [
          {
            title: "Controles de seguridad y operación",
            description:
              "Políticas y prácticas que demuestran gestión responsable de sistemas, accesos e infraestructura.",
          },
          {
            title: "Preparación para auditorías",
            description:
              "Evidencias y controles documentados para revisiones de seguridad o auditorías independientes.",
          },
          {
            title: "Confianza del cliente",
            description:
              "Respuestas estructuradas a cuestionarios de seguridad y evaluaciones de proveedores.",
          },
          {
            title: "Visibilidad operativa",
            description:
              "Visión clara del estado de cumplimiento en sistemas, políticas y procesos.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Expectativas de clientes enterprise",
        intro: "Suele exigirse:",
        items: [
          "Políticas de seguridad documentadas",
          "Controles de gestión de accesos",
          "Procedimientos de respuesta a incidentes",
          "Registro y monitorización operativa",
          "Supervisión de proveedores e infraestructura",
        ],
        outro: "Opticini ayuda a demostrar estas capacidades con un enfoque que crece con la empresa.",
      },
      {
        type: "prose",
        heading: "Evitar el pánico de última hora",
        paragraphs: [
          "Sin un sistema organizado, los equipos reconstruyen evidencias cuando llega una revisión urgente.",
          "Opticini mantiene un registro continuo de cumplimiento a lo largo del año.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "El equipo puede centrarse en el producto y los clientes; el cumplimiento permanece ordenado y manejable.",
          "El cumplimiento impulsa el crecimiento en lugar de frenarlo.",
        ],
      },
    ],
  },
  government: {
    slug: "government",
    title: "Gobierno",
    subtitle: "Cumplimiento estructurado para la rendición de cuentas del sector público",
    intro: [
      "Las administraciones públicas operan bajo exigencias elevadas de transparencia, controles operativos y marcos regulatorios en materia financiera, datos e integridad.",
      "Coordinar departamentos, documentar políticas y preparar auditorías consume mucho esfuerzo sin un sistema unificado.",
      "Opticini centraliza controles, documentación y preparación para auditorías para dar visibilidad y mantener la integridad operativa.",
    ],
    sections: [
      {
        type: "features",
        heading: "Supervisión y transparencia",
        intro:
          "La confianza ciudadana exige gobernanza responsable. Opticini apoya la documentación, la supervisión y la rendición de cuentas en un marco estructurado.",
        features: [
          {
            title: "Políticas y gobernanza",
            description:
              "Políticas operativas, documentos de gobernanza y procedimientos en un repositorio centralizado.",
          },
          {
            title: "Controles internos",
            description:
              "Seguimiento y verificación de controles alineados con expectativas regulatorias y estándares internos.",
          },
          {
            title: "Evidencias y documentación",
            description:
              "Registros de actividades de cumplimiento, aprobaciones y procedimientos para revisiones de supervisión.",
          },
          {
            title: "Preparación para auditorías",
            description:
              "Auditorías internas, externas y revisiones regulatorias con documentación y verificación de controles organizadas.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Ámbitos habituales de cumplimiento",
        intro: "Incluyen:",
        items: [
          "Gobernanza operativa y gestión de políticas",
          "Supervisión financiera y rendición de cuentas",
          "Cumplimiento de programas y normativa",
          "Verificación de controles internos",
          "Documentación para auditorías",
          "Supervisión de proveedores y contratistas",
        ],
        outro: "Opticini estructura el seguimiento continuo de estas responsabilidades.",
      },
      {
        type: "prose",
        heading: "Coordinación interdepartamental",
        paragraphs: [
          "Los procesos fragmentados dificultan la supervisión y alargan la preparación de auditorías.",
          "Opticini ofrece una vista unificada de controles y prácticas de rendición de cuentas.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "Las instituciones públicas sirven a la ciudadanía; la confianza exige gobernanza transparente y prácticas disciplinadas.",
          "Opticini apoya esos estándares con un sistema claro para cumplimiento y administración responsable.",
        ],
      },
    ],
  },
  healthcare: {
    slug: "healthcare",
    title: "Sanidad",
    subtitle: "Cumplimiento que protege a pacientes y proveedores",
    intro: [
      "El sector sanitario es uno de los más regulados: privacidad del paciente, seguridad clínica e integridad operativa exigen prácticas de cumplimiento rigurosas.",
      "Sin un sistema estructurado, políticas, controles y evidencias se dispersan y la preparación para inspecciones se complica.",
      "Opticini centraliza controles, documentación y evidencias para mantener la preparación regulatoria sin apartar el foco de la atención.",
    ],
    sections: [
      {
        type: "features",
        heading: "Complejidad operativa sanitaria",
        intro:
          "Equilibrio entre atención al paciente y expectativas regulatorias en datos y procedimientos. Opticini aporta supervisión estructurada.",
        features: [
          {
            title: "Protección de datos del paciente",
            description:
              "Políticas y prácticas documentadas para proteger la información sanitaria sensible.",
          },
          {
            title: "Políticas y procedimientos",
            description:
              "Documentación estructurada de protocolos y procedimientos operativos exigidos por la normativa.",
          },
          {
            title: "Gestión de evidencias",
            description:
              "Almacenamiento y organización de evidencias, aprobaciones y documentación para revisiones e inspecciones.",
          },
          {
            title: "Preparación para auditorías",
            description:
              "Auditorías regulatorias, acreditaciones y revisiones internas con documentación ordenada.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Responsabilidades habituales",
        intro: "Incluyen:",
        items: [
          "Privacidad y protección de datos del paciente",
          "Políticas y procedimientos operativos",
          "Informes y documentación regulatoria",
          "Verificación de controles internos",
          "Preparación para auditorías e inspecciones",
          "Supervisión de proveedores y servicios",
        ],
        outro: "Opticini mantiene visibilidad estructurada en estas áreas.",
      },
      {
        type: "prose",
        heading: "Preparación regulatoria",
        paragraphs: [
          "Los reguladores y organismos de acreditación exigen disciplina operativa continua.",
          "Opticini mantiene registros de cumplimiento siempre disponibles.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "La misión es cuidar con seguridad y fiabilidad; el cumplimiento sostiene esa misión.",
          "Opticini aporta la estructura para cumplir sin perder el foco en la calidad asistencial.",
        ],
      },
    ],
  },
  fintech: {
    slug: "fintech",
    title: "Fintech",
    subtitle: "Infraestructura de cumplimiento para la innovación financiera",
    intro: [
      "Las fintech innovan rápido pero deben supervisar riesgo, seguridad, controles financieros y obligaciones regulatorias.",
      "Clientes, socios y reguladores esperan gobernanza y disciplina operativa demostrables.",
      "Opticini organiza controles y documentación para mostrar integridad operativa en un entorno financiero en evolución.",
    ],
    sections: [
      {
        type: "features",
        heading: "Operaciones financieras responsables",
        intro:
          "Transparencia y rendición de cuentas en sistemas, operaciones financieras e interacción con clientes.",
        features: [
          {
            title: "Riesgo y controles",
            description:
              "Seguimiento de controles internos para riesgo operativo, financiero y tecnológico.",
          },
          {
            title: "Seguridad e infraestructura",
            description:
              "Documentación de prácticas de seguridad y gobernanza que protegen sistemas y datos de clientes.",
          },
          {
            title: "Evidencias y documentación",
            description:
              "Pruebas verificables de actividades de cumplimiento para auditorías o revisiones regulatorias.",
          },
          {
            title: "Preparación para auditorías",
            description:
              "Evidencias estructuradas para auditorías independientes, revisiones de socios o evaluaciones regulatorias.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Expectativas de cumplimiento",
        intro: "Suele incluir:",
        items: [
          "Gestión del riesgo operativo",
          "Gobernanza y transparencia financiera",
          "Prácticas de seguridad y protección de datos",
          "Supervisión de proveedores e infraestructura",
          "Documentación para auditorías y revisiones",
        ],
        outro: "Opticini mantiene una supervisión estructurada de estas áreas.",
      },
      {
        type: "closing",
        paragraphs: [
          "La confianza de clientes, reguladores y socios financieros depende de prácticas sólidas de cumplimiento.",
          "Opticini ofrece la infraestructura para innovar con integridad operativa.",
        ],
      },
    ],
  },
  education: {
    slug: "education",
    title: "Educación",
    subtitle: "Cumplimiento para instituciones educativas modernas",
    intro: [
      "Centros educativos combinan programas académicos, administración, supervisión financiera y protección de datos estudiantiles.",
      "Coordinar políticas, documentación e informes ante autoridades y órganos de gobierno requiere claridad y trazabilidad.",
      "Opticini centraliza actividades de cumplimiento y transparencia operativa.",
    ],
    sections: [
      {
        type: "features",
        heading: "Gobernanza institucional",
        intro:
          "Rendición de cuentas hacia estudiantes, profesorado, reguladores y patronatos con supervisión estructurada.",
        features: [
          {
            title: "Políticas y procedimientos",
            description:
              "Políticas institucionales, documentos de gobernanza y procedimientos operativos en un sistema centralizado.",
          },
          {
            title: "Protección de datos estudiantiles",
            description:
              "Controles y políticas documentadas para la información de alumnos y prácticas responsables de gestión de datos.",
          },
          {
            title: "Evidencias y documentación",
            description:
              "Registros verificables que respaldan políticas, procedimientos y cumplimiento operativo.",
          },
          {
            title: "Preparación para auditorías",
            description:
              "Acreditaciones, auditorías institucionales e inspecciones regulatorias con documentación organizada.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Áreas clave de cumplimiento",
        intro: "Incluyen:",
        items: [
          "Privacidad y protección de datos estudiantiles",
          "Gobernanza y supervisión institucional",
          "Transparencia y rendición de cuentas financieras",
          "Documentación de programas y acreditación",
          "Gestión de políticas y controles procedimentales",
          "Preparación para auditorías e informes regulatorios",
        ],
        outro: "Opticini ofrece un entorno estructurado para la visibilidad de estas responsabilidades.",
      },
      {
        type: "closing",
        paragraphs: [
          "Las instituciones educativas forman comunidades y futuras generaciones; la confianza exige gobernanza transparente.",
          "Opticini organiza el cumplimiento en un marco claro y manejable.",
        ],
      },
    ],
  },
}

export const VERTICALS_FOOTER_FR: Record<string, VerticalContent> = {
  startups: {
    slug: "startups",
    title: "Startups",
    subtitle: "Une conformité qui évolue avec votre croissance",
    intro: [
      "Les startups avancent vite — produit, clients et financement avec des ressources limitées. Dès qu'elles vendent aux entreprises, la conformité devient incontournable.",
      "Les acheteurs enterprise exigent de la documentation et des contrôles ; les investisseurs attendent une maturité opérationnelle. Opticini aide à structurer contrôles, preuves et préparation aux audits dès le départ.",
      "La conformité devient partie intégrante de la croissance plutôt qu'une course de dernière minute avant une grosse vente ou une levée.",
    ],
    sections: [
      {
        type: "features",
        heading: "Conçu pour les équipes agiles",
        intro:
          "Peu de startups ont une équipe conformité dédiée. Fondateurs, ingénierie et opérations partagent la charge. Opticini offre un cadre léger pour les contrôles essentiels sans bureaucratie inutile.",
        features: [
          {
            title: "Contrôles sécurité et opérations",
            description:
              "Politiques et pratiques démontrant une gestion responsable des systèmes, accès et infrastructure.",
          },
          {
            title: "Préparation aux audits",
            description:
              "Preuves et contrôles documentés pour revues sécurité ou audits indépendants.",
          },
          {
            title: "Assurance client",
            description:
              "Réponses structurées aux questionnaires sécurité et évaluations fournisseurs.",
          },
          {
            title: "Visibilité opérationnelle",
            description:
              "Vue claire de la posture de conformité sur systèmes, politiques et processus.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Attentes des clients enterprise",
        intro: "On attend notamment :",
        items: [
          "Politiques de sécurité documentées",
          "Contrôles de gestion des accès",
          "Procédures de réponse aux incidents",
          "Journalisation et supervision opérationnelles",
          "Supervision des fournisseurs et de l'infrastructure",
        ],
        outro: "Opticini aide à démontrer ces capacités avec une approche qui grandit avec l'entreprise.",
      },
      {
        type: "prose",
        heading: "Éviter la précipitation de dernière minute",
        paragraphs: [
          "Sans système organisé, les équipes reconstituent les preuves lors des revues urgentes.",
          "Opticini maintient un dossier de conformité continu tout au long de l'année.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "L'équipe peut se concentrer sur le produit et les clients ; la conformité reste ordonnée et gérable.",
          "La conformité soutient la croissance au lieu de la freiner.",
        ],
      },
    ],
  },
  government: {
    slug: "government",
    title: "Secteur public",
    subtitle: "Conformité structurée pour la responsabilité du secteur public",
    intro: [
      "Les administrations publiques sont soumises à d'exigeantes obligations de transparence, de contrôles opérationnels et de cadres réglementaires en matière financière, données et intégrité.",
      "Coordonner les services, documenter les politiques et préparer les audits demande beaucoup d'efforts sans système unifié.",
      "Opticini centralise contrôles, documentation et préparation aux audits pour offrir la visibilité nécessaire à l'intégrité opérationnelle.",
    ],
    sections: [
      {
        type: "features",
        heading: "Supervision et transparence",
        intro:
          "La confiance citoyenne exige une gouvernance responsable. Opticini soutient documentation, supervision et redevabilité dans un cadre structuré.",
        features: [
          {
            title: "Politiques et gouvernance",
            description:
              "Politiques opérationnelles, documents de gouvernance et procédures dans un référentiel centralisé.",
          },
          {
            title: "Contrôles internes",
            description:
              "Suivi et vérification des contrôles alignés sur les attentes réglementaires et les normes internes.",
          },
          {
            title: "Preuves et documentation",
            description:
              "Dossiers des activités de conformité, approbations et procédures pour les revues de supervision.",
          },
          {
            title: "Préparation aux audits",
            description:
              "Audits internes, externes et revues réglementaires avec documentation et vérification des contrôles organisées.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Domaines de conformité courants",
        intro: "Ils incluent :",
        items: [
          "Gouvernance opérationnelle et gestion des politiques",
          "Supervision financière et redevabilité publique",
          "Conformité des programmes et respect réglementaire",
          "Vérification des contrôles internes",
          "Documentation pour les audits",
          "Supervision des fournisseurs et contractants",
        ],
        outro: "Opticini structure le suivi continu de ces responsabilités.",
      },
      {
        type: "prose",
        heading: "Coordination inter-services",
        paragraphs: [
          "Les processus fragmentés compliquent la supervision et allongent la préparation aux audits.",
          "Opticini offre une vue unifiée des contrôles et des pratiques de redevabilité.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "Les institutions publiques servent les citoyens ; la confiance exige une gouvernance transparente et des pratiques disciplinées.",
          "Opticini soutient ces standards avec un système clair pour la conformité et l'administration responsable.",
        ],
      },
    ],
  },
  healthcare: {
    slug: "healthcare",
    title: "Santé",
    subtitle: "Une conformité qui protège patients et établissements",
    intro: [
      "Le secteur de la santé est parmi les plus réglementés : confidentialité des patients, sécurité clinique et intégrité opérationnelle exigent des pratiques de conformité rigoureuses.",
      "Sans système structuré, politiques, contrôles et preuves se dispersent et la préparation aux inspections se complique.",
      "Opticini centralise contrôles, documentation et preuves pour maintenir la préparation réglementaire tout en restant focalisé sur les soins.",
    ],
    sections: [
      {
        type: "features",
        heading: "Complexité opérationnelle en santé",
        intro:
          "Équilibre entre soins aux patients et attentes réglementaires sur les données et les procédures. Opticini apporte une supervision structurée.",
        features: [
          {
            title: "Protection des données patients",
            description:
              "Politiques et pratiques documentées pour protéger les informations de santé sensibles.",
          },
          {
            title: "Politiques et procédures",
            description:
              "Documentation structurée des protocoles et procédures opérationnelles exigées par la réglementation.",
          },
          {
            title: "Gestion des preuves",
            description:
              "Stockage et organisation des preuves, approbations et documentation pour revues et inspections.",
          },
          {
            title: "Préparation aux audits",
            description:
              "Audits réglementaires, accréditations et revues internes avec documentation ordonnée.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Responsabilités courantes",
        intro: "Elles incluent :",
        items: [
          "Confidentialité et protection des données patients",
          "Politiques et procédures opérationnelles",
          "Reporting et documentation réglementaire",
          "Vérification des contrôles internes",
          "Préparation aux audits et inspections",
          "Supervision des fournisseurs et prestataires",
        ],
        outro: "Opticini maintient une visibilité structurée sur ces domaines.",
      },
      {
        type: "prose",
        heading: "Préparation réglementaire",
        paragraphs: [
          "Régulateurs et organismes d'accréditation exigent une discipline opérationnelle continue.",
          "Opticini maintient des dossiers de conformité toujours disponibles.",
        ],
      },
      {
        type: "closing",
        paragraphs: [
          "La mission est de soigner en toute sécurité et fiabilité ; la conformité soutient cette mission.",
          "Opticini apporte la structure pour se conformer sans perdre le focus sur la qualité des soins.",
        ],
      },
    ],
  },
  fintech: {
    slug: "fintech",
    title: "Fintech",
    subtitle: "Infrastructure de conformité pour l'innovation financière",
    intro: [
      "Les fintech innovent vite mais doivent superviser risque, sécurité, contrôles financiers et obligations réglementaires.",
      "Clients, partenaires et régulateurs attendent une gouvernance et une discipline opérationnelle démontrables.",
      "Opticini organise contrôles et documentation pour démontrer l'intégrité opérationnelle dans un environnement financier en évolution.",
    ],
    sections: [
      {
        type: "features",
        heading: "Opérations financières responsables",
        intro:
          "Transparence et redevabilité sur les systèmes, opérations financières et interactions clients.",
        features: [
          {
            title: "Risque et contrôles",
            description:
              "Suivi des contrôles internes pour risque opérationnel, financier et technologique.",
          },
          {
            title: "Sécurité et infrastructure",
            description:
              "Documentation des pratiques de sécurité et de gouvernance protégeant systèmes et données clients.",
          },
          {
            title: "Preuves et documentation",
            description:
              "Preuves vérifiables des activités de conformité pour audits ou revues réglementaires.",
          },
          {
            title: "Préparation aux audits",
            description:
              "Preuves structurées pour audits indépendants, revues partenaires ou évaluations réglementaires.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Attentes de conformité",
        intro: "Cela inclut notamment :",
        items: [
          "Gestion du risque opérationnel",
          "Gouvernance et transparence financière",
          "Pratiques de sécurité et protection des données",
          "Supervision des fournisseurs et de l'infrastructure",
          "Documentation pour audits et revues",
        ],
        outro: "Opticini maintient une supervision structurée de ces domaines.",
      },
      {
        type: "closing",
        paragraphs: [
          "La confiance des clients, régulateurs et partenaires financiers repose sur des pratiques de conformité solides.",
          "Opticini fournit l'infrastructure pour innover avec intégrité opérationnelle.",
        ],
      },
    ],
  },
  education: {
    slug: "education",
    title: "Éducation",
    subtitle: "Conformité pour les établissements d'enseignement modernes",
    intro: [
      "Les établissements combinent programmes académiques, administration, supervision financière et protection des données étudiants.",
      "Coordonner politiques, documentation et rapports pour autorités et conseils d'administration exige clarté et traçabilité.",
      "Opticini centralise les activités de conformité et la transparence opérationnelle.",
    ],
    sections: [
      {
        type: "features",
        heading: "Gouvernance institutionnelle",
        intro:
          "Redevabilité envers étudiants, corps professoral, régulateurs et conseils avec supervision structurée.",
        features: [
          {
            title: "Politiques et procédures",
            description:
              "Politiques institutionnelles, documents de gouvernance et procédures opérationnelles dans un système centralisé.",
          },
          {
            title: "Protection des données étudiants",
            description:
              "Contrôles et politiques documentées pour les informations étudiants et pratiques responsables de gestion des données.",
          },
          {
            title: "Preuves et documentation",
            description:
              "Dossiers vérifiables soutenant politiques, procédures et conformité opérationnelle.",
          },
          {
            title: "Préparation aux audits",
            description:
              "Accréditations, audits institutionnels et inspections réglementaires avec documentation organisée.",
          },
        ],
      },
      {
        type: "bullets",
        heading: "Domaines clés de conformité",
        intro: "Ils incluent :",
        items: [
          "Confidentialité et protection des données étudiants",
          "Gouvernance et supervision institutionnelle",
          "Transparence et redevabilité financière",
          "Documentation des programmes et accréditation",
          "Gestion des politiques et contrôles procéduraux",
          "Préparation aux audits et reporting réglementaire",
        ],
        outro: "Opticini offre un cadre structuré pour la visibilité sur ces responsabilités.",
      },
      {
        type: "closing",
        paragraphs: [
          "Les établissements forment les communautés et les générations futures ; la confiance exige une gouvernance transparente.",
          "Opticini organise la conformité dans un cadre clair et gérable.",
        ],
      },
    ],
  },
}
