import type { FrameworkContent } from "@/lib/frameworks-data"
import { FRAMEWORKS_DE_IT_PT } from "./frameworks-pages-i18n-de-it-pt"
import { HIPAA_FRAMEWORK_ES, HIPAA_FRAMEWORK_FR } from "./frameworks-hipaa-i18n"
import { FRAMEWORKS_MORE_ES, FRAMEWORKS_MORE_FR } from "./frameworks-more-es-fr"

type FrameworksPayload = { frameworksPages: Record<string, FrameworkContent> }

/** Full framework page trees per locale; merged over English from `frameworks-data` in `buildPublicPagesBundle`. */
export const FRAMEWORKS_PAGES_PATCH_BY_LANG: Record<string, FrameworksPayload> = {
  es: {
    frameworksPages: {
      "iso-27002": {
        slug: "iso-27002",
        title: "ISO/IEC 27002",
        subtitle: "Gestión del cumplimiento",
        intro: [
          "ISO/IEC 27002 ofrece un conjunto amplio de controles de seguridad de la información para proteger datos sensibles, reducir el riesgo y mejorar la postura de seguridad. Mientras ISO 27001 define los requisitos de un sistema de gestión de seguridad de la información (SGSI), ISO 27002 es la guía práctica para implementar los controles que lo sustentan.",
          "Organizaciones de todos los sectores utilizan ISO 27002 para estructurar políticas de seguridad, procesos de gestión de riesgos y salvaguardas operativas.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Quién utiliza ISO 27002",
            items: [
              "Empresas tecnológicas",
              "Plataformas SaaS",
              "Instituciones financieras",
              "Proveedores de salud",
              "Contratistas gubernamentales",
              "Grandes empresas que gestionan datos sensibles",
            ],
            outro: "Es especialmente valiosa para organizaciones que implementan o mantienen la certificación ISO 27001.",
          },
          {
            type: "bullets",
            heading: "Dominios clave de seguridad",
            items: [
              "Control de acceso e identidad",
              "Criptografía y protección de datos",
              "Seguridad física y ambiental",
              "Seguridad de proveedores y terceros",
              "Gestión de incidentes",
              "Monitorización y registro de seguridad",
              "Desarrollo seguro y operaciones de sistemas",
            ],
          },
          {
            type: "bullets",
            heading: "Cómo ayuda Opticini",
            items: [
              "Asignar controles directamente a normas ISO",
              "Automatizar la recogida de evidencias",
              "Seguir la efectividad de los controles",
              "Gestionar registros de riesgos",
              "Apoyar la preparación para auditorías",
            ],
            outro: "Los equipos de seguridad pueden monitorizar la postura de cumplimiento de forma continua en lugar de improvisar al llegar la auditoría.",
          },
          {
            type: "bullets",
            heading: "Por qué importa",
            items: [
              "Adoptar ISO 27002 refuerza la gobernanza de seguridad, demuestra responsabilidad ante clientes y reguladores y sustenta un programa de ciberseguridad maduro.",
            ],
          },
        ],
      },
      hipaa: HIPAA_FRAMEWORK_ES,
      ...FRAMEWORKS_MORE_ES,
    },
  },
  fr: {
    frameworksPages: {
      "iso-27002": {
        slug: "iso-27002",
        title: "ISO/IEC 27002",
        subtitle: "Gestion de la conformité",
        intro: [
          "ISO/IEC 27002 fournit un ensemble complet de contrôles de sécurité de l'information pour protéger les données sensibles, réduire les risques et améliorer la posture de sécurité. Alors qu'ISO 27001 définit les exigences d'un SMSI (système de management de la sécurité de l'information), ISO 27002 est le guide pratique pour mettre en œuvre les contrôles.",
          "Les organisations de tous secteurs s'appuient sur ISO 27002 pour structurer leurs politiques de sécurité, leurs processus de gestion des risques et leurs mesures opérationnelles.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Qui utilise ISO 27002",
            items: [
              "Entreprises technologiques",
              "Plateformes SaaS",
              "Institutions financières",
              "Établissements de santé",
              "Entrepreneurs gouvernementaux",
              "Grandes entreprises gérant des données sensibles",
            ],
            outro: "C'est particulièrement utile pour les organisations qui mettent en œuvre ou maintiennent la certification ISO 27001.",
          },
          {
            type: "bullets",
            heading: "Domaines clés de sécurité",
            items: [
              "Contrôle d'accès et gestion des identités",
              "Cryptographie et protection des données",
              "Sécurité physique et environnementale",
              "Sécurité des fournisseurs et tiers",
              "Gestion des incidents",
              "Surveillance et journalisation de la sécurité",
              "Développement sécurisé et opérations des systèmes",
            ],
          },
          {
            type: "bullets",
            heading: "Comment Opticini aide",
            items: [
              "Mapper les contrôles directement aux normes ISO",
              "Automatiser la collecte de preuves",
              "Suivre l'efficacité des contrôles",
              "Gérer les registres de risques",
              "Soutenir la préparation aux audits",
            ],
            outro: "Les équipes sécurité peuvent surveiller en continu leur posture de conformité plutôt que de se précipiter au moment des audits.",
          },
          {
            type: "bullets",
            heading: "Pourquoi c'est important",
            items: [
              "Adopter ISO 27002 renforce la gouvernance de la sécurité, démontre la responsabilité envers clients et régulateurs et constitue l'épine dorsale d'un programme de cybersécurité mature.",
            ],
          },
        ],
      },
      hipaa: HIPAA_FRAMEWORK_FR,
      ...FRAMEWORKS_MORE_FR,
    },
  },
  ...FRAMEWORKS_DE_IT_PT,
}
