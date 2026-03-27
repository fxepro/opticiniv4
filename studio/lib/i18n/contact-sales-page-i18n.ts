type Option = { value: string; label: string }

type ContactSalesPayload = {
  contactSales: {
    heroBadge: string
    heroTitle: string
    heroSubtitle: string
    sectionTitle: string
    sectionSubtitle: string
    labelName: string
    labelEmail: string
    labelCompany: string
    labelPhone: string
    labelRole: string
    rolePlaceholder: string
    labelVertical: string
    verticalPlaceholder: string
    labelTimeline: string
    timelinePlaceholder: string
    labelMessage: string
    messagePlaceholder: string
    sending: string
    submit: string
    toastSuccessTitle: string
    toastSuccessDesc: string
    toastErrorTitle: string
    toastErrorDesc: string
    verticals: Option[]
    timeToStart: Option[]
  }
}

const verticalValues = [
  "nonprofits",
  "startups",
  "smb",
  "government",
  "healthcare",
  "fintech",
  "education",
  "other",
] as const

const timelineValues = ["immediately", "30-days", "90-days", "6-months", "exploring"] as const

function build(labels: {
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  sectionTitle: string
  sectionSubtitle: string
  labelName: string
  labelEmail: string
  labelCompany: string
  labelPhone: string
  labelRole: string
  rolePlaceholder: string
  labelVertical: string
  verticalPlaceholder: string
  labelTimeline: string
  timelinePlaceholder: string
  labelMessage: string
  messagePlaceholder: string
  sending: string
  submit: string
  toastSuccessTitle: string
  toastSuccessDesc: string
  toastErrorTitle: string
  toastErrorDesc: string
  verticals: string[]
  timeline: string[]
}): ContactSalesPayload {
  return {
    contactSales: {
      ...labels,
      verticals: verticalValues.map((v, i) => ({ value: v, label: labels.verticals[i] })),
      timeToStart: timelineValues.map((v, i) => ({ value: v, label: labels.timeline[i] })),
    },
  }
}

const EN = build({
  heroBadge: "Contact Sales",
  heroTitle: "Talk to Our Sales Team",
  heroSubtitle: "Get in touch to discuss how Opticini can support your compliance and operational needs.",
  sectionTitle: "Tell us about your project",
  sectionSubtitle: "Share your details and we will connect you with the right person.",
  labelName: "Full Name *",
  labelEmail: "Email *",
  labelCompany: "Company / Organization *",
  labelPhone: "Phone",
  labelRole: "Your Role",
  rolePlaceholder: "e.g. CISO, Compliance Manager, IT Director",
  labelVertical: "Industry / Vertical",
  verticalPlaceholder: "Select your industry",
  labelTimeline: "When do you plan to start?",
  timelinePlaceholder: "Select timeline",
  labelMessage: "Tell us about your needs *",
  messagePlaceholder: "Describe your compliance challenges, goals, or what you want to achieve...",
  sending: "Sending...",
  submit: "Contact Sales",
  toastSuccessTitle: "Message Sent",
  toastSuccessDesc: "Our sales team will reach out within 24 hours.",
  toastErrorTitle: "Error",
  toastErrorDesc: "Failed to send message. Please try again.",
  verticals: ["Nonprofits", "Startups", "SMB", "Government", "Healthcare", "Fintech", "Education", "Other"],
  timeline: ["Immediately", "Within 30 days", "Within 90 days", "Within 6 months", "Exploring options"],
})

const PT = build({
  heroBadge: "Fale com Vendas",
  heroTitle: "Converse com nosso time comercial",
  heroSubtitle: "Fale conosco para entender como o Opticini apoia suas necessidades operacionais e de compliance.",
  sectionTitle: "Conte sobre seu projeto",
  sectionSubtitle: "Compartilhe seus dados e conectaremos voce com a pessoa certa.",
  labelName: "Nome completo *",
  labelEmail: "Email *",
  labelCompany: "Empresa / Organizacao *",
  labelPhone: "Telefone",
  labelRole: "Seu cargo",
  rolePlaceholder: "ex: CISO, Gestor de Compliance, Diretor de TI",
  labelVertical: "Setor",
  verticalPlaceholder: "Selecione seu setor",
  labelTimeline: "Quando pretende comecar?",
  timelinePlaceholder: "Selecione o prazo",
  labelMessage: "Conte sua necessidade *",
  messagePlaceholder: "Descreva desafios de compliance, objetivos e resultados esperados...",
  sending: "Enviando...",
  submit: "Falar com Vendas",
  toastSuccessTitle: "Mensagem enviada",
  toastSuccessDesc: "Nosso time comercial respondera em ate 24 horas.",
  toastErrorTitle: "Erro",
  toastErrorDesc: "Falha ao enviar mensagem. Tente novamente.",
  verticals: ["Sem fins lucrativos", "Startups", "PME", "Governo", "Saude", "Fintech", "Educacao", "Outro"],
  timeline: ["Imediatamente", "Em ate 30 dias", "Em ate 90 dias", "Em ate 6 meses", "Avaliando opcoes"],
})

const ES = build({ ...EN.contactSales, heroBadge: "Contactar Ventas", heroTitle: "Habla con nuestro equipo de ventas", submit: "Contactar Ventas", sending: "Enviando...", labelName: "Nombre completo *", labelCompany: "Empresa / Organizacion *", labelPhone: "Telefono", labelRole: "Tu rol", labelVertical: "Industria / Vertical", labelTimeline: "Cuando planeas empezar?", labelMessage: "Cuentanos tu necesidad *", toastSuccessTitle: "Mensaje enviado", toastErrorTitle: "Error", verticals: ["ONG", "Startups", "PyME", "Gobierno", "Salud", "Fintech", "Educacion", "Otro"], timeline: ["Inmediatamente", "En 30 dias", "En 90 dias", "En 6 meses", "Explorando opciones"] })
const FR = build({ ...EN.contactSales, heroBadge: "Contacter les ventes", heroTitle: "Parlez a notre equipe commerciale", submit: "Contacter les ventes", sending: "Envoi...", labelName: "Nom complet *", labelCompany: "Entreprise / Organisation *", labelPhone: "Telephone", labelRole: "Votre role", labelVertical: "Secteur", labelTimeline: "Quand souhaitez-vous commencer ?", labelMessage: "Parlez-nous de vos besoins *", toastSuccessTitle: "Message envoye", verticals: ["ONG", "Startups", "PME", "Gouvernement", "Sante", "Fintech", "Education", "Autre"], timeline: ["Immediatement", "Sous 30 jours", "Sous 90 jours", "Sous 6 mois", "En exploration"] })
const DE = build({ ...EN.contactSales, heroBadge: "Vertrieb kontaktieren", heroTitle: "Sprechen Sie mit unserem Vertriebsteam", submit: "Vertrieb kontaktieren", sending: "Wird gesendet...", labelName: "Vollstandiger Name *", labelCompany: "Unternehmen / Organisation *", labelPhone: "Telefon", labelRole: "Ihre Rolle", labelVertical: "Branche", labelTimeline: "Wann wollen Sie starten?", labelMessage: "Beschreiben Sie Ihren Bedarf *", toastSuccessTitle: "Nachricht gesendet", verticals: ["Gemeinnutzig", "Startups", "KMU", "Regierung", "Gesundheit", "Fintech", "Bildung", "Sonstiges"], timeline: ["Sofort", "Innerhalb 30 Tagen", "Innerhalb 90 Tagen", "Innerhalb 6 Monaten", "Optionen prufen"] })
const IT = build({ ...EN.contactSales, heroBadge: "Contatta vendite", heroTitle: "Parla con il nostro team vendite", submit: "Contatta vendite", sending: "Invio...", labelName: "Nome completo *", labelCompany: "Azienda / Organizzazione *", labelPhone: "Telefono", labelRole: "Il tuo ruolo", labelVertical: "Settore", labelTimeline: "Quando vuoi iniziare?", labelMessage: "Raccontaci le tue esigenze *", toastSuccessTitle: "Messaggio inviato", verticals: ["No profit", "Startup", "PMI", "Governo", "Sanita", "Fintech", "Istruzione", "Altro"], timeline: ["Subito", "Entro 30 giorni", "Entro 90 giorni", "Entro 6 mesi", "Valutazione opzioni"] })
const RU = build({ ...EN.contactSales, heroBadge: "Связаться с продажами", heroTitle: "Поговорите с нашей командой продаж", submit: "Связаться с продажами", sending: "Отправка...", labelName: "Полное имя *", labelCompany: "Компания / Организация *", labelPhone: "Телефон", labelRole: "Ваша роль", labelVertical: "Отрасль", labelTimeline: "Когда планируете старт?", labelMessage: "Опишите вашу потребность *", toastSuccessTitle: "Сообщение отправлено", verticals: ["НКО", "Стартапы", "МСП", "Госструктуры", "Здравоохранение", "Финтех", "Образование", "Другое"], timeline: ["Сразу", "В течение 30 дней", "В течение 90 дней", "В течение 6 месяцев", "Изучаем варианты"] })
const SV = build({ ...EN.contactSales, heroBadge: "Kontakta salj", heroTitle: "Prata med vart saljteam", submit: "Kontakta salj", sending: "Skickar...", verticals: ["Ideella", "Startups", "SMB", "Myndighet", "Halsovard", "Fintech", "Utbildning", "Annat"], timeline: ["Omedelbart", "Inom 30 dagar", "Inom 90 dagar", "Inom 6 manader", "Utforskar alternativ"] })
const NO = build({ ...EN.contactSales, heroBadge: "Kontakt salg", heroTitle: "Snakk med salgsteamet vart", submit: "Kontakt salg", sending: "Sender...", verticals: ["Ideelle", "Startups", "SMB", "Offentlig", "Helse", "Fintech", "Utdanning", "Annet"], timeline: ["Umiddelbart", "Innen 30 dager", "Innen 90 dager", "Innen 6 maneder", "Vurderer alternativer"] })
const DA = build({ ...EN.contactSales, heroBadge: "Kontakt salg", heroTitle: "Tal med vores salgsteam", submit: "Kontakt salg", sending: "Sender...", verticals: ["Nonprofit", "Startups", "SMV", "Offentlig", "Sundhed", "Fintech", "Uddannelse", "Andet"], timeline: ["Med det samme", "Inden for 30 dage", "Inden for 90 dage", "Inden for 6 maneder", "Undersoger muligheder"] })
const ZH = build({ ...EN.contactSales, heroBadge: "联系销售", heroTitle: "与我们的销售团队沟通", submit: "联系销售", sending: "发送中...", verticals: ["非营利组织", "初创公司", "中小企业", "政府", "医疗", "金融科技", "教育", "其他"], timeline: ["立即", "30天内", "90天内", "6个月内", "正在评估"] })
const JA = build({ ...EN.contactSales, heroBadge: "営業に連絡", heroTitle: "営業チームに相談", submit: "営業に連絡", sending: "送信中...", verticals: ["非営利", "スタートアップ", "中小企業", "政府", "医療", "フィンテック", "教育", "その他"], timeline: ["すぐに", "30日以内", "90日以内", "6か月以内", "検討中"] })
const KO = build({ ...EN.contactSales, heroBadge: "영업 문의", heroTitle: "영업팀과 상담하세요", submit: "영업 문의", sending: "전송 중...", verticals: ["비영리", "스타트업", "중소기업", "정부", "헬스케어", "핀테크", "교육", "기타"], timeline: ["즉시", "30일 이내", "90일 이내", "6개월 이내", "검토 중"] })
const HI = build({ ...EN.contactSales, heroBadge: "सेल्स से संपर्क", heroTitle: "हमारी सेल्स टीम से बात करें", submit: "सेल्स से संपर्क", sending: "भेजा जा रहा है...", verticals: ["गैर-लाभकारी", "स्टार्टअप", "SMB", "सरकार", "स्वास्थ्य", "फिनटेक", "शिक्षा", "अन्य"], timeline: ["तुरंत", "30 दिनों में", "90 दिनों में", "6 महीनों में", "विकल्प देख रहे हैं"] })
const AR = build({ ...EN.contactSales, heroBadge: "تواصل مع المبيعات", heroTitle: "تحدث مع فريق المبيعات", submit: "تواصل مع المبيعات", sending: "جاري الارسال...", verticals: ["غير ربحي", "شركات ناشئة", "SMB", "حكومة", "رعاية صحية", "فينتك", "تعليم", "اخرى"], timeline: ["فورا", "خلال 30 يوما", "خلال 90 يوما", "خلال 6 اشهر", "استكشاف الخيارات"] })
const HE = build({ ...EN.contactSales, heroBadge: "צור קשר עם מכירות", heroTitle: "דבר עם צוות המכירות שלנו", submit: "צור קשר עם מכירות", sending: "שולח...", verticals: ["ללא מטרות רווח", "סטארטאפים", "SMB", "ממשל", "בריאות", "פינטק", "חינוך", "אחר"], timeline: ["מיידית", "בתוך 30 יום", "בתוך 90 יום", "בתוך 6 חודשים", "בוחנים אפשרויות"] })

export const CONTACT_SALES_PAGE_PATCH_BY_LANG: Record<string, ContactSalesPayload> = {
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
