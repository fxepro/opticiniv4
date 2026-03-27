import { deepMergePublicPages } from "./deep-merge-public-pages"
import { PUBLIC_PAGES_EN } from "./public-pages-en"

type ConsultPayload = { consult: typeof PUBLIC_PAGES_EN.consult }

const C = PUBLIC_PAGES_EN.consult as unknown as Record<string, unknown>

function mergeConsult(patch: Record<string, unknown>): typeof PUBLIC_PAGES_EN.consult {
  return deepMergePublicPages(C, patch) as unknown as typeof PUBLIC_PAGES_EN.consult
}

const EN: ConsultPayload = { consult: PUBLIC_PAGES_EN.consult }

const ES: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "Hable con ventas",
    heroTitle: "Consultoría experta en cumplimiento e infraestructura",
    heroSubtitle: "Convierta la complejidad del cumplimiento en claridad operativa.",
    intro: [
      "Opticini ofrece servicios de consultoría profesional para ayudar a las organizaciones a comprender su postura de infraestructura, prepararse para auditorías e implementar prácticas sólidas de cumplimiento y gobierno.",
      "Nuestros expertos trabajan con sus equipos para interpretar el conocimiento de los sistemas, identificar riesgos y crear estrategias prácticas de mejora que acerquen a su organización a un cumplimiento continuo.",
    ],
    servicesHeading: "Nuestros servicios de consultoría",
    servicesSub:
      "Servicios integrales de asesoría para apoyar la madurez de cumplimiento e infraestructura de su organización.",
    includesLabel: "Incluye",
    services: [
      {
        id: "compliance-readiness",
        title: "Evaluación de preparación para el cumplimiento",
        description:
          "Evaluación estructurada de su postura actual de seguridad y cumplimiento para determinar la preparación ante marcos como SOC 2, ISO 27001 y otros estándares de gobierno.",
        includes: [
          "Revisión de la postura de infraestructura y seguridad",
          "Identificación de brechas de cumplimiento",
          "Mapeo de controles frente a los marcos requeridos",
          "Evaluación de riesgos y preparación",
          "Hoja de ruta de cumplimiento priorizada",
        ],
        closing:
          "Este trabajo ayuda a las organizaciones a entender su situación y los pasos necesarios para alcanzar la preparación para auditoría.",
      },
      {
        id: "infrastructure-risk",
        title: "Análisis de infraestructura y riesgos",
        description:
          "Análisis profundo de configuraciones de infraestructura, salud del sistema y señales de riesgo operativo generadas por la plataforma Opticini.",
        includes: [
          "Interpretación de insights de infraestructura",
          "Análisis de riesgos de configuración",
          "Identificación de cuellos de botella operativos",
          "Revisión de la arquitectura del sistema",
          "Recomendaciones priorizadas de mitigación de riesgos",
        ],
        closing:
          "Nuestro objetivo es ayudar a los equipos a convertir los insights de la plataforma en mejoras operativas significativas.",
      },
      {
        id: "compliance-implementation",
        title: "Estrategia de implementación del cumplimiento",
        description:
          "Orientación para implementar marcos de cumplimiento de forma eficiente minimizando la interrupción operativa.",
        includes: [
          "Planificación de la implementación del marco",
          "Mapeo de políticas y controles",
          "Estrategia de recopilación de evidencias",
          "Planificación de integración con sistemas existentes",
          "Cronograma e hitos de implementación",
        ],
        closing:
          "Este servicio asegura que las organizaciones puedan pasar de la planificación a la ejecución con confianza.",
      },
      {
        id: "technical-advisory",
        title: "Asesoramiento técnico",
        description:
          "Orientación experta sobre arquitectura de infraestructura, integraciones de sistemas y automatización del gobierno con Opticini.",
        includes: [
          "Revisión y recomendaciones de arquitectura",
          "Consultoría de diseño de infraestructura",
          "Planificación de integraciones",
          "Orientación en la selección de herramientas",
          "Estrategias de automatización del cumplimiento",
        ],
        closing:
          "El asesoramiento técnico ayuda a construir una infraestructura de cumplimiento sostenible y escalable.",
      },
      {
        id: "team-training",
        title: "Formación y talleres para equipos",
        description:
          "Programas prácticos que enseñan a los equipos a operar programas de cumplimiento y monitorización de infraestructura de forma eficaz.",
        includes: [
          "Formación en la plataforma Opticini",
          "Talleres de operaciones de cumplimiento",
          "Formación para preparación de auditorías",
          "Buenas prácticas de monitorización de infraestructura",
          "Sesiones de capacitación del equipo",
        ],
        closing:
          "La formación capacita a los equipos para mantener el cumplimiento y la excelencia operativa de forma independiente.",
      },
      {
        id: "ongoing-advisory",
        title: "Asesoramiento y soporte continuos",
        description:
          "Orientación experta continua para mantener la preparación para el cumplimiento y la visibilidad operativa.",
        includes: [
          "Revisiones periódicas de cumplimiento",
          "Orientación en monitorización de infraestructura",
          "Soporte en preparación de auditorías",
          "Seguimiento e informes de progreso",
          "Asesoramiento ante riesgos emergentes",
        ],
        closing:
          "Este servicio ayuda a mantener el impulso a medida que evolucionan la infraestructura y los requisitos de cumplimiento.",
      },
      {
        id: "full-audit",
        title: "Auditoría integral de cumplimiento e infraestructura",
        description:
          "Un trabajo integral que combina evaluación de preparación, análisis de infraestructura y planificación de optimización.",
        includes: [
          "Revisión completa de preparación para el cumplimiento",
          "Evaluación de infraestructura y riesgos",
          "Análisis multi-marco",
          "Hoja de ruta de mejora integral",
          "Plan de acción priorizado",
        ],
        closing:
          "Este trabajo ofrece un camino claro hacia el cumplimiento y la resiliencia de la infraestructura a largo plazo.",
      },
    ],
    partnerTitle: "Alianzas con consultores y auditores",
    partnerBody:
      "Opticini también apoya a consultores independientes y profesionales de auditoría mediante nuestro programa de partners. Los consultores pueden incorporar y gestionar varias organizaciones cliente en la plataforma mientras ofrecen asesoramiento y preparan a los clientes para auditorías formales.",
    partnerBenefitsLabel: "Los partners se benefician de",
    partnerBenefits: [
      "Herramientas de gestión multi-cliente",
      "Flujos de trabajo de preparación para auditorías",
      "Oportunidades de referidos e ingresos por afiliación",
      "Herramientas de colaboración para proyectos con clientes",
    ],
    requestTitle: "Solicitar una consulta",
    requestSub:
      "Cuéntenos sus retos de cumplimiento o infraestructura y nuestros expertos le ayudarán a trazar un camino claro hacia un gobierno más sólido, mejor visión operativa y preparación para auditorías.",
    labelName: "Nombre completo *",
    labelEmail: "Correo electrónico *",
    labelCompany: "Empresa",
    labelPhone: "Teléfono",
    labelService: "Servicio de interés *",
    servicePlaceholder: "Seleccione un servicio",
    serviceCustom: "Personalizado / otro",
    labelMessage: "Describa sus retos *",
    messagePlaceholder:
      "Describa sus retos de cumplimiento o infraestructura y qué desea lograr...",
    submitScheduling: "Programar una consulta",
    submitting: "Enviando...",
    sidebarTitle: "Programe su llamada",
    sidebarSubtitle: "Respondemos en 24 horas",
    sidebarBlurb:
      "Elija el horario que mejor le convenga. Le enviaremos una invitación de calendario con los detalles de la reunión.",
    hoursWeekdayLabel: "Lunes a viernes",
    hoursWeekday: "9:00 – 18:00",
    hoursSatLabel: "Sábado",
    hoursSat: "10:00 – 16:00",
    quickContact: "Contacto rápido",
    ctaTitle: "Transforme sus operaciones de cumplimiento",
    ctaBody:
      "Programe una consulta para empezar a transformar sus operaciones de cumplimiento con Opticini.",
    requestDemo: "Solicitar demo",
    seePlatform: "Ver la plataforma",
    toastSuccessTitle: "Solicitud de consulta enviada",
    toastSuccessDesc: "Le responderemos en 24 horas con los siguientes pasos.",
    toastErrorTitle: "Error",
    toastErrorDesc:
      "No se pudo enviar la solicitud de consulta. Inténtelo de nuevo.",
  }),
}

const FR: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "Contacter les ventes",
    heroTitle: "Conseil expert en conformité et infrastructure",
    heroSubtitle: "Transformez la complexité de la conformité en clarté opérationnelle.",
    intro: [
      "Opticini propose des services de conseil professionnels pour aider les organisations à comprendre leur posture d'infrastructure, à se préparer aux audits et à mettre en œuvre des pratiques solides de conformité et de gouvernance.",
      "Nos experts accompagnent vos équipes pour interpréter les signaux système, identifier les risques et définir des stratégies d'amélioration concrètes vers une conformité continue.",
    ],
    servicesHeading: "Nos services de conseil",
    servicesSub:
      "Des services d'accompagnement complets pour soutenir la maturité conformité et infrastructure de votre organisation.",
    includesLabel: "Comprend",
    services: [
      {
        id: "compliance-readiness",
        title: "Évaluation de préparation à la conformité",
        description:
          "Évaluation structurée de votre posture actuelle en sécurité et conformité pour déterminer la préparation aux cadres tels que SOC 2, ISO 27001 et autres normes de gouvernance.",
        includes: [
          "Revue de la posture infrastructure et sécurité",
          "Identification des écarts de conformité",
          "Cartographie des contrôles par rapport aux cadres requis",
          "Évaluation des risques et de la préparation",
          "Feuille de route de conformité priorisée",
        ],
        closing:
          "Cette mission aide les organisations à comprendre leur situation et les étapes nécessaires pour atteindre la préparation à l'audit.",
      },
      {
        id: "infrastructure-risk",
        title: "Analyse infrastructure et risques",
        description:
          "Analyse approfondie des configurations d'infrastructure, de la santé des systèmes et des signaux de risque opérationnel issus de la plateforme Opticini.",
        includes: [
          "Interprétation des insights infrastructure",
          "Analyse des risques de configuration",
          "Identification des goulots d'étranglement opérationnels",
          "Revue d'architecture système",
          "Recommandations priorisées de réduction des risques",
        ],
        closing:
          "Nous aidons les équipes à transformer les insights plateforme en améliorations opérationnelles concrètes.",
      },
      {
        id: "compliance-implementation",
        title: "Stratégie de mise en œuvre de la conformité",
        description:
          "Accompagnement pour mettre en œuvre les cadres de conformité efficacement tout en limitant la perturbation opérationnelle.",
        includes: [
          "Planification de la mise en œuvre du cadre",
          "Cartographie des politiques et contrôles",
          "Stratégie de collecte des preuves",
          "Plan d'intégration avec les systèmes existants",
          "Calendrier et jalons de mise en œuvre",
        ],
        closing:
          "Ce service permet de passer du plan à l'exécution en confiance.",
      },
      {
        id: "technical-advisory",
        title: "Conseil technique",
        description:
          "Expertise sur l'architecture d'infrastructure, les intégrations et l'automatisation de la gouvernance avec Opticini.",
        includes: [
          "Revue d'architecture et recommandations",
          "Conseil en conception d'infrastructure",
          "Planification des intégrations",
          "Aide au choix d'outils",
          "Stratégies d'automatisation de la conformité",
        ],
        closing:
          "Le conseil technique aide à bâtir une infrastructure de conformité durable et évolutive.",
      },
      {
        id: "team-training",
        title: "Formation et ateliers d'équipe",
        description:
          "Programmes pratiques pour opérer efficacement les programmes de conformité et de supervision de l'infrastructure.",
        includes: [
          "Formation à la plateforme Opticini",
          "Ateliers sur les opérations de conformité",
          "Formation à la préparation d'audit",
          "Bonnes pratiques de supervision de l'infrastructure",
          "Sessions d'habilitation des équipes",
        ],
        closing:
          "La formation permet aux équipes de maintenir conformité et excellence opérationnelle en autonomie.",
      },
      {
        id: "ongoing-advisory",
        title: "Conseil et support continus",
        description:
          "Accompagnement expert continu pour maintenir la préparation à la conformité et la visibilité opérationnelle.",
        includes: [
          "Points réguliers sur la conformité",
          "Conseil sur la supervision de l'infrastructure",
          "Support à la préparation d'audit",
          "Suivi et reporting des progrès",
          "Conseil sur les risques émergents",
        ],
        closing:
          "Ce service préserve la dynamique au fil de l'évolution de l'infrastructure et des exigences.",
      },
      {
        id: "full-audit",
        title: "Audit complet conformité et infrastructure",
        description:
          "Mission complète combinant évaluation de préparation, analyse d'infrastructure et plan d'optimisation.",
        includes: [
          "Revue complète de préparation à la conformité",
          "Évaluation infrastructure et risques",
          "Analyse multi-cadres",
          "Feuille de route d'amélioration globale",
          "Plan d'action priorisé",
        ],
        closing:
          "Cette mission trace une voie claire vers une conformité et une résilience infrastructure durables.",
      },
    ],
    partnerTitle: "Partenariats consultants et auditeurs",
    partnerBody:
      "Opticini soutient aussi les consultants indépendants et les professionnels de l'audit via notre programme partenaire : gestion multi-clients sur la plateforme, conseil et préparation aux audits formels.",
    partnerBenefitsLabel: "Les partenaires bénéficient de",
    partnerBenefits: [
      "Outils de gestion multi-clients",
      "Workflows de préparation aux audits",
      "Opportunités de parrainage et revenus d'affiliation",
      "Outils de collaboration pour les missions clients",
    ],
    requestTitle: "Demander une consultation",
    requestSub:
      "Décrivez vos enjeux de conformité ou d'infrastructure : nos experts vous aident à définir une trajectoire vers une gouvernance renforcée, une meilleure visibilité opérationnelle et une préparation aux audits.",
    labelName: "Nom complet *",
    labelEmail: "E-mail *",
    labelCompany: "Entreprise",
    labelPhone: "Téléphone",
    labelService: "Service concerné *",
    servicePlaceholder: "Sélectionner un service",
    serviceCustom: "Personnalisé / autre",
    labelMessage: "Décrivez vos enjeux *",
    messagePlaceholder:
      "Décrivez vos défis de conformité ou d'infrastructure et vos objectifs...",
    submitScheduling: "Planifier une consultation",
    submitting: "Envoi en cours...",
    sidebarTitle: "Planifier votre appel",
    sidebarSubtitle: "Réponse sous 24 heures",
    sidebarBlurb:
      "Choisissez un créneau qui vous convient. Nous vous enverrons une invitation calendrier avec les détails.",
    hoursWeekdayLabel: "Lundi – vendredi",
    hoursWeekday: "9 h – 18 h",
    hoursSatLabel: "Samedi",
    hoursSat: "10 h – 16 h",
    quickContact: "Contact rapide",
    ctaTitle: "Transformez vos opérations de conformité",
    ctaBody:
      "Planifiez une consultation pour commencer à transformer vos opérations de conformité avec Opticini.",
    requestDemo: "Demander une démo",
    seePlatform: "Voir la plateforme",
    toastSuccessTitle: "Demande de consultation envoyée",
    toastSuccessDesc: "Nous revenons vers vous sous 24 heures avec la suite.",
    toastErrorTitle: "Erreur",
    toastErrorDesc:
      "Échec de l'envoi de la demande de consultation. Veuillez réessayer.",
  }),
}

const DE: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "Vertrieb kontaktieren",
    heroTitle: "Expertenberatung zu Compliance und Infrastruktur",
    heroSubtitle: "Verwandeln Sie Compliance-Komplexität in operative Klarheit.",
    intro: [
      "Opticini bietet professionelle Beratung, damit Organisationen ihre Infrastrukturlage verstehen, Audits vorbereiten und starke Compliance- und Governance-Praktiken umsetzen können.",
      "Unsere Expert:innen arbeiten mit Ihren Teams zusammen, um Systemeinblicke zu interpretieren, Risiken zu erkennen und praktische Verbesserungsstrategien zu entwickeln.",
    ],
    servicesHeading: "Unsere Beratungsleistungen",
    servicesSub:
      "Umfassende Beratung zur Compliance- und Infrastrukturreife Ihrer Organisation.",
    includesLabel: "Umfasst",
    services: [
      {
        id: "compliance-readiness",
        title: "Bewertung der Compliance-Bereitschaft",
        description:
          "Strukturierte Bewertung Ihrer aktuellen Sicherheits- und Compliance-Lage für Rahmen wie SOC 2, ISO 27001 und andere Governance-Standards.",
        includes: [
          "Prüfung von Infrastruktur- und Sicherheitslage",
          "Identifikation von Compliance-Lücken",
          "Control-Mapping zu den Anforderungen",
          "Risiko- und Bereitschaftsbewertung",
          "Priorisierte Compliance-Roadmap",
        ],
        closing:
          "Dieses Engagement hilft Organisationen, ihren Stand und die Schritte zur Auditbereitschaft zu verstehen.",
      },
      {
        id: "infrastructure-risk",
        title: "Infrastruktur- und Risikoanalyse",
        description:
          "Tiefe Analyse von Infrastrukturkonfigurationen, Systemgesundheit und operativen Risikosignalen aus der Opticini-Plattform.",
        includes: [
          "Auswertung von Infrastruktur-Insights",
          "Konfigurationsrisikoanalyse",
          "Identifikation operativer Engpässe",
          "Systemarchitektur-Review",
          "Priorisierte Risikominderungsempfehlungen",
        ],
        closing:
          "Wir helfen Teams, Plattform-Insights in messbare operative Verbesserungen zu übersetzen.",
      },
      {
        id: "compliance-implementation",
        title: "Strategie zur Compliance-Umsetzung",
        description:
          "Begleitung bei der effizienten Umsetzung von Compliance-Rahmen bei minimaler Betriebsunterbrechung.",
        includes: [
          "Planung der Rahmenumsetzung",
          "Policy- und Control-Mapping",
          "Strategie zur Belegsammlung",
          "Integrationsplanung mit bestehenden Systemen",
          "Zeitplan und Meilensteine",
        ],
        closing:
          "So gelingt der Übergang von der Planung zur Umsetzung mit Vertrauen.",
      },
      {
        id: "technical-advisory",
        title: "Technische Beratung",
        description:
          "Expertenhilfe zu Infrastrukturarchitektur, Systemintegrationen und Governance-Automatisierung mit Opticini.",
        includes: [
          "Architektur-Review und Empfehlungen",
          "Beratung zum Infrastrukturentwurf",
          "Integrationsplanung",
          "Werkzeugauswahl",
          "Strategien zur Compliance-Automatisierung",
        ],
        closing:
          "Technische Beratung unterstützt eine nachhaltige, skalierbare Compliance-Infrastruktur.",
      },
      {
        id: "team-training",
        title: "Schulungen und Workshops für Teams",
        description:
          "Praxisnahe Programme, damit Teams Compliance und Infrastrukturüberwachung effektiv betreiben.",
        includes: [
          "Opticini-Plattformschulung",
          "Workshops zu Compliance-Betrieb",
          "Auditvorbereitungsschulung",
          "Best Practices zur Infrastrukturüberwachung",
          "Team-Enablement-Sessions",
        ],
        closing:
          "Schulungen befähigen Teams zu eigenständiger Compliance und operativer Exzellenz.",
      },
      {
        id: "ongoing-advisory",
        title: "Laufende Beratung und Support",
        description:
          "Kontinuierliche Expertenbegleitung für Compliance-Bereitschaft und operative Transparenz.",
        includes: [
          "Regelmäßige Compliance-Check-ins",
          "Begleitung bei Infrastrukturüberwachung",
          "Unterstützung bei Auditvorbereitung",
          "Fortschrittsverfolgung und Reporting",
          "Beratung bei neuen Risiken",
        ],
        closing:
          "So bleibt der Schwung erhalten, wenn sich Infrastruktur und Anforderungen ändern.",
      },
      {
        id: "full-audit",
        title: "Vollständiges Compliance- und Infrastrukturaudit",
        description:
          "Umfassendes Engagement: Bereitschaftsbewertung, Infrastrukturanalyse und Optimierungsplanung.",
        includes: [
          "Vollständige Compliance-Bereitschaftsprüfung",
          "Infrastruktur- und Risikobewertung",
          "Multi-Framework-Analyse",
          "Umfassende Verbesserungsroadmap",
          "Priorisierter Maßnahmenplan",
        ],
        closing:
          "Organisationen erhalten einen klaren Weg zu langfristiger Compliance und Infrastrukturresilienz.",
      },
    ],
    partnerTitle: "Partnerschaften mit Beratern und Auditoren",
    partnerBody:
      "Opticini unterstützt unabhängige Berater und Auditprofis über unser Partnerprogramm – mehrere Mandanten auf der Plattform, Beratung und Vorbereitung auf formelle Audits.",
    partnerBenefitsLabel: "Partner profitieren von",
    partnerBenefits: [
      "Tools für Multi-Mandanten-Management",
      "Workflows zur Auditvorbereitung",
      "Empfehlungs- und Affiliate-Einnahmen",
      "Kollaborationstools für Mandate",
    ],
    requestTitle: "Beratung anfragen",
    requestSub:
      "Beschreiben Sie Ihre Compliance- oder Infrastrukturherausforderungen – unsere Expert:innen helfen Ihnen zu klarer Governance, besserer operativer Sicht und Auditbereitschaft.",
    labelName: "Vollständiger Name *",
    labelEmail: "E-Mail *",
    labelCompany: "Unternehmen",
    labelPhone: "Telefon",
    labelService: "Gewünschte Leistung *",
    servicePlaceholder: "Leistung auswählen",
    serviceCustom: "Individuell / Sonstiges",
    labelMessage: "Beschreiben Sie Ihre Herausforderungen *",
    messagePlaceholder:
      "Beschreiben Sie Compliance- oder Infrastrukturthemen und Ihre Ziele...",
    submitScheduling: "Beratungstermin vereinbaren",
    submitting: "Wird gesendet...",
    sidebarTitle: "Ihr Gespräch planen",
    sidebarSubtitle: "Antwort innerhalb von 24 Stunden",
    sidebarBlurb:
      "Wählen Sie einen passenden Termin. Wir senden eine Kalendereinladung mit allen Details.",
    hoursWeekdayLabel: "Montag – Freitag",
    hoursWeekday: "9:00 – 18:00 Uhr",
    hoursSatLabel: "Samstag",
    hoursSat: "10:00 – 16:00 Uhr",
    quickContact: "Kurzkontakt",
    ctaTitle: "Transformieren Sie Ihre Compliance-Abläufe",
    ctaBody:
      "Vereinbaren Sie eine Beratung, um Ihre Compliance-Operationen mit Opticini voranzubringen.",
    requestDemo: "Demo anfragen",
    seePlatform: "Plattform ansehen",
    toastSuccessTitle: "Beratungsanfrage gesendet",
    toastSuccessDesc: "Wir melden uns innerhalb von 24 Stunden mit den nächsten Schritten.",
    toastErrorTitle: "Fehler",
    toastErrorDesc:
      "Die Beratungsanfrage konnte nicht gesendet werden. Bitte erneut versuchen.",
  }),
}

const IT: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "Parla con le vendite",
    heroTitle: "Consulenza esperta su conformità e infrastruttura",
    heroSubtitle: "Trasforma la complessità della conformità in chiarezza operativa.",
    intro: [
      "Opticini offre servizi di consulenza professionale per aiutare le organizzazioni a comprendere la propria postura infrastrutturale, prepararsi agli audit e implementare pratiche solide di conformità e governance.",
      "I nostri esperti lavorano con i vostri team per interpretare gli insight di sistema, identificare i rischi e definire strategie di miglioramento pratiche verso una conformità continua.",
    ],
    servicesHeading: "I nostri servizi di consulenza",
    servicesSub:
      "Servizi di advisory completi a supporto della maturità di conformità e infrastruttura della vostra organizzazione.",
    includesLabel: "Include",
    services: [
      {
        id: "compliance-readiness",
        title: "Valutazione di readiness per la conformità",
        description:
          "Valutazione strutturata della vostra postura attuale di sicurezza e conformità per framework come SOC 2, ISO 27001 e altri standard di governance.",
        includes: [
          "Revisione della postura di infrastruttura e sicurezza",
          "Identificazione delle lacune di conformità",
          "Mappatura dei controlli rispetto ai framework richiesti",
          "Valutazione di rischio e readiness",
          "Roadmap di conformità prioritaria",
        ],
        closing:
          "Questo impegno aiuta le organizzazioni a capire dove si trovano e quali passi servono per la readiness all'audit.",
      },
      {
        id: "infrastructure-risk",
        title: "Analisi infrastruttura e rischio",
        description:
          "Analisi approfondita delle configurazioni, della salute dei sistemi e dei segnali di rischio operativo dalla piattaforma Opticini.",
        includes: [
          "Interpretazione degli insight infrastrutturali",
          "Analisi del rischio di configurazione",
          "Identificazione dei colli di bottiglia operativi",
          "Revisione dell'architettura di sistema",
          "Raccomandazioni prioritarie di mitigazione del rischio",
        ],
        closing:
          "Aiutiamo i team a trasformare gli insight della piattaforma in miglioramenti operativi concreti.",
      },
      {
        id: "compliance-implementation",
        title: "Strategia di implementazione della conformità",
        description:
          "Guida per implementare i framework di conformità in modo efficiente riducendo l'impatto operativo.",
        includes: [
          "Pianificazione dell'implementazione del framework",
          "Mappatura di policy e controlli",
          "Strategia di raccolta delle evidenze",
          "Pianificazione dell'integrazione con i sistemi esistenti",
          "Cronologia e milestone di implementazione",
        ],
        closing:
          "Questo servizio consente di passare dalla pianificazione all'esecuzione con fiducia.",
      },
      {
        id: "technical-advisory",
        title: "Consulenza tecnica",
        description:
          "Supporto esperto su architettura infrastrutturale, integrazioni e automazione della governance con Opticini.",
        includes: [
          "Revisione architetturale e raccomandazioni",
          "Consulenza sulla progettazione infrastrutturale",
          "Pianificazione delle integrazioni",
          "Orientamento sulla scelta degli strumenti",
          "Strategie di automazione della conformità",
        ],
        closing:
          "La consulenza tecnica aiuta a costruire un'infrastruttura di conformità sostenibile e scalabile.",
      },
      {
        id: "team-training",
        title: "Formazione e workshop per il team",
        description:
          "Programmi pratici per operare efficacemente programmi di conformità e monitoraggio infrastrutturale.",
        includes: [
          "Formazione sulla piattaforma Opticini",
          "Workshop sulle operazioni di conformità",
          "Formazione alla preparazione agli audit",
          "Best practice di monitoraggio infrastrutturale",
          "Sessioni di abilitazione del team",
        ],
        closing:
          "La formazione consente ai team di mantenere conformità ed eccellenza operativa in autonomia.",
      },
      {
        id: "ongoing-advisory",
        title: "Consulenza e supporto continuativi",
        description:
          "Guida esperta continua per mantenere readiness alla conformità e visibilità operativa.",
        includes: [
          "Check-in periodici sulla conformità",
          "Supporto al monitoraggio infrastrutturale",
          "Assistenza nella preparazione agli audit",
          "Monitoraggio dei progressi e reporting",
          "Consulenza sui rischi emergenti",
        ],
        closing:
          "Questo servizio mantiene lo slancio mentre infrastruttura e requisiti evolvono.",
      },
      {
        id: "full-audit",
        title: "Audit completo su conformità e infrastruttura",
        description:
          "Impegno completo che combina valutazione della readiness, analisi infrastrutturale e pianificazione dell'ottimizzazione.",
        includes: [
          "Revisione completa della readiness alla conformità",
          "Valutazione infrastruttura e rischio",
          "Analisi multi-framework",
          "Roadmap di miglioramento completa",
          "Piano d'azione prioritaria",
        ],
        closing:
          "Fornisce un percorso chiaro verso conformità e resilienza infrastrutturale a lungo termine.",
      },
    ],
    partnerTitle: "Partnership con consulenti e revisori",
    partnerBody:
      "Opticini supporta anche consulenti indipendenti e professionisti dell'audit tramite il programma partner: gestione multi-cliente sulla piattaforma, advisory e preparazione agli audit formali.",
    partnerBenefitsLabel: "I partner beneficiano di",
    partnerBenefits: [
      "Strumenti di gestione multi-cliente",
      "Flussi per la readiness agli audit",
      "Opportunità di referral e revenue affiliate",
      "Strumenti di collaborazione per i progetti con i clienti",
    ],
    requestTitle: "Richiedi una consulenza",
    requestSub:
      "Descrivete le vostre sfide di conformità o infrastruttura: i nostri esperti vi aiutano verso governance più solida, migliore insight operativo e readiness agli audit.",
    labelName: "Nome completo *",
    labelEmail: "Email *",
    labelCompany: "Azienda",
    labelPhone: "Telefono",
    labelService: "Servizio di interesse *",
    servicePlaceholder: "Seleziona un servizio",
    serviceCustom: "Personalizzato / altro",
    labelMessage: "Descrivete le vostre sfide *",
    messagePlaceholder:
      "Descrivete le sfide di conformità o infrastruttura e cosa volete ottenere...",
    submitScheduling: "Prenota una consulenza",
    submitting: "Invio in corso...",
    sidebarTitle: "Prenota la chiamata",
    sidebarSubtitle: "Rispondiamo entro 24 ore",
    sidebarBlurb:
      "Scegliete l'orario più adatto. Invieremo un invito di calendario con i dettagli.",
    hoursWeekdayLabel: "Lunedì – venerdì",
    hoursWeekday: "9:00 – 18:00",
    hoursSatLabel: "Sabato",
    hoursSat: "10:00 – 16:00",
    quickContact: "Contatto rapido",
    ctaTitle: "Trasformate le operazioni di conformità",
    ctaBody:
      "Prenotate una consulenza per iniziare a trasformare le operazioni di conformità con Opticini.",
    requestDemo: "Richiedi demo",
    seePlatform: "Vedi la piattaforma",
    toastSuccessTitle: "Richiesta di consulenza inviata",
    toastSuccessDesc: "Vi risponderemo entro 24 ore con i prossimi passi.",
    toastErrorTitle: "Errore",
    toastErrorDesc:
      "Invio della richiesta di consulenza non riuscito. Riprovare.",
  }),
}

const PT: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "Falar com vendas",
    heroTitle: "Consultoria especializada em conformidade e infraestrutura",
    heroSubtitle: "Transforme a complexidade da conformidade em clareza operacional.",
    intro: [
      "A Opticini oferece serviços de consultoria profissional para ajudar organizações a compreender a postura de infraestrutura, preparar-se para auditorias e implementar práticas sólidas de conformidade e governança.",
      "Os nossos especialistas trabalham com as suas equipas para interpretar insights de sistemas, identificar riscos e criar estratégias práticas de melhoria rumo à conformidade contínua.",
    ],
    servicesHeading: "Os nossos serviços de consultoria",
    servicesSub:
      "Serviços abrangentes de assessoria para apoiar a maturidade de conformidade e infraestrutura da sua organização.",
    includesLabel: "Inclui",
    services: [
      {
        id: "compliance-readiness",
        title: "Avaliação de prontidão para conformidade",
        description:
          "Avaliação estruturada da sua postura atual de segurança e conformidade para determinar a prontidão face a quadros como SOC 2, ISO 27001 e outros padrões de governança.",
        includes: [
          "Revisão da postura de infraestrutura e segurança",
          "Identificação de lacunas de conformidade",
          "Mapeamento de controlos face aos quadros exigidos",
          "Avaliação de risco e prontidão",
          "Roteiro de conformidade priorizado",
        ],
        closing:
          "Este trabalho ajuda as organizações a perceber onde estão e que passos são necessários para a prontidão de auditoria.",
      },
      {
        id: "infrastructure-risk",
        title: "Análise de infraestrutura e risco",
        description:
          "Análise aprofundada de configurações de infraestrutura, saúde dos sistemas e sinais de risco operacional gerados pela plataforma Opticini.",
        includes: [
          "Interpretação de insights de infraestrutura",
          "Análise de risco de configuração",
          "Identificação de estrangulamentos operacionais",
          "Revisão da arquitetura de sistemas",
          "Recomendações priorizadas de mitigação de risco",
        ],
        closing:
          "O nosso objetivo é ajudar as equipas a converter insights da plataforma em melhorias operacionais significativas.",
      },
      {
        id: "compliance-implementation",
        title: "Estratégia de implementação da conformidade",
        description:
          "Orientação para implementar quadros de conformidade de forma eficiente minimizando a perturbação operacional.",
        includes: [
          "Planeamento da implementação do quadro",
          "Mapeamento de políticas e controlos",
          "Estratégia de recolha de evidências",
          "Planeamento de integração com sistemas existentes",
          "Cronograma e marcos de implementação",
        ],
        closing:
          "Este serviço garante que as organizações possam passar do planeamento à execução com confiança.",
      },
      {
        id: "technical-advisory",
        title: "Assessoramento técnico",
        description:
          "Orientação especializada em arquitetura de infraestrutura, integrações de sistemas e automação de governança com a Opticini.",
        includes: [
          "Revisão de arquitetura e recomendações",
          "Consultoria de desenho de infraestrutura",
          "Planeamento de integrações",
          "Orientação na seleção de ferramentas",
          "Estratégias de automação da conformidade",
        ],
        closing:
          "O assessoramento técnico ajuda a construir uma infraestrutura de conformidade sustentável e escalável.",
      },
      {
        id: "team-training",
        title: "Formação e workshops para equipas",
        description:
          "Programas práticos que ensinam as equipas a operar programas de conformidade e monitorização de infraestrutura de forma eficaz.",
        includes: [
          "Formação na plataforma Opticini",
          "Workshops de operações de conformidade",
          "Formação para preparação de auditorias",
          "Boas práticas de monitorização de infraestrutura",
          "Sessões de capacitação de equipas",
        ],
        closing:
          "A formação capacita as equipas a manter conformidade e excelência operacional de forma independente.",
      },
      {
        id: "ongoing-advisory",
        title: "Assessoramento e suporte contínuos",
        description:
          "Orientação especializada contínua para manter a prontidão de conformidade e a visibilidade operacional.",
        includes: [
          "Check-ins regulares de conformidade",
          "Orientação em monitorização de infraestrutura",
          "Apoio à preparação de auditorias",
          "Acompanhamento e relatórios de progresso",
          "Assessoramento para riscos emergentes",
        ],
        closing:
          "Este serviço mantém o momentum à medida que a infraestrutura e os requisitos evoluem.",
      },
      {
        id: "full-audit",
        title: "Auditoria completa de conformidade e infraestrutura",
        description:
          "Um trabalho abrangente que combina avaliação de prontidão, análise de infraestrutura e planeamento de otimização.",
        includes: [
          "Revisão completa de prontidão para conformidade",
          "Avaliação de infraestrutura e risco",
          "Análise multi-quadro",
          "Roteiro abrangente de melhoria",
          "Plano de ação priorizado",
        ],
        closing:
          "Este trabalho oferece um caminho claro rumo à conformidade e resiliência de infraestrutura a longo prazo.",
      },
    ],
    partnerTitle: "Parcerias com consultores e auditores",
    partnerBody:
      "A Opticini também apoia consultores independentes e profissionais de auditoria através do programa de parceiros: gestão multi-cliente na plataforma, assessoria e preparação para auditorias formais.",
    partnerBenefitsLabel: "Os parceiros beneficiam de",
    partnerBenefits: [
      "Ferramentas de gestão multi-cliente",
      "Fluxos de trabalho de prontidão para auditorias",
      "Oportunidades de referência e receita de afiliados",
      "Ferramentas de colaboração para projetos com clientes",
    ],
    requestTitle: "Pedir uma consulta",
    requestSub:
      "Conte-nos os seus desafios de conformidade ou infraestrutura — os nossos especialistas ajudam a definir um caminho claro para governança mais forte, melhor insight operacional e prontidão para auditorias.",
    labelName: "Nome completo *",
    labelEmail: "E-mail *",
    labelCompany: "Empresa",
    labelPhone: "Telefone",
    labelService: "Serviço de interesse *",
    servicePlaceholder: "Selecione um serviço",
    serviceCustom: "Personalizado / outro",
    labelMessage: "Descreva os seus desafios *",
    messagePlaceholder:
      "Descreva os desafios de conformidade ou infraestrutura e o que pretende alcançar...",
    submitScheduling: "Agendar uma consulta",
    submitting: "A enviar...",
    sidebarTitle: "Agende a sua chamada",
    sidebarSubtitle: "Respondemos em 24 horas",
    sidebarBlurb:
      "Escolha um horário conveniente. Enviaremos um convite de calendário com os detalhes da reunião.",
    hoursWeekdayLabel: "Segunda a sexta",
    hoursWeekday: "9h – 18h",
    hoursSatLabel: "Sábado",
    hoursSat: "10h – 16h",
    quickContact: "Contacto rápido",
    ctaTitle: "Transforme as operações de conformidade",
    ctaBody:
      "Agende uma consulta para começar a transformar as operações de conformidade com a Opticini.",
    requestDemo: "Pedir demonstração",
    seePlatform: "Ver a plataforma",
    toastSuccessTitle: "Pedido de consulta enviado",
    toastSuccessDesc: "Responderemos em 24 horas com os próximos passos.",
    toastErrorTitle: "Erro",
    toastErrorDesc:
      "Falha ao enviar o pedido de consulta. Tente novamente.",
  }),
}

const RU: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "Связаться с отделом продаж",
    heroTitle: "Экспертная консультация по комплаенсу и инфраструктуре",
    heroSubtitle: "Превратите сложность комплаенса в операционную ясность.",
    intro: [
      "Opticini предлагает профессиональные консультации, чтобы организации понимали состояние инфраструктуры, готовились к аудитам и внедряли устойчивые практики комплаенса и управления.",
      "Наши эксперты работают с вашими командами: интерпретируют данные о системах, выявляют риски и помогают выстроить практические шаги к непрерывному комплаенсу.",
    ],
    servicesHeading: "Наши консультационные услуги",
    servicesSub:
      "Комплексное сопровождение для зрелости комплаенса и инфраструктуры вашей организации.",
    includesLabel: "Включает",
    services: [
      {
        id: "compliance-readiness",
        title: "Оценка готовности к комплаенсу",
        description:
          "Структурированная оценка текущего состояния безопасности и комплаенса для SOC 2, ISO 27001 и других стандартов.",
        includes: [
          "Обзор инфраструктуры и безопасности",
          "Выявление пробелов комплаенса",
          "Сопоставление контролей с требованиями",
          "Оценка рисков и готовности",
          "Приоритизированная дорожная карта",
        ],
        closing:
          "Помогает понять текущее положение и шаги к готовности к аудиту.",
      },
      {
        id: "infrastructure-risk",
        title: "Анализ инфраструктуры и рисков",
        description:
          "Глубокий анализ конфигураций, состояния систем и операционных рисков по данным Opticini.",
        includes: [
          "Интерпретация инсайтов инфраструктуры",
          "Анализ рисков конфигурации",
          "Поиск узких мест",
          "Обзор архитектуры",
          "Приоритетные рекомендации по снижению рисков",
        ],
        closing:
          "Помогаем превратить данные платформы в улучшения в эксплуатации.",
      },
      {
        id: "compliance-implementation",
        title: "Стратегия внедрения комплаенса",
        description:
          "Сопровождение эффективного внедрения рамок комплаенса с минимальными сбоями.",
        includes: [
          "Планирование внедрения рамки",
          "Картирование политик и контролей",
          "Стратегия сбора доказательств",
          "Интеграция с существующими системами",
          "Сроки и этапы",
        ],
        closing:
          "От планирования к выполнению — с уверенностью.",
      },
      {
        id: "technical-advisory",
        title: "Техническое консультирование",
        description:
          "Экспертиза по архитектуре, интеграциям и автоматизации управления с Opticini.",
        includes: [
          "Обзор архитектуры и рекомендации",
          "Консультации по проектированию",
          "Планирование интеграций",
          "Выбор инструментов",
          "Автоматизация комплаенса",
        ],
        closing:
          "Помогает построить устойчивую масштабируемую инфраструктуру комплаенса.",
      },
      {
        id: "team-training",
        title: "Обучение и воркшопы",
        description:
          "Практические программы для эффективной работы с комплаенсом и мониторингом.",
        includes: [
          "Обучение платформе Opticini",
          "Воркшопы по операциям комплаенса",
          "Подготовка к аудитам",
          "Лучшие практики мониторинга",
          "Сессии для команд",
        ],
        closing:
          "Команды могут самостоятельно поддерживать комплаенс и качество.",
      },
      {
        id: "ongoing-advisory",
        title: "Постоянное сопровождение",
        description:
          "Непрерывная экспертная поддержка готовности к комплаенсу и прозрачности.",
        includes: [
          "Регулярные сессии по комплаенсу",
          "Сопровождение мониторинга",
          "Помощь в подготовке к аудитам",
          "Отчётность о прогрессе",
          "Новые риски",
        ],
        closing:
          "Сохраняем темп при изменении инфраструктуры и требований.",
      },
      {
        id: "full-audit",
        title: "Полный аудит комплаенса и инфраструктуры",
        description:
          "Комплекс: оценка готовности, анализ инфраструктуры и план оптимизации.",
        includes: [
          "Полная оценка готовности",
          "Оценка инфраструктуры и рисков",
          "Мульти-рамочный анализ",
          "Дорожная карта улучшений",
          "План действий",
        ],
        closing:
          "Ясный путь к долгосрочному комплаенсу и устойчивости инфраструктуры.",
      },
    ],
    partnerTitle: "Партнёрство с консультантами и аудиторами",
    partnerBody:
      "Opticini поддерживает независимых консультантов и аудиторов: мультиклиентское управление на платформе, консультации и подготовка к формальным аудитам.",
    partnerBenefitsLabel: "Партнёры получают",
    partnerBenefits: [
      "Инструменты для нескольких клиентов",
      "Процессы подготовки к аудитам",
      "Рефералы и партнёрские выплаты",
      "Совместная работа по проектам",
    ],
    requestTitle: "Запросить консультацию",
    requestSub:
      "Опишите задачи по комплаенсу или инфраструктуре — эксперты помогут выстроить путь к сильному управлению, прозрачности и готовности к аудитам.",
    labelName: "Полное имя *",
    labelEmail: "Электронная почта *",
    labelCompany: "Компания",
    labelPhone: "Телефон",
    labelService: "Интересующая услуга *",
    servicePlaceholder: "Выберите услугу",
    serviceCustom: "Другое",
    labelMessage: "Опишите задачи *",
    messagePlaceholder:
      "Опишите задачи по комплаенсу или инфраструктуре и цели...",
    submitScheduling: "Запланировать консультацию",
    submitting: "Отправка...",
    sidebarTitle: "Запланировать звонок",
    sidebarSubtitle: "Ответ в течение 24 часов",
    sidebarBlurb:
      "Выберите удобное время. Мы отправим приглашение в календарь с деталями.",
    hoursWeekdayLabel: "Пн–Пт",
    hoursWeekday: "9:00 – 18:00",
    hoursSatLabel: "Сб",
    hoursSat: "10:00 – 16:00",
    quickContact: "Быстрый контакт",
    ctaTitle: "Трансформируйте процессы комплаенса",
    ctaBody:
      "Запланируйте консультацию, чтобы развивать операции комплаенса с Opticini.",
    requestDemo: "Запросить демо",
    seePlatform: "Смотреть платформу",
    toastSuccessTitle: "Запрос отправлен",
    toastSuccessDesc: "Мы ответим в течение 24 часов",
    toastErrorTitle: "Ошибка",
    toastErrorDesc:
      "Не удалось отправить запрос. Попробуйте снова.",
  }),
}

const SV: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "Prata med sälj",
    heroTitle: "Expertrådgivning inom compliance och infrastruktur",
    heroSubtitle: "Förvandla komplexitet i compliance till operativ tydlighet.",
    intro: [
      "Opticini erbjuder professionell rådgivning så att organisationer kan förstå sin infrastruktur, förbereda sig för revisioner och införa starka arbetssätt för compliance och styrning.",
      "Våra experter arbetar med era team för att tolka systeminsikter, identifiera risker och skapa praktiska förbättringsstrategier.",
    ],
    servicesHeading: "Våra konsulttjänster",
    servicesSub:
      "Omfattande rådgivning som stödjer er organisations mognad inom compliance och infrastruktur.",
    includesLabel: "Inkluderar",
    services: [
      {
        id: "compliance-readiness",
        title: "Bedömning av complianceberedskap",
        description:
          "Strukturerad bedömning av er nuvarande säkerhets- och complianceställning för ramverk som SOC 2, ISO 27001 med flera.",
        includes: [
          "Granskning av infrastruktur och säkerhet",
          "Identifiering av complianceglapp",
          "Koppling av kontroller till krav",
          "Risk- och beredskapsbedömning",
          "Prioriterad compliance-färdplan",
        ],
        closing:
          "Hjälper organisationer att förstå läget och vägen mot revisionsberedskap.",
      },
      {
        id: "infrastructure-risk",
        title: "Infrastruktur- och riskanalys",
        description:
          "Djup analys av konfigurationer, systemhälsa och operativa risker från Opticini-plattformen.",
        includes: [
          "Tolkning av infrastrukturinsikter",
          "Konfigurationsriskanalys",
          "Identifiering av flaskhalsar",
          "Granskning av systemarkitektur",
          "Prioriterade riskminskningsrekommendationer",
        ],
        closing:
          "Vi hjälper team att omsätta insikter i förbättringar.",
      },
      {
        id: "compliance-implementation",
        title: "Strategi för införande av compliance",
        description:
          "Stöd för att införa ramverk effektivt med minimal driftstörning.",
        includes: [
          "Planering av ramverksinförande",
          "Mappning av policyer och kontroller",
          "Strategi för bevisinsamling",
          "Integrationsplanering",
          "Tidsplan och milstolpar",
        ],
        closing:
          "Från plan till genomförande med trygghet.",
      },
      {
        id: "technical-advisory",
        title: "Teknisk rådgivning",
        description:
          "Expertstöd kring arkitektur, integrationer och styrningsautomatisering med Opticini.",
        includes: [
          "Arkitekturgranskning",
          "Infrastrukturdesign",
          "Integrationsplanering",
          "Verktygsval",
          "Automatiseringsstrategier",
        ],
        closing:
          "Bygger hållbar och skalbar compliance-infrastruktur.",
      },
      {
        id: "team-training",
        title: "Utbildning och workshoppar",
        description:
          "Praktiska program för effektiv compliance och infrastrukturövervakning.",
        includes: [
          "Opticini-plattformsutbildning",
          "Workshoppar i compliance-drift",
          "Revisionsförberedelse",
          "Bästa praxis för övervakning",
          "Team-sessioner",
        ],
        closing:
          "Gör teamen självständiga i compliance och kvalitet.",
      },
      {
        id: "ongoing-advisory",
        title: "Löpande rådgivning och support",
        description:
          "Kontinuerlig expertstöd för beredskap och operativ synlighet.",
        includes: [
          "Regelbundna compliance-checkar",
          "Stöd vid infrastrukturövervakning",
          "Hjälp inför revision",
          "Uppföljning och rapportering",
          "Nya risker",
        ],
        closing:
          "Behåller takten när kraven förändras.",
      },
      {
        id: "full-audit",
        title: "Fullständig compliance- och infrastruktursrevision",
        description:
          "Omfattande uppdrag: beredskap, analys och optimeringsplan.",
        includes: [
          "Fullständig beredskapsgranskning",
          "Infrastruktur- och riskbedömning",
          "Multi-ramverksanalys",
          "Förbättringsfärdplan",
          "Prioriterad handlingsplan",
        ],
        closing:
          "En tydlig väg mot långsiktig compliance och motståndskraft.",
      },
    ],
    partnerTitle: "Partnerskap med konsulter och revisorer",
    partnerBody:
      "Opticini stödjer oberoende konsulter och revisorer via partnerprogram: flerkundsstyrning, rådgivning och förberedelse för formella revisioner.",
    partnerBenefitsLabel: "Partners får",
    partnerBenefits: [
      "Verktyg för flera kunder",
      "Arbetsflöden för revisionsberedskap",
      "Hänvisning och affiliateintäkter",
      "Samarbetsverktyg",
    ],
    requestTitle: "Begär konsultation",
    requestSub:
      "Beskriv era utmaningar inom compliance eller infrastruktur – våra experter hjälper er mot tydlig styrning och revisionsberedskap.",
    labelName: "Fullständigt namn *",
    labelEmail: "E-post *",
    labelCompany: "Företag",
    labelPhone: "Telefon",
    labelService: "Tjänst av intresse *",
    servicePlaceholder: "Välj tjänst",
    serviceCustom: "Anpassat / annat",
    labelMessage: "Beskriv era utmaningar *",
    messagePlaceholder:
      "Beskriv utmaningar och mål inom compliance eller infrastruktur...",
    submitScheduling: "Boka konsultation",
    submitting: "Skickar...",
    sidebarTitle: "Boka ert samtal",
    sidebarSubtitle: "Vi svarar inom 24 timmar",
    sidebarBlurb:
      "Välj tid som passar. Vi skickar en kalenderinbjudan med detaljer.",
    hoursWeekdayLabel: "Måndag – fredag",
    hoursWeekday: "09:00 – 18:00",
    hoursSatLabel: "Lördag",
    hoursSat: "10:00 – 16:00",
    quickContact: "Snabbkontakt",
    ctaTitle: "Förbättra er compliance-drift",
    ctaBody:
      "Boka en konsultation för att utveckla er compliance med Opticini.",
    requestDemo: "Begär demo",
    seePlatform: "Se plattformen",
    toastSuccessTitle: "Förfrågan skickad",
    toastSuccessDesc: "Vi återkommer inom 24 timmar.",
    toastErrorTitle: "Fel",
    toastErrorDesc:
      "Kunde inte skicka förfrågan. Försök igen.",
  }),
}

const NO: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "Snakk med salg",
    heroTitle: "Ekspertrådgivning om samsvar og infrastruktur",
    heroSubtitle: "Gjør samsvarskompleksitet om til operasjonell klarhet.",
    intro: [
      "Opticini tilbyr profesjonell rådgivning slik at organisasjoner kan forstå infrastrukturen, forberede seg på revisjoner og innføre gode rutiner for samsvar og styring.",
      "Våre eksperter jobber med teamene deres for å tolke innsikt, finne risiko og lage praktiske forbedringsstrategier.",
    ],
    servicesHeading: "Våre konsulenttjenester",
    servicesSub:
      "Helhetlig rådgivning som støtter modenhet innen samsvar og infrastruktur.",
    includesLabel: "Inkluderer",
    services: [
      {
        id: "compliance-readiness",
        title: "Vurdering av samsvarsberedskap",
        description:
          "Strukturert vurdering av dagens sikkerhets- og samsvarssituasjon for rammeverk som SOC 2, ISO 27001 med flere.",
        includes: [
          "Gjennomgang av infrastruktur og sikkerhet",
          "Finne mangler i samsvar",
          "Knytte kontroller til krav",
          "Risiko- og beredskapsvurdering",
          "Prioritert veikart",
        ],
        closing:
          "Hjelper organisasjoner å forstå ståsted og vei mot revisjonsberedskap.",
      },
      {
        id: "infrastructure-risk",
        title: "Infrastruktur- og risikoanalyse",
        description:
          "Dyp analyse av konfigurasjoner, systemhelse og operative risikoer fra Opticini.",
        includes: [
          "Tolkning av infrastrukturinnsikt",
          "Konfigurasjonsrisiko",
          "Flaskehalser",
          "Arkitekturgjennomgang",
          "Prioriterte anbefalinger",
        ],
        closing:
          "Hjelper team å bruke innsikt til forbedringer.",
      },
      {
        id: "compliance-implementation",
        title: "Strategi for innføring av samsvar",
        description:
          "Veiledning for effektiv innføring med minimal driftsforstyrrelse.",
        includes: [
          "Planlegging av rammeverk",
          "Policy- og kontrollkartlegging",
          "Bevisstrategi",
          "Integrasjonsplan",
          "Tidslinje og milepæler",
        ],
        closing:
          "Fra plan til gjennomføring med trygghet.",
      },
      {
        id: "technical-advisory",
        title: "Teknisk rådgivning",
        description:
          "Ekspertise om arkitektur, integrasjoner og styringsautomatisering med Opticini.",
        includes: [
          "Arkitekturvurdering",
          "Infrastrukturdesign",
          "Integrasjonsplanlegging",
          "Verktøyvalg",
          "Automatiseringsstrategier",
        ],
        closing:
          "Bygger bærekraftig samsvarsinfrastruktur.",
      },
      {
        id: "team-training",
        title: "Opplæring og workshopper",
        description:
          "Praktiske programmer for samsvar og overvåkning.",
        includes: [
          "Opticini-opplæring",
          "Samsvarworkshopper",
          "Revisjonsforberedelse",
          "Beste praksis for overvåkning",
          "Teamsesjoner",
        ],
        closing:
          "Gjør teamene selvstendige.",
      },
      {
        id: "ongoing-advisory",
        title: "Løpende rådgivning og støtte",
        description:
          "Kontinuerlig ekspertstøtte for beredskap og innsyn.",
        includes: [
          "Regelmessige samsvarssjekker",
          "Overvåkningsveiledning",
          "Hjelp til revisjon",
          "Fremdrift og rapportering",
          "Nye risikoer",
        ],
        closing:
          "Opprettholder fremdrift når krav endres.",
      },
      {
        id: "full-audit",
        title: "Full samsvars- og infrastrukturrevisjon",
        description:
          "Omfattende engasjement: beredskap, analyse og optimalisering.",
        includes: [
          "Full beredskapsgjennomgang",
          "Infrastruktur- og risikovurdering",
          "Flere rammeverk",
          "Forbedringsveikart",
          "Handlingsplan",
        ],
        closing:
          "Tydelig vei mot langsiktig samsvar og robusthet.",
      },
    ],
    partnerTitle: "Partnerskap med konsulenter og revisorer",
    partnerBody:
      "Opticini støtter uavhengige konsulenter og revisorer: flerkunde på plattformen, rådgivning og forberedelse til formelle revisjoner.",
    partnerBenefitsLabel: "Partnere får",
    partnerBenefits: [
          "Verktøy for flere kunder",
          "Arbeidsflyt for revisjonsberedskap",
          "Henvisning og affiliate",
          "Samarbeidsverktøy",
    ],
    requestTitle: "Be om konsultasjon",
    requestSub:
      "Beskriv utfordringene innen samsvar eller infrastruktur – ekspertene våre hjelper med vei mot sterk styring og revisjonsberedskap.",
    labelName: "Fullt navn *",
    labelEmail: "E-post *",
    labelCompany: "Selskap",
    labelPhone: "Telefon",
    labelService: "Tjeneste av interesse *",
    servicePlaceholder: "Velg tjeneste",
    serviceCustom: "Tilpasset / annet",
    labelMessage: "Beskriv utfordringene *",
    messagePlaceholder:
      "Beskriv utfordringer og mål innen samsvar eller infrastruktur...",
    submitScheduling: "Bestill konsultasjon",
    submitting: "Sender...",
    sidebarTitle: "Planlegg samtalen",
    sidebarSubtitle: "Svar innen 24 timer",
    sidebarBlurb:
      "Velg tid som passer. Vi sender kalenderinvitasjon med detaljer.",
    hoursWeekdayLabel: "Mandag – fredag",
    hoursWeekday: "09:00 – 18:00",
    hoursSatLabel: "Lørdag",
    hoursSat: "10:00 – 16:00",
    quickContact: "Rask kontakt",
    ctaTitle: "Forbedre samsvarsdriften",
    ctaBody:
      "Bestill en konsultasjon for å utvikle samsvaret med Opticini.",
    requestDemo: "Be om demo",
    seePlatform: "Se plattformen",
    toastSuccessTitle: "Forespørsel sendt",
    toastSuccessDesc: "Vi svarer innen 24 timer.",
    toastErrorTitle: "Feil",
    toastErrorDesc:
      "Kunne ikke sende forespørselen. Prøv igjen.",
  }),
}

const DA: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "Kontakt salg",
    heroTitle: "Ekspertrådgivning om compliance og infrastruktur",
    heroSubtitle: "Gør compliance-kompleksitet til operationel klarhed.",
    intro: [
      "Opticini tilbyder professionel rådgivning, så organisationer kan forstå infrastrukturen, forberede sig på revisioner og implementere stærke compliance- og styringspraksisser.",
      "Vores eksperter arbejder med jeres teams om at fortolke indsigt, finde risici og skabe praktiske forbedringsstrategier.",
    ],
    servicesHeading: "Vores konsulentydelser",
    servicesSub:
      "Omfattende rådgivning, der understøtter modenhed inden for compliance og infrastruktur.",
    includesLabel: "Omfatter",
    services: [
      {
        id: "compliance-readiness",
        title: "Vurdering af compliance-beredskab",
        description:
          "Struktureret vurdering af jeres nuværende sikkerheds- og compliance-stilling for rammer som SOC 2, ISO 27001 m.fl.",
        includes: [
          "Gennemgang af infrastruktur og sikkerhed",
          "Identifikation af compliance-huller",
          "Kobling af kontroller til krav",
          "Risiko- og beredskabsvurdering",
          "Prioriteret compliance-roadmap",
        ],
        closing:
          "Hjælper organisationer med at forstå status og vejen mod revisionsberedskab.",
      },
      {
        id: "infrastructure-risk",
        title: "Infrastruktur- og risikoanalyse",
        description:
          "Dyb analyse af konfigurationer, systemhelbred og operationelle risici fra Opticini.",
        includes: [
          "Fortolkning af infrastrukturindsigt",
          "Konfigurationsrisiko",
          "Flaskehalse",
          "Arkitekturgennemgang",
          "Prioriterede anbefalinger",
        ],
        closing:
          "Hjælper teams med at omsætte indsigt til forbedringer.",
      },
      {
        id: "compliance-implementation",
        title: "Strategi for implementering af compliance",
        description:
          "Vejledning til effektiv implementering med minimal driftsforstyrrelse.",
        includes: [
          "Planlægning af rammeimplementering",
          "Policy- og kontrolkortlægning",
          "Bevisindsamling",
          "Integrationsplanlægning",
          "Tidsplan og milepæle",
        ],
        closing:
          "Fra plan til udførelse med tillid.",
      },
      {
        id: "technical-advisory",
        title: "Teknisk rådgivning",
        description:
          "Ekspertise om arkitektur, integrationer og styringsautomatisering med Opticini.",
        includes: [
          "Arkitekturgennemgang",
          "Infrastrukturdesign",
          "Integrationsplanlægning",
          "Værktøjsvalg",
          "Automatiseringsstrategier",
        ],
        closing:
          "Bygger bæredygtig compliance-infrastruktur.",
      },
      {
        id: "team-training",
        title: "Træning og workshops",
        description:
          "Praktiske programmer til compliance og overvågning.",
        includes: [
          "Opticini-platformstræning",
          "Compliance-workshops",
          "Revisionsforberedelse",
          "Bedste praksis for overvågning",
          "Team-sessioner",
        ],
        closing:
          "Gør teams i stand til at drive compliance selvstændigt.",
      },
      {
        id: "ongoing-advisory",
        title: "Løbende rådgivning og support",
        description:
          "Kontinuerlig ekspertstøtte til beredskab og synlighed.",
        includes: [
          "Regelmæssige compliance-tjek",
          "Overvågningsvejledning",
          "Hjælp til revision",
          "Fremskridt og rapportering",
          "Nye risici",
        ],
        closing:
          "Bevarer momentum når krav ændrer sig.",
      },
      {
        id: "full-audit",
        title: "Fuld compliance- og infrastrukturrevision",
        description:
          "Omfattende forløb: beredskab, analyse og optimeringsplan.",
        includes: [
          "Fuld beredskabsgennemgang",
          "Infrastruktur- og risikovurdering",
          "Multi-rammeanalyse",
          "Forbedringsroadmap",
          "Handlingsplan",
        ],
        closing:
          "Klar vej mod langsigtet compliance og modstandsdygtighed.",
      },
    ],
    partnerTitle: "Partnerskaber med konsulenter og revisorer",
    partnerBody:
      "Opticini understøtter uafhængige konsulenter og revisorer: multi-kundestyring på platformen, rådgivning og forberedelse til formelle revisioner.",
    partnerBenefitsLabel: "Partnere får",
    partnerBenefits: [
      "Værktøjer til flere kunder",
      "Arbejdsgange til revisionsberedskab",
      "Henvisning og affiliate-indtægter",
      "Samarbejdsværktøjer",
    ],
    requestTitle: "Anmod om konsultation",
    requestSub:
      "Beskriv jeres udfordringer inden for compliance eller infrastruktur – vores eksperter hjælper med vejen mod stærk styring og revisionsberedskab.",
    labelName: "Fulde navn *",
    labelEmail: "E-mail *",
    labelCompany: "Virksomhed",
    labelPhone: "Telefon",
    labelService: "Ydelse af interesse *",
    servicePlaceholder: "Vælg ydelse",
    serviceCustom: "Tilpasset / andet",
    labelMessage: "Beskriv udfordringerne *",
    messagePlaceholder:
      "Beskriv compliance- eller infrastrukturudfordringer og mål...",
    submitScheduling: "Book en konsultation",
    submitting: "Sender...",
    sidebarTitle: "Book jeres opkald",
    sidebarSubtitle: "Svar inden for 24 timer",
    sidebarBlurb:
      "Vælg et tidspunkt der passer. Vi sender kalenderinvitation med detaljer.",
    hoursWeekdayLabel: "Mandag – fredag",
    hoursWeekday: "09:00 – 18:00",
    hoursSatLabel: "Lørdag",
    hoursSat: "10:00 – 16:00",
    quickContact: "Hurtig kontakt",
    ctaTitle: "Forbedre jeres compliance-drift",
    ctaBody:
      "Book en konsultation for at udvikle compliance med Opticini.",
    requestDemo: "Anmod om demo",
    seePlatform: "Se platformen",
    toastSuccessTitle: "Anmodning sendt",
    toastSuccessDesc: "Vi vender tilbage inden for 24 timer.",
    toastErrorTitle: "Fejl",
    toastErrorDesc:
      "Kunne ikke sende anmodningen. Prøv igen.",
  }),
}

const ZH: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "联系销售",
    heroTitle: "合规与基础设施专家咨询",
    heroSubtitle: "将合规复杂性转化为清晰可执行的运营路径。",
    intro: [
      "Opticini 提供专业咨询服务，帮助组织了解基础设施现状、准备审计并落实稳健的合规与治理实践。",
      "我们的专家与您的团队一起解读系统洞察、识别风险并制定可落地的改进策略。",
    ],
    servicesHeading: "咨询服务",
    servicesSub: "覆盖合规与基础设施成熟度的综合顾问服务。",
    includesLabel: "包含",
    services: [
      {
        id: "compliance-readiness",
        title: "合规就绪评估",
        description:
          "系统评估当前安全与合规态势，判断 SOC 2、ISO 27001 等框架的审计准备度。",
        includes: [
          "基础设施与安全态势审查",
          "合规差距识别",
          "控制措施与框架映射",
          "风险与就绪评估",
          "优先级合规路线图",
        ],
        closing: "帮助组织了解现状及达到审计就绪所需的步骤。",
      },
      {
        id: "infrastructure-risk",
        title: "基础设施与风险分析",
        description:
          "深入分析配置、系统健康与 Opticini 平台生成的运营风险信号。",
        includes: [
          "基础设施洞察解读",
          "配置风险分析",
          "运营瓶颈识别",
          "系统架构审查",
          "优先风险缓解建议",
        ],
        closing: "帮助团队将平台洞察转化为运营改进。",
      },
      {
        id: "compliance-implementation",
        title: "合规落地策略",
        description: "在尽量减少运营中断的前提下高效落地合规框架。",
        includes: [
          "框架实施规划",
          "政策与控制映射",
          "证据收集策略",
          "与现有系统集成规划",
          "时间表与里程碑",
        ],
        closing: "从规划到执行，稳步推进。",
      },
      {
        id: "technical-advisory",
        title: "技术顾问",
        description: "在架构、系统集成与治理自动化方面提供专家指导。",
        includes: [
          "架构评审与建议",
          "基础设施设计咨询",
          "集成规划",
          "工具选型",
          "合规自动化策略",
        ],
        closing: "帮助构建可持续、可扩展的合规基础设施。",
      },
      {
        id: "team-training",
        title: "团队培训与工作坊",
        description: "实践型培训，帮助团队高效运行合规与基础设施监控。",
        includes: [
          "Opticini 平台培训",
          "合规运营工作坊",
          "审计准备培训",
          "基础设施监控最佳实践",
          "团队赋能课程",
        ],
        closing: "帮助团队独立维持合规与卓越运营。",
      },
      {
        id: "ongoing-advisory",
        title: "持续顾问与支持",
        description: "持续专家支持，保持合规就绪与运营可见性。",
        includes: [
          "定期合规沟通",
          "基础设施监控指导",
          "审计准备协助",
          "进度跟踪与报告",
          "新兴风险顾问",
        ],
        closing: "在基础设施与要求变化时保持 momentum。",
      },
      {
        id: "full-audit",
        title: "合规与基础设施全面审计",
        description: "综合项目：就绪评估、基础设施分析与优化规划。",
        includes: [
          "全面合规就绪审查",
          "基础设施与风险评估",
          "多框架分析",
          "综合改进路线图",
          "优先行动计划",
        ],
        closing: "为长期合规与基础设施韧性提供清晰路径。",
      },
    ],
    partnerTitle: "顾问与审计师合作",
    partnerBody:
      "Opticini 通过合作伙伴计划支持独立顾问与审计专业人士：多客户管理、咨询服务与正式审计准备。",
    partnerBenefitsLabel: "合作伙伴可获得",
    partnerBenefits: [
      "多客户管理工具",
      "审计准备工作流",
      "推荐与联盟收入机会",
      "客户项目协作工具",
    ],
    requestTitle: "预约咨询",
    requestSub:
      "描述您的合规或基础设施挑战，我们的专家将协助您制定清晰路径，加强治理、运营洞察与审计准备。",
    labelName: "姓名 *",
    labelEmail: "电子邮箱 *",
    labelCompany: "公司",
    labelPhone: "电话",
    labelService: "感兴趣的服务 *",
    servicePlaceholder: "请选择服务",
    serviceCustom: "自定义 / 其他",
    labelMessage: "描述您的需求 *",
    messagePlaceholder: "请描述合规或基础设施挑战与目标…",
    submitScheduling: "预约咨询",
    submitting: "提交中…",
    sidebarTitle: "预约通话",
    sidebarSubtitle: "24 小时内回复",
    sidebarBlurb: "选择合适时间，我们将发送包含会议详情的日历邀请。",
    hoursWeekdayLabel: "周一至周五",
    hoursWeekday: "9:00 – 18:00",
    hoursSatLabel: "周六",
    hoursSat: "10:00 – 16:00",
    quickContact: "快速联系",
    ctaTitle: "升级您的合规运营",
    ctaBody: "预约咨询，开始使用 Opticini 推动合规转型。",
    requestDemo: "申请演示",
    seePlatform: "了解平台",
    toastSuccessTitle: "咨询请求已提交",
    toastSuccessDesc: "我们将在 24 小时内回复后续步骤。",
    toastErrorTitle: "错误",
    toastErrorDesc: "提交失败，请重试。",
  }),
}

const JA: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "営業に問い合わせ",
    heroTitle: "コンプライアンスとインフラの専門コンサルティング",
    heroSubtitle: "コンプライアンスの複雑さを、運用の明確さへ。",
    intro: [
      "Opticini は、インフラの状況把握、監査準備、強固なガバナンスとコンプライアンスの実践に向けたプロフェッショナルなコンサルティングを提供します。",
      "専門家がチームとともにシステムの示唆を読み解き、リスクを特定し、継続的なコンプライアンスに向けた実践的な改善策を立てます。",
    ],
    servicesHeading: "コンサルティングサービス",
    servicesSub:
      "組織のコンプライアンスとインフラの成熟度を支える包括的なアドバイザリーです。",
    includesLabel: "含まれるもの",
    services: [
      {
        id: "compliance-readiness",
        title: "コンプライアンス準備度評価",
        description:
          "SOC 2、ISO 27001 などのフレームワークに対する現在のセキュリティとコンプライアンスの姿を体系的に評価します。",
        includes: [
          "インフラとセキュリティのレビュー",
          "ギャップの特定",
          "コントロールのマッピング",
          "リスクと準備度の評価",
          "優先度付きロードマップ",
        ],
        closing: "監査準備に必要な位置づけとステップを明確にします。",
      },
      {
        id: "infrastructure-risk",
        title: "インフラとリスク分析",
        description:
          "構成、システムヘルス、Opticini が示すオペレーションリスクを深く分析します。",
        includes: [
          "インフラインサイトの解釈",
          "構成リスク分析",
          "ボトルネックの特定",
          "アーキテクチャレビュー",
          "優先的なリスク低減の提案",
        ],
        closing: "プラットフォームの示唆を運用改善につなげます。",
      },
      {
        id: "compliance-implementation",
        title: "コンプライアンス実装戦略",
        description:
          "運用への影響を抑えながら、フレームワークを効率的に実装する支援です。",
        includes: [
          "実装計画",
          "ポリシーとコントロールのマッピング",
          "エビデンス収集戦略",
          "既存システムとの統合計画",
          "スケジュールとマイルストーン",
        ],
        closing: "計画から実行に自信を持って進めます。",
      },
      {
        id: "technical-advisory",
        title: "テクニカルアドバイザリー",
        description:
          "アーキテクチャ、統合、ガバナンス自動化について Opticini を活用した専門支援です。",
        includes: [
          "アーキテクチャレビュー",
          "インフラ設計の相談",
          "統合計画",
          "ツール選定",
          "コンプライアンス自動化の戦略",
        ],
        closing: "持続可能で拡張性の高いコンプライアンス基盤を支えます。",
      },
      {
        id: "team-training",
        title: "チーム研修とワークショップ",
        description:
          "コンプライアンスとインフラ監視を効果的に運用するための実践型プログラムです。",
        includes: [
          "Opticini プラットフォーム研修",
          "コンプライアンス運用ワークショップ",
          "監査準備トレーニング",
          "監視のベストプラクティス",
          "チーム向けセッション",
        ],
        closing: "チームが自律的にコンプライアンスと品質を維持できるようにします。",
      },
      {
        id: "ongoing-advisory",
        title: "継続的なアドバイザリーとサポート",
        description:
          "コンプライアンスの準備度と運用の可視性を維持するための継続的な専門支援です。",
        includes: [
          "定期的なコンプライアンス確認",
          "インフラ監視のガイダンス",
          "監査準備のサポート",
          "進捗の追跡と報告",
          "新たなリスクへの助言",
        ],
        closing: "インフラと要件の変化に合わせて推進力を維持します。",
      },
      {
        id: "full-audit",
        title: "コンプライアンスとインフラの総合監査",
        description:
          "準備度評価、インフラ分析、最適化計画を組み合わせた包括的な取り組みです。",
        includes: [
          "コンプライアンス準備の総合レビュー",
          "インフラとリスク評価",
          "複数フレームワーク分析",
          "包括的な改善ロードマップ",
          "優先アクションプラン",
        ],
        closing: "長期的なコンプライアンスとレジリエンスへの明確な道筋を示します。",
      },
    ],
    partnerTitle: "コンサルタント・監査人とのパートナーシップ",
    partnerBody:
      "Opticini はパートナープログラムを通じて独立コンサルタントと監査専門家を支援します。複数クライアントの管理、助言、正式な監査の準備が可能です。",
    partnerBenefitsLabel: "パートナーに提供されるもの",
    partnerBenefits: [
      "マルチクライアント管理ツール",
      "監査準備ワークフロー",
      "紹介・アフィリエイト収益の機会",
      "クライアント案件のコラボレーション",
    ],
    requestTitle: "相談を申し込む",
    requestSub:
      "コンプライアンスやインフラの課題をお聞かせください。専門家がガバナンス強化、運用インサイト、監査準備への道筋を支援します。",
    labelName: "氏名 *",
    labelEmail: "メール *",
    labelCompany: "会社名",
    labelPhone: "電話",
    labelService: "関心のあるサービス *",
    servicePlaceholder: "サービスを選択",
    serviceCustom: "カスタム / その他",
    labelMessage: "課題を記入 *",
    messagePlaceholder:
      "コンプライアンスやインフラの課題と達成したいことを記入してください…",
    submitScheduling: "相談を予約",
    submitting: "送信中…",
    sidebarTitle: "通話を予約",
    sidebarSubtitle: "24時間以内に返信",
    sidebarBlurb:
      "ご都合のよい時間を選んでください。カレンダー招待の詳細をお送りします。",
    hoursWeekdayLabel: "月〜金",
    hoursWeekday: "9:00 – 18:00",
    hoursSatLabel: "土",
    hoursSat: "10:00 – 16:00",
    quickContact: "クイック連絡",
    ctaTitle: "コンプライアンス運用を変える",
    ctaBody:
      "相談を予約し、Opticini でコンプライアンス運用の変革を始めましょう。",
    requestDemo: "デモを依頼",
    seePlatform: "プラットフォームを見る",
    toastSuccessTitle: "相談依頼を送信しました",
    toastSuccessDesc: "24時間以内に次のステップをご連絡します。",
    toastErrorTitle: "エラー",
    toastErrorDesc: "送信に失敗しました。もう一度お試しください。",
  }),
}

const KO: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "영업 문의",
    heroTitle: "컴플라이언스·인프라 전문 컨설팅",
    heroSubtitle: "컴플라이언스 복잡성을 운영적 명확성으로 바꿉니다.",
    intro: [
      "Opticini는 조직이 인프라 현황을 이해하고 감사를 준비하며 견고한 컴플라이언스·거버넌스를 구축하도록 돕는 전문 컨설팅을 제공합니다.",
      "전문가가 팀과 함께 시스템 인사이트를 해석하고, 리스크를 식별하며 실질적인 개선 전략을 수립합니다.",
    ],
    servicesHeading: "컨설팅 서비스",
    servicesSub: "컴플라이언스와 인프라 성숙도를 지원하는 포괄적인 자문입니다.",
    includesLabel: "포함",
    services: [
      {
        id: "compliance-readiness",
        title: "컴플라이언스 준비도 평가",
        description:
          "SOC 2, ISO 27001 등 프레임워크에 대한 현재 보안·컴플라이언스 상태를 체계적으로 평가합니다.",
        includes: [
          "인프라·보안 상태 검토",
          "컴플라이언스 격차 식별",
          "통제 매핑",
          "리스크·준비도 평가",
          "우선순위 로드맵",
        ],
        closing: "감사 준비에 필요한 위치와 단계를 정리합니다.",
      },
      {
        id: "infrastructure-risk",
        title: "인프라·리스크 분석",
        description:
          "구성, 시스템 상태, Opticini가 제공하는 운영 리스크 신호를 심층 분석합니다.",
        includes: [
          "인프라 인사이트 해석",
          "구성 리스크 분석",
          "병목 식별",
          "아키텍처 검토",
          "우선 완화 권고",
        ],
        closing: "플랫폼 인사이트를 운영 개선으로 연결합니다.",
      },
      {
        id: "compliance-implementation",
        title: "컴플라이언스 구현 전략",
        description:
          "운영 중단을 최소화하며 프레임워크를 효율적으로 도입합니다.",
        includes: [
          "구현 계획",
          "정책·통제 매핑",
          "증거 수집 전략",
          "기존 시스템 통합 계획",
          "일정·마일스톤",
        ],
        closing: "계획에서 실행까지 자신 있게 진행합니다.",
      },
      {
        id: "technical-advisory",
        title: "기술 자문",
        description:
          "아키텍처, 통합, 거버넌스 자동화에 대한 전문 지원입니다.",
        includes: [
          "아키텍처 검토",
          "인프라 설계 자문",
          "통합 계획",
          "도구 선정",
          "컴플라이언스 자동화 전략",
        ],
        closing: "지속 가능하고 확장 가능한 컴플라이언스 인프라를 돕습니다.",
      },
      {
        id: "team-training",
        title: "팀 교육·워크숍",
        description:
          "컴플라이언스와 인프라 모니터링을 효과적으로 운영하는 실습형 프로그램입니다.",
        includes: [
          "Opticini 플랫폼 교육",
          "컴플라이언스 운영 워크숍",
          "감사 준비 교육",
          "모니터링 모범 사례",
          "팀 역량 세션",
        ],
        closing: "팀이 스스로 컴플라이언스와 운영 우수성을 유지하도록 합니다.",
      },
      {
        id: "ongoing-advisory",
        title: "지속 자문·지원",
        description:
          "컴플라이언스 준비도와 운영 가시성을 유지하는 지속적인 전문 지원입니다.",
        includes: [
          "정기 컴플라이언스 점검",
          "인프라 모니터링 가이드",
          "감사 준비 지원",
          "진행 상황·보고",
          "신규 리스크 자문",
        ],
        closing: "인프라와 요구가 변해도 추진력을 유지합니다.",
      },
      {
        id: "full-audit",
        title: "컴플라이언스·인프라 종합 감사",
        description:
          "준비도 평가, 인프라 분석, 최적화 계획을 결합한 포괄적 과제입니다.",
        includes: [
          "전체 준비도 검토",
          "인프라·리스크 평가",
          "다중 프레임워크 분석",
          "종합 개선 로드맵",
          "우선 실행 계획",
        ],
        closing: "장기 컴플라이언스와 회복력을 위한 명확한 경로를 제시합니다.",
      },
    ],
    partnerTitle: "컨설턴트·감사 파트너십",
    partnerBody:
      "Opticini는 파트너 프로그램으로 독립 컨설턴트와 감사 전문가를 지원합니다. 다수 고객 관리, 자문, 공식 감사 준비가 가능합니다.",
    partnerBenefitsLabel: "파트너 혜택",
    partnerBenefits: [
      "다중 고객 관리 도구",
      "감사 준비 워크플로",
      "추천·제휴 수익 기회",
      "고객 프로젝트 협업 도구",
    ],
    requestTitle: "상담 요청",
    requestSub:
      "컴플라이언스·인프라 과제를 알려주세요. 전문가가 거버넌스 강화, 운영 인사이트, 감사 준비를 돕습니다.",
    labelName: "이름 *",
    labelEmail: "이메일 *",
    labelCompany: "회사",
    labelPhone: "전화",
    labelService: "관심 서비스 *",
    servicePlaceholder: "서비스 선택",
    serviceCustom: "맞춤 / 기타",
    labelMessage: "과제 설명 *",
    messagePlaceholder:
      "컴플라이언스·인프라 과제와 목표를 적어 주세요…",
    submitScheduling: "상담 예약",
    submitting: "제출 중…",
    sidebarTitle: "통화 예약",
    sidebarSubtitle: "24시간 내 응답",
    sidebarBlurb:
      "편한 시간을 선택하세요. 일정 초대와 상세 정보를 보내 드립니다.",
    hoursWeekdayLabel: "월–금",
    hoursWeekday: "9:00 – 18:00",
    hoursSatLabel: "토",
    hoursSat: "10:00 – 16:00",
    quickContact: "빠른 연락",
    ctaTitle: "컴플라이언스 운영을 전환하세요",
    ctaBody: "상담을 예약하고 Opticini로 컴플라이언스 운영을 개선하세요.",
    requestDemo: "데모 요청",
    seePlatform: "플랫폼 보기",
    toastSuccessTitle: "상담 요청이 접수되었습니다",
    toastSuccessDesc: "24시간 내 다음 단계를 안내합니다.",
    toastErrorTitle: "오류",
    toastErrorDesc: "전송에 실패했습니다. 다시 시도하세요.",
  }),
}

const HI: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "बिक्री से संपर्क",
    heroTitle: "अनुपालन और इंफ्रास्ट्रक्चर विशेषज्ञ परामर्श",
    heroSubtitle: "अनुपालन की जटिलता को परिचालन स्पष्टता में बदलें।",
    intro: [
      "Opticini पेशेवर परामर्श प्रदान करता है ताकि संगठन अपनी इंफ्रास्ट्रक्चर स्थिति समझ सकें, ऑडिट की तैयारी कर सकें और मजबूत अनुपालन व शासन प्रथाएँ लागू कर सकें।",
      "हमारे विशेषज्ञ आपकी टीमों के साथ सिस्टम इनसाइट की व्याख्या, जोखिम पहचान और व्यावहारिक सुधार रणनीतियाँ बनाते हैं।",
    ],
    servicesHeading: "हमारी परामर्श सेवाएँ",
    servicesSub:
      "आपके संगठन की अनुपालन व इंफ्रास्ट्रक्चर परिपक्वता के लिए व्यापक सलाह।",
    includesLabel: "शामिल",
    services: [
      {
        id: "compliance-readiness",
        title: "अनुपालन तत्परता मूल्यांकन",
        description:
          "SOC 2, ISO 27001 आदि फ्रेमवर्क के लिए वर्तमान सुरक्षा व अनुपालन स्थिति का संरचित मूल्यांकन।",
        includes: [
          "इंफ्रास्ट्रक्चर व सुरक्षा समीक्षा",
          "अनुपालन अंतर की पहचान",
          "नियंत्रण मैपिंग",
          "जोखिम व तत्परता मूल्यांकन",
          "प्राथमिकता रोडमैप",
        ],
        closing:
          "संगठनों को अपनी स्थिति और ऑडिट तत्परता के चरण समझने में मदद करता है।",
      },
      {
        id: "infrastructure-risk",
        title: "इंफ्रास्ट्रक्चर व जोखिम विश्लेषण",
        description:
          "कॉन्फ़िगरेशन, सिस्टम स्वास्थ्य और Opticini से परिचालन जोखिम संकेतों का गहरा विश्लेषण।",
        includes: [
          "इंफ्रास्ट्रक्चर इनसाइट व्याख्या",
          "कॉन्फ़िगरेशन जोखिम",
          "बाधाओं की पहचान",
          "आर्किटेक्चर समीक्षा",
          "प्राथमिकता कमी सिफारिशें",
        ],
        closing:
          "प्लेटफ़ॉर्म इनसाइट को परिचालन सुधार में बदलने में मदद करता है।",
      },
      {
        id: "compliance-implementation",
        title: "अनुपालन कार्यान्वयन रणनीति",
        description:
          "न्यूनतम व्यवधान के साथ फ्रेमवर्क कुशलता से लागू करने का मार्गदर्शन।",
        includes: [
          "इम्प्लीमेंटेशन योजना",
          "नीति व नियंत्रण मैपिंग",
          "साक्ष्य संग्रह रणनीति",
          "एकीकरण योजना",
          "समयसारणी व मील के पत्थर",
        ],
        closing: "योजना से निष्पादन तक विश्वास के साथ।",
      },
      {
        id: "technical-advisory",
        title: "तकनीकी सलाह",
        description:
          "आर्किटेक्चर, एकीकरण और शासन स्वचालन में Opticini के साथ विशेषज्ञ मार्गदर्शन।",
        includes: [
          "आर्किटेक्चर समीक्षा",
          "इंफ्रास्ट्रक्चर डिज़ाइन परामर्श",
          "एकीकरण योजना",
          "टूल चयन",
          "अनुपालन स्वचालन रणनीतियाँ",
        ],
        closing: "टिकाऊ, स्केलेबल अनुपालन इंफ्रास्ट्रक्चर बनाने में मदद करता है।",
      },
      {
        id: "team-training",
        title: "टीम प्रशिक्षण व कार्यशालाएँ",
        description:
          "अनुपालन व इंफ्रास्ट्रक्चर निगरानी प्रभावी ढंग से चलाने के लिए व्यावहारिक कार्यक्रम।",
        includes: [
          "Opticini प्लेटफ़ॉर्म प्रशिक्षण",
          "अनुपालन संचालन कार्यशालाएँ",
          "ऑडिट तैयारी प्रशिक्षण",
          "निगरानी सर्वोत्तम अभ्यास",
          "टीम सक्षमता सत्र",
        ],
        closing:
          "टीमों को स्वतंत्र रूप से अनुपालन व परिचालन उत्कृष्टता बनाए रखने में सक्षम बनाता है।",
      },
      {
        id: "ongoing-advisory",
        title: "निरंतर सलाह व सहायता",
        description:
          "अनुपालन तत्परता व परिचालन दृश्यता बनाए रखने के लिए निरंतर विशेषज्ञ मार्गदर्शन।",
        includes: [
          "नियमित अनुपालन चेक-इन",
          "इंफ्रास्ट्रक्चर निगरानी मार्गदर्शन",
          "ऑडिट तैयारी सहायता",
          "प्रगति ट्रैकिंग व रिपोर्टिंग",
          "उभरते जोखिम पर सलाह",
        ],
        closing:
          "जैसे-जैसे आवश्यकताएँ बदलती हैं गति बनाए रखता है।",
      },
      {
        id: "full-audit",
        title: "पूर्ण अनुपालन व इंफ्रास्ट्रक्चर ऑडिट",
        description:
          "तत्परता मूल्यांकन, इंफ्रास्ट्रक्चर विश्लेषण और अनुकूलन योजना का संयोजन।",
        includes: [
          "पूर्ण तत्परता समीक्षा",
          "इंफ्रास्ट्रक्चर व जोखिम मूल्यांकन",
          "बहु-फ्रेमवर्क विश्लेषण",
          "व्यापक सुधार रोडमैप",
          "प्राथमिकता कार्य योजना",
        ],
        closing:
          "दीर्घकालिक अनुपालन व लचीलेपन की स्पष्ट दिशा प्रदान करता है।",
      },
    ],
    partnerTitle: "सलाहकार व ऑडिटर साझेदारी",
    partnerBody:
      "Opticini स्वतंत्र सलाहकारों और ऑडिट पेशेवरों को पार्टनर कार्यक्रम के माध्यम से समर्थन देता है: मल्टी-क्लाइंट प्रबंधन, सलाह और औपचारिक ऑडिट की तैयारी।",
    partnerBenefitsLabel: "साझेदारों को लाभ",
    partnerBenefits: [
      "मल्टी-क्लाइंट प्रबंधन उपकरण",
      "ऑडिट तत्परता वर्कफ़्लो",
      "रेफ़रल व सहबद्ध आय के अवसर",
      "ग्राहक परियोजनाओं के लिए सहयोग उपकरण",
    ],
    requestTitle: "परामर्श का अनुरोध",
    requestSub:
      "अपनी अनुपालन या इंफ्रास्ट्रक्चर चुनौतियाँ बताएँ — विशेषज्ञ मजबूत शासन, परिचालन इनसाइट और ऑडिट तत्परता का स्पष्ट मार्ग तैयार करने में मदद करते हैं।",
    labelName: "पूरा नाम *",
    labelEmail: "ईमेल *",
    labelCompany: "कंपनी",
    labelPhone: "फ़ोन",
    labelService: "रुचि की सेवा *",
    servicePlaceholder: "सेवा चुनें",
    serviceCustom: "कस्टम / अन्य",
    labelMessage: "चुनौतियाँ बताएँ *",
    messagePlaceholder:
      "अनुपालन या इंफ्रास्ट्रक्चर चुनौतियाँ और लक्ष्य वर्णन करें…",
    submitScheduling: "परामर्श निर्धारित करें",
    submitting: "भेजा जा रहा है...",
    sidebarTitle: "कॉल अनुसूचित करें",
    sidebarSubtitle: "24 घंटे में उत्तर",
    sidebarBlurb:
      "उपयुक्त समय चुनें। हम बैठक विवरण के साथ कैलेंडर निमंत्रण भेजेंगे।",
    hoursWeekdayLabel: "सोम–शुक्र",
    hoursWeekday: "9:00 – 18:00",
    hoursSatLabel: "शनि",
    hoursSat: "10:00 – 16:00",
    quickContact: "त्वरित संपर्क",
    ctaTitle: "अपने अनुपालन संचालन को बदलें",
    ctaBody:
      "Opticini के साथ अनुपालन संचालन बदलने के लिए परामर्श निर्धारित करें।",
    requestDemo: "डेमो का अनुरोध",
    seePlatform: "प्लेटफ़ॉर्म देखें",
    toastSuccessTitle: "अनुरोध सबमिट हुआ",
    toastSuccessDesc: "24 घंटे में अगले चरणों के साथ जवाब देंगे।",
    toastErrorTitle: "त्रुटि",
    toastErrorDesc:
      "परामर्ग अनुरोध सबमिट नहीं हो सका। पुनः प्रयास करें।",
  }),
}

const AR: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "التواصل مع المبيعات",
    heroTitle: "استشارات خبراء في الامتثال والبنية التحتية",
    heroSubtitle: "حوّل تعقيد الامتثال إلى وضوح تشغيلي.",
    intro: [
      "توفر Opticini استشارات مهنية لمساعدة المؤسسات على فهم وضع البنية التحتية والتهيئة للتدقيق وتطبيق ممارسات قوية للامتثال والحوكمة.",
      "يعمل خبراؤنا مع فرقكم لتفسير رؤى الأنظمة وتحديد المخاطر ووضع استراتيجيات تحسين عملية.",
    ],
    servicesHeading: "خدماتنا الاستشارية",
    servicesSub:
      "خدمات استشارية شاملة لدعم نضج الامتثال والبنية التحتية لمؤسستكم.",
    includesLabel: "يتضمن",
    services: [
      {
        id: "compliance-readiness",
        title: "تقييم جاهزية الامتثال",
        description:
          "تقييم منهجي للوضع الأمني والامتثالي الحالي لأطر مثل SOC 2 وISO 27001 وغيرها.",
        includes: [
          "مراجعة البنية التحتية والأمن",
          "تحديد فجوات الامتثال",
          "ربط الضوابط بالمتطلبات",
          "تقييم المخاطر والجاهزية",
          "خارطة طريق للامتثال ذات أولوية",
        ],
        closing:
          "يساعد المؤسسات على فهم وضعها والخطوات نحو التهيئة للتدقيق.",
      },
      {
        id: "infrastructure-risk",
        title: "تحليل البنية التحتية والمخاطر",
        description:
          "تحليل عميق للتكوينات وصحة الأنظمة وإشارات المخاطر التشغيلية من منصة Opticini.",
        includes: [
          "تفسير رؤى البنية التحتية",
          "تحليل مخاطر التكوين",
          "تحديد الاختناقات",
          "مراجعة البنية",
          "توصيات مُرَوَّمة للحد من المخاطر",
        ],
        closing:
          "نساعد الفرق على تحويل رؤى المنصة إلى تحسينات تشغيلية.",
      },
      {
        id: "compliance-implementation",
        title: "استراتيجية تنفيذ الامتثال",
        description:
          "إرشاد لتنفيذ أطر الامتثال بكفاءة مع تقليل التعطيل التشغيلي.",
        includes: [
          "تخطيط الامتثال للإطار",
          "ربط السياسات والضوابط",
          "استراتيجية جمع الأدلة",
          "تخطيط التكامل مع الأنظمة",
          "الجدول الزمني والمعالم",
        ],
        closing: "من التخطيط إلى التنفيذ بثقة.",
      },
      {
        id: "technical-advisory",
        title: "استشارات تقنية",
        description:
          "خبرة في البنية والتكامل وأتمتة الحوكمة باستخدام Opticini.",
        includes: [
          "مراجعة البنية والتوصيات",
          "استشارة تصميم البنية التحتية",
          "تخطيط التكامل",
          "اختيار الأدوات",
          "استراتيجيات أتمتة الامتثال",
        ],
        closing:
          "يساعد على بناء بنية تحتية للامتثال مستدامة وقابلة للتوسع.",
      },
      {
        id: "team-training",
        title: "تدريب وورش عمل للفرق",
        description:
          "برامج عملية لتشغيل الامتثال ومراقبة البنية التحتية بفعالية.",
        includes: [
          "تدريب على منصة Opticini",
          "ورش عمليات الامتثال",
          "تدريب على التهيئة للتدقيق",
          "أفضل ممارسات المراقبة",
          "جلسات تمكين الفريق",
        ],
        closing:
          "يمكّن الفرق من الحفاظ على الامتثال والتميز التشغيلي بشكل مستقل.",
      },
      {
        id: "ongoing-advisory",
        title: "استشارات ودعم مستمر",
        description:
          "إرشاد خبراء مستمر للحفاظ على جاهزية الامتثال والرؤية التشغيلية.",
        includes: [
          "متابعات دورية للامتثال",
          "إرشاد لمراقبة البنية التحتية",
          "دعم التهيئة للتدقيق",
          "تتبع التقدم والتقارير",
          "مخاطر جديدة",
        ],
        closing:
          "يحافظ على الزخم مع تطور المتطلبات والبنية التحتية.",
      },
      {
        id: "full-audit",
        title: "تدقيق شامل للامتثال والبنية التحتية",
        description:
          "تكليف شامل يجمع تقييم الجاهزية وتحليل البنية التحتية وتخطيط التحسين.",
        includes: [
          "مراجعة شاملة للجاهزية",
          "تقييم البنية التحتية والمخاطر",
          "تحليل متعدد الأطر",
          "خارطة طريق تحسين شاملة",
          "خطة عمل ذات أولوية",
        ],
        closing:
          "مسار واضح نحو امتثال طويل الأمد ومرونة البنية التحتية.",
      },
    ],
    partnerTitle: "شراكات مع مستشارين ومدققين",
    partnerBody:
      "تدعم Opticini المستشارين المستقلين ومحترفي التدقيق عبر برنامج الشركاء: إدارة متعددة العملاء، واستشارات، وتهيئة للتدقيق الرسمي.",
    partnerBenefitsLabel: "يستفيد الشركاء من",
    partnerBenefits: [
      "أدوات إدارة متعددة العملاء",
      "سير عمل التهيئة للتدقيق",
      "فرص إحالة وإيرادات شراكة",
      "أدوات تعاون للمشاريع",
    ],
    requestTitle: "طلب استشارة",
    requestSub:
      "صفوا تحديات الامتثال أو البنية التحتية — يساعدكم خبراؤنا على حوكمة أقوى ورؤية تشغيلية وتهيئة للتدقيق.",
    labelName: "الاسم الكامل *",
    labelEmail: "البريد الإلكتروني *",
    labelCompany: "الشركة",
    labelPhone: "الهاتف",
    labelService: "الخدمة المطلوبة *",
    servicePlaceholder: "اختر خدمة",
    serviceCustom: "مخصص / أخرى",
    labelMessage: "صف التحديات *",
    messagePlaceholder:
      "صفوا تحديات الامتثال أو البنية التحتية وأهدافكم…",
    submitScheduling: "جدولة استشارة",
    submitting: "جارٍ الإرسال...",
    sidebarTitle: "جدولة المكالمة",
    sidebarSubtitle: "نرد خلال 24 ساعة",
    sidebarBlurb:
      "اختروا وقتاً مناسباً. سنرسل دعوة تقويم مع التفاصيل.",
    hoursWeekdayLabel: "الإثنين – الجمعة",
    hoursWeekday: "9:00 – 18:00",
    hoursSatLabel: "السبت",
    hoursSat: "10:00 – 16:00",
    quickContact: "اتصال سريع",
    ctaTitle: "حوّلوا عمليات الامتثال",
    ctaBody:
      "جدّوا استشارة لبدء تطوير عمليات الامتثال مع Opticini.",
    requestDemo: "طلب عرض",
    seePlatform: "عرض المنصة",
    toastSuccessTitle: "تم إرسال طلب الاستشارة",
    toastSuccessDesc: "سنعود إليكم خلال 24 ساعة بالخطوات التالية.",
    toastErrorTitle: "خطأ",
    toastErrorDesc:
      "تعذر إرسال طلب الاستشارة. حاولوا مرة أخرى.",
  }),
}

const HE: ConsultPayload = {
  consult: mergeConsult({
    heroBadge: "דברו עם מכירות",
    heroTitle: "ייעוץ מומחים לתאימות ותשתיות",
    heroSubtitle: "הפכו את מורכבות התאימות לבהירות תפעולית.",
    intro: [
      "Opticini מספקת שירותי ייעוץ מקצועיים שעוזרים לארגונים להבין את מצב התשתית, להתכונן לביקורות וליישם פרקטיקות תאימות וממשל חזקות.",
      "המומחים שלנו עובדים עם הצוותים שלכם לפרש תובנות מערכת, לזהות סיכונים ולבנות אסטרטגיות שיפור מעשיות.",
    ],
    servicesHeading: "שירותי הייעוץ שלנו",
    servicesSub:
      "ייעוץ מקיף לתמיכה בבשלות התאימות והתשתית בארגון.",
    includesLabel: "כולל",
    services: [
      {
        id: "compliance-readiness",
        title: "הערכת מוכנות לתאימות",
        description:
          "הערכה מובנית של מצב האבטחה והתאימות הנוכחי לפריימוורקים כמו SOC 2, ISO 27001 ועוד.",
        includes: [
          "סקירת תשתית ואבטחה",
          "זיהוי פערי תאימות",
          "מיפוי בקרות מול דרישות",
          "הערכת סיכון ומוכנות",
          "מפת דרכים מעוצבת עדיפות",
        ],
        closing:
          "עוזר לארגונים להבין את מצבם ואת הצעדים לקראת מוכנות לביקורת.",
      },
      {
        id: "infrastructure-risk",
        title: "ניתוח תשתית וסיכונים",
        description:
          "ניתוח מעמיק של מערכות, תצורות ואותות סיכון תפעולי מפלטפורמת Opticini.",
        includes: [
          "פירוש תובנות תשתית",
          "ניתוח סיכוני תצורה",
          "זיהוי צווארי בקבוק",
          "סקירת ארכיטקטורה",
          "המלצות מיתוג סיכונים",
        ],
        closing:
          "מסייעות לצוותים להפוך תובנות לשיפורים תפעוליים.",
      },
      {
        id: "compliance-implementation",
        title: "אסטרטגיית יישום תאימות",
        description:
          "הכוונה ליישום יעיל של פריימוורקים עם הפרעה תפעולית מינימלית.",
        includes: [
          "תכנון יישום הפריימוורק",
          "מיפוי מדיניות ובקרות",
          "אסטרטגיית איסוף ראיות",
          "תכנון שילוב עם מערכות קיימות",
          "לוח זמנים ואבני דרך",
        ],
        closing: "מתכנון לביצוע בביטחון.",
      },
      {
        id: "technical-advisory",
        title: "ייעוץ טכני",
        description:
          "מומחיות בארכיטקטורה, אינטגרציה ואוטומציית ממשל עם Opticini.",
        includes: [
          "סקירת ארכיטקטורה והמלצות",
          "ייעוץ לעיצוב תשתית",
          "תכנון אינטגרציות",
          "בחירת כלים",
          "אסטרטגיות אוטומציה לתאימות",
        ],
        closing:
          "בונה תשתית תאימות בת קיימא וניתנת להרחבה.",
      },
      {
        id: "team-training",
        title: "הכשרות וסדנאות לצוותים",
        description:
          "תוכניות מעשיות לתפעול יעיל של תאימות וניטור תשתית.",
        includes: [
          "הכשרה לפלטפורמת Opticini",
          "סדנאות תפעול תאימות",
          "הכנה לביקורת",
          "שיטות עבודה מומלצות לניטור",
          "מפגשי העצמות צוות",
        ],
        closing:
          "מאפשר לצוותים לשמור על תאימות ומצוינות תפעולית בעצמאות.",
      },
      {
        id: "ongoing-advisory",
        title: "ייעוץ ותמיכה מתמשכים",
        description:
          "ליווי מומחים רציף לשמירה על מוכנות לתאימות ותשתית ראייה תפעולית.",
        includes: [
          "בדיקות תאימות תקופתיות",
          "הכוונה לניטור תשתית",
          "תמיכה בהכנה לביקורת",
          "מעקב ודיווח התקדמות",
          "סיכונים חדשים",
        ],
        closing:
          "שומר על מומנטום כשהדרישות מתפתחות.",
      },
      {
        id: "full-audit",
        title: "ביקורת מלאה לתאימות ותשתית",
        description:
          "מעורבות מקיפה: הערכת מוכנות, ניתוח תשתית ותכנון אופטימיזציה.",
        includes: [
          "סקירת מוכנות מלאה",
          "הערכת תשתית וסיכונים",
          "ניתוח רב-פריימוורק",
          "מפת דרכים לשיפור",
          "תוכנית פעולה מעוצבת",
        ],
        closing:
          "מסלול ברור לתאימות ארוכת טווח וחוסן תשתיתי.",
      },
    ],
    partnerTitle: "שותפות עם יועצים ומבקרים",
    partnerBody:
      "Opticini תומכת גם ביועצים עצמאיים ובמקצועי ביקורת דרך תוכנית השותפים: ניהול מרובה לקוחות, ייעוץ והכנה לביקורות פורמליות.",
    partnerBenefitsLabel: "שותפים נהנים מ",
    partnerBenefits: [
      "כלי ניהול מרובי לקוחות",
      "זרימות עבודה להכנה לביקורת",
      "הזדמנויות הפניה והכנסות שותפים",
      "כלי שיתוף פעולה לפרויקטים",
    ],
    requestTitle: "בקשת ייעוץ",
    requestSub:
      "ספרו על אתגרי התאימות או התשתית — המומחים שלנו עוזרים לבנות מסלול ברור לממשל חזק, תובנה תפעולית והכנה לביקורת.",
    labelName: "שם מלא *",
    labelEmail: "אימייל *",
    labelCompany: "חברה",
    labelPhone: "טלפון",
    labelService: "שירות מעניין *",
    servicePlaceholder: "בחרו שירות",
    serviceCustom: "מותאם / אחר",
    labelMessage: "תארו את האתגרים *",
    messagePlaceholder:
      "תארו אתגרי תאימות או תשתית ומה תרצו להשיג…",
    submitScheduling: "קביעת ייעוץ",
    submitting: "שולחים...",
    sidebarTitle: "קביעת שיחה",
    sidebarSubtitle: "מענה תוך 24 שעות",
    sidebarBlurb:
      "בחרו זמן שמתאים. נשלח הזמנה ליומן עם פרטי הפגישה.",
    hoursWeekdayLabel: "יום ב׳–יום ו׳",
    hoursWeekday: "9:00 – 18:00",
    hoursSatLabel: "שבת",
    hoursSat: "10:00 – 16:00",
    quickContact: "יצירת קשר מהירה",
    ctaTitle: "שנו את תפעול התאימות",
    ctaBody:
      "קבעו ייעוץ כדי להתחיל לשנות את תפעול התאימות עם Opticini.",
    requestDemo: "בקשת דמו",
    seePlatform: "לצפייה בפלטפורמה",
    toastSuccessTitle: "בקשת הייעוץ נשלחה",
    toastSuccessDesc: "נחזור אליכם תוך 24 שעות עם השלבים הבאים.",
    toastErrorTitle: "שגיאה",
    toastErrorDesc:
      "שליחת בקשת הייעוץ נכשלה. נסו שוב.",
  }),
}

export const CONSULT_PAGE_PATCH_BY_LANG: Record<string, ConsultPayload> = {
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
  zh: ZH,
  ja: JA,
  ko: KO,
  hi: HI,
  ar: AR,
  he: HE,
}
