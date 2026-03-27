import type { FeatureDetailConfig } from "@/components/feature-detail-page"

type HealthI18nPayload = Omit<FeatureDetailConfig, "colors">

type HealthPagePatch = {
  features: { health: HealthI18nPayload }
}

function h(
  title: string,
  subtitle: string,
  tagline: string,
  sectionLabel: string,
  sectionTitle: string,
  compareLabel: string,
  compareTitle: string,
  compareOld: string,
  compareNew: string,
  outcomeLabel: string,
  outcomeText: string,
  ctaTitle: string,
  ctaSubtitle: string,
  posStrong: string,
  posBody: string,
  card1Title: string,
  card2Title: string,
  card3Title: string,
  items: {
    c1: string[]
    c2: string[]
    c3: string[]
    rows: { old: string; new: string }[]
  }
): HealthI18nPayload {
  return {
    title,
    subtitle,
    tagline,
    planeNum: 2,
    stats: [
      { value: "99.9%", label: "SLA" },
      { value: "<30s", label: "alert latency" },
      { value: "Real-time", label: "health scoring" },
      { value: "Proactive", label: "failure detection" },
    ],
    posStrong,
    posBody,
    sectionLabel,
    sectionTitle,
    cards: [
      { icon: "💓", title: card1Title, items: items.c1 },
      { icon: "🔗", title: card2Title, items: items.c2 },
      { icon: "🔔", title: card3Title, items: items.c3 },
    ],
    compareLabel,
    compareTitle,
    compareOld,
    compareNew,
    compareRows: items.rows,
    outcomeLabel,
    outcomeText,
    ctaTitle,
    ctaSubtitle,
  }
}

const HEALTH_PT: HealthI18nPayload = {
  title: "Saude",
  subtitle: "Disponibilidade e a base da confianca",
  tagline: "A disponibilidade e a base da confianca. Voce precisa saber antes dos seus usuarios.",
  planeNum: 2,
  stats: [
    { value: "99.9%", label: "visibilidade de SLA" },
    { value: "<30s", label: "latencia de alerta" },
    { value: "Tempo real", label: "pontuacao de saude" },
    { value: "Proativo", label: "deteccao de falhas" },
  ],
  posStrong: "A disponibilidade e a base da confianca. Voce precisa saber antes dos seus usuarios.",
  posBody:
    "O plano de Saude do Opticini oferece visibilidade continua da saude operacional de cada sistema, com alertas inteligentes, status orientado por dependencias e acompanhamento de SLA.",
  sectionLabel: "O que Saude faz",
  sectionTitle: "Saiba o que esta degradando antes de virar indisponibilidade",
  cards: [
    {
      icon: "💓",
      title: "Monitoramento Continuo",
      items: [
        "Verificacoes de disponibilidade em tempo real",
        "Pontuacao de saude dos servicos",
        "Acompanhamento de uptime e SLA",
        "Tendencias e historico",
      ],
    },
    {
      icon: "🔗",
      title: "Status com Dependencias",
      items: [
        "Mapeamento de dependencias de servicos",
        "Analise de impacto em cadeia",
        "Deteccao de ponto unico de falha",
        "Estimativa de raio de impacto",
      ],
    },
    {
      icon: "🔔",
      title: "Alertas Inteligentes",
      items: [
        "Roteamento de alertas com contexto",
        "Reducao de ruido e deduplicacao",
        "Politicas de escalonamento",
        "Integracoes com Slack, PagerDuty e email",
      ],
    },
  ],
  compareLabel: "Por que Saude importa",
  compareTitle: "Do reativo para consciencia proativa",
  compareOld: "Sem monitoramento de Saude",
  compareNew: "Com Opticini Saude",
  compareRows: [
    { old: "Usuarios reportam falhas primeiro", new: "Deteccao proativa antes do impacto" },
    { old: "Tempestade de alertas e ruido", new: "Alertas inteligentes e deduplicados" },
    { old: "Dependencias desconhecidas", new: "Contexto completo de dependencias" },
    { old: "Compromissos de SLA perdidos", new: "Acompanhamento continuo de SLA" },
  ],
  outcomeLabel: "Resultado",
  outcomeText:
    "Visibilidade sempre ativa do que funciona, do que esta degradando e do que pode falhar antes que os usuarios percebam.",
  ctaTitle: "Saiba antes dos seus usuarios",
  ctaSubtitle:
    "Monitoramento continuo de saude em cada sistema, servico e dependencia.",
}

const HEALTH_ES = h(
  "Salud",
  "La disponibilidad es la base de la confianza",
  "La disponibilidad es la base de la confianza. Debes saberlo antes que tus usuarios.",
  "Que hace Salud",
  "Detecta degradaciones antes de que se conviertan en caidas",
  "Por que importa Salud",
  "De reaccionar tarde a actuar con anticipacion",
  "Sin monitoreo de Salud",
  "Con Opticini Salud",
  "Resultado",
  "Visibilidad continua de lo que funciona, lo que se degrada y lo que puede fallar antes de impactar al usuario.",
  "Enterate antes que tus usuarios",
  "Monitoreo continuo de salud en sistemas, servicios y dependencias.",
  "La disponibilidad es la base de la confianza. Debes saberlo antes que tus usuarios.",
  "Opticini Salud te da visibilidad continua de la salud operativa de cada sistema, con alertas inteligentes, contexto de dependencias y seguimiento de SLA.",
  "Monitoreo continuo",
  "Estado con dependencias",
  "Alertas inteligentes",
  {
    c1: ["Comprobaciones de disponibilidad en tiempo real", "Puntaje de salud por servicio", "Seguimiento de uptime y SLA", "Tendencias e historico"],
    c2: ["Mapa de dependencias de servicios", "Analisis de impacto descendente", "Deteccion de punto unico de falla", "Estimacion de radio de impacto"],
    c3: ["Enrutamiento de alertas con contexto", "Reduccion de ruido y deduplicacion", "Politicas de escalamiento", "Integraciones con Slack, PagerDuty y correo"],
    rows: [
      { old: "Los usuarios avisan primero", new: "Deteccion proactiva antes del impacto" },
      { old: "Tormenta de alertas y ruido", new: "Alertas inteligentes y deduplicadas" },
      { old: "Dependencias desconocidas", new: "Contexto completo de dependencias" },
      { old: "Incumplimientos de SLA", new: "Seguimiento continuo de SLA" },
    ],
  }
)

const HEALTH_FR = h(
  "Sante",
  "La disponibilite est la base de la confiance",
  "La disponibilite est la base de la confiance. Vous devez savoir avant vos utilisateurs.",
  "Ce que fait Sante",
  "Detectez les degradations avant la panne",
  "Pourquoi Sante est essentielle",
  "Du reactif a l'anticipation",
  "Sans supervision Sante",
  "Avec Opticini Sante",
  "Resultat",
  "Une visibilite continue de ce qui fonctionne, se degrade, ou risque d'echouer avant impact utilisateur.",
  "Sachez-le avant vos utilisateurs",
  "Supervision continue de la sante des systemes, services et dependances.",
  "La disponibilite est la base de la confiance. Vous devez savoir avant vos utilisateurs.",
  "Opticini Sante fournit une visibilite continue sur la sante operationnelle de chaque systeme, avec alertes intelligentes, contexte de dependances et suivi SLA.",
  "Supervision continue",
  "Etat avec dependances",
  "Alertes intelligentes",
  {
    c1: ["Verification de disponibilite en temps reel", "Score de sante par service", "Suivi uptime et SLA", "Tendances et historique"],
    c2: ["Cartographie des dependances", "Analyse d'impact en chaine", "Detection de point de defaillance unique", "Estimation du rayon d'impact"],
    c3: ["Routage d'alertes contextualise", "Reduction du bruit et deduplication", "Politiques d'escalade", "Integrations Slack, PagerDuty, email"],
    rows: [
      { old: "Les utilisateurs signalent d'abord", new: "Detection proactive avant impact" },
      { old: "Tempete d'alertes", new: "Alertes intelligentes dedupliquees" },
      { old: "Dependances inconnues", new: "Contexte complet des dependances" },
      { old: "SLA non tenus", new: "Suivi SLA en continu" },
    ],
  }
)

const HEALTH_DE = h(
  "Gesundheit",
  "Verfugbarkeit ist die Grundlage von Vertrauen",
  "Verfugbarkeit ist die Grundlage von Vertrauen. Sie muessen es vor Ihren Nutzern wissen.",
  "Was Gesundheit leistet",
  "Erkennen Sie Verschlechterungen, bevor sie Ausfalle werden",
  "Warum Gesundheit wichtig ist",
  "Von reaktiv zu proaktiv",
  "Ohne Gesundheitsmonitoring",
  "Mit Opticini Gesundheit",
  "Ergebnis",
  "Kontinuierliche Sicht auf funktionierende, degradierende und ausfallgefahrdete Systeme, bevor Nutzer betroffen sind.",
  "Wissen, bevor Nutzer es merken",
  "Kontinuierliches Gesundheitsmonitoring fur Systeme, Services und Abhangigkeiten.",
  "Verfugbarkeit ist die Grundlage von Vertrauen. Sie muessen es vor Ihren Nutzern wissen.",
  "Opticini Gesundheit bietet kontinuierliche Sicht auf den Betriebszustand jedes Systems mit intelligenten Alerts, Abhangigkeitskontext und SLA-Tracking.",
  "Kontinuierliches Monitoring",
  "Abhangigkeitsbasierter Status",
  "Intelligente Alerts",
  {
    c1: ["Verfugbarkeitsprufungen in Echtzeit", "Gesundheitsscore je Service", "Uptime- und SLA-Tracking", "Trends und Verlauf"],
    c2: ["Mapping von Service-Abhangigkeiten", "Downstream-Impact-Analyse", "Erkennung von Single Points of Failure", "Schadensradius-Schatzung"],
    c3: ["Kontextbasiertes Alert-Routing", "Rauschreduktion und Deduplizierung", "Eskaltionsrichtlinien", "Integrationen mit Slack, PagerDuty und E-Mail"],
    rows: [
      { old: "Nutzer melden Ausfalle zuerst", new: "Proaktive Erkennung vor Auswirkung" },
      { old: "Alert-Sturme und Rauschen", new: "Intelligente, deduplizierte Alerts" },
      { old: "Unbekannte Abhangigkeiten", new: "Voller Abhangigkeitskontext" },
      { old: "Verpasste SLA-Ziele", new: "Kontinuierliches SLA-Tracking" },
    ],
  }
)

const HEALTH_IT = h(
  "Salute",
  "La disponibilita e la base della fiducia",
  "La disponibilita e la base della fiducia. Devi saperlo prima dei tuoi utenti.",
  "Cosa fa Salute",
  "Individua degradazioni prima dei disservizi",
  "Perche Salute conta",
  "Dal reattivo al proattivo",
  "Senza monitoraggio Salute",
  "Con Opticini Salute",
  "Risultato",
  "Visibilita continua di cio che funziona, di cio che degrada e di cio che puo guastarsi prima dell'impatto utenti.",
  "Sapere prima degli utenti",
  "Monitoraggio continuo della salute di sistemi, servizi e dipendenze.",
  "La disponibilita e la base della fiducia. Devi saperlo prima dei tuoi utenti.",
  "Opticini Salute offre visibilita continua sullo stato operativo di ogni sistema, con avvisi intelligenti, contesto delle dipendenze e tracciamento SLA.",
  "Monitoraggio continuo",
  "Stato con dipendenze",
  "Avvisi intelligenti",
  {
    c1: ["Controlli di disponibilita in tempo reale", "Punteggio di salute per servizio", "Monitoraggio uptime e SLA", "Trend e storico"],
    c2: ["Mappatura dipendenze di servizio", "Analisi impatto a valle", "Rilevamento single point of failure", "Stima del raggio di impatto"],
    c3: ["Instradamento avvisi con contesto", "Riduzione rumore e deduplicazione", "Politiche di escalation", "Integrazioni con Slack, PagerDuty e email"],
    rows: [
      { old: "Gli utenti segnalano prima", new: "Rilevamento proattivo prima dell'impatto" },
      { old: "Tempeste di alert", new: "Alert intelligenti deduplicati" },
      { old: "Dipendenze sconosciute", new: "Contesto completo delle dipendenze" },
      { old: "SLA mancati", new: "Tracciamento SLA continuo" },
    ],
  }
)

const HEALTH_RU = h(
  "Здоровье",
  "Доступность — основа доверия",
  "Доступность — основа доверия. Вы должны знать раньше пользователей.",
  "Что делает Здоровье",
  "Обнаруживайте деградации до отказов",
  "Почему Здоровье важно",
  "От реактивности к проактивности",
  "Без мониторинга Здоровья",
  "С Opticini Здоровье",
  "Результат",
  "Непрерывная видимость того, что работает, что деградирует и что может отказать до влияния на пользователей.",
  "Узнавайте раньше пользователей",
  "Непрерывный мониторинг здоровья систем, сервисов и зависимостей.",
  "Доступность — основа доверия. Вы должны знать раньше пользователей.",
  "Opticini Здоровье дает непрерывную видимость операционного состояния каждой системы: умные алерты, контекст зависимостей и SLA.",
  "Непрерывный мониторинг",
  "Статус с учетом зависимостей",
  "Умные оповещения",
  {
    c1: ["Проверки доступности в реальном времени", "Оценка здоровья сервисов", "Отслеживание uptime и SLA", "Тренды и история"],
    c2: ["Карта зависимостей сервисов", "Анализ каскадного влияния", "Выявление единой точки отказа", "Оценка радиуса воздействия"],
    c3: ["Маршрутизация алертов с контекстом", "Снижение шума и дедупликация", "Политики эскалации", "Интеграции Slack, PagerDuty и email"],
    rows: [
      { old: "Пользователи сообщают первыми", new: "Проактивное обнаружение до инцидента" },
      { old: "Шторм алертов и шум", new: "Умные дедуплицированные алерты" },
      { old: "Неизвестные зависимости", new: "Полный контекст зависимостей" },
      { old: "Нарушение SLA", new: "Непрерывный контроль SLA" },
    ],
  }
)

const HEALTH_SV = h("Halsa","Tillganglighet ar grunden for fortroende","Tillganglighet ar grunden for fortroende. Du maste veta fore dina anvandare.","Vad Halsa gor","Upptack forsamring innan driftstopp","Varfor Halsa ar viktig","Fran reaktiv till proaktiv","Utan Halsomonitorering","Med Opticini Halsa","Resultat","Kontinuerlig insyn i vad som fungerar, vad som forsamras och vad som riskerar att fallera innan anvandare paverkas.","Vet fore dina anvandare","Kontinuerlig halsomonitorering av system, tjanster och beroenden.","Tillganglighet ar grunden for fortroende. Du maste veta fore dina anvandare.","Opticini Halsa ger kontinuerlig insyn i operativ halsostatus med smarta larm, beroendekontext och SLA-uppfoljning.","Kontinuerlig monitorering","Status med beroenden","Smarta larm",{c1:["Tillganglighetskontroller i realtid","Halsopoang per tjanst","Uptime- och SLA-uppfoljning","Trender och historik"],c2:["Kartlaggning av tjansteberoenden","Nedstroms konsekvensanalys","Detektering av enkel felpunkt","Uppskattning av paverkansradie"],c3:["Kontextstyrd larmroutning","Brusreducering och deduplicering","Eskalationspolicyer","Integrationer med Slack, PagerDuty och e-post"],rows:[{old:"Anvandare rapporterar forst",new:"Proaktiv upptackt fore paverkan"},{old:"Larmstormar och brus",new:"Smarta deduplicerade larm"},{old:"Okanda beroenden",new:"Full beroendekontext"},{old:"Missade SLA",new:"Kontinuerlig SLA-uppfoljning"}]})
const HEALTH_NO = h("Helse","Tilgjengelighet er grunnlaget for tillit","Tilgjengelighet er grunnlaget for tillit. Du ma vite det for brukerne.","Hva Helse gjor","Oppdag degradering for det blir nedetid","Hvorfor Helse er viktig","Fra reaktiv til proaktiv","Uten helseovervaking","Med Opticini Helse","Resultat","Kontinuerlig innsikt i hva som fungerer, hva som degraderes og hva som kan feile for brukerne merker det.","Vit det for brukerne","Kontinuerlig helseovervaking av systemer, tjenester og avhengigheter.","Tilgjengelighet er grunnlaget for tillit. Du ma vite det for brukerne.","Opticini Helse gir kontinuerlig synlighet i operasjonell helsetilstand med smarte varsler, avhengighetskontekst og SLA-sporing.","Kontinuerlig overvaking","Status med avhengigheter","Smarte varsler",{c1:["Tilgjengelighetssjekker i sanntid","Helsescore per tjeneste","Uptime- og SLA-sporing","Trender og historikk"],c2:["Kartlegging av tjenesteavhengigheter","Nedstroms konsekvensanalyse","Deteksjon av enkeltfeilpunkt","Estimert paverkningsradius"],c3:["Kontekstbasert varselruting","Stoyreduksjon og deduplisering","Eskaleringpolicyer","Integrasjoner med Slack, PagerDuty og e-post"],rows:[{old:"Brukere varsler forst",new:"Proaktiv deteksjon for paverkning"},{old:"Varselstormer og stoy",new:"Smarte dedupliserte varsler"},{old:"Ukjente avhengigheter",new:"Full avhengighetskontekst"},{old:"Miste SLA-forpliktelser",new:"Kontinuerlig SLA-sporing"}]})
const HEALTH_DA = h("Sundhed","Tilgaengelighed er grundlaget for tillid","Tilgaengelighed er grundlaget for tillid. Du skal vide det, for brugerne gor.","Hvad Sundhed gor","Opdag forringelser inden nedbrud","Hvorfor Sundhed er vigtig","Fra reaktiv til proaktiv","Uden sundhedsovervagning","Med Opticini Sundhed","Resultat","Kontinuerlig indsigt i hvad der virker, hvad der forringes, og hvad der kan fejle, for brugerne rammes.","Ved det for brugerne","Kontinuerlig sundhedsovervagning af systemer, tjenester og afhaengigheder.","Tilgaengelighed er grundlaget for tillid. Du skal vide det, for brugerne gor.","Opticini Sundhed giver kontinuerlig synlighed i driftstilstand med intelligente alarmer, afhaengighedskontekst og SLA-opfolgning.","Kontinuerlig overvagning","Status med afhaengigheder","Intelligente alarmer",{c1:["Tilgaengelighedstjek i realtid","Sundhedsscore pr. tjeneste","Uptime- og SLA-opfolgning","Trends og historik"],c2:["Kortlaegning af tjenesteafhaengigheder","Downstream-konsekvensanalyse","Detektion af single point of failure","Estimering af paavirkningsradius"],c3:["Kontekstbaseret alarmruting","Stojreduktion og deduplikering","Eskalationspolitikker","Integrationer med Slack, PagerDuty og e-mail"],rows:[{old:"Brugere melder fejl forst",new:"Proaktiv detektion for paavirkning"},{old:"Alarmstorme og stoj",new:"Intelligente deduplikerede alarmer"},{old:"Ukendte afhaengigheder",new:"Fuld afhaengighedskontekst"},{old:"Miste SLA-mal",new:"Kontinuerlig SLA-opfolgning"}]})
const HEALTH_ZH = h("健康","可用性是信任的基础","可用性是信任的基础。你必须比用户更早知道。","健康能力","在故障前发现退化","为什么健康很重要","从被动到主动","没有健康监控","使用 Opticini 健康","结果","持续可见系统正在正常运行、正在退化以及可能即将失败的状态，在影响用户前采取行动。","比用户更早知道","对系统、服务和依赖关系进行持续健康监控。","可用性是信任的基础。你必须比用户更早知道。","Opticini 健康提供每个系统的持续运行状态可视化，包含智能告警、依赖上下文和 SLA 跟踪。","持续监控","依赖关系状态","智能告警",{c1:["实时可用性检查","服务健康评分","Uptime 与 SLA 跟踪","趋势与历史"],c2:["服务依赖关系映射","下游影响分析","单点故障检测","影响半径估算"],c3:["带上下文的告警路由","降噪与去重","升级策略","Slack、PagerDuty、邮件集成"],rows:[{old:"用户先发现故障",new:"在影响前主动检测"},{old:"告警风暴和噪音",new:"智能去重告警"},{old:"依赖关系不清晰",new:"完整依赖上下文"},{old:"SLA 目标错失",new:"持续 SLA 跟踪"}]})
const HEALTH_JA = h("ヘルス","可用性は信頼の土台です","可用性は信頼の土台です。ユーザーより先に把握する必要があります。","ヘルスが行うこと","停止になる前に劣化を検知","ヘルスが重要な理由","事後対応から先回りへ","ヘルス監視なし","Opticini ヘルスあり","結果","何が正常で、何が劣化し、何が故障しそうかを継続的に可視化し、ユーザー影響前に対応できます。","ユーザーより先に把握","システム、サービス、依存関係の継続的なヘルス監視。","可用性は信頼の土台です。ユーザーより先に把握する必要があります。","Opticini ヘルスは、各システムの運用状態を継続的に可視化し、インテリジェントアラート、依存関係コンテキスト、SLA追跡を提供します。","継続的モニタリング","依存関係を考慮した状態","インテリジェントアラート",{c1:["リアルタイム可用性チェック","サービス別ヘルススコア","Uptime と SLA の追跡","傾向と履歴"],c2:["サービス依存関係マッピング","下流影響分析","単一点障害の検出","影響半径の推定"],c3:["コンテキスト付きアラートルーティング","ノイズ低減と重複排除","エスカレーションポリシー","Slack・PagerDuty・メール連携"],rows:[{old:"ユーザーが先に障害報告",new:"影響前のプロアクティブ検知"},{old:"アラートストームとノイズ",new:"賢い重複排除アラート"},{old:"依存関係が不明",new:"依存関係の完全なコンテキスト"},{old:"SLA 未達",new:"継続的 SLA 追跡"}]})
const HEALTH_KO = h("헬스","가용성은 신뢰의 기반","가용성은 신뢰의 기반입니다. 사용자보다 먼저 알아야 합니다.","헬스가 하는 일","장애가 되기 전에 성능 저하를 감지","헬스가 중요한 이유","사후 대응에서 사전 대응으로","헬스 모니터링 없음","Opticini 헬스 사용","결과","무엇이 정상이고 무엇이 저하되며 무엇이 곧 실패할지 지속적으로 가시화해 사용자 영향 전에 대응합니다.","사용자보다 먼저 파악","시스템, 서비스, 의존성 전반의 지속적인 헬스 모니터링.","가용성은 신뢰의 기반입니다. 사용자보다 먼저 알아야 합니다.","Opticini 헬스는 각 시스템의 운영 상태를 지속적으로 보여주며, 지능형 알림과 의존성 컨텍스트, SLA 추적을 제공합니다.","지속 모니터링","의존성 기반 상태","지능형 알림",{c1:["실시간 가용성 점검","서비스별 헬스 점수","Uptime 및 SLA 추적","추세와 이력"],c2:["서비스 의존성 매핑","다운스트림 영향 분석","단일 장애 지점 탐지","영향 반경 추정"],c3:["컨텍스트 기반 알림 라우팅","노이즈 감소 및 중복 제거","에스컬레이션 정책","Slack, PagerDuty, 이메일 연동"],rows:[{old:"사용자가 먼저 장애를 인지",new:"영향 전 선제 탐지"},{old:"알림 폭주와 노이즈",new:"지능형 중복 제거 알림"},{old:"알 수 없는 의존성",new:"의존성 전체 컨텍스트"},{old:"SLA 미준수",new:"지속적인 SLA 추적"}]})
const HEALTH_HI = h("स्वास्थ्य","उपलब्धता भरोसे की नींव है","उपलब्धता भरोसे की नींव है। आपको उपयोगकर्ताओं से पहले जानना चाहिए।","स्वास्थ्य क्या करता है","गिरावट को आउटेज बनने से पहले पहचानें","स्वास्थ्य क्यों महत्वपूर्ण है","प्रतिक्रियात्मक से सक्रिय","स्वास्थ्य मॉनिटरिंग के बिना","Opticini स्वास्थ्य के साथ","परिणाम","क्या ठीक चल रहा है, क्या गिर रहा है और क्या फेल हो सकता है—इसकी निरंतर दृश्यता, उपयोगकर्ता प्रभाव से पहले कार्रवाई।","उपयोगकर्ताओं से पहले जानें","सिस्टम, सेवाओं और निर्भरताओं का निरंतर स्वास्थ्य मॉनिटरिंग।","उपलब्धता भरोसे की नींव है। आपको उपयोगकर्ताओं से पहले जानना चाहिए।","Opticini स्वास्थ्य हर सिस्टम के ऑपरेशनल स्वास्थ्य की निरंतर दृश्यता देता है, स्मार्ट अलर्ट, निर्भरता संदर्भ और SLA ट्रैकिंग के साथ।","निरंतर मॉनिटरिंग","निर्भरता-आधारित स्थिति","स्मार्ट अलर्ट",{c1:["रीयल-टाइम उपलब्धता जांच","सेवा-स्तर स्वास्थ्य स्कोर","अपटाइम और SLA ट्रैकिंग","रुझान और इतिहास"],c2:["सेवा निर्भरता मैपिंग","डाउनस्ट्रीम प्रभाव विश्लेषण","सिंगल पॉइंट ऑफ फेल्योर पहचान","प्रभाव त्रिज्या का अनुमान"],c3:["संदर्भ-आधारित अलर्ट रूटिंग","शोर कम करना और डुप्लिकेट हटाना","एस्केलेशन नीतियां","Slack, PagerDuty और ईमेल इंटीग्रेशन"],rows:[{old:"उपयोगकर्ता पहले रिपोर्ट करते हैं",new:"प्रभाव से पहले सक्रिय पहचान"},{old:"अलर्ट स्टॉर्म और शोर",new:"स्मार्ट डिडुप्लिकेटेड अलर्ट"},{old:"अज्ञात निर्भरताएं",new:"पूर्ण निर्भरता संदर्भ"},{old:"SLA लक्ष्य छूटना",new:"निरंतर SLA ट्रैकिंग"}]})
const HEALTH_AR = h("الصحة","التوفر هو اساس الثقة","التوفر هو اساس الثقة. يجب ان تعرف قبل المستخدمين.","ماذا تفعل الصحة","اكتشف التدهور قبل ان يصبح انقطاعا","لماذا الصحة مهمة","من رد الفعل الى الاستباق","بدون مراقبة الصحة","مع Opticini الصحة","النتيجة","رؤية مستمرة لما يعمل وما يتدهور وما قد يتعطل قبل ان يتاثر المستخدم.","اعرف قبل المستخدم","مراقبة مستمرة لصحة الانظمة والخدمات والاعتماديات.","التوفر هو اساس الثقة. يجب ان تعرف قبل المستخدمين.","يوفر Opticini الصحة رؤية مستمرة للحالة التشغيلية لكل نظام مع تنبيهات ذكية وسياق الاعتماديات وتتبع SLA.","مراقبة مستمرة","حالة مبنية على الاعتماديات","تنبيهات ذكية",{c1:["فحوصات توفر في الوقت الفعلي","درجة صحة لكل خدمة","تتبع وقت التشغيل وSLA","اتجاهات وسجل"],c2:["خرائط اعتماديات الخدمات","تحليل الاثر اللاحق","اكتشاف نقطة فشل واحدة","تقدير نطاق الاثر"],c3:["توجيه تنبيهات بسياق","تقليل الضوضاء وازالة التكرار","سياسات التصعيد","تكامل مع Slack وPagerDuty والبريد"],rows:[{old:"المستخدم يبلغ اولا",new:"اكتشاف استباقي قبل الاثر"},{old:"عواصف تنبيهات وضوضاء",new:"تنبيهات ذكية بدون تكرار"},{old:"اعتماديات غير معروفة",new:"سياق كامل للاعتماديات"},{old:"اخفاقات SLA",new:"تتبع SLA بشكل مستمر"}]})
const HEALTH_HE = h("בריאות","זמינות היא בסיס האמון","זמינות היא בסיס האמון. צריך לדעת לפני המשתמשים.","מה בריאות עושה","לזהות הידרדרות לפני תקלה","למה בריאות חשובה","מתגובה מאוחרת ליוזמה","בלי ניטור בריאות","עם Opticini בריאות","תוצאה","נראות רציפה למה עובד, מה מידרדר ומה עלול להיכשל לפני השפעה על משתמשים.","לדעת לפני המשתמשים","ניטור רציף של בריאות מערכות, שירותים ותלויות.","זמינות היא בסיס האמון. צריך לדעת לפני המשתמשים.","Opticini בריאות מספק נראות רציפה למצב התפעולי של כל מערכת עם התראות חכמות, הקשר תלויות ומעקב SLA.","ניטור רציף","סטטוס מבוסס תלויות","התראות חכמות",{c1:["בדיקות זמינות בזמן אמת","ציון בריאות לכל שירות","מעקב Uptime ו-SLA","מגמות והיסטוריה"],c2:["מיפוי תלויות שירות","ניתוח השפעה במורד הזרם","זיהוי נקודת כשל בודדת","הערכת רדיוס השפעה"],c3:["ניתוב התראות עם הקשר","הפחתת רעש והסרת כפילויות","מדיניות הסלמה","אינטגרציות עם Slack, PagerDuty ואימייל"],rows:[{old:"משתמשים מדווחים ראשונים",new:"זיהוי יזום לפני השפעה"},{old:"סערות התראות ורעש",new:"התראות חכמות ללא כפילויות"},{old:"תלויות לא ידועות",new:"הקשר תלויות מלא"},{old:"החמצת יעדי SLA",new:"מעקב SLA רציף"}]})

export const HEALTH_PAGE_PATCH_BY_LANG: Record<string, HealthPagePatch> = {
  es: {
    features: {
      health: HEALTH_ES,
    },
  },
  fr: {
    features: {
      health: HEALTH_FR,
    },
  },
  de: {
    features: {
      health: HEALTH_DE,
    },
  },
  it: {
    features: {
      health: HEALTH_IT,
    },
  },
  pt: {
    features: {
      health: HEALTH_PT,
    },
  },
  ru: {
    features: {
      health: HEALTH_RU,
    },
  },
  sv: {
    features: {
      health: HEALTH_SV,
    },
  },
  no: {
    features: {
      health: HEALTH_NO,
    },
  },
  da: {
    features: {
      health: HEALTH_DA,
    },
  },
  zh: {
    features: {
      health: HEALTH_ZH,
    },
  },
  ja: {
    features: {
      health: HEALTH_JA,
    },
  },
  ko: {
    features: {
      health: HEALTH_KO,
    },
  },
  hi: {
    features: {
      health: HEALTH_HI,
    },
  },
  ar: {
    features: {
      health: HEALTH_AR,
    },
  },
  he: {
    features: {
      health: HEALTH_HE,
    },
  },
}
