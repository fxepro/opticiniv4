import { deepMergePublicPages } from "./deep-merge-public-pages"
import { PUBLIC_PAGES_EN } from "./public-pages-en"

type FooterLinkedPagesPayload = {
  footerLinkedPages: typeof PUBLIC_PAGES_EN.footerLinkedPages
}

const BASE = PUBLIC_PAGES_EN.footerLinkedPages as unknown as Record<string, unknown>

function m(patch: Record<string, unknown>): typeof PUBLIC_PAGES_EN.footerLinkedPages {
  return deepMergePublicPages(BASE, patch) as unknown as typeof PUBLIC_PAGES_EN.footerLinkedPages
}

const EN: FooterLinkedPagesPayload = { footerLinkedPages: PUBLIC_PAGES_EN.footerLinkedPages }

const ES: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "Alianzas",
    frameworksBadge: "Marcos de cumplimiento",
    inquiryTitle: "Contáctenos",
    inquirySubtitlePartnership:
      "¿Le interesa asociarse con Opticini? Cuéntenos sobre su organización y nos pondremos en contacto.",
    inquirySubtitleVertical:
      "¿Le interesa cómo Opticini puede apoyar a {{title}}? Cuéntenos sobre su organización y nos pondremos en contacto.",
    labelFullName: "Nombre completo *",
    labelEmail: "Correo electrónico *",
    labelOrganization: "Organización",
    labelPhone: "Teléfono",
    labelInterest: "Cuéntenos su interés *",
    labelNeeds: "Cuéntenos sus necesidades *",
    placeholderPartnershipInterest:
      "Describa su experiencia, servicios o cómo le gustaría asociarse con Opticini...",
    placeholderVerticalNeeds: "Describa sus retos de cumplimiento u operativos...",
    submitting: "Enviando...",
    submitInquiry: "Enviar solicitud",
    toastInquirySubmittedTitle: "Solicitud enviada",
    toastInquirySubmittedDesc: "Nos pondremos en contacto en un plazo de 24 horas.",
    toastErrorTitle: "Error",
    toastErrorDesc: "No se pudo enviar la solicitud. Inténtelo de nuevo.",
    ctaPartnershipSubtitle: "Contáctenos para saber más sobre asociarse con Opticini.",
    ctaVerticalTitle: "¿Listo para simplificar el cumplimiento?",
    ctaVerticalSubtitle: "Vea cómo Opticini ayuda a {{title}} a centrarse en su misión.",
    ctaFrameworkTitle: "¿Listo para simplificar el cumplimiento de {{title}}?",
    ctaFrameworkSubtitle:
      "Vea cómo Opticini ayuda a los equipos a gestionar controles, evidencias y preparación para auditorías.",
    requestDemo: "Solicitar demo",
  }),
}

const FR: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "Partenariats",
    frameworksBadge: "Cadres de conformité",
    inquiryTitle: "Contactez-nous",
    inquirySubtitlePartnership:
      "Vous souhaitez vous associer à Opticini ? Présentez votre organisation et nous vous recontacterons.",
    inquirySubtitleVertical:
      "Vous voulez savoir comment Opticini peut soutenir {{title}} ? Présentez votre organisation et nous vous recontacterons.",
    labelFullName: "Nom complet *",
    labelEmail: "E-mail *",
    labelOrganization: "Organisation",
    labelPhone: "Téléphone",
    labelInterest: "Parlez-nous de votre intérêt *",
    labelNeeds: "Parlez-nous de vos besoins *",
    placeholderPartnershipInterest:
      "Décrivez votre expérience, vos services ou votre projet de partenariat avec Opticini...",
    placeholderVerticalNeeds: "Décrivez vos enjeux de conformité ou opérationnels...",
    submitting: "Envoi en cours...",
    submitInquiry: "Envoyer la demande",
    toastInquirySubmittedTitle: "Demande envoyée",
    toastInquirySubmittedDesc: "Nous vous répondrons sous 24 heures.",
    toastErrorTitle: "Erreur",
    toastErrorDesc: "Échec de l'envoi. Veuillez réessayer.",
    ctaPartnershipSubtitle: "Contactez-nous pour en savoir plus sur le partenariat avec Opticini.",
    ctaVerticalTitle: "Prêt à simplifier la conformité ?",
    ctaVerticalSubtitle: "Découvrez comment Opticini aide {{title}} à se concentrer sur sa mission.",
    ctaFrameworkTitle: "Prêt à simplifier la conformité {{title}} ?",
    ctaFrameworkSubtitle:
      "Découvrez comment Opticini aide les équipes à gérer contrôles, preuves et préparation aux audits.",
    requestDemo: "Demander une démo",
  }),
}

const DE: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "Partnerschaften",
    frameworksBadge: "Compliance-Frameworks",
    inquiryTitle: "Kontakt aufnehmen",
    inquirySubtitlePartnership:
      "Interesse an einer Partnerschaft mit Opticini? Beschreiben Sie Ihre Organisation – wir melden uns.",
    inquirySubtitleVertical:
      "Wie kann Opticini {{title}} unterstützen? Beschreiben Sie Ihre Organisation – wir melden uns.",
    labelFullName: "Vollständiger Name *",
    labelEmail: "E-Mail *",
    labelOrganization: "Organisation",
    labelPhone: "Telefon",
    labelInterest: "Ihr Anliegen *",
    labelNeeds: "Ihre Anforderungen *",
    placeholderPartnershipInterest:
      "Beschreiben Sie Ihre Erfahrung, Dienstleistungen oder Ihr Partnerschaftsvorhaben...",
    placeholderVerticalNeeds: "Beschreiben Sie Ihre Compliance- oder Betriebsherausforderungen...",
    submitting: "Wird gesendet...",
    submitInquiry: "Anfrage senden",
    toastInquirySubmittedTitle: "Anfrage gesendet",
    toastInquirySubmittedDesc: "Wir melden uns innerhalb von 24 Stunden.",
    toastErrorTitle: "Fehler",
    toastErrorDesc: "Senden fehlgeschlagen. Bitte erneut versuchen.",
    ctaPartnershipSubtitle: "Erfahren Sie mehr über Partnerschaften mit Opticini.",
    ctaVerticalTitle: "Compliance vereinfachen?",
    ctaVerticalSubtitle: "So unterstützt Opticini {{title}} bei der Mission.",
    ctaFrameworkTitle: "{{title}}-Compliance vereinfachen?",
    ctaFrameworkSubtitle:
      "So helfen Teams mit Opticini bei Kontrollen, Nachweisen und Auditbereitschaft.",
    requestDemo: "Demo anfragen",
  }),
}

const IT: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "Partnership",
    frameworksBadge: "Framework di conformità",
    inquiryTitle: "Contattaci",
    inquirySubtitlePartnership:
      "Interessato a collaborare con Opticini? Parlaci della tua organizzazione e ti ricontatteremo.",
    inquirySubtitleVertical:
      "Vuoi sapere come Opticini può supportare {{title}}? Parlaci della tua organizzazione.",
    labelFullName: "Nome e cognome *",
    labelEmail: "Email *",
    labelOrganization: "Organizzazione",
    labelPhone: "Telefono",
    labelInterest: "Il tuo interesse *",
    labelNeeds: "Le tue esigenze *",
    placeholderPartnershipInterest:
      "Descrivi esperienza, servizi o come vorresti collaborare con Opticini...",
    placeholderVerticalNeeds: "Descrivi le sfide di conformità o operative...",
    submitting: "Invio in corso...",
    submitInquiry: "Invia richiesta",
    toastInquirySubmittedTitle: "Richiesta inviata",
    toastInquirySubmittedDesc: "Ti risponderemo entro 24 ore.",
    toastErrorTitle: "Errore",
    toastErrorDesc: "Invio non riuscito. Riprova.",
    ctaPartnershipSubtitle: "Contattaci per saperne di più sulle partnership con Opticini.",
    ctaVerticalTitle: "Pronto a semplificare la conformità?",
    ctaVerticalSubtitle: "Scopri come Opticini aiuta {{title}} a concentrarsi sulla missione.",
    ctaFrameworkTitle: "Pronto a semplificare la conformità {{title}}?",
    ctaFrameworkSubtitle:
      "Scopri come Opticini aiuta i team su controlli, evidenze e readiness per gli audit.",
    requestDemo: "Richiedi demo",
  }),
}

const PT: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "Parcerias",
    frameworksBadge: "Frameworks de conformidade",
    inquiryTitle: "Fale connosco",
    inquirySubtitlePartnership:
      "Interessado em ser parceiro da Opticini? Fale-nos da sua organização e entraremos em contacto.",
    inquirySubtitleVertical:
      "Quer saber como a Opticini pode apoiar {{title}}? Fale-nos da sua organização.",
    labelFullName: "Nome completo *",
    labelEmail: "E-mail *",
    labelOrganization: "Organização",
    labelPhone: "Telefone",
    labelInterest: "O seu interesse *",
    labelNeeds: "As suas necessidades *",
    placeholderPartnershipInterest:
      "Descreva a sua experiência, serviços ou como gostaria de ser parceiro...",
    placeholderVerticalNeeds: "Descreva os desafios de conformidade ou operacionais...",
    submitting: "A enviar...",
    submitInquiry: "Enviar pedido",
    toastInquirySubmittedTitle: "Pedido enviado",
    toastInquirySubmittedDesc: "Responderemos no prazo de 24 horas.",
    toastErrorTitle: "Erro",
    toastErrorDesc: "Falha ao enviar. Tente novamente.",
    ctaPartnershipSubtitle: "Contacte-nos para saber mais sobre parcerias com a Opticini.",
    ctaVerticalTitle: "Pronto para simplificar a conformidade?",
    ctaVerticalSubtitle: "Veja como a Opticini ajuda {{title}} a focar-se na missão.",
    ctaFrameworkTitle: "Pronto para simplificar a conformidade {{title}}?",
    ctaFrameworkSubtitle:
      "Veja como a Opticini ajuda as equipas a gerir controlos, evidências e preparação para auditorias.",
    requestDemo: "Pedir demonstração",
  }),
}

const RU: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "Партнерства",
    frameworksBadge: "Рамки комплаенса",
    inquiryTitle: "Связаться с нами",
    inquirySubtitlePartnership:
      "Хотите стать партнером Opticini? Расскажите об организации — мы свяжемся с вами.",
    inquirySubtitleVertical:
      "Интересует поддержка Opticini для {{title}}? Расскажите об организации — мы свяжемся.",
    labelFullName: "Полное имя *",
    labelEmail: "Электронная почта *",
    labelOrganization: "Организация",
    labelPhone: "Телефон",
    labelInterest: "Ваш интерес *",
    labelNeeds: "Ваши потребности *",
    placeholderPartnershipInterest: "Опишите опыт, услуги или формат партнерства...",
    placeholderVerticalNeeds: "Опишите задачи комплаенса или операционные вызовы...",
    submitting: "Отправка...",
    submitInquiry: "Отправить запрос",
    toastInquirySubmittedTitle: "Запрос отправлен",
    toastInquirySubmittedDesc: "Мы ответим в течение 24 часов.",
    toastErrorTitle: "Ошибка",
    toastErrorDesc: "Не удалось отправить. Попробуйте снова.",
    ctaPartnershipSubtitle: "Свяжитесь с нами, чтобы узнать о партнерстве с Opticini.",
    ctaVerticalTitle: "Упростить комплаенс?",
    ctaVerticalSubtitle: "Как Opticini помогает {{title}} сосредоточиться на миссии.",
    ctaFrameworkTitle: "Упростить комплаенс {{title}}?",
    ctaFrameworkSubtitle:
      "Как Opticini помогает командам с контролями, доказательствами и готовностью к аудиту.",
    requestDemo: "Запросить демо",
  }),
}

const SV: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "Partnerskap",
    frameworksBadge: "Efterlevnadsramverk",
    inquiryTitle: "Kontakta oss",
    inquirySubtitlePartnership:
      "Intresserad av att samarbeta med Opticini? Berätta om er organisation så hör vi av oss.",
    inquirySubtitleVertical:
      "Vill du veta hur Opticini kan stödja {{title}}? Berätta om er organisation.",
    labelFullName: "Fullständigt namn *",
    labelEmail: "E-post *",
    labelOrganization: "Organisation",
    labelPhone: "Telefon",
    labelInterest: "Ert intresse *",
    labelNeeds: "Era behov *",
    placeholderPartnershipInterest: "Beskriv erfarenhet, tjänster eller partnerskap...",
    placeholderVerticalNeeds: "Beskriv utmaningar inom regelefterlevnad eller drift...",
    submitting: "Skickar...",
    submitInquiry: "Skicka förfrågan",
    toastInquirySubmittedTitle: "Förfrågan skickad",
    toastInquirySubmittedDesc: "Vi återkommer inom 24 timmar.",
    toastErrorTitle: "Fel",
    toastErrorDesc: "Kunde inte skicka. Försök igen.",
    ctaPartnershipSubtitle: "Kontakta oss för mer om partnerskap med Opticini.",
    ctaVerticalTitle: "Redo att förenkla regelefterlevnad?",
    ctaVerticalSubtitle: "Se hur Opticini hjälper {{title}} att fokusera på uppdraget.",
    ctaFrameworkTitle: "Redo att förenkla {{title}}-efterlevnad?",
    ctaFrameworkSubtitle:
      "Se hur Opticini hjälper team med kontroller, bevis och revisionsberedskap.",
    requestDemo: "Begär demo",
  }),
}

const NO: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "Partnerskap",
    frameworksBadge: "Samsvarsrammeverk",
    inquiryTitle: "Ta kontakt",
    inquirySubtitlePartnership:
      "Lyst til å samarbeide med Opticini? Fortell om organisasjonen deres, så tar vi kontakt.",
    inquirySubtitleVertical:
      "Ønsker du å vite hvordan Opticini kan støtte {{title}}? Fortell om organisasjonen.",
    labelFullName: "Fullt navn *",
    labelEmail: "E-post *",
    labelOrganization: "Organisasjon",
    labelPhone: "Telefon",
    labelInterest: "Din henvendelse *",
    labelNeeds: "Dine behov *",
    placeholderPartnershipInterest: "Beskriv erfaring, tjenester eller partnerskap...",
    placeholderVerticalNeeds: "Beskriv samsvars- eller operasjonelle utfordringer...",
    submitting: "Sender...",
    submitInquiry: "Send forespørsel",
    toastInquirySubmittedTitle: "Forespørsel sendt",
    toastInquirySubmittedDesc: "Vi svarer innen 24 timer.",
    toastErrorTitle: "Feil",
    toastErrorDesc: "Kunne ikke sende. Prøv igjen.",
    ctaPartnershipSubtitle: "Kontakt oss for mer om partnerskap med Opticini.",
    ctaVerticalTitle: "Klar til å forenkle samsvar?",
    ctaVerticalSubtitle: "Se hvordan Opticini hjelper {{title}} med fokus på oppdraget.",
    ctaFrameworkTitle: "Klar til å forenkle {{title}}-samsvar?",
    ctaFrameworkSubtitle:
      "Se hvordan Opticini hjelper team med kontroller, bevis og revisjonsberedskap.",
    requestDemo: "Be om demo",
  }),
}

const DA: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "Partnerskaber",
    frameworksBadge: "Compliance-rammeværk",
    inquiryTitle: "Kontakt os",
    inquirySubtitlePartnership:
      "Interesseret i partnerskab med Opticini? Fortael om jeres organisation, sa kontakter vi jer.",
    inquirySubtitleVertical:
      "Vil I vide, hvordan Opticini kan understotte {{title}}? Fortael om jeres organisation.",
    labelFullName: "Fulde navn *",
    labelEmail: "E-mail *",
    labelOrganization: "Organisation",
    labelPhone: "Telefon",
    labelInterest: "Jeres interesse *",
    labelNeeds: "Jeres behov *",
    placeholderPartnershipInterest: "Beskriv erfaring, tjenester eller partnerskab...",
    placeholderVerticalNeeds: "Beskriv compliance- eller driftudfordringer...",
    submitting: "Sender...",
    submitInquiry: "Send forespørgsel",
    toastInquirySubmittedTitle: "Forespørgsel sendt",
    toastInquirySubmittedDesc: "Vi vender tilbage inden for 24 timer.",
    toastErrorTitle: "Fejl",
    toastErrorDesc: "Kunne ikke sende. Prov igen.",
    ctaPartnershipSubtitle: "Kontakt os for mere om partnerskab med Opticini.",
    ctaVerticalTitle: "Klar til at forenkle compliance?",
    ctaVerticalSubtitle: "Se hvordan Opticini hjaelper {{title}} med fokus pa missionen.",
    ctaFrameworkTitle: "Klar til at forenkle {{title}}-compliance?",
    ctaFrameworkSubtitle:
      "Se hvordan Opticini hjaelper teams med kontroller, evidens og revisionsklarhed.",
    requestDemo: "Anmod om demo",
  }),
}

const ZH: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "合作伙伴",
    frameworksBadge: "合规框架",
    inquiryTitle: "联系我们",
    inquirySubtitlePartnership: "有意与 Opticini 合作？请介绍您的组织，我们会与您联系。",
    inquirySubtitleVertical: "想了解 Opticini 如何支持 {{title}}？请介绍您的组织，我们会与您联系。",
    labelFullName: "姓名 *",
    labelEmail: "电子邮箱 *",
    labelOrganization: "组织",
    labelPhone: "电话",
    labelInterest: "合作意向 *",
    labelNeeds: "需求说明 *",
    placeholderPartnershipInterest: "请描述您的经验、服务或合作设想...",
    placeholderVerticalNeeds: "请描述合规或运营方面的挑战...",
    submitting: "提交中...",
    submitInquiry: "提交咨询",
    toastInquirySubmittedTitle: "已提交",
    toastInquirySubmittedDesc: "我们将在 24 小时内回复。",
    toastErrorTitle: "错误",
    toastErrorDesc: "提交失败，请重试。",
    ctaPartnershipSubtitle: "联系我们以了解更多合作信息。",
    ctaVerticalTitle: "准备简化合规工作？",
    ctaVerticalSubtitle: "了解 Opticini 如何帮助 {{title}} 专注使命。",
    ctaFrameworkTitle: "准备简化 {{title}} 合规？",
    ctaFrameworkSubtitle: "了解 Opticini 如何帮助团队管理控制、证据与审计准备。",
    requestDemo: "申请演示",
  }),
}

const JA: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "パートナーシップ",
    frameworksBadge: "コンプライアンスフレームワーク",
    inquiryTitle: "お問い合わせ",
    inquirySubtitlePartnership:
      "Opticini とパートナーシップをご希望ですか？組織についてお聞かせください。",
    inquirySubtitleVertical: "Opticini が {{title}} をどう支援できるか？組織についてお聞かせください。",
    labelFullName: "氏名 *",
    labelEmail: "メール *",
    labelOrganization: "組織名",
    labelPhone: "電話",
    labelInterest: "ご関心の内容 *",
    labelNeeds: "ご要望 *",
    placeholderPartnershipInterest: "経験、サービス、パートナーシップの希望をご記入ください...",
    placeholderVerticalNeeds: "コンプライアンスや運用上の課題をご記入ください...",
    submitting: "送信中...",
    submitInquiry: "送信",
    toastInquirySubmittedTitle: "送信しました",
    toastInquirySubmittedDesc: "24 時間以内にご連絡します。",
    toastErrorTitle: "エラー",
    toastErrorDesc: "送信に失敗しました。もう一度お試しください。",
    ctaPartnershipSubtitle: "パートナーシップについてお問い合わせください。",
    ctaVerticalTitle: "コンプライアンスを簡素化しますか？",
    ctaVerticalSubtitle: "Opticini が {{title}} のミッション支援にどう役立つか。",
    ctaFrameworkTitle: "{{title}} のコンプライアンスを簡素化？",
    ctaFrameworkSubtitle: "コントロール、証跡、監査準備を Opticini で。",
    requestDemo: "デモを依頼",
  }),
}

const KO: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "파트너십",
    frameworksBadge: "컴플라이언스 프레임워크",
    inquiryTitle: "문의하기",
    inquirySubtitlePartnership: "Opticini 와 파트너십을 원하시나요? 조직에 대해 알려 주세요.",
    inquirySubtitleVertical: "Opticini 가 {{title}} 을 어떻게 지원할지 알고 싶으신가요?",
    labelFullName: "이름 *",
    labelEmail: "이메일 *",
    labelOrganization: "조직",
    labelPhone: "전화",
    labelInterest: "관심 분야 *",
    labelNeeds: "요구 사항 *",
    placeholderPartnershipInterest: "경험, 서비스 또는 파트너십 방식을 설명해 주세요...",
    placeholderVerticalNeeds: "컴플라이언스 또는 운영 과제를 설명해 주세요...",
    submitting: "제출 중...",
    submitInquiry: "문의 제출",
    toastInquirySubmittedTitle: "제출 완료",
    toastInquirySubmittedDesc: "24시간 이내에 연락드리겠습니다.",
    toastErrorTitle: "오류",
    toastErrorDesc: "제출에 실패했습니다. 다시 시도해 주세요.",
    ctaPartnershipSubtitle: "파트너십에 대해 더 알아보려면 문의하세요.",
    ctaVerticalTitle: "컴플라이언스를 단순화할 준비가 되셨나요?",
    ctaVerticalSubtitle: "Opticini 가 {{title}} 의 미션에 어떻게 도움이 되는지 확인하세요.",
    ctaFrameworkTitle: "{{title}} 컴플라이언스를 단순화할 준비가 되셨나요?",
    ctaFrameworkSubtitle: "통제, 증거, 감사 준비를 Opticini 로 관리하세요.",
    requestDemo: "데모 요청",
  }),
}

const HI: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "साझेदारियाँ",
    frameworksBadge: "अनुपालन फ्रेमवर्क",
    inquiryTitle: "संपर्क करें",
    inquirySubtitlePartnership: "Opticini के साथ साझेदारी में रुचि? अपने संगठन के बारे में बताएँ।",
    inquirySubtitleVertical: "जानना चाहते हैं Opticini {{title}} की कैसे मदद कर सकता है?",
    labelFullName: "पूरा नाम *",
    labelEmail: "ईमेल *",
    labelOrganization: "संगठन",
    labelPhone: "फ़ोन",
    labelInterest: "आपकी रुचि *",
    labelNeeds: "आपकी ज़रूरतें *",
    placeholderPartnershipInterest: "अनुभव, सेवाएँ या साझेदारी के तरीके बताएँ...",
    placeholderVerticalNeeds: "अनुपालन या परिचालन चुनौतियाँ बताएँ...",
    submitting: "सबमिट हो रहा है...",
    submitInquiry: "अनुरोध भेजें",
    toastInquirySubmittedTitle: "अनुरोध भेजा गया",
    toastInquirySubmittedDesc: "हम 24 घंटे में जवाब देंगे।",
    toastErrorTitle: "त्रुटि",
    toastErrorDesc: "भेजने में विफल। पुनः प्रयास करें।",
    ctaPartnershipSubtitle: "Opticini के साथ साझेदारी के बारे में जानें।",
    ctaVerticalTitle: "अनुपालन सरल बनाने के लिए तैयार?",
    ctaVerticalSubtitle: "देखें Opticini {{title}} को मिशन पर कैसे केंद्रित रखता है।",
    ctaFrameworkTitle: "{{title}} अनुपालन सरल बनाने के लिए तैयार?",
    ctaFrameworkSubtitle: "नियंत्रण, साक्ष्य और ऑडिट तैयारी के लिए Opticini।",
    requestDemo: "डेमो अनुरोध",
  }),
}

const AR: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "الشراكات",
    frameworksBadge: "أطر الامتثال",
    inquiryTitle: "تواصل معنا",
    inquirySubtitlePartnership: "مهتم بالشراكة مع Opticini؟ اخبرنا عن مؤسستك وسنتواصل.",
    inquirySubtitleVertical: "تريد معرفة كيف تدعم Opticini {{title}}؟ اخبرنا عن مؤسستك.",
    labelFullName: "الاسم الكامل *",
    labelEmail: "البريد الإلكتروني *",
    labelOrganization: "المؤسسة",
    labelPhone: "الهاتف",
    labelInterest: "اهتمامك *",
    labelNeeds: "احتياجاتك *",
    placeholderPartnershipInterest: "صف الخبرة أو الخدمات أو شكل الشراكة...",
    placeholderVerticalNeeds: "صف تحديات الامتثال أو التشغيل...",
    submitting: "جارٍ الإرسال...",
    submitInquiry: "إرسال الاستفسار",
    toastInquirySubmittedTitle: "تم الإرسال",
    toastInquirySubmittedDesc: "سنرد خلال 24 ساعة.",
    toastErrorTitle: "خطأ",
    toastErrorDesc: "فشل الإرسال. حاول مرة أخرى.",
    ctaPartnershipSubtitle: "تواصل لمعرفة المزيد عن الشراكة مع Opticini.",
    ctaVerticalTitle: "مستعد لتبسيط الامتثال؟",
    ctaVerticalSubtitle: "كيف تساعد Opticini {{title}} على التركيز على المهمة.",
    ctaFrameworkTitle: "مستعد لتبسيط امتثال {{title}}؟",
    ctaFrameworkSubtitle: "إدارة الضوابط والأدلة والجاهزية للتدقيق مع Opticini.",
    requestDemo: "طلب عرض تجريبي",
  }),
}

const HE: FooterLinkedPagesPayload = {
  footerLinkedPages: m({
    partnershipsBadge: "שותפויות",
    frameworksBadge: "מסגרות תאימות",
    inquiryTitle: "צרו קשר",
    inquirySubtitlePartnership: "מתעניינים בשותפות עם Opticini? ספרו על הארגון ונחזור אליכם.",
    inquirySubtitleVertical: "רוצים לדעת איך Opticini יכול לתמוך ב-{{title}}? ספרו על הארגון.",
    labelFullName: "שם מלא *",
    labelEmail: "אימייל *",
    labelOrganization: "ארגון",
    labelPhone: "טלפון",
    labelInterest: "תחומי העניין *",
    labelNeeds: "הצרכים *",
    placeholderPartnershipInterest: "תארו ניסיון, שירותים או שותפות...",
    placeholderVerticalNeeds: "תארו אתגרי תאימות או תפעול...",
    submitting: "שולח...",
    submitInquiry: "שליחת פנייה",
    toastInquirySubmittedTitle: "הפנייה נשלחה",
    toastInquirySubmittedDesc: "נחזור אליכם תוך 24 שעות.",
    toastErrorTitle: "שגיאה",
    toastErrorDesc: "השליחה נכשלה. נסו שוב.",
    ctaPartnershipSubtitle: "צרו קשר לפרטים על שותפות עם Opticini.",
    ctaVerticalTitle: "מוכנים לפשט תאימות?",
    ctaVerticalSubtitle: "איך Opticini עוזר ל-{{title}} להתמקד במשימה.",
    ctaFrameworkTitle: "מוכנים לפשט תאימות {{title}}?",
    ctaFrameworkSubtitle: "ניהול בקרות, ראיות והכנה לביקורת עם Opticini.",
    requestDemo: "בקשת דמו",
  }),
}

export const FOOTER_LINKED_PAGES_PATCH_BY_LANG: Record<string, FooterLinkedPagesPayload> = {
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
