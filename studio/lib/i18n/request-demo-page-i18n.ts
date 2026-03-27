type Option = { value: string; label: string }

type RequestDemoPayload = {
  requestDemo: {
    heroBadge: string
    heroTitle: string
    heroSubtitle: string
    cards: {
      sampleDataTitle: string
      sampleDataBody: string
      fullAccessTitle: string
      fullAccessBody: string
      expertSupportTitle: string
      expertSupportBody: string
    }
    formTitle: string
    formSignedIn: string
    formAnonymous: string
    labels: {
      fullName: string
      email: string
      company: string
      role: string
      useCase: string
      message: string
    }
    placeholders: {
      name: string
      email: string
      company: string
      role: string
      useCase: string
      message: string
    }
    roleOptions: Option[]
    useCaseOptions: Option[]
    submitting: string
    submit: string
    errorFallback: string
    submittedTitle: string
    submittedSubtitle: string
    whatsNextTitle: string
    whatsNext: string[]
    returnHome: string
    goWorkspace: string
  }
}

const roleValues = ["CTO", "Engineering Manager", "Developer", "DevOps", "Product Manager", "Marketing", "Other"] as const
const useCaseValues = ["Website Monitoring", "Performance Analysis", "Security Auditing", "SEO Monitoring", "API Monitoring", "Multi-site Management", "Team Collaboration", "Other"] as const

function build(labels: {
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  sampleDataTitle: string
  sampleDataBody: string
  fullAccessTitle: string
  fullAccessBody: string
  expertSupportTitle: string
  expertSupportBody: string
  formTitle: string
  formSignedIn: string
  formAnonymous: string
  labelFullName: string
  labelEmail: string
  labelCompany: string
  labelRole: string
  labelUseCase: string
  labelMessage: string
  rolePlaceholder: string
  useCasePlaceholder: string
  messagePlaceholder: string
  submitting: string
  submit: string
  errorFallback: string
  submittedTitle: string
  submittedSubtitle: string
  whatsNextTitle: string
  whatsNext: string[]
  returnHome: string
  goWorkspace: string
  roleLabels: string[]
  useCaseLabels: string[]
}): RequestDemoPayload {
  return {
    requestDemo: {
      heroBadge: labels.heroBadge,
      heroTitle: labels.heroTitle,
      heroSubtitle: labels.heroSubtitle,
      cards: {
        sampleDataTitle: labels.sampleDataTitle,
        sampleDataBody: labels.sampleDataBody,
        fullAccessTitle: labels.fullAccessTitle,
        fullAccessBody: labels.fullAccessBody,
        expertSupportTitle: labels.expertSupportTitle,
        expertSupportBody: labels.expertSupportBody,
      },
      formTitle: labels.formTitle,
      formSignedIn: labels.formSignedIn,
      formAnonymous: labels.formAnonymous,
      labels: {
        fullName: labels.labelFullName,
        email: labels.labelEmail,
        company: labels.labelCompany,
        role: labels.labelRole,
        useCase: labels.labelUseCase,
        message: labels.labelMessage,
      },
      placeholders: {
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Inc.",
        role: labels.rolePlaceholder,
        useCase: labels.useCasePlaceholder,
        message: labels.messagePlaceholder,
      },
      roleOptions: roleValues.map((v, i) => ({ value: v, label: labels.roleLabels[i] })),
      useCaseOptions: useCaseValues.map((v, i) => ({ value: v, label: labels.useCaseLabels[i] })),
      submitting: labels.submitting,
      submit: labels.submit,
      errorFallback: labels.errorFallback,
      submittedTitle: labels.submittedTitle,
      submittedSubtitle: labels.submittedSubtitle,
      whatsNextTitle: labels.whatsNextTitle,
      whatsNext: labels.whatsNext,
      returnHome: labels.returnHome,
      goWorkspace: labels.goWorkspace,
    },
  }
}

const EN = build({
  heroBadge: "Request Demo",
  heroTitle: "Experience Opticini with Demo Data",
  heroSubtitle: "Get access to a demo account with pre-loaded sample data to explore all features and capabilities of Opticini.",
  sampleDataTitle: "Sample Data",
  sampleDataBody: "Explore real monitoring data, reports, and analytics from sample websites",
  fullAccessTitle: "Full Access",
  fullAccessBody: "Access all features including AI analysis, monitoring, and reporting tools",
  expertSupportTitle: "Expert Support",
  expertSupportBody: "Get guidance from our team to help you make the most of your demo",
  formTitle: "Request Demo Account",
  formSignedIn: "Signed in as {{user}}. We will use your account details.",
  formAnonymous: "Sign in to pre-fill your information, or fill out the form manually.",
  labelFullName: "Full Name *",
  labelEmail: "Email Address *",
  labelCompany: "Company / Organization",
  labelRole: "Your Role *",
  labelUseCase: "Primary Use Case *",
  labelMessage: "Additional Information",
  rolePlaceholder: "Select your role",
  useCasePlaceholder: "What do you want to use Opticini for?",
  messagePlaceholder: "Tell us more about your needs, timeline, or features you want to explore...",
  submitting: "Submitting...",
  submit: "Submit Demo Request",
  errorFallback: "Failed to submit demo request. Please try again.",
  submittedTitle: "Demo Request Submitted!",
  submittedSubtitle: "Thank you for your interest. We will review your request and get back to you soon.",
  whatsNextTitle: "What happens next?",
  whatsNext: ["Our team will review your demo request", "We will contact you within 24-48 hours", "You will get access to a demo account with sample data"],
  returnHome: "Return to Homepage",
  goWorkspace: "Go to Workspace",
  roleLabels: ["CTO / Technical Director", "Engineering Manager", "Developer", "DevOps Engineer", "Product Manager", "Marketing Manager", "Other"],
  useCaseLabels: ["Website Monitoring", "Performance Analysis", "Security Auditing", "SEO Monitoring", "API Monitoring", "Multi-site Management", "Team Collaboration", "Other"],
})

const PT = build({
  ...EN.requestDemo,
  heroBadge: "Solicitar Demo",
  heroTitle: "Experimente o Opticini com dados de demonstracao",
  heroSubtitle: "Acesse uma conta demo com dados de exemplo para explorar todos os recursos da plataforma.",
  sampleDataTitle: "Dados de Exemplo",
  sampleDataBody: "Explore monitoramento real, relatorios e analises com sites de exemplo",
  fullAccessTitle: "Acesso Completo",
  fullAccessBody: "Acesse todos os recursos, incluindo analise com IA, monitoramento e relatorios",
  expertSupportTitle: "Suporte Especializado",
  expertSupportBody: "Receba orientacao da nossa equipe para aproveitar ao maximo a demo",
  formTitle: "Solicitar Conta Demo",
  formSignedIn: "Conectado como {{user}}. Usaremos os dados da sua conta.",
  formAnonymous: "Entre para preencher automaticamente ou preencha manualmente.",
  labelFullName: "Nome completo *",
  labelEmail: "Email *",
  labelCompany: "Empresa / Organizacao",
  labelRole: "Seu cargo *",
  labelUseCase: "Principal caso de uso *",
  labelMessage: "Informacoes adicionais",
  rolePlaceholder: "Selecione seu cargo",
  useCasePlaceholder: "Para que voce quer usar o Opticini?",
  messagePlaceholder: "Conte mais sobre suas necessidades, prazo e recursos de interesse...",
  submitting: "Enviando...",
  submit: "Enviar solicitacao de demo",
  errorFallback: "Falha ao enviar a solicitacao. Tente novamente.",
  submittedTitle: "Solicitacao enviada!",
  submittedSubtitle: "Obrigado pelo interesse. Vamos revisar e retornar em breve.",
  whatsNextTitle: "O que acontece agora?",
  whatsNext: ["Nossa equipe revisara sua solicitacao", "Entraremos em contato em 24-48 horas", "Voce recebera acesso a uma conta demo com dados de exemplo"],
  returnHome: "Voltar para a pagina inicial",
  goWorkspace: "Ir para o Workspace",
  roleLabels: ["CTO / Diretor Tecnico", "Gerente de Engenharia", "Desenvolvedor", "Engenheiro DevOps", "Gerente de Produto", "Gerente de Marketing", "Outro"],
  useCaseLabels: ["Monitoramento de Website", "Analise de Performance", "Auditoria de Seguranca", "Monitoramento de SEO", "Monitoramento de API", "Gestao Multisite", "Colaboracao de Equipe", "Outro"],
})

const ES = build({ ...EN.requestDemo, heroBadge: "Solicitar Demo", heroTitle: "Prueba Opticini con datos de demo", formTitle: "Solicitar cuenta demo", submit: "Enviar solicitud de demo", submitting: "Enviando...", returnHome: "Volver al inicio", goWorkspace: "Ir al Workspace", labelFullName: "Nombre completo *", labelEmail: "Correo *", labelCompany: "Empresa / Organizacion", labelRole: "Tu rol *", labelUseCase: "Caso de uso principal *", labelMessage: "Informacion adicional", rolePlaceholder: "Selecciona tu rol", useCasePlaceholder: "Para que quieres usar Opticini?", errorFallback: "No se pudo enviar la solicitud. Intentalo de nuevo.", submittedTitle: "Solicitud enviada!", submittedSubtitle: "Gracias por tu interes. Revisaremos tu solicitud pronto.", whatsNextTitle: "Que sigue?", roleLabels: ["CTO / Director Tecnico", "Gerente de Ingenieria", "Desarrollador", "Ingeniero DevOps", "Product Manager", "Marketing Manager", "Otro"], useCaseLabels: ["Monitoreo Web", "Analisis de Rendimiento", "Auditoria de Seguridad", "Monitoreo SEO", "Monitoreo API", "Gestion Multi-sitio", "Colaboracion de Equipo", "Otro"], whatsNext: ["Nuestro equipo revisara tu solicitud", "Te contactaremos en 24-48 horas", "Recibiras acceso a una cuenta demo"] })
const FR = build({ ...EN.requestDemo, heroBadge: "Demander une demo", heroTitle: "Essayez Opticini avec des donnees de demo", formTitle: "Demander un compte demo", submit: "Envoyer la demande", submitting: "Envoi...", returnHome: "Retour a l'accueil", goWorkspace: "Aller au Workspace", labelFullName: "Nom complet *", labelEmail: "Email *", labelCompany: "Entreprise / Organisation", labelRole: "Votre role *", labelUseCase: "Cas d'usage principal *", labelMessage: "Informations supplementaires", rolePlaceholder: "Selectionnez votre role", useCasePlaceholder: "Pour quoi voulez-vous utiliser Opticini ?", errorFallback: "Echec de l'envoi de la demande.", submittedTitle: "Demande envoyee !", submittedSubtitle: "Merci. Nous reviendrons vers vous bientot.", whatsNextTitle: "Et ensuite ?", roleLabels: ["CTO / Directeur technique", "Manager Ingenierie", "Developpeur", "Ingenieur DevOps", "Chef de produit", "Responsable marketing", "Autre"], useCaseLabels: ["Monitoring Web", "Analyse de performance", "Audit securite", "Monitoring SEO", "Monitoring API", "Gestion multi-sites", "Collaboration equipe", "Autre"], whatsNext: ["Notre equipe examinera votre demande", "Nous vous contacterons sous 24-48h", "Vous recevrez un acces demo"] })
const DE = build({ ...EN.requestDemo, heroBadge: "Demo anfordern", heroTitle: "Opticini mit Demo-Daten erleben", formTitle: "Demo-Konto anfordern", submit: "Demo-Anfrage senden", submitting: "Wird gesendet...", returnHome: "Zur Startseite", goWorkspace: "Zum Workspace", labelFullName: "Vollstandiger Name *", labelEmail: "E-Mail *", labelCompany: "Unternehmen / Organisation", labelRole: "Ihre Rolle *", labelUseCase: "Primarer Anwendungsfall *", labelMessage: "Zusatzinformationen", rolePlaceholder: "Rolle auswahlen", useCasePlaceholder: "Wofur mochten Sie Opticini nutzen?", errorFallback: "Demo-Anfrage konnte nicht gesendet werden.", submittedTitle: "Anfrage gesendet!", submittedSubtitle: "Danke fur Ihr Interesse. Wir melden uns bald.", whatsNextTitle: "Wie geht es weiter?", roleLabels: ["CTO / Technischer Leiter", "Engineering Manager", "Entwickler", "DevOps Engineer", "Produktmanager", "Marketing Manager", "Sonstiges"], useCaseLabels: ["Website-Monitoring", "Performance-Analyse", "Security-Audit", "SEO-Monitoring", "API-Monitoring", "Multi-Site-Management", "Team-Kollaboration", "Sonstiges"], whatsNext: ["Unser Team pruft Ihre Anfrage", "Wir kontaktieren Sie in 24-48 Stunden", "Sie erhalten Zugriff auf ein Demo-Konto"] })
const IT = build({ ...EN.requestDemo, heroBadge: "Richiedi Demo", heroTitle: "Prova Opticini con dati demo", formTitle: "Richiedi account demo", submit: "Invia richiesta demo", submitting: "Invio...", returnHome: "Torna alla home", goWorkspace: "Vai al Workspace", labelFullName: "Nome completo *", labelEmail: "Email *", labelCompany: "Azienda / Organizzazione", labelRole: "Il tuo ruolo *", labelUseCase: "Caso d'uso principale *", labelMessage: "Informazioni aggiuntive", rolePlaceholder: "Seleziona ruolo", useCasePlaceholder: "Per cosa vuoi usare Opticini?", errorFallback: "Invio richiesta non riuscito.", submittedTitle: "Richiesta inviata!", submittedSubtitle: "Grazie. Ti risponderemo presto.", whatsNextTitle: "Cosa succede ora?", roleLabels: ["CTO / Direttore tecnico", "Engineering Manager", "Sviluppatore", "Ingegnere DevOps", "Product Manager", "Marketing Manager", "Altro"], useCaseLabels: ["Monitoraggio sito web", "Analisi performance", "Audit sicurezza", "Monitoraggio SEO", "Monitoraggio API", "Gestione multi-sito", "Collaborazione team", "Altro"], whatsNext: ["Il nostro team esaminera la richiesta", "Ti contatteremo entro 24-48 ore", "Riceverai accesso a un account demo"] })
const RU = build({ ...EN.requestDemo, heroBadge: "Запросить демо", heroTitle: "Попробуйте Opticini с демо-данными", formTitle: "Запрос демо-аккаунта", submit: "Отправить запрос", submitting: "Отправка...", returnHome: "Вернуться на главную", goWorkspace: "Перейти в Workspace", labelFullName: "Полное имя *", labelEmail: "Email *", labelCompany: "Компания / Организация", labelRole: "Ваша роль *", labelUseCase: "Основной сценарий *", labelMessage: "Дополнительная информация", rolePlaceholder: "Выберите роль", useCasePlaceholder: "Для чего вы хотите использовать Opticini?", errorFallback: "Не удалось отправить запрос.", submittedTitle: "Запрос отправлен!", submittedSubtitle: "Спасибо за интерес. Мы скоро свяжемся.", whatsNextTitle: "Что дальше?", roleLabels: ["CTO / Технический директор", "Менеджер инженерии", "Разработчик", "Инженер DevOps", "Продакт-менеджер", "Маркетинг-менеджер", "Другое"], useCaseLabels: ["Мониторинг сайтов", "Анализ производительности", "Аудит безопасности", "Мониторинг SEO", "Мониторинг API", "Управление несколькими сайтами", "Командная работа", "Другое"], whatsNext: ["Наша команда рассмотрит запрос", "Мы свяжемся в течение 24-48 часов", "Вы получите доступ к демо-аккаунту"] })
const SV = build({ ...EN.requestDemo, heroBadge: "Begar demo", heroTitle: "Testa Opticini med demo-data", submit: "Skicka demo-begaran", submitting: "Skickar...", returnHome: "Till startsidan", goWorkspace: "Till Workspace", rolePlaceholder: "Valj din roll", useCasePlaceholder: "Vad vill du anvanda Opticini till?", whatsNextTitle: "Vad hander nu?", roleLabels: ["CTO / Teknisk chef", "Engineering Manager", "Utvecklare", "DevOps-ingenjor", "Produktchef", "Marknadschef", "Annat"], useCaseLabels: ["Webbplatsmonitorering", "Prestandaanalys", "Sakerhetsgranskning", "SEO-monitorering", "API-monitorering", "Multi-site-hantering", "Teamsamarbete", "Annat"], whatsNext: ["Vart team granskar din begaran", "Vi kontaktar dig inom 24-48 timmar", "Du far tillgang till ett demo-konto"] })
const NO = build({ ...EN.requestDemo, heroBadge: "Be om demo", heroTitle: "Opplev Opticini med demo-data", submit: "Send demoforesporsel", submitting: "Sender...", returnHome: "Til startsiden", goWorkspace: "Ga til Workspace", rolePlaceholder: "Velg rolle", useCasePlaceholder: "Hva vil du bruke Opticini til?", whatsNextTitle: "Hva skjer videre?", roleLabels: ["CTO / Teknisk direktor", "Engineering Manager", "Utvikler", "DevOps-ingenior", "Produktleder", "Markedssjef", "Annet"], useCaseLabels: ["Nettstedsmonitorering", "Ytelsesanalyse", "Sikkerhetsrevisjon", "SEO-monitorering", "API-monitorering", "Multi-site administrasjon", "Teamsamarbeid", "Annet"], whatsNext: ["Teamet var vurderer foresporselen", "Vi kontakter deg innen 24-48 timer", "Du far tilgang til en demo-konto"] })
const DA = build({ ...EN.requestDemo, heroBadge: "Anmod om demo", heroTitle: "Prov Opticini med demo-data", submit: "Send demoanmodning", submitting: "Sender...", returnHome: "Til forsiden", goWorkspace: "Ga til Workspace", rolePlaceholder: "Vaelg din rolle", useCasePlaceholder: "Hvad vil du bruge Opticini til?", whatsNextTitle: "Hvad sker der nu?", roleLabels: ["CTO / Teknisk direktor", "Engineering Manager", "Udvikler", "DevOps-ingenior", "Produktchef", "Marketingchef", "Andet"], useCaseLabels: ["Website-monitorering", "Performanceanalyse", "Sikkerhedsaudit", "SEO-monitorering", "API-monitorering", "Multi-site styring", "Teamsamarbejde", "Andet"], whatsNext: ["Vores team gennemgar anmodningen", "Vi kontakter dig inden for 24-48 timer", "Du far adgang til en demo-konto"] })
const ZH = build({ ...EN.requestDemo, heroBadge: "申请演示", heroTitle: "使用演示数据体验 Opticini", submit: "提交演示申请", submitting: "提交中...", returnHome: "返回首页", goWorkspace: "前往 Workspace", labelFullName: "姓名 *", labelEmail: "邮箱 *", labelCompany: "公司 / 组织", labelRole: "你的角色 *", labelUseCase: "主要使用场景 *", labelMessage: "补充信息", rolePlaceholder: "选择你的角色", useCasePlaceholder: "你希望用 Opticini 做什么？", errorFallback: "提交失败，请重试。", submittedTitle: "申请已提交！", submittedSubtitle: "感谢你的关注，我们会尽快联系你。", whatsNextTitle: "接下来会发生什么？", roleLabels: ["CTO / 技术总监", "工程经理", "开发者", "DevOps 工程师", "产品经理", "市场经理", "其他"], useCaseLabels: ["网站监控", "性能分析", "安全审计", "SEO 监控", "API 监控", "多站点管理", "团队协作", "其他"], whatsNext: ["我们的团队会审核你的申请", "我们会在24-48小时内联系你", "你将获得演示账号访问权限"] })
const JA = build({ ...EN.requestDemo, heroBadge: "デモをリクエスト", heroTitle: "デモデータで Opticini を体験", submit: "デモ申請を送信", submitting: "送信中...", returnHome: "ホームへ戻る", goWorkspace: "Workspace へ", labelFullName: "氏名 *", labelEmail: "メール *", labelCompany: "会社 / 組織", labelRole: "あなたの役割 *", labelUseCase: "主な利用目的 *", labelMessage: "追加情報", rolePlaceholder: "役割を選択", useCasePlaceholder: "Opticini を何に使いたいですか？", errorFallback: "送信に失敗しました。再試行してください。", submittedTitle: "申請を送信しました！", submittedSubtitle: "ありがとうございます。まもなくご連絡します。", whatsNextTitle: "次のステップ", roleLabels: ["CTO / 技術責任者", "エンジニアリングマネージャー", "開発者", "DevOps エンジニア", "プロダクトマネージャー", "マーケティングマネージャー", "その他"], useCaseLabels: ["Web サイト監視", "パフォーマンス分析", "セキュリティ監査", "SEO 監視", "API 監視", "マルチサイト管理", "チームコラボレーション", "その他"], whatsNext: ["チームが申請内容を確認します", "24-48時間以内にご連絡します", "デモアカウントへのアクセスを提供します"] })
const KO = build({ ...EN.requestDemo, heroBadge: "데모 요청", heroTitle: "데모 데이터로 Opticini 체험", submit: "데모 요청 제출", submitting: "전송 중...", returnHome: "홈으로 돌아가기", goWorkspace: "Workspace로 이동", labelFullName: "성명 *", labelEmail: "이메일 *", labelCompany: "회사 / 조직", labelRole: "역할 *", labelUseCase: "주요 사용 사례 *", labelMessage: "추가 정보", rolePlaceholder: "역할 선택", useCasePlaceholder: "Opticini를 무엇에 사용하시나요?", errorFallback: "요청 전송에 실패했습니다.", submittedTitle: "요청이 제출되었습니다!", submittedSubtitle: "관심 주셔서 감사합니다. 곧 연락드리겠습니다.", whatsNextTitle: "다음 단계", roleLabels: ["CTO / 기술 이사", "엔지니어링 매니저", "개발자", "DevOps 엔지니어", "프로덕트 매니저", "마케팅 매니저", "기타"], useCaseLabels: ["웹사이트 모니터링", "성능 분석", "보안 감사", "SEO 모니터링", "API 모니터링", "멀티사이트 관리", "팀 협업", "기타"], whatsNext: ["팀에서 요청을 검토합니다", "24-48시간 내 연락드립니다", "데모 계정 접근 권한을 제공합니다"] })
const HI = build({ ...EN.requestDemo, heroBadge: "डेमो अनुरोध", heroTitle: "डेमो डेटा के साथ Opticini आजमाएं", submit: "डेमो अनुरोध भेजें", submitting: "भेजा जा रहा है...", returnHome: "होम पर लौटें", goWorkspace: "Workspace पर जाएं", labelFullName: "पूरा नाम *", labelEmail: "ईमेल *", labelCompany: "कंपनी / संगठन", labelRole: "आपकी भूमिका *", labelUseCase: "मुख्य उपयोग मामला *", labelMessage: "अतिरिक्त जानकारी", rolePlaceholder: "अपनी भूमिका चुनें", useCasePlaceholder: "आप Opticini का उपयोग किस लिए करेंगे?", errorFallback: "अनुरोध भेजने में विफल।", submittedTitle: "अनुरोध भेज दिया गया!", submittedSubtitle: "रुचि के लिए धन्यवाद। हम जल्द संपर्क करेंगे।", whatsNextTitle: "आगे क्या होगा?", roleLabels: ["CTO / तकनीकी निदेशक", "इंजीनियरिंग मैनेजर", "डेवलपर", "DevOps इंजीनियर", "प्रोडक्ट मैनेजर", "मार्केटिंग मैनेजर", "अन्य"], useCaseLabels: ["वेबसाइट मॉनिटरिंग", "परफॉर्मेंस विश्लेषण", "सुरक्षा ऑडिट", "SEO मॉनिटरिंग", "API मॉनिटरिंग", "मल्टी-साइट प्रबंधन", "टीम सहयोग", "अन्य"], whatsNext: ["हमारी टीम आपके अनुरोध की समीक्षा करेगी", "हम 24-48 घंटों में संपर्क करेंगे", "आपको डेमो अकाउंट की पहुंच मिलेगी"] })
const AR = build({ ...EN.requestDemo, heroBadge: "طلب عرض توضيحي", heroTitle: "جرّب Opticini ببيانات تجريبية", submit: "ارسال طلب العرض", submitting: "جار الارسال...", returnHome: "العودة للرئيسية", goWorkspace: "الانتقال الى Workspace", labelFullName: "الاسم الكامل *", labelEmail: "البريد الالكتروني *", labelCompany: "الشركة / المؤسسة", labelRole: "الدور الوظيفي *", labelUseCase: "حالة الاستخدام الرئيسية *", labelMessage: "معلومات اضافية", rolePlaceholder: "اختر دورك", useCasePlaceholder: "في ماذا تريد استخدام Opticini؟", errorFallback: "فشل ارسال الطلب. حاول مرة اخرى.", submittedTitle: "تم ارسال الطلب!", submittedSubtitle: "شكرا لاهتمامك. سنتواصل معك قريبا.", whatsNextTitle: "ماذا بعد؟", roleLabels: ["CTO / المدير التقني", "مدير الهندسة", "مطور", "مهندس DevOps", "مدير منتج", "مدير تسويق", "اخرى"], useCaseLabels: ["مراقبة المواقع", "تحليل الاداء", "تدقيق الامن", "مراقبة SEO", "مراقبة API", "ادارة مواقع متعددة", "تعاون الفريق", "اخرى"], whatsNext: ["سيراجع فريقنا طلبك", "سنتواصل خلال 24-48 ساعة", "ستحصل على وصول لحساب تجريبي"] })
const HE = build({ ...EN.requestDemo, heroBadge: "בקש הדגמה", heroTitle: "התנסה ב-Opticini עם נתוני דמו", submit: "שלח בקשת הדגמה", submitting: "שולח...", returnHome: "חזרה לדף הבית", goWorkspace: "מעבר ל-Workspace", labelFullName: "שם מלא *", labelEmail: "אימייל *", labelCompany: "חברה / ארגון", labelRole: "התפקיד שלך *", labelUseCase: "מקרה שימוש עיקרי *", labelMessage: "מידע נוסף", rolePlaceholder: "בחר תפקיד", useCasePlaceholder: "למה תרצה להשתמש ב-Opticini?", errorFallback: "שליחת הבקשה נכשלה.", submittedTitle: "הבקשה נשלחה!", submittedSubtitle: "תודה על ההתעניינות. נחזור אליך בקרוב.", whatsNextTitle: "מה קורה עכשיו?", roleLabels: ["CTO / מנהל טכנולוגיות", "מנהל הנדסה", "מפתח", "מהנדס DevOps", "מנהל מוצר", "מנהל שיווק", "אחר"], useCaseLabels: ["ניטור אתרים", "ניתוח ביצועים", "ביקורת אבטחה", "ניטור SEO", "ניטור API", "ניהול רב-אתרי", "שיתוף פעולה צוותי", "אחר"], whatsNext: ["הצוות שלנו יבדוק את הבקשה", "ניצור קשר תוך 24-48 שעות", "תקבל גישה לחשבון דמו"] })

export const REQUEST_DEMO_PAGE_PATCH_BY_LANG: Record<string, RequestDemoPayload> = {
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
