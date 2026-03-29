import type { PartnershipContent } from "@/lib/partnerships-data"

type PartnershipsPayload = { partnershipsPages: Record<string, PartnershipContent> }

/** German, Italian, Portuguese partnership page trees; merged in `partnerships-pages-i18n`. */
export const PARTNERSHIPS_DE_IT_PT: Record<string, PartnershipsPayload> = {
  de: {
    partnershipsPages: {
      affiliates: {
        slug: "affiliates",
        title: "Opticini-Partnerprogramm",
        subtitle:
          "Verdienen Sie Provisionen, indem Sie Organisationen empfehlen, die Compliance-Management benötigen.",
        intro: [
          "Partner (Affiliates) werben neue Kunden für Opticini und erhalten einen Anteil der Abonnementeinnahmen bei erfolgreichen Empfehlungen.",
          "Ob Blog, Beratung, Consulting oder Startup-Community – mit dem Partnerprogramm monetarisieren Sie Ihr Netzwerk und helfen Organisationen, ihre Compliance zu verbessern.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Vorteile",
            items: [
              "wettbewerbsfähige Empfehlungsprovisionen",
              "wiederkehrende Umsatzchancen",
              "einfaches Tracking der Empfehlungen",
              "dediziertes Partner-Dashboard",
            ],
          },
          {
            type: "bullets",
            heading: "Für wen geeignet",
            items: [
              "Startup-Berater",
              "Technologieberater",
              "Business-Influencer",
              "Compliance-Blogger",
              "SaaS-Reviewer",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Treten Sie dem Opticini-Partnerprogramm bei und verdienen Sie mit, während Organisationen ihre Compliance stärken.",
            ],
          },
        ],
        ctaText: "Partnerprogramm beitreten",
        ctaHref: "/affiliate-signup",
      },
      consultants: {
        slug: "consultants",
        title: "Opticini-Beraternetzwerk",
        subtitle: "Compliance-Experten, die Kunden beim Umsetzen von Kontrollen unterstützen.",
        intro: [
          "Opticini arbeitet mit unabhängigen Beratern zusammen, die Organisationen beim Entwerfen und Einführen von Compliance-Programmen unterstützen.",
          "Berater unterstützen etwa bei Sicherheitskontrollen, operativer Governance, Auditvorbereitung und regulatorischer Einsatzbereitschaft.",
          "Die Opticini-Plattform ermöglicht die direkte Zusammenarbeit mit Organisationen: Kontrollen verwalten, Nachweise hochladen und Compliance-Aktivitäten im System begleiten.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Vorteile",
            items: [
              "Zugang zu neuen Kundenaufträgen",
              "zentraler Compliance-Arbeitsbereich",
              "Verwaltung mehrerer Organisationen",
              "optionale Abrechnung über die Plattform",
            ],
          },
          {
            type: "bullets",
            heading: "Für wen geeignet",
            items: [
              "Compliance-Berater",
              "Governance-Berater",
              "Sicherheitsexperten",
              "Fractional CISOs",
              "Risikomanagement-Spezialisten",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Werden Sie Teil des Opticini-Beraternetzwerks und helfen Sie Organisationen, robustere Compliance-Programme aufzubauen.",
            ],
          },
        ],
        ctaText: "Beraternetzwerk beitreten",
        ctaHref: "/contact-sales",
      },
      "audit-partners": {
        slug: "audit-partners",
        title: "Opticini Audit-Partnerprogramm",
        subtitle: "Zugelassene Wirtschaftsprüfer, die Compliance bescheinigen.",
        intro: [
          "Audit-Partner liefern unabhängige Prüfung von Compliance-Programmen, die auf der Opticini-Plattform geführt werden.",
          "Im Programm arbeiten zertifizierte Prüfer und Wirtschaftsprüfungsgesellschaften direkt mit Organisationen zusammen, die Opticini nutzen, um Compliance-Audits vorzubereiten und durchzuführen.",
          "Audit-Partner erhalten strukturierte Dokumentation, Kontrollnachweise und unterstützende Belege, die den Auditprozess vereinfachen.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Vorteile",
            items: [
              "effizientere Auditvorbereitung",
              "Zugang zu potenziellen Auditmandanten",
              "strukturiertes Nachweismanagement",
              "Kollaborationstools in der Plattform",
            ],
          },
          {
            type: "bullets",
            heading: "Für wen geeignet",
            items: [
              "WP-Gesellschaften",
              "Compliance-Auditoren",
              "Sicherheitsbewertungsfirmen",
              "unabhängige Prüfer",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Werden Sie Opticini-Audit-Partner und arbeiten Sie mit Organisationen, die bereits auditbereit sind.",
            ],
          },
        ],
        ctaText: "Audit-Partner werden",
        ctaHref: "/contact-sales",
      },
      "technology-partners": {
        slug: "technology-partners",
        title: "Opticini-Technologiepartner",
        subtitle:
          "Integrationspartner für operative Aufsicht, Sicherheit und Compliance.",
        intro: [
          "Die Opticini-Plattform integriert Technologieanbieter für operative Aufsicht, Sicherheitsmanagement und Compliance-Monitoring.",
          "Technologiepartner helfen, Betriebssysteme wie Cloud, Identität und Ticketing mit Opticini zu verbinden.",
          "Diese Integrationen ermöglichen automatisierte Nachweissammlung und kontinuierliches Compliance-Monitoring.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Vorteile",
            items: [
              "Sichtbarkeit der Integration im Opticini-Ökosystem",
              "erweiterte Reichweite der Plattform",
              "Zusammenarbeit mit Compliance-Fachleuten und Organisationen",
            ],
          },
          {
            type: "bullets",
            heading: "Für wen geeignet",
            items: [
              "Infrastrukturplattformen",
              "Sicherheitstools",
              "Cloud-Anbieter",
              "Anbieter von Identitäts- und Zugriffsmanagement",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Werden Sie Technologiepartner und erweitern Sie Opticini mit Ihren Integrationen.",
            ],
          },
        ],
        ctaText: "Technologiepartner werden",
        ctaHref: "/contact-sales",
      },
    },
  },
  it: {
    partnershipsPages: {
      affiliates: {
        slug: "affiliates",
        title: "Programma di affiliazione Opticini",
        subtitle:
          "Guadagna commissioni presentando organizzazioni che necessitano di gestione della conformità.",
        intro: [
          "Gli affiliati presentano nuovi clienti a Opticini e ricevono una percentuale dei ricavi da abbonamento per referral andati a buon fine.",
          "Che gestiate un blog, un servizio di consulenza, uno studio o una community di startup, il programma vi permette di monetizzare la rete aiutando le organizzazioni a migliorare la conformità.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Vantaggi",
            items: [
              "commissioni competitive sui referral",
              "opportunità di ricavi ricorrenti",
              "tracciamento semplice dei referral",
              "dashboard dedicata per i partner",
            ],
          },
          {
            type: "bullets",
            heading: "A chi è rivolto",
            items: [
              "consulenti per startup",
              "consulenti tecnologici",
              "influencer di business",
              "blogger sulla conformità",
              "recensori SaaS",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Unisciti al programma di affiliazione Opticini e inizia a guadagnare mentre aiuti le organizzazioni a migliorare la conformità.",
            ],
          },
        ],
        ctaText: "Unisciti al programma di affiliazione",
        ctaHref: "/affiliate-signup",
      },
      consultants: {
        slug: "consultants",
        title: "Rete di consulenti Opticini",
        subtitle:
          "Professionisti della conformità che aiutano i clienti a implementare i controlli.",
        intro: [
          "Opticini collabora con consulenti indipendenti che supportano le organizzazioni nella progettazione e nell'implementazione dei programmi di conformità.",
          "I consulenti intervengono su controlli di sicurezza, governance operativa, preparazione agli audit e readiness normativa.",
          "La piattaforma Opticini consente di collaborare direttamente con le organizzazioni gestendo controlli, caricando evidenze e guidando le attività di conformità.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Vantaggi",
            items: [
              "accesso a nuove opportunità di clienti",
              "workspace di conformità centralizzato",
              "gestione di più organizzazioni",
              "fatturazione opzionale tramite piattaforma",
            ],
          },
          {
            type: "bullets",
            heading: "A chi è rivolto",
            items: [
              "consulenti di conformità",
              "consulenti di governance",
              "professionisti della sicurezza",
              "CISO frazionati",
              "specialisti in gestione del rischio",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Entra nella rete di consulenti Opticini e aiuta le organizzazioni a rafforzare i programmi di conformità.",
            ],
          },
        ],
        ctaText: "Entra nella rete di consulenti",
        ctaHref: "/contact-sales",
      },
      "audit-partners": {
        slug: "audit-partners",
        title: "Programma partner di audit Opticini",
        subtitle: "Revisori autorizzati che certificano la conformità.",
        intro: [
          "I partner di audit forniscono verifica indipendente dei programmi di conformità gestiti sulla piattaforma Opticini.",
          "Attraverso il programma, revisori certificati e studi possono lavorare con organizzazioni che usano Opticini per preparare e completare audit di conformità.",
          "I partner di audit accedono a documentazione strutturata, registri dei controlli e evidenze di supporto che semplificano il processo.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Vantaggi",
            items: [
              "preparazione agli audit più fluida",
              "accesso a potenziali mandati di audit",
              "gestione strutturata delle evidenze",
              "strumenti di collaborazione nella piattaforma",
            ],
          },
          {
            type: "bullets",
            heading: "A chi è rivolto",
            items: [
              "studi di revisione",
              "revisori della conformità",
              "aziende di valutazione della sicurezza",
              "professionisti dell'audit indipendente",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Diventa partner di audit Opticini e lavora con organizzazioni già pronte per l'audit.",
            ],
          },
        ],
        ctaText: "Diventa partner di audit",
        ctaHref: "/contact-sales",
      },
      "technology-partners": {
        slug: "technology-partners",
        title: "Partner tecnologici Opticini",
        subtitle:
          "Partner dell'ecosistema di integrazione per supervisione operativa, sicurezza e conformità.",
        intro: [
          "La piattaforma Opticini si integra con fornitori tecnologici che supportano supervisione operativa, gestione della sicurezza e monitoraggio della conformità.",
          "I partner tecnologici aiutano a collegare sistemi operativi come cloud, identità e ticketing a Opticini.",
          "Queste integrazioni consentono raccolta automatizzata delle evidenze e monitoraggio continuo della conformità.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Vantaggi",
            items: [
              "visibilità dell'integrazione nell'ecosistema Opticini",
              "maggiore portata della piattaforma",
              "collaborazione con professionisti della conformità e organizzazioni",
            ],
          },
          {
            type: "bullets",
            heading: "A chi è rivolto",
            items: [
              "piattaforme di infrastruttura",
              "strumenti di sicurezza",
              "provider cloud",
              "fornitori di identità e gestione degli accessi",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Diventa partner tecnologico ed estendi Opticini con le tue integrazioni.",
            ],
          },
        ],
        ctaText: "Diventa partner tecnologico",
        ctaHref: "/contact-sales",
      },
    },
  },
  pt: {
    partnershipsPages: {
      affiliates: {
        slug: "affiliates",
        title: "Programa de afiliados Opticini",
        subtitle:
          "Ganhe comissões ao indicar organizações que precisam de gestão de conformidade.",
        intro: [
          "Afiliados apresentam novos clientes à Opticini e recebem uma percentagem da receita de subscrição por referências bem-sucedidas.",
          "Quer tenha um blog, serviço de consultoria, consultoria ou comunidade de startups, o programa permite monetizar a sua rede enquanto ajuda organizações a melhorar a conformidade.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Benefícios",
            items: [
              "comissões competitivas por referências",
              "oportunidades de receita recorrente",
              "acompanhamento simples de referidos",
              "painel dedicado para parceiros",
            ],
          },
          {
            type: "bullets",
            heading: "Quem pode aderir",
            items: [
              "consultores de startups",
              "consultores tecnológicos",
              "influenciadores de negócio",
              "bloggers de conformidade",
              "revisores de SaaS",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Junte-se ao programa de afiliados Opticini e comece a ganhar enquanto ajuda organizações a melhorar a conformidade.",
            ],
          },
        ],
        ctaText: "Aderir ao programa de afiliados",
        ctaHref: "/affiliate-signup",
      },
      consultants: {
        slug: "consultants",
        title: "Rede de consultores Opticini",
        subtitle:
          "Profissionais de conformidade que ajudam os clientes a implementar controlos.",
        intro: [
          "A Opticini trabalha com consultores independentes que ajudam organizações a desenhar e implementar programas de conformidade.",
          "Os consultores apoiam em controlos de segurança, governação operacional, preparação para auditorias e prontidão regulamentar.",
          "A plataforma Opticini permite colaborar diretamente com as organizações, gerindo controlos, carregando evidências e orientando atividades de conformidade.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Benefícios",
            items: [
              "acesso a novas oportunidades de clientes",
              "área de trabalho de conformidade centralizada",
              "capacidade de gerir várias organizações",
              "faturação opcional através da plataforma",
            ],
          },
          {
            type: "bullets",
            heading: "Quem pode aderir",
            items: [
              "consultores de conformidade",
              "consultores de governação",
              "profissionais de segurança",
              "CISOs fracionados",
              "especialistas em gestão de risco",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Junte-se à rede de consultores Opticini e ajude organizações a reforçar os programas de conformidade.",
            ],
          },
        ],
        ctaText: "Aderir à rede de consultores",
        ctaHref: "/contact-sales",
      },
      "audit-partners": {
        slug: "audit-partners",
        title: "Programa de parceiros de auditoria Opticini",
        subtitle: "Auditores licenciados que certificam a conformidade.",
        intro: [
          "Os parceiros de auditoria fornecem verificação independente dos programas de conformidade geridos na plataforma Opticini.",
          "Através do programa, auditores certificados e empresas de contabilidade podem trabalhar com organizações que usam a Opticini para preparar e concluir auditorias de conformidade.",
          "Os parceiros de auditoria acedem a documentação estruturada, registos de controlos e evidências de suporte que simplificam o processo.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Benefícios",
            items: [
              "preparação para auditoria mais fluida",
              "acesso a potenciais clientes de auditoria",
              "gestão estruturada de evidências",
              "ferramentas de colaboração na plataforma",
            ],
          },
          {
            type: "bullets",
            heading: "Quem pode aderir",
            items: [
              "empresas de auditoria",
              "auditores de conformidade",
              "empresas de avaliação de segurança",
              "profissionais de auditoria independentes",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Torne-se parceiro de auditoria Opticini e trabalhe com organizações já preparadas para auditoria.",
            ],
          },
        ],
        ctaText: "Tornar-se parceiro de auditoria",
        ctaHref: "/contact-sales",
      },
      "technology-partners": {
        slug: "technology-partners",
        title: "Parceiros tecnológicos Opticini",
        subtitle:
          "Parceiros do ecossistema de integração para supervisão operacional, segurança e conformidade.",
        intro: [
          "A plataforma Opticini integra-se com fornecedores tecnológicos que suportam supervisão operacional, gestão de segurança e monitorização da conformidade.",
          "Os parceiros tecnológicos ajudam a ligar sistemas operacionais como cloud, identidade e ticketing à Opticini.",
          "Estas integrações permitem recolha automatizada de evidências e monitorização contínua da conformidade.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Benefícios",
            items: [
              "visibilidade da integração no ecossistema Opticini",
              "maior alcance da plataforma",
              "colaboração com profissionais de conformidade e organizações",
            ],
          },
          {
            type: "bullets",
            heading: "Quem pode aderir",
            items: [
              "plataformas de infraestrutura",
              "ferramentas de segurança",
              "fornecedores cloud",
              "fornecedores de identidade e gestão de acessos",
            ],
          },
          {
            type: "closing",
            paragraphs: [
              "Torne-se parceiro tecnológico e estenda a Opticini com as suas integrações.",
            ],
          },
        ],
        ctaText: "Tornar-se parceiro tecnológico",
        ctaHref: "/contact-sales",
      },
    },
  },
}
