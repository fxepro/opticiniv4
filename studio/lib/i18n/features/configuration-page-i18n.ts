import type { FeatureDetailConfig } from "@/components/feature-detail-page"

type ConfigurationI18nPayload = Omit<FeatureDetailConfig, "colors">
type ConfigurationPagePatch = { features: { configuration: ConfigurationI18nPayload } }

function c(
  title: string,
  subtitle: string,
  tagline: string,
  posStrong: string,
  posBody: string,
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
  cards: { c1: string; c2: string; c3: string; c4: string; i1: string[]; i2: string[]; i3: string[]; i4: string[]; rows: { old: string; new: string }[] }
): ConfigurationI18nPayload {
  return {
    title,
    subtitle,
    tagline,
    planeNum: 5,
    stats: [
      { value: "Continuous", label: "baseline comparison" },
      { value: "Real-time", label: "drift detection" },
      { value: "Policy", label: "enforcement" },
      { value: "0", label: "manual audits" },
    ],
    posStrong,
    posBody,
    sectionLabel,
    sectionTitle,
    cards: [
      { icon: "🖥️", title: cards.c1, items: cards.i1 },
      { icon: "☁️", title: cards.c2, items: cards.i2 },
      { icon: "📋", title: cards.c3, items: cards.i3 },
      { icon: "🔗", title: cards.c4, items: cards.i4 },
    ],
    compareLabel,
    compareTitle,
    compareOld,
    compareNew,
    compareRows: cards.rows,
    outcomeLabel,
    outcomeText,
    ctaTitle,
    ctaSubtitle,
  }
}

const CONFIG_EN = c(
  "Configuration",
  "Prevent drift. Enforce what good looks like.",
  "Configuration drift is a leading cause of outages, security gaps, and audit failures.",
  "Configuration drift is a leading cause of outages, security gaps, and audit failures.",
  "Opticini Configuration continuously tracks system configuration and alerts when reality diverges from approved baselines.",
  "What Configuration Does",
  "Know what changed and whether it should have",
  "Why Configuration Matters",
  "From silent drift to controlled change",
  "Without configuration control",
  "With Opticini Configuration",
  "Outcome",
  "Stable, secure, and compliant systems with full visibility into configuration and ownership.",
  "Stop drift before it becomes a crisis",
  "Continuous configuration monitoring so infrastructure stays as intended.",
  {
    c1: "System and Infrastructure Configuration",
    c2: "Cloud and Platform Configuration",
    c3: "Baseline and Drift Detection",
    c4: "Configuration with Context",
    i1: [
      "OS and system settings",
      "Installed packages and services",
      "Firewall and network rules",
      "Storage and backup settings",
    ],
    i2: [
      "Cloud resource configurations (AWS, Azure, GCP)",
      "IAM policies and role assignments",
      "Kubernetes manifests and policies",
      "Managed service settings",
    ],
    i3: [
      "Policy-defined baselines",
      "CIS-aligned standards",
      "Custom per-team or per-workload",
      "Real-time drift alerts",
    ],
    i4: [
      "Change author and timestamp",
      "Related incidents and deployments",
      "Security and compliance impact score",
      "Remediation guidance",
    ],
    rows: [
      { old: "Silent misconfigurations", new: "Immediate visibility and alerts" },
      { old: "Untracked changes", new: "Full accountability with context" },
      { old: "Repeated incidents", new: "Stable, enforced baselines" },
      { old: "Audit surprises", new: "Continuous compliance posture" },
    ],
  }
)

const CONFIG_PT = c("Configuracao","Previna drift. Garanta o padrao correto.","Drift de configuracao e uma causa frequente de indisponibilidade, falhas de seguranca e problemas de auditoria.","Drift de configuracao e uma causa frequente de indisponibilidade, falhas de seguranca e problemas de auditoria.","O plano de Configuracao do Opticini monitora continuamente e alerta quando o ambiente diverge das baselines aprovadas.","O que Configuracao faz","Saiba o que mudou e se deveria ter mudado","Por que Configuracao importa","De drift silencioso para mudanca controlada","Sem controle de configuracao","Com Opticini Configuracao","Resultado","Sistemas estaveis, seguros e aderentes com visibilidade completa de configuracao e responsabilidade.","Pare o drift antes da crise","Monitoramento continuo de configuracao para manter a infraestrutura como planejado.",{c1:"Configuracao de Sistema e Infraestrutura",c2:"Configuracao de Nuvem e Plataforma",c3:"Baseline e Deteccao de Drift",c4:"Configuracao com Contexto",i1:["Configuracoes de SO e sistema","Pacotes e servicos instalados","Regras de firewall e rede","Configuracoes de armazenamento e backup"],i2:["Configuracoes de recursos em nuvem (AWS, Azure, GCP)","Politicas IAM e atribuicoes de papeis","Manifestos e politicas Kubernetes","Configuracoes de servicos gerenciados"],i3:["Baselines definidas por politica","Padroes alinhados ao CIS","Regras personalizadas por time/carga","Alertas de drift em tempo real"],i4:["Autor da mudanca e horario","Incidentes e deploys relacionados","Score de impacto em seguranca/compliance","Orientacao de remediacao"],rows:[{old:"Misconfiguracoes silenciosas",new:"Visibilidade e alertas imediatos"},{old:"Mudancas sem rastreio",new:"Responsabilidade completa com contexto"},{old:"Incidentes recorrentes",new:"Baselines estaveis e aplicadas"},{old:"Surpresas em auditoria",new:"Postura de compliance continua"}]})
const CONFIG_ES = c("Configuracion","Evita el drift. Aplica el estandar correcto.","El drift de configuracion es una causa comun de caidas, brechas y fallas de auditoria.","El drift de configuracion es una causa comun de caidas, brechas y fallas de auditoria.","Opticini Configuracion supervisa continuamente y alerta cuando el entorno se desvía de las baselines aprobadas.","Que hace Configuracion","Saber que cambio y si debio cambiar","Por que Configuracion importa","Del drift silencioso al cambio controlado","Sin control de configuracion","Con Opticini Configuracion","Resultado","Sistemas estables, seguros y en cumplimiento con visibilidad completa de configuracion y responsables.","Deten el drift antes de la crisis","Monitoreo continuo para mantener la infraestructura como fue definida.",{c1:"Configuracion de sistema e infraestructura",c2:"Configuracion de nube y plataforma",c3:"Baseline y deteccion de drift",c4:"Configuracion con contexto",i1:["Ajustes de SO y sistema","Paquetes y servicios instalados","Reglas de firewall y red","Ajustes de almacenamiento y backup"],i2:["Configuracion de recursos cloud (AWS, Azure, GCP)","Politicas IAM y asignaciones de rol","Manifiestos y politicas Kubernetes","Configuracion de servicios gestionados"],i3:["Baselines definidas por politica","Estandares alineados a CIS","Reglas por equipo o workload","Alertas de drift en tiempo real"],i4:["Autor y hora del cambio","Incidentes y despliegues relacionados","Impacto de seguridad y cumplimiento","Guia de remediacion"],rows:[{old:"Misconfiguraciones silenciosas",new:"Visibilidad y alertas inmediatas"},{old:"Cambios sin trazabilidad",new:"Responsabilidad total con contexto"},{old:"Incidentes repetidos",new:"Baselines estables y aplicadas"},{old:"Sorpresas de auditoria",new:"Postura de cumplimiento continua"}]})
const CONFIG_FR = c("Configuration","Evitez le drift. Appliquez le bon standard.","Le drift de configuration est une cause majeure d'incidents, de failles et d'echecs d'audit.","Le drift de configuration est une cause majeure d'incidents, de failles et d'echecs d'audit.","Opticini Configuration surveille en continu et alerte lorsque l'environnement s'ecarte des baselines approuvees.","Ce que fait Configuration","Savoir ce qui a change et si cela devait changer","Pourquoi Configuration compte","Du drift silencieux au changement controle","Sans controle de configuration","Avec Opticini Configuration","Resultat","Des systemes stables, securises et conformes avec une visibilite complete des configurations et responsabilites.","Stoppez le drift avant la crise","Surveillance continue pour garder l'infrastructure conforme a l'intention.",{c1:"Configuration systeme et infrastructure",c2:"Configuration cloud et plateforme",c3:"Baseline et detection de drift",c4:"Configuration avec contexte",i1:["Parametres OS et systeme","Paquets et services installes","Regles firewall et reseau","Parametres stockage et sauvegarde"],i2:["Configuration ressources cloud (AWS, Azure, GCP)","Politiques IAM et attributions de roles","Manifestes et politiques Kubernetes","Parametres de services managés"],i3:["Baselines definies par politique","Standards alignes CIS","Regles par equipe ou charge","Alertes de drift en temps reel"],i4:["Auteur et horodatage du changement","Incidents et deploiements lies","Impact securite et conformite","Guide de remediation"],rows:[{old:"Mauvaises configurations silencieuses",new:"Visibilite et alertes immediates"},{old:"Changements non traces",new:"Responsabilite complete avec contexte"},{old:"Incidents repetes",new:"Baselines stables et appliquees"},{old:"Surprises d'audit",new:"Posture de conformite continue"}]})
const CONFIG_DE = c("Konfiguration","Drift verhindern. Standards durchsetzen.","Konfigurationsdrift verursacht haufig Ausfalle, Sicherheitslucken und Auditprobleme.","Konfigurationsdrift verursacht haufig Ausfalle, Sicherheitslucken und Auditprobleme.","Opticini Konfiguration uberwacht kontinuierlich und alarmiert bei Abweichungen von genehmigten Baselines.","Was Konfiguration leistet","Wissen, was sich geandert hat und ob es durfte","Warum Konfiguration wichtig ist","Von stillem Drift zu kontrollierter Anderung","Ohne Konfigurationskontrolle","Mit Opticini Konfiguration","Ergebnis","Stabile, sichere und konforme Systeme mit voller Sichtbarkeit auf Konfiguration und Verantwortlichkeit.","Drift stoppen bevor er kritisch wird","Kontinuierliche Konfigurationsuberwachung, damit Infrastruktur wie beabsichtigt bleibt.",{c1:"System- und Infrastrukturkonfiguration",c2:"Cloud- und Plattformkonfiguration",c3:"Baseline- und Drift-Erkennung",c4:"Konfiguration mit Kontext",i1:["OS- und Systemeinstellungen","Installierte Pakete und Services","Firewall- und Netzwerkregeln","Storage- und Backup-Einstellungen"],i2:["Cloud-Ressourcenkonfiguration (AWS, Azure, GCP)","IAM-Richtlinien und Rollenzuweisungen","Kubernetes-Manifeste und Richtlinien","Einstellungen gemanagter Dienste"],i3:["Policy-definierte Baselines","CIS-ausgerichtete Standards","Regeln pro Team oder Workload","Drift-Alerts in Echtzeit"],i4:["Anderungsautor und Zeitstempel","Verknupfte Incidents und Deployments","Sicherheits- und Compliance-Impact","Remediation-Hinweise"],rows:[{old:"Stille Fehlkonfigurationen",new:"Sofortige Sichtbarkeit und Alerts"},{old:"Unverfolgte Anderungen",new:"Volle Nachvollziehbarkeit mit Kontext"},{old:"Wiederkehrende Incidents",new:"Stabile, erzwungene Baselines"},{old:"Audit-Uberraschungen",new:"Kontinuierliche Compliance-Posture"}]})
const CONFIG_IT = c("Configurazione","Previeni il drift. Applica lo standard corretto.","Il drift di configurazione causa spesso disservizi, lacune di sicurezza e problemi di audit.","Il drift di configurazione causa spesso disservizi, lacune di sicurezza e problemi di audit.","Opticini Configurazione monitora in continuo e avvisa quando l'ambiente devia dalle baseline approvate.","Cosa fa Configurazione","Sapere cosa e cambiato e se doveva cambiare","Perche Configurazione conta","Dal drift silenzioso al cambiamento controllato","Senza controllo configurazione","Con Opticini Configurazione","Risultato","Sistemi stabili, sicuri e conformi con piena visibilita su configurazioni e responsabilita.","Ferma il drift prima della crisi","Monitoraggio continuo per mantenere l'infrastruttura come previsto.",{c1:"Configurazione sistema e infrastruttura",c2:"Configurazione cloud e piattaforma",c3:"Baseline e rilevamento drift",c4:"Configurazione con contesto",i1:["Impostazioni OS e sistema","Pacchetti e servizi installati","Regole firewall e rete","Impostazioni storage e backup"],i2:["Configurazione risorse cloud (AWS, Azure, GCP)","Policy IAM e assegnazioni ruoli","Manifest Kubernetes e policy","Impostazioni servizi gestiti"],i3:["Baseline definite da policy","Standard allineati CIS","Regole per team o workload","Alert drift in tempo reale"],i4:["Autore modifica e timestamp","Incident e deploy collegati","Impatto sicurezza e compliance","Guida alla remediation"],rows:[{old:"Misconfigurazioni silenziose",new:"Visibilita e avvisi immediati"},{old:"Modifiche non tracciate",new:"Piena responsabilita con contesto"},{old:"Incident ripetuti",new:"Baseline stabili e applicate"},{old:"Sorprese in audit",new:"Postura compliance continua"}]})
const CONFIG_RU = c("Конфигурация","Предотвращайте drift. Закрепляйте правильный стандарт.","Drift конфигурации часто приводит к сбоям, уязвимостям и провалам аудита.","Drift конфигурации часто приводит к сбоям, уязвимостям и провалам аудита.","Opticini Конфигурация непрерывно отслеживает изменения и предупреждает при отклонении от утвержденных baseline.","Что делает Конфигурация","Понимайте, что изменилось и должно ли было","Почему это важно","От тихого drift к управляемым изменениям","Без контроля конфигурации","С Opticini Конфигурация","Результат","Стабильные, безопасные и соответствующие требованиям системы с полной видимостью конфигурации и ответственности.","Остановите drift до кризиса","Непрерывный мониторинг конфигурации, чтобы инфраструктура оставалась как задумано.",{c1:"Конфигурация системы и инфраструктуры",c2:"Конфигурация облака и платформы",c3:"Baseline и обнаружение drift",c4:"Конфигурация с контекстом",i1:["Параметры ОС и системы","Установленные пакеты и сервисы","Правила firewall и сети","Параметры хранения и резервного копирования"],i2:["Конфигурация облачных ресурсов (AWS, Azure, GCP)","Политики IAM и назначение ролей","Манифесты и политики Kubernetes","Параметры управляемых сервисов"],i3:["Baseline, заданные политиками","Стандарты, выровненные по CIS","Правила для команд/нагрузок","Оповещения о drift в реальном времени"],i4:["Автор и время изменения","Связанные инциденты и деплои","Оценка влияния на безопасность и compliance","Рекомендации по remediation"],rows:[{old:"Тихие ошибки конфигурации",new:"Мгновенная видимость и оповещения"},{old:"Изменения без трассировки",new:"Полная ответственность с контекстом"},{old:"Повторяющиеся инциденты",new:"Стабильные и enforced baseline"},{old:"Сюрпризы на аудите",new:"Непрерывная posture соответствия"}]})
const CONFIG_SV = c("Konfiguration","Forhindra drift. Uppratthall ratt standard.","Konfigurationsdrift orsakar ofta avbrott, sakerhetsluckor och revisionsproblem.","Konfigurationsdrift orsakar ofta avbrott, sakerhetsluckor och revisionsproblem.","Opticini Konfiguration overvakar kontinuerligt och varnar nar miljo avviker fran godkanda baselines.","Vad Konfiguration gor","Veta vad som andrats och om det borde ha andrats","Varfor Konfiguration ar viktig","Fran tyst drift till kontrollerad andring","Utan konfigurationskontroll","Med Opticini Konfiguration","Resultat","Stabila, sakra och regeluppfyllande system med full synlighet i konfiguration och ansvar.","Stoppa drift innan krisen","Kontinuerlig konfigurationsovervakning sa infrastrukturen forblir som avsett.",{c1:"System- och infrastrukturkonfiguration",c2:"Moln- och plattformskonfiguration",c3:"Baseline och driftdetektering",c4:"Konfiguration med kontext",i1:["OS- och systeminstallningar","Installerade paket och tjanster","Brandvaggs- och natverksregler","Lagrings- och backupinstallningar"],i2:["Konfiguration av molnresurser (AWS, Azure, GCP)","IAM-policys och rolltilldelningar","Kubernetes-manifest och policyer","Installningar for hanterade tjanster"],i3:["Policydefinierade baselines","CIS-anpassade standarder","Regler per team eller arbetslast","Driftlarm i realtid"],i4:["Andringsforfattare och tidsstampel","Relaterade incidenter och deployer","Poang for sakerhets- och compliancepaverkan","Vagledning for atgard"],rows:[{old:"Tysta felkonfigurationer",new:"Omedelbar synlighet och larm"},{old:"Ospårade andringar",new:"Fullt ansvar med kontext"},{old:"Aterkommande incidenter",new:"Stabila, tillampade baselines"},{old:"Revisionsoverraskningar",new:"Kontinuerlig compliance-posture"}]})
const CONFIG_NO = c("Konfigurasjon","Forhindre drift. Handhev riktig standard.","Konfigurasjonsdrift er en vanlig arsak til nedetid, sikkerhetshull og revisjonsfeil.","Konfigurasjonsdrift er en vanlig arsak til nedetid, sikkerhetshull og revisjonsfeil.","Opticini Konfigurasjon overvaker kontinuerlig og varsler nar miljo avviker fra godkjente baselines.","Hva Konfigurasjon gjor","Vite hva som endret seg og om det burde","Hvorfor Konfigurasjon er viktig","Fra stille drift til kontrollert endring","Uten konfigurasjonskontroll","Med Opticini Konfigurasjon","Resultat","Stabile, sikre og etterlevelsesklare systemer med full innsikt i konfigurasjon og ansvar.","Stopp drift for det blir krise","Kontinuerlig konfigurasjonsovervaking sa infrastrukturen forblir som tiltenkt.",{c1:"System- og infrastrukturkonfigurasjon",c2:"Sky- og plattformkonfigurasjon",c3:"Baseline og driftdeteksjon",c4:"Konfigurasjon med kontekst",i1:["OS- og systeminnstillinger","Installerte pakker og tjenester","Brannmur- og nettverksregler","Lagrings- og backupinnstillinger"],i2:["Konfigurasjon av skyressurser (AWS, Azure, GCP)","IAM-policyer og rolletildelinger","Kubernetes-manifester og policyer","Innstillinger for administrerte tjenester"],i3:["Policydefinerte baselines","CIS-tilpassede standarder","Regler per team/arbeidslast","Driftvarsler i sanntid"],i4:["Endringsforfatter og tidsstempel","Relaterte hendelser og deployer","Sikkerhets- og compliance-pavirkningsscore","Veiledning for utbedring"],rows:[{old:"Stille feilkonfigurasjoner",new:"Umiddelbar synlighet og varsler"},{old:"Endringer uten sporbarhet",new:"Full ansvarlighet med kontekst"},{old:"Gjentatte hendelser",new:"Stabile, handhevede baselines"},{old:"Revisjonsoverraskelser",new:"Kontinuerlig compliance-posture"}]})
const CONFIG_DA = c("Konfiguration","Forhindr drift. Handhav den rigtige standard.","Konfigurationsdrift er en hyppig arsag til nedetid, sikkerhedshuller og revisionsproblemer.","Konfigurationsdrift er en hyppig arsag til nedetid, sikkerhedshuller og revisionsproblemer.","Opticini Konfiguration overvager kontinuerligt og alarmerer nar miljoet afviger fra godkendte baselines.","Hvad Konfiguration gor","Vid hvad der er andret, og om det burde vaere det","Hvorfor Konfiguration er vigtig","Fra tavs drift til kontrolleret andring","Uden konfigurationskontrol","Med Opticini Konfiguration","Resultat","Stabile, sikre og compliant systemer med fuld synlighed i konfiguration og ansvar.","Stop drift for det bliver en krise","Kontinuerlig konfigurationsovervagning sa infrastrukturen forbliver som tiltankt.",{c1:"System- og infrastrukturkonfiguration",c2:"Cloud- og platformkonfiguration",c3:"Baseline og driftdetektion",c4:"Konfiguration med kontekst",i1:["OS- og systemindstillinger","Installerede pakker og tjenester","Firewall- og netvaerksregler","Lagrings- og backupindstillinger"],i2:["Konfiguration af cloud-ressourcer (AWS, Azure, GCP)","IAM-politikker og rolletildelinger","Kubernetes-manifester og politikker","Indstillinger for administrerede tjenester"],i3:["Politikdefinerede baselines","CIS-tilpassede standarder","Regler pr. team eller workload","Driftalarmer i realtid"],i4:["Andringsforfatter og tidsstempel","Relaterede incidents og deploys","Score for sikkerheds- og compliance-pavirking","Vejledning til afhjælpning"],rows:[{old:"Tavse fejlkonfigurationer",new:"Ojeblikkelig synlighed og alarmer"},{old:"Andringer uden sporbarhed",new:"Fuld ansvarlighed med kontekst"},{old:"Gentagne incidents",new:"Stabile, handhævede baselines"},{old:"Revisionsoverraskelser",new:"Kontinuerlig compliance-posture"}]})
const CONFIG_ZH = c("配置","防止漂移，执行正确标准。","配置漂移是停机、安全漏洞和审计失败的常见根因。","配置漂移是停机、安全漏洞和审计失败的常见根因。","Opticini 配置持续监控并在环境偏离已批准 baseline 时告警。","配置能力","知道变了什么，以及是否应该变化","为什么配置很重要","从静默漂移到受控变更","没有配置控制","使用 Opticini 配置","结果","稳定、安全、合规的系统，并对配置与责任归属有完整可视化。","在危机前阻止漂移","持续配置监控，确保基础设施按预期运行。",{c1:"系统与基础设施配置",c2:"云与平台配置",c3:"Baseline 与漂移检测",c4:"带上下文的配置",i1:["操作系统与系统设置","已安装软件包与服务","防火墙与网络规则","存储与备份设置"],i2:["云资源配置（AWS、Azure、GCP）","IAM 策略与角色分配","Kubernetes 清单与策略","托管服务配置"],i3:["策略定义的 baseline","对齐 CIS 的标准","按团队/工作负载定制规则","实时漂移告警"],i4:["变更作者与时间戳","关联事故与部署","安全与合规影响评分","修复建议"],rows:[{old:"静默错误配置",new:"即时可视与告警"},{old:"变更不可追踪",new:"带上下文的完整责任追踪"},{old:"重复事故",new:"稳定并强制执行的 baseline"},{old:"审计意外",new:"持续合规 posture"}]})
const CONFIG_JA = c("構成","ドリフトを防ぎ、正しい標準を徹底する。","構成ドリフトは障害・セキュリティギャップ・監査不備の主要因です。","構成ドリフトは障害・セキュリティギャップ・監査不備の主要因です。","Opticini 構成は継続監視し、承認済み baseline からの逸脱を即時に通知します。","構成が行うこと","何が変わったか、変わるべきだったかを把握","なぜ重要か","静かなドリフトから統制された変更へ","構成管理なし","Opticini 構成あり","結果","安定・安全・準拠したシステムを実現し、構成と責任範囲を完全可視化します。","危機前にドリフトを止める","継続的な構成監視で、インフラを意図どおりに維持します。",{c1:"システム/インフラ構成",c2:"クラウド/プラットフォーム構成",c3:"Baseline とドリフト検知",c4:"コンテキスト付き構成",i1:["OS とシステム設定","導入済みパッケージとサービス","ファイアウォール/ネットワークルール","ストレージ/バックアップ設定"],i2:["クラウド資源設定（AWS、Azure、GCP）","IAM ポリシーとロール割当","Kubernetes マニフェストとポリシー","マネージドサービス設定"],i3:["ポリシー定義 baseline","CIS 準拠標準","チーム/ワークロード別ルール","リアルタイム drift アラート"],i4:["変更者とタイムスタンプ","関連インシデントとデプロイ","セキュリティ/コンプライアンス影響スコア","是正ガイダンス"],rows:[{old:"静かな誤設定",new:"即時可視化とアラート"},{old:"追跡されない変更",new:"文脈付き完全トレーサビリティ"},{old:"繰り返すインシデント",new:"安定し強制される baseline"},{old:"監査の想定外",new:"継続的な準拠 posture"}]})
const CONFIG_KO = c("구성","드리프트를 방지하고 올바른 표준을 강제하세요.","구성 드리프트는 장애, 보안 공백, 감사 실패의 주요 원인입니다.","구성 드리프트는 장애, 보안 공백, 감사 실패의 주요 원인입니다.","Opticini 구성은 지속적으로 모니터링하고 승인된 baseline에서 벗어나면 즉시 알립니다.","구성이 하는 일","무엇이 바뀌었는지, 바뀌어야 했는지 파악","왜 중요한가","조용한 드리프트에서 통제된 변경으로","구성 통제 없음","Opticini 구성 사용","결과","안정적이고 안전하며 준수 가능한 시스템, 그리고 구성과 책임에 대한 완전한 가시성.","위기 전에 드리프트 차단","지속 구성 모니터링으로 인프라를 의도대로 유지합니다.",{c1:"시스템/인프라 구성",c2:"클라우드/플랫폼 구성",c3:"Baseline 및 드리프트 탐지",c4:"컨텍스트 기반 구성",i1:["OS 및 시스템 설정","설치된 패키지와 서비스","방화벽 및 네트워크 규칙","스토리지 및 백업 설정"],i2:["클라우드 리소스 구성 (AWS, Azure, GCP)","IAM 정책 및 역할 할당","Kubernetes 매니페스트 및 정책","관리형 서비스 설정"],i3:["정책 기반 baseline","CIS 정렬 표준","팀/워크로드별 사용자 규칙","실시간 드리프트 경보"],i4:["변경 작성자와 시각","연관 사고와 배포","보안/컴플라이언스 영향 점수","수정 가이드"],rows:[{old:"조용한 오구성",new:"즉시 가시성 및 경보"},{old:"추적되지 않는 변경",new:"컨텍스트 포함 완전 책임추적"},{old:"반복 사고",new:"안정적이고 강제된 baseline"},{old:"감사 시 깜짝 이슈",new:"지속적 준수 posture"}]})
const CONFIG_HI = c("कॉन्फ़िगरेशन","ड्रिफ्ट रोकें, सही मानक लागू करें।","कॉन्फ़िगरेशन ड्रिफ्ट डाउनटाइम, सुरक्षा गैप और ऑडिट फेल का प्रमुख कारण है।","कॉन्फ़िगरेशन ड्रिफ्ट डाउनटाइम, सुरक्षा गैप और ऑडिट फेल का प्रमुख कारण है।","Opticini कॉन्फ़िगरेशन लगातार निगरानी करता है और स्वीकृत baseline से विचलन पर अलर्ट देता है।","कॉन्फ़िगरेशन क्या करता है","क्या बदला और क्या बदलना चाहिए था, यह जानें","यह क्यों महत्वपूर्ण है","चुपचाप ड्रिफ्ट से नियंत्रित बदलाव तक","कॉन्फ़िगरेशन नियंत्रण के बिना","Opticini कॉन्फ़िगरेशन के साथ","परिणाम","स्थिर, सुरक्षित और अनुपालन-तैयार सिस्टम, कॉन्फ़िगरेशन और जिम्मेदारी की पूर्ण दृश्यता के साथ।","ड्रिफ्ट को संकट बनने से पहले रोकें","निरंतर कॉन्फ़िगरेशन मॉनिटरिंग से इन्फ्रास्ट्रक्चर को इच्छित अवस्था में रखें।",{c1:"सिस्टम और इन्फ्रास्ट्रक्चर कॉन्फ़िगरेशन",c2:"क्लाउड और प्लेटफ़ॉर्म कॉन्फ़िगरेशन",c3:"Baseline और ड्रिफ्ट डिटेक्शन",c4:"संदर्भ सहित कॉन्फ़िगरेशन",i1:["OS और सिस्टम सेटिंग्स","इंस्टॉल्ड पैकेज और सेवाएं","फ़ायरवॉल और नेटवर्क नियम","स्टोरेज और बैकअप सेटिंग्स"],i2:["क्लाउड रिसोर्स कॉन्फ़िगरेशन (AWS, Azure, GCP)","IAM नीतियां और रोल असाइनमेंट","Kubernetes मैनिफेस्ट और नीतियां","मैनेज्ड सर्विस सेटिंग्स"],i3:["नीति-परिभाषित baseline","CIS-अलाइन मानक","टीम/वर्कलोड के अनुसार कस्टम नियम","रीयल-टाइम ड्रिफ्ट अलर्ट"],i4:["बदलाव लेखक और टाइमस्टैम्प","संबंधित घटनाएं और डिप्लॉय","सुरक्षा/अनुपालन प्रभाव स्कोर","रिमेडिएशन मार्गदर्शन"],rows:[{old:"चुपचाप गलत कॉन्फ़िगरेशन",new:"तुरंत दृश्यता और अलर्ट"},{old:"बिना ट्रैक बदलाव",new:"संदर्भ सहित पूर्ण जवाबदेही"},{old:"बार-बार घटनाएं",new:"स्थिर और लागू baseline"},{old:"ऑडिट सरप्राइज़",new:"निरंतर अनुपालन posture"}]})
const CONFIG_AR = c("التهيئة","امنع الانحراف وطبّق المعيار الصحيح.","انحراف التهيئة سبب شائع للانقطاع وثغرات الامن وفشل التدقيق.","انحراف التهيئة سبب شائع للانقطاع وثغرات الامن وفشل التدقيق.","Opticini التهيئة يراقب باستمرار وينبه عند الانحراف عن baseline المعتمدة.","ماذا تفعل التهيئة","اعرف ما تغيّر وهل كان يجب ان يتغير","لماذا التهيئة مهمة","من انحراف صامت الى تغيير مضبوط","بدون ضبط تهيئة","مع Opticini التهيئة","النتيجة","انظمة مستقرة وآمنة ومتوافقة مع رؤية كاملة للتهيئة والمسؤولية.","اوقف الانحراف قبل الازمة","مراقبة مستمرة للتهيئة للحفاظ على البنية كما ينبغي.",{c1:"تهيئة النظام والبنية التحتية",c2:"تهيئة السحابة والمنصة",c3:"Baseline وكشف الانحراف",c4:"تهيئة مع سياق",i1:["اعدادات النظام ونظام التشغيل","الحزم والخدمات المثبتة","قواعد الجدار الناري والشبكة","اعدادات التخزين والنسخ الاحتياطي"],i2:["تهيئة موارد السحابة (AWS, Azure, GCP)","سياسات IAM وتعيين الادوار","Manifest وسياسات Kubernetes","اعدادات الخدمات المُدارة"],i3:["Baseline محددة بالسياسات","معايير متوافقة مع CIS","قواعد مخصصة لكل فريق/عبء عمل","تنبيهات انحراف بالوقت الفعلي"],i4:["مؤلف التغيير والطابع الزمني","الحوادث وعمليات النشر المرتبطة","درجة اثر الامن والامتثال","ارشادات المعالجة"],rows:[{old:"سوء تهيئة صامت",new:"رؤية وتنبيهات فورية"},{old:"تغييرات بلا تتبع",new:"مساءلة كاملة مع سياق"},{old:"حوادث متكررة",new:"Baseline مستقرة ومطبقة"},{old:"مفاجآت التدقيق",new:"posture امتثال مستمرة"}]})
const CONFIG_HE = c("תצורה","מנעו drift ואכפו סטנדרט נכון.","drift בתצורה הוא גורם נפוץ להשבתות, פערי אבטחה וכשלי ביקורת.","drift בתצורה הוא גורם נפוץ להשבתות, פערי אבטחה וכשלי ביקורת.","Opticini תצורה מנטר ברציפות ומתריע כשהסביבה חורגת מה-baseline המאושרים.","מה תצורה עושה","לדעת מה השתנה והאם היה צריך להשתנות","למה זה חשוב","מ-drift שקט לשינוי מבוקר","ללא בקרת תצורה","עם Opticini תצורה","תוצאה","מערכות יציבות, מאובטחות ותואמות עם נראות מלאה של תצורה ואחריות.","לעצור drift לפני משבר","ניטור תצורה רציף כדי לשמור על תשתית כפי שתוכננה.",{c1:"תצורת מערכת ותשתית",c2:"תצורת ענן ופלטפורמה",c3:"Baseline וזיהוי drift",c4:"תצורה עם הקשר",i1:["הגדרות OS ומערכת","חבילות ושירותים מותקנים","כללי חומת אש ורשת","הגדרות אחסון וגיבוי"],i2:["תצורת משאבי ענן (AWS, Azure, GCP)","מדיניות IAM והקצאות תפקידים","Manifest ומדיניות Kubernetes","הגדרות שירותים מנוהלים"],i3:["Baseline מוגדרי מדיניות","סטנדרטים מיושרים ל-CIS","כללים מותאמים לפי צוות/עומס","התראות drift בזמן אמת"],i4:["מחבר שינוי וחותמת זמן","אירועים ופריסות קשורים","ציון השפעת אבטחה/תאימות","הנחיות תיקון"],rows:[{old:"שגיאות תצורה שקטות",new:"נראות והתראות מיידיות"},{old:"שינויים ללא עקיבות",new:"אחריות מלאה עם הקשר"},{old:"אירועים חוזרים",new:"Baseline יציבים ומאוכפים"},{old:"הפתעות בביקורת",new:"posture תאימות רציפה"}]})

export const CONFIGURATION_PAGE_PATCH_BY_LANG: Record<string, ConfigurationPagePatch> = {
  en: { features: { configuration: CONFIG_EN } },
  es: { features: { configuration: CONFIG_ES } },
  fr: { features: { configuration: CONFIG_FR } },
  de: { features: { configuration: CONFIG_DE } },
  it: { features: { configuration: CONFIG_IT } },
  pt: { features: { configuration: CONFIG_PT } },
  ru: { features: { configuration: CONFIG_RU } },
  sv: { features: { configuration: CONFIG_SV } },
  no: { features: { configuration: CONFIG_NO } },
  da: { features: { configuration: CONFIG_DA } },
  zh: { features: { configuration: CONFIG_ZH } },
  ja: { features: { configuration: CONFIG_JA } },
  ko: { features: { configuration: CONFIG_KO } },
  hi: { features: { configuration: CONFIG_HI } },
  ar: { features: { configuration: CONFIG_AR } },
  he: { features: { configuration: CONFIG_HE } },
}
