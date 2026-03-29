import type { VerticalContent } from "@/lib/verticals-data"
import { SMB_VERTICAL_DE, SMB_VERTICAL_IT, SMB_VERTICAL_PT } from "./verticals-smb-de-it-pt"

type VerticalsPayload = { verticalsPages: Record<string, VerticalContent> }

/** German, Italian, Portuguese nonprofits vertical trees; merged in `verticals-pages-i18n`. */
export const VERTICALS_DE_IT_PT: Record<string, VerticalsPayload> = {
  de: {
    verticalsPages: {
      nonprofits: {
        slug: "nonprofits",
        title: "Gemeinnützige Organisationen",
        subtitle: "Compliance für Organisationen mit gesellschaftlichem Auftrag",
        intro: [
          "Gemeinnützige Organisationen dienen Gemeinden und Anliegen — nicht dem Kampf mit Compliance-Papierkram, Auditvorbereitung und regulatorischer Berichterstattung. Dennoch müssen sie Finanzen, Governance, Spendentransparenz und regulatorische Pflichten streng überwachen.",
          "Opticini vereinfacht Nonprofit-Compliance, indem Governance, Finanzaufsicht und operative Verantwortung auf einer Plattform gebündelt werden. Statt Tabellen, E-Mails und verstreute Dokumente jagen, erhalten Teams eine zentrale Umgebung für Kontrollen, Nachweise, Audits und regulatorische Erfüllung.",
          "Ob Zuschüsse, jährliche Steuererklärungen, Vorstandsdokumentation oder Spendentransparenz — Opticini strukturiert den Ansatz, ohne kleine Teams zu überfordern.",
          "Führungskräfte können sich auf die Mission konzentrieren und gleichzeitig klare Rechenschaftspflicht gegenüber Spendern, Aufsichtsbehörden und Vorständen wahren.",
        ],
        sections: [
          {
            type: "features",
            heading: "Für die Realität gemeinnütziger Arbeit",
            intro:
              "Die meisten Herausforderungen entstehen nicht durch mangelnde Disziplin, sondern durch fragmentierte Tools, die für Konzerne statt für Missionen gebaut sind. Opticini bietet eine Compliance-Grundlage speziell für Nonprofits.",
            features: [
              {
                title: "Governance & Vorstandsaufsicht",
                description:
                  "Satzungen, Vorstandsrichtlinien, Interessenkonflikte und Protokolle in einem System. Verfolgen Sie Freigaben und Kontrollen, die verantwortungsvolle Führung belegen.",
              },
              {
                title: "Finanzielle Transparenz",
                description:
                  "Überwachung von Spenden, zweckgebundenen Mitteln, Zuschussausgaben und Berichtspflichten. Klare Dokumentation für Prüfungen und unabhängige Audits.",
              },
              {
                title: "Zuschuss- und Programmverantwortung",
                description:
                  "Anforderungen, Liefergegenstände, Fristen und vertragliche Pflichten aus Finanzierungsquellen nachverfolgen.",
              },
              {
                title: "Auditvorbereitung",
                description:
                  "Interne Prüfungen oder externe Finanzaudits mit strukturierter Evidenz und Kontrollprüfung vorbereiten.",
              },
              {
                title: "Rechenschaft gegenüber Spendern und Öffentlichkeit",
                description:
                  "Unterlagen führen, die Transparenz, verantwortungsvolle Verwaltung und Einhaltung gemeinnütziger Pflichten zeigen.",
              },
            ],
          },
          {
            type: "bullets",
            heading: "Zentrale Compliance-Bereiche",
            intro:
              "Opticini hilft, operative Anforderungen zu managen, die Vertrauen und Verantwortung stützen.",
            items: [
              "Governance-Pflichten der Gemeinnützigkeit (Steuerbefreiung)",
              "Vorstandsaufsicht und Governance-Dokumentation",
              "Finanzberichterstattung und Transparenz",
              "Zuschuss-Compliance und Reporting",
              "Spendermitwirkung und Rechenschaft",
              "Interne Kontrollen und Auditbereitschaft",
            ],
            outro:
              "Statt diese Aufgaben über mehrere Systeme zu verteilen, bündelt Opticini sie in einem klaren Rahmen, der mit Ihrer Organisation wächst.",
          },
          {
            type: "prose",
            heading: "Auditbereitschaft vereinfachen",
            paragraphs: [
              "Bei Audits verbringen viele Organisationen Wochen mit dem Sammeln und Rekonstruieren von Unterlagen.",
              "Opticini ändert diese Dynamik.",
              "Kontrollen, Dokumentation und Nachweise werden laufend geordnet — Nachweisbarkeit ohne Last-Minute-Stress.",
              "Auditbereitschaft wird zur natürlichen Folge guter operativer Praxis.",
            ],
          },
          {
            type: "prose",
            heading: "Organisationen jeder Größe",
            paragraphs: [
              "Von kleinen ehrenamtlich geführten Organisationen bis zu großen Zuschussstrukturen skaliert Opticini mit Ihren Bedürfnissen.",
              "Die Plattform passt sich Ihren Anforderungen an und bleibt für schlanke Teams bedienbar.",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Im Nonprofit-Sektor ist Compliance nicht nur Regulierung — sie ist Vertrauen.",
              "Vertrauen von Spendern, Gemeinschaften, Aufsicht und Partnern.",
              "Opticini hilft, dieses Vertrauen durch Transparenz, Verantwortung und operative Integrität zu erhalten.",
              "Ihre Mission steht im Mittelpunkt. Compliance unterstützt sie.",
            ],
          },
        ],
      },
      smb: SMB_VERTICAL_DE,
    },
  },
  it: {
    verticalsPages: {
      nonprofits: {
        slug: "nonprofits",
        title: "Organizzazioni non profit",
        subtitle: "Conformità per organizzazioni guidate dalla missione",
        intro: [
          "Le organizzazioni non profit esistono per servire comunità e cause — non per combattere con adempimenti, preparazione agli audit e reporting normativo. Ogni entità deve comunque vigilare su finanze, governance, trasparenza verso i donatori e obblighi normativi.",
          "Opticini semplifica la conformità del terzo settore riunendo governance, supervisione finanziaria e responsabilità operativa su un'unica piattaforma. Invece di inseguire fogli di calcolo, e-mail e documenti sparsi, i team ottengono un ambiente centralizzato per controlli, evidenze, audit e adempimenti.",
          "Che gestiate finanziamenti, dichiarazioni fiscali, verbali del consiglio o trasparenza verso i donatori, Opticini offre un approccio strutturato senza sopraffare i piccoli team.",
          "I leader possono concentrarsi sulla missione mantenendo chiarezza verso donatori, autorità e consiglio.",
        ],
        sections: [
          {
            type: "features",
            heading: "Progettato per la realtà del non profit",
            intro:
              "Le difficoltà di conformità nascono spesso da strumenti frammentati pensati per le aziende, non per le missioni sociali. Opticini fornisce una base pensata per il settore non profit.",
            features: [
              {
                title: "Governance e supervisione del consiglio",
                description:
                  "Statuti, policy del consiglio, conflitti di interesse e verbali in un sistema ordinato. Tracciate approvazioni e controlli che dimostrano leadership responsabile.",
              },
              {
                title: "Trasparenza finanziaria",
                description:
                  "Supervisione di donazioni, fondi vincolati, spese di grant e obblighi di reporting. Documentazione chiara per revisioni e audit indipendenti.",
              },
              {
                title: "Responsabilità su grant e programmi",
                description:
                  "Requisiti dei finanziamenti, deliverable, scadenze e obblighi legati alle fonti di finanziamento.",
              },
              {
                title: "Preparazione agli audit",
                description:
                  "Revisioni interne o audit finanziari esterni con raccolta strutturata di evidenze e verifica dei controlli.",
              },
              {
                title: "Responsabilità verso donatori e pubblico",
                description:
                  "Registrazioni che dimostrano trasparenza, buona gestione e rispetto degli obblighi del settore.",
              },
            ],
          },
          {
            type: "bullets",
            heading: "Aree chiave di conformità",
            intro:
              "Opticini aiuta a gestire i requisiti operativi che sostengono fiducia e responsabilità.",
            items: [
              "Obblighi di governance per l'esenzione fiscale",
              "Supervisione del consiglio e documentazione di governance",
              "Reporting finanziario e trasparenza",
              "Conformità e reporting sui grant",
              "Trasparenza e responsabilità verso i donatori",
              "Controlli interni e preparazione agli audit",
            ],
            outro:
              "Invece di disperdere queste responsabilità tra sistemi diversi, Opticini le organizza in un quadro chiaro che evolve con l'organizzazione.",
          },
          {
            type: "prose",
            heading: "Semplificare la preparazione agli audit",
            paragraphs: [
              "Durante gli audit molte organizzazioni dedicano settimane a raccogliere documenti e ricostruire i registri.",
              "Opticini cambia questa dinamica.",
              "Controlli, documentazione ed evidenze sono organizzati in continuo, così il team dimostra responsabilità senza preparazione dell'ultimo minuto.",
              "La preparazione agli audit diventa la conseguenza naturale di buone pratiche operative.",
            ],
          },
          {
            type: "prose",
            heading: "Supporto per organizzazioni di ogni dimensione",
            paragraphs: [
              "Dalle piccole realtà volontarie alle grandi organizzazioni con grant complessi, Opticini si adatta alle esigenze operative.",
              "La piattaforma si adegua ai requisiti di conformità restando semplice per team snelli.",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Per il non profit la conformità non è solo normativa: è fiducia.",
              "Fiducia dei donatori, delle comunità, delle autorità e dei partner.",
              "Opticini aiuta a mantenere quella fiducia con trasparenza, responsabilità e integrità operativa.",
              "La missione resta al centro. La conformità la sostiene.",
            ],
          },
        ],
      },
      smb: SMB_VERTICAL_IT,
    },
  },
  pt: {
    verticalsPages: {
      nonprofits: {
        slug: "nonprofits",
        title: "Organizações sem fins lucrativos",
        subtitle: "Conformidade pensada para organizações com missão",
        intro: [
          "As organizações sem fins lucrativos existem para servir comunidades e causas — não para lutar com papelada de conformidade, preparação de auditorias e relatórios regulamentares. Ainda assim, cada entidade deve manter supervisão rigorosa das finanças, governação, transparência com doadores e obrigações regulatórias.",
          "A Opticini simplifica a conformidade do terceiro setor ao reunir governação, supervisão financeira e responsabilidade operacional numa única plataforma. Em vez de perseguir folhas de cálculo, e-mails e documentos dispersos, as equipas obtêm um ambiente centralizado para controlos, evidências, auditorias e cumprimento regulamentar.",
          "Quer gere financiamento de subsídios, declarações fiscais anuais, registos do conselho ou transparência com doadores, a Opticini oferece uma abordagem estruturada sem sobrecarregar equipas pequenas.",
          "A plataforma permite aos líderes focar-se na missão mantendo clareza perante doadores, reguladores e membros do conselho.",
        ],
        sections: [
          {
            type: "features",
            heading: "Feito para a realidade do terceiro setor",
            intro:
              "A maioria das dificuldades de conformidade não vem da falta de disciplina, mas de ferramentas fragmentadas pensadas para empresas, não para missões sociais. A Opticini oferece uma base de conformidade pensada para organizações sem fins lucrativos.",
            features: [
              {
                title: "Governação e supervisão do conselho",
                description:
                  "Estatutos, políticas do conselho, registos de conflitos de interesse e atas num sistema organizado. Acompanhe aprovações e controlos que demonstrem liderança responsável.",
              },
              {
                title: "Transparência financeira",
                description:
                  "Supervisão adequada de donações, fundos restritos, despesas de subsídios e obrigações de reporting. Mantenha documentação clara para revisões e auditorias independentes.",
              },
              {
                title: "Responsabilidade de subsídios e programas",
                description:
                  "Acompanhe requisitos de subsídios, entregáveis, prazos de relatórios e obrigações ligadas às fontes de financiamento.",
              },
              {
                title: "Preparação para auditorias",
                description:
                  "Prepare revisões internas ou auditorias financeiras externas com recolha estruturada de evidências e verificação de controlos.",
              },
              {
                title: "Responsabilidade perante doadores e o público",
                description:
                  "Mantenha registos que demonstrem transparência, boa gestão e cumprimento das obrigações do setor.",
              },
            ],
          },
          {
            type: "bullets",
            heading: "Áreas-chave de conformidade",
            intro:
              "A Opticini ajuda a gerir os requisitos operativos que sustentam a confiança e a prestação de contas.",
            items: [
              "Obrigações de governação da isenção fiscal",
              "Supervisão do conselho e documentação de governação",
              "Reporting financeiro e transparência",
              "Conformidade e reporting de subsídios",
              "Transparência e responsabilidade com doadores",
              "Controlos internos e preparação para auditorias",
            ],
            outro:
              "Em vez de dispersar estas responsabilidades por vários sistemas, a Opticini organiza-as num quadro claro que evolui com a sua organização.",
          },
          {
            type: "prose",
            heading: "Simplificar a preparação para auditorias",
            paragraphs: [
              "Nas auditorias, muitas organizações dedicam semanas a reunir documentos e reconstruir registos.",
              "A Opticini altera essa dinâmica.",
              "Os controlos, a documentação e as evidências organizam-se de forma contínua, permitindo demonstrar responsabilidade sem preparação de última hora.",
              "Estar preparado para auditoria é o resultado natural de boas práticas operativas.",
            ],
          },
          {
            type: "prose",
            heading: "Apoio a organizações de qualquer dimensão",
            paragraphs: [
              "Desde pequenas estruturas voluntárias até grandes organizações com subsídios complexos, a Opticini adapta-se às necessidades operacionais.",
              "A plataforma ajusta-se aos requisitos de conformidade mantendo-se simples para equipas reduzidas.",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Para o terceiro setor, a conformidade não é apenas regulamento: é confiança.",
              "Confiança dos doadores, das comunidades, dos reguladores e dos parceiros.",
              "A Opticini ajuda a manter essa confiança com transparência, responsabilidade e integridade operacional.",
              "A sua missão continua no centro. A conformidade apoia-a.",
            ],
          },
        ],
      },
      smb: SMB_VERTICAL_PT,
    },
  },
}
