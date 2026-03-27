import type { FeatureDetailConfig } from "@/components/feature-detail-page"

type ComplianceI18nPayload = Omit<FeatureDetailConfig, "colors">

type CompliancePagePatch = {
  features: { compliance: ComplianceI18nPayload }
}

function comp(
  title: string,
  subtitle: string,
  tagline: string,
  posStrong: string,
  posBody: string,
  sectionLabel: string,
  sectionTitle: string,
  card1: string,
  card2: string,
  card3: string,
  compareLabel: string,
  compareTitle: string,
  compareOld: string,
  compareNew: string,
  outcomeLabel: string,
  outcomeText: string,
  ctaTitle: string,
  ctaSubtitle: string,
  card2Items: string[],
  card3Items: string[],
  rows: { old: string; new: string }[]
): ComplianceI18nPayload {
  return {
    title,
    subtitle,
    tagline,
    planeNum: 6,
    stats: [
      { value: "7+", label: "frameworks supported" },
      { value: "24/7", label: "control monitoring" },
      { value: "0", label: "manual screenshots" },
      { value: "100%", label: "automated evidence" },
    ],
    posStrong,
    posBody,
    sectionLabel,
    sectionTitle,
    cards: [
      {
        icon: "📜",
        title: card1,
        items: ["SOC 2 Type I & II", "ISO 27001", "HIPAA", "PCI-DSS", "CIS Benchmarks & NIST"],
      },
      {
        icon: "⚙️",
        title: card2,
        items: card2Items,
      },
      {
        icon: "🤝",
        title: card3,
        items: card3Items,
      },
    ],
    compareLabel,
    compareTitle,
    compareOld,
    compareNew,
    compareRows: rows,
    outcomeLabel,
    outcomeText,
    ctaTitle,
    ctaSubtitle,
  }
}

const COMPLIANCE_PT = comp(
  "Conformidade",
  "Sempre pronto para auditoria",
  "A conformidade nao deve ser uma correria anual. Deve ser um estado continuo.",
  "A conformidade nao deve ser uma correria anual. Deve ser um estado continuo.",
  "O plano de Conformidade do Opticini entrega visibilidade continua em toda a infraestrutura, mapeada para os frameworks relevantes.",
  "Frameworks e Controles",
  "Permaneça continuamente pronto para auditoria em qualquer padrao",
  "Frameworks Suportados",
  "Monitoramento Continuo de Controles",
  "Modelo de Responsabilidade Compartilhada",
  "Por que Conformidade importa",
  "Da correria anual para prontidao continua",
  "Abordagem Tradicional de Conformidade",
  "Com Opticini Conformidade",
  "Resultado",
  "Conformidade continua em SOC 2, ISO 27001, HIPAA, PCI e outros, sem maratona anual.",
  "Torne a conformidade continua, nao ciclica",
  "Monitoramento em tempo real de controles em todos os frameworks necessarios.",
  ["Status de controles em tempo real", "Alertas de falha de controle", "Identificacao e priorizacao de lacunas", "Orientacao de remediacao"],
  ["Responsabilidades do provedor de nuvem mapeadas", "Suas obrigacoes claramente definidas", "Acompanhamento de conformidade de fornecedores", "Integracao de risco de terceiros"],
  [
    { old: "Correria anual de auditoria", new: "Sempre pronto para auditoria" },
    { old: "Coleta manual de evidencias", new: "Evidencias automatizadas e sempre atualizadas" },
    { old: "Falhas surpresa de controles", new: "Alertas de falha em tempo real" },
    { old: "Caos em planilhas", new: "Status estruturado e mapeado por framework" },
  ]
)

const COMPLIANCE_EN = comp(
  "Compliance",
  "Always audit-ready",
  "Compliance should not be a once-a-year scramble. It should be continuous.",
  "Compliance should not be a once-a-year scramble. It should be continuous.",
  "Opticini Compliance delivers continuous compliance visibility mapped to the frameworks that matter, with automated evidence collection.",
  "Frameworks and Controls",
  "Stay continuously audit-ready across every standard",
  "Supported Frameworks",
  "Continuous Control Monitoring",
  "Shared Responsibility Modeling",
  "Why Compliance Matters",
  "From annual panic to continuous readiness",
  "Traditional Compliance Approach",
  "With Opticini Compliance",
  "Outcome",
  "Continuous compliance across SOC 2, ISO 27001, HIPAA, PCI, and more.",
  "Make compliance continuous, not cyclical",
  "Real-time control monitoring across every framework you need.",
  ["Real-time control status", "Control failure alerts", "Gap identification and prioritization", "Remediation guidance"],
  ["Cloud provider responsibilities mapped", "Your obligations clearly defined", "Vendor compliance tracking", "Third-party risk integration"],
  [
    { old: "Annual audit scrambles", new: "Always audit-ready" },
    { old: "Manual evidence collection", new: "Automated evidence, always fresh" },
    { old: "Surprise control failures", new: "Real-time failure alerts" },
    { old: "Spreadsheet chaos", new: "Structured, framework-mapped status" },
  ]
)

const COMPLIANCE_ES = comp("Cumplimiento","Siempre listo para auditoria","El cumplimiento no debe ser una carrera anual. Debe ser continuo.","El cumplimiento no debe ser una carrera anual. Debe ser continuo.","Opticini Cumplimiento ofrece visibilidad continua de cumplimiento, mapeada a marcos relevantes, con evidencia automatizada.","Marcos y Controles","Mantente listo para auditoria en todo momento","Marcos Compatibles","Monitoreo Continuo de Controles","Modelo de Responsabilidad Compartida","Por que importa Cumplimiento","De panico anual a preparacion continua","Enfoque Tradicional de Cumplimiento","Con Opticini Cumplimiento","Resultado","Cumplimiento continuo en SOC 2, ISO 27001, HIPAA, PCI y mas.","Haz el cumplimiento continuo","Monitoreo en tiempo real de controles para todos los marcos necesarios.",["Estado de controles en tiempo real","Alertas de fallo de control","Identificacion y priorizacion de brechas","Guia de remediacion"],["Responsabilidades del proveedor cloud mapeadas","Obligaciones propias claramente definidas","Seguimiento de cumplimiento de proveedores","Integracion de riesgo de terceros"],[{old:"Corrida anual de auditoria",new:"Siempre listo para auditoria"},{old:"Recoleccion manual de evidencia",new:"Evidencia automatizada y actual"},{old:"Fallas sorpresa de control",new:"Alertas en tiempo real"},{old:"Caos de hojas de calculo",new:"Estado estructurado por marco"}])
const COMPLIANCE_FR = comp("Conformite","Toujours pret pour l'audit","La conformite ne doit pas etre une panique annuelle. Elle doit etre continue.","La conformite ne doit pas etre une panique annuelle. Elle doit etre continue.","Opticini Conformite offre une visibilite continue mappee aux cadres importants avec collecte de preuves automatisee.","Cadres et Controles","Restez pret pour l'audit en continu","Cadres pris en charge","Surveillance Continue des Controles","Modele de Responsabilite Partagee","Pourquoi la Conformite compte","De la panique annuelle a la preparation continue","Approche traditionnelle de conformite","Avec Opticini Conformite","Resultat","Conformite continue sur SOC 2, ISO 27001, HIPAA, PCI et plus.","Rendez la conformite continue","Surveillance temps reel des controles pour tous les cadres necessaires.",["Statut des controles en temps reel","Alertes d'echec de controle","Identification et priorisation des ecarts","Guide de remediation"],["Responsabilites cloud mappees","Vos obligations clairement definies","Suivi de conformite fournisseurs","Integration du risque tiers"],[{old:"Panique annuelle d'audit",new:"Toujours pret pour l'audit"},{old:"Collecte manuelle de preuves",new:"Preuves automatisees et a jour"},{old:"Defaillances surprises de controle",new:"Alertes en temps reel"},{old:"Chaos tableurs",new:"Statut structure par cadre"}])
const COMPLIANCE_DE = comp("Compliance","Immer auditbereit","Compliance sollte keine jahrliche Hektik sein. Sie sollte kontinuierlich sein.","Compliance sollte keine jahrliche Hektik sein. Sie sollte kontinuierlich sein.","Opticini Compliance liefert kontinuierliche Sichtbarkeit, auf relevante Frameworks gemappt, mit automatisierter Evidenz.","Frameworks und Kontrollen","Bleiben Sie durchgehend auditbereit","Unterstutzte Frameworks","Kontinuierliches Kontrollmonitoring","Shared-Responsibility-Modell","Warum Compliance wichtig ist","Von jahrlicher Panik zu kontinuierlicher Bereitschaft","Traditioneller Compliance-Ansatz","Mit Opticini Compliance","Ergebnis","Kontinuierliche Compliance fur SOC 2, ISO 27001, HIPAA, PCI und mehr.","Machen Sie Compliance kontinuierlich","Echtzeit-Kontrollmonitoring uber alle benotigten Frameworks.",["Kontrollstatus in Echtzeit","Kontrollfehler-Alerts","Identifikation und Priorisierung von Lucken","Remediation-Leitfaden"],["Cloud-Provider-Verantwortlichkeiten gemappt","Eigene Pflichten klar definiert","Vendor-Compliance-Tracking","Third-Party-Risk-Integration"],[{old:"Jahrliche Audit-Hektik",new:"Immer auditbereit"},{old:"Manuelle Evidenzsammlung",new:"Automatisierte, aktuelle Evidenz"},{old:"Unerwartete Kontrollfehler",new:"Echtzeit-Fehler-Alerts"},{old:"Tabellen-Chaos",new:"Strukturierter, framework-basierter Status"}])
const COMPLIANCE_IT = comp("Conformita","Sempre pronta per audit","La conformita non deve essere una corsa annuale. Deve essere continua.","La conformita non deve essere una corsa annuale. Deve essere continua.","Opticini Conformita offre visibilita continua mappata ai framework rilevanti con raccolta evidenze automatizzata.","Framework e Controlli","Rimani continuamente pronto per audit","Framework supportati","Monitoraggio Continuo dei Controlli","Modello di Responsabilita Condivisa","Perche la Conformita conta","Da panico annuale a preparazione continua","Approccio tradizionale alla conformita","Con Opticini Conformita","Risultato","Conformita continua su SOC 2, ISO 27001, HIPAA, PCI e altri.","Rendi la conformita continua","Monitoraggio in tempo reale dei controlli per tutti i framework necessari.",["Stato controlli in tempo reale","Alert di fallimento controllo","Identificazione e priorita delle lacune","Guida alla remediation"],["Responsabilita cloud provider mappate","Obblighi propri chiaramente definiti","Tracciamento conformita fornitori","Integrazione rischio terze parti"],[{old:"Corsa annuale all'audit",new:"Sempre pronti per audit"},{old:"Raccolta manuale evidenze",new:"Evidenze automatizzate e aggiornate"},{old:"Fallimenti sorpresa dei controlli",new:"Alert in tempo reale"},{old:"Caos fogli di calcolo",new:"Stato strutturato per framework"}])
const COMPLIANCE_RU = comp("Соответствие","Всегда готовы к аудиту","Соответствие не должно быть ежегодной гонкой. Оно должно быть непрерывным.","Соответствие не должно быть ежегодной гонкой. Оно должно быть непрерывным.","Opticini Соответствие дает непрерывную видимость соответствия по важным framework с автоматизированным сбором evidence.","Framework и Контроли","Постоянная готовность к аудиту по любому стандарту","Поддерживаемые Framework","Непрерывный Мониторинг Контролей","Модель Разделенной Ответственности","Почему это важно","От ежегодной паники к непрерывной готовности","Традиционный подход к соответствию","С Opticini Соответствие","Результат","Непрерывное соответствие SOC 2, ISO 27001, HIPAA, PCI и другим стандартам.","Сделайте соответствие непрерывным","Мониторинг контролей в реальном времени по всем нужным framework.",["Статус контролей в реальном времени","Оповещения о сбоях контроля","Выявление и приоритизация пробелов","Рекомендации по remediation"],["Ответственность cloud-провайдера сопоставлена","Ваши обязательства четко определены","Трекинг соответствия поставщиков","Интеграция риска третьих сторон"],[{old:"Ежегодная гонка перед аудитом",new:"Всегда готовы к аудиту"},{old:"Ручной сбор evidence",new:"Автоматизированные и актуальные evidence"},{old:"Неожиданные сбои контролей",new:"Оповещения в реальном времени"},{old:"Хаос таблиц",new:"Структурированный статус по framework"}])
const COMPLIANCE_SV = comp("Efterlevnad","Alltid revisionsredo","Efterlevnad ska inte vara en arlig panik. Den ska vara kontinuerlig.","Efterlevnad ska inte vara en arlig panik. Den ska vara kontinuerlig.","Opticini Efterlevnad ger kontinuerlig synlighet, mappad mot viktiga ramverk, med automatiserad evidensinsamling.","Ramverk och kontroller","Var kontinuerligt revisionsredo over alla standarder","Stodda ramverk","Kontinuerlig kontrollovervakning","Modell for delat ansvar","Varfor efterlevnad ar viktig","Fran arlig panik till kontinuerlig beredskap","Traditionell efterlevnadsmetod","Med Opticini Efterlevnad","Resultat","Kontinuerlig efterlevnad over SOC 2, ISO 27001, HIPAA, PCI och fler.","Gor efterlevnad kontinuerlig","Realtidsmonitorering av kontroller over alla ramverk du behover.",["Kontrollstatus i realtid","Larm vid kontrollfel","Identifiering och prioritering av gap","Vagledning for atgard"],["Molnleverantorens ansvar mappat","Dina skyldigheter tydligt definierade","Leverantors-efterlevnadssparning","Integration av tredjepartsrisk"],[{old:"Arlig revisionspanik",new:"Alltid revisionsredo"},{old:"Manuell evidensinsamling",new:"Automatiserad och aktuell evidens"},{old:"Overraskande kontrollfel",new:"Realtidslarm"},{old:"Kalkylbladskaos",new:"Strukturerad status per ramverk"}])
const COMPLIANCE_NO = comp("Samsvar","Alltid revisjonsklar","Samsvar skal ikke vaere en arlig panikk. Det skal vaere kontinuerlig.","Samsvar skal ikke vaere en arlig panikk. Det skal vaere kontinuerlig.","Opticini Samsvar gir kontinuerlig synlighet mappet mot relevante rammeverk med automatisert innsamling av evidens.","Rammeverk og kontroller","Vaer kontinuerlig revisjonsklar pa tvers av standarder","Stottede rammeverk","Kontinuerlig kontrollovervaking","Modell for delt ansvar","Hvorfor samsvar er viktig","Fra arlig panikk til kontinuerlig beredskap","Tradisjonell samsvarstilnaerming","Med Opticini Samsvar","Resultat","Kontinuerlig samsvar pa tvers av SOC 2, ISO 27001, HIPAA, PCI og flere.","Gjor samsvar kontinuerlig","Sanntidsmonitorering av kontroller pa tvers av alle rammeverk du trenger.",["Kontrollstatus i sanntid","Varsler ved kontrollsvikt","Identifisering og prioritering av gap","Veiledning for remediation"],["Ansvar hos skytilbyder mappet","Dine forpliktelser tydelig definert","Sporing av leverandorsamsvar","Integrasjon av tredjepartsrisiko"],[{old:"Arlig revisjonspanikk",new:"Alltid revisjonsklar"},{old:"Manuell evidensinnsamling",new:"Automatisert og oppdatert evidens"},{old:"Overraskende kontrollsvikt",new:"Sanntidsvarsler"},{old:"Regnearkkaos",new:"Strukturert status per rammeverk"}])
const COMPLIANCE_DA = comp("Compliance","Altid audit-klar","Compliance bor ikke vaere en arlig panik. Den bor vaere kontinuerlig.","Compliance bor ikke vaere en arlig panik. Den bor vaere kontinuerlig.","Opticini Compliance giver kontinuerlig synlighed mappet til relevante rammer med automatiseret evidensindsamling.","Rammer og kontroller","Vaer kontinuerligt audit-klar pa tvaers af standarder","Understottede rammer","Kontinuerlig kontrolovervagning","Model for delt ansvar","Hvorfor compliance er vigtig","Fra arlig panik til kontinuerlig parathed","Traditionel compliance-tilgang","Med Opticini Compliance","Resultat","Kontinuerlig compliance pa tvrs af SOC 2, ISO 27001, HIPAA, PCI og flere.","Gor compliance kontinuerlig","Realtidsmonitorering af kontroller pa tvrs af alle nodvendige rammer.",["Kontrolstatus i realtid","Advarsler ved kontrolfejl","Identifikation og prioritering af huller","Vejledning til remediation"],["Cloud-leverandoransvar mappet","Dine forpligtelser klart defineret","Leverandor-compliance sporing","Tredjepartsrisiko-integration"],[{old:"Arlig audit-panik",new:"Altid audit-klar"},{old:"Manuel evidensindsamling",new:"Automatiseret og opdateret evidens"},{old:"Overraskende kontrolfejl",new:"Realtidsadvarsler"},{old:"Regnearkskaos",new:"Struktureret status per ramme"}])
const COMPLIANCE_ZH = comp("合规","始终审计就绪","合规不应是每年的冲刺，而应是持续状态。","合规不应是每年的冲刺，而应是持续状态。","Opticini 合规提供持续合规可视化，映射到关键框架，并自动收集证据。","框架与控制","在所有标准下持续保持审计就绪","支持的框架","持续控制监控","共享责任模型","为什么合规重要","从年度恐慌到持续就绪","传统合规方式","使用 Opticini 合规","结果","在 SOC 2、ISO 27001、HIPAA、PCI 等标准上持续保持合规。","让合规持续而非周期化","在你需要满足的所有框架上进行实时控制监控。",["实时控制状态","控制失败告警","差距识别与优先级排序","修复建议"],["云提供商责任映射","你的义务清晰定义","供应商合规跟踪","第三方风险集成"],[{old:"年度审计冲刺",new:"始终审计就绪"},{old:"手工证据收集",new:"自动化且始终新鲜的证据"},{old:"控制项突然失败",new:"实时失败告警"},{old:"表格混乱",new:"按框架结构化状态"}])
const COMPLIANCE_JA = comp("コンプライアンス","常時監査対応","コンプライアンスは年1回の駆け込みではなく、継続状態であるべきです。","コンプライアンスは年1回の駆け込みではなく、継続状態であるべきです。","Opticini コンプライアンスは重要な framework にマップされた継続可視化と、証跡の自動収集を提供します。","フレームワークとコントロール","すべての標準で継続的に監査対応を維持","対応フレームワーク","継続的コントロール監視","共有責任モデル","なぜ重要か","年次の慌ただしさから継続準備へ","従来のコンプライアンス手法","Opticini コンプライアンスあり","結果","SOC 2、ISO 27001、HIPAA、PCI などで継続的な適合を実現。","コンプライアンスを継続運用へ","必要なすべての framework でコントロールをリアルタイム監視。",["コントロール状態をリアルタイム表示","コントロール失敗アラート","ギャップ特定と優先順位付け","remediation ガイダンス"],["クラウド提供者責任をマッピング","自社義務を明確化","ベンダー適合性トラッキング","サードパーティリスク統合"],[{old:"年次監査の駆け込み",new:"常時監査対応"},{old:"手動での証跡収集",new:"自動化され常に最新の証跡"},{old:"コントロール失敗の突然発生",new:"リアルタイム失敗アラート"},{old:"スプレッドシート混乱",new:"framework 別の構造化ステータス"}])
const COMPLIANCE_KO = comp("컴플라이언스","항상 감사 준비 완료","컴플라이언스는 연 1회 급한 작업이 아니라 지속 상태여야 합니다.","컴플라이언스는 연 1회 급한 작업이 아니라 지속 상태여야 합니다.","Opticini 컴플라이언스는 핵심 framework에 매핑된 지속 가시성과 증적 자동 수집을 제공합니다.","프레임워크와 통제", "모든 표준에서 지속적으로 감사 준비 유지","지원 프레임워크","지속적 통제 모니터링","공유 책임 모델","왜 중요한가","연례 패닉에서 지속 준비로","기존 컴플라이언스 접근","Opticini 컴플라이언스 사용","결과","SOC 2, ISO 27001, HIPAA, PCI 등에서 지속 컴플라이언스 달성.","컴플라이언스를 지속 운영으로","필요한 모든 framework에서 통제를 실시간 모니터링.",["실시간 통제 상태","통제 실패 알림","갭 식별 및 우선순위화","remediation 가이드"],["클라우드 제공자 책임 매핑","자사 의무 명확화","벤더 컴플라이언스 추적","서드파티 리스크 통합"],[{old:"연례 감사 대란",new:"항상 감사 준비 완료"},{old:"수동 증적 수집",new:"자동화되고 항상 최신 증적"},{old:"예상치 못한 통제 실패",new:"실시간 실패 알림"},{old:"스프레드시트 혼란",new:"framework별 구조화 상태"}])
const COMPLIANCE_HI = comp("अनुपालन","हमेशा ऑडिट-तैयार","अनुपालन साल में एक बार की भागदौड़ नहीं, बल्कि निरंतर स्थिति होना चाहिए।","अनुपालन साल में एक बार की भागदौड़ नहीं, बल्कि निरंतर स्थिति होना चाहिए।","Opticini अनुपालन महत्वपूर्ण framework पर मैप की गई निरंतर दृश्यता और स्वचालित evidence संग्रह देता है।","फ्रेमवर्क और कंट्रोल","हर मानक में लगातार ऑडिट-तैयार रहें","समर्थित फ्रेमवर्क","निरंतर कंट्रोल मॉनिटरिंग","साझा जिम्मेदारी मॉडल","यह क्यों महत्वपूर्ण है","वार्षिक घबराहट से निरंतर तैयारी तक","पारंपरिक अनुपालन दृष्टिकोण","Opticini अनुपालन के साथ","परिणाम","SOC 2, ISO 27001, HIPAA, PCI और अन्य में निरंतर अनुपालन।","अनुपालन को निरंतर बनाएं","आपके सभी आवश्यक framework में कंट्रोल का रीयल-टाइम मॉनिटरिंग।",["रीयल-टाइम कंट्रोल स्थिति","कंट्रोल विफलता अलर्ट","गैप पहचान और प्राथमिकता","remediation मार्गदर्शन"],["क्लाउड प्रदाता जिम्मेदारियां मैप्ड","आपकी जिम्मेदारियां स्पष्ट","वेंडर अनुपालन ट्रैकिंग","थर्ड-पार्टी जोखिम एकीकरण"],[{old:"वार्षिक ऑडिट भागदौड़",new:"हमेशा ऑडिट-तैयार"},{old:"मैन्युअल evidence संग्रह",new:"स्वचालित और हमेशा ताजा evidence"},{old:"अचानक कंट्रोल विफलता",new:"रीयल-टाइम विफलता अलर्ट"},{old:"स्प्रेडशीट अराजकता",new:"framework-मैप्ड संरचित स्थिति"}])
const COMPLIANCE_AR = comp("الامتثال","جاهزية دائمة للتدقيق","لا يجب ان يكون الامتثال سباقا سنويا. يجب ان يكون حالة مستمرة.","لا يجب ان يكون الامتثال سباقا سنويا. يجب ان يكون حالة مستمرة.","يوفر Opticini الامتثال رؤية مستمرة مدمجة مع framework المهمة مع جمع evidence تلقائي.","الاطر والضوابط","ابق جاهزا للتدقيق بشكل مستمر عبر كل معيار","الاطر المدعومة","مراقبة مستمرة للضوابط","نموذج المسؤولية المشتركة","لماذا الامتثال مهم","من فزع سنوي الى جاهزية مستمرة","نهج امتثال تقليدي","مع Opticini الامتثال","النتيجة","امتثال مستمر عبر SOC 2 وISO 27001 وHIPAA وPCI وغيرها.","اجعل الامتثال مستمرا","مراقبة لحظية للضوابط عبر كل framework تحتاجها.",["حالة الضوابط في الوقت الفعلي","تنبيهات فشل الضوابط","تحديد الفجوات وترتيب الاولويات","ارشادات remediation"],["مسؤوليات مزود السحابة موضحة","التزاماتك محددة بوضوح","تتبع امتثال الموردين","تكامل مخاطر الطرف الثالث"],[{old:"سباق تدقيق سنوي",new:"جاهزية دائمة للتدقيق"},{old:"جمع evidence يدويا",new:"evidence تلقائية ومحدثة دوما"},{old:"فشل ضوابط مفاجئ",new:"تنبيهات فشل لحظية"},{old:"فوضى الجداول",new:"حالة منظمة حسب framework"}])
const COMPLIANCE_HE = comp("תאימות","מוכנות מתמדת לביקורת","תאימות לא אמורה להיות ריצה שנתית אלא מצב מתמשך.","תאימות לא אמורה להיות ריצה שנתית אלא מצב מתמשך.","Opticini תאימות מספק נראות מתמשכת ממופה ל-framework חשובים עם איסוף evidence אוטומטי.","מסגרות ובקרות","להישאר מוכנים לביקורת באופן רציף בכל תקן","מסגרות נתמכות","ניטור רציף של בקרות","מודל אחריות משותפת","למה תאימות חשובה","מפאניקה שנתית למוכנות רציפה","גישת תאימות מסורתית","עם Opticini תאימות","תוצאה","תאימות רציפה ב-SOC 2, ISO 27001, HIPAA, PCI ועוד.","להפוך תאימות לרציפה","ניטור בזמן אמת של בקרות בכל framework שנדרש.",["סטטוס בקרות בזמן אמת","התראות כשל בקרה","זיהוי פערים ותעדוף","הנחיות remediation"],["אחריות ספק הענן ממופה","החובות שלך מוגדרות בבירור","מעקב תאימות ספקים","שילוב סיכון צד שלישי"],[{old:"מרוץ ביקורת שנתי",new:"תמיד מוכנים לביקורת"},{old:"איסוף evidence ידני",new:"evidence אוטומטי ועדכני תמיד"},{old:"כשלי בקרה מפתיעים",new:"התראות כשל בזמן אמת"},{old:"כאוס גיליונות",new:"סטטוס מובנה לפי framework"}])

export const COMPLIANCE_PAGE_PATCH_BY_LANG: Record<string, CompliancePagePatch> = {
  en: { features: { compliance: COMPLIANCE_EN } },
  es: { features: { compliance: COMPLIANCE_ES } },
  fr: { features: { compliance: COMPLIANCE_FR } },
  de: { features: { compliance: COMPLIANCE_DE } },
  it: { features: { compliance: COMPLIANCE_IT } },
  pt: {
    features: {
      compliance: COMPLIANCE_PT,
    },
  },
  ru: { features: { compliance: COMPLIANCE_RU } },
  sv: { features: { compliance: COMPLIANCE_SV } },
  no: { features: { compliance: COMPLIANCE_NO } },
  da: { features: { compliance: COMPLIANCE_DA } },
  zh: { features: { compliance: COMPLIANCE_ZH } },
  ja: { features: { compliance: COMPLIANCE_JA } },
  ko: { features: { compliance: COMPLIANCE_KO } },
  hi: { features: { compliance: COMPLIANCE_HI } },
  ar: { features: { compliance: COMPLIANCE_AR } },
  he: { features: { compliance: COMPLIANCE_HE } },
}
