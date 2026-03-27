type PrivacyPolicy = {
  title: string
  subtitle: string
  lastUpdatedPrefix: string
  infoCollect: {
    title: string
    subtitle: string
    urlsTitle: string
    urlsBody: string
    performanceTitle: string
    performanceBody: string
    analyticsTitle: string
    analyticsBody: string
  }
  usage: { title: string; subtitle: string }
  usageItems: string[]
  protection: {
    title: string
    subtitle: string
    securityTitle: string
    securityBody: string
    retentionTitle: string
    retentionBody: string
    accessTitle: string
    accessBody: string
  }
  sharing: { title: string; subtitle: string; intro: string }
  sharingItems: string[]
  rights: { title: string; subtitle: string; intro: string; contactLine: string }
  rightsItems: string[]
  contact: { title: string; subtitle: string; body: string; email: string; website: string }
}

type PrivacyPayload = { privacyPolicy: PrivacyPolicy }

const EN: PrivacyPayload = {
  privacyPolicy: {
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your information when using Opticini",
    lastUpdatedPrefix: "Last updated:",
    infoCollect: {
      title: "Information We Collect",
      subtitle: "What data we gather and how we use it",
      urlsTitle: "Website URLs",
      urlsBody: "When you test a website's performance, we collect the URL you submit for analysis. This information is used solely to provide performance testing services and generate reports.",
      performanceTitle: "Performance Data",
      performanceBody: "We collect performance metrics, Core Web Vitals, and analysis results for the websites you test. This data helps us provide accurate performance insights and recommendations.",
      analyticsTitle: "Usage Analytics",
      analyticsBody: "We may collect anonymous usage statistics to improve our service, including features used, testing frequency, and general usage patterns.",
    },
    usage: {
      title: "How We Use Your Information",
      subtitle: "Our legitimate purposes for data processing",
    },
    usageItems: [
      "Provide website performance testing and analysis services",
      "Generate detailed performance reports and recommendations",
      "Improve our testing algorithms and service quality",
      "Respond to customer support requests and inquiries",
      "Ensure service security and prevent abuse",
      "Comply with legal obligations and regulations",
    ],
    protection: {
      title: "Data Protection & Security",
      subtitle: "How we keep your information safe",
      securityTitle: "Security Measures",
      securityBody: "We implement industry-standard security measures including encryption, secure data transmission, and access controls to protect your information.",
      retentionTitle: "Data Retention",
      retentionBody: "Performance test results are retained for 30 days to allow you to review and compare results. After this period, data is automatically deleted.",
      accessTitle: "Access Controls",
      accessBody: "Only authorized personnel have access to our systems, and all access is logged and monitored for security purposes.",
    },
    sharing: {
      title: "Data Sharing & Third Parties",
      subtitle: "When and how we share information",
      intro: "We do not sell, rent, or trade your personal information to third parties. We may share data only in the following circumstances:",
    },
    sharingItems: [
      "With your explicit consent",
      "To comply with legal requirements or court orders",
      "To protect our rights, property, or safety",
      "With service providers who assist in our operations (under strict confidentiality agreements)",
    ],
    rights: {
      title: "Your Rights & Choices",
      subtitle: "Control over your personal information",
      intro: "You have the right to:",
      contactLine: "To exercise these rights, please contact us at privacy@opticini.com",
    },
    rightsItems: [
      "Access your personal information",
      "Request correction of inaccurate data",
      "Request deletion of your data",
      "Object to processing of your data",
      "Request data portability",
      "Withdraw consent at any time",
    ],
    contact: {
      title: "Contact Us",
      subtitle: "Questions about this privacy policy?",
      body: "If you have any questions about this Privacy Policy or our data practices, please contact us:",
      email: "Email: privacy@opticini.com",
      website: "Website: opticini.com",
    },
  },
}

const ES: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "Politica de Privacidad", subtitle: "Como recopilamos, usamos y protegemos tu informacion al usar Opticini", lastUpdatedPrefix: "Ultima actualizacion:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "Informacion que recopilamos", subtitle: "Que datos recopilamos y como los usamos", urlsTitle: "URLs de sitios web", performanceTitle: "Datos de rendimiento", analyticsTitle: "Analitica de uso" }, usage: { title: "Como usamos tu informacion", subtitle: "Nuestros fines legitimos de tratamiento" }, protection: { ...EN.privacyPolicy.protection, title: "Proteccion y seguridad de datos", subtitle: "Como mantenemos segura tu informacion", securityTitle: "Medidas de seguridad", retentionTitle: "Retencion de datos", accessTitle: "Controles de acceso" }, sharing: { ...EN.privacyPolicy.sharing, title: "Comparticion de datos y terceros", subtitle: "Cuando y como compartimos informacion" }, rights: { ...EN.privacyPolicy.rights, title: "Tus derechos y opciones", subtitle: "Control sobre tu informacion personal", intro: "Tienes derecho a:", contactLine: "Para ejercer estos derechos, contactanos en privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "Contactanos", subtitle: "Preguntas sobre esta politica de privacidad?" } } }
const FR: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "Politique de confidentialite", subtitle: "Comment nous collectons, utilisons et protegeons vos informations avec Opticini", lastUpdatedPrefix: "Derniere mise a jour :", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "Informations collectees", subtitle: "Quelles donnees nous collectons et comment nous les utilisons", urlsTitle: "URL de sites web", performanceTitle: "Donnees de performance", analyticsTitle: "Analytique d'utilisation" }, usage: { title: "Comment nous utilisons vos informations", subtitle: "Nos finalites legitimes de traitement" }, protection: { ...EN.privacyPolicy.protection, title: "Protection et securite des donnees", subtitle: "Comment nous protegens vos informations", securityTitle: "Mesures de securite", retentionTitle: "Conservation des donnees", accessTitle: "Controles d'acces" }, sharing: { ...EN.privacyPolicy.sharing, title: "Partage des donnees et tiers", subtitle: "Quand et comment nous partageons" }, rights: { ...EN.privacyPolicy.rights, title: "Vos droits et choix", subtitle: "Controle de vos informations personnelles", intro: "Vous avez le droit de :", contactLine: "Pour exercer ces droits, contactez-nous a privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "Contact", subtitle: "Questions sur cette politique de confidentialite ?" } } }
const DE: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "Datenschutzerklarung", subtitle: "Wie wir Ihre Informationen bei der Nutzung von Opticini erfassen, verwenden und schutzen", lastUpdatedPrefix: "Zuletzt aktualisiert:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "Welche Informationen wir erfassen", subtitle: "Welche Daten wir erfassen und wie wir sie verwenden", urlsTitle: "Website-URLs", performanceTitle: "Leistungsdaten", analyticsTitle: "Nutzungsanalyse" }, usage: { title: "Wie wir Ihre Informationen verwenden", subtitle: "Unsere legitimen Zwecke der Datenverarbeitung" }, protection: { ...EN.privacyPolicy.protection, title: "Datenschutz und Sicherheit", subtitle: "Wie wir Ihre Informationen schutzen", securityTitle: "Sicherheitsmassnahmen", retentionTitle: "Datenspeicherung", accessTitle: "Zugriffskontrollen" }, sharing: { ...EN.privacyPolicy.sharing, title: "Datenweitergabe und Dritte", subtitle: "Wann und wie wir Informationen teilen" }, rights: { ...EN.privacyPolicy.rights, title: "Ihre Rechte und Wahlmoglichkeiten", subtitle: "Kontrolle uber Ihre personenbezogenen Daten", intro: "Sie haben das Recht auf:", contactLine: "Zur Ausubung Ihrer Rechte kontaktieren Sie uns unter privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "Kontakt", subtitle: "Fragen zu dieser Datenschutzerklarung?" } } }
const IT: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "Informativa sulla privacy", subtitle: "Come raccogliamo, usiamo e proteggiamo le tue informazioni con Opticini", lastUpdatedPrefix: "Ultimo aggiornamento:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "Informazioni che raccogliamo", subtitle: "Quali dati raccogliamo e come li usiamo", urlsTitle: "URL dei siti web", performanceTitle: "Dati sulle prestazioni", analyticsTitle: "Analisi di utilizzo" }, usage: { title: "Come usiamo le tue informazioni", subtitle: "Le nostre finalita legittime di trattamento" }, protection: { ...EN.privacyPolicy.protection, title: "Protezione e sicurezza dei dati", subtitle: "Come manteniamo sicure le tue informazioni", securityTitle: "Misure di sicurezza", retentionTitle: "Conservazione dei dati", accessTitle: "Controlli di accesso" }, sharing: { ...EN.privacyPolicy.sharing, title: "Condivisione dati e terze parti", subtitle: "Quando e come condividiamo i dati" }, rights: { ...EN.privacyPolicy.rights, title: "I tuoi diritti e scelte", subtitle: "Controllo sulle tue informazioni personali", intro: "Hai il diritto di:", contactLine: "Per esercitare questi diritti, contattaci a privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "Contattaci", subtitle: "Domande su questa informativa privacy?" } } }
const PT: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "Politica de Privacidade", subtitle: "Como coletamos, usamos e protegemos suas informacoes ao usar o Opticini", lastUpdatedPrefix: "Ultima atualizacao:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "Informacoes que coletamos", subtitle: "Quais dados coletamos e como usamos", urlsTitle: "URLs de websites", performanceTitle: "Dados de performance", analyticsTitle: "Analitica de uso" }, usage: { title: "Como usamos suas informacoes", subtitle: "Nossas finalidades legitimas de tratamento" }, protection: { ...EN.privacyPolicy.protection, title: "Protecao e seguranca de dados", subtitle: "Como mantemos suas informacoes seguras", securityTitle: "Medidas de seguranca", retentionTitle: "Retencao de dados", accessTitle: "Controles de acesso" }, sharing: { ...EN.privacyPolicy.sharing, title: "Compartilhamento de dados e terceiros", subtitle: "Quando e como compartilhamos informacoes" }, rights: { ...EN.privacyPolicy.rights, title: "Seus direitos e escolhas", subtitle: "Controle sobre suas informacoes pessoais", intro: "Voce tem o direito de:", contactLine: "Para exercer esses direitos, fale conosco em privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "Fale conosco", subtitle: "Duvidas sobre esta politica de privacidade?" } } }
const RU: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "Политика конфиденциальности", subtitle: "Как мы собираем, используем и защищаем ваши данные в Opticini", lastUpdatedPrefix: "Последнее обновление:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "Какие данные мы собираем", subtitle: "Какие данные мы получаем и как используем", urlsTitle: "URL сайтов", performanceTitle: "Данные производительности", analyticsTitle: "Аналитика использования" }, usage: { title: "Как мы используем ваши данные", subtitle: "Наши законные цели обработки данных" }, protection: { ...EN.privacyPolicy.protection, title: "Защита и безопасность данных", subtitle: "Как мы защищаем ваши данные", securityTitle: "Меры безопасности", retentionTitle: "Хранение данных", accessTitle: "Контроль доступа" }, sharing: { ...EN.privacyPolicy.sharing, title: "Передача данных и третьи стороны", subtitle: "Когда и как мы делимся информацией" }, rights: { ...EN.privacyPolicy.rights, title: "Ваши права и выбор", subtitle: "Контроль над персональными данными", intro: "Вы имеете право:", contactLine: "Чтобы воспользоваться правами, свяжитесь с нами: privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "Свяжитесь с нами", subtitle: "Вопросы по этой политике?" } } }
const SV: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "Integritetspolicy", subtitle: "Hur vi samlar in, anvander och skyddar din information i Opticini", lastUpdatedPrefix: "Senast uppdaterad:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "Information vi samlar in", subtitle: "Vilka data vi samlar in och hur de anvands", urlsTitle: "Webbplats-URL:er", performanceTitle: "Prestandadata", analyticsTitle: "Anvandningsanalys" }, usage: { title: "Hur vi anvander din information", subtitle: "Vara legitima andamal for behandling" }, protection: { ...EN.privacyPolicy.protection, title: "Dataskydd och sakerhet", subtitle: "Hur vi skyddar din information", securityTitle: "Sakerhetsatgarder", retentionTitle: "Datalagring", accessTitle: "Atkomstkontroller" }, sharing: { ...EN.privacyPolicy.sharing, title: "Datadelning och tredje part", subtitle: "Nar och hur vi delar information" }, rights: { ...EN.privacyPolicy.rights, title: "Dina rattigheter och val", subtitle: "Kontroll over dina personuppgifter", intro: "Du har ratt att:", contactLine: "For att utova dessa rattigheter, kontakta oss pa privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "Kontakta oss", subtitle: "Fragor om denna integritetspolicy?" } } }
const NO: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "Personvernerklaring", subtitle: "Hvordan vi samler inn, bruker og beskytter informasjonen din i Opticini", lastUpdatedPrefix: "Sist oppdatert:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "Informasjon vi samler inn", subtitle: "Hvilke data vi samler inn og hvordan de brukes", urlsTitle: "Nettsteds-URL-er", performanceTitle: "Ytelsesdata", analyticsTitle: "Bruksanalyse" }, usage: { title: "Hvordan vi bruker informasjonen din", subtitle: "Vare legitime formal med behandlingen" }, protection: { ...EN.privacyPolicy.protection, title: "Databeskyttelse og sikkerhet", subtitle: "Hvordan vi holder informasjonen din trygg", securityTitle: "Sikkerhetstiltak", retentionTitle: "Datalagring", accessTitle: "Tilgangskontroller" }, sharing: { ...EN.privacyPolicy.sharing, title: "Datadeling og tredjeparter", subtitle: "Nar og hvordan vi deler informasjon" }, rights: { ...EN.privacyPolicy.rights, title: "Dine rettigheter og valg", subtitle: "Kontroll over personopplysningene dine", intro: "Du har rett til a:", contactLine: "For a utove disse rettighetene, kontakt oss pa privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "Kontakt oss", subtitle: "Sporsmal om denne personvernerklaringen?" } } }
const DA: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "Privatlivspolitik", subtitle: "Hvordan vi indsamler, bruger og beskytter dine oplysninger i Opticini", lastUpdatedPrefix: "Sidst opdateret:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "Oplysninger vi indsamler", subtitle: "Hvilke data vi indsamler og hvordan de bruges", urlsTitle: "Websteds-URL'er", performanceTitle: "Ydelsesdata", analyticsTitle: "Brugsanalyse" }, usage: { title: "Hvordan vi bruger dine oplysninger", subtitle: "Vores legitime formal med behandlingen" }, protection: { ...EN.privacyPolicy.protection, title: "Databeskyttelse og sikkerhed", subtitle: "Hvordan vi holder dine oplysninger sikre", securityTitle: "Sikkerhedsforanstaltninger", retentionTitle: "Dataopbevaring", accessTitle: "Adgangskontrol" }, sharing: { ...EN.privacyPolicy.sharing, title: "Datadeling og tredjeparter", subtitle: "Hvornar og hvordan vi deler oplysninger" }, rights: { ...EN.privacyPolicy.rights, title: "Dine rettigheder og valg", subtitle: "Kontrol over dine personoplysninger", intro: "Du har ret til at:", contactLine: "For at udove disse rettigheder, kontakt os pa privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "Kontakt os", subtitle: "Sporgsmal om denne privatlivspolitik?" } } }
const ZH: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "隐私政策", subtitle: "我们如何在使用 Opticini 时收集、使用并保护你的信息", lastUpdatedPrefix: "最后更新：", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "我们收集的信息", subtitle: "我们收集哪些数据以及如何使用", urlsTitle: "网站 URL", performanceTitle: "性能数据", analyticsTitle: "使用分析" }, usage: { title: "我们如何使用你的信息", subtitle: "我们处理数据的合法目的" }, protection: { ...EN.privacyPolicy.protection, title: "数据保护与安全", subtitle: "我们如何保障你的信息安全", securityTitle: "安全措施", retentionTitle: "数据保留", accessTitle: "访问控制" }, sharing: { ...EN.privacyPolicy.sharing, title: "数据共享与第三方", subtitle: "我们何时以及如何共享信息" }, rights: { ...EN.privacyPolicy.rights, title: "你的权利与选择", subtitle: "你对个人信息的控制", intro: "你有权：", contactLine: "如需行使这些权利，请联系 privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "联系我们", subtitle: "对本隐私政策有疑问？" } } }
const JA: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "プライバシーポリシー", subtitle: "Opticini の利用時に情報をどのように収集・利用・保護するか", lastUpdatedPrefix: "最終更新:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "収集する情報", subtitle: "収集するデータと利用方法", urlsTitle: "Web サイト URL", performanceTitle: "パフォーマンスデータ", analyticsTitle: "利用分析" }, usage: { title: "情報の利用方法", subtitle: "データ処理の正当な目的" }, protection: { ...EN.privacyPolicy.protection, title: "データ保護とセキュリティ", subtitle: "情報を安全に保つ方法", securityTitle: "セキュリティ対策", retentionTitle: "データ保持", accessTitle: "アクセス制御" }, sharing: { ...EN.privacyPolicy.sharing, title: "データ共有と第三者", subtitle: "情報を共有する場合と方法" }, rights: { ...EN.privacyPolicy.rights, title: "あなたの権利と選択", subtitle: "個人情報に対するコントロール", intro: "あなたには次の権利があります:", contactLine: "権利行使は privacy@opticini.com までご連絡ください" }, contact: { ...EN.privacyPolicy.contact, title: "お問い合わせ", subtitle: "このプライバシーポリシーについての質問" } } }
const KO: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "개인정보 처리방침", subtitle: "Opticini 사용 시 정보를 수집, 사용, 보호하는 방법", lastUpdatedPrefix: "최종 업데이트:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "수집하는 정보", subtitle: "수집하는 데이터와 사용 방법", urlsTitle: "웹사이트 URL", performanceTitle: "성능 데이터", analyticsTitle: "사용 분석" }, usage: { title: "정보 사용 방법", subtitle: "데이터 처리의 정당한 목적" }, protection: { ...EN.privacyPolicy.protection, title: "데이터 보호 및 보안", subtitle: "정보를 안전하게 보호하는 방법", securityTitle: "보안 조치", retentionTitle: "데이터 보존", accessTitle: "접근 통제" }, sharing: { ...EN.privacyPolicy.sharing, title: "데이터 공유 및 제3자", subtitle: "정보를 공유하는 경우와 방법" }, rights: { ...EN.privacyPolicy.rights, title: "귀하의 권리와 선택", subtitle: "개인정보에 대한 통제", intro: "귀하는 다음 권리가 있습니다:", contactLine: "권리 행사는 privacy@opticini.com 으로 문의하세요" }, contact: { ...EN.privacyPolicy.contact, title: "문의하기", subtitle: "이 개인정보 처리방침에 대한 질문" } } }
const HI: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "गोपनीयता नीति", subtitle: "Opticini का उपयोग करते समय हम आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित रखते हैं", lastUpdatedPrefix: "अंतिम अपडेट:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "हम कौन सी जानकारी एकत्र करते हैं", subtitle: "हम कौन सा डेटा लेते हैं और उसका उपयोग कैसे करते हैं", urlsTitle: "वेबसाइट URL", performanceTitle: "प्रदर्शन डेटा", analyticsTitle: "उपयोग विश्लेषण" }, usage: { title: "हम आपकी जानकारी का उपयोग कैसे करते हैं", subtitle: "डेटा प्रोसेसिंग के हमारे वैध उद्देश्य" }, protection: { ...EN.privacyPolicy.protection, title: "डेटा सुरक्षा और संरक्षण", subtitle: "हम आपकी जानकारी को कैसे सुरक्षित रखते हैं", securityTitle: "सुरक्षा उपाय", retentionTitle: "डेटा संरक्षण अवधि", accessTitle: "एक्सेस नियंत्रण" }, sharing: { ...EN.privacyPolicy.sharing, title: "डेटा साझा करना और तृतीय पक्ष", subtitle: "हम कब और कैसे जानकारी साझा करते हैं" }, rights: { ...EN.privacyPolicy.rights, title: "आपके अधिकार और विकल्प", subtitle: "आपकी व्यक्तिगत जानकारी पर नियंत्रण", intro: "आपको अधिकार है:", contactLine: "इन अधिकारों का उपयोग करने के लिए privacy@opticini.com पर संपर्क करें" }, contact: { ...EN.privacyPolicy.contact, title: "संपर्क करें", subtitle: "इस गोपनीयता नीति पर प्रश्न?" } } }
const AR: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "سياسة الخصوصية", subtitle: "كيف نجمع معلوماتك ونستخدمها ونحميها عند استخدام Opticini", lastUpdatedPrefix: "اخر تحديث:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "المعلومات التي نجمعها", subtitle: "ما البيانات التي نجمعها وكيف نستخدمها", urlsTitle: "عناوين المواقع", performanceTitle: "بيانات الاداء", analyticsTitle: "تحليلات الاستخدام" }, usage: { title: "كيف نستخدم معلوماتك", subtitle: "اغراضنا المشروعة لمعالجة البيانات" }, protection: { ...EN.privacyPolicy.protection, title: "حماية البيانات والامن", subtitle: "كيف نحافظ على امان معلوماتك", securityTitle: "اجراءات الامن", retentionTitle: "الاحتفاظ بالبيانات", accessTitle: "ضوابط الوصول" }, sharing: { ...EN.privacyPolicy.sharing, title: "مشاركة البيانات والاطراف الثالثة", subtitle: "متى وكيف نشارك المعلومات" }, rights: { ...EN.privacyPolicy.rights, title: "حقوقك وخياراتك", subtitle: "التحكم في معلوماتك الشخصية", intro: "لديك الحق في:", contactLine: "لممارسة هذه الحقوق تواصل معنا عبر privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "اتصل بنا", subtitle: "اسئلة حول سياسة الخصوصية هذه؟" } } }
const HE: PrivacyPayload = { privacyPolicy: { ...EN.privacyPolicy, title: "מדיניות פרטיות", subtitle: "כיצד אנו אוספים, משתמשים ומגנים על המידע שלך בעת שימוש ב-Opticini", lastUpdatedPrefix: "עודכן לאחרונה:", infoCollect: { ...EN.privacyPolicy.infoCollect, title: "מידע שאנו אוספים", subtitle: "אילו נתונים אנו אוספים וכיצד אנו משתמשים בהם", urlsTitle: "כתובות אתרים", performanceTitle: "נתוני ביצועים", analyticsTitle: "אנליטיקת שימוש" }, usage: { title: "כיצד אנו משתמשים במידע שלך", subtitle: "המטרות הלגיטימיות שלנו לעיבוד נתונים" }, protection: { ...EN.privacyPolicy.protection, title: "הגנת מידע ואבטחה", subtitle: "כיצד אנו שומרים על המידע שלך", securityTitle: "אמצעי אבטחה", retentionTitle: "שמירת נתונים", accessTitle: "בקרות גישה" }, sharing: { ...EN.privacyPolicy.sharing, title: "שיתוף נתונים וצדדים שלישיים", subtitle: "מתי וכיצד אנו משתפים מידע" }, rights: { ...EN.privacyPolicy.rights, title: "הזכויות והבחירות שלך", subtitle: "שליטה על המידע האישי שלך", intro: "יש לך זכות ל:", contactLine: "למימוש זכויות אלה, פנה אלינו ב-privacy@opticini.com" }, contact: { ...EN.privacyPolicy.contact, title: "צור קשר", subtitle: "שאלות לגבי מדיניות פרטיות זו?" } } }

export const PRIVACY_PAGE_PATCH_BY_LANG: Record<string, PrivacyPayload> = {
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
