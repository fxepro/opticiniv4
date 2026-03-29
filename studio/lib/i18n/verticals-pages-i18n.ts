import type { VerticalContent } from "@/lib/verticals-data"
import { VERTICALS_DE_IT_PT } from "./verticals-pages-i18n-de-it-pt"
import { SMB_VERTICAL_ES, SMB_VERTICAL_FR } from "./verticals-smb-i18n"
import { VERTICALS_FOOTER_ES, VERTICALS_FOOTER_FR } from "./verticals-footer-es-fr"

type VerticalsPayload = { verticalsPages: Record<string, VerticalContent> }

/** Full vertical page trees per locale; merged over English from `verticals-data` in `buildPublicPagesBundle`. */
export const VERTICALS_PAGES_PATCH_BY_LANG: Record<string, VerticalsPayload> = {
  es: {
    verticalsPages: {
      nonprofits: {
        slug: "nonprofits",
        title: "Organizaciones sin ánimo de lucro",
        subtitle: "Cumplimiento diseñado para organizaciones con propósito",
        intro: [
          "Las organizaciones sin ánimo de lucro existen para servir a comunidades y causas, no para lidiar con papeleo de cumplimiento, preparación de auditorías e informes regulatorios. Sin embargo, cada entidad debe mantener un control estricto de las finanzas, la gobernanza, la transparencia con donantes y las obligaciones regulatorias.",
          "Opticini simplifica el cumplimiento en el sector sin ánimo de lucro al reunir gobernanza, supervisión financiera y responsabilidad operativa en una sola plataforma. En lugar de perseguir hojas de cálculo, correos y documentos dispersos, los equipos obtienen un entorno centralizado para seguir controles, almacenar evidencias, preparar auditorías y cumplir obligaciones regulatorias.",
          "Ya gestione financiación de subvenciones, preparación de declaraciones anuales ante el IRS, registros de gobierno del consejo o transparencia con donantes, Opticini ofrece un enfoque estructurado sin abrumar a equipos pequeños.",
          "La plataforma permite a los líderes centrarse en su misión manteniendo claridad ante donantes, reguladores y miembros del consejo.",
        ],
        sections: [
          {
            type: "features",
            heading: "Diseñado para la realidad operativa del sector sin ánimo de lucro",
            intro:
              "La mayoría de las entidades no cumplen mal por falta de disciplina, sino porque las herramientas están fragmentadas y pensadas para empresas, no para misiones sociales. Opticini ofrece una base de cumplimiento pensada para organizaciones sin ánimo de lucro.",
            features: [
              {
                title: "Gobernanza y supervisión del consejo",
                description:
                  "Mantenga estatutos, políticas del consejo, registros de conflictos de interés y actas en un sistema organizado. Realice seguimiento de aprobaciones y controles que demuestren un liderazgo responsable.",
              },
              {
                title: "Transparencia financiera",
                description:
                  "Supervise donaciones, fondos restringidos, gastos de subvenciones e informes financieros. Mantenga documentación clara para revisiones y auditorías independientes.",
              },
              {
                title: "Responsabilidad de subvenciones y programas",
                description:
                  "Seguimiento de requisitos de subvenciones, entregables, plazos de informes y obligaciones ligadas a fuentes de financiación.",
              },
              {
                title: "Preparación para auditorías",
                description:
                  "Prepare revisiones internas o auditorías financieras externas con recogida estructurada de evidencias y verificación de controles.",
              },
              {
                title: "Responsabilidad ante donantes y el público",
                description:
                  "Mantenga registros que demuestren transparencia, buena gestión y cumplimiento de las obligaciones del sector.",
              },
            ],
          },
          {
            type: "bullets",
            heading: "Áreas clave de cumplimiento",
            intro:
              "Opticini ayuda a gestionar los requisitos operativos que sustentan la confianza y la rendición de cuentas.",
            items: [
              "Obligaciones de gobernanza de exención fiscal (IRS)",
              "Supervisión del consejo y documentación de gobernanza",
              "Informes financieros y transparencia",
              "Cumplimiento e informes de subvenciones",
              "Transparencia y responsabilidad con donantes",
              "Controles internos y preparación para auditorías",
            ],
            outro:
              "En lugar de repartir estas responsabilidades entre sistemas distintos, Opticini las organiza en un marco claro que evoluciona con su organización.",
          },
          {
            type: "prose",
            heading: "Simplificar la preparación para auditorías",
            paragraphs: [
              "En auditorías o revisiones, muchas entidades dedican semanas a reunir documentos y reconstruir registros.",
              "Opticini cambia esa dinámica.",
              "Los controles, la documentación y las evidencias se organizan de forma continua, de modo que el equipo puede demostrar responsabilidad sin preparación de última hora.",
              "Estar preparados para una auditoría es el resultado natural de buenas prácticas operativas.",
            ],
          },
          {
            type: "prose",
            heading: "Soporte para organizaciones de cualquier tamaño",
            paragraphs: [
              "Desde pequeñas entidades lideradas por voluntarios hasta grandes organizaciones con subvenciones complejas, Opticini se adapta a sus necesidades.",
              "La plataforma se ajusta a sus requisitos de cumplimiento y sigue siendo simple para equipos reducidos.",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Para el sector sin ánimo de lucro, el cumplimiento no es solo reglamento: es confianza.",
              "Confianza de los donantes. De las comunidades. De los reguladores y socios.",
              "Opticini ayuda a mantener esa confianza con transparencia, responsabilidad e integridad operativa.",
              "Su misión sigue siendo el centro. El cumplimiento la respalda.",
            ],
          },
        ],
      },
      smb: SMB_VERTICAL_ES,
      ...VERTICALS_FOOTER_ES,
    },
  },
  fr: {
    verticalsPages: {
      nonprofits: {
        slug: "nonprofits",
        title: "Organisations à but non lucratif",
        subtitle: "Conformité pensée pour les organisations à mission",
        intro: [
          "Les associations et fondations existent pour servir des communautés et des causes — pas pour se noyer dans la paperasse de conformité, la préparation d'audits et les rapports réglementaires. Pourtant chaque structure doit assurer une surveillance stricte des finances, de la gouvernance, de la transparence envers les donateurs et des obligations réglementaires.",
          "Opticini simplifie la conformité du secteur associatif en centralisant gouvernance, surveillance financière et responsabilité opérationnelle sur une seule plateforme. Au lieu de courir après tableurs, e-mails et documents éparpillés, les équipes disposent d'un environnement centralisé pour suivre les contrôles, stocker les preuves, préparer les audits et respecter les obligations.",
          "Que vous gériez des subventions, des déclarations fiscales annuelles, des dossiers de conseil d'administration ou la transparence envers les donateurs, Opticini offre une approche structurée sans submerger les petites équipes.",
          "La plateforme permet aux dirigeants de se concentrer sur leur mission tout en gardant une accountability claire envers donateurs, régulateurs et conseils.",
        ],
        sections: [
          {
            type: "features",
            heading: "Conçu pour la réalité opérationnelle des organisations à but non lucratif",
            intro:
              "La plupart des difficultés de conformité ne viennent pas du manque de discipline, mais d'outils fragmentés conçus pour les entreprises, pas pour les missions sociales. Opticini fournit une base de conformité pensée pour le secteur associatif.",
            features: [
              {
                title: "Gouvernance et supervision du conseil",
                description:
                  "Conservez statuts, politiques du conseil, registres de conflits d'intérêts et procès-verbaux dans un système organisé. Suivez les validations et les contrôles qui démontrent un leadership responsable.",
              },
              {
                title: "Transparence financière",
                description:
                  "Assurez une surveillance correcte des dons, fonds affectés, dépenses de subventions et obligations de reporting. Documentez clairement pour les revues et audits indépendants.",
              },
              {
                title: "Rendre des comptes sur les subventions et programmes",
                description:
                  "Suivez les exigences des subventions, livrables, échéances de reporting et obligations liées aux financeurs.",
              },
              {
                title: "Préparation aux audits",
                description:
                  "Préparez les revues internes ou les audits financiers externes avec collecte structurée de preuves et vérification des contrôles.",
              },
              {
                title: "Responsabilité envers les donateurs et le public",
                description:
                  "Maintenez des dossiers qui démontrent transparence, bonne gestion et respect des obligations du secteur associatif.",
              },
            ],
          },
          {
            type: "bullets",
            heading: "Domaines clés de conformité",
            intro:
              "Opticini aide à gérer les exigences opérationnelles qui soutiennent la confiance et la responsabilité.",
            items: [
              "Obligations de gouvernance liées à l'exonération fiscale",
              "Supervision du conseil et documentation de gouvernance",
              "Reporting financier et transparence",
              "Conformité et reporting des subventions",
              "Transparence et responsabilité envers les donateurs",
              "Contrôles internes et préparation aux audits",
            ],
            outro:
              "Plutôt que de disperser ces responsabilités entre plusieurs systèmes, Opticini les regroupe dans un cadre clair qui évolue avec votre organisation.",
          },
          {
            type: "prose",
            heading: "Simplifier la préparation aux audits",
            paragraphs: [
              "Lors des audits ou revues, les associations passent souvent des semaines à rassembler des documents et reconstituer des dossiers.",
              "Opticini change cette dynamique.",
              "Les contrôles, la documentation et les preuves sont organisés en continu, ce qui permet de démontrer la responsabilité sans préparation de dernière minute.",
              "La préparation aux audits devient la conséquence naturelle de bonnes pratiques opérationnelles.",
            ],
          },
          {
            type: "prose",
            heading: "Accompagner les organisations de toutes tailles",
            paragraphs: [
              "Des petites structures bénévoles aux grandes organisations avec subventions complexes, Opticini s'adapte à vos besoins opérationnels.",
              "La plateforme s'ajuste à vos exigences de conformité tout en restant simple pour les équipes réduites.",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Pour le secteur associatif, la conformité n'est pas seulement une question de réglementation — c'est une question de confiance.",
              "Confiance des donateurs. Des communautés. Des régulateurs et partenaires.",
              "Opticini aide à préserver cette confiance par la transparence, la responsabilité et l'intégrité opérationnelle.",
              "Votre mission reste au centre. La conformité la soutient.",
            ],
          },
        ],
      },
      smb: SMB_VERTICAL_FR,
      ...VERTICALS_FOOTER_FR,
    },
  },
  ...VERTICALS_DE_IT_PT,
}
