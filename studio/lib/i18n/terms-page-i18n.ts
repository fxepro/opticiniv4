import { deepMergePublicPages } from "./deep-merge-public-pages"
import { PUBLIC_PAGES_EN } from "./public-pages-en"

type TermsRoot = typeof PUBLIC_PAGES_EN.termsOfService
type TermsPayload = { termsOfService: TermsRoot }

const TERM_EN = PUBLIC_PAGES_EN.termsOfService

function m(patch: Record<string, unknown>): TermsRoot {
  return deepMergePublicPages(
    TERM_EN as unknown as Record<string, unknown>,
    patch
  ) as unknown as TermsRoot
}

const EN: TermsPayload = { termsOfService: TERM_EN }

const ES: TermsPayload = {
  termsOfService: m({
    title: "Términos del servicio",
    subtitle: "Condiciones que rigen el uso de los servicios de Opticini",
    lastUpdatedPrefix: "Última actualización:",
    acceptance: {
      title: "Aceptación de los términos",
      subtitle: "Al usar nuestro servicio, acepta estos términos",
      p1: 'Al acceder y usar Opticini ("el Servicio"), acepta quedar vinculado por los términos de este acuerdo. Si no está de acuerdo, no utilice el servicio.',
      p2: 'Estos Términos del servicio ("Términos") rigen el uso de nuestras pruebas y monitorización de rendimiento web. Léalos con atención antes de usar el Servicio.',
    },
    service: {
      title: "Descripción del servicio",
      subtitle: "Lo que ofrece Opticini",
      intro: "Opticini ofrece pruebas y monitorización de rendimiento web, incluyendo:",
      items: [
        "Análisis y pruebas de rendimiento web",
        "Medición de Core Web Vitals",
        "Recomendaciones de optimización",
        "Gráficos waterfall y análisis de recursos",
        "Monitorización e informes de rendimiento",
      ],
      outro: "Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte del Servicio con aviso razonable.",
    },
    responsibilities: {
      title: "Responsabilidades del usuario",
      subtitle: "Sus obligaciones al usar nuestro servicio",
      intro: "Al usar Opticini, usted acepta:",
      items: [
        "Proporcionar información veraz y precisa",
        "Usar el Servicio solo con fines lícitos",
        "No intentar acceder sin autorización a nuestros sistemas",
        "No interferir ni interrumpir el Servicio",
        "Respetar los derechos de propiedad intelectual",
        "Cumplir todas las leyes y normativas aplicables",
      ],
      importantLabel: "Importante:",
      importantBody:
        "Usted es responsable de asegurarse de tener derecho a probar cualquier URL de sitio web que envíe para su análisis.",
    },
    acceptableUse: {
      title: "Política de uso aceptable",
      subtitle: "Lo que no está permitido en nuestra plataforma",
      intro: "Las siguientes actividades están estrictamente prohibidas:",
      items: [
        "Probar sitios web sin la debida autorización",
        "Intentar sobrecargar o inutilizar nuestros sistemas",
        "Usar herramientas automatizadas para abusar del servicio",
        "Intentar realizar ingeniería inversa de nuestra tecnología",
        "Compartir contenido o enlaces maliciosos",
        "Violar leyes o normativas aplicables",
      ],
      outro: "La violación de estos términos puede dar lugar a la suspensión o terminación inmediata de su acceso al Servicio.",
    },
    intellectual: {
      title: "Propiedad intelectual",
      subtitle: "Titularidad y derechos de uso",
      ourRightsTitle: "Nuestros derechos",
      ourRightsBody:
        "El Servicio y su contenido, funciones y funcionalidad originales son propiedad de Opticini y están protegidos por leyes internacionales de derechos de autor, marcas, patentes, secretos comerciales y otras normas de propiedad intelectual.",
      yourRightsTitle: "Sus derechos",
      yourRightsBody:
        "Usted conserva la titularidad del contenido que envíe. Al enviar contenido, nos otorga una licencia no exclusiva, mundial y libre de regalías para usarlo, mostrarlo y distribuirlo únicamente para prestar el Servicio.",
      thirdPartyTitle: "Contenido de terceros",
      thirdPartyBody:
        "Nuestro Servicio puede contener enlaces a sitios o servicios de terceros. No somos responsables del contenido ni de las prácticas de esos sitios.",
    },
    liability: {
      title: "Limitación de responsabilidad",
      subtitle: "Límites de nuestra responsabilidad",
      intro:
        "En la máxima medida permitida por la ley, Opticini no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluidos, entre otros, la pérdida de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles, derivados de:",
      items: [
        "Su uso o la imposibilidad de usar el Servicio",
        "Cualquier acceso no autorizado o uso de nuestros servidores",
        "Cualquier interrupción o cese de la transmisión hacia o desde el Servicio",
        "Cualquier error, virus u otro código dañino que pueda transmitirse",
        "Cualquier error u omisión en el contenido o cualquier pérdida o daño incurrido",
      ],
      outro: "Nuestra responsabilidad total frente a usted por reclamaciones derivadas del uso del Servicio no excederá el importe que nos haya pagado, si lo hubiera, en los doce meses anteriores a la reclamación.",
    },
    termination: {
      title: "Rescisión",
      subtitle: "Cómo puede terminarse el acceso al servicio",
      p1: "Podemos terminar o suspender su acceso al Servicio de inmediato, sin previo aviso ni responsabilidad, por cualquier motivo, incluido el incumplimiento de los Términos.",
      p2: "Tras la terminación, su derecho a usar el Servicio cesará de inmediato. Si desea terminar su cuenta, puede dejar de usar el Servicio.",
    },
    changes: {
      title: "Cambios en los términos",
      subtitle: "Cómo gestionamos las actualizaciones",
      p1: "Nos reservamos el derecho de modificar o sustituir estos Términos en cualquier momento. Si un cambio es sustancial, intentaremos avisar con al menos 30 días de antelación.",
      p2: "El uso continuado del Servicio tras los cambios constituye la aceptación de los nuevos Términos.",
    },
    contact: {
      title: "Contáctenos",
      subtitle: "¿Preguntas sobre estos términos?",
      body: "Si tiene preguntas sobre estos Términos del servicio, contáctenos:",
      email: "Correo: legal@opticini.com",
      website: "Sitio web: opticini.com",
    },
  }),
}

const FR: TermsPayload = {
  termsOfService: m({
    title: "Conditions d'utilisation",
    subtitle: "Les conditions régissant votre utilisation des services Opticini",
    lastUpdatedPrefix: "Dernière mise à jour :",
    acceptance: {
      title: "Acceptation des conditions",
      subtitle: "En utilisant notre service, vous acceptez ces conditions",
      p1: 'En accédant et en utilisant Opticini ("le Service"), vous acceptez d\'être lié par les présentes conditions. Si vous n\'êtes pas d\'accord, n\'utilisez pas le Service.',
      p2: 'Les présentes Conditions d\'utilisation régissent l\'utilisation de nos services de test et de surveillance des performances web. Veuillez les lire attentivement.',
    },
    service: {
      title: "Description du service",
      subtitle: "Ce qu\'Opticini fournit",
      intro: "Opticini fournit des services de test et de surveillance des performances web, notamment :",
      items: [
        "Analyse et tests de performance web",
        "Mesure des Core Web Vitals",
        "Recommandations d\'optimisation",
        "Graphiques waterfall et analyse des ressources",
        "Surveillance et rapports de performance",
      ],
      outro: "Nous nous réservons le droit de modifier, suspendre ou interrompre toute partie du Service avec un préavis raisonnable.",
    },
    responsibilities: {
      title: "Responsabilités de l\'utilisateur",
      subtitle: "Vos obligations lors de l\'utilisation du service",
      intro: "En utilisant Opticini, vous acceptez de :",
      items: [
        "Fournir des informations exactes et véridiques",
        "Utiliser le Service uniquement à des fins licites",
        "Ne pas tenter d\'accéder sans autorisation à nos systèmes",
        "Ne pas interférer avec le Service ou perturber son fonctionnement",
        "Respecter les droits de propriété intellectuelle",
        "Respecter toutes les lois et réglementations applicables",
      ],
      importantLabel: "Important :",
      importantBody:
        "Vous êtes responsable de vous assurer d\'avoir le droit de tester toute URL de site web que vous soumettez à l\'analyse.",
    },
    acceptableUse: {
      title: "Politique d\'utilisation acceptable",
      subtitle: "Ce qui n\'est pas autorisé sur notre plateforme",
      intro: "Les activités suivantes sont strictement interdites :",
      items: [
        "Tester des sites web sans autorisation appropriée",
        "Tenter de surcharger ou de faire tomber nos systèmes",
        "Utiliser des outils automatisés pour abuser du Service",
        "Tenter de procéder à la rétro-ingénierie de notre technologie",
        "Partager du contenu ou des liens malveillants",
        "Violer toute loi ou réglementation applicable",
      ],
      outro: "La violation de ces conditions peut entraîner la suspension ou la résiliation immédiate de votre accès au Service.",
    },
    intellectual: {
      title: "Propriété intellectuelle",
      subtitle: "Titularité et droits d\'utilisation",
      ourRightsTitle: "Nos droits",
      ourRightsBody:
        "Le Service et son contenu, ses fonctionnalités et son fonctionnement d\'origine sont la propriété d\'Opticini et sont protégés par les lois internationales sur le droit d\'auteur, les marques, les brevets, les secrets commerciaux et autres lois sur la propriété intellectuelle.",
      yourRightsTitle: "Vos droits",
      yourRightsBody:
        "Vous conservez la propriété du contenu que vous soumettez. En soumettant du contenu, vous nous accordez une licence non exclusive, mondiale et libre de redevances pour l\'utiliser, l\'afficher et le distribuer uniquement dans le but de fournir le Service.",
      thirdPartyTitle: "Contenu tiers",
      thirdPartyBody:
        "Notre Service peut contenir des liens vers des sites ou services tiers. Nous ne sommes pas responsables du contenu ou des pratiques de ces sites tiers.",
    },
    liability: {
      title: "Limitation de responsabilité",
      subtitle: "Limites de notre responsabilité",
      intro:
        "Dans la mesure maximale permise par la loi, Opticini ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris, sans limitation, la perte de profits, de données, d\'usage, de goodwill ou d\'autres pertes immatérielles, résultant de :",
      items: [
        "Votre utilisation ou votre incapacité à utiliser le Service",
        "Tout accès non autorisé ou toute utilisation de nos serveurs",
        "Toute interruption ou cessation de transmission vers ou depuis le Service",
        "Tout bug, virus ou autre code nuisible pouvant être transmis",
        "Toute erreur ou omission dans le contenu ou toute perte ou dommage subi",
      ],
      outro: "Notre responsabilité totale envers vous pour toute réclamation liée à l\'utilisation du Service ne dépassera pas le montant que vous nous avez payé, le cas échéant, au cours des douze mois précédant la réclamation.",
    },
    termination: {
      title: "Résiliation",
      subtitle: "Comment l\'accès au service peut être résilié",
      p1: "Nous pouvons résilier ou suspendre votre accès au Service immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris en cas de violation des Conditions.",
      p2: "Après résiliation, votre droit d\'utiliser le Service cessera immédiatement. Pour résilier votre compte, vous pouvez simplement cesser d\'utiliser le Service.",
    },
    changes: {
      title: "Modifications des conditions",
      subtitle: "Comment nous gérons les mises à jour",
      p1: "Nous nous réservons le droit de modifier ou de remplacer ces Conditions à tout moment. Si une révision est substantielle, nous tenterons de fournir un préavis d\'au moins 30 jours.",
      p2: "Votre utilisation continue du Service après toute modification constitue l\'acceptation des nouvelles Conditions.",
    },
    contact: {
      title: "Contact",
      subtitle: "Des questions sur ces conditions ?",
      body: "Pour toute question sur ces Conditions d\'utilisation, contactez-nous :",
      email: "E-mail : legal@opticini.com",
      website: "Site web : opticini.com",
    },
  }),
}

const DE: TermsPayload = {
  termsOfService: m({
    title: "Nutzungsbedingungen",
    subtitle: "Die Bedingungen für die Nutzung der Opticini-Dienste",
    lastUpdatedPrefix: "Zuletzt aktualisiert:",
    acceptance: {
      title: "Annahme der Bedingungen",
      subtitle: "Mit der Nutzung unseres Dienstes stimmen Sie diesen Bedingungen zu",
      p1: 'Durch den Zugriff auf und die Nutzung von Opticini ("der Dienst") erklären Sie sich mit diesen Bedingungen einverstanden. Wenn Sie nicht einverstanden sind, nutzen Sie den Dienst nicht.',
      p2: "Diese Nutzungsbedingungen regeln die Nutzung unserer Website-Performance-Tests und -Überwachung. Bitte lesen Sie sie sorgfältig.",
    },
    service: {
      title: "Leistungsbeschreibung",
      subtitle: "Was Opticini bietet",
      intro: "Opticini bietet Website-Performance-Tests und -Überwachung, einschließlich:",
      items: [
        "Website-Performance-Analyse und -Tests",
        "Messung der Core Web Vitals",
        "Optimierungsempfehlungen",
        "Waterfall-Diagramme und Ressourcenanalyse",
        "Performance-Monitoring und Berichte",
      ],
      outro: "Wir behalten uns vor, Teile des Dienstes mit angemessener Vorankündigung zu ändern, auszusetzen oder einzustellen.",
    },
    responsibilities: {
      title: "Pflichten der Nutzer",
      subtitle: "Ihre Verpflichtungen bei der Nutzung",
      intro: "Bei der Nutzung von Opticini verpflichten Sie sich:",
      items: [
        "Wahrheitsgemäße und genaue Angaben zu machen",
        "Den Dienst nur für rechtmäßige Zwecke zu nutzen",
        "Keinen unbefugten Zugriff auf unsere Systeme zu versuchen",
        "Den Dienst nicht zu stören oder zu unterbrechen",
        "Geistige Eigentumsrechte zu respektieren",
        "Alle geltenden Gesetze und Vorschriften einzuhalten",
      ],
      importantLabel: "Wichtig:",
      importantBody:
        "Sie sind dafür verantwortlich, dass Sie berechtigt sind, jede von Ihnen zur Analyse eingereichte Website-URL zu testen.",
    },
    acceptableUse: {
      title: "Richtlinie zur akzeptablen Nutzung",
      subtitle: "Was auf unserer Plattform nicht erlaubt ist",
      intro: "Folgende Aktivitäten sind streng verboten:",
      items: [
        "Websites ohne angemessene Genehmigung testen",
        "Versuche, unsere Systeme zu überlasten oder zum Absturz zu bringen",
        "Automatisierte Tools zum Missbrauch des Dienstes",
        "Versuche der Reverse Engineering unserer Technologie",
        "Weitergabe schädlicher Inhalte oder Links",
        "Verstoß gegen geltende Gesetze oder Vorschriften",
      ],
      outro: "Verstöße können zur sofortigen Sperrung oder Beendigung Ihres Zugangs führen.",
    },
    intellectual: {
      title: "Geistiges Eigentum",
      subtitle: "Eigentum und Nutzungsrechte",
      ourRightsTitle: "Unsere Rechte",
      ourRightsBody:
        "Der Dienst und seine ursprünglichen Inhalte, Funktionen und Funktionalitäten gehören Opticini und sind durch internationale Urheber-, Marken-, Patent-, Geschäftsgeheimnis- und andere Schutzrechte geschützt.",
      yourRightsTitle: "Ihre Rechte",
      yourRightsBody:
        "Sie behalten das Eigentum an von Ihnen eingereichten Inhalten. Mit der Einreichung erteilen Sie uns eine nicht ausschließliche, weltweite, gebührenfreie Lizenz zur Nutzung, Anzeige und Verteilung ausschließlich zur Erbringung des Dienstes.",
      thirdPartyTitle: "Inhalte Dritter",
      thirdPartyBody:
        "Unser Dienst kann Links zu Websites oder Diensten Dritter enthalten. Wir sind nicht verantwortlich für deren Inhalte oder Praktiken.",
    },
    liability: {
      title: "Haftungsbeschränkung",
      subtitle: "Unsere Haftungsgrenzen",
      intro:
        "Soweit gesetzlich zulässig, haftet Opticini nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, einschließlich entgangenen Gewinns, Datenverlusts, Nutzungsausfalls, Goodwills oder anderer immaterieller Verluste, die entstehen aus:",
      items: [
        "Ihrer Nutzung oder der Unmöglichkeit der Nutzung des Dienstes",
        "Unbefugtem Zugriff auf oder Nutzung unserer Server",
        "Unterbrechung oder Einstellung der Übertragung zu oder vom Dienst",
        "Fehlern, Viren oder anderem schädlichem Code",
        "Fehlern oder Auslassungen in Inhalten oder entstandenen Schäden",
      ],
      outro: "Unsere Gesamthaftung für Ansprüche aus der Nutzung des Dienstes übersteigt nicht den von Ihnen gezahlten Betrag, falls vorhanden, in den zwölf Monaten vor dem Anspruch.",
    },
    termination: {
      title: "Kündigung",
      subtitle: "Wie der Zugang beendet werden kann",
      p1: "Wir können Ihren Zugang zum Dienst sofort ohne Vorankündigung oder Haftung aus beliebigem Grund beenden oder aussetzen, insbesondere bei Verstoß gegen die Bedingungen.",
      p2: "Nach Kündigung endet Ihr Nutzungsrecht sofort. Sie können die Nutzung einfach einstellen.",
    },
    changes: {
      title: "Änderungen der Bedingungen",
      subtitle: "Umgang mit Aktualisierungen",
      p1: "Wir können diese Bedingungen jederzeit ändern oder ersetzen. Bei wesentlichen Änderungen bemühen wir uns um eine Vorankündigung von mindestens 30 Tagen.",
      p2: "Die fortgesetzte Nutzung nach Änderungen gilt als Annahme der neuen Bedingungen.",
    },
    contact: {
      title: "Kontakt",
      subtitle: "Fragen zu diesen Bedingungen?",
      body: "Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns:",
      email: "E-Mail: legal@opticini.com",
      website: "Website: opticini.com",
    },
  }),
}

const IT: TermsPayload = {
  termsOfService: m({
    title: "Termini di servizio",
    subtitle: "I termini che regolano l'uso dei servizi Opticini",
    lastUpdatedPrefix: "Ultimo aggiornamento:",
    acceptance: {
      title: "Accettazione dei termini",
      subtitle: "Utilizzando il servizio, accetti questi termini",
      p1: 'Accedendo e utilizzando Opticini ("il Servizio"), accetti di essere vincolato da questi termini. Se non sei d\'accordo, non utilizzare il Servizio.',
      p2: "I presenti Termini di servizio regolano l'uso dei nostri servizi di test e monitoraggio delle prestazioni web. Leggili attentamente.",
    },
    service: {
      title: "Descrizione del servizio",
      subtitle: "Cosa offre Opticini",
      intro: "Opticini fornisce test e monitoraggio delle prestazioni web, inclusi:",
      items: [
        "Analisi e test delle prestazioni web",
        "Misurazione dei Core Web Vitals",
        "Raccomandazioni di ottimizzazione",
        "Grafici waterfall e analisi delle risorse",
        "Monitoraggio e report sulle prestazioni",
      ],
      outro: "Ci riserviamo il diritto di modificare, sospendere o interrompere qualsiasi parte del Servizio con un preavviso ragionevole.",
    },
    responsibilities: {
      title: "Responsabilità dell'utente",
      subtitle: "I tuoi obblighi nell'uso del servizio",
      intro: "Utilizzando Opticini, accetti di:",
      items: [
        "Fornire informazioni accurate e veritiere",
        "Usare il Servizio solo per scopi leciti",
        "Non tentare accessi non autorizzati ai nostri sistemi",
        "Non interferire con il Servizio o interromperne il funzionamento",
        "Rispettare i diritti di proprietà intellettuale",
        "Rispettare tutte le leggi e normative applicabili",
      ],
      importantLabel: "Importante:",
      importantBody:
        "Sei responsabile di assicurarti di avere il diritto di testare qualsiasi URL di sito web che invii per l'analisi.",
    },
    acceptableUse: {
      title: "Politica di uso accettabile",
      subtitle: "Cosa non è consentito sulla nostra piattaforma",
      intro: "Le seguenti attività sono severamente vietate:",
      items: [
        "Testare siti web senza adeguata autorizzazione",
        "Tentare di sovraccaricare o far cadere i nostri sistemi",
        "Usare strumenti automatizzati per abusare del Servizio",
        "Tentare di fare reverse engineering della nostra tecnologia",
        "Condividere contenuti o link dannosi",
        "Violare leggi o normative applicabili",
      ],
      outro: "La violazione può comportare la sospensione o la cessazione immediata dell'accesso al Servizio.",
    },
    intellectual: {
      title: "Proprietà intellettuale",
      subtitle: "Titolarità e diritti d'uso",
      ourRightsTitle: "I nostri diritti",
      ourRightsBody:
        "Il Servizio e i suoi contenuti, funzionalità e caratteristiche originali sono di proprietà di Opticini e sono protetti da leggi internazionali su copyright, marchi, brevetti, segreti commerciali e altra proprietà intellettuale.",
      yourRightsTitle: "I tuoi diritti",
      yourRightsBody:
        "Conservi la proprietà dei contenuti che invii. Inviando contenuti ci concedi una licenza non esclusiva, mondiale e royalty-free per usarli, mostrarli e distribuirli solo per fornire il Servizio.",
      thirdPartyTitle: "Contenuti di terze parti",
      thirdPartyBody:
        "Il Servizio può contenere link a siti o servizi di terze parti. Non siamo responsabili per contenuti o pratiche di tali siti.",
    },
    liability: {
      title: "Limitazione di responsabilità",
      subtitle: "Limiti della nostra responsabilità",
      intro:
        "Nella misura massima consentita dalla legge, Opticini non sarà responsabile per danni indiretti, incidentali, speciali, consequenziali o punitivi, inclusi, a titolo esemplificativo, perdita di profitti, dati, uso, avviamento o altre perdite immateriali, derivanti da:",
      items: [
        "Il tuo utilizzo o l'impossibilità di utilizzare il Servizio",
        "Accesso non autorizzato o uso dei nostri server",
        "Interruzione o cessazione della trasmissione da o verso il Servizio",
        "Bug, virus o altro codice dannoso trasmesso",
        "Errori o omissioni nei contenuti o perdite o danni subiti",
      ],
      outro: "La nostra responsabilità totale per reclami derivanti dall'uso del Servizio non supererà l'importo da te pagato, se presente, nei dodici mesi precedenti il reclamo.",
    },
    termination: {
      title: "Risoluzione",
      subtitle: "Come può terminare l'accesso al servizio",
      p1: "Possiamo terminare o sospendere il tuo accesso al Servizio immediatamente, senza preavviso o responsabilità, per qualsiasi motivo, inclusa la violazione dei Termini.",
      p2: "Dopo la risoluzione, il tuo diritto di usare il Servizio cessa immediatamente. Puoi semplicemente smettere di usare il Servizio.",
    },
    changes: {
      title: "Modifiche ai termini",
      subtitle: "Come gestiamo gli aggiornamenti",
      p1: "Ci riserviamo il diritto di modificare o sostituire questi Termini in qualsiasi momento. Se una revisione è sostanziale, cercheremo di fornire almeno 30 giorni di preavviso.",
      p2: "L'uso continuato del Servizio dopo le modifiche costituisce accettazione dei nuovi Termini.",
    },
    contact: {
      title: "Contattaci",
      subtitle: "Domande su questi termini?",
      body: "Per domande su questi Termini di servizio, contattaci:",
      email: "Email: legal@opticini.com",
      website: "Sito web: opticini.com",
    },
  }),
}

const PT: TermsPayload = {
  termsOfService: m({
    title: "Termos de servico",
    subtitle: "Os termos que regem o uso dos servicos Opticini",
    lastUpdatedPrefix: "Ultima atualizacao:",
    acceptance: {
      title: "Aceitacao dos termos",
      subtitle: "Ao usar nosso servico, voce aceita estes termos",
      p1: 'Ao acessar e usar o Opticini ("o Servico"), voce concorda em ficar vinculado a estes termos. Se nao concordar, nao use o Servico.',
      p2: "Estes Termos de servico regem o uso de nossos servicos de teste e monitoramento de desempenho web. Leia-os com atencao.",
    },
    service: {
      title: "Descricao do servico",
      subtitle: "O que a Opticini oferece",
      intro: "A Opticini oferece teste e monitoramento de desempenho de sites, incluindo:",
      items: [
        "Analise e testes de desempenho web",
        "Medicao de Core Web Vitals",
        "Recomendacoes de otimizacao",
        "Graficos waterfall e analise de recursos",
        "Monitoramento e relatorios de desempenho",
      ],
      outro: "Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer parte do Servico com aviso razoavel.",
    },
    responsibilities: {
      title: "Responsabilidades do usuario",
      subtitle: "Suas obrigacoes ao usar o servico",
      intro: "Ao usar a Opticini, voce concorda em:",
      items: [
        "Fornecer informacoes precisas e verdadeiras",
        "Usar o Servico apenas para fins licitos",
        "Nao tentar acessar nossos sistemas sem autorizacao",
        "Nao interferir ou interromper o Servico",
        "Respeitar direitos de propriedade intelectual",
        "Cumprir todas as leis e regulamentos aplicaveis",
      ],
      importantLabel: "Importante:",
      importantBody:
        "Voce e responsavel por garantir que tem direito de testar qualquer URL de site enviada para analise.",
    },
    acceptableUse: {
      title: "Politica de uso aceitavel",
      subtitle: "O que nao e permitido em nossa plataforma",
      intro: "As seguintes atividades sao estritamente proibidas:",
      items: [
        "Testar sites sem autorizacao adequada",
        "Tentar sobrecarregar ou derrubar nossos sistemas",
        "Usar ferramentas automatizadas para abusar do Servico",
        "Tentar fazer engenharia reversa de nossa tecnologia",
        "Compartilhar conteudo ou links maliciosos",
        "Violar leis ou regulamentos aplicaveis",
      ],
      outro: "A violacao pode resultar na suspensao ou rescisao imediata do seu acesso ao Servico.",
    },
    intellectual: {
      title: "Propriedade intelectual",
      subtitle: "Titularidade e direitos de uso",
      ourRightsTitle: "Nossos direitos",
      ourRightsBody:
        "O Servico e seu conteudo, recursos e funcionalidades originais sao de propriedade da Opticini e estao protegidos por leis internacionais de direitos autorais, marcas, patentes, segredos comerciais e outra propriedade intelectual.",
      yourRightsTitle: "Seus direitos",
      yourRightsBody:
        "Voce mantem a propriedade do conteudo enviado. Ao enviar conteudo, voce nos concede uma licenca nao exclusiva, mundial e isenta de royalties para usa-lo, exibi-lo e distribui-lo apenas para fornecer o Servico.",
      thirdPartyTitle: "Conteudo de terceiros",
      thirdPartyBody:
        "Nosso Servico pode conter links para sites ou servicos de terceiros. Nao somos responsaveis pelo conteudo ou praticas desses sites.",
    },
    liability: {
      title: "Limitacao de responsabilidade",
      subtitle: "Limites da nossa responsabilidade",
      intro:
        "Na medida maxima permitida por lei, a Opticini nao sera responsavel por danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitacao, perda de lucros, dados, uso, fundo de comercio ou outras perdas intangiveis, resultantes de:",
      items: [
        "Seu uso ou incapacidade de usar o Servico",
        "Qualquer acesso nao autorizado ou uso de nossos servidores",
        "Qualquer interrupcao ou cessacao de transmissao para ou do Servico",
        "Quaisquer bugs, virus ou outro codigo prejudicial transmitido",
        "Quaisquer erros ou omissoes em qualquer conteudo ou perdas ou danos incorridos",
      ],
      outro: "Nossa responsabilidade total por reclamacoes decorrentes do uso do Servico nao excedera o valor pago a nos, se houver, nos doze meses anteriores a reclamacao.",
    },
    termination: {
      title: "Rescisao",
      subtitle: "Como o acesso ao servico pode ser encerrado",
      p1: "Podemos rescindir ou suspender seu acesso ao Servico imediatamente, sem aviso previo ou responsabilidade, por qualquer motivo, inclusive violacao dos Termos.",
      p2: "Apos a rescisao, seu direito de usar o Servico cessara imediatamente. Para encerrar sua conta, basta parar de usar o Servico.",
    },
    changes: {
      title: "Alteracoes aos termos",
      subtitle: "Como tratamos atualizacoes",
      p1: "Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. Se uma revisao for material, tentaremos avisar com pelo menos 30 dias de antecedencia.",
      p2: "O uso continuado do Servico apos alteracoes constitui aceitacao dos novos Termos.",
    },
    contact: {
      title: "Fale conosco",
      subtitle: "Duvidas sobre estes termos?",
      body: "Se tiver duvidas sobre estes Termos de servico, entre em contato:",
      email: "E-mail: legal@opticini.com",
      website: "Site: opticini.com",
    },
  }),
}

const RU: TermsPayload = {
  termsOfService: m({
    title: "Условия использования",
    subtitle: "Условия, регулирующие использование сервисов Opticini",
    lastUpdatedPrefix: "Последнее обновление:",
    acceptance: {
      title: "Принятие условий",
      subtitle: "Используя сервис, вы соглашаетесь с этими условиями",
      p1: 'Получая доступ к Opticini («Сервис») и используя его, вы соглашаетесь с настоящими условиями. Если вы не согласны, не используйте Сервис.',
      p2: "Настоящие Условия использования регулируют использование наших услуг по тестированию и мониторингу производительности веб-сайтов. Внимательно прочитайте их.",
    },
    service: {
      title: "Описание сервиса",
      subtitle: "Что предоставляет Opticini",
      intro: "Opticini предоставляет тестирование и мониторинг производительности веб-сайтов, включая:",
      items: [
        "Анализ и тестирование производительности веб-сайтов",
        "Измерение Core Web Vitals",
        "Рекомендации по оптимизации",
        "Waterfall-диаграммы и анализ ресурсов",
        "Мониторинг производительности и отчёты",
      ],
      outro: "Мы оставляем за собой право изменять, приостанавливать или прекращать любую часть Сервиса с разумным уведомлением.",
    },
    responsibilities: {
      title: "Обязанности пользователя",
      subtitle: "Ваши обязательства при использовании сервиса",
      intro: "Используя Opticini, вы соглашаетесь:",
      items: [
        "Предоставлять точную и правдивую информацию",
        "Использовать Сервис только в законных целях",
        "Не пытаться получить несанкционированный доступ к нашим системам",
        "Не мешать работе Сервиса и не нарушать его работу",
        "Уважать права интеллектуальной собственности",
        "Соблюдать все применимые законы и правила",
      ],
      importantLabel: "Важно:",
      importantBody:
        "Вы несёте ответственность за то, чтобы иметь право тестировать любой URL веб-сайта, который вы отправляете на анализ.",
    },
    acceptableUse: {
      title: "Политика допустимого использования",
      subtitle: "Что запрещено на нашей платформе",
      intro: "Следующие действия строго запрещены:",
      items: [
        "Тестирование веб-сайтов без надлежащего разрешения",
        "Попытки перегрузить или вывести из строя наши системы",
        "Использование автоматизированных средств для злоупотребления Сервисом",
        "Попытки обратной разработки нашей технологии",
        "Распространение вредоносного контента или ссылок",
        "Нарушение применимых законов или правил",
      ],
      outro: "Нарушение может привести к немедленной блокировке или прекращению доступа к Сервису.",
    },
    intellectual: {
      title: "Интеллектуальная собственность",
      subtitle: "Право собственности и права использования",
      ourRightsTitle: "Наши права",
      ourRightsBody:
        "Сервис и его оригинальный контент, функции и функциональность принадлежат Opticini и защищены международными законами об авторском праве, товарных знаках, патентах, коммерческой тайне и иной интеллектуальной собственности.",
      yourRightsTitle: "Ваши права",
      yourRightsBody:
        "Вы сохраняете права на контент, который отправляете. Отправляя контент, вы предоставляете нам неисключительную мировую безвозмездную лицензию на использование, отображение и распространение исключительно для предоставления Сервиса.",
      thirdPartyTitle: "Контент третьих лиц",
      thirdPartyBody:
        "Наш Сервис может содержать ссылки на сторонние сайты или сервисы. Мы не несём ответственности за их контент или практики.",
    },
    liability: {
      title: "Ограничение ответственности",
      subtitle: "Пределы нашей ответственности",
      intro:
        "В максимальной степени, разрешённой законом, Opticini не несёт ответственности за косвенный, случайный, специальный, последующий или штрафной ущерб, включая упущенную выгоду, данные, использование, деловую репутацию или иные нематериальные потери, возникшие в результате:",
      items: [
        "Вашего использования или невозможности использования Сервиса",
        "Любого несанкционированного доступа к нашим серверам или их использования",
        "Любого прерывания или прекращения передачи к Сервису или от него",
        "Ошибок, вирусов или иного вредоносного кода",
        "Ошибок или упущений в контенте или любых понесённых потерь или ущерба",
      ],
      outro: "Наша совокупная ответственность по претензиям, связанным с использованием Сервиса, не превысит сумму, уплаченную вами, если таковая была, за двенадцать месяцев до претензии.",
    },
    termination: {
      title: "Прекращение",
      subtitle: "Как может быть прекращён доступ",
      p1: "Мы можем немедленно прекратить или приостановить ваш доступ к Сервису без предварительного уведомления или ответственности по любой причине, в том числе при нарушении Условий.",
      p2: "После прекращения ваше право на использование Сервиса немедленно прекращается. Вы можете просто прекратить использование Сервиса.",
    },
    changes: {
      title: "Изменения условий",
      subtitle: "Как мы обрабатываем обновления",
      p1: "Мы оставляем за собой право изменять или заменять настоящие Условия в любое время. При существенных изменениях мы постараемся уведомить не менее чем за 30 дней.",
      p2: "Продолжение использования Сервиса после изменений означает принятие новых Условий.",
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle: "Вопросы по этим условиям?",
      body: "По вопросам об этих Условиях использования свяжитесь с нами:",
      email: "Email: legal@opticini.com",
      website: "Сайт: opticini.com",
    },
  }),
}

const SV: TermsPayload = {
  termsOfService: m({
    title: "Anvandarvillkor",
    subtitle: "Villkor som styr din anvandning av Opticinis tjanster",
    lastUpdatedPrefix: "Senast uppdaterad:",
    acceptance: {
      title: "Godkannande av villkor",
      subtitle: "Genom att anvanda var tjanst godkanner du dessa villkor",
      p1: 'Genom att komma at och anvanda Opticini ("Tjansten") godkanner du att vara bunden av dessa villkor. Om du inte godkanner, anvand inte Tjansten.',
      p2: "Dessa anvandarvillkor styr anvandningen av vara webbprestandatest och overvakningstjanster. Las dem noggrant.",
    },
    service: {
      title: "Tjanstebeskrivning",
      subtitle: "Vad Opticini tillhandahaller",
      intro: "Opticini tillhandahaller webbprestandatest och overvakning, inklusive:",
      items: [
        "Webbprestandaanalys och testning",
        "Matning av Core Web Vitals",
        "Optimeringsrekommendationer",
        "Waterfall-diagram och resursanalys",
        "Prestandaovervakning och rapportering",
      ],
      outro: "Vi forbehaller oss ratten att andra, avbryta eller upphora med nagon del av Tjansten med rimligt forvarsel.",
    },
    responsibilities: {
      title: "Anvandarens ansvar",
      subtitle: "Dina skyldigheter vid anvandning",
      intro: "Genom att anvanda Opticini godkanner du att:",
      items: [
        "Lamna korrekt och sanningsenlig information",
        "Endast anvanda Tjansten for lagliga andamal",
        "Inte forsoka fa obehorig atkomst till vara system",
        "Inte stora eller avbryta Tjansten",
        "Respektera immateriella rattigheter",
        "Folja alla tillampliga lagar och foreskrifter",
      ],
      importantLabel: "Viktigt:",
      importantBody:
        "Du ansvarar for att du har ratt att testa varje webbplats-URL som du skickar in for analys.",
    },
    acceptableUse: {
      title: "Policy for acceptabel anvandning",
      subtitle: "Vad som inte ar tillatet pa var plattform",
      intro: "Foljande aktiviteter ar strakt forbjudna:",
      items: [
        "Testa webbplatser utan lampligt tillstand",
        "Forsoka overbelasta eller krascha vara system",
        "Anvanda automatiserade verktyg for att missbruka Tjansten",
        "Forsoka reverse-engineera var teknik",
        "Dela skadligt innehall eller lankar",
        "Bryta mot tillampliga lagar eller foreskrifter",
      ],
      outro: "Brott kan leda till omedelbar avstangning eller avslut av din atkomst till Tjansten.",
    },
    intellectual: {
      title: "Immaterialratt",
      subtitle: "Agande och anvandningsrattigheter",
      ourRightsTitle: "Vara rattigheter",
      ourRightsBody:
        "Tjansten och dess ursprungliga innehall, funktioner och funktionalitet ags av Opticini och skyddas av internationella upphovs-, varumarks-, patent-, foretagshemlighets- och andra immaterialratter.",
      yourRightsTitle: "Dina rattigheter",
      yourRightsBody:
        "Du behaller aganderatt till innehall du skickar in. Genom att skicka in innehall ger du oss en icke-exklusiv, varldsomfattande royaltyfri licens att anvanda, visa och distribuera det endast for att tillhandahalla Tjansten.",
      thirdPartyTitle: "Tredjepartsinnehall",
      thirdPartyBody:
        "Var Tjanst kan innehalla lankar till tredjepartswebbplatser eller -tjanster. Vi ansvarar inte for deras innehall eller praxis.",
    },
    liability: {
      title: "Ansvarsbegransning",
      subtitle: "Vara ansvarsgranser",
      intro:
        "I den utstrackning lagen tillater ansvarar inte Opticini for indirekta, tillfalliga, sarskilda, foljd- eller punitiva skador, inklusive men inte begransat till forlust av vinst, data, anvande, goodwill eller andra immateriella forluster, som uppstar pa grund av:",
      items: [
        "Din anvandning eller oformaga att anvanda Tjansten",
        "Obehorig atkomst till eller anvandning av vara servrar",
        "Avbrott eller upphorande av overforing till eller fran Tjansten",
        "Fel, virus eller annan skadlig kod som kan overforas",
        "Fel eller utelamningar i innehall eller forlust eller skada",
      ],
      outro: "Vart totala ansvar for ansprak som uppstar fran anvandning av Tjansten far inte overstiga det belopp du betalat oss, om nagot, under de tolv manaderna fore anspraket.",
    },
    termination: {
      title: "Uppsagning",
      subtitle: "Hur atkomst kan avslutas",
      p1: "Vi kan omedelbart avsluta eller suspendera din atkomst till Tjansten utan foregaende meddelande eller ansvar av vilken anledning som helst, inklusive vid brott mot villkoren.",
      p2: "Vid upphorande upphor din ratt att anvanda Tjansten omedelbart. Du kan avsluta genom att sluta anvanda Tjansten.",
    },
    changes: {
      title: "Andringar av villkor",
      subtitle: "Hur vi hanterar uppdateringar",
      p1: "Vi forbehaller oss ratten att andra eller ersatta dessa villkor nar som helst. Vid vasentliga andringar forsoker vi ge minst 30 dagars forvarsel.",
      p2: "Fortsatt anvandning av Tjansten efter andringar innebar godkannande av de nya villkoren.",
    },
    contact: {
      title: "Kontakta oss",
      subtitle: "Fragor om dessa villkor?",
      body: "Om du har fragor om dessa anvandarvillkor, kontakta oss:",
      email: "E-post: legal@opticini.com",
      website: "Webbplats: opticini.com",
    },
  }),
}

const NO: TermsPayload = {
  termsOfService: m({
    title: "Vilkår for bruk",
    subtitle: "Vilkår som styr bruken av Opticini-tjenester",
    lastUpdatedPrefix: "Sist oppdatert:",
    acceptance: {
      title: "Aksept av vilkår",
      subtitle: "Ved å bruke tjenesten vår godtar du disse vilkårene",
      p1: 'Ved å få tilgang til og bruke Opticini ("Tjenesten") godtar du å være bundet av disse vilkårene. Hvis du ikke godtar, ikke bruk Tjenesten.',
      p2: "Disse vilkårene for bruk styrer bruken av våre nettstedstest- og overvåkingstjenester. Les dem nøye.",
    },
    service: {
      title: "Tjenestebeskrivelse",
      subtitle: "Hva Opticini tilbyr",
      intro: "Opticini tilbyr nettstedstest og overvåking av ytelse, inkludert:",
      items: [
        "Analyse og testing av nettstedsytelse",
        "Måling av Core Web Vitals",
        "Anbefalinger om optimalisering",
        "Waterfall-diagrammer og ressursanalyse",
        "Ytelsesovervåking og rapportering",
      ],
      outro: "Vi forbeholder oss retten til å endre, suspendere eller avvikle deler av Tjenesten med rimelig varsel.",
    },
    responsibilities: {
      title: "Brukerens ansvar",
      subtitle: "Dine forpliktelser ved bruk",
      intro: "Ved å bruke Opticini godtar du å:",
      items: [
        "Gi nøyaktig og sannferdig informasjon",
        "Bare bruke Tjenesten til lovlige formål",
        "Ikke forsøke uautorisert tilgang til systemene våre",
        "Ikke forstyrre eller avbryte Tjenesten",
        "Respektere immaterielle rettigheter",
        "Overholde alle gjeldende lover og forskrifter",
      ],
      importantLabel: "Viktig:",
      importantBody:
        "Du er ansvarlig for å sikre at du har rett til å teste enhver nettsteds-URL du sender inn til analyse.",
    },
    acceptableUse: {
      title: "Retningslinjer for akseptabel bruk",
      subtitle: "Hva som ikke er tillatt på plattformen vår",
      intro: "Følgende aktiviteter er strengt forbudt:",
      items: [
        "Teste nettsteder uten riktig autorisasjon",
        "Forsøke å overbelaste eller krasje systemene våre",
        "Bruke automatiserte verktøy til å misbruke Tjenesten",
        "Forsøke reversering av vår teknologi",
        "Dele skadelig innhold eller lenker",
        "Bryte gjeldende lover eller forskrifter",
      ],
      outro: "Brudd kan føre til umiddelbar suspensjon eller oppsigelse av tilgangen din.",
    },
    intellectual: {
      title: "Åndsverk",
      subtitle: "Eierskap og bruksrettigheter",
      ourRightsTitle: "Våre rettigheter",
      ourRightsBody:
        "Tjenesten og det opprinnelige innholdet, funksjonene og funksjonaliteten eies av Opticini og er beskyttet av internasjonale lover om opphavsrett, varemerker, patenter, forretningshemmeligheter og annen immateriell eiendom.",
      yourRightsTitle: "Dine rettigheter",
      yourRightsBody:
        "Du beholder eierskap til innhold du sender inn. Ved innsending gir du oss en ikke-eksklusiv, verdensomspennende royaltyfri lisens til å bruke, vise og distribuere det kun for å levere Tjenesten.",
      thirdPartyTitle: "Tredjepartsinnhold",
      thirdPartyBody:
        "Tjenesten vår kan inneholde lenker til tredjeparts nettsteder eller tjenester. Vi er ikke ansvarlige for innhold eller praksis der.",
    },
    liability: {
      title: "Ansvarsbegrensning",
      subtitle: "Grensene for vårt ansvar",
      intro:
        "I den grad loven tillater det, skal Opticini ikke være ansvarlig for indirekte, tilfeldige, spesielle, følge- eller straffeskader, inkludert tap av fortjeneste, data, bruk, goodwill eller andre immaterielle tap som følge av:",
      items: [
        "Din bruk eller manglende evne til å bruke Tjenesten",
        "Uautorisert tilgang til eller bruk av serverne våre",
        "Avbrudd eller opphør av overføring til eller fra Tjenesten",
        "Feil, virus eller annen skadelig kode",
        "Feil eller utelatelser i innhold eller tap eller skade",
      ],
      outro: "Vårt samlede ansvar for krav som oppstår fra bruk av Tjenesten skal ikke overstige beløpet du betalte oss, om noe, i de tolv månedene før kravet.",
    },
    termination: {
      title: "Oppsigelse",
      subtitle: "Hvordan tilgang kan avsluttes",
      p1: "Vi kan umiddelbart avslutte eller suspendere tilgangen din til Tjenesten uten forvarsel eller ansvar av enhver grunn, inkludert brudd på vilkårene.",
      p2: "Ved oppsigelse opphører din rett til å bruke Tjenesten umiddelbart. Du kan slutte å bruke Tjenesten.",
    },
    changes: {
      title: "Endringer i vilkårene",
      subtitle: "Hvordan vi håndterer oppdateringer",
      p1: "Vi forbeholder oss retten til å endre eller erstatte disse vilkårene når som helst. Ved vesentlige endringer forsøker vi å gi minst 30 dagers varsel.",
      p2: "Fortsatt bruk av Tjenesten etter endringer utgjør aksept av de nye vilkårene.",
    },
    contact: {
      title: "Kontakt oss",
      subtitle: "Spørsmål om disse vilkårene?",
      body: "Hvis du har spørsmål om disse vilkårene for bruk, kontakt oss:",
      email: "E-post: legal@opticini.com",
      website: "Nettsted: opticini.com",
    },
  }),
}

const DA: TermsPayload = {
  termsOfService: m({
    title: "Servicevilkar",
    subtitle: "Vilkår der styrer din brug af Opticini-tjenester",
    lastUpdatedPrefix: "Sidst opdateret:",
    acceptance: {
      title: "Accept af vilkår",
      subtitle: "Ved at bruge vores service accepterer du disse vilkår",
      p1: 'Ved at tilgå og bruge Opticini ("Tjenesten") accepterer du at være bundet af disse vilkår. Hvis du ikke accepterer, må du ikke bruge Tjenesten.',
      p2: "Disse servicevilkår styrer brugen af vores webstedstest og -overvågning. Læs dem omhyggeligt.",
    },
    service: {
      title: "Servicebeskrivelse",
      subtitle: "Hvad Opticini leverer",
      intro: "Opticini leverer webstedstest og overvågning af ydeevne, herunder:",
      items: [
        "Analyse og test af webstedets ydeevne",
        "Måling af Core Web Vitals",
        "Optimeringsanbefalinger",
        "Waterfall-diagrammer og ressourceanalyse",
        "Ydelsesovervågning og rapportering",
      ],
      outro: "Vi forbeholder os retten til at ændre, suspendere eller ophøre med dele af Tjenesten med rimeligt varsel.",
    },
    responsibilities: {
      title: "Brugerens ansvar",
      subtitle: "Dine forpligtelser ved brug",
      intro: "Ved at bruge Opticini accepterer du at:",
      items: [
        "Give nøjagtige og sandfærdige oplysninger",
        "Kun bruge Tjenesten til lovlige formål",
        "Ikke forsøge uautoriseret adgang til vores systemer",
        "Ikke forstyrre eller afbryde Tjenesten",
        "Respektere immaterielle rettigheder",
        "Overholde alle gældende love og regler",
      ],
      importantLabel: "Vigtigt:",
      importantBody:
        "Du er ansvarlig for at sikre, at du har ret til at teste enhver websted-URL, du indsender til analyse.",
    },
    acceptableUse: {
      title: "Politik for acceptabel brug",
      subtitle: "Hvad der ikke er tilladt på vores platform",
      intro: "Følgende aktiviteter er strengt forbudt:",
      items: [
        "Teste websteder uden passende autorisation",
        "Forsøge at overbelaste eller nedlægge vores systemer",
        "Bruge automatiserede værktøjer til at misbruge Tjenesten",
        "Forsøge reverse engineering af vores teknologi",
        "Dele skadeligt indhold eller links",
        "Overtræde gældende love eller regler",
      ],
      outro: "Overtrædelse kan medføre øjeblikkelig suspension eller ophør af din adgang.",
    },
    intellectual: {
      title: "Immaterielle rettigheder",
      subtitle: "Ejerskab og brugsrettigheder",
      ourRightsTitle: "Vores rettigheder",
      ourRightsBody:
        "Tjenesten og dens oprindelige indhold, funktioner og funktionalitet ejes af Opticini og er beskyttet af internationale love om ophavsret, varemærker, patenter, forretningshemmeligheder og anden immateriel ejendom.",
      yourRightsTitle: "Dine rettigheder",
      yourRightsBody:
        "Du beholder ejerskab af indhold, du indsender. Ved indsendelse giver du os en ikke-eksklusiv, verdensomspændende royaltyfri licens til at bruge, vise og distribuere det udelukkende for at levere Tjenesten.",
      thirdPartyTitle: "Tredjepartsindhold",
      thirdPartyBody:
        "Vores Tjeneste kan indeholde links til tredjepartswebsteder eller -tjenester. Vi er ikke ansvarlige for deres indhold eller praksis.",
    },
    liability: {
      title: "Ansvarsbegrænsning",
      subtitle: "Grænser for vores ansvar",
      intro:
        "I det omfang loven tillader det, er Opticini ikke ansvarlig for indirekte, tilfældige, særlige, følge- eller strafskader, herunder tab af fortjeneste, data, brug, goodwill eller andre immaterielle tab som følge af:",
      items: [
        "Din brug eller manglende evne til at bruge Tjenesten",
        "Uautoriseret adgang til eller brug af vores servere",
        "Afbrud eller ophør af transmission til eller fra Tjenesten",
        "Fejl, virus eller anden skadelig kode",
        "Fejl eller udeladelser i indhold eller tab eller skade",
      ],
      outro: "Vores samlede ansvar for krav, der opstår fra brug af Tjenesten, må ikke overstige det beløb, du betalte os, om nogen, i de tolv måneder før kravet.",
    },
    termination: {
      title: "Ophør",
      subtitle: "Hvordan adgang kan afsluttes",
      p1: "Vi kan straks ophøre eller suspendere din adgang til Tjenesten uden forudgående varsel eller ansvar af enhver grund, herunder ved brud på vilkårene.",
      p2: "Ved ophør ophører din ret til at bruge Tjenesten straks. Du kan ophøre med at bruge Tjenesten.",
    },
    changes: {
      title: "Ændringer af vilkår",
      subtitle: "Hvordan vi håndterer opdateringer",
      p1: "Vi forbeholder os retten til at ændre eller erstatte disse vilkår til enhver tid. Ved væsentlige ændringer forsøger vi at give mindst 30 dages varsel.",
      p2: "Fortsat brug af Tjenesten efter ændringer udgør accept af de nye vilkår.",
    },
    contact: {
      title: "Kontakt os",
      subtitle: "Spørgsmål om disse vilkår?",
      body: "Hvis du har spørgsmål om disse servicevilkår, kontakt os:",
      email: "E-mail: legal@opticini.com",
      website: "Websted: opticini.com",
    },
  }),
}

const ZH: TermsPayload = {
  termsOfService: m({
    title: "服务条款",
    subtitle: "规范您使用 Opticini 服务的条款与条件",
    lastUpdatedPrefix: "最后更新：",
    acceptance: {
      title: "接受条款",
      subtitle: "使用我们的服务即表示您同意这些条款",
      p1: "访问并使用 Opticini（“服务”），即表示您同意受本协议约束。若不同意，请勿使用服务。",
      p2: "本服务条款规范我们对网站性能测试与监控服务的使用。请在使用前仔细阅读。",
    },
    service: {
      title: "服务说明",
      subtitle: "Opticini 提供的内容",
      intro: "Opticini 提供网站性能测试与监控服务，包括：",
      items: [
        "网站性能分析与测试",
        "Core Web Vitals 测量",
        "性能优化建议",
        "瀑布图与资源分析",
        "性能监控与报告",
      ],
      outro: "我们保留在合理通知下修改、暂停或终止服务任何部分的权利。",
    },
    responsibilities: {
      title: "用户责任",
      subtitle: "使用服务时您的义务",
      intro: "使用 Opticini 时，您同意：",
      items: [
        "提供准确、真实的信息",
        "仅将服务用于合法目的",
        "不试图未经授权访问我们的系统",
        "不干扰或破坏服务",
        "尊重知识产权",
        "遵守所有适用的法律法规",
      ],
      importantLabel: "重要提示：",
      importantBody: "您有责任确保对提交分析的任意网站 URL 拥有测试权限。",
    },
    acceptableUse: {
      title: "可接受使用政策",
      subtitle: "平台上禁止的行为",
      intro: "严禁以下行为：",
      items: [
        "未经授权测试网站",
        "试图过载或破坏我们的系统",
        "使用自动化工具滥用服务",
        "试图对我们的技术进行逆向工程",
        "分享恶意内容或链接",
        "违反适用的法律法规",
      ],
      outro: "违反这些条款可能导致立即暂停或终止您对服务的访问。",
    },
    intellectual: {
      title: "知识产权",
      subtitle: "所有权与使用权",
      ourRightsTitle: "我们的权利",
      ourRightsBody:
        "服务及其原创内容、功能与特性归 Opticini 所有，并受国际版权、商标、专利、商业秘密及其他知识产权法律保护。",
      yourRightsTitle: "您的权利",
      yourRightsBody:
        "您保留所提交内容的所有权。提交内容即授予我们在全球范围内非独占、免版税的许可，仅用于提供服务的展示与分发。",
      thirdPartyTitle: "第三方内容",
      thirdPartyBody: "我们的服务可能包含指向第三方网站或服务的链接。我们不对其内容或做法负责。",
    },
    liability: {
      title: "责任限制",
      subtitle: "我们的责任上限",
      intro:
        "在法律允许的最大范围内，Opticini 不对任何间接、附带、特殊、后果性或惩罚性损害承担责任，包括但不限于利润、数据、使用、商誉或其他无形损失，因以下原因产生：",
      items: [
        "您使用或无法使用服务",
        "对我们服务器的任何未经授权的访问或使用",
        "与服务之间传输的任何中断或停止",
        "可能传播的任何错误、病毒或其他有害代码",
        "内容中的任何错误或遗漏或造成的任何损失或损害",
      ],
      outro: "因使用服务而产生的索赔，我们的总责任不超过您在索赔前十二个月内向我们支付的金额（如有）。",
    },
    termination: {
      title: "终止",
      subtitle: "服务访问如何终止",
      p1: "我们可立即终止或暂停您对服务的访问，无需事先通知或承担责任，原因包括但不限于您违反条款。",
      p2: "终止后，您使用服务的权利立即停止。您也可停止使用服务以终止账户。",
    },
    changes: {
      title: "条款变更",
      subtitle: "我们如何处理更新",
      p1: "我们保留随时修改或替换本条款的权利。若修订具有实质性影响，我们将尽量提前至少 30 日通知。",
      p2: "变更后继续使用服务即表示接受新条款。",
    },
    contact: {
      title: "联系我们",
      subtitle: "对这些条款有疑问？",
      body: "若对本服务条款有疑问，请联系我们：",
      email: "邮箱：legal@opticini.com",
      website: "网站：opticini.com",
    },
  }),
}

const JA: TermsPayload = {
  termsOfService: m({
    title: "利用規約",
    subtitle: "Opticini サービスの利用に関する条件",
    lastUpdatedPrefix: "最終更新:",
    acceptance: {
      title: "規約の承諾",
      subtitle: "サービスを利用することで本規約に同意したものとみなされます",
      p1: 'Opticini（「本サービス」）にアクセスし利用することで、本規約に拘束されることに同意します。同意しない場合は利用しないでください。',
      p2: "本利用規約は、当社のウェブサイト性能テストおよび監視サービスの利用を規定します。使用前に必ずお読みください。",
    },
    service: {
      title: "サービス内容",
      subtitle: "Opticini が提供するもの",
      intro: "Opticini は次を含むウェブサイト性能のテストおよび監視を提供します。",
      items: [
        "ウェブサイト性能の分析とテスト",
        "Core Web Vitals の測定",
        "最適化の推奨事項",
        "ウォーターフォールチャートとリソース分析",
        "性能監視とレポート",
      ],
      outro: "合理的な通知のうえ、サービスの一部を変更・中断・終了する権利を留保します。",
    },
    responsibilities: {
      title: "ユーザーの責任",
      subtitle: "利用時の義務",
      intro: "Opticini を利用することで、次に同意します。",
      items: [
        "正確かつ真実の情報を提供する",
        "合法的な目的にのみサービスを利用する",
        "当社システムへの不正アクセスを試みない",
        "サービスを妨害または中断しない",
        "知的財産権を尊重する",
        "適用される法令を遵守する",
      ],
      importantLabel: "重要:",
      importantBody: "分析のために送信するウェブサイト URL をテストする権利があることを確認する責任はユーザーにあります。",
    },
    acceptableUse: {
      title: "許容される利用ポリシー",
      subtitle: "プラットフォームで禁止される行為",
      intro: "次の行為は固く禁じられています。",
      items: [
        "適切な許可なくウェブサイトをテストする",
        "当社システムに過負荷をかけたりクラッシュさせようとする",
        "自動化ツールでサービスを悪用する",
        "当社技術のリバースエンジニアリングを試みる",
        "悪意のあるコンテンツやリンクを共有する",
        "適用される法令に違反する",
      ],
      outro: "違反は直ちにアクセスの停止または終了につながる場合があります。",
    },
    intellectual: {
      title: "知的財産",
      subtitle: "所有と利用権",
      ourRightsTitle: "当社の権利",
      ourRightsBody:
        "本サービスおよびそのオリジナルコンテンツ、機能は Opticini に帰属し、国際的な著作権、商標、特許、営業秘密その他の知的財産法により保護されます。",
      yourRightsTitle: "お客様の権利",
      yourRightsBody:
        "送信するコンテンツの所有権はお客様に留保されます。送信により、本サービス提供のためにのみ使用・表示・配布する非独占的かつ世界規模のロイヤリティフリー許諾を当社に付与します。",
      thirdPartyTitle: "第三者コンテンツ",
      thirdPartyBody:
        "本サービスには第三者のサイトやサービスへのリンクが含まれる場合があります。当社はその内容や慣行について責任を負いません。",
    },
    liability: {
      title: "責任の制限",
      subtitle: "当社の責任の範囲",
      intro:
        "法律で認められる最大限の範囲で、Opticini は間接的・付随的・特別・結果的・懲罰的損害（利益、データ、使用、のれんその他無形損失の喪失を含む）について責任を負いません。次に起因する場合を含みます。",
      items: [
        "本サービスの利用または利用不能",
        "当社サーバーへの不正アクセスまたは利用",
        "本サービスとの間の伝送の中断または停止",
        "送信されうるバグ、ウイルス、その他有害なコード",
        "コンテンツの誤りまたは脱漏、または発生した損失または損害",
      ],
      outro: "本サービスの利用に起因する請求に対する当社の総責任額は、請求前十二か月以内にお客様が当社に支払った金額（ある場合）を超えません。",
    },
    termination: {
      title: "終了",
      subtitle: "アクセスが終了する場合",
      p1: "当社は、条項違反を含む理由の如何を問わず、事前通知や責任なく直ちに本サービスへのアクセスを終了または停止できます。",
      p2: "終了後、本サービスを利用する権利は直ちに失効します。利用を中止することで終了できます。",
    },
    changes: {
      title: "規約の変更",
      subtitle: "更新の取り扱い",
      p1: "当社は本規約をいつでも変更または置き換える権利を留保します。重要な改定については少なくとも 30 日前に通知するよう努めます。",
      p2: "変更後の継続利用は新規約への同意を構成します。",
    },
    contact: {
      title: "お問い合わせ",
      subtitle: "本規約に関するご質問",
      body: "本利用規約に関するお問い合わせは次までご連絡ください。",
      email: "メール: legal@opticini.com",
      website: "ウェブサイト: opticini.com",
    },
  }),
}

const KO: TermsPayload = {
  termsOfService: m({
    title: "서비스 약관",
    subtitle: "Opticini 서비스 이용을 규율하는 조건",
    lastUpdatedPrefix: "최종 업데이트:",
    acceptance: {
      title: "약관 동의",
      subtitle: "서비스를 사용하면 본 약관에 동의한 것으로 간주됩니다",
      p1: 'Opticini("서비스")에 접속하고 사용함으로써 귀하는 본 약관에 동의합니다. 동의하지 않으면 서비스를 사용하지 마십시오.',
      p2: "본 서비스 약관은 웹사이트 성능 테스트 및 모니터링 서비스 이용을 규율합니다. 사용 전에 주의 깊게 읽어 주십시오.",
    },
    service: {
      title: "서비스 설명",
      subtitle: "Opticini가 제공하는 내용",
      intro: "Opticini는 다음을 포함한 웹사이트 성능 테스트 및 모니터링을 제공합니다.",
      items: [
        "웹사이트 성능 분석 및 테스트",
        "Core Web Vitals 측정",
        "최적화 권장 사항",
        "워터폴 차트 및 리소스 분석",
        "성능 모니터링 및 보고",
      ],
      outro: "합리적인 사전 통지 하에 서비스의 일부를 수정·중단·종료할 권리를 보유합니다.",
    },
    responsibilities: {
      title: "사용자 책임",
      subtitle: "서비스 이용 시 의무",
      intro: "Opticini를 사용함으로써 귀하는 다음에 동의합니다.",
      items: [
        "정확하고 사실에 부합하는 정보 제공",
        "합법적인 목적으로만 서비스 사용",
        "시스템에 대한 무단 접근 시도 금지",
        "서비스 방해 또는 중단 금지",
        "지적 재산권 존중",
        "적용 가능한 모든 법규 준수",
      ],
      importantLabel: "중요:",
      importantBody: "분석을 위해 제출하는 웹사이트 URL을 테스트할 권리가 있는지 확인할 책임은 귀하에게 있습니다.",
    },
    acceptableUse: {
      title: "허용 가능한 사용 정책",
      subtitle: "플랫폼에서 허용되지 않는 행위",
      intro: "다음 활동은 엄격히 금지됩니다.",
      items: [
        "적절한 승인 없이 웹사이트 테스트",
        "시스템 과부하 또는 마비 시도",
        "자동화 도구로 서비스 남용",
        "기술에 대한 리버스 엔지니어링 시도",
        "악성 콘텐츠 또는 링크 공유",
        "적용 법규 위반",
      ],
      outro: "위반 시 즉시 액세스가 정지되거나 종료될 수 있습니다.",
    },
    intellectual: {
      title: "지적 재산",
      subtitle: "소유 및 사용 권리",
      ourRightsTitle: "당사의 권리",
      ourRightsBody:
        "서비스 및 그 원본 콘텐츠, 기능은 Opticini의 소유이며 국제 저작권, 상표, 특허, 영업 비밀 및 기타 지적 재산법의 보호를 받습니다.",
      yourRightsTitle: "귀하의 권리",
      yourRightsBody:
        "제출한 콘텐츠의 소유권은 귀하에게 있습니다. 제출 시 서비스 제공을 위해서만 사용·표시·배포할 수 있는 비독점적이며 전 세계적이며 로열티가 없는 라이선스를 당사에 부여합니다.",
      thirdPartyTitle: "제3자 콘텐츠",
      thirdPartyBody:
        "서비스에 제3자 사이트 또는 서비스로의 링크가 포함될 수 있습니다. 당사는 해당 콘텐츠나 관행에 대해 책임지지 않습니다.",
    },
    liability: {
      title: "책임의 한계",
      subtitle: "당사 책임의 범위",
      intro:
        "법이 허용하는 최대 한도에서 Opticini는 간접적·부수적·특별·결과적 또는 징벌적 손해(이익, 데이터, 사용, 영업권 또는 기타 무형 손실 포함)에 대해 책임지지 않으며, 다음으로 인해 발생한 경우를 포함합니다.",
      items: [
        "서비스 사용 또는 사용 불능",
        "서버에 대한 무단 접근 또는 사용",
        "서비스와의 전송 중단 또는 중지",
        "전파될 수 있는 버그, 바이러스 또는 기타 유해 코드",
        "콘텐츠의 오류 또는 누락 또는 발생한 손실 또는 손해",
      ],
      outro: "서비스 사용으로 인한 청구에 대한 당사의 총 책임은 청구 전 12개월 이내에 귀하가 당사에 지급한 금액(있는 경우)을 초과하지 않습니다.",
    },
    termination: {
      title: "종료",
      subtitle: "액세스가 종료되는 경우",
      p1: "당사는 약관 위반을 포함한 어떤 이유로든 사전 통지나 책임 없이 즉시 서비스 액세스를 종료하거나 중단할 수 있습니다.",
      p2: "종료 후 서비스를 사용할 권리는 즉시 소멸합니다. 서비스 사용을 중단하여 종료할 수 있습니다.",
    },
    changes: {
      title: "약관 변경",
      subtitle: "업데이트 처리 방식",
      p1: "당사는 언제든지 본 약관을 수정하거나 교체할 권리를 보유합니다. 중대한 개정 시 최소 30일 전에 통지하도록 노력합니다.",
      p2: "변경 후 계속 사용하면 새 약관에 동의한 것으로 간주됩니다.",
    },
    contact: {
      title: "문의",
      subtitle: "본 약관에 대한 질문",
      body: "본 서비스 약관에 대한 문의는 다음으로 연락하십시오.",
      email: "이메일: legal@opticini.com",
      website: "웹사이트: opticini.com",
    },
  }),
}

const HI: TermsPayload = {
  termsOfService: m({
    title: "सेवा की शर्तें",
    subtitle: "Opticini सेवाओं के उपयोग को नियंत्रित करने वाली शर्तें",
    lastUpdatedPrefix: "अंतिम अपडेट:",
    acceptance: {
      title: "शर्तों की स्वीकृति",
      subtitle: "हमारी सेवा का उपयोग करके आप इन शर्तों से सहमत होते हैं",
      p1: 'Opticini ("सेवा") तक पहुंचकर और उसका उपयोग करके आप इन शर्तों से बाध्य होने के लिए सहमत हैं। यदि सहमत नहीं हैं तो सेवा का उपयोग न करें।',
      p2: "ये सेवा की शर्तें हमारी वेबसाइट प्रदर्शन परीक्षण और निगरानी सेवाओं के उपयोग को नियंत्रित करती हैं। ध्यान से पढ़ें।",
    },
    service: {
      title: "सेवा विवरण",
      subtitle: "Opticini क्या प्रदान करता है",
      intro: "Opticini वेबसाइट प्रदर्शन परीक्षण और निगरानी प्रदान करता है, जिसमें शामिल है:",
      items: [
        "वेबसाइट प्रदर्शन विश्लेषण और परीक्षण",
        "Core Web Vitals माप",
        "अनुकूलन सिफारिशें",
        "वॉटरफॉल चार्ट और संसाधन विश्लेषण",
        "प्रदर्शन निगरानी और रिपोर्टिंग",
      ],
      outro: "हम उचित सूचना के साथ सेवा के किसी भी हिस्से को संशोधित, निलंबित या बंद करने का अधिकार सुरक्षित रखते हैं।",
    },
    responsibilities: {
      title: "उपयोगकर्ता जिम्मेदारियाँ",
      subtitle: "सेवा का उपयोग करते समय आपके दायित्व",
      intro: "Opticini का उपयोग करके आप सहमत हैं:",
      items: [
        "सटीक और सत्य जानकारी प्रदान करना",
        "सेवा का उपयोग केवल वैध उद्देश्यों के लिए",
        "हमारे सिस्टम तक अनधिकृत पहुंच का प्रयास न करना",
        "सेवा में हस्तक्षेप या बाधा न डालना",
        "बौद्धिक संपदा अधिकारों का सम्मान करना",
        "सभी लागू कानूनों और नियमों का पालन करना",
      ],
      importantLabel: "महत्वपूर्ण:",
      importantBody:
        "आप यह सुनिश्चित करने के लिए जिम्मेदार हैं कि विश्लेषण के लिए आपके द्वारा जमा की गई किसी भी वेबसाइट URL का परीक्षण करने का अधिकार आपके पास है।",
    },
    acceptableUse: {
      title: "स्वीकार्य उपयोग नीति",
      subtitle: "हमारे प्लेटफ़ॉर्म पर क्या अनुमति नहीं है",
      intro: "निम्नलिखित गतिविधियाँ सख्त वर्जित हैं:",
      items: [
        "उचित अधिकरण के बिना वेबसाइटों का परीक्षण",
        "हमारे सिस्टम को अधिभारित या क्रैश करने का प्रयास",
        "सेवा का दुरुपयोग करने के लिए स्वचालित उपकरणों का उपयोग",
        "हमारी तकनीक का रिवर्स इंजीनियरिंग करने का प्रयास",
        "दुर्भावनापूर्ण सामग्री या लिंक साझा करना",
        "लागू कानूनों या नियमों का उल्लंघन",
      ],
      outro: "उल्लंघन से तत्काल निलंबन या आपकी पहुंच समाप्त हो सकती है।",
    },
    intellectual: {
      title: "बौद्धिक संपदा",
      subtitle: "स्वामित्व और उपयोग अधिकार",
      ourRightsTitle: "हमारे अधिकार",
      ourRightsBody:
        "सेवा और इसकी मूल सामग्री, सुविधाएँ और कार्यक्षमता Opticini के स्वामित्व में हैं और अंतर्राष्ट्रीय कॉपीराइट, ट्रेडमार्क, पेटेंट, व्यापार रहस्य और अन्य बौद्धिक संपदा कानूनों द्वारा संरक्षित हैं।",
      yourRightsTitle: "आपके अधिकार",
      yourRightsBody:
        "आप जमा की गई सामग्री का स्वामित्व बनाए रखते हैं। सामग्री जमा करके आप हमें सेवा प्रदान करने के उद्देश्य के लिए उपयोग, प्रदर्शन और वितरण हेतु एक गैर-विशिष्ट, विश्वव्यापी, रॉयल्टी-मुक्त लाइसेंस प्रदान करते हैं।",
      thirdPartyTitle: "तृतीय-पक्ष सामग्री",
      thirdPartyBody:
        "हमारी सेवा में तृतीय-पक्ष वेबसाइटों या सेवाओं के लिंक हो सकते हैं। हम उनकी सामग्री या प्रथाओं के लिए जिम्मेदार नहीं हैं।",
    },
    liability: {
      title: "देयता की सीमा",
      subtitle: "हमारी देयता की सीमाएँ",
      intro:
        "कानून द्वारा अनुमत अधिकतम सीमा तक, Opticini अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी या दंडात्मक नुकसान के लिए उत्तरदायी नहीं होगा, जिसमें लाभ, डेटा, उपयोग, गुवाही या अन्य अमूर्त हानि शामिल है, जो इससे उत्पन्न हो:",
      items: [
        "सेवा का आपका उपयोग या उपयोग करने में असमर्थता",
        "हमारे सर्वर तक किसी भी अनधिकृत पहुंच या उपयोग",
        "सेवा से या सेवा तक प्रसारण में किसी भी रुकावट या समाप्ति",
        "किसी भी बग, वायरस या अन्य हानिकारक कोड का प्रसारण",
        "किसी भी सामग्री में त्रुटियाँ या चूक या हुई हानि या क्षति",
      ],
      outro: "सेवा के उपयोग से उत्पन्न दावों के लिए हमारी कुल देयता उस राशि से अधिक नहीं होगी जो आपने हमें भुगतान की, यदि कोई हो, दावे से पूर्व बारह महीनों में।",
    },
    termination: {
      title: "समाप्ति",
      subtitle: "सेवा पहुंच कैसे समाप्त हो सकती है",
      p1: "हम किसी भी कारण से, बिना पूर्व सूचना या देयता के, तुरंत सेवा तक आपकी पहुंच समाप्त या निलंबित कर सकते हैं, जिसमें शर्तों का उल्लंघन शामिल है।",
      p2: "समाप्ति पर, सेवा का उपयोग करने का आपका अधिकार तुरंत समाप्त हो जाता है। आप सेवा का उपयोग बंद कर सकते हैं।",
    },
    changes: {
      title: "शर्तों में परिवर्तन",
      subtitle: "हम अपडेट कैसे संभालते हैं",
      p1: "हम इन शर्तों को किसी भी समय संशोधित या प्रतिस्थापित करने का अधिकार सुरक्षित रखते हैं। यदि संशोधन महत्वपूर्ण है, तो हम कम से कम 30 दिनों की सूचना देने का प्रयास करेंगे।",
      p2: "परिवर्तनों के बाद सेवा का निरंतर उपयोग नई शर्तों की स्वीकृति है।",
    },
    contact: {
      title: "संपर्क करें",
      subtitle: "इन शर्तों के बारे में प्रश्न?",
      body: "इन सेवा की शर्तों के बारे में प्रश्न हों तो हमसे संपर्क करें:",
      email: "ईमेल: legal@opticini.com",
      website: "वेबसाइट: opticini.com",
    },
  }),
}

const AR: TermsPayload = {
  termsOfService: m({
    title: "شروط الخدمة",
    subtitle: "الشروط التي تحكم استخدامك لخدمات Opticini",
    lastUpdatedPrefix: "اخر تحديث:",
    acceptance: {
      title: "قبول الشروط",
      subtitle: "باستخدام خدمتنا فانك توافق على هذه الشروط",
      p1: 'بالوصول الى Opticini واستخدامها ("الخدمة") فانك توافق على الالتزام بهذه الشروط. اذا لم توافق فلا تستخدم الخدمة.',
      p2: "تحكم شروط الخدمة هذه استخدام خدمات اختبار ومراقبة اداء المواقع. اقرأها بعناية.",
    },
    service: {
      title: "وصف الخدمة",
      subtitle: "ما تقدمه Opticini",
      intro: "تقدم Opticini اختبار ومراقبة اداء المواقع، بما في ذلك:",
      items: [
        "تحليل واختبار اداء المواقع",
        "قياس Core Web Vitals",
        "توصيات التحسين",
        "مخططات الشلال وتحليل الموارد",
        "مراقبة الاداء والتقارير",
      ],
      outro: "نحتفظ بالحق في تعديل او تعليق او ايقاف اي جزء من الخدمة بإشعار معقول.",
    },
    responsibilities: {
      title: "مسؤوليات المستخدم",
      subtitle: "التزاماتك عند استخدام الخدمة",
      intro: "باستخدام Opticini فانك توافق على:",
      items: [
        "تقديم معلومات دقيقة وصادقة",
        "استخدام الخدمة لاغراض قانونية فقط",
        "عدم محاولة الوصول غير المصرح به الى انظمتنا",
        "عدم التداخل مع الخدمة او تعطيلها",
        "احترام حقوق الملكية الفكرية",
        "الامتثال لجميع القوانين واللوائح المعمول بها",
      ],
      importantLabel: "مهم:",
      importantBody:
        "انت مسؤول عن التاكد من ان لديك الحق في اختبار اي عنوان URL لموقع ترسله للتحليل.",
    },
    acceptableUse: {
      title: "سياسة الاستخدام المقبول",
      subtitle: "ما لا يُسمح به على منصتنا",
      intro: "الانشطة التالية محظورة تماما:",
      items: [
        "اختبار المواقع دون تفويض مناسب",
        "محاولة اثقال انظمتنا او تعطيلها",
        "استخدام ادوات آلية لاساءة استخدام الخدمة",
        "محاولة الهندسة العكسية لتقنيتنا",
        "مشاركة محتوى او روابط ضارة",
        "انتهاك القوانين او اللوائح المعمول بها",
      ],
      outro: "قد يؤدي الانتهاك الى تعليق او انهاء فوري لصلاحية الوصول.",
    },
    intellectual: {
      title: "الملكية الفكرية",
      subtitle: "الملكية وحقوق الاستخدام",
      ourRightsTitle: "حقوقنا",
      ourRightsBody:
        "الخدمة ومحتواها الاصلي وميزاتها ووظائفها مملوكة لـ Opticini ومحمية بقوانين دولية للنشر والعلامات والبراءات واسرار التجارة والملكية الفكرية الاخرى.",
      yourRightsTitle: "حقوقك",
      yourRightsBody:
        "تحتفظ بملكية المحتوى الذي ترسله. بإرسال المحتوى تمنحنا ترخيصا غير حصري وعالميا وخاليا من الاتاوات لاستخدامه وعرضه وتوزيعه فقط لتقديم الخدمة.",
      thirdPartyTitle: "محتوى الطرف الثالث",
      thirdPartyBody:
        "قد تحتوي خدمتنا على روابط لمواقع او خدمات طرف ثالث. لسنا مسؤولين عن محتواها او ممارساتها.",
    },
    liability: {
      title: "تحديد المسؤولية",
      subtitle: "حدود مسؤوليتنا",
      intro:
        "في اقصى حد يسمح به القانون، لا تتحمل Opticini المسؤولية عن اي اضرار غير مباشرة او عرضية او خاصة او تبعية او عقابية، بما في ذلك دون حصر فقدان الارباح او البيانات او الاستخدام او السمعة او الخسائر غير الملموسة الناتجة عن:",
      items: [
        "استخدامك او عدم قدرتك على استخدام الخدمة",
        "اي وصول غير مصرح به الى خوادمنا او استخدامها",
        "اي انقطاع او توقف في النقل الى الخدمة او منها",
        "اي اخطاء او فيروسات او كود ضار قد يُنقل",
        "اي اخطاء او سهو في المحتوى او اي خسارة او ضرر",
      ],
      outro: "لا يجوز ان تتجاوز مسؤوليتنا الاجمالية عن المطالبات الناشئة عن استخدام الخدمة المبلغ الذي دفعته لنا ان وجد خلال الاثني عشر شهرا السابقة للمطالبة.",
    },
    termination: {
      title: "الانهاء",
      subtitle: "كيف يمكن ان ينتهي الوصول",
      p1: "قد ننهي او نعلق وصولك الى الخدمة فورا دون اشعار مسبق او مسؤولية لأي سبب، بما في ذلك انتهاك الشروط.",
      p2: "عند الانهاء، يتوقف حقك في استخدام الخدمة فورا. يمكنك التوقف عن استخدام الخدمة.",
    },
    changes: {
      title: "تغييرات الشروط",
      subtitle: "كيف نتعامل مع التحديثات",
      p1: "نحتفظ بالحق في تعديل او استبدال هذه الشروط في اي وقت. اذا كان التعديل جوهريا سنحاول تقديم اشعار لا يقل عن 30 يوما.",
      p2: "الاستمرار في استخدام الخدمة بعد التغييرات يعني قبول الشروط الجديدة.",
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "اسئلة حول هذه الشروط؟",
      body: "لأي اسئلة حول شروط الخدمة هذه، تواصل معنا:",
      email: "البريد: legal@opticini.com",
      website: "الموقع: opticini.com",
    },
  }),
}

const HE: TermsPayload = {
  termsOfService: m({
    title: "תנאי שירות",
    subtitle: "התנאים החלים על השימוש בשירותי Opticini",
    lastUpdatedPrefix: "עודכן לאחרונה:",
    acceptance: {
      title: "קבלת התנאים",
      subtitle: "בשימוש בשירות אתם מסכימים לתנאים אלה",
      p1: 'בגישה ל-Opticini ובשימוש בה ("השירות") אתם מסכימים להיות כפופים לתנאים אלה. אם אינכם מסכימים, אל תשתמשו בשירות.',
      p2: "תנאי שירות אלה חלים על שירותי בדיקת וביצועי ניטור אתרים. קראו בעיון.",
    },
    service: {
      title: "תיאור השירות",
      subtitle: "מה Opticini מספקת",
      intro: "Opticini מספקת בדיקות וביצועי ניטור לאתרים, כולל:",
      items: [
        "ניתוח ובדיקת ביצועי אתרים",
        "מדידת Core Web Vitals",
        "המלצות לאופטימיזציה",
        "תרשימי ווטרפול וניתוח משאבים",
        "ניטור ביצועים ודיווח",
      ],
      outro: "אנו שומרים לעצמנו את הזכות לשנות, להשעות או להפסיק כל חלק מהשירות בהודעה סבירה.",
    },
    responsibilities: {
      title: "אחריות המשתמש",
      subtitle: "התחייבויותיכם בשימוש בשירות",
      intro: "בשימוש ב-Opticini אתם מסכימים:",
      items: [
        "לספק מידע מדויק ואמיתי",
        "להשתמש בשירות למטרות חוקיות בלבד",
        "לא לנסות גישה לא מורשית למערכות שלנו",
        "לא להפריע לשירות או לשבש אותו",
        "לכבד זכויות קניין רוחני",
        "לציית לכל החוקים והתקנות החלים",
      ],
      importantLabel: "חשוב:",
      importantBody:
        "אתם אחראים לוודא שיש לכם זכות לבדוק כל כתובת אתר שאתם שולחים לניתוח.",
    },
    acceptableUse: {
      title: "מדיניות שימוש מקובל",
      subtitle: "מה אסור בפלטפורמה שלנו",
      intro: "הפעילויות הבאות אסורות בהחלט:",
      items: [
        "בדיקת אתרים ללא הרשאה מתאימה",
        "ניסיון להעמיס או לקרוס את המערכות שלנו",
        "שימוש בכלים אוטומטיים לניצול לרעה של השירות",
        "ניסיון לבצע הנדסה לאחור של הטכנולוגיה שלנו",
        "שיתוף תוכן או קישורים זדוניים",
        "הפרת חוקים או תקנות חלים",
      ],
      outro: "הפרה עלולה לגרום להשעיה או לסיום מיידי של הגישה.",
    },
    intellectual: {
      title: "קניין רוחני",
      subtitle: "בעלות וזכויות שימוש",
      ourRightsTitle: "הזכויות שלנו",
      ourRightsBody:
        "השירות והתוכן המקורי, התכונות והפונקציונליות שייכים ל-Opticini ומוגנים בחוקי זכויות יוצרים, סימני מסחר, פטנטים, סודות מסחריים וקניין רוחני בינלאומי.",
      yourRightsTitle: "הזכויות שלכם",
      yourRightsBody:
        "אתם שומרים על בעלות בתוכן שאתם שולחים. בשליחת תוכן אתם מעניקים לנו רישיון בלעדי-לא, עולמי וללא תמלוגים לשימוש, הצגה והפצה אך ורק לצורך מתן השירות.",
      thirdPartyTitle: "תוכן צד שלישי",
      thirdPartyBody:
        "השירות עשוי לכלול קישורים לאתרים או שירותים של צדדים שלישיים. איננו אחראים לתוכן או לנהלים שלהם.",
    },
    liability: {
      title: "הגבלת אחריות",
      subtitle: "גבולות האחריות שלנו",
      intro:
        "במידה המרבית המותרת על פי חוק, Opticini לא תהיה אחראית לנזקים עקיפים, מקריים, מיוחדים, תוצאתיים או עונשיים, לרבות אובדן רווחים, נתונים, שימוש, מוניטין או הפסדים בלתי מוחשיים, הנובעים מ:",
      items: [
        "השימוש שלכם או חוסר היכולת להשתמש בשירות",
        "כל גישה לא מורשית או שימוש בשרתים שלנו",
        "כל הפרעה או הפסקה בהעברה אל השירות או ממנו",
        "כל באג, וירוס או קוד מזיק שעלול להיות מועבר",
        "כל טעות או השמטה בתוכן או כל אובדן או נזק",
      ],
      outro: "סך האחריות הכוללת שלנו בגין תביעות הנובעות מהשימוש בשירות לא יעלה על הסכום ששילמתם לנו, אם בכלל, בשנים עשר החודשים שלפני התביעה.",
    },
    termination: {
      title: "סיום",
      subtitle: "כיצד ניתן לסיים גישה",
      p1: "אנו רשאים להפסיק או להשעות את הגישה שלכם לשירות מיידית, ללא הודעה מוקדמת או אחריות, מכל סיבה, לרבות הפרת התנאים.",
      p2: "עם הסיום, זכותכם להשתמש בשירות מפסיקה מיד. ניתן פשוט להפסיק להשתמש בשירות.",
    },
    changes: {
      title: "שינויים בתנאים",
      subtitle: "כיצד אנו מטפלים בעדכונים",
      p1: "אנו שומרים לעצמנו את הזכות לשנות או להחליף תנאים אלה בכל עת. אם התיקון מהותי, ננסה לתת לפחות 30 ימי הודעה מראש.",
      p2: "המשך שימוש בשירות לאחר שינויים מהווה קבלה של התנאים החדשים.",
    },
    contact: {
      title: "צור קשר",
      subtitle: "שאלות לגבי תנאים אלה?",
      body: "לשאלות בנוגע לתנאי שירות אלה, צרו קשר:",
      email: "דוא\"ל: legal@opticini.com",
      website: "אתר: opticini.com",
    },
  }),
}

export const TERMS_PAGE_PATCH_BY_LANG: Record<string, TermsPayload> = {
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
