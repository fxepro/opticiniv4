import type { FeatureDetailConfig } from "@/components/feature-detail-page"

type EvidenceI18nPayload = Omit<FeatureDetailConfig, "colors">
type EvidencePagePatch = { features: { evidence: EvidenceI18nPayload } }

function e(
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
  cards: { c1: string; c2: string; i1: string[]; i2: string[]; rows: { old: string; new: string }[] }
): EvidenceI18nPayload {
  return {
    title,
    subtitle,
    tagline,
    planeNum: 7,
    stats: [
      { value: "Auto", label: "collected evidence" },
      { value: "Always", label: "fresh and current" },
      { value: "0", label: "manual screenshots" },
      { value: "Auditor", label: "ready exports" },
    ],
    posStrong,
    posBody,
    sectionLabel,
    sectionTitle,
    cards: [
      { icon: "⚡", title: cards.c1, items: cards.i1 },
      { icon: "📋", title: cards.c2, items: cards.i2 },
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

const EVIDENCE_EN = e(
  "Evidence",
  "Prove compliance automatically",
  "Audits fail when proof is missing, outdated, or incomplete. Eliminate the scramble.",
  "Audits fail when proof is missing, outdated, or incomplete.",
  "Opticini Evidence automates the collection, organization, and maintenance of audit-ready evidence so proof is always current.",
  "What Evidence Does",
  "Automated proof that stays current and structured",
  "Why Evidence Matters",
  "From screenshot chaos to structured proof",
  "Traditional evidence collection",
  "With Opticini Evidence",
  "Outcome",
  "Audit-ready evidence maintained continuously without manual effort or spreadsheet chaos.",
  "Never scramble for evidence again",
  "Continuous automated audit proof mapped to every control.",
  {
    c1: "Automated Evidence Sources",
    c2: "Manual and Attested Evidence",
    i1: [
      "Infrastructure and system configurations",
      "Cloud service settings and snapshots",
      "Security and access controls",
      "Logging, monitoring, and backup status",
      "Vulnerability and posture reports",
    ],
    i2: [
      "Policy documents",
      "Employee and vendor attestations",
      "Exception approvals and sign-offs",
      "External audit artifacts",
      "Versioned change history",
    ],
    rows: [
      { old: "Manual screenshots and exports", new: "Automated continuous collection" },
      { old: "Stale or missing evidence", new: "Freshness-tracked and always current" },
      { old: "Audit prep takes weeks", new: "Evidence ready in minutes" },
      { old: "Spreadsheet chaos", new: "Structured auditor-ready packages" },
    ],
  }
)

const EVIDENCE_PT = e("Evidencias","Comprove conformidade automaticamente","Auditorias falham quando provas estao ausentes, desatualizadas ou incompletas. Elimine a correria.","Auditorias falham quando provas estao ausentes, desatualizadas ou incompletas.","O plano de Evidencias do Opticini automatiza coleta, organizacao e manutencao de evidencias prontas para auditoria.","O que Evidencias faz","Provas automatizadas, atuais e estruturadas","Por que Evidencias importa","Do caos de capturas para prova estruturada","Coleta tradicional de evidencias","Com Opticini Evidencias","Resultado","Evidencias prontas para auditoria mantidas continuamente sem esforco manual ou caos de planilhas.","Nunca mais corra atras de evidencias","Prova de auditoria automatizada e continua mapeada a cada controle.",{c1:"Fontes Automatizadas de Evidencias",c2:"Evidencias Manuais e Atestadas",i1:["Configuracoes de infraestrutura e sistema","Configuracoes e snapshots de servicos em nuvem","Controles de seguranca e acesso","Status de logs, monitoramento e backup","Relatorios de vulnerabilidade e postura"],i2:["Documentos de politica","Atestacoes de colaboradores e fornecedores","Aprovacoes de excecao e validacoes","Artefatos de auditoria externa","Historico versionado de mudancas"],rows:[{old:"Capturas e exports manuais",new:"Coleta automatizada e continua"},{old:"Evidencia desatualizada ou ausente",new:"Controle de atualidade e sempre atual"},{old:"Preparacao de auditoria leva semanas",new:"Evidencia pronta em minutos"},{old:"Caos em planilhas",new:"Pacotes estruturados para auditor"}]})
const EVIDENCE_ES = e("Evidencia","Demuestra cumplimiento automaticamente","Las auditorias fallan cuando faltan pruebas o estan desactualizadas. Elimina la corrida final.","Las auditorias fallan cuando faltan pruebas o estan desactualizadas.","Opticini Evidencia automatiza la recopilacion, organizacion y mantenimiento de evidencia lista para auditoria.","Que hace Evidencia","Prueba automatizada, actual y estructurada","Por que Evidencia importa","Del caos de capturas a evidencia estructurada","Recoleccion tradicional","Con Opticini Evidencia","Resultado","Evidencia lista para auditoria mantenida continuamente sin esfuerzo manual ni caos de hojas de calculo.","Nunca vuelvas a correr por evidencia","Prueba de auditoria automatizada y continua para cada control.",{c1:"Fuentes automatizadas de evidencia",c2:"Evidencia manual y atestada",i1:["Configuraciones de infraestructura y sistema","Configuraciones y snapshots cloud","Controles de seguridad y acceso","Estado de logs, monitoreo y respaldos","Reportes de vulnerabilidad y postura"],i2:["Documentos de politicas","Atestaciones de empleados y proveedores","Aprobaciones de excepciones y firmas","Artefactos de auditoria externa","Historial versionado de cambios"],rows:[{old:"Capturas y exportaciones manuales",new:"Recoleccion automatizada continua"},{old:"Evidencia desactualizada o faltante",new:"Evidencia siempre fresca y rastreada"},{old:"Preparar auditoria toma semanas",new:"Evidencia lista en minutos"},{old:"Caos de hojas de calculo",new:"Paquetes estructurados para auditor"}]})
const EVIDENCE_FR = e("Preuves","Prouver la conformite automatiquement","Les audits echouent quand les preuves sont manquantes, obsoletees ou incompletes. Supprimez la course finale.","Les audits echouent quand les preuves sont manquantes, obsoletees ou incompletes.","Opticini Preuves automatise la collecte, l'organisation et la maintenance de preuves pretes pour audit.","Ce que fait Preuves","Des preuves automatisees, a jour et structurees","Pourquoi les preuves comptent","Du chaos de captures a une preuve structuree","Collecte de preuves traditionnelle","Avec Opticini Preuves","Resultat","Des preuves d'audit maintenues en continu sans effort manuel ni chaos de tableurs.","Ne courez plus apres les preuves","Preuves d'audit automatisees et continues, mappees a chaque controle.",{c1:"Sources automatisees de preuves",c2:"Preuves manuelles et attestees",i1:["Configurations systeme et infrastructure","Parametres cloud et snapshots","Controles de securite et d'acces","Etat des logs, monitoring et sauvegardes","Rapports de vulnerabilites et posture"],i2:["Documents de politiques","Attestations employes et fournisseurs","Approbations d'exception et validations","Artefacts d'audit externe","Historique versionne des changements"],rows:[{old:"Captures et exports manuels",new:"Collecte automatisee continue"},{old:"Preuves manquantes ou perimees",new:"Fraicheur suivie et preuves toujours a jour"},{old:"Preparation d'audit en semaines",new:"Preuves pretes en minutes"},{old:"Chaos tableurs",new:"Packages structures prets auditeur"}]})
const EVIDENCE_DE = e("Nachweise","Compliance automatisch belegen","Audits scheitern bei fehlenden, veralteten oder unvollstandigen Nachweisen. Beenden Sie den Endspurt.","Audits scheitern bei fehlenden, veralteten oder unvollstandigen Nachweisen.","Opticini Nachweise automatisiert Erfassung, Strukturierung und Pflege auditfahiger Nachweise.","Was Nachweise leisten","Automatisierte, aktuelle und strukturierte Nachweise","Warum Nachweise wichtig sind","Vom Screenshot-Chaos zum strukturierten Nachweis","Traditionelle Nachweissammlung","Mit Opticini Nachweise","Ergebnis","Auditreife Nachweise werden kontinuierlich gepflegt ohne manuellen Aufwand oder Tabellenchaos.","Nie wieder Nachweise in letzter Minute sammeln","Kontinuierlicher automatisierter Auditnachweis fur jede Kontrolle.",{c1:"Automatisierte Nachweisquellen",c2:"Manuelle und attestierte Nachweise",i1:["System- und Infrastrukturkonfigurationen","Cloud-Einstellungen und Snapshots","Sicherheits- und Zugriffskontrollen","Status von Logs, Monitoring und Backups","Vulnerability- und Posture-Reports"],i2:["Policy-Dokumente","Mitarbeiter- und Lieferantenatteste","Ausnahmefreigaben und Sign-offs","Externe Audit-Artefakte","Versionierte Anderungshistorie"],rows:[{old:"Manuelle Screenshots und Exporte",new:"Automatisierte kontinuierliche Erfassung"},{old:"Veraltete oder fehlende Nachweise",new:"Frischegetrackt und immer aktuell"},{old:"Auditvorbereitung dauert Wochen",new:"Nachweise in Minuten bereit"},{old:"Tabellenchaos",new:"Strukturierte auditor-ready Pakete"}]})
const EVIDENCE_IT = e("Evidenze","Dimostra la conformita automaticamente","Gli audit falliscono quando le prove sono mancanti, obsolete o incomplete. Elimina la corsa finale.","Gli audit falliscono quando le prove sono mancanti, obsolete o incomplete.","Opticini Evidenze automatizza raccolta, organizzazione e manutenzione di evidenze pronte per audit.","Cosa fa Evidenze","Prove automatizzate, aggiornate e strutturate","Perche Evidenze conta","Dal caos di screenshot alla prova strutturata","Raccolta tradizionale evidenze","Con Opticini Evidenze","Risultato","Evidenze pronte per audit mantenute in continuo senza lavoro manuale o caos da fogli di calcolo.","Mai piu corsa alle evidenze","Prova audit automatizzata e continua, mappata a ogni controllo.",{c1:"Fonti automatizzate di evidenze",c2:"Evidenze manuali e attestate",i1:["Configurazioni sistema e infrastruttura","Impostazioni cloud e snapshot","Controlli di sicurezza e accesso","Stato log, monitoraggio e backup","Report vulnerabilita e postura"],i2:["Documenti di policy","Attestazioni di dipendenti e fornitori","Approvazioni eccezioni e firme","Artefatti audit esterni","Storico versionato dei cambiamenti"],rows:[{old:"Screenshot ed export manuali",new:"Raccolta automatizzata continua"},{old:"Evidenze mancanti o obsolete",new:"Tracciate e sempre aggiornate"},{old:"Preparazione audit in settimane",new:"Evidenze pronte in minuti"},{old:"Caos da spreadsheet",new:"Pacchetti strutturati per auditor"}]})
const EVIDENCE_RU = e("Доказательства","Подтверждайте соответствие автоматически","Аудит проваливается, когда доказательства отсутствуют, устарели или неполны. Уберите аврал.","Аудит проваливается, когда доказательства отсутствуют, устарели или неполны.","Opticini Доказательства автоматизирует сбор, организацию и поддержку материалов, готовых для аудита.","Что делает Evidence","Автоматические, актуальные и структурированные доказательства","Почему это важно","От хаоса скриншотов к структурированным доказательствам","Традиционный сбор доказательств","С Opticini Доказательства","Результат","Материалы для аудита поддерживаются непрерывно без ручной рутины и табличного хаоса.","Больше никакой спешки перед аудитом","Непрерывные автоматизированные доказательства для каждого контроля.",{c1:"Автоматизированные источники доказательств",c2:"Ручные и аттестованные доказательства",i1:["Конфигурации систем и инфраструктуры","Cloud-настройки и snapshot","Контроли безопасности и доступа","Статус логов, мониторинга и бэкапов","Отчеты по уязвимостям и posture"],i2:["Политики и документы","Аттестации сотрудников и вендоров","Одобрения исключений и sign-off","Артефакты внешнего аудита","Версионированная история изменений"],rows:[{old:"Ручные скриншоты и экспорты",new:"Автоматизированный непрерывный сбор"},{old:"Устаревшие или отсутствующие материалы",new:"Контроль актуальности и полноты"},{old:"Подготовка к аудиту неделями",new:"Готово за минуты"},{old:"Хаос в таблицах",new:"Структурированные пакеты для аудитора"}]})
const EVIDENCE_SV = e("Bevis","Bevisa efterlevnad automatiskt","Revisioner misslyckas nar bevis saknas, ar inaktuella eller ofullstandiga. Stoppa slutspurten.","Revisioner misslyckas nar bevis saknas, ar inaktuella eller ofullstandiga.","Opticini Bevis automatiserar insamling, organisering och underhall av revisionsfardiga bevis.","Vad Bevis gor","Automatiska, aktuella och strukturerade bevis","Varfor Bevis ar viktigt","Fran skarmdumpskaos till strukturerat bevis","Traditionell bevisinsamling","Med Opticini Bevis","Resultat","Revisionsredo bevis som underhalls kontinuerligt utan manuellt arbete eller kalkylbladskaos.","Sluta jaga bevis i sista stund","Kontinuerligt automatiserat revisionsbevis kopplat till varje kontroll.",{c1:"Automatiserade beviskallor",c2:"Manuella och attesterade bevis",i1:["System- och infrastrukturkonfigurationer","Molninstallningar och snapshots","Sakerhets- och atkomstkontroller","Status for loggning, monitorering och backup","Rapporter for sarbarhet och posture"],i2:["Policydokument","Attesteringar fran medarbetare och leverantorer","Undantagsgodkannanden och sign-off","Externa revisionsartefakter","Versionshanterad andringshistorik"],rows:[{old:"Manuella skarmdumpar och exporter",new:"Automatiserad kontinuerlig insamling"},{old:"Inaktuella eller saknade bevis",new:"Spårad aktualitet och alltid uppdaterat"},{old:"Revisionsforberedelse tar veckor",new:"Bevis klart pa minuter"},{old:"Kalkylbladskaos",new:"Strukturerade paket for revisor"}]})
const EVIDENCE_NO = e("Bevis","Dokumenter etterlevelse automatisk","Revisjoner feiler nar bevis mangler, er utdaterte eller ufullstendige. Fjern sluttspurten.","Revisjoner feiler nar bevis mangler, er utdaterte eller ufullstendige.","Opticini Bevis automatiserer innsamling, organisering og vedlikehold av revisjonsklare bevis.","Hva Bevis gjor","Automatiserte, oppdaterte og strukturerte bevis","Hvorfor Bevis er viktig","Fra skjermbildekaos til strukturert dokumentasjon","Tradisjonell bevisinnsamling","Med Opticini Bevis","Resultat","Revisjonsklare bevis vedlikeholdes kontinuerlig uten manuelt arbeid eller regnearkkaos.","Slutt a jage bevis i siste liten","Kontinuerlig automatisert revisjonsbevis koblet til hver kontroll.",{c1:"Automatiserte beviskilder",c2:"Manuelle og attesterte bevis",i1:["System- og infrastrukturkonfigurasjoner","Skyinnstillinger og snapshots","Sikkerhets- og tilgangskontroller","Status for logging, overvaking og backup","Rapporter for sarbarhet og posture"],i2:["Policydokumenter","Attestasjoner fra ansatte og leverandorer","Unntaksgodkjenninger og sign-off","Eksterne revisjonsartefakter","Versjonert endringshistorikk"],rows:[{old:"Manuelle skjermbilder og eksport",new:"Automatisert kontinuerlig innsamling"},{old:"Utdaterte eller manglende bevis",new:"Sporbar ferskhet og alltid oppdatert"},{old:"Revisjonsforberedelse tar uker",new:"Bevis klart pa minutter"},{old:"Regnearkkaos",new:"Strukturerte pakker for revisor"}]})
const EVIDENCE_DA = e("Bevis","Dokumenter compliance automatisk","Audits fejler nar bevis mangler, er foraldede eller ufuldstaendige. Fjern slutspurten.","Audits fejler nar bevis mangler, er foraldede eller ufuldstaendige.","Opticini Bevis automatiserer indsamling, organisering og vedligehold af audit-klare beviser.","Hvad Bevis gor","Automatiserede, opdaterede og strukturerede beviser","Hvorfor Bevis er vigtigt","Fra screenshot-kaos til struktureret bevis","Traditionel bevisindsamling","Med Opticini Bevis","Resultat","Audit-klare beviser vedligeholdes kontinuerligt uden manuelt arbejde eller regnearkskaos.","Stop med at jage beviser i sidste ojeblik","Kontinuerligt automatiseret audit-bevis knyttet til hver kontrol.",{c1:"Automatiserede beviskilder",c2:"Manuelle og attesterede beviser",i1:["System- og infrastrukturkonfigurationer","Cloud-indstillinger og snapshots","Sikkerheds- og adgangskontroller","Status for logging, overvagning og backup","Rapporter for sarbarhed og posture"],i2:["Politikdokumenter","Attesteringer fra medarbejdere og leverandorer","Undtagelsesgodkendelser og sign-off","Eksterne audit-artefakter","Versioneret andringshistorik"],rows:[{old:"Manuelle screenshots og eksporter",new:"Automatiseret kontinuerlig indsamling"},{old:"Foraldede eller manglende beviser",new:"Sporbar friskhed og altid opdateret"},{old:"Audit-forberedelse tager uger",new:"Beviser klar pa minutter"},{old:"Regnearkskaos",new:"Strukturerede pakker til auditor"}]})
const EVIDENCE_ZH = e("证据","自动证明合规","当证据缺失、过期或不完整时，审计就会失败。告别临时救火。","当证据缺失、过期或不完整时，审计就会失败。","Opticini 证据自动化收集、组织并持续维护可审计证据，确保材料始终最新。","证据能力","自动化、最新且结构化的审计证明","为什么证据重要","从截图混乱到结构化证据","传统证据收集方式","使用 Opticini 证据","结果","持续维护审计就绪证据，无需手工操作或表格混乱。","不再为证据临时冲刺","持续自动化审计证据，映射到每项控制。",{c1:"自动化证据来源",c2:"人工与证明型证据",i1:["系统与基础设施配置","云服务设置与快照","安全与访问控制","日志、监控与备份状态","漏洞与姿态报告"],i2:["策略文档","员工与供应商声明","例外审批与签核","外部审计工件","版本化变更历史"],rows:[{old:"手工截图与导出",new:"自动化持续收集"},{old:"证据过期或缺失",new:"可追踪新鲜度并始终最新"},{old:"审计准备需要数周",new:"几分钟内证据就绪"},{old:"表格混乱",new:"结构化审计包"}]})
const EVIDENCE_JA = e("証跡","コンプライアンスを自動で証明","証跡が欠落・陳腐化・不完全だと監査は失敗します。直前対応をなくしましょう。","証跡が欠落・陳腐化・不完全だと監査は失敗します。","Opticini 証跡は監査対応証跡の収集・整理・維持を自動化し、常に最新状態を保ちます。","証跡が行うこと","自動化され、常に最新で構造化された証明","なぜ証跡が重要か","スクリーンショット混乱から構造化証跡へ","従来の証跡収集","Opticini 証跡あり","結果","手作業や表計算の混乱なしに、監査準備済み証跡を継続維持。","証跡集めの土壇場対応を終わらせる","各コントロールに紐づく継続自動化監査証跡。",{c1:"自動化された証跡ソース",c2:"手動・宣誓型証跡",i1:["システム/インフラ構成","クラウド設定とスナップショット","セキュリティ/アクセス統制","ログ・監視・バックアップ状態","脆弱性/姿勢レポート"],i2:["ポリシー文書","従業員/ベンダーの宣誓","例外承認とサインオフ","外部監査アーティファクト","変更履歴のバージョン管理"],rows:[{old:"手動スクリーンショットとエクスポート",new:"自動継続収集"},{old:"古い/欠落した証跡",new:"鮮度追跡で常に最新"},{old:"監査準備に数週間",new:"数分で証跡準備完了"},{old:"表計算の混乱",new:"監査人向け構造化パッケージ"}]})
const EVIDENCE_KO = e("증적","컴플라이언스를 자동으로 증명","증적이 없거나 오래되었거나 불완전하면 감사는 실패합니다. 막판 수습을 없애세요.","증적이 없거나 오래되었거나 불완전하면 감사는 실패합니다.","Opticini 증적은 감사 준비 증적의 수집, 정리, 유지 관리를 자동화하여 항상 최신 상태를 보장합니다.","증적이 하는 일","자동화되고 최신이며 구조화된 감사 증명","왜 증적이 중요한가","스크린샷 혼란에서 구조화된 증적으로","기존 증적 수집 방식","Opticini 증적 사용","결과","수작업과 스프레드시트 혼란 없이 감사 준비 증적을 지속 유지.","증적 때문에 더 이상 막판 전쟁 없음","모든 통제 항목에 매핑된 지속 자동화 감사 증적.",{c1:"자동화 증적 소스",c2:"수동 및 확인(Attested) 증적",i1:["시스템/인프라 구성","클라우드 설정 및 스냅샷","보안/접근 통제","로그/모니터링/백업 상태","취약점/보안 posture 보고서"],i2:["정책 문서","직원/공급업체 확인서","예외 승인 및 사인오프","외부 감사 아티팩트","버전 관리된 변경 이력"],rows:[{old:"수동 스크린샷/내보내기",new:"자동화된 지속 수집"},{old:"오래되거나 누락된 증적",new:"신선도 추적으로 항상 최신"},{old:"감사 준비에 수주 소요",new:"몇 분 내 증적 준비"},{old:"스프레드시트 혼란",new:"감사자용 구조화 패키지"}]})
const EVIDENCE_HI = e("साक्ष्य","अनुपालन को स्वतः सिद्ध करें","जब प्रमाण गायब, पुराने या अधूरे हों तो ऑडिट असफल होता है। अंतिम समय की भागदौड़ खत्म करें।","जब प्रमाण गायब, पुराने या अधूरे हों तो ऑडिट असफल होता है।","Opticini साक्ष्य ऑडिट-तैयार प्रमाण की संग्रह, संगठन और रखरखाव को स्वचालित करता है।","साक्ष्य क्या करता है","स्वचालित, अद्यतन और संरचित प्रमाण","साक्ष्य क्यों महत्वपूर्ण है","स्क्रीनशॉट अराजकता से संरचित प्रमाण तक","पारंपरिक साक्ष्य संग्रह","Opticini साक्ष्य के साथ","परिणाम","मैन्युअल मेहनत और स्प्रेडशीट अराजकता के बिना लगातार ऑडिट-तैयार प्रमाण।","अब साक्ष्य के लिए भागदौड़ नहीं","हर नियंत्रण से मैप्ड निरंतर स्वचालित ऑडिट प्रमाण।",{c1:"स्वचालित साक्ष्य स्रोत",c2:"मैन्युअल और सत्यापित (Attested) साक्ष्य",i1:["सिस्टम और इन्फ्रास्ट्रक्चर कॉन्फ़िगरेशन","क्लाउड सेटिंग्स और स्नैपशॉट","सुरक्षा और एक्सेस नियंत्रण","लॉगिंग, मॉनिटरिंग और बैकअप स्थिति","कमजोरी और posture रिपोर्ट"],i2:["नीति दस्तावेज","कर्मचारी और विक्रेता प्रमाणन","अपवाद अनुमोदन और साइन-ऑफ","बाहरी ऑडिट आर्टिफैक्ट","संस्करणित परिवर्तन इतिहास"],rows:[{old:"मैन्युअल स्क्रीनशॉट और एक्सपोर्ट",new:"स्वचालित निरंतर संग्रह"},{old:"पुराना या गायब प्रमाण",new:"ताजगी-ट्रैक और हमेशा अद्यतन"},{old:"ऑडिट तैयारी में हफ्ते",new:"मिनटों में प्रमाण तैयार"},{old:"स्प्रेडशीट अराजकता",new:"संरचित ऑडिटर-रेडी पैकेज"}]})
const EVIDENCE_AR = e("الادلة","اثبت الامتثال تلقائيا","تفشل عمليات التدقيق عندما تكون الادلة مفقودة او قديمة او غير مكتملة. انهِ سباق اللحظات الاخيرة.","تفشل عمليات التدقيق عندما تكون الادلة مفقودة او قديمة او غير مكتملة.","Opticini الادلة يؤتمت جمع وتنظيم وصيانة الادلة الجاهزة للتدقيق لتبقى دائما محدثة.","ماذا تفعل الادلة","اثباتات مؤتمتة ومحدثة ومنظمة","لماذا الادلة مهمة","من فوضى لقطات الشاشة الى دليل منظم","جمع ادلة تقليدي","مع Opticini الادلة","النتيجة","ادلة جاهزة للتدقيق تُحافظ عليها بشكل مستمر دون جهد يدوي او فوضى الجداول.","لن تركض خلف الادلة مرة اخرى","اثبات تدقيق مؤتمت ومستمر مرتبط بكل ضابط.",{c1:"مصادر ادلة مؤتمتة",c2:"ادلة يدوية ومُقَرّة",i1:["تهيئات النظام والبنية التحتية","اعدادات السحابة واللقطات","ضوابط الامن والوصول","حالة السجلات والمراقبة والنسخ الاحتياطي","تقارير الثغرات وposture"],i2:["وثائق السياسات","اقرارات الموظفين والموردين","اعتمادات الاستثناءات والتوقيعات","مصنوعات تدقيق خارجية","سجل تغييرات مُرقمن"],rows:[{old:"لقطات وتصديرات يدوية",new:"جمع مؤتمت ومستمر"},{old:"ادلة قديمة او مفقودة",new:"تتبع حداثة وادلة محدثة دائما"},{old:"التحضير للتدقيق يستغرق اسابيع",new:"الادلة جاهزة خلال دقائق"},{old:"فوضى جداول",new:"حزم منظمة جاهزة للمدقق"}]})
const EVIDENCE_HE = e("ראיות","הוכחת תאימות באופן אוטומטי","ביקורות נכשלות כשהראיות חסרות, מיושנות או לא מלאות. הפסיקו את מרוץ הרגע האחרון.","ביקורות נכשלות כשהראיות חסרות, מיושנות או לא מלאות.","Opticini ראיות מאוטומט את איסוף, ארגון ותחזוקת הראיות המוכנות לביקורת כך שהן תמיד עדכניות.","מה ראיות עושה","הוכחות אוטומטיות, עדכניות ומובנות","למה ראיות חשובות","מכאוס צילומי מסך לראיות מובנות","איסוף ראיות מסורתי","עם Opticini ראיות","תוצאה","ראיות מוכנות לביקורת נשמרות ברצף ללא מאמץ ידני או כאוס גיליונות.","לא לרדוף יותר אחרי ראיות","הוכחת ביקורת אוטומטית ורציפה לכל בקר.",{c1:"מקורות ראיות אוטומטיים",c2:"ראיות ידניות ומאומתות",i1:["תצורות מערכת ותשתית","הגדרות ענן וסנאפשוטים","בקרות אבטחה וגישה","מצב לוגים, ניטור וגיבוי","דוחות פגיעויות ו-posture"],i2:["מסמכי מדיניות","אישורי עובדים וספקים","אישורי חריגה וחתימות","ארטיפקטים מביקורת חיצונית","היסטוריית שינויים מנוהלת גרסאות"],rows:[{old:"צילומי מסך וייצוא ידני",new:"איסוף אוטומטי רציף"},{old:"ראיות מיושנות או חסרות",new:"מעקב טריות ועדכון תמידי"},{old:"הכנת ביקורת אורכת שבועות",new:"ראיות מוכנות בתוך דקות"},{old:"כאוס בגיליונות",new:"חבילות מובנות מוכנות למבקר"}]})

export const EVIDENCE_PAGE_PATCH_BY_LANG: Record<string, EvidencePagePatch> = {
  en: { features: { evidence: EVIDENCE_EN } },
  es: { features: { evidence: EVIDENCE_ES } },
  fr: { features: { evidence: EVIDENCE_FR } },
  de: { features: { evidence: EVIDENCE_DE } },
  it: { features: { evidence: EVIDENCE_IT } },
  pt: { features: { evidence: EVIDENCE_PT } },
  ru: { features: { evidence: EVIDENCE_RU } },
  sv: { features: { evidence: EVIDENCE_SV } },
  no: { features: { evidence: EVIDENCE_NO } },
  da: { features: { evidence: EVIDENCE_DA } },
  zh: { features: { evidence: EVIDENCE_ZH } },
  ja: { features: { evidence: EVIDENCE_JA } },
  ko: { features: { evidence: EVIDENCE_KO } },
  hi: { features: { evidence: EVIDENCE_HI } },
  ar: { features: { evidence: EVIDENCE_AR } },
  he: { features: { evidence: EVIDENCE_HE } },
}
