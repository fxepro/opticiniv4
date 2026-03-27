import type { FeatureDetailConfig } from "@/components/feature-detail-page"

type SecurityI18nPayload = Omit<FeatureDetailConfig, "colors">
type SecurityPagePatch = { features: { security: SecurityI18nPayload } }

function s(
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
  cards: { c1: string; c2: string; c3: string; i1: string[]; i2: string[]; i3: string[]; rows: { old: string; new: string }[] }
): SecurityI18nPayload {
  return {
    title,
    subtitle,
    tagline,
    planeNum: 4,
    stats: [
      { value: "Continuous", label: "posture assessment" },
      { value: "Real-time", label: "exposure detection" },
      { value: "Zero", label: "point-in-time scans" },
      { value: "Full", label: "attack surface view" },
    ],
    posStrong,
    posBody,
    sectionLabel,
    sectionTitle,
    cards: [
      { icon: "🔍", title: cards.c1, items: cards.i1 },
      { icon: "🛡️", title: cards.c2, items: cards.i2 },
      { icon: "🔑", title: cards.c3, items: cards.i3 },
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

const SECURITY_EN = s(
  "Security",
  "See risk before attackers do",
  "Most breaches start with what you already have: misconfigured, exposed, or overlooked.",
  "Most breaches start with what you already have: misconfigured, exposed, or overlooked.",
  "Opticini Security provides continuous visibility into exposure, misconfigurations, and vulnerabilities so your team can act first.",
  "What Security Does",
  "Continuous posture, not point-in-time scans",
  "Why Security Matters",
  "From periodic scans to continuous posture",
  "Traditional security scans",
  "With Opticini Security",
  "Outcome",
  "A continuously updated security posture view so you find and fix exposure before attackers do.",
  "See risk before attackers do",
  "Continuous security posture monitoring across exposure, identity, and configuration.",
  {
    c1: "Exposure Detection",
    c2: "Vulnerability and Posture",
    c3: "Identity and Access Risk",
    i1: [
      "Open ports and exposed services",
      "Public-facing asset inventory",
      "TLS and certificate health",
      "Cloud misconfiguration detection",
    ],
    i2: [
      "CVE correlation to live assets",
      "Software and package risk mapping",
      "Patch status tracking",
      "CIS benchmark scoring",
    ],
    i3: [
      "Excessive permissions and privilege sprawl",
      "Unused credentials and access",
      "Service account risks",
      "MFA and authentication gap detection",
    ],
    rows: [
      { old: "Quarterly or annual scans", new: "Continuous posture monitoring" },
      { old: "Unknown attack surface", new: "Full attack surface mapped" },
      { old: "Uncontextualized CVE lists", new: "CVEs correlated to live assets" },
      { old: "Access sprawl undetected", new: "Identity risks surfaced continuously" },
    ],
  }
)

const SECURITY_PT = s("Seguranca","Veja o risco antes dos atacantes","A maioria das violacoes comeca com o que voce ja tem: mal configurado, exposto ou ignorado.","A maioria das violacoes comeca com o que voce ja tem: mal configurado, exposto ou ignorado.","O plano de Seguranca do Opticini entrega visibilidade continua de exposicao, configuracoes incorretas e vulnerabilidades para sua equipe agir primeiro.","O que Seguranca faz","Postura continua, nao varredura pontual","Por que Seguranca importa","De scans periodicos para postura continua","Scans tradicionais de seguranca","Com Opticini Seguranca","Resultado","Uma visao de postura de seguranca continuamente atualizada para voce encontrar e corrigir exposicoes antes dos atacantes.","Veja risco antes dos atacantes","Monitoramento continuo de postura de seguranca em exposicao, identidade e configuracao.",{c1:"Deteccao de Exposicao",c2:"Vulnerabilidade e Postura",c3:"Risco de Identidade e Acesso",i1:["Portas abertas e servicos expostos","Inventario de ativos publicos","Saude de TLS e certificados","Deteccao de configuracao incorreta na nuvem"],i2:["Correlacao de CVE com ativos vivos","Mapeamento de risco de software e pacotes","Acompanhamento de status de patch","Pontuacao de benchmark CIS"],i3:["Permissoes excessivas e proliferacao de privilegios","Credenciais e acessos sem uso","Riscos de contas de servico","Deteccao de lacunas de MFA e autenticacao"],rows:[{old:"Scans trimestrais ou anuais",new:"Monitoramento continuo de postura"},{old:"Superficie de ataque desconhecida",new:"Superficie de ataque totalmente mapeada"},{old:"Listas de CVE sem contexto",new:"CVEs correlacionados com ativos vivos"},{old:"Excesso de acesso nao detectado",new:"Riscos de identidade detectados continuamente"}]})
const SECURITY_ES = s("Seguridad","Ve el riesgo antes que los atacantes","La mayoria de brechas comienza con lo que ya tienes: mal configurado, expuesto u olvidado.","La mayoria de brechas comienza con lo que ya tienes: mal configurado, expuesto u olvidado.","Opticini Seguridad ofrece visibilidad continua de exposicion, malas configuraciones y vulnerabilidades para actuar antes.","Que hace Seguridad","Postura continua, no escaneos puntuales","Por que Seguridad importa","De escaneos periodicos a postura continua","Escaneos tradicionales","Con Opticini Seguridad","Resultado","Una vista de postura de seguridad siempre actualizada para detectar y corregir exposicion antes que los atacantes.","Ve el riesgo antes que los atacantes","Monitoreo continuo de postura de seguridad en exposicion, identidad y configuracion.",{c1:"Deteccion de exposicion",c2:"Vulnerabilidad y postura",c3:"Riesgo de identidad y acceso",i1:["Puertos abiertos y servicios expuestos","Inventario de activos publicos","Estado de TLS y certificados","Deteccion de mala configuracion en nube"],i2:["Correlacion de CVE con activos vivos","Mapa de riesgo de software y paquetes","Seguimiento de parches","Puntuacion CIS"],i3:["Permisos excesivos y dispersion de privilegios","Credenciales y accesos sin uso","Riesgos de cuentas de servicio","Deteccion de brechas MFA/autenticacion"],rows:[{old:"Escaneos trimestrales o anuales",new:"Monitoreo continuo de postura"},{old:"Superficie de ataque desconocida",new:"Superficie de ataque completa"},{old:"Listas CVE sin contexto",new:"CVE correlacionados con activos vivos"},{old:"Exceso de acceso no detectado",new:"Riesgos de identidad visibles en continuo"}]})
const SECURITY_FR = s("Securite","Voyez le risque avant les attaquants","La plupart des failles commencent par ce que vous avez deja: mal configure, expose ou oublie.","La plupart des failles commencent par ce que vous avez deja: mal configure, expose ou oublie.","Opticini Securite offre une visibilite continue des expositions, mauvaises configurations et vulnerabilites pour agir en premier.","Ce que fait Securite","Posture continue, pas des scans ponctuels","Pourquoi Securite compte","Des scans periodiques a une posture continue","Scans traditionnels","Avec Opticini Securite","Resultat","Une vue de posture de securite en continu pour corriger les expositions avant les attaquants.","Voir le risque avant les attaquants","Surveillance continue de la posture de securite sur exposition, identite et configuration.",{c1:"Detection d'exposition",c2:"Vulnerabilites et posture",c3:"Risque identite et acces",i1:["Ports ouverts et services exposes","Inventaire des actifs publics","Sante TLS et certificats","Detection de mauvaises configurations cloud"],i2:["Correlation CVE avec actifs vivants","Cartographie des risques logiciels et paquets","Suivi des correctifs","Score CIS"],i3:["Permissions excessives et etalement des privileges","Identifiants et acces inutilises","Risques des comptes de service","Detection des manques MFA/auth"],rows:[{old:"Scans trimestriels ou annuels",new:"Surveillance continue de posture"},{old:"Surface d'attaque inconnue",new:"Surface d'attaque complete mappee"},{old:"Listes CVE sans contexte",new:"CVE correles aux actifs vivants"},{old:"Derive d'acces non detectee",new:"Risques d'identite visibles en continu"}]})
const SECURITY_DE = s("Sicherheit","Risiken sehen, bevor Angreifer sie sehen","Die meisten Vorfalle beginnen mit dem, was Sie bereits haben: fehlkonfiguriert, exponiert oder ubersehen.","Die meisten Vorfalle beginnen mit dem, was Sie bereits haben: fehlkonfiguriert, exponiert oder ubersehen.","Opticini Sicherheit liefert kontinuierliche Sichtbarkeit von Expositionen, Fehlkonfigurationen und Schwachstellen damit Ihr Team fruher handelt.","Was Sicherheit leistet","Kontinuierliche Posture statt Punkt-in-Zeit-Scans","Warum Sicherheit wichtig ist","Von periodischen Scans zu kontinuierlicher Posture","Traditionelle Security-Scans","Mit Opticini Sicherheit","Ergebnis","Eine laufend aktualisierte Sicherheitslage, damit Expositionen vor Angreifern gefunden und behoben werden.","Risiken fruher sehen","Kontinuierliche Sicherheits-Posture-Uberwachung fur Exposition, Identitat und Konfiguration.",{c1:"Expositions-Erkennung",c2:"Schwachstelle und Posture",c3:"Identitats- und Zugriffsrisiko",i1:["Offene Ports und exponierte Dienste","Inventar offentlich erreichbarer Assets","TLS- und Zertifikatszustand","Cloud-Fehlkonfigurationserkennung"],i2:["CVE-Korrelation mit Live-Assets","Risiko-Mapping fur Software und Pakete","Patch-Status-Tracking","CIS-Benchmark-Bewertung"],i3:["Ubermassige Rechte und Privilegienausweitung","Ungenutzte Zugangsdaten und Zugriffe","Service-Account-Risiken","Erkennung von MFA-/Auth-Lucken"],rows:[{old:"Quartals- oder Jahresscans",new:"Kontinuierliche Posture-Uberwachung"},{old:"Unbekannte Angriffsflache",new:"Vollstandig kartierte Angriffsflache"},{old:"CVE-Listen ohne Kontext",new:"CVEs mit Live-Assets korreliert"},{old:"Unentdeckte Access-Sprawl",new:"Identitatsrisiken laufend sichtbar"}]})
const SECURITY_IT = s("Sicurezza","Vedi il rischio prima degli attaccanti","La maggior parte delle violazioni parte da cio che hai gia: mal configurato, esposto o trascurato.","La maggior parte delle violazioni parte da cio che hai gia: mal configurato, esposto o trascurato.","Opticini Sicurezza offre visibilita continua su esposizione, configurazioni errate e vulnerabilita per agire prima.","Cosa fa Sicurezza","Postura continua, non scansioni puntuali","Perche Sicurezza conta","Da scansioni periodiche a postura continua","Scansioni tradizionali","Con Opticini Sicurezza","Risultato","Una vista di postura sicurezza sempre aggiornata per individuare e risolvere esposizioni prima degli attaccanti.","Vedi il rischio prima degli attaccanti","Monitoraggio continuo della postura di sicurezza su esposizione, identita e configurazione.",{c1:"Rilevamento esposizione",c2:"Vulnerabilita e postura",c3:"Rischio identita e accesso",i1:["Porte aperte e servizi esposti","Inventario asset pubblici","Salute TLS e certificati","Rilevamento misconfigurazioni cloud"],i2:["Correlazione CVE con asset attivi","Mappatura rischio software e pacchetti","Tracciamento patch","Punteggio benchmark CIS"],i3:["Permessi eccessivi e sprawl privilegi","Credenziali e accessi inutilizzati","Rischi account di servizio","Rilevamento gap MFA/autenticazione"],rows:[{old:"Scansioni trimestrali o annuali",new:"Monitoraggio continuo postura"},{old:"Superficie d'attacco sconosciuta",new:"Superficie d'attacco completa mappata"},{old:"Liste CVE senza contesto",new:"CVE correlati ad asset attivi"},{old:"Sprawl accessi non rilevato",new:"Rischi identita emersi in continuo"}]})
const SECURITY_RU = s("Безопасность","Видеть риск раньше атакующих","Большинство инцидентов начинается с того, что уже есть: неверно настроено, открыто или упущено.","Большинство инцидентов начинается с того, что уже есть: неверно настроено, открыто или упущено.","Opticini Безопасность дает непрерывную видимость экспозиции, ошибок конфигурации и уязвимостей, чтобы команда действовала первой.","Что делает Безопасность","Непрерывная posture вместо точечных сканов","Почему это важно","От периодических сканов к непрерывной posture","Традиционные сканы","С Opticini Безопасность","Результат","Постоянно обновляемая картина безопасности, чтобы закрывать риски раньше атакующих.","Видеть риск раньше атакующих","Непрерывный мониторинг posture по экспозиции, идентичности и конфигурации.",{c1:"Обнаружение экспозиции",c2:"Уязвимости и posture",c3:"Риски идентичности и доступа",i1:["Открытые порты и экспонированные сервисы","Инвентарь публичных активов","Состояние TLS и сертификатов","Обнаружение ошибок cloud-конфигурации"],i2:["Корреляция CVE с живыми активами","Карта рисков ПО и пакетов","Отслеживание патчей","Оценка CIS-бенчмарков"],i3:["Избыточные права и разрастание привилегий","Неиспользуемые учетные данные и доступы","Риски сервисных аккаунтов","Обнаружение пробелов MFA/аутентификации"],rows:[{old:"Квартальные или годовые сканы",new:"Непрерывный мониторинг posture"},{old:"Неизвестная поверхность атаки",new:"Полностью отображенная поверхность атаки"},{old:"Списки CVE без контекста",new:"CVE связаны с живыми активами"},{old:"Разрастание доступа не видно",new:"Риски идентичности выявляются постоянно"}]})
const SECURITY_SV = s("Sakerhet","Se risk innan angripare gor det","De flesta intrang borjar med det du redan har: felkonfigurerat, exponerat eller forbisett.","De flesta intrang borjar med det du redan har: felkonfigurerat, exponerat eller forbisett.","Opticini Sakerhet ger kontinuerlig synlighet i exponering, felkonfigurationer och sarbarheter sa teamet kan agera forst.","Vad Sakerhet gor","Kontinuerlig posture, inte punktinspektioner","Varfor Sakerhet ar viktigt","Fran periodiska skanningar till kontinuerlig posture","Traditionella skanningar","Med Opticini Sakerhet","Resultat","En kontinuerligt uppdaterad sakerhetsbild sa du hittar och atgardar exponering innan angripare gor det.","Se risk innan angripare","Kontinuerlig overvakning av sakerhets-posture over exponering, identitet och konfiguration.",{c1:"Exponeringsdetektion",c2:"Sarbarhet och posture",c3:"Identitets- och atkomstrisk",i1:["Oppna portar och exponerade tjanster","Inventering av publika tillgangar","TLS- och certifikathalsa","Detektion av moln-felkonfiguration"],i2:["CVE-korrelation till levande tillgangar","Riskmappning av programvara och paket","Patchstatus-sporing","CIS-benchmark-poang"],i3:["Overdrivna behorigheter och privilegiespridning","Oanvanda inloggningar och atkomster","Risker i servicekonton","Detektion av MFA-/auth-gap"],rows:[{old:"Kvartals- eller arsskanningar",new:"Kontinuerlig posture-overvakning"},{old:"Okand attackyta",new:"Fullt kartlagd attackyta"},{old:"CVE-listor utan kontext",new:"CVE korrelerade med levande tillgangar"},{old:"Atkomstspridning osynlig",new:"Identitetsrisker syns kontinuerligt"}]})
const SECURITY_NO = s("Sikkerhet","Se risiko for angriperne","De fleste brudd starter med det du allerede har: feilkonfigurert, eksponert eller oversett.","De fleste brudd starter med det du allerede har: feilkonfigurert, eksponert eller oversett.","Opticini Sikkerhet gir kontinuerlig synlighet i eksponering, feilkonfigurasjoner og sarbarheter sa teamet kan handle forst.","Hva Sikkerhet gjor","Kontinuerlig posture, ikke punktvise skanninger","Hvorfor Sikkerhet er viktig","Fra periodiske skanninger til kontinuerlig posture","Tradisjonelle skanninger","Med Opticini Sikkerhet","Resultat","En kontinuerlig oppdatert sikkerhetsoversikt sa du finner og lukker eksponering for angriperne.","Se risiko for angriperne","Kontinuerlig overvaking av sikkerhets-posture pa tvers av eksponering, identitet og konfigurasjon.",{c1:"Eksponeringsdeteksjon",c2:"Sarbarhet og posture",c3:"Identitets- og tilgangsrisiko",i1:["Apne porter og eksponerte tjenester","Inventar av offentlig eksponerte eiendeler","TLS- og sertifikathelse","Deteksjon av feilkonfigurasjon i sky"],i2:["CVE-korrelasjon mot levende eiendeler","Risikokartlegging av programvare og pakker","Sporing av patch-status","CIS-benchmark-score"],i3:["For brede tillatelser og privilegiespredning","Ubrukte legitimasjoner og tilganger","Risiko i tjenestekontoer","Deteksjon av MFA-/autentiseringsgap"],rows:[{old:"Kvartals- eller arsskanninger",new:"Kontinuerlig posture-overvaking"},{old:"Ukjent angrepsflate",new:"Fullt kartlagt angrepsflate"},{old:"CVE-lister uten kontekst",new:"CVE-er korrelert med levende eiendeler"},{old:"Tilgangsspredning uoppdaget",new:"Identitetsrisiko synlig kontinuerlig"}]})
const SECURITY_DA = s("Sikkerhed","Se risiko for angriberne","De fleste brud starter med det, du allerede har: fejlkonfigureret, eksponeret eller overset.","De fleste brud starter med det, du allerede har: fejlkonfigureret, eksponeret eller overset.","Opticini Sikkerhed giver kontinuerlig synlighed i eksponering, fejlkonfigurationer og sarbarheder sa teamet kan handle forst.","Hvad Sikkerhed gor","Kontinuerlig posture, ikke punktvise scanninger","Hvorfor Sikkerhed er vigtig","Fra periodiske scanninger til kontinuerlig posture","Traditionelle scanninger","Med Opticini Sikkerhed","Resultat","Et kontinuerligt opdateret sikkerhedsbillede sa du finder og lukker eksponering for angribere.","Se risiko for angriberne","Kontinuerlig overvagning af sikkerheds-posture pa tvaers af eksponering, identitet og konfiguration.",{c1:"Eksponeringsdetektion",c2:"Sarbarhed og posture",c3:"Identitets- og adgangsrisiko",i1:["Abne porte og eksponerede tjenester","Inventar over offentligt eksponerede aktiver","TLS- og certifikatstatus","Detektion af cloud-fejlkonfiguration"],i2:["CVE-korrelation til levende aktiver","Risikokortlagning af software og pakker","Patch-status sporing","CIS benchmark-score"],i3:["Overdrevne rettigheder og privilegiespredning","Ubrugte legitimationsoplysninger og adgang","Risici i servicekonti","Detektion af MFA-/autentificeringshuller"],rows:[{old:"Kvartals- eller arsscanninger",new:"Kontinuerlig posture-overvagning"},{old:"Ukendt angrebsflade",new:"Fuldt kortlagt angrebsflade"},{old:"CVE-lister uden kontekst",new:"CVE'er korreleret med levende aktiver"},{old:"Adgangsspredning uopdaget",new:"Identitetsrisici synlige kontinuerligt"}]})
const SECURITY_ZH = s("安全","在攻击者之前看到风险","多数入侵始于你已有的东西：配置错误、暴露或被忽视。","多数入侵始于你已有的东西：配置错误、暴露或被忽视。","Opticini 安全持续提供暴露面、错误配置和漏洞可视化，让团队先于攻击者行动。","安全能力","持续姿态，而非一次性扫描","为什么安全很重要","从周期扫描到持续安全姿态","传统安全扫描","使用 Opticini 安全","结果","持续更新的安全姿态视图，帮助你在攻击者之前发现并修复暴露风险。","在攻击者之前看到风险","围绕暴露、身份与配置的持续安全姿态监控。",{c1:"暴露检测",c2:"漏洞与安全姿态",c3:"身份与访问风险",i1:["开放端口与暴露服务","公网资产清单","TLS 与证书健康","云配置错误检测"],i2:["CVE 与在线资产关联","软件与包风险映射","补丁状态跟踪","CIS 基准评分"],i3:["过度权限与特权扩散","未使用凭据与访问","服务账号风险","MFA/认证缺口检测"],rows:[{old:"季度或年度扫描",new:"持续姿态监控"},{old:"攻击面未知",new:"攻击面完整映射"},{old:"无上下文 CVE 清单",new:"CVE 与在线资产关联"},{old:"访问扩散未被发现",new:"身份风险持续暴露"}]})
const SECURITY_JA = s("セキュリティ","攻撃者より先にリスクを見る","多くの侵害は、既存の誤設定・露出・見落としから始まります。","多くの侵害は、既存の誤設定・露出・見落としから始まります。","Opticini セキュリティは露出、誤設定、脆弱性を継続可視化し、チームが先手で対処できます。","セキュリティが行うこと","単発スキャンではなく継続 posture","なぜ重要か","定期スキャンから継続 posture へ","従来のセキュリティスキャン","Opticini セキュリティあり","結果","継続更新されるセキュリティ姿勢により、攻撃者より先に露出を発見して修正できます。","攻撃者より先にリスクを見る","露出、ID、設定を横断した継続セキュリティ posture 監視。",{c1:"露出検知",c2:"脆弱性と posture",c3:"ID とアクセスリスク",i1:["開放ポートと露出サービス","公開資産インベントリ","TLS と証明書の健全性","クラウド誤設定検知"],i2:["CVE と稼働資産の相関","ソフトウェア/パッケージのリスクマッピング","パッチ状態追跡","CIS ベンチマークスコア"],i3:["過剰権限と特権拡散","未使用資格情報とアクセス","サービスアカウントのリスク","MFA/認証ギャップ検知"],rows:[{old:"四半期/年次スキャン",new:"継続 posture 監視"},{old:"不明な攻撃面",new:"攻撃面を完全マッピング"},{old:"文脈のない CVE 一覧",new:"CVE を稼働資産と相関"},{old:"アクセス拡散が未検知",new:"ID リスクを継続可視化"}]})
const SECURITY_KO = s("보안","공격자보다 먼저 위험을 보세요","대부분의 침해는 이미 가진 것에서 시작됩니다: 오구성, 노출, 혹은 방치.","대부분의 침해는 이미 가진 것에서 시작됩니다: 오구성, 노출, 혹은 방치.","Opticini 보안은 노출, 오구성, 취약점을 지속적으로 가시화해 팀이 먼저 대응하게 합니다.","보안이 하는 일","단발성 스캔이 아닌 지속 posture","왜 중요한가","주기 스캔에서 지속 posture로","기존 보안 스캔","Opticini 보안 사용","결과","지속 업데이트되는 보안 posture로 공격자보다 먼저 노출을 찾아 수정합니다.","공격자보다 먼저 위험 파악","노출, ID, 설정 전반의 지속 보안 posture 모니터링.",{c1:"노출 탐지",c2:"취약점과 posture",c3:"ID 및 접근 위험",i1:["열린 포트와 노출 서비스","공개 자산 인벤토리","TLS/인증서 상태","클라우드 오구성 탐지"],i2:["CVE와 활성 자산 상관분석","소프트웨어/패키지 위험 매핑","패치 상태 추적","CIS 벤치마크 점수"],i3:["과도한 권한과 특권 확산","미사용 자격증명/접근","서비스 계정 위험","MFA/인증 공백 탐지"],rows:[{old:"분기/연간 스캔",new:"지속 posture 모니터링"},{old:"불명확한 공격면",new:"공격면 전체 매핑"},{old:"맥락 없는 CVE 목록",new:"CVE-활성 자산 상관분석"},{old:"접근 확산 미탐지",new:"ID 위험 지속 가시화"}]})
const SECURITY_HI = s("सुरक्षा","हमलावरों से पहले जोखिम देखें","ज्यादातर उल्लंघन वहीं से शुरू होते हैं जो आपके पास पहले से है: गलत कॉन्फ़िगर, एक्सपोज़, या नजरअंदाज।","ज्यादातर उल्लंघन वहीं से शुरू होते हैं जो आपके पास पहले से है: गलत कॉन्फ़िगर, एक्सपोज़, या नजरअंदाज।","Opticini सुरक्षा एक्सपोज़र, गलत कॉन्फ़िगरेशन और कमजोरियों की निरंतर दृश्यता देता है ताकि टीम पहले कार्रवाई करे।","सुरक्षा क्या करती है","पॉइंट-इन-टाइम स्कैन नहीं, निरंतर posture","सुरक्षा क्यों महत्वपूर्ण है","आवधिक स्कैन से निरंतर posture तक","पारंपरिक सुरक्षा स्कैन","Opticini सुरक्षा के साथ","परिणाम","लगातार अपडेटेड सुरक्षा posture जिससे आप हमलावरों से पहले एक्सपोज़र ढूंढकर ठीक कर सकें।","हमलावरों से पहले जोखिम देखें","एक्सपोज़र, पहचान और कॉन्फ़िगरेशन पर निरंतर सुरक्षा posture मॉनिटरिंग।",{c1:"एक्सपोज़र डिटेक्शन",c2:"कमजोरी और posture",c3:"पहचान और एक्सेस जोखिम",i1:["ओपन पोर्ट और एक्सपोज़्ड सेवाएं","पब्लिक-फेसिंग एसेट इन्वेंटरी","TLS और सर्टिफिकेट हेल्थ","क्लाउड मिसकॉन्फ़िगरेशन डिटेक्शन"],i2:["लाइव एसेट्स से CVE कोरिलेशन","सॉफ्टवेयर/पैकेज जोखिम मैपिंग","पैच स्टेटस ट्रैकिंग","CIS बेंचमार्क स्कोरिंग"],i3:["अत्यधिक परमिशन और प्रिविलेज स्प्रॉल","अनयूज्ड क्रेडेंशियल्स और एक्सेस","सर्विस अकाउंट जोखिम","MFA/ऑथ गैप डिटेक्शन"],rows:[{old:"त्रैमासिक/वार्षिक स्कैन",new:"निरंतर posture मॉनिटरिंग"},{old:"अज्ञात अटैक सरफेस",new:"पूर्ण अटैक सरफेस मैप्ड"},{old:"बिना संदर्भ CVE सूची",new:"CVE को लाइव एसेट्स से जोड़ा गया"},{old:"एक्सेस स्प्रॉल अनदेखा",new:"पहचान जोखिम निरंतर उजागर"}]})
const SECURITY_AR = s("الامن","شاهد المخاطر قبل المهاجمين","معظم الاختراقات تبدا مما لديك بالفعل: اعداد خاطئ او انكشاف او اهمال.","معظم الاختراقات تبدا مما لديك بالفعل: اعداد خاطئ او انكشاف او اهمال.","يوفر Opticini الامن رؤية مستمرة للانكشافات والاعدادات الخاطئة والثغرات حتى يتصرف فريقك اولا.","ماذا يفعل الامن","وضعية امن مستمرة وليست فحوصات لحظية","لماذا الامن مهم","من فحوصات دورية الى وضعية مستمرة","فحوصات امن تقليدية","مع Opticini الامن","النتيجة","رؤية وضعية امن محدثة باستمرار لتكتشف وتصلح الانكشاف قبل المهاجمين.","شاهد المخاطر قبل المهاجمين","مراقبة مستمرة لوضعية الامن عبر الانكشاف والهوية والاعداد.",{c1:"كشف الانكشاف",c2:"الثغرات والوضعية",c3:"مخاطر الهوية والوصول",i1:["منافذ مفتوحة وخدمات مكشوفة","جرد الاصول العامة","صحة TLS والشهادات","كشف سوء اعداد السحابة"],i2:["ربط CVE بالاصول الحية","خرائط مخاطر البرمجيات والحزم","تتبع حالة التصحيحات","تقييم معيار CIS"],i3:["صلاحيات مفرطة وتوسع الامتيازات","بيانات اعتماد ووصول غير مستخدم","مخاطر حسابات الخدمة","كشف فجوات MFA/المصادقة"],rows:[{old:"فحوصات ربع سنوية او سنوية",new:"مراقبة وضعية مستمرة"},{old:"سطح هجوم غير معروف",new:"خريطة كاملة لسطح الهجوم"},{old:"قوائم CVE بلا سياق",new:"CVE مرتبطة بالاصول الحية"},{old:"توسع وصول غير مكتشف",new:"مخاطر الهوية تظهر باستمرار"}]})
const SECURITY_HE = s("אבטחה","לראות סיכון לפני התוקפים","רוב הפריצות מתחילות ממה שכבר קיים: תצורה שגויה, חשיפה או הזנחה.","רוב הפריצות מתחילות ממה שכבר קיים: תצורה שגויה, חשיפה או הזנחה.","Opticini אבטחה מספק נראות רציפה לחשיפה, תצורות שגויות ופגיעויות כדי שהצוות יפעל ראשון.","מה אבטחה עושה","Posture רציף ולא סריקות נקודתיות","למה אבטחה חשובה","מסריקות תקופתיות ל-posture רציף","סריקות אבטחה מסורתיות","עם Opticini אבטחה","תוצאה","תמונת מצב אבטחה מתעדכנת ברצף כדי לאתר ולתקן חשיפה לפני התוקפים.","לראות סיכון לפני התוקפים","ניטור רציף של posture אבטחה על פני חשיפה, זהות ותצורה.",{c1:"זיהוי חשיפה",c2:"פגיעויות ו-posture",c3:"סיכון זהות והרשאות",i1:["פורטים פתוחים ושירותים חשופים","מלאי נכסים פומביים","בריאות TLS ותעודות","זיהוי שגיאות תצורת ענן"],i2:["קורלציית CVE לנכסים חיים","מיפוי סיכוני תוכנה וחבילות","מעקב סטטוס פאצ'ים","דירוג CIS"],i3:["הרשאות עודפות והתפשטות פריבילגיות","אישורי גישה והרשאות לא בשימוש","סיכוני חשבונות שירות","זיהוי פערי MFA/אימות"],rows:[{old:"סריקות רבעוניות/שנתיות",new:"ניטור posture רציף"},{old:"משטח תקיפה לא ידוע",new:"מיפוי מלא של משטח התקיפה"},{old:"רשימות CVE ללא הקשר",new:"CVE מקושרים לנכסים חיים"},{old:"התפשטות גישה לא מזוהה",new:"סיכוני זהות נחשפים ברצף"}]})

export const SECURITY_PAGE_PATCH_BY_LANG: Record<string, SecurityPagePatch> = {
  en: { features: { security: SECURITY_EN } },
  es: { features: { security: SECURITY_ES } },
  fr: { features: { security: SECURITY_FR } },
  de: { features: { security: SECURITY_DE } },
  it: { features: { security: SECURITY_IT } },
  pt: { features: { security: SECURITY_PT } },
  ru: { features: { security: SECURITY_RU } },
  sv: { features: { security: SECURITY_SV } },
  no: { features: { security: SECURITY_NO } },
  da: { features: { security: SECURITY_DA } },
  zh: { features: { security: SECURITY_ZH } },
  ja: { features: { security: SECURITY_JA } },
  ko: { features: { security: SECURITY_KO } },
  hi: { features: { security: SECURITY_HI } },
  ar: { features: { security: SECURITY_AR } },
  he: { features: { security: SECURITY_HE } },
}
