import type { FeatureDetailConfig } from "@/components/feature-detail-page"

type ChangeI18nPayload = Omit<FeatureDetailConfig, "colors">
type ChangePagePatch = { features: { change: ChangeI18nPayload } }

function ch(
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
  cards: { c1: string; c2: string; c3: string; c4: string; c5: string; i1: string[]; i2: string[]; s3: string; s4: string; s5: string; rows: { old: string; new: string }[] }
): ChangeI18nPayload {
  return {
    title,
    subtitle,
    tagline,
    planeNum: 8,
    stats: [
      { value: "Real-time", label: "change detection" },
      { value: "Full", label: "change timeline" },
      { value: "Correlated", label: "to incidents" },
      { value: "Faster", label: "root cause analysis" },
    ],
    posStrong,
    posBody,
    sectionLabel,
    sectionTitle,
    cards: [
      { icon: "🖥️", title: cards.c1, items: cards.i1 },
      { icon: "🚀", title: cards.c2, items: cards.i2 },
      { icon: "👤", title: cards.c3, sub: cards.s3 },
      { icon: "🎯", title: cards.c4, sub: cards.s4 },
      { icon: "📋", title: cards.c5, sub: cards.s5 },
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

const CHANGE_EN = ch(
  "Change",
  "Know what changed and why it matters",
  "Every outage, breach, or compliance failure starts with a change.",
  "Every outage, breach, or compliance failure starts with a change.",
  "Opticini Change gives complete visibility into infrastructure, configuration, and deployment changes with impact context.",
  "What Change Tracks",
  "From scattered logs to one correlated change history",
  "Why Change Matters",
  "From unknown root causes to clear accountability",
  "Without change visibility",
  "With Opticini Change",
  "Outcome",
  "Clear accountability, faster incident resolution, and safer changes for every team.",
  "Bring clarity to change",
  "Stop guessing what changed. Start knowing with full context and compliance impact.",
  {
    c1: "Infrastructure and Configuration Changes",
    c2: "Platform and Application Changes",
    c3: "Author and Source",
    c4: "Impact and Blast Radius",
    c5: "Compliance Impact",
    i1: [
      "System and OS changes",
      "Configuration updates",
      "Network and firewall rule changes",
      "Cloud resource modifications",
    ],
    i2: [
      "Deployments and releases",
      "Infrastructure as code updates",
      "CI/CD pipeline executions",
      "Version and schema changes",
    ],
    s3: "Every change shows who made it and from where: human, automated, or pipeline-driven.",
    s4: "Affected assets, related incidents, and estimated impact scope before deep investigation.",
    s5: "Security and compliance implications of each change, mapped to relevant frameworks and controls.",
    rows: [
      { old: "Unknown root causes", new: "Clear change accountability" },
      { old: "Slow incident resolution", new: "Faster root cause analysis" },
      { old: "Hidden risky changes", new: "Early risk detection per change" },
      { old: "Audit change-control gaps", new: "Verified change-control history" },
    ],
  }
)

const CHANGE_PT = ch("Mudanca","Saiba o que mudou e por que importa","Toda indisponibilidade, violacao ou falha de compliance comeca com uma mudanca.","Toda indisponibilidade, violacao ou falha de compliance comeca com uma mudanca.","O plano de Mudanca do Opticini oferece visibilidade completa sobre mudancas de infraestrutura, configuracao e deploy com contexto de impacto.","O que Mudanca rastreia","De logs dispersos para um historico unico e correlacionado","Por que Mudanca importa","De causa raiz desconhecida para responsabilidade clara","Sem visibilidade de mudancas","Com Opticini Mudanca","Resultado","Responsabilidade clara, resolucao de incidentes mais rapida e mudancas mais seguras para todos os times.","Traga clareza para cada mudanca","Pare de adivinhar o que mudou. Entenda com contexto completo e impacto de compliance.",{c1:"Mudancas de Infraestrutura e Configuracao",c2:"Mudancas de Plataforma e Aplicacao",c3:"Autor e Origem",c4:"Impacto e Raio de Efeito",c5:"Impacto de Compliance",i1:["Mudancas de sistema e SO","Atualizacoes de configuracao","Mudancas de regras de rede e firewall","Modificacoes em recursos de nuvem"],i2:["Deploys e releases","Atualizacoes de infraestrutura como codigo","Execucoes de pipeline CI/CD","Mudancas de versao e schema"],s3:"Cada mudanca mostra quem fez e de onde veio: humano, automatizado ou via pipeline.",s4:"Ativos afetados, incidentes relacionados e escopo estimado de impacto antes da investigacao profunda.",s5:"Implicacoes de seguranca e compliance de cada mudanca, mapeadas a frameworks e controles relevantes.",rows:[{old:"Causas raiz desconhecidas",new:"Responsabilidade clara por mudancas"},{old:"Resolucao lenta de incidentes",new:"Analise de causa raiz mais rapida"},{old:"Mudancas arriscadas ocultas",new:"Deteccao antecipada de risco por mudanca"},{old:"Lacunas em controle de mudanca para auditoria",new:"Historico verificado de controle de mudancas"}]})
const CHANGE_ES = ch("Cambio","Sepa que cambio y por que importa","Toda caida, brecha o fallo de cumplimiento empieza con un cambio.","Toda caida, brecha o fallo de cumplimiento empieza con un cambio.","Opticini Cambio da visibilidad completa de cambios de infraestructura, configuracion y despliegues con contexto de impacto.","Que rastrea Cambio","De logs dispersos a historial de cambios correlacionado","Por que Cambio importa","De causa raiz desconocida a responsabilidad clara","Sin visibilidad de cambios","Con Opticini Cambio","Resultado","Responsabilidad clara, resolucion de incidentes mas rapida y cambios mas seguros para todos los equipos.","Aporta claridad al cambio","Deja de adivinar que cambio. Entiendelo con contexto completo e impacto de cumplimiento.",{c1:"Cambios de infraestructura y configuracion",c2:"Cambios de plataforma y aplicacion",c3:"Autor y origen",c4:"Impacto y radio de afectacion",c5:"Impacto de cumplimiento",i1:["Cambios de sistema y SO","Actualizaciones de configuracion","Cambios de reglas de red y firewall","Modificaciones de recursos cloud"],i2:["Despliegues y releases","Actualizaciones de IaC","Ejecuciones de pipelines CI/CD","Cambios de version y esquema"],s3:"Cada cambio muestra quien lo hizo y desde donde: humano, automatizado o pipeline.",s4:"Activos afectados, incidentes relacionados y alcance estimado antes del analisis profundo.",s5:"Implicaciones de seguridad y cumplimiento por cambio, mapeadas a controles y marcos relevantes.",rows:[{old:"Causas raiz desconocidas",new:"Responsabilidad de cambio clara"},{old:"Resolucion lenta de incidentes",new:"Analisis de causa raiz mas rapido"},{old:"Cambios riesgosos ocultos",new:"Deteccion temprana de riesgo por cambio"},{old:"Brechas en control de cambios para auditoria",new:"Historial verificado de control de cambios"}]})
const CHANGE_FR = ch("Changement","Savoir ce qui a change et pourquoi","Chaque panne, breach ou echec de conformite commence par un changement.","Chaque panne, breach ou echec de conformite commence par un changement.","Opticini Changement donne une visibilite complete des changements infra, configuration et deploiement avec contexte d'impact.","Ce que Changement suit","Des logs disperses a un historique corrle des changements","Pourquoi Changement compte","De cause racine inconnue a responsabilite claire","Sans visibilite des changements","Avec Opticini Changement","Resultat","Responsabilite claire, resolution d'incident plus rapide et changements plus surs pour toutes les equipes.","Apportez de la clarte aux changements","Arretez de deviner ce qui a change. Sachez-le avec contexte complet et impact conformite.",{c1:"Changements infra et configuration",c2:"Changements plateforme et application",c3:"Auteur et source",c4:"Impact et rayon d'effet",c5:"Impact conformite",i1:["Changements systeme et OS","Mises a jour de configuration","Changements de regles reseau/firewall","Modifications de ressources cloud"],i2:["Deploiements et releases","Mises a jour IaC","Executions pipeline CI/CD","Changements de version et schema"],s3:"Chaque changement indique qui l'a fait et d'ou il vient: humain, automatise ou pipeline.",s4:"Actifs affectes, incidents lies et perimetre d'impact estime avant investigation detaillee.",s5:"Implications securite et conformite de chaque changement, mappees aux controles et frameworks pertinents.",rows:[{old:"Causes racines inconnues",new:"Responsabilite de changement claire"},{old:"Resolution d'incident lente",new:"Analyse cause racine plus rapide"},{old:"Changements risques caches",new:"Detection precoce du risque par changement"},{old:"Lacunes de controle des changements en audit",new:"Historique de controle des changements verifie"}]})
const CHANGE_DE = ch("Anderung","Wissen was sich geandert hat und warum","Jeder Ausfall, Sicherheitsvorfall oder Compliance-Fehler beginnt mit einer Anderung.","Jeder Ausfall, Sicherheitsvorfall oder Compliance-Fehler beginnt mit einer Anderung.","Opticini Anderung bietet volle Sicht auf Infrastruktur-, Konfigurations- und Deployment-Anderungen mit Impact-Kontext.","Was Anderung verfolgt","Von verteilten Logs zu einer korrelierten Anderungshistorie","Warum Anderung wichtig ist","Von unbekannter Ursache zu klarer Verantwortlichkeit","Ohne Anderungs-Sichtbarkeit","Mit Opticini Anderung","Ergebnis","Klare Verantwortlichkeit, schnellere Incident-Losung und sicherere Anderungen in allen Teams.","Bringen Sie Klarheit in Anderungen","Raten Sie nicht mehr was sich geandert hat. Wissen Sie es mit vollem Kontext und Compliance-Impact.",{c1:"Infrastruktur- und Konfigurationsanderungen",c2:"Plattform- und Applikationsanderungen",c3:"Autor und Quelle",c4:"Impact und Blast Radius",c5:"Compliance-Impact",i1:["System- und OS-Anderungen","Konfigurationsupdates","Netzwerk- und Firewallregel-Anderungen","Cloud-Ressourcenmodifikationen"],i2:["Deployments und Releases","IaC-Updates","CI/CD-Pipeline-Ausfuhrungen","Versions- und Schemaanderungen"],s3:"Jede Anderung zeigt wer sie gemacht hat und woher: Mensch, Automation oder Pipeline.",s4:"Betroffene Assets, verknupfte Incidents und geschatzter Wirkungsbereich vor tiefer Analyse.",s5:"Sicherheits- und Compliance-Auswirkungen jeder Anderung, gemappt auf relevante Frameworks und Kontrollen.",rows:[{old:"Unbekannte Ursachen",new:"Klare Anderungsverantwortlichkeit"},{old:"Langsame Incident-Behebung",new:"Schnellere Root-Cause-Analyse"},{old:"Versteckte riskante Anderungen",new:"Fruhe Risikoerkennung pro Anderung"},{old:"Audit-Lucken im Change-Control",new:"Verifizierte Change-Control-Historie"}]})
const CHANGE_IT = ch("Modifica","Sapere cosa e cambiato e perche conta","Ogni disservizio, violazione o fallimento compliance inizia con una modifica.","Ogni disservizio, violazione o fallimento compliance inizia con una modifica.","Opticini Modifica offre visibilita completa su cambiamenti infra, configurazione e deploy con contesto d'impatto.","Cosa traccia Modifica","Da log dispersi a cronologia cambi correlata","Perche Modifica conta","Da causa radice ignota a responsabilita chiara","Senza visibilita dei cambi","Con Opticini Modifica","Risultato","Responsabilita chiara, risoluzione incident piu rapida e modifiche piu sicure per tutti i team.","Porta chiarezza nelle modifiche","Smetti di indovinare cosa e cambiato. Sapilo con contesto completo e impatto compliance.",{c1:"Modifiche infrastruttura e configurazione",c2:"Modifiche piattaforma e applicazione",c3:"Autore e origine",c4:"Impatto e blast radius",c5:"Impatto compliance",i1:["Modifiche sistema e OS","Aggiornamenti configurazione","Modifiche regole rete/firewall","Modifiche risorse cloud"],i2:["Deploy e release","Aggiornamenti IaC","Esecuzioni pipeline CI/CD","Modifiche versione e schema"],s3:"Ogni modifica mostra chi l'ha fatta e da dove: umano, automatizzato o pipeline.",s4:"Asset coinvolti, incident correlati e portata d'impatto stimata prima dell'analisi approfondita.",s5:"Implicazioni di sicurezza e compliance di ogni modifica, mappate su framework e controlli rilevanti.",rows:[{old:"Cause radice sconosciute",new:"Responsabilita delle modifiche chiara"},{old:"Risoluzione incident lenta",new:"Analisi causa radice piu veloce"},{old:"Modifiche rischiose nascoste",new:"Rilevamento precoce rischio per modifica"},{old:"Lacune audit nel change control",new:"Storico change control verificato"}]})
const CHANGE_RU = ch("Изменения","Знайте что изменилось и почему это важно","Каждый сбой, инцидент безопасности или провал соответствия начинается с изменения.","Каждый сбой, инцидент безопасности или провал соответствия начинается с изменения.","Opticini Изменения дает полную видимость изменений инфраструктуры, конфигурации и деплоя с контекстом влияния.","Что отслеживает Изменения","От разрозненных логов к единой коррелированной истории изменений","Почему это важно","От неизвестной причины к понятной ответственности","Без видимости изменений","С Opticini Изменения","Результат","Понятная ответственность, более быстрое устранение инцидентов и более безопасные изменения для всех команд.","Добавьте ясность в изменения","Хватит гадать, что изменилось. Знайте это с полным контекстом и impact для compliance.",{c1:"Изменения инфраструктуры и конфигурации",c2:"Изменения платформы и приложений",c3:"Автор и источник",c4:"Impact и blast radius",c5:"Impact для compliance",i1:["Изменения системы и ОС","Обновления конфигурации","Изменения сетевых/фаервол правил","Изменения cloud-ресурсов"],i2:["Деплои и релизы","Обновления IaC","Запуски CI/CD pipeline","Изменения версии и схемы"],s3:"Каждое изменение показывает кто и откуда: человек, автоматизация или pipeline.",s4:"Затронутые активы, связанные инциденты и оценка зоны воздействия до глубокого анализа.",s5:"Влияние на безопасность и соответствие по каждому изменению, связанное с нужными framework и контролями.",rows:[{old:"Неизвестные root cause",new:"Ясная ответственность за изменения"},{old:"Медленное устранение инцидентов",new:"Более быстрый root cause анализ"},{old:"Скрытые рискованные изменения",new:"Раннее выявление риска по изменению"},{old:"Пробелы в change-control для аудита",new:"Проверенная история change-control"}]})
const CHANGE_SV = ch("Andring","Vet vad som andrades och varfor det spelar roll","Varje avbrott, intrang eller compliance-fel borjar med en andring.","Varje avbrott, intrang eller compliance-fel borjar med en andring.","Opticini Andring ger full synlighet i infrastruktur-, konfigurations- och deployandringar med impact-kontext.","Vad Andring sparar","Fran spridda loggar till en korrelerad andringshistorik","Varfor Andring ar viktigt","Fran okand rotorsak till tydligt ansvar","Utan andringssynlighet","Med Opticini Andring","Resultat","Tydligt ansvar, snabbare incidentlosning och sakrare andringar for alla team.","Skapa klarhet i andringar","Sluta gissa vad som andrades. Vet med full kontext och compliance-impact.",{c1:"Infrastruktur- och konfigurationsandringar",c2:"Plattforms- och applikationsandringar",c3:"Forfattare och kalla",c4:"Impact och blast radius",c5:"Compliance-impact",i1:["System- och OS-andringar","Konfigurationsuppdateringar","Andringar i natverks- och brandvaggsregler","Andringar i molnresurser"],i2:["Deployments och releaser","IaC-uppdateringar","CI/CD-pipelinekorningar","Versions- och schemaandringar"],s3:"Varje andring visar vem som gjorde den och varifran: manuell, automatiserad eller pipeline.",s4:"Berorda tillgangar, relaterade incidenter och uppskattad paverkan innan djupanalys.",s5:"Sakerhets- och compliance-implikationer per andring, mappade mot relevanta ramverk och kontroller.",rows:[{old:"Okanda rotorsaker",new:"Tydlig andringsansvarighet"},{old:"Langsam incidentlosning",new:"Snabbare rotorsaksanalys"},{old:"Dolda riskabla andringar",new:"Tidig riskdetektion per andring"},{old:"Auditluckor i change-control",new:"Verifierad change-control-historik"}]})
const CHANGE_NO = ch("Endring","Vit hva som endret seg og hvorfor det betyr noe","Hver nedetid, sikkerhetshendelse eller compliance-feil starter med en endring.","Hver nedetid, sikkerhetshendelse eller compliance-feil starter med en endring.","Opticini Endring gir full synlighet i infrastruktur-, konfigurasjons- og deployendringer med impact-kontekst.","Hva Endring sporer","Fra spredte logger til en korrelert endringshistorikk","Hvorfor Endring er viktig","Fra ukjent rotarsak til tydelig ansvar","Uten endringssynlighet","Med Opticini Endring","Resultat","Tydelig ansvar, raskere hendelseslosning og tryggere endringer for alle team.","Skap klarhet i endringer","Slutt a gjette hva som endret seg. Vit med full kontekst og compliance-impact.",{c1:"Infrastruktur- og konfigurasjonsendringer",c2:"Plattform- og applikasjonsendringer",c3:"Forfatter og kilde",c4:"Impact og blast radius",c5:"Compliance-impact",i1:["System- og OS-endringer","Konfigurasjonsoppdateringer","Endringer i nettverks- og brannmurregler","Endringer i skyressurser"],i2:["Deployer og releaser","IaC-oppdateringer","Kjoringer i CI/CD-pipeline","Versjons- og skjemaendringer"],s3:"Hver endring viser hvem som gjorde den og hvorfra: menneske, automatisering eller pipeline.",s4:"Berorte eiendeler, relaterte hendelser og estimert paverkningsomfang for dypanalyse.",s5:"Sikkerhets- og compliance-konsekvenser per endring, mappet til relevante rammeverk og kontroller.",rows:[{old:"Ukjente rotarsaker",new:"Tydelig endringsansvar"},{old:"Treg hendelseslosning",new:"Raskere rotarsaksanalyse"},{old:"Skjulte risikable endringer",new:"Tidlig risikodeteksjon per endring"},{old:"Audit-gap i change-control",new:"Verifisert change-control-historikk"}]})
const CHANGE_DA = ch("Aendring","Vid hvad der aendrede sig og hvorfor det betyder noget","Hver nedetid, sikkerhedshændelse eller compliance-fejl starter med en aendring.","Hver nedetid, sikkerhedshændelse eller compliance-fejl starter med en aendring.","Opticini Aendring giver fuld synlighed i infrastruktur-, konfigurations- og deployment-aendringer med impact-kontekst.","Hvad Aendring sporer","Fra spredte logs til en korreleret aendringshistorik","Hvorfor Aendring er vigtig","Fra ukendt root cause til tydeligt ansvar","Uden aendringssynlighed","Med Opticini Aendring","Resultat","Tydeligt ansvar, hurtigere incidentlosning og sikrere aendringer for alle teams.","Skab klarhed i aendringer","Stop med at gaette hvad der aendrede sig. Vid det med fuld kontekst og compliance-impact.",{c1:"Infrastruktur- og konfigurationsaendringer",c2:"Platform- og applikationsaendringer",c3:"Forfatter og kilde",c4:"Impact og blast radius",c5:"Compliance-impact",i1:["System- og OS-aendringer","Konfigurationsopdateringer","Aendringer i netvaerks- og firewallregler","Aendringer i cloud-ressourcer"],i2:["Deployments og releases","IaC-opdateringer","CI/CD-pipelinekorsler","Versions- og schemaaendringer"],s3:"Hver aendring viser hvem der lavede den og hvorfra: menneske, automatiseret eller pipeline.",s4:"Berorte aktiver, relaterede incidents og estimeret impact-omfang for dybanalyse.",s5:"Sikkerheds- og compliance-konsekvenser for hver aendring, mappet til relevante framework og kontroller.",rows:[{old:"Ukendte root causes",new:"Tydeligt aendringsansvar"},{old:"Langsom incidentlosning",new:"Hurtigere root cause analyse"},{old:"Skjulte risikable aendringer",new:"Tidlig risikodetektion per aendring"},{old:"Audit-gaps i change-control",new:"Verificeret change-control historik"}]})
const CHANGE_ZH = ch("变更","知道变了什么，以及为什么重要","每一次宕机、泄露或合规失败，往往都始于一次变更。","每一次宕机、泄露或合规失败，往往都始于一次变更。","Opticini 变更提供基础设施、配置和发布变更的完整可视化，并附带影响上下文。","变更追踪内容","从分散日志到统一关联的变更历史","为什么变更重要","从未知根因到清晰责任","没有变更可视化","使用 Opticini 变更","结果","责任清晰、事件处置更快、变更更安全，覆盖所有团队。","让变更更清晰","别再猜测发生了什么变更。用完整上下文和合规影响来确认。",{c1:"基础设施与配置变更",c2:"平台与应用变更",c3:"作者与来源",c4:"影响与波及范围",c5:"合规影响",i1:["系统与操作系统变更","配置更新","网络与防火墙规则变更","云资源修改"],i2:["部署与发布","基础设施即代码更新","CI/CD 流水线执行","版本与模式变更"],s3:"每次变更都会显示谁做的、从哪里来的：人工、自动化或流水线。",s4:"在深度排查前先看到受影响资产、相关事件与预估影响范围。",s5:"每次变更的安全与合规影响映射到相关框架与控制项。",rows:[{old:"根因不明确",new:"变更责任清晰"},{old:"事件处置缓慢",new:"根因分析更快"},{old:"高风险变更被隐藏",new:"按变更提前发现风险"},{old:"审计中的变更控制缺口",new:"可验证的变更控制历史"}]})
const CHANGE_JA = ch("変更","何が変わり、なぜ重要かを把握","すべての障害・侵害・コンプライアンス失敗は、変更から始まります。","すべての障害・侵害・コンプライアンス失敗は、変更から始まります。","Opticini 変更は、インフラ・設定・デプロイ変更を影響コンテキスト付きで可視化します。","変更で追跡すること","散在するログから相関された変更履歴へ","なぜ重要か","不明な根本原因から明確な責任へ","変更可視化なし","Opticini 変更あり","結果","責任の明確化、インシデント解決の高速化、より安全な変更を全チームで実現。","変更に明確さを","何が変わったかを推測せず、完全な文脈とコンプライアンス影響で把握しましょう。",{c1:"インフラ/設定変更",c2:"プラットフォーム/アプリ変更",c3:"作成者とソース",c4:"影響と blast radius",c5:"コンプライアンス影響",i1:["システム/OS 変更","設定更新","ネットワーク/Firewall ルール変更","クラウド資源の変更"],i2:["デプロイとリリース","IaC 更新","CI/CD パイプライン実行","バージョン/スキーマ変更"],s3:"各変更に、誰がどこから実施したかを表示（人手・自動化・パイプライン）。",s4:"深掘り前に、影響資産・関連インシデント・推定影響範囲を把握。",s5:"各変更のセキュリティ/コンプライアンス影響を関連 framework と control にマッピング。",rows:[{old:"根本原因が不明",new:"変更責任が明確"},{old:"インシデント解決が遅い",new:"根本原因分析が高速化"},{old:"高リスク変更が見えない",new:"変更ごとに早期リスク検知"},{old:"監査時の change-control ギャップ",new:"検証可能な change-control 履歴"}]})
const CHANGE_KO = ch("변경","무엇이 바뀌었고 왜 중요한지 파악","모든 장애, 침해, 컴플라이언스 실패는 변경에서 시작됩니다.","모든 장애, 침해, 컴플라이언스 실패는 변경에서 시작됩니다.","Opticini 변경은 인프라, 구성, 배포 변경을 영향 컨텍스트와 함께 완전 가시화합니다.","변경이 추적하는 것","분산 로그에서 상관관계 기반 변경 이력으로","왜 중요한가","알 수 없는 근본 원인에서 명확한 책임으로","변경 가시성 없음","Opticini 변경 사용","결과","책임 명확화, 더 빠른 사고 해결, 더 안전한 변경을 모든 팀에서 실현합니다.","변경에 명확성을 더하세요","무엇이 바뀌었는지 추측하지 말고, 완전한 컨텍스트와 컴플라이언스 영향으로 확인하세요.",{c1:"인프라/구성 변경",c2:"플랫폼/애플리케이션 변경",c3:"작성자와 출처",c4:"영향과 blast radius",c5:"컴플라이언스 영향",i1:["시스템/OS 변경","구성 업데이트","네트워크/방화벽 규칙 변경","클라우드 리소스 변경"],i2:["배포와 릴리스","IaC 업데이트","CI/CD 파이프라인 실행","버전/스키마 변경"],s3:"각 변경에 누가 어디서 수행했는지 표시됩니다(수동/자동화/파이프라인).",s4:"심층 분석 전 영향을 받는 자산, 관련 사고, 예상 영향 범위를 파악합니다.",s5:"각 변경의 보안/컴플라이언스 영향을 관련 framework 및 control에 매핑합니다.",rows:[{old:"근본 원인 불명",new:"변경 책임 명확화"},{old:"사고 해결 지연",new:"근본 원인 분석 가속"},{old:"숨겨진 위험 변경",new:"변경 단위 조기 위험 탐지"},{old:"감사 시 change-control 공백",new:"검증 가능한 change-control 이력"}]})
const CHANGE_HI = ch("परिवर्तन","क्या बदला और क्यों महत्वपूर्ण है, जानें","हर डाउनटाइम, ब्रीच या अनुपालन विफलता एक बदलाव से शुरू होती है।","हर डाउनटाइम, ब्रीच या अनुपालन विफलता एक बदलाव से शुरू होती है।","Opticini परिवर्तन इन्फ्रा, कॉन्फ़िगरेशन और डिप्लॉय बदलावों की पूर्ण दृश्यता देता है, प्रभाव संदर्भ सहित।","परिवर्तन क्या ट्रैक करता है","बिखरे लॉग्स से एकीकृत सहसंबद्ध परिवर्तन इतिहास तक","यह क्यों महत्वपूर्ण है","अज्ञात कारण से स्पष्ट जवाबदेही तक","परिवर्तन दृश्यता के बिना","Opticini परिवर्तन के साथ","परिणाम","स्पष्ट जवाबदेही, तेज़ incident समाधान और अधिक सुरक्षित बदलाव सभी टीमों के लिए।","परिवर्तन में स्पष्टता लाएं","क्या बदला यह अनुमान लगाना बंद करें। पूर्ण संदर्भ और अनुपालन प्रभाव के साथ निश्चित जानें।",{c1:"इन्फ्रास्ट्रक्चर और कॉन्फ़िगरेशन बदलाव",c2:"प्लेटफ़ॉर्म और एप्लिकेशन बदलाव",c3:"लेखक और स्रोत",c4:"प्रभाव और blast radius",c5:"अनुपालन प्रभाव",i1:["सिस्टम और OS बदलाव","कॉन्फ़िगरेशन अपडेट","नेटवर्क और फ़ायरवॉल नियम बदलाव","क्लाउड संसाधन संशोधन"],i2:["डिप्लॉय और रिलीज़","IaC अपडेट","CI/CD पाइपलाइन रन","वर्ज़न और स्कीमा बदलाव"],s3:"हर बदलाव में दिखता है किसने और कहां से किया: मानव, ऑटोमेशन या पाइपलाइन।",s4:"गहन जांच से पहले प्रभावित एसेट, संबंधित incident और अनुमानित प्रभाव क्षेत्र देखें।",s5:"हर बदलाव के सुरक्षा/अनुपालन प्रभाव को संबंधित framework और control से मैप करें।",rows:[{old:"अज्ञात root cause",new:"स्पष्ट change जवाबदेही"},{old:"धीमा incident समाधान",new:"तेज root cause विश्लेषण"},{old:"छिपे जोखिमपूर्ण बदलाव",new:"प्रति बदलाव शुरुआती जोखिम पहचान"},{old:"ऑडिट में change-control गैप",new:"सत्यापित change-control इतिहास"}]})
const CHANGE_AR = ch("التغيير","اعرف ما الذي تغير ولماذا يهم","كل انقطاع او اختراق او فشل امتثال يبدأ بتغيير.","كل انقطاع او اختراق او فشل امتثال يبدأ بتغيير.","يوفر Opticini التغيير رؤية كاملة لتغييرات البنية والتهيئة والنشر مع سياق التأثير.","ما الذي يتتبعه التغيير","من سجلات متفرقة الى سجل تغيير مترابط","لماذا التغيير مهم","من سبب جذري مجهول الى مسؤولية واضحة","بدون رؤية للتغيير","مع Opticini التغيير","النتيجة","مسؤولية اوضح، حل اسرع للحوادث، وتغييرات اكثر امانا لكل الفرق.","اجلب الوضوح الى التغيير","توقف عن التخمين ماذا تغير. اعرف ذلك بسياق كامل وتأثير الامتثال.",{c1:"تغييرات البنية والتهيئة",c2:"تغييرات المنصة والتطبيق",c3:"الكاتب والمصدر",c4:"التأثير ونطاق الانفجار",c5:"تأثير الامتثال",i1:["تغييرات النظام ونظام التشغيل","تحديثات التهيئة","تغييرات قواعد الشبكة والجدار الناري","تعديلات موارد السحابة"],i2:["عمليات نشر واصدارات","تحديثات IaC","تشغيلات خط CI/CD","تغييرات الاصدار والمخطط"],s3:"كل تغيير يوضح من قام به ومن اين: بشري، آلي، او عبر pipeline.",s4:"الاصول المتأثرة والحوادث المرتبطة ونطاق التأثير المقدر قبل التحليل العميق.",s5:"تأثيرات الامن والامتثال لكل تغيير مع ربطها بالـ framework والضوابط المناسبة.",rows:[{old:"اسباب جذرية غير معروفة",new:"مسؤولية تغيير واضحة"},{old:"حل بطيء للحوادث",new:"تحليل سبب جذري اسرع"},{old:"تغييرات خطرة مخفية",new:"كشف مبكر للمخاطر لكل تغيير"},{old:"فجوات change-control في التدقيق",new:"سجل change-control موثق وقابل للتحقق"}]})
const CHANGE_HE = ch("שינוי","לדעת מה השתנה ולמה זה חשוב","כל השבתה, פריצה או כשל תאימות מתחילים בשינוי.","כל השבתה, פריצה או כשל תאימות מתחילים בשינוי.","Opticini שינוי נותן נראות מלאה לשינויי תשתית, תצורה ופריסה עם הקשר השפעה.","מה שינוי עוקב אחריו","מלוגים מפוזרים להיסטוריית שינויים מקושרת","למה שינוי חשוב","מסיבה שורש לא ידועה לאחריות ברורה","בלי נראות לשינוי","עם Opticini שינוי","תוצאה","אחריות ברורה יותר, פתרון מהיר יותר לאירועים ושינויים בטוחים יותר לכל הצוותים.","להביא בהירות לשינויים","להפסיק לנחש מה השתנה. לדעת בוודאות עם הקשר מלא והשפעת תאימות.",{c1:"שינויי תשתית ותצורה",c2:"שינויי פלטפורמה ואפליקציה",c3:"מחבר ומקור",c4:"השפעה ו-blast radius",c5:"השפעת תאימות",i1:["שינויי מערכת ו-OS","עדכוני תצורה","שינויי כללי רשת ופיירוול","שינויים במשאבי ענן"],i2:["פריסות ושחרורים","עדכוני IaC","הרצות CI/CD pipeline","שינויי גרסה וסכמה"],s3:"כל שינוי מציג מי ביצע אותו ומאיפה: אדם, אוטומציה או pipeline.",s4:"נכסים מושפעים, אירועים קשורים והערכת היקף השפעה לפני חקירה מעמיקה.",s5:"השלכות אבטחה ותאימות לכל שינוי, ממופות ל-framework ול-controls רלוונטיים.",rows:[{old:"סיבות שורש לא ידועות",new:"אחריות שינוי ברורה"},{old:"פתרון אירועים איטי",new:"ניתוח סיבת שורש מהיר יותר"},{old:"שינויים מסוכנים מוסתרים",new:"זיהוי סיכון מוקדם לכל שינוי"},{old:"פערי change-control בביקורת",new:"היסטוריית change-control מאומתת"}]})

export const CHANGE_PAGE_PATCH_BY_LANG: Record<string, ChangePagePatch> = {
  en: { features: { change: CHANGE_EN } },
  es: { features: { change: CHANGE_ES } },
  fr: { features: { change: CHANGE_FR } },
  de: { features: { change: CHANGE_DE } },
  it: { features: { change: CHANGE_IT } },
  pt: { features: { change: CHANGE_PT } },
  ru: { features: { change: CHANGE_RU } },
  sv: { features: { change: CHANGE_SV } },
  no: { features: { change: CHANGE_NO } },
  da: { features: { change: CHANGE_DA } },
  zh: { features: { change: CHANGE_ZH } },
  ja: { features: { change: CHANGE_JA } },
  ko: { features: { change: CHANGE_KO } },
  hi: { features: { change: CHANGE_HI } },
  ar: { features: { change: CHANGE_AR } },
  he: { features: { change: CHANGE_HE } },
}
