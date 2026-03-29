import type { PartnershipContent } from "@/lib/partnerships-data"
import { PARTNERSHIPS_DE_IT_PT } from "./partnerships-pages-i18n-de-it-pt"
import { PARTNERSHIPS_EXTRA_BY_LANG } from "./partnerships-pages-i18n-extra"

type PartnershipsPayload = { partnershipsPages: Record<string, PartnershipContent> }

/** Full page trees per locale; merged over English from `partnerships-data` in `buildPublicPagesBundle`. */
export const PARTNERSHIPS_PAGES_PATCH_BY_LANG: Record<string, PartnershipsPayload> = {
  es: {
    partnershipsPages: {
      affiliates: {
        slug: "affiliates",
        title: "Programa de afiliados de Opticini",
        subtitle: "Gane comisiones refiriendo organizaciones que necesitan gestión del cumplimiento.",
        intro: [
          "Los afiliados presentan nuevos clientes a Opticini y reciben un porcentaje de los ingresos por suscripción por referencias con éxito.",
          "Tanto si dirige un blog, un servicio de asesoría, una consultoría o una comunidad de startups, el programa de afiliados le permite monetizar su red mientras ayuda a las organizaciones a mejorar sus prácticas de cumplimiento.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Beneficios",
            items: [
              "comisiones competitivas por referencias",
              "oportunidades de ingresos recurrentes",
              "seguimiento sencillo de referidos",
              "panel dedicado para partners",
            ],
          },
          {
            type: "bullets",
            heading: "¿Quién puede unirse?",
            items: [
              "asesores de startups",
              "consultores tecnológicos",
              "influencers de negocio",
              "blogueros de cumplimiento",
              "revisores de SaaS",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Únase al programa de afiliados de Opticini y empiece a ganar mientras ayuda a las organizaciones a mejorar sus prácticas de cumplimiento.",
            ],
          },
        ],
        ctaText: "Unirse al programa de afiliados",
        ctaHref: "/affiliate-signup",
      },
      consultants: {
        slug: "consultants",
        title: "Red de consultores de Opticini",
        subtitle: "Profesionales del cumplimiento que ayudan a los clientes a implementar controles.",
        intro: [
          "Opticini colabora con consultores independientes que ayudan a las organizaciones a diseñar e implementar programas de cumplimiento.",
          "Los consultores apoyan en áreas como controles de seguridad, gobierno operativo, preparación para auditorías y preparación regulatoria.",
          "La plataforma Opticini permite colaborar directamente con las organizaciones gestionando controles, subiendo evidencias y guiando actividades de cumplimiento dentro del sistema.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Beneficios",
            items: [
              "acceso a nuevas oportunidades de clientes",
              "espacio de trabajo de cumplimiento centralizado",
              "capacidad de gestionar varias organizaciones",
              "facturación opcional a través de la plataforma",
            ],
          },
          {
            type: "bullets",
            heading: "¿Quién puede unirse?",
            items: [
              "consultores de cumplimiento",
              "asesores de gobierno",
              "profesionales de seguridad",
              "CISOs fraccionados",
              "especialistas en gestión de riesgos",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Únase a la red de consultores de Opticini y ayude a las organizaciones a fortalecer sus programas de cumplimiento.",
            ],
          },
        ],
        ctaText: "Unirse a la red de consultores",
        ctaHref: "/contact-sales",
      },
      "audit-partners": {
        slug: "audit-partners",
        title: "Programa de socios auditores de Opticini",
        subtitle: "Auditores autorizados que certifican el cumplimiento.",
        intro: [
          "Los socios auditores ofrecen verificación independiente de los programas de cumplimiento gestionados en la plataforma Opticini.",
          "A través del programa, auditores certificados y firmas contables pueden trabajar con organizaciones que usan Opticini para preparar y completar auditorías de cumplimiento.",
          "Los socios auditores acceden a documentación estructurada, registros de controles y evidencia de apoyo que simplifican el proceso de auditoría.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Beneficios",
            items: [
              "preparación de auditoría más fluida",
              "acceso a posibles clientes de auditoría",
              "gestión estructurada de evidencias",
              "herramientas de colaboración en la plataforma",
            ],
          },
          {
            type: "bullets",
            heading: "¿Quién puede unirse?",
            items: [
              "firmas de CPA",
              "auditores de cumplimiento",
              "empresas de evaluación de seguridad",
              "profesionales de auditoría independientes",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Conviértase en socio auditor de Opticini y trabaje con organizaciones que ya están preparadas para la auditoría.",
            ],
          },
        ],
        ctaText: "Ser socio auditor",
        ctaHref: "/contact-sales",
      },
      "technology-partners": {
        slug: "technology-partners",
        title: "Socios tecnológicos de Opticini",
        subtitle: "Ecosistema de integraciones para supervisión operativa, seguridad y cumplimiento.",
        intro: [
          "La plataforma Opticini se integra con proveedores tecnológicos que apoyan la supervisión operativa, la gestión de seguridad y el monitoreo del cumplimiento.",
          "Los socios tecnológicos ayudan a conectar sistemas operativos como infraestructura en la nube, identidad y plataformas de tickets con Opticini.",
          "Estas integraciones permiten la recopilación automatizada de evidencias y el monitoreo continuo del cumplimiento.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Beneficios",
            items: [
              "visibilidad de la integración en el ecosistema Opticini",
              "mayor alcance de la plataforma",
              "colaboración con profesionales del cumplimiento y organizaciones",
            ],
          },
          {
            type: "bullets",
            heading: "¿Quién puede unirse?",
            items: [
              "plataformas de infraestructura",
              "herramientas de seguridad",
              "proveedores de nube",
              "proveedores de identidad y acceso",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Conviértase en socio tecnológico y amplíe Opticini con sus integraciones.",
            ],
          },
        ],
        ctaText: "Ser socio tecnológico",
        ctaHref: "/contact-sales",
      },
    },
  },
  fr: {
    partnershipsPages: {
      affiliates: {
        slug: "affiliates",
        title: "Programme d'affiliation Opticini",
        subtitle: "Gagnez des commissions en recommandant des organisations qui ont besoin de gestion de la conformité.",
        intro: [
          "Les affiliés présentent de nouveaux clients à Opticini et reçoivent un pourcentage des revenus d'abonnement pour les parrainages réussis.",
          "Que vous animiez un blog, un service de conseil, une pratique de consulting ou une communauté de startups, le programme d'affiliation vous permet de monétiser votre réseau tout en aidant les organisations à améliorer leurs pratiques de conformité.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Avantages",
            items: [
              "commissions de parrainage compétitives",
              "opportunités de revenus récurrents",
              "suivi simple des parrainages",
              "tableau de bord partenaire dédié",
            ],
          },
          {
            type: "bullets",
            heading: "Qui devrait rejoindre",
            items: [
              "conseillers startup",
              "consultants technologiques",
              "influenceurs business",
              "blogueurs conformité",
              "revueurs SaaS",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Rejoignez le programme d'affiliation Opticini et commencez à gagner tout en aidant les organisations à améliorer leurs pratiques de conformité.",
            ],
          },
        ],
        ctaText: "Rejoindre le programme d'affiliation",
        ctaHref: "/affiliate-signup",
      },
      consultants: {
        slug: "consultants",
        title: "Réseau de consultants Opticini",
        subtitle: "Professionnels de la conformité qui aident les clients à mettre en œuvre les contrôles.",
        intro: [
          "Opticini travaille avec des consultants indépendants qui aident les organisations à concevoir et déployer des programmes de conformité.",
          "Les consultants accompagnent sur les contrôles de sécurité, la gouvernance opérationnelle, la préparation aux audits et la mise en conformité réglementaire.",
          "La plateforme Opticini permet de collaborer directement avec les organisations en gérant les contrôles, en téléversant des preuves et en guidant les activités de conformité.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Avantages",
            items: [
              "accès à de nouvelles opportunités clients",
              "espace de travail conformité centralisé",
              "gestion de plusieurs organisations",
              "facturation optionnelle via la plateforme",
            ],
          },
          {
            type: "bullets",
            heading: "Qui devrait rejoindre",
            items: [
              "consultants conformité",
              "conseillers en gouvernance",
              "professionnels de la sécurité",
              "CISO fractionnés",
              "spécialistes de la gestion des risques",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Rejoignez le réseau de consultants Opticini et aidez les organisations à renforcer leurs programmes de conformité.",
            ],
          },
        ],
        ctaText: "Rejoindre le réseau de consultants",
        ctaHref: "/contact-sales",
      },
      "audit-partners": {
        slug: "audit-partners",
        title: "Programme partenaires audit Opticini",
        subtitle: "Auditeurs agréés qui certifient la conformité.",
        intro: [
          "Les partenaires audit fournissent une vérification indépendante des programmes de conformité gérés dans la plateforme Opticini.",
          "Grâce au programme, les auditeurs certifiés et les cabinets comptables peuvent travailler avec des organisations qui utilisent Opticini pour préparer et mener des audits de conformité.",
          "Les partenaires audit accèdent à une documentation structurée, des dossiers de contrôle et des preuves qui simplifient le processus d'audit.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Avantages",
            items: [
              "préparation d'audit rationalisée",
              "accès à des clients d'audit potentiels",
              "gestion structurée des preuves",
              "outils de collaboration sur la plateforme",
            ],
          },
          {
            type: "bullets",
            heading: "Qui devrait rejoindre",
            items: [
              "cabinets CPA",
              "auditeurs conformité",
              "firmes d'évaluation de la sécurité",
              "professionnels de l'audit indépendants",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Devenez partenaire audit Opticini et travaillez avec des organisations déjà prêtes pour l'audit.",
            ],
          },
        ],
        ctaText: "Devenir partenaire audit",
        ctaHref: "/contact-sales",
      },
      "technology-partners": {
        slug: "technology-partners",
        title: "Partenaires technologiques Opticini",
        subtitle: "Écosystème d'intégrations pour la supervision opérationnelle, la sécurité et la conformité.",
        intro: [
          "La plateforme Opticini s'intègre à des fournisseurs technologiques qui soutiennent la supervision opérationnelle, la gestion de la sécurité et le suivi de la conformité.",
          "Les partenaires technologiques aident à connecter les systèmes opérationnels — infrastructure cloud, identité, ticketing — à Opticini.",
          "Ces intégrations permettent la collecte automatisée de preuves et la surveillance continue de la conformité.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Avantages",
            items: [
              "visibilité de l'intégration dans l'écosystème Opticini",
              "portée élargie de la plateforme",
              "collaboration avec les professionnels de la conformité et les organisations",
            ],
          },
          {
            type: "bullets",
            heading: "Qui devrait rejoindre",
            items: [
              "plateformes d'infrastructure",
              "outils de sécurité",
              "fournisseurs cloud",
              "éditeurs d'identité et d'accès",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Devenez partenaire technologique et étendez Opticini avec vos intégrations.",
            ],
          },
        ],
        ctaText: "Devenir partenaire technologique",
        ctaHref: "/contact-sales",
      },
    },
  },
  ...PARTNERSHIPS_DE_IT_PT,
  ...PARTNERSHIPS_EXTRA_BY_LANG,
}
