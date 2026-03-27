import { deepMergePublicPages } from "./deep-merge-public-pages"
import { PUBLIC_PAGES_EN } from "./public-pages-en"

type WorkspaceLoginPayload = { workspaceLogin: typeof PUBLIC_PAGES_EN.workspaceLogin }

const W = PUBLIC_PAGES_EN.workspaceLogin as unknown as Record<string, unknown>

function mergeWl(
  patch: Record<string, unknown>
): typeof PUBLIC_PAGES_EN.workspaceLogin {
  return deepMergePublicPages(W, patch) as unknown as typeof PUBLIC_PAGES_EN.workspaceLogin
}

const EN: WorkspaceLoginPayload = { workspaceLogin: PUBLIC_PAGES_EN.workspaceLogin }

const ES: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "Acceso al espacio de trabajo",
    heroSubtitle:
      "Inicie sesión para acceder a su espacio unificado y gestionar el rendimiento de su sitio",
    cardTitle: "Acceso al espacio de trabajo",
    cardDescription: "Inicie sesión para acceder a su espacio unificado",
    labelUsername: "Nombre de usuario",
    placeholderUsername: "Introduzca su nombre de usuario",
    labelPassword: "Contraseña",
    placeholderPassword: "Introduzca su contraseña",
    signingIn: "Iniciando sesión...",
    signInButton: "Entrar al espacio de trabajo",
    noAccount: "¿No tiene cuenta?",
    signUpLink: "Registrarse",
    loginFailedDefault:
      "Error de inicio de sesión. Compruebe sus credenciales.",
  }),
}

const FR: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "Connexion à l'espace de travail",
    heroSubtitle:
      "Connectez-vous pour accéder à votre espace unifié et gérer les performances de votre site",
    cardTitle: "Connexion à l'espace de travail",
    cardDescription: "Connectez-vous pour accéder à votre espace unifié",
    labelUsername: "Nom d'utilisateur",
    placeholderUsername: "Saisissez votre nom d'utilisateur",
    labelPassword: "Mot de passe",
    placeholderPassword: "Saisissez votre mot de passe",
    signingIn: "Connexion en cours...",
    signInButton: "Se connecter à l'espace de travail",
    noAccount: "Pas encore de compte ?",
    signUpLink: "S'inscrire",
    loginFailedDefault:
      "Échec de la connexion. Vérifiez vos identifiants.",
  }),
}

const DE: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "Workspace-Anmeldung",
    heroSubtitle:
      "Melden Sie sich an, um auf Ihren einheitlichen Workspace zuzugreifen und die Website-Performance zu verwalten",
    cardTitle: "Workspace-Anmeldung",
    cardDescription: "Melden Sie sich an, um auf Ihren einheitlichen Workspace zuzugreifen",
    labelUsername: "Benutzername",
    placeholderUsername: "Benutzername eingeben",
    labelPassword: "Passwort",
    placeholderPassword: "Passwort eingeben",
    signingIn: "Anmeldung läuft...",
    signInButton: "Im Workspace anmelden",
    noAccount: "Noch kein Konto?",
    signUpLink: "Registrieren",
    loginFailedDefault:
      "Anmeldung fehlgeschlagen. Bitte Zugangsdaten prüfen.",
  }),
}

const IT: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "Accesso all'area di lavoro",
    heroSubtitle:
      "Accedi per usare l'area unificata e gestire le prestazioni del sito",
    cardTitle: "Accesso all'area di lavoro",
    cardDescription: "Accedi per usare l'area unificata",
    labelUsername: "Nome utente",
    placeholderUsername: "Inserisci il nome utente",
    labelPassword: "Password",
    placeholderPassword: "Inserisci la password",
    signingIn: "Accesso in corso...",
    signInButton: "Accedi all'area di lavoro",
    noAccount: "Non hai un account?",
    signUpLink: "Registrati",
    loginFailedDefault:
      "Accesso non riuscito. Controlla le credenziali.",
  }),
}

const PT: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "Início de sessão no espaço de trabalho",
    heroSubtitle:
      "Inicie sessão para aceder ao seu espaço unificado e gerir o desempenho do site",
    cardTitle: "Início de sessão no espaço de trabalho",
    cardDescription: "Inicie sessão para aceder ao seu espaço unificado",
    labelUsername: "Nome de utilizador",
    placeholderUsername: "Introduza o nome de utilizador",
    labelPassword: "Palavra-passe",
    placeholderPassword: "Introduza a palavra-passe",
    signingIn: "A iniciar sessão...",
    signInButton: "Entrar no espaço de trabalho",
    noAccount: "Não tem conta?",
    signUpLink: "Registar",
    loginFailedDefault:
      "Falha no início de sessão. Verifique as credenciais.",
  }),
}

const RU: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "Вход в рабочее пространство",
    heroSubtitle:
      "Войдите, чтобы открыть единое рабочее пространство и управлять производительностью сайта",
    cardTitle: "Вход в рабочее пространство",
    cardDescription: "Войдите, чтобы открыть единое рабочее пространство",
    labelUsername: "Имя пользователя",
    placeholderUsername: "Введите имя пользователя",
    labelPassword: "Пароль",
    placeholderPassword: "Введите пароль",
    signingIn: "Вход...",
    signInButton: "Войти в рабочее пространство",
    noAccount: "Нет учётной записи?",
    signUpLink: "Регистрация",
    loginFailedDefault:
      "Ошибка входа. Проверьте учётные данные.",
  }),
}

const SV: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "Inloggning till arbetsytan",
    heroSubtitle:
      "Logga in för att nå din enhetliga arbetsyta och hantera webbplatsens prestanda",
    cardTitle: "Inloggning till arbetsytan",
    cardDescription: "Logga in för att nå din enhetliga arbetsyta",
    labelUsername: "Användarnamn",
    placeholderUsername: "Ange användarnamn",
    labelPassword: "Lösenord",
    placeholderPassword: "Ange lösenord",
    signingIn: "Loggar in...",
    signInButton: "Logga in i arbetsytan",
    noAccount: "Har du inget konto?",
    signUpLink: "Registrera dig",
    loginFailedDefault:
      "Inloggningen misslyckades. Kontrollera dina uppgifter.",
  }),
}

const NO: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "Pålogging til arbeidsområdet",
    heroSubtitle:
      "Logg inn for å få tilgang til arbeidsområdet og administrere nettstedets ytelse",
    cardTitle: "Pålogging til arbeidsområdet",
    cardDescription: "Logg inn for å få tilgang til arbeidsområdet",
    labelUsername: "Brukernavn",
    placeholderUsername: "Skriv inn brukernavn",
    labelPassword: "Passord",
    placeholderPassword: "Skriv inn passord",
    signingIn: "Logger inn...",
    signInButton: "Logg inn i arbeidsområdet",
    noAccount: "Har du ikke konto?",
    signUpLink: "Registrer deg",
    loginFailedDefault:
      "Pålogging mislyktes. Sjekk legitimasjonen.",
  }),
}

const DA: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "Log ind på arbejdsområdet",
    heroSubtitle:
      "Log ind for at få adgang til dit samlede arbejdsområde og administrere webstedets ydelse",
    cardTitle: "Log ind på arbejdsområdet",
    cardDescription: "Log ind for at få adgang til dit samlede arbejdsområde",
    labelUsername: "Brugernavn",
    placeholderUsername: "Indtast brugernavn",
    labelPassword: "Adgangskode",
    placeholderPassword: "Indtast adgangskode",
    signingIn: "Logger ind...",
    signInButton: "Log ind i arbejdsområdet",
    noAccount: "Har du ikke en konto?",
    signUpLink: "Tilmeld dig",
    loginFailedDefault:
      "Login mislykkedes. Tjek dine oplysninger.",
  }),
}

const ZH: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "工作区登录",
    heroSubtitle: "登录以访问统一工作区并管理网站性能",
    cardTitle: "工作区登录",
    cardDescription: "登录以访问统一工作区",
    labelUsername: "用户名",
    placeholderUsername: "请输入用户名",
    labelPassword: "密码",
    placeholderPassword: "请输入密码",
    signingIn: "正在登录…",
    signInButton: "登录工作区",
    noAccount: "还没有账户？",
    signUpLink: "注册",
    loginFailedDefault: "登录失败，请检查您的凭据。",
  }),
}

const JA: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "ワークスペースにログイン",
    heroSubtitle:
      "サインインして統合ワークスペースにアクセスし、サイトのパフォーマンスを管理します",
    cardTitle: "ワークスペースにログイン",
    cardDescription: "サインインして統合ワークスペースにアクセス",
    labelUsername: "ユーザー名",
    placeholderUsername: "ユーザー名を入力",
    labelPassword: "パスワード",
    placeholderPassword: "パスワードを入力",
    signingIn: "サインイン中…",
    signInButton: "ワークスペースにサインイン",
    noAccount: "アカウントをお持ちでないですか？",
    signUpLink: "新規登録",
    loginFailedDefault:
      "ログインに失敗しました。認証情報をご確認ください。",
  }),
}

const KO: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "워크스페이스 로그인",
    heroSubtitle:
      "로그인하여 통합 워크스페이스에 접속하고 사이트 성능을 관리하세요",
    cardTitle: "워크스페이스 로그인",
    cardDescription: "로그인하여 통합 워크스페이스에 접속",
    labelUsername: "사용자 이름",
    placeholderUsername: "사용자 이름을 입력하세요",
    labelPassword: "비밀번호",
    placeholderPassword: "비밀번호를 입력하세요",
    signingIn: "로그인 중…",
    signInButton: "워크스페이스에 로그인",
    noAccount: "계정이 없으신가요?",
    signUpLink: "가입하기",
    loginFailedDefault:
      "로그인에 실패했습니다. 자격 증명을 확인하세요.",
  }),
}

const HI: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "वर्कस्पेस लॉगिन",
    heroSubtitle:
      "अपने एकीकृत वर्कस्पेस तक पहुँचने और साइट प्रदर्शन प्रबंधित करने के लिए साइन इन करें",
    cardTitle: "वर्कस्पेस लॉगिन",
    cardDescription: "अपने एकीकृत वर्कस्पेस तक पहुँचने के लिए साइन इन करें",
    labelUsername: "उपयोगकर्ता नाम",
    placeholderUsername: "उपयोगकर्ता नाम दर्ज करें",
    labelPassword: "पासवर्ड",
    placeholderPassword: "पासवर्ड दर्ज करें",
    signingIn: "साइन इन हो रहा है...",
    signInButton: "वर्कस्पेस में साइन इन करें",
    noAccount: "खाता नहीं है?",
    signUpLink: "साइन अप",
    loginFailedDefault:
      "लॉगिन विफल। कृपया अपनी साख जाँचें।",
  }),
}

const AR: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "تسجيل الدخول إلى مساحة العمل",
    heroSubtitle:
      "سجّل الدخول للوصول إلى مساحة العمل الموحدة وإدارة أداء الموقع",
    cardTitle: "تسجيل الدخول إلى مساحة العمل",
    cardDescription: "سجّل الدخول للوصول إلى مساحة العمل الموحدة",
    labelUsername: "اسم المستخدم",
    placeholderUsername: "أدخل اسم المستخدم",
    labelPassword: "كلمة المرور",
    placeholderPassword: "أدخل كلمة المرور",
    signingIn: "جاري تسجيل الدخول...",
    signInButton: "تسجيل الدخول إلى مساحة العمل",
    noAccount: "ليس لديك حساب؟",
    signUpLink: "إنشاء حساب",
    loginFailedDefault:
      "فشل تسجيل الدخول. تحقق من بيانات الاعتماد.",
  }),
}

const HE: WorkspaceLoginPayload = {
  workspaceLogin: mergeWl({
    heroTitle: "כניסה לסביבת העבודה",
    heroSubtitle:
      "התחברו כדי לגשת לסביבת העבודה המאוחדת ולנהל את ביצועי האתר",
    cardTitle: "כניסה לסביבת העבודה",
    cardDescription: "התחברו כדי לגשת לסביבת העבודה המאוחדת",
    labelUsername: "שם משתמש",
    placeholderUsername: "הזינו שם משתמש",
    labelPassword: "סיסמה",
    placeholderPassword: "הזינו סיסמה",
    signingIn: "מתחברים...",
    signInButton: "כניסה לסביבת העבודה",
    noAccount: "אין לכם חשבון?",
    signUpLink: "הרשמה",
    loginFailedDefault:
      "ההתחברות נכשלה. בדקו את פרטי ההתחברות.",
  }),
}

export const WORKSPACE_LOGIN_PAGE_PATCH_BY_LANG: Record<string, WorkspaceLoginPayload> = {
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
