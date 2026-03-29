import type { FrameworkContent } from "@/lib/frameworks-data"
import { HIPAA_FRAMEWORK_DE, HIPAA_FRAMEWORK_IT, HIPAA_FRAMEWORK_PT } from "./frameworks-hipaa-i18n"

type FrameworksPayload = { frameworksPages: Record<string, FrameworkContent> }

/** German, Italian, Portuguese ISO 27002 trees; merged in `frameworks-pages-i18n`. */
export const FRAMEWORKS_DE_IT_PT: Record<string, FrameworksPayload> = {
  de: {
    frameworksPages: {
      "iso-27002": {
        slug: "iso-27002",
        title: "ISO/IEC 27002",
        subtitle: "Compliance-Management",
        intro: [
          "ISO/IEC 27002 liefert einen umfassenden Katalog von Informationssicherheits-Kontrollen zum Schutz sensibler Daten, zur Risikominderung und zur Verbesserung der Sicherheitslage. Während ISO 27001 die Anforderungen an ein ISMS definiert, ist ISO 27002 die praktische Anleitung zur Umsetzung der zugehörigen Kontrollen.",
          "Organisationen vieler Branchen nutzen ISO 27002, um Sicherheitsrichtlinien, Risikomanagement und operative Schutzmaßnahmen zu strukturieren.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Wer nutzt ISO 27002",
            items: [
              "Technologieunternehmen",
              "SaaS-Plattformen",
              "Finanzinstitute",
              "Gesundheitsdienstleister",
              "Regierungsauftragnehmer",
              "Unternehmen mit sensiblen Daten",
            ],
            outro: "Besonders wertvoll für Organisationen mit ISO-27001-Zertifizierung oder -Einführung.",
          },
          {
            type: "bullets",
            heading: "Zentrale Sicherheitsdomänen",
            items: [
              "Zugriffskontrolle und Identitätsmanagement",
              "Kryptografie und Datenschutz",
              "Physische und umgebungsbezogene Sicherheit",
              "Lieferanten- und Drittanbieter-Sicherheit",
              "Incidentmanagement",
              "Sicherheitsüberwachung und Protokollierung",
              "Sichere Entwicklung und Systembetrieb",
            ],
          },
          {
            type: "bullets",
            heading: "Wie Opticini hilft",
            items: [
              "Kontrollen direkt ISO-Normen zuordnen",
              "Evidenzsammlung automatisieren",
              "Kontrollwirksamkeit verfolgen",
              "Risikoregister führen",
              "Auditbereitschaft unterstützen",
            ],
            outro: "Security-Teams können die Compliance-Posture kontinuierlich überwachen statt kurz vor Audits zu improvisieren.",
          },
          {
            type: "bullets",
            heading: "Warum es zählt",
            items: [
              "ISO 27002 stärkt die Sicherheitsgovernance, zeigt Verantwortung gegenüber Kunden und Regulatoren und bildet das Rückgrat eines ausgereiften Cybersecurity-Programms.",
            ],
          },
        ],
      },
      hipaa: HIPAA_FRAMEWORK_DE,
    },
  },
  it: {
    frameworksPages: {
      "iso-27002": {
        slug: "iso-27002",
        title: "ISO/IEC 27002",
        subtitle: "Gestione della conformità",
        intro: [
          "ISO/IEC 27002 fornisce un insieme completo di controlli di sicurezza delle informazioni per proteggere dati sensibili, ridurre il rischio e migliorare la postura di sicurezza. Mentre ISO 27001 definisce i requisiti di un SGSI, ISO 27002 è la guida pratica per implementare i controlli.",
          "Organizzazioni di ogni settore si affidano a ISO 27002 per strutturare policy di sicurezza, processi di gestione del rischio e misure operative.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Chi usa ISO 27002",
            items: [
              "Aziende tecnologiche",
              "Piattaforme SaaS",
              "Istituti finanziari",
              "Fornitori sanitari",
              "Appaltatori governativi",
              "Grandi imprese che gestiscono dati sensibili",
            ],
            outro: "È particolarmente utile per chi implementa o mantiene la certificazione ISO 27001.",
          },
          {
            type: "bullets",
            heading: "Domini chiave di sicurezza",
            items: [
              "Controllo degli accessi e identità",
              "Crittografia e protezione dei dati",
              "Sicurezza fisica e ambientale",
              "Sicurezza di fornitori e terze parti",
              "Gestione degli incidenti",
              "Monitoraggio e logging di sicurezza",
              "Sviluppo sicuro e operazioni di sistema",
            ],
          },
          {
            type: "bullets",
            heading: "Come aiuta Opticini",
            items: [
              "Mappare i controlli alle norme ISO",
              "Automatizzare la raccolta delle evidenze",
              "Tracciare l'efficacia dei controlli",
              "Gestire i registri dei rischi",
              "Supportare la preparazione agli audit",
            ],
            outro: "I team di sicurezza possono monitorare la conformità in continuo invece di correre agli audit all'ultimo momento.",
          },
          {
            type: "bullets",
            heading: "Perché conta",
            items: [
              "Adottare ISO 27002 rafforza la governance della sicurezza, dimostra responsabilità verso clienti e regolatori e sostiene un programma di cybersecurity maturo.",
            ],
          },
        ],
      },
      hipaa: HIPAA_FRAMEWORK_IT,
    },
  },
  pt: {
    frameworksPages: {
      "iso-27002": {
        slug: "iso-27002",
        title: "ISO/IEC 27002",
        subtitle: "Gestão da conformidade",
        intro: [
          "A ISO/IEC 27002 define um conjunto abrangente de controlos de segurança da informação para proteger dados sensíveis, reduzir riscos e melhorar a postura de segurança. Enquanto a ISO 27001 estabelece os requisitos de um SGSI, a ISO 27002 é o guia prático para implementar os controlos.",
          "Organizações de todos os setores utilizam a ISO 27002 para estruturar políticas de segurança, processos de gestão de risco e salvaguardas operacionais.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Quem utiliza a ISO 27002",
            items: [
              "Empresas tecnológicas",
              "Plataformas SaaS",
              "Instituições financeiras",
              "Prestadores de cuidados de saúde",
              "Empreiteiros governamentais",
              "Grandes empresas que gerem dados sensíveis",
            ],
            outro: "É particularmente valiosa para organizações que implementam ou mantêm a certificação ISO 27001.",
          },
          {
            type: "bullets",
            heading: "Domínios-chave de segurança",
            items: [
              "Controlo de acesso e identidade",
              "Criptografia e proteção de dados",
              "Segurança física e ambiental",
              "Segurança de fornecedores e terceiros",
              "Gestão de incidentes",
              "Monitorização e registo de segurança",
              "Desenvolvimento seguro e operações de sistemas",
            ],
          },
          {
            type: "bullets",
            heading: "Como a Opticini ajuda",
            items: [
              "Mapear controlos diretamente às normas ISO",
              "Automatizar a recolha de evidências",
              "Acompanhar a eficácia dos controlos",
              "Gerir registos de risco",
              "Apoiar a preparação para auditorias",
            ],
            outro: "As equipas de segurança podem monitorizar a postura de conformidade de forma contínua em vez de improvisar à chegada da auditoria.",
          },
          {
            type: "bullets",
            heading: "Porque importa",
            items: [
              "Adotar a ISO 27002 reforça a governação de segurança, demonstra responsabilidade perante clientes e reguladores e sustenta um programa de cibersegurança maduro.",
            ],
          },
        ],
      },
      hipaa: HIPAA_FRAMEWORK_PT,
    },
  },
}
