import type { FrameworkContent } from "@/lib/frameworks-data"

/** Spanish and French HIPAA Security Rule page trees; composed into `frameworks-pages-i18n`. */
export const HIPAA_FRAMEWORK_ES: FrameworkContent = {
  slug: "hipaa",
  title: "Regla de seguridad HIPAA",
  subtitle: "Cumplimiento",
  intro: [
    "La Regla de seguridad HIPAA establece estándares nacionales para proteger la información sanitaria protegida electrónica (ePHI). Exige que las organizaciones sanitarias y sus socios implementen salvaguardas administrativas, físicas y técnicas para garantizar la confidencialidad, integridad y disponibilidad de los datos de los pacientes.",
    "Toda organización que maneje datos de salud debe cumplir estos estándares de seguridad.",
  ],
  sections: [
    {
      type: "bullets",
      heading: "Quién debe cumplir",
      items: [
        "Proveedores de atención sanitaria",
        "Compañías de seguros médicos",
        "Clearinghouses sanitarios",
        "Socios comerciales que tratan datos de pacientes",
        "Plataformas de tecnología sanitaria",
        "Servicios de facturación y tratamiento de datos médicos",
      ],
    },
    {
      type: "subsections",
      heading: "Salvaguardas de seguridad esenciales",
      subsections: [
        {
          heading: "Salvaguardas administrativas",
          items: [
            "Evaluaciones de riesgo",
            "Políticas de seguridad del personal",
            "Formación en concienciación de seguridad",
            "Planificación de respuesta a incidentes",
          ],
        },
        {
          heading: "Salvaguardas físicas",
          items: [
            "Control de acceso a instalaciones",
            "Protección de dispositivos y medios",
            "Uso seguro de puestos de trabajo",
          ],
        },
        {
          heading: "Salvaguardas técnicas",
          items: [
            "Controles de acceso y autenticación",
            "Cifrado y seguridad en la transmisión",
            "Registro y monitorización de auditoría",
            "Controles de integridad",
          ],
        },
      ],
    },
    {
      type: "bullets",
      heading: "Cómo ayuda Opticini",
      items: [
        "Seguimiento de controles alineado con las salvaguardas HIPAA",
        "Gestión automatizada de políticas",
        "Gestión de evidencias para auditorías",
        "Flujos de evaluación de riesgos",
        "Paneles de monitorización continua",
      ],
    },
    {
      type: "bullets",
      heading: "Por qué importa el cumplimiento HIPAA",
      items: [
        "Más allá de los requisitos legales, el cumplimiento HIPAA protege la confianza de los pacientes, reduce el riesgo jurídico y refuerza las prácticas de ciberseguridad en salud.",
      ],
    },
  ],
}

export const HIPAA_FRAMEWORK_FR: FrameworkContent = {
  slug: "hipaa",
  title: "Règle de sécurité HIPAA",
  subtitle: "Conformité",
  intro: [
    "La règle de sécurité HIPAA établit des normes nationales pour protéger les informations de santé protégées électroniques (ePHI). Elle exige des établissements de santé et de leurs partenaires qu'ils mettent en œuvre des mesures administratives, physiques et techniques pour assurer la confidentialité, l'intégrité et la disponibilité des données patients.",
    "Toute organisation traitant des données de santé doit respecter ces normes de sécurité.",
  ],
  sections: [
    {
      type: "bullets",
      heading: "Qui doit se conformer",
      items: [
        "Prestataires de soins",
        "Assurances santé",
        "Chambres de compensation (clearinghouses)",
        "Partenaires commerciaux traitant des données patients",
        "Plateformes de santé numérique",
        "Services de facturation et de traitement de données médicales",
      ],
    },
    {
      type: "subsections",
      heading: "Mesures de sécurité essentielles",
      subsections: [
        {
          heading: "Mesures administratives",
          items: [
            "Évaluations des risques",
            "Politiques de sécurité du personnel",
            "Sensibilisation à la sécurité",
            "Planification de la réponse aux incidents",
          ],
        },
        {
          heading: "Mesures physiques",
          items: [
            "Contrôles d'accès aux locaux",
            "Protection des équipements et supports",
            "Usage sécurisé des postes de travail",
          ],
        },
        {
          heading: "Mesures techniques",
          items: [
            "Contrôles d'accès et authentification",
            "Chiffrement et sécurité des transmissions",
            "Journalisation et surveillance d'audit",
            "Contrôles d'intégrité",
          ],
        },
      ],
    },
    {
      type: "bullets",
      heading: "Comment Opticini aide",
      items: [
        "Suivi des contrôles aligné sur les mesures HIPAA",
        "Gestion automatisée des politiques",
        "Gestion des preuves pour les audits",
        "Workflows d'évaluation des risques",
        "Tableaux de bord de surveillance continue",
      ],
    },
    {
      type: "bullets",
      heading: "Pourquoi la conformité HIPAA compte",
      items: [
        "Au-delà des obligations légales, la conformité HIPAA protège la confiance des patients, réduit les risques juridiques et renforce la cybersécurité dans le secteur de la santé.",
      ],
    },
  ],
}

export const HIPAA_FRAMEWORK_DE: FrameworkContent = {
  slug: "hipaa",
  title: "HIPAA-Sicherheitsregel",
  subtitle: "Compliance",
  intro: [
    "Die HIPAA-Sicherheitsregel legt nationale Standards zum Schutz elektronisch gespeicherter gesundheitsbezogener Informationen (ePHI) fest. Gesundheitsorganisationen und ihre Partner müssen administrative, physische und technische Schutzmaßnahmen umsetzen, um Vertraulichkeit, Integrität und Verfügbarkeit von Patientendaten zu gewährleisten.",
    "Jede Organisation, die Gesundheitsdaten verarbeitet, muss diese Sicherheitsstandards einhalten.",
  ],
  sections: [
    {
      type: "bullets",
      heading: "Wer muss sich anpassen",
      items: [
        "Gesundheitsdienstleister",
        "Krankenversicherungen",
        "Healthcare-Clearinghouses",
        "Geschäftspartner mit Patientendaten",
        "Gesundheits-IT-Plattformen",
        "Abrechnungs- und Datenverarbeitungsdienste",
      ],
    },
    {
      type: "subsections",
      heading: "Wesentliche Sicherheitsmaßnahmen",
      subsections: [
        {
          heading: "Administrative Maßnahmen",
          items: [
            "Risikobewertungen",
            "Sicherheitsrichtlinien für Personal",
            "Sicherheitsbewusstsein und Schulung",
            "Incident-Response-Planung",
          ],
        },
        {
          heading: "Physische Maßnahmen",
          items: [
            "Zugangskontrolle zu Einrichtungen",
            "Schutz von Geräten und Medien",
            "Sichere Nutzung von Arbeitsplätzen",
          ],
        },
        {
          heading: "Technische Maßnahmen",
          items: [
            "Zugriffs- und Authentifizierungskontrollen",
            "Verschlüsselung und sichere Übertragung",
            "Protokollierung und Audit-Überwachung",
            "Integritätskontrollen",
          ],
        },
      ],
    },
    {
      type: "bullets",
      heading: "Wie Opticini hilft",
      items: [
        "Kontrollverfolgung an HIPAA-Schutzmaßnahmen ausgerichtet",
        "Automatisierte Richtlinienverwaltung",
        "Evidenzverwaltung für Audits",
        "Risikobewertungs-Workflows",
        "Dashboards zur kontinuierlichen Überwachung",
      ],
    },
    {
      type: "bullets",
      heading: "Warum HIPAA-Compliance zählt",
      items: [
        "Über regulatorische Pflichten hinaus schützt HIPAA das Vertrauen der Patienten, mindert Rechtsrisiken und stärkt die Cybersicherheit im Gesundheitswesen.",
      ],
    },
  ],
}

export const HIPAA_FRAMEWORK_IT: FrameworkContent = {
  slug: "hipaa",
  title: "Regola di sicurezza HIPAA",
  subtitle: "Conformità",
  intro: [
    "La regola di sicurezza HIPAA stabilisce standard nazionali per proteggere le informazioni sanitarie protette elettronicamente (ePHI). Richiede che provider sanitari e partner implementino salvaguardie amministrative, fisiche e tecniche per garantire riservatezza, integrità e disponibilità dei dati dei pazienti.",
    "Ogni organizzazione che tratta dati sanitari deve rispettare questi standard di sicurezza.",
  ],
  sections: [
    {
      type: "bullets",
      heading: "Chi deve conformarsi",
      items: [
        "Fornitori di assistenza sanitaria",
        "Assicurazioni sanitarie",
        "Clearinghouse sanitari",
        "Partner commerciali che trattano dati pazienti",
        "Piattaforme di health tech",
        "Servizi di fatturazione e elaborazione dati medici",
      ],
    },
    {
      type: "subsections",
      heading: "Salvaguardie di sicurezza essenziali",
      subsections: [
        {
          heading: "Salvaguardie amministrative",
          items: [
            "Valutazioni del rischio",
            "Politiche di sicurezza del personale",
            "Formazione sulla consapevolezza della sicurezza",
            "Pianificazione della risposta agli incidenti",
          ],
        },
        {
          heading: "Salvaguardie fisiche",
          items: [
            "Controllo degli accessi alle strutture",
            "Protezione di dispositivi e supporti",
            "Uso sicuro delle postazioni di lavoro",
          ],
        },
        {
          heading: "Salvaguardie tecniche",
          items: [
            "Controlli di accesso e autenticazione",
            "Crittografia e sicurezza delle trasmissioni",
            "Registrazione e monitoraggio di audit",
            "Controlli di integrità",
          ],
        },
      ],
    },
    {
      type: "bullets",
      heading: "Come aiuta Opticini",
      items: [
        "Tracciamento dei controlli allineato alle salvaguardie HIPAA",
        "Gestione automatizzata delle policy",
        "Gestione delle evidenze per gli audit",
        "Flussi di valutazione del rischio",
        "Dashboard di monitoraggio continuo",
      ],
    },
    {
      type: "bullets",
      heading: "Perché conta la conformità HIPAA",
      items: [
        "Oltre agli obblighi legali, la conformità HIPAA protegge la fiducia dei pazienti, riduce il rischio legale e rafforza la cybersecurity in sanità.",
      ],
    },
  ],
}

export const HIPAA_FRAMEWORK_PT: FrameworkContent = {
  slug: "hipaa",
  title: "Regra de segurança HIPAA",
  subtitle: "Conformidade",
  intro: [
    "A Regra de segurança HIPAA estabelece padrões nacionais para proteger informações de saúde protegidas eletronicamente (ePHI). Exige que prestadores de cuidados de saúde e parceiros implementem salvaguardas administrativas, físicas e técnicas para garantir confidencialidade, integridade e disponibilidade dos dados dos pacientes.",
    "Qualquer organização que trate dados de saúde deve cumprir estes padrões de segurança.",
  ],
  sections: [
    {
      type: "bullets",
      heading: "Quem deve cumprir",
      items: [
        "Prestadores de cuidados de saúde",
        "Planos de saúde",
        "Clearinghouses de saúde",
        "Parceiros comerciais que tratam dados de pacientes",
        "Plataformas de tecnologia de saúde",
        "Serviços de faturação e processamento de dados médicos",
      ],
    },
    {
      type: "subsections",
      heading: "Salvaguardas de segurança essenciais",
      subsections: [
        {
          heading: "Salvaguardas administrativas",
          items: [
            "Avaliações de risco",
            "Políticas de segurança do pessoal",
            "Formação em consciencialização de segurança",
            "Planeamento de resposta a incidentes",
          ],
        },
        {
          heading: "Salvaguardas físicas",
          items: [
            "Controlo de acesso a instalações",
            "Proteção de dispositivos e suportes",
            "Utilização segura de postos de trabalho",
          ],
        },
        {
          heading: "Salvaguardas técnicas",
          items: [
            "Controlos de acesso e autenticação",
            "Encriptação e segurança nas transmissões",
            "Registo e monitorização de auditoria",
            "Controlos de integridade",
          ],
        },
      ],
    },
    {
      type: "bullets",
      heading: "Como a Opticini ajuda",
      items: [
        "Acompanhamento de controlos alinhado às salvaguardas HIPAA",
        "Gestão automatizada de políticas",
        "Gestão de evidências para auditorias",
        "Fluxos de avaliação de risco",
        "Painéis de monitorização contínua",
      ],
    },
    {
      type: "bullets",
      heading: "Porque a conformidade HIPAA importa",
      items: [
        "Para além dos requisitos legais, a conformidade HIPAA protege a confiança dos pacientes, reduz risco jurídico e reforça a cibersegurança em saúde.",
      ],
    },
  ],
}
