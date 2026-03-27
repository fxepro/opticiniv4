/** Full `feedback` namespace per locale (public feedback page + toasts). */

export type FeedbackStrings = {
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  experienceTitle: string
  experienceSubtitle: string
  rating0: string
  rating1: string
  rating2: string
  rating3: string
  rating4: string
  rating5: string
  greatTitle: string
  greatPlaceholder: string
  betterTitle: string
  betterPlaceholder: string
  removeTitle: string
  removePlaceholder: string
  submitting: string
  submit: string
  toastRatingTitle: string
  toastRatingDesc: string
  toastFeedbackTitle: string
  toastFeedbackDesc: string
  toastThanksTitle: string
  toastThanksDesc: string
  toastErrorTitle: string
  toastErrorDesc: string
}

export const FEEDBACK_BY_LANG: Record<string, FeedbackStrings> = {
  it: {
    heroBadge: "Il tuo parere conta",
    heroTitle: "Condividi il tuo feedback",
    heroSubtitle:
      "Aiutaci a migliorare Opticini con idee, suggerimenti e la tua esperienza d’uso",
    experienceTitle: "Com’è stata la tua esperienza?",
    experienceSubtitle:
      "Il tuo feedback ci aiuta a rendere Opticini migliore per tutti",
    rating0: "Valuta la tua esperienza",
    rating1: "Scarso",
    rating2: "Sufficiente",
    rating3: "Buono",
    rating4: "Molto buono",
    rating5: "Eccellente",
    greatTitle: "Cosa abbiamo fatto bene?",
    greatPlaceholder:
      "Raccontaci cosa ti è piaciuto di Opticini. Quali funzionalità ti hanno convinto? Cosa ha superato le tue aspettative?",
    betterTitle: "Cosa potremmo migliorare?",
    betterPlaceholder:
      "Condividi suggerimenti: cosa andrebbe rifinito? Cosa renderebbe l’esperienza più semplice?",
    removeTitle: "Cosa dovremmo eliminare o ripensare?",
    removePlaceholder:
      "Quali funzioni sono frustranti o superflue? Cosa andrebbe tolto o ridisegnato del tutto?",
    submitting: "Invio in corso…",
    submit: "Invia feedback",
    toastRatingTitle: "Valutazione obbligatoria",
    toastRatingDesc:
      "Seleziona una valutazione con le stelle prima di inviare il feedback.",
    toastFeedbackTitle: "Feedback obbligatorio",
    toastFeedbackDesc: "Inserisci almeno un commento.",
    toastThanksTitle: "Grazie!",
    toastThanksDesc:
      "Il tuo feedback è stato inviato correttamente. Ti ringraziamo!",
    toastErrorTitle: "Errore",
    toastErrorDesc: "Invio non riuscito. Riprova.",
  },
  es: {
    heroBadge: "Valoramos tu opinión",
    heroTitle: "Comparte tus comentarios",
    heroSubtitle:
      "Ayúdanos a mejorar Opticini con tus ideas, sugerencias y experiencia",
    experienceTitle: "¿Cómo fue tu experiencia?",
    experienceSubtitle:
      "Tus comentarios nos ayudan a mejorar Opticini para todos",
    rating0: "Valora tu experiencia",
    rating1: "Mala",
    rating2: "Regular",
    rating3: "Buena",
    rating4: "Muy buena",
    rating5: "Excelente",
    greatTitle: "¿Qué hicimos bien?",
    greatPlaceholder:
      "Cuéntanos qué te gustó de Opticini. ¿Qué funciones te funcionaron bien? ¿Qué superó tus expectativas?",
    betterTitle: "¿Qué podría mejorar?",
    betterPlaceholder:
      "Sugerencias de mejora. ¿Qué funciones necesitan trabajo? ¿Qué haría la experiencia más fluida?",
    removeTitle: "¿Qué deberíamos quitar o replantear?",
    removePlaceholder:
      "¿Qué funciones resultan frustrantes o innecesarias? ¿Qué eliminar o rediseñar por completo?",
    submitting: "Enviando…",
    submit: "Enviar comentarios",
    toastRatingTitle: "Valoración obligatoria",
    toastRatingDesc: "Selecciona una valoración con estrellas antes de enviar.",
    toastFeedbackTitle: "Comentarios obligatorios",
    toastFeedbackDesc: "Añade al menos un comentario.",
    toastThanksTitle: "¡Gracias!",
    toastThanksDesc:
      "Tus comentarios se han enviado correctamente. ¡Te lo agradecemos!",
    toastErrorTitle: "Error",
    toastErrorDesc: "No se pudo enviar. Inténtalo de nuevo.",
  },
  fr: {
    heroBadge: "Votre avis compte",
    heroTitle: "Partagez votre avis",
    heroSubtitle:
      "Aidez-nous à améliorer Opticini avec vos idées, suggestions et retours d’expérience",
    experienceTitle: "Comment s’est passée votre expérience ?",
    experienceSubtitle:
      "Vos retours nous aident à améliorer Opticini pour tout le monde",
    rating0: "Évaluez votre expérience",
    rating1: "Mauvais",
    rating2: "Moyen",
    rating3: "Bon",
    rating4: "Très bon",
    rating5: "Excellent",
    greatTitle: "Qu’avons-nous bien fait ?",
    greatPlaceholder:
      "Dites-nous ce que vous avez aimé chez Opticini. Quelles fonctions ont bien fonctionné ? Qu’est-ce qui a dépassé vos attentes ?",
    betterTitle: "Qu’est-ce qui pourrait être amélioré ?",
    betterPlaceholder:
      "Suggestions d’amélioration. Quelles fonctions méritent du travail ? Qu’est-ce qui rendrait l’expérience plus fluide ?",
    removeTitle: "Que devrions-nous supprimer ou repenser ?",
    removePlaceholder:
      "Quelles fonctions sont frustrantes ou inutiles ? Que supprimer ou refondre entièrement ?",
    submitting: "Envoi en cours…",
    submit: "Envoyer le feedback",
    toastRatingTitle: "Note obligatoire",
    toastRatingDesc:
      "Sélectionnez une note par étoiles avant d’envoyer votre avis.",
    toastFeedbackTitle: "Avis obligatoire",
    toastFeedbackDesc: "Veuillez fournir au moins un commentaire.",
    toastThanksTitle: "Merci !",
    toastThanksDesc:
      "Votre avis a bien été envoyé. Nous vous en remercions !",
    toastErrorTitle: "Erreur",
    toastErrorDesc: "Échec de l’envoi. Veuillez réessayer.",
  },
  de: {
    heroBadge: "Ihre Meinung zählt",
    heroTitle: "Teilen Sie Ihr Feedback",
    heroSubtitle:
      "Helfen Sie uns, Opticini mit Ihren Gedanken, Vorschlägen und Erfahrungen zu verbessern",
    experienceTitle: "Wie war Ihre Erfahrung?",
    experienceSubtitle:
      "Ihr Feedback hilft uns, Opticini für alle besser zu machen",
    rating0: "Bewerten Sie Ihre Erfahrung",
    rating1: "Schlecht",
    rating2: "Ausreichend",
    rating3: "Gut",
    rating4: "Sehr gut",
    rating5: "Hervorragend",
    greatTitle: "Was haben wir gut gemacht?",
    greatPlaceholder:
      "Sagen Sie uns, was Ihnen an Opticini gefallen hat. Welche Funktionen liefen gut? Was hat Ihre Erwartungen übertroffen?",
    betterTitle: "Was könnte besser werden?",
    betterPlaceholder:
      "Verbesserungsvorschläge. Welche Funktionen brauchen Arbeit? Was würde die Nutzung reibungsloser machen?",
    removeTitle: "Was sollten wir entfernen oder neu denken?",
    removePlaceholder:
      "Welche Funktionen sind frustrierend oder überflüssig? Was sollte ganz weg oder neu gestaltet werden?",
    submitting: "Wird gesendet…",
    submit: "Feedback senden",
    toastRatingTitle: "Bewertung erforderlich",
    toastRatingDesc:
      "Bitte wählen Sie eine Sternebewertung, bevor Sie senden.",
    toastFeedbackTitle: "Feedback erforderlich",
    toastFeedbackDesc: "Bitte geben Sie mindestens einen Kommentar ab.",
    toastThanksTitle: "Vielen Dank!",
    toastThanksDesc:
      "Ihr Feedback wurde erfolgreich übermittelt. Wir schätzen Ihren Beitrag!",
    toastErrorTitle: "Fehler",
    toastErrorDesc: "Senden fehlgeschlagen. Bitte erneut versuchen.",
  },
  pt: {
    heroBadge: "A sua opinião importa",
    heroTitle: "Partilhe o seu feedback",
    heroSubtitle:
      "Ajude-nos a melhorar a Opticini com as suas ideias, sugestões e experiência",
    experienceTitle: "Como foi a sua experiência?",
    experienceSubtitle:
      "O seu feedback ajuda-nos a melhorar a Opticini para todos",
    rating0: "Avalie a sua experiência",
    rating1: "Fraco",
    rating2: "Razoável",
    rating3: "Bom",
    rating4: "Muito bom",
    rating5: "Excelente",
    greatTitle: "O que fizemos bem?",
    greatPlaceholder:
      "Diga-nos o que gostou na Opticini. Que funcionalidades funcionaram bem? O que superou as expectativas?",
    betterTitle: "O que poderia melhorar?",
    betterPlaceholder:
      "Sugestões de melhoria. Que funcionalidades precisam de trabalho? O que tornaria a experiência mais fluida?",
    removeTitle: "O que devemos remover ou repensar?",
    removePlaceholder:
      "Que funcionalidades são frustrantes ou desnecessárias? O que remover ou redesenhar por completo?",
    submitting: "A enviar…",
    submit: "Enviar feedback",
    toastRatingTitle: "Classificação obrigatória",
    toastRatingDesc:
      "Selecione uma classificação por estrelas antes de enviar.",
    toastFeedbackTitle: "Feedback obrigatório",
    toastFeedbackDesc: "Forneça pelo menos um comentário.",
    toastThanksTitle: "Obrigado!",
    toastThanksDesc:
      "O seu feedback foi enviado com sucesso. Agradecemos a sua contribuição!",
    toastErrorTitle: "Erro",
    toastErrorDesc: "Falha ao enviar. Tente novamente.",
  },
}
