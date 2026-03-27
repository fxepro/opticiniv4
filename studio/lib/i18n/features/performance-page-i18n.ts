import type { FeatureDetailConfig } from "@/components/feature-detail-page"

type PerformanceI18nPayload = Omit<FeatureDetailConfig, "colors">

type PerformancePagePatch = {
  features: { performance: PerformanceI18nPayload }
}

function p(
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
): PerformanceI18nPayload {
  return {
    title,
    subtitle,
    tagline,
    planeNum: 3,
    stats: [
      { value: "P99", label: "latency tracking" },
      { value: "Real-time", label: "resource metrics" },
      { value: "Auto", label: "baseline learning" },
      { value: "Full", label: "stack visibility" },
    ],
    posStrong,
    posBody,
    sectionLabel,
    sectionTitle,
    cards: [
      { icon: "⚡", title: cards.c1, items: cards.i1 },
      { icon: "📈", title: cards.c2, items: cards.i2 },
      { icon: "🔍", title: cards.c3, items: cards.i3 },
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

const PERFORMANCE_PT = p(
  "Desempenho",
  "Problemas de desempenho corroem a confianca antes de virar indisponibilidade",
  "Lento e o novo fora do ar. Problemas de desempenho corroem a confianca antes de causar falhas.",
  "Problemas de desempenho corroem a confianca muito antes de causar indisponibilidade.",
  "O plano de Desempenho do Opticini oferece visibilidade profunda de como infraestrutura, servicos e cargas consomem recursos, com deteccao de anomalias antes do impacto ao usuario.",
  "O que Desempenho faz",
  "De metricas isoladas para inteligencia de desempenho com contexto",
  "Por que Desempenho importa",
  "De monitorar depois para agir antes",
  "Sem visibilidade de Desempenho",
  "Com Opticini Desempenho",
  "Resultado",
  "Infraestrutura com melhor performance, com anomalias detectadas cedo, recursos ajustados e capacidade planejada.",
  "Encontre problemas de desempenho antes dos usuarios",
  "Monitoramento continuo de recursos com deteccao inteligente de anomalias em toda a pilha.",
  {
    c1: "Metricas de Recursos",
    c2: "Deteccao de Anomalias",
    c3: "Contexto e Causalidade",
    i1: [
      "CPU, memoria, disco e E/S de rede",
      "Uso de recursos em containers e pods",
      "Desempenho de consultas de banco de dados",
      "Throughput e latencia de rede",
    ],
    i2: [
      "Aprendizado dinamico de baseline",
      "Deteccao de desvios e picos",
      "Analise de sazonalidade e tendencia",
      "Previsao de capacidade",
    ],
    i3: [
      "Correlacao com eventos de mudanca",
      "Sugestoes de causa raiz",
      "Correlacao com eficiencia de custo",
      "Recomendacoes de right-sizing",
    ],
    rows: [
      { old: "Reacao tardia a lentidao", new: "Deteccao proativa de anomalias" },
      { old: "Dashboards de metricas isolados", new: "Visao unificada da pilha completa" },
      { old: "Superprovisionamento e desperdicio", new: "Recomendacoes de right-sizing" },
      { old: "Limites de capacidade desconhecidos", new: "Previsao de capacidade" },
    ],
  }
)

const PERFORMANCE_ES = p("Rendimiento","Los problemas de rendimiento erosionan la confianza antes de una caida","Lento es el nuevo caido. El rendimiento afecta la confianza antes del fallo.","Los problemas de rendimiento erosionan la confianza mucho antes de un corte.","Opticini Rendimiento ofrece visibilidad profunda de recursos y detecta anomalias antes del impacto.","Que hace Rendimiento","De metricas aisladas a inteligencia de rendimiento contextual","Por que importa Rendimiento","De reaccionar tarde a anticiparse","Sin visibilidad de rendimiento","Con Opticini Rendimiento","Resultado","Infraestructura mas estable: anomalias detectadas temprano, recursos ajustados y capacidad prevista.","Detecta problemas antes que tus usuarios","Monitoreo continuo de recursos con deteccion inteligente de anomalias en todo el stack.",{c1:"Metricas de recursos",c2:"Deteccion de anomalias",c3:"Contexto y causalidad",i1:["CPU, memoria, disco y E/S de red","Uso de recursos en contenedores y pods","Rendimiento de consultas de base de datos","Throughput y latencia de red"],i2:["Aprendizaje de linea base dinamica","Deteccion de desvio y picos","Analisis estacional y de tendencia","Pronostico de capacidad"],i3:["Correlacion con eventos de cambio","Sugerencias de causa raiz","Correlacion con eficiencia de costos","Recomendaciones de right-sizing"],rows:[{old:"Respuesta tardia a lentitud",new:"Deteccion proactiva de anomalias"},{old:"Metricas en silos",new:"Vista unificada del stack"},{old:"Sobreaprovisionamiento",new:"Recomendaciones de ajuste de recursos"},{old:"Limites de capacidad desconocidos",new:"Pronostico de capacidad"}]})
const PERFORMANCE_FR = p("Performance","Les problemes de performance degradent la confiance avant la panne","Lent est le nouveau indisponible. La performance impacte la confiance avant la panne.","Les problemes de performance degradent la confiance bien avant une panne.","Opticini Performance offre une visibilite profonde des ressources et detecte les anomalies avant impact.","Ce que fait Performance","Des metriques isolees a une intelligence de performance contextuelle","Pourquoi Performance compte","Du reactif a l'anticipation","Sans visibilite performance","Avec Opticini Performance","Resultat","Une infrastructure plus fiable: anomalies detectees tot, ressources ajustees, capacite planifiee.","Detectez les problemes avant vos utilisateurs","Surveillance continue des ressources avec detection intelligente des anomalies sur toute la pile.",{c1:"Metriques de ressources",c2:"Detection d'anomalies",c3:"Contexte et causalite",i1:["CPU, memoire, disque et I/O reseau","Utilisation des ressources conteneurs/pods","Performance des requetes base de donnees","Debit et latence reseau"],i2:["Apprentissage dynamique des baselines","Detection des ecarts et pics","Analyse saisonniere et tendances","Prevision de capacite"],i3:["Correlation avec les changements","Suggestions de cause racine","Correlation avec l'efficacite des couts","Recommandations de right-sizing"],rows:[{old:"Reaction tardive a la lenteur",new:"Detection proactive des anomalies"},{old:"Tableaux de bord en silos",new:"Vue unifiee de la pile"},{old:"Surprovisionnement",new:"Recommandations d'ajustement"},{old:"Limites de capacite inconnues",new:"Prevision de capacite"}]})
const PERFORMANCE_DE = p("Performance","Performanceprobleme untergraben Vertrauen vor Ausfallen","Langsam ist das neue Down. Performanceprobleme treffen Vertrauen fruher als Ausfalle.","Performanceprobleme untergraben Vertrauen lange vor Ausfallen.","Opticini Performance liefert tiefe Ressourcensicht und erkennt Anomalien vor Nutzerauswirkungen.","Was Performance leistet","Von isolierten Metriken zu kontextueller Performance-Intelligenz","Warum Performance wichtig ist","Von reaktiv zu proaktiv","Ohne Performance-Sichtbarkeit","Mit Opticini Performance","Ergebnis","Stabilere Infrastruktur: fruhe Anomalieerkennung, bessere Ressourcennutzung, planbare Kapazitat.","Probleme erkennen, bevor Nutzer sie merken","Kontinuierliches Ressourcenmonitoring mit intelligenter Anomalieerkennung uber den gesamten Stack.",{c1:"Ressourcenmetriken",c2:"Anomalieerkennung",c3:"Kontext und Kausalitat",i1:["CPU, Speicher, Festplatte, Netzwerk-I/O","Ressourcennutzung von Containern und Pods","Datenbankabfrage-Performance","Netzwerkdurchsatz und Latenz"],i2:["Dynamisches Baseline-Lernen","Abweichungs- und Spitzenerkennung","Saisonalitats- und Trendanalyse","Kapazitatsprognose"],i3:["Korrelation mit Change-Events","Root-Cause-Hinweise","Korrelation mit Kosteneffizienz","Right-Sizing-Empfehlungen"],rows:[{old:"Spate Reaktion auf Verlangsamung",new:"Proaktive Anomalieerkennung"},{old:"Metriken in Silos",new:"Einheitliche Stack-Sicht"},{old:"Uberprovisionierung",new:"Right-Sizing-Empfehlungen"},{old:"Unbekannte Kapazitatsgrenzen",new:"Kapazitatsprognose"}]})
const PERFORMANCE_IT = p("Prestazioni","I problemi di prestazioni erodono la fiducia prima del disservizio","Lento e il nuovo down. Le prestazioni impattano la fiducia prima del guasto.","I problemi di prestazioni erodono la fiducia molto prima di un disservizio.","Opticini Prestazioni offre visibilita profonda delle risorse e rileva anomalie prima dell'impatto utente.","Cosa fa Prestazioni","Da metriche isolate a intelligenza prestazionale contestuale","Perche Prestazioni conta","Da reattivo a proattivo","Senza visibilita prestazionale","Con Opticini Prestazioni","Risultato","Infrastruttura piu affidabile: anomalie rilevate presto, risorse ottimizzate e capacita pianificata.","Individua problemi prima degli utenti","Monitoraggio continuo delle risorse con rilevamento intelligente delle anomalie su tutto lo stack.",{c1:"Metriche delle risorse",c2:"Rilevamento anomalie",c3:"Contesto e causalita",i1:["CPU, memoria, disco e I/O rete","Uso risorse di container e pod","Prestazioni query database","Throughput e latenza rete"],i2:["Apprendimento dinamico baseline","Rilevamento deviazioni e picchi","Analisi stagionale e trend","Previsione capacita"],i3:["Correlazione con eventi di modifica","Suggerimenti causa radice","Correlazione con efficienza costi","Raccomandazioni di right-sizing"],rows:[{old:"Reazione tardiva alla lentezza",new:"Rilevamento proattivo anomalie"},{old:"Dashboard isolate",new:"Vista unificata dello stack"},{old:"Sovraprovisioning",new:"Raccomandazioni di ottimizzazione"},{old:"Limiti capacita sconosciuti",new:"Previsione capacita"}]})
const PERFORMANCE_RU = p("Производительность","Проблемы производительности подрывают доверие до отказа","Медленно — это новый down. Производительность влияет на доверие еще до сбоя.","Проблемы производительности подрывают доверие задолго до отказа.","Opticini Производительность дает глубокую видимость ресурсов и выявляет аномалии до влияния на пользователей.","Что делает Производительность","От разрозненных метрик к контекстной аналитике производительности","Почему это важно","От реактивности к проактивности","Без видимости производительности","С Opticini Производительность","Результат","Более устойчивая инфраструктура: раннее обнаружение аномалий, оптимизация ресурсов и прогноз емкости.","Находите проблемы раньше пользователей","Непрерывный мониторинг ресурсов с интеллектуальным обнаружением аномалий по всему стеку.",{c1:"Ресурсные метрики",c2:"Обнаружение аномалий",c3:"Контекст и причинность",i1:["CPU, память, диск и сетевой I/O","Использование ресурсов контейнеров и подов","Производительность запросов БД","Пропускная способность и задержка сети"],i2:["Динамическое обучение базовой линии","Обнаружение отклонений и всплесков","Сезонность и тренды","Прогноз емкости"],i3:["Корреляция с изменениями","Подсказки по root cause","Корреляция с эффективностью затрат","Рекомендации по right-sizing"],rows:[{old:"Поздняя реакция на замедления",new:"Проактивное обнаружение аномалий"},{old:"Метрики в разрозненных панелях",new:"Единая картина всего стека"},{old:"Перепровижининг и потери",new:"Рекомендации по оптимизации"},{old:"Неизвестные пределы емкости",new:"Прогнозирование емкости"}]})
const PERFORMANCE_SV = p("Prestanda","Prestandaproblem urholkar fortroende innan avbrott","Langsamt ar det nya nere. Prestanda paverkar fortroende innan fel.","Prestandaproblem urholkar fortroende langt innan avbrott.","Opticini Prestanda ger djup resursinsyn och upptacker avvikelser innan anvandare paverkas.","Vad Prestanda gor","Fran isolerade matvarden till kontextuell prestandainsikt","Varfor Prestanda ar viktigt","Fran reaktiv till proaktiv","Utan prestandasynlighet","Med Opticini Prestanda","Resultat","Stabilare infrastruktur med tidig avvikelsedetektion, optimerade resurser och planerad kapacitet.","Hitta problem innan anvandarna","Kontinuerlig resursovervakning med intelligent avvikelsedetektion over hela stacken.",{c1:"Resursmatvarden",c2:"Avvikelsedetektion",c3:"Kontext och kausalitet",i1:["CPU, minne, disk och natverks-I/O","Resursanvandning i containrar och pods","Databasfragors prestanda","Genomstromning och latens i natverk"],i2:["Dynamisk baseline-inlarning","Detektion av avvikelser och toppar","Sasongs- och trendanalys","Kapacitetsprognos"],i3:["Korrelation med andringshändelser","Forslag pa rotorsak","Korrelation med kostnadseffektivitet","Right-sizing-rekommendationer"],rows:[{old:"Sen reaktion pa seghet",new:"Proaktiv avvikelsedetektion"},{old:"Siloade dashboards",new:"Enhetlig stackoversikt"},{old:"Overprovisionering",new:"Rekommendationer for resursoptimering"},{old:"Okanda kapacitetsgranser",new:"Kapacitetsprognos"}]})
const PERFORMANCE_NO = p("Ytelse","Ytelsesproblemer svekker tillit for nedetid","Treghet er den nye nedetiden. Ytelse svekker tillit for feil.","Ytelsesproblemer svekker tillit lenge for nedetid.","Opticini Ytelse gir dyp innsikt i ressursbruk og oppdager avvik for brukerne merker det.","Hva Ytelse gjor","Fra isolerte metrikker til kontekstuell ytelsesinnsikt","Hvorfor Ytelse er viktig","Fra reaktiv til proaktiv","Uten ytelsessynlighet","Med Opticini Ytelse","Resultat","Mer robust infrastruktur med tidlig avviksdeteksjon, optimaliserte ressurser og planlagt kapasitet.","Oppdag problemer for brukerne","Kontinuerlig ressursovervaking med intelligent avviksdeteksjon pa tvers av hele stakken.",{c1:"Ressursmetrikker",c2:"Avviksdeteksjon",c3:"Kontekst og kausalitet",i1:["CPU, minne, disk og nettverks-I/O","Ressursbruk i containere og pods","Ytelse pa databasesporringer","Gjennomstromning og nettverkslatens"],i2:["Dynamisk baseline-laering","Deteksjon av avvik og topper","Sesong- og trendanalyse","Kapasitetsprognose"],i3:["Korrelasjon med endringshendelser","Forslag til rotarsak","Korrelasjon med kostnadseffektivitet","Right-sizing-anbefalinger"],rows:[{old:"Sen reaksjon pa treghet",new:"Proaktiv avviksdeteksjon"},{old:"Metrikker i siloer",new:"Samlet visning av hele stakken"},{old:"Overprovisjonering",new:"Anbefalinger for ressursoptimalisering"},{old:"Ukjente kapasitetsgrenser",new:"Kapasitetsprognose"}]})
const PERFORMANCE_DA = p("Ydelse","Ydelsesproblemer nedbryder tillid for nedbrud","Langsomt er det nye nede. Ydelse paavirker tillid for fejl.","Ydelsesproblemer nedbryder tillid lang tid for nedbrud.","Opticini Ydelse giver dyb indsigt i ressourceforbrug og opdager afvigelser for brugerne rammes.","Hvad Ydelse gor","Fra isolerede metrikker til kontekstuel ydelsesindsigt","Hvorfor Ydelse er vigtig","Fra reaktiv til proaktiv","Uden ydelsessynlighed","Med Opticini Ydelse","Resultat","Mere stabil infrastruktur med tidlig afvigelsesdetektion, optimerede ressourcer og planlagt kapacitet.","Find problemer for brugerne","Kontinuerlig ressourceovervaagning med intelligent afvigelsesdetektion pa tvaers af hele stacken.",{c1:"Ressourcemetrikker",c2:"Afvigelsesdetektion",c3:"Kontekst og kausalitet",i1:["CPU, hukommelse, disk og netvaerks-I/O","Ressourceforbrug i containere og pods","Ydelse for databaseforesporgsler","Gennemstromning og netvaerkslatens"],i2:["Dynamisk baseline-laering","Detektion af afvigelser og spikes","Sason- og trendanalyse","Kapacitetsprognose"],i3:["Korrelasjon med andringer","Forslag til root cause","Korrelasjon med omkostningseffektivitet","Right-sizing-anbefalinger"],rows:[{old:"Sen reaktion pa langsomhed",new:"Proaktiv afvigelsesdetektion"},{old:"Silo-opdelte dashboards",new:"Samlet stack-visning"},{old:"Overprovisionering",new:"Anbefalinger til optimering"},{old:"Ukendte kapacitetsgraenser",new:"Kapacitetsprognose"}]})
const PERFORMANCE_ZH = p("性能","性能问题会在故障前消耗用户信任","慢就是新的宕机。性能问题会先于故障损害信任。","性能问题会在故障发生前很久就影响用户信任。","Opticini 性能提供深度资源可视化，并在影响用户前发现异常。","性能能力","从孤立指标到有上下文的性能智能","为什么性能重要","从被动救火到主动预防","没有性能可视化","使用 Opticini 性能","结果","更稳定的基础设施：更早发现异常，资源更合理，容量可提前规划。","在用户之前发现性能问题","全栈持续资源监控与智能异常检测。",{c1:"资源指标",c2:"异常检测",c3:"上下文与因果",i1:["CPU、内存、磁盘、网络 I/O","容器与 Pod 资源使用","数据库查询性能","网络吞吐与延迟"],i2:["动态基线学习","偏差与峰值检测","季节性与趋势分析","容量预测"],i3:["与变更事件关联","根因建议","与成本效率关联","资源规格优化建议"],rows:[{old:"慢了才被动处理",new:"影响前主动检测异常"},{old:"指标分散在多个看板",new:"统一全栈视图"},{old:"过度配置造成浪费",new:"规格优化建议"},{old:"容量上限不可见",new:"容量预测"}]})
const PERFORMANCE_JA = p("パフォーマンス","性能問題は障害前に信頼を損なう","遅いは新しいダウン。性能問題は障害前に信頼を損ないます。","性能問題は障害になる前に信頼を損ないます。","Opticini パフォーマンスはリソース利用を深く可視化し、ユーザー影響前に異常を検知します。","パフォーマンスが行うこと","分断された指標から文脈付き性能インサイトへ","なぜ重要か","事後対応から先回りへ","性能可視化なし","Opticini パフォーマンスあり","結果","より安定した基盤運用。異常の早期検知、適正化、容量計画を実現。","ユーザーより先に問題を発見","全スタックの継続リソース監視とインテリジェント異常検知。",{c1:"リソース指標",c2:"異常検知",c3:"文脈と因果",i1:["CPU、メモリ、ディスク、ネットワーク I/O","コンテナ/Pod の資源利用","DB クエリ性能","ネットワークスループットと遅延"],i2:["動的ベースライン学習","逸脱・スパイク検知","季節性・トレンド分析","容量予測"],i3:["変更イベントとの相関","根本原因の示唆","コスト効率との相関","ライトサイジング提案"],rows:[{old:"遅くなってから対応",new:"影響前の異常検知"},{old:"指標ダッシュボードが分断",new:"統合された全スタック視点"},{old:"過剰プロビジョニング",new:"適正化提案"},{old:"容量限界が不明",new:"容量予測"}]})
const PERFORMANCE_KO = p("성능","성능 문제는 장애 전부터 신뢰를 깎습니다","느림은 새로운 다운입니다. 성능 문제는 장애 전에 신뢰를 손상시킵니다.","성능 문제는 장애가 나기 훨씬 전부터 신뢰를 떨어뜨립니다.","Opticini 성능은 리소스 사용을 깊이 가시화하고 사용자 영향 전에 이상을 탐지합니다.","성능이 하는 일","분리된 지표에서 문맥 기반 성능 인텔리전스로","왜 성능이 중요한가","사후 대응에서 사전 대응으로","성능 가시성 없음","Opticini 성능 사용","결과","더 안정적인 인프라: 이상 조기 탐지, 자원 최적화, 용량 계획 가능.","사용자보다 먼저 문제를 파악","전체 스택의 지속적 리소스 모니터링과 지능형 이상 탐지.",{c1:"리소스 지표",c2:"이상 탐지",c3:"문맥과 인과",i1:["CPU, 메모리, 디스크, 네트워크 I/O","컨테이너/파드 리소스 사용량","DB 쿼리 성능","네트워크 처리량 및 지연"],i2:["동적 베이스라인 학습","편차 및 스파이크 탐지","계절성/추세 분석","용량 예측"],i3:["변경 이벤트와 상관분석","근본 원인 제안","비용 효율성과 상관관계","라이트사이징 권장"],rows:[{old:"느려진 후에 대응",new:"영향 전 선제 이상 탐지"},{old:"지표 대시보드가 분산",new:"통합된 전체 스택 시야"},{old:"과다 프로비저닝",new:"최적화 권장"},{old:"용량 한계 미확인",new:"용량 예측"}]})
const PERFORMANCE_HI = p("परफॉर्मेंस","प्रदर्शन समस्याएं डाउनटाइम से पहले भरोसा कम करती हैं","धीमापन नया डाउन है। प्रदर्शन समस्याएं फेल होने से पहले असर डालती हैं।","प्रदर्शन समस्याएं आउटेज से काफी पहले भरोसा कम कर देती हैं।","Opticini परफॉर्मेंस संसाधनों की गहरी दृश्यता देता है और उपयोगकर्ता प्रभाव से पहले विसंगतियां पहचानता है।","परफॉर्मेंस क्या करता है","अलग-अलग मेट्रिक्स से संदर्भयुक्त प्रदर्शन अंतर्दृष्टि तक","परफॉर्मेंस क्यों जरूरी है","रिएक्टिव से प्रोक्टिव","परफॉर्मेंस विजिबिलिटी के बिना","Opticini परफॉर्मेंस के साथ","परिणाम","ज्यादा स्थिर इंफ्रास्ट्रक्चर: विसंगतियों की जल्दी पहचान, संसाधन अनुकूलन और क्षमता योजना।","उपयोगकर्ताओं से पहले समस्याएं खोजें","पूरे स्टैक में निरंतर संसाधन मॉनिटरिंग और बुद्धिमान विसंगति पहचान।",{c1:"रिसोर्स मेट्रिक्स",c2:"विसंगति पहचान",c3:"संदर्भ और कारण",i1:["CPU, मेमोरी, डिस्क और नेटवर्क I/O","कंटेनर और पॉड रिसोर्स उपयोग","डेटाबेस क्वेरी प्रदर्शन","नेटवर्क थ्रूपुट और लेटेंसी"],i2:["डायनामिक बेसलाइन लर्निंग","विचलन और स्पाइक पहचान","सीजनल और ट्रेंड विश्लेषण","क्षमता पूर्वानुमान"],i3:["चेंज इवेंट से सहसंबंध","रूट-कॉज सुझाव","कॉस्ट-एफिशिएंसी सहसंबंध","राइट-साइजिंग सिफारिशें"],rows:[{old:"धीमेपन पर देर से प्रतिक्रिया",new:"प्रोएक्टिव विसंगति पहचान"},{old:"साइलो में डैशबोर्ड",new:"एकीकृत फुल-स्टैक व्यू"},{old:"ओवरप्रोविजनिंग",new:"संसाधन अनुकूलन सिफारिशें"},{old:"क्षमता सीमा अज्ञात",new:"क्षमता पूर्वानुमान"}]})
const PERFORMANCE_AR = p("الاداء","مشكلات الاداء تضعف الثقة قبل الانقطاع","البطء هو الانقطاع الجديد. مشكلات الاداء تؤثر على الثقة قبل الفشل.","مشكلات الاداء تضعف الثقة قبل الانقطاع بوقت طويل.","يوفر Opticini الاداء رؤية عميقة لاستهلاك الموارد ويكشف الشذوذ قبل تأثير المستخدم.","ماذا يفعل الاداء","من مقاييس معزولة الى ذكاء اداء سياقي","لماذا الاداء مهم","من رد الفعل الى الاستباق","بدون رؤية اداء","مع Opticini الاداء","النتيجة","بنية اكثر استقرارا: كشف مبكر للشذوذ، تحسين الموارد، وتخطيط افضل للسعة.","اكتشف المشكلات قبل المستخدمين","مراقبة مستمرة للموارد مع كشف ذكي للشذوذ عبر كامل المكدس.",{c1:"مقاييس الموارد",c2:"كشف الشذوذ",c3:"السياق والسببية",i1:["CPU والذاكرة والقرص وI/O الشبكة","استخدام الموارد في الحاويات والبودات","اداء استعلامات قواعد البيانات","معدل النقل وزمن الاستجابة للشبكة"],i2:["تعلم خط اساس ديناميكي","كشف الانحرافات والقمم","تحليل موسمي واتجاهات","توقع السعة"],i3:["ربط مع احداث التغيير","اقتراحات السبب الجذري","ربط مع كفاءة التكلفة","توصيات right-sizing"],rows:[{old:"استجابة متاخرة للبطء",new:"كشف استباقي للشذوذ"},{old:"لوحات معزولة",new:"رؤية موحدة للمكدس الكامل"},{old:"تخصيص زائد",new:"توصيات تحسين الموارد"},{old:"حدود سعة غير معروفة",new:"توقع السعة"}]})
const PERFORMANCE_HE = p("ביצועים","בעיות ביצועים פוגעות באמון עוד לפני נפילה","איטי הוא הדאון החדש. בעיות ביצועים פוגעות באמון לפני תקלה.","בעיות ביצועים פוגעות באמון הרבה לפני נפילה.","Opticini ביצועים מספק נראות עמוקה לשימוש במשאבים ומזהה חריגות לפני פגיעה במשתמש.","מה ביצועים עושה","ממדדים מבודדים לתובנות ביצועים בהקשר","למה ביצועים חשובים","מתגובה מאוחרת ליוזמה","בלי נראות ביצועים","עם Opticini ביצועים","תוצאה","תשתית יציבה יותר: זיהוי מוקדם של חריגות, התאמת משאבים ותכנון קיבולת.","לזהות בעיות לפני המשתמשים","ניטור רציף של משאבים עם זיהוי חריגות חכם לאורך כל הסטאק.",{c1:"מדדי משאבים",c2:"זיהוי חריגות",c3:"הקשר וסיבתיות",i1:["CPU, זיכרון, דיסק ו-I/O רשת","שימוש משאבים בקונטיינרים ופודים","ביצועי שאילתות מסד נתונים","תפוקה והשהיית רשת"],i2:["למידת בסיס דינמית","זיהוי סטיות וקפיצות","ניתוח עונתיות ומגמות","חיזוי קיבולת"],i3:["קורלציה לאירועי שינוי","הצעות לגורם שורש","קורלציה ליעילות עלות","המלצות right-sizing"],rows:[{old:"תגובה מאוחרת לאיטיות",new:"זיהוי יזום של חריגות"},{old:"לוחות מחוונים מבודדים",new:"תצוגת סטאק מאוחדת"},{old:"הקצאת יתר",new:"המלצות לאופטימיזציה"},{old:"גבולות קיבולת לא ידועים",new:"חיזוי קיבולת"}]})

const PERFORMANCE_EN = p(
  "Performance",
  "Performance issues erode trust long before they cause outages",
  "Slow is the new down. Performance issues erode trust long before they cause outages.",
  "Performance issues erode trust long before they cause outages.",
  "Opticini Performance gives you deep visibility into infrastructure, services, and workloads with anomaly detection that finds issues before users feel them.",
  "What Performance Does",
  "From isolated metrics to contextual performance intelligence",
  "Why Performance Matters",
  "From blind metrics to actionable insight",
  "Without Performance Visibility",
  "With Opticini Performance",
  "Outcome",
  "Infrastructure that performs at its best, with anomalies detected early, resources right-sized, and capacity planned ahead.",
  "Find performance problems before users do",
  "Continuous resource monitoring with intelligent anomaly detection across your full stack.",
  {
    c1: "Resource Metrics",
    c2: "Anomaly Detection",
    c3: "Context and Causality",
    i1: ["CPU, memory, disk, network I/O", "Container and pod resource usage", "Database query performance", "Network throughput and latency"],
    i2: ["Dynamic baseline learning", "Deviation and spike detection", "Seasonal and trend analysis", "Capacity forecasting"],
    i3: ["Correlated with change events", "Root cause suggestions", "Cost-efficiency correlation", "Right-sizing recommendations"],
    rows: [
      { old: "Reactive to slowdowns", new: "Proactive anomaly detection" },
      { old: "Siloed metric dashboards", new: "Unified full-stack view" },
      { old: "Overprovisioned waste", new: "Right-sizing recommendations" },
      { old: "Unknown capacity limits", new: "Predictive capacity forecasting" },
    ],
  }
)

export const PERFORMANCE_PAGE_PATCH_BY_LANG: Record<string, PerformancePagePatch> = {
  en: { features: { performance: PERFORMANCE_EN } },
  es: { features: { performance: PERFORMANCE_ES } },
  fr: { features: { performance: PERFORMANCE_FR } },
  de: { features: { performance: PERFORMANCE_DE } },
  it: { features: { performance: PERFORMANCE_IT } },
  pt: { features: { performance: PERFORMANCE_PT } },
  ru: { features: { performance: PERFORMANCE_RU } },
  sv: { features: { performance: PERFORMANCE_SV } },
  no: { features: { performance: PERFORMANCE_NO } },
  da: { features: { performance: PERFORMANCE_DA } },
  zh: { features: { performance: PERFORMANCE_ZH } },
  ja: { features: { performance: PERFORMANCE_JA } },
  ko: { features: { performance: PERFORMANCE_KO } },
  hi: { features: { performance: PERFORMANCE_HI } },
  ar: { features: { performance: PERFORMANCE_AR } },
  he: { features: { performance: PERFORMANCE_HE } },
}
