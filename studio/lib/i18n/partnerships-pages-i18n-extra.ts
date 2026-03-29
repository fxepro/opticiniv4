import type { PartnershipContent } from "@/lib/partnerships-data"

type PartnershipsPayload = { partnershipsPages: Record<string, PartnershipContent> }

/** RU / SV / NO / DA / ZH / JA — full four slugs each; merged in `partnerships-pages-i18n`. */
export const PARTNERSHIPS_EXTRA_BY_LANG: Record<string, PartnershipsPayload> = {
  ru: {
    partnershipsPages: {
      affiliates: {
        slug: "affiliates",
        title: "Партнерская программа Opticini",
        subtitle: "Получайте вознаграждение, приводя организации, которым нужен комплаенс.",
        intro: [
          "Партнеры приводят новых клиентов и получают долю от подписок по успешным рефералам.",
          "Подходит блогерам, консультантам и сообществам, которые хотят монетизировать сеть и помогать с комплаенсом.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Преимущества",
            items: ["Конкурентные комиссии", "Регулярные выплаты", "Простой учет рефералов", "Партнерский кабинет"],
          },
          {
            type: "bullets",
            heading: "Кому подходит",
            items: ["Стартап-советники", "Технологические консультанты", "Лидеры мнений", "Блогеры о комплаенсе", "Обозреватели SaaS"],
          },
          {
            type: "closing",
            paragraphs: ["Присоединяйтесь к партнерской программе Opticini и зарабатывайте, помогая организациям."],
          },
        ],
        ctaText: "Стать партнером",
        ctaHref: "/affiliate-signup",
      },
      consultants: {
        slug: "consultants",
        title: "Сеть консультантов Opticini",
        subtitle: "Эксперты по комплаенсу, помогающие внедрять контроли.",
        intro: [
          "Opticini сотрудничает с независимыми консультантами по программам комплаенса.",
          "Платформа позволяет вести контроли, загружать доказательства и сопровождать клиентов в системе.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Преимущества",
            items: ["Новые клиенты", "Единое рабочее пространство", "Несколько организаций", "Опциональный биллинг"],
          },
          {
            type: "bullets",
            heading: "Кому подходит",
            items: ["Консультанты по комплаенсу", "Эксперты по управлению", "Специалисты по ИБ", "Fractional CISO", "Риск-менеджеры"],
          },
          {
            type: "closing",
            paragraphs: ["Присоединяйтесь к сети консультантов Opticini."],
          },
        ],
        ctaText: "Вступить в сеть",
        ctaHref: "/contact-sales",
      },
      "audit-partners": {
        slug: "audit-partners",
        title: "Программа аудиторских партнеров Opticini",
        subtitle: "Лицензированные аудиторы, подтверждающие комплаенс.",
        intro: [
          "Аудиторы получают структурированные доказательства и записи контролей в платформе.",
          "Сертифицированные аудиторы и фирмы работают с организациями, готовящимися к аудитам.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Преимущества",
            items: ["Упрощенная подготовка к аудиту", "Доступ к клиентам", "Структурированные доказательства", "Совместная работа в системе"],
          },
          {
            type: "bullets",
            heading: "Кому подходит",
            items: ["Аудиторские фирмы", "Аудиторы комплаенса", "Фирмы оценки ИБ", "Независимые аудиторы"],
          },
          {
            type: "closing",
            paragraphs: ["Станьте аудиторским партнером Opticini."],
          },
        ],
        ctaText: "Стать аудиторским партнером",
        ctaHref: "/contact-sales",
      },
      "technology-partners": {
        slug: "technology-partners",
        title: "Технологические партнеры Opticini",
        subtitle: "Интеграции для надзора, безопасности и комплаенса.",
        intro: [
          "Платформа интегрируется с облаком, IAM, тикетингом и другими системами.",
          "Интеграции поддерживают автоматический сбор доказательств и непрерывный мониторинг.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Преимущества",
            items: ["Видимость в экосистеме Opticini", "Расширение охвата", "Совместная работа с командами комплаенса"],
          },
          {
            type: "bullets",
            heading: "Кому подходит",
            items: ["Инфраструктурные платформы", "Инструменты безопасности", "Облачные провайдеры", "Поставщики IAM"],
          },
          {
            type: "closing",
            paragraphs: ["Станьте технологическим партнером и расширьте Opticini своими интеграциями."],
          },
        ],
        ctaText: "Стать технологическим партнером",
        ctaHref: "/contact-sales",
      },
    },
  },
  zh: {
    partnershipsPages: {
      affiliates: {
        slug: "affiliates",
        title: "Opticini 联盟计划",
        subtitle: "推荐需要合规管理的组织并获得回报。",
        intro: [
          "联盟伙伴推荐新客户，成功后可获得订阅收入分成。",
          "适合博主、顾问、社区运营者，在拓展人脉的同时帮助组织提升合规能力。",
        ],
        sections: [
          {
            type: "bullets",
            heading: "权益",
            items: ["有竞争力的推荐奖励", "持续收入机会", "简单的推荐跟踪", "专属伙伴面板"],
          },
          {
            type: "bullets",
            heading: "适合谁",
            items: ["创业顾问", "技术顾问", "商业影响者", "合规内容作者", "SaaS 评测者"],
          },
          { type: "closing", paragraphs: ["加入 Opticini 联盟计划，在帮助组织的同时获得收益。"] },
        ],
        ctaText: "加入联盟计划",
        ctaHref: "/affiliate-signup",
      },
      consultants: {
        slug: "consultants",
        title: "Opticini 顾问网络",
        subtitle: "帮助客户落地控制措施的合规专业人士。",
        intro: [
          "Opticini 与独立顾问合作，协助组织设计与实施合规项目。",
          "顾问可在平台内管理控制、上传证据并指导合规活动。",
        ],
        sections: [
          {
            type: "bullets",
            heading: "权益",
            items: ["获取新客户机会", "统一合规工作区", "管理多家组织", "可选平台计费"],
          },
          {
            type: "bullets",
            heading: "适合谁",
            items: ["合规顾问", "治理顾问", "安全专家", "兼职 CISO", "风险管理专家"],
          },
          { type: "closing", paragraphs: ["加入 Opticini 顾问网络，帮助组织强化合规体系。"] },
        ],
        ctaText: "加入顾问网络",
        ctaHref: "/contact-sales",
      },
      "audit-partners": {
        slug: "audit-partners",
        title: "Opticini 审计合作伙伴计划",
        subtitle: "为合规提供独立鉴证的持证审计方。",
        intro: [
          "审计伙伴对平台内管理的合规项目进行独立验证。",
          "持证审计机构与使用 Opticini 准备并完成合规审计的组织协作。",
        ],
        sections: [
          {
            type: "bullets",
            heading: "权益",
            items: ["更顺畅的审计准备", "触达潜在客户", "结构化证据管理", "平台内协作工具"],
          },
          {
            type: "bullets",
            heading: "适合谁",
            items: ["会计师事务所", "合规审计师", "安全评估机构", "独立审计专业人士"],
          },
          { type: "closing", paragraphs: ["成为 Opticini 审计合作伙伴，服务已具备审计就绪能力的组织。"] },
        ],
        ctaText: "成为审计合作伙伴",
        ctaHref: "/contact-sales",
      },
      "technology-partners": {
        slug: "technology-partners",
        title: "Opticini 技术合作伙伴",
        subtitle: "面向运营监督、安全与合规的集成生态伙伴。",
        intro: [
          "平台与支持运营监督、安全与合规监控的技术供应商集成。",
          "集成支持自动化证据采集与持续合规监测。",
        ],
        sections: [
          {
            type: "bullets",
            heading: "权益",
            items: ["在 Opticini 生态中的集成曝光", "扩大平台触达", "与合规团队及组织协作"],
          },
          {
            type: "bullets",
            heading: "适合谁",
            items: ["基础设施平台", "安全工具", "云服务商", "身份与访问管理厂商"],
          },
          { type: "closing", paragraphs: ["成为技术合作伙伴，用您的集成扩展 Opticini。"] },
        ],
        ctaText: "成为技术合作伙伴",
        ctaHref: "/contact-sales",
      },
    },
  },
  sv: {
    partnershipsPages: {
      affiliates: {
        slug: "affiliates",
        title: "Opticinis partnerprogram",
        subtitle: "Tjäna genom att hänvisa organisationer som behöver regelefterlevnad.",
        intro: [
          "Partners hänvisar nya kunder och får en andel av prenumerationsintäkter vid lyckade hänvisningar.",
          "Passar bloggare, konsulter och community-ledare som vill tjäna på sitt nätverk och hjälpa med regelefterlevnad.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fördelar",
            items: ["Konkurrenskraftiga provisioner", "Återkommande intäkter", "Enkel hänvisningsspårning", "Partnerportal"],
          },
          {
            type: "bullets",
            heading: "Passar för",
            items: ["Startup-rådgivare", "Teknikkonsulter", "Thought leaders", "Regelefterlevnadsbloggare", "SaaS-recensenter"],
          },
          {
            type: "closing",
            paragraphs: ["Gå med i Opticinis partnerprogram och tjäna pengar medan du hjälper organisationer."],
          },
        ],
        ctaText: "Bli partner",
        ctaHref: "/affiliate-signup",
      },
      consultants: {
        slug: "consultants",
        title: "Opticinis konsultnätverk",
        subtitle: "Regelefterlevnadsexperter som hjälper organisationer att genomföra kontroller.",
        intro: [
          "Opticini samarbetar med oberoende konsulter som stöttar regelefterlevnadsprogram.",
          "Konsulter kan hantera kontroller, ladda upp bevis och vägleda kunder i plattformen.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fördelar",
            items: ["Tillgång till nya kunder", "Enhetlig regelefterlevnadsarbetsyta", "Hantera flera organisationer", "Valfri fakturering"],
          },
          {
            type: "bullets",
            heading: "Passar för",
            items: ["Regelefterlevnadskonsulter", "Styrningskonsulter", "Säkerhetsexperter", "Fractional CISO", "Riskhantering"],
          },
          { type: "closing", paragraphs: ["Gå med i Opticinis konsultnätverk."] },
        ],
        ctaText: "Gå med i nätverket",
        ctaHref: "/contact-sales",
      },
      "audit-partners": {
        slug: "audit-partners",
        title: "Opticinis revisionspartnerprogram",
        subtitle: "Licensierade revisorer som ger oberoende försäkran om regelefterlevnad.",
        intro: [
          "Revisionspartners granskar strukturerade bevis och kontrollposter i plattformen.",
          "Certifierade revisionsbyråer arbetar med organisationer som förbereder sig för revision.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fördelar",
            items: ["Smidigare revisionsförberedelse", "Tillgång till potentiella kunder", "Strukturerade bevis", "Samarbete i plattformen"],
          },
          {
            type: "bullets",
            heading: "Passar för",
            items: ["Revisionsbyråer", "Regelefterlevnadsrevisorer", "Säkerhetsbedömningsfirmor", "Oberoende revisorer"],
          },
          { type: "closing", paragraphs: ["Bli revisionspartner hos Opticini."] },
        ],
        ctaText: "Bli revisionspartner",
        ctaHref: "/contact-sales",
      },
      "technology-partners": {
        slug: "technology-partners",
        title: "Opticinis teknikpartners",
        subtitle: "Integrationer för driftövervakning, säkerhet och regelefterlevnad.",
        intro: [
          "Plattformen integreras med moln, IAM, ärendehantering och andra verktyg.",
          "Integrationer stödjer automatiserad bevisinsamling och kontinuerlig övervakning.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fördelar",
            items: ["Synlighet i Opticinis ekosystem", "Större räckvidd", "Samarbete med regelefterlevnadsteam"],
          },
          {
            type: "bullets",
            heading: "Passar för",
            items: ["Infrastrukturplattformar", "Säkerhetsverktyg", "Molnleverantörer", "IAM-leverantörer"],
          },
          { type: "closing", paragraphs: ["Bli teknikpartner och utöka Opticini med era integrationer."] },
        ],
        ctaText: "Bli teknikpartner",
        ctaHref: "/contact-sales",
      },
    },
  },
  no: {
    partnershipsPages: {
      affiliates: {
        slug: "affiliates",
        title: "Opticini partnerprogram",
        subtitle: "Tjen penger ved å henvise organisasjoner som trenger samsvar.",
        intro: [
          "Partnere henviser nye kunder og får andel av abonnementsinntekter ved vellykkede henvisninger.",
          "Passer bloggere, konsulenter og community-ledere som vil tjene på nettverket og hjelpe med samsvar.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fordeler",
            items: ["Konkurransedyktige provisjoner", "Gjentakende inntekter", "Enkel henvisningssporing", "Partnerportal"],
          },
          {
            type: "bullets",
            heading: "Passer for",
            items: ["Startup-rådgivere", "Teknologikonsulenter", "Thought leaders", "Samsvarsbloggere", "SaaS-anmeldere"],
          },
          {
            type: "closing",
            paragraphs: ["Bli med i Opticini partnerprogram og tjen penger mens du hjelper organisasjoner."],
          },
        ],
        ctaText: "Bli partner",
        ctaHref: "/affiliate-signup",
      },
      consultants: {
        slug: "consultants",
        title: "Opticini konsulentnettverk",
        subtitle: "Samsvareksperter som hjelper organisasjoner med kontroller.",
        intro: [
          "Opticini samarbeider med uavhengige konsulenter som støtter samsvarsprogrammer.",
          "Konsulenter kan administrere kontroller, laste opp bevis og veilede kunder i plattformen.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fordeler",
            items: ["Tilgang til nye kunder", "Enhetlig samsvarsarbeidsflate", "Flere organisasjoner", "Valgfri fakturering"],
          },
          {
            type: "bullets",
            heading: "Passer for",
            items: ["Samsvarskonsulenter", "Styringskonsulenter", "Sikkerhetseksperter", "Fractional CISO", "Risikostyring"],
          },
          { type: "closing", paragraphs: ["Bli med i Opticini konsulentnettverk."] },
        ],
        ctaText: "Bli med i nettverket",
        ctaHref: "/contact-sales",
      },
      "audit-partners": {
        slug: "audit-partners",
        title: "Opticini revisjonspartnerprogram",
        subtitle: "Lisensierte revisorer som gir uavhengig sikkerhet for samsvar.",
        intro: [
          "Revisjonspartnere gjennomgår strukturerte bevis og kontrollposter i plattformen.",
          "Sertifiserte revisjonsfirmaer arbeider med organisasjoner som forbereder revisjon.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fordeler",
            items: ["Smidigere revisjonsforberedelse", "Tilgang til potensielle kunder", "Strukturerte bevis", "Samarbeid i plattformen"],
          },
          {
            type: "bullets",
            heading: "Passer for",
            items: ["Revisjonsfirmaer", "Samsvarsrevisorer", "Sikkerhetsvurderingsfirmaer", "Uavhengige revisorer"],
          },
          { type: "closing", paragraphs: ["Bli revisjonspartner hos Opticini."] },
        ],
        ctaText: "Bli revisjonspartner",
        ctaHref: "/contact-sales",
      },
      "technology-partners": {
        slug: "technology-partners",
        title: "Opticini teknologipartnere",
        subtitle: "Integrasjoner for driftsovervåking, sikkerhet og samsvar.",
        intro: [
          "Plattformen integreres med sky, IAM, saksbehandling og andre verktøy.",
          "Integrasjoner støtter automatisert bevisinnsamling og kontinuerlig overvåking.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fordeler",
            items: ["Synlighet i Opticini-økosystemet", "Større rekkevidde", "Samarbeid med samsvarsteam"],
          },
          {
            type: "bullets",
            heading: "Passer for",
            items: ["Infrastrukturplattformer", "Sikkerhetsverktøy", "Skyleverandører", "IAM-leverandører"],
          },
          { type: "closing", paragraphs: ["Bli teknologipartner og utvid Opticini med integrasjonene deres."] },
        ],
        ctaText: "Bli teknologipartner",
        ctaHref: "/contact-sales",
      },
    },
  },
  da: {
    partnershipsPages: {
      affiliates: {
        slug: "affiliates",
        title: "Opticini partnerprogram",
        subtitle: "Tjen penge ved at henvise organisationer, der har brug for compliance.",
        intro: [
          "Partnere henviser nye kunder og får en andel af abonnementsindtægter ved vellykkede henvisninger.",
          "Passer til bloggere, konsulenter og community-ledere, der vil tjene på deres netværk og hjælpe med compliance.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fordele",
            items: ["Konkurrencedygtige provisioner", "Tilbagevendende indtægter", "Enkel henvisningssporing", "Partnerportal"],
          },
          {
            type: "bullets",
            heading: "Passer til",
            items: ["Startup-rådgivere", "Teknologikonsulenter", "Thought leaders", "Compliance-bloggere", "SaaS-anmeldere"],
          },
          {
            type: "closing",
            paragraphs: ["Bliv en del af Opticini partnerprogram og tjen penge, mens du hjælper organisationer."],
          },
        ],
        ctaText: "Bliv partner",
        ctaHref: "/affiliate-signup",
      },
      consultants: {
        slug: "consultants",
        title: "Opticini konsulentnetværk",
        subtitle: "Compliance-eksperter, der hjælper organisationer med kontroller.",
        intro: [
          "Opticini samarbejder med uafhængige konsulenter, der understøtter compliance-programmer.",
          "Konsulenter kan administrere kontroller, uploade beviser og vejlede kunder i platformen.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fordele",
            items: ["Adgang til nye kunder", "Samlet compliance-arbejdsflade", "Flere organisationer", "Valgfri fakturering"],
          },
          {
            type: "bullets",
            heading: "Passer til",
            items: ["Compliance-konsulenter", "Governance-konsulenter", "Sikkerhedseksperter", "Fractional CISO", "Risikostyring"],
          },
          { type: "closing", paragraphs: ["Bliv en del af Opticini konsulentnetværk."] },
        ],
        ctaText: "Bliv en del af netværket",
        ctaHref: "/contact-sales",
      },
      "audit-partners": {
        slug: "audit-partners",
        title: "Opticini revisionspartnerprogram",
        subtitle: "Licenserede revisorer, der giver uafhængig sikkerhed for compliance.",
        intro: [
          "Revisionspartnere gennemgår strukturerede beviser og kontrolposter i platformen.",
          "Certificerede revisionsfirmaer arbejder med organisationer, der forbereder revision.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fordele",
            items: ["Smidigere revisionsforberedelse", "Adgang til potentielle kunder", "Strukturerede beviser", "Samarbejde i platformen"],
          },
          {
            type: "bullets",
            heading: "Passer til",
            items: ["Revisionsfirmaer", "Compliance-revisorer", "Sikkerhedsvurderingsfirmaer", "Uafhængige revisorer"],
          },
          { type: "closing", paragraphs: ["Bliv revisionspartner hos Opticini."] },
        ],
        ctaText: "Bliv revisionspartner",
        ctaHref: "/contact-sales",
      },
      "technology-partners": {
        slug: "technology-partners",
        title: "Opticini teknologipartnere",
        subtitle: "Integrationer til driftsovervågning, sikkerhed og compliance.",
        intro: [
          "Platformen integreres med sky, IAM, sagsstyring og andre værktøjer.",
          "Integrationer understøtter automatiseret bevisindsamling og kontinuerlig overvågning.",
        ],
        sections: [
          {
            type: "bullets",
            heading: "Fordele",
            items: ["Synlighed i Opticini-økosystemet", "Større rækkevidde", "Samarbejde med compliance-teams"],
          },
          {
            type: "bullets",
            heading: "Passer til",
            items: ["Infrastrukturplatforme", "Sikkerhedsværktøjer", "Skyleverandører", "IAM-leverandører"],
          },
          { type: "closing", paragraphs: ["Bliv teknologipartner og udvid Opticini med jeres integrationer."] },
        ],
        ctaText: "Bliv teknologipartner",
        ctaHref: "/contact-sales",
      },
    },
  },
}
