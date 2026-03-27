import { deepMergePublicPages } from "./deep-merge-public-pages"
import { PUBLIC_PAGES_EN } from "./public-pages-en"

type BlogPayload = { blog: typeof PUBLIC_PAGES_EN.blog }

const BLOG_BASE = PUBLIC_PAGES_EN.blog as unknown as Record<string, unknown>

function mergeBlog(patch: Record<string, unknown>): typeof PUBLIC_PAGES_EN.blog {
  return deepMergePublicPages(BLOG_BASE, patch) as unknown as typeof PUBLIC_PAGES_EN.blog
}

const EN: BlogPayload = { blog: PUBLIC_PAGES_EN.blog }

const ES: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "Recursos",
    heroTitle: "Blog",
    heroSubtitle:
      "Ideas, consejos y novedades sobre rendimiento web, SEO y marketing digital",
    loading: "Cargando artículos del blog...",
    searchPlaceholder: "Buscar artículos...",
    search: "Buscar",
    featuredPosts: "Artículos destacados",
    recentPosts: "Artículos recientes",
    featuredBadge: "Destacado",
    minRead: "{{count}} min de lectura",
    noPosts: "Aún no hay artículos en el blog.",
    categories: "Categorías",
    tags: "Etiquetas",
  }),
}

const FR: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "Ressources",
    heroTitle: "Blog",
    heroSubtitle:
      "Conseils, astuces et actualités sur la performance web, le SEO et le marketing digital",
    loading: "Chargement des articles...",
    searchPlaceholder: "Rechercher des articles...",
    search: "Rechercher",
    featuredPosts: "Articles à la une",
    recentPosts: "Articles récents",
    featuredBadge: "À la une",
    minRead: "{{count}} min de lecture",
    noPosts: "Aucun article pour le moment.",
    categories: "Catégories",
    tags: "Tags",
  }),
}

const DE: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "Ressourcen",
    heroTitle: "Blog",
    heroSubtitle:
      "Einblicke, Tipps und Neuigkeiten zu Web-Performance, SEO und digitalem Marketing",
    loading: "Blogbeiträge werden geladen...",
    searchPlaceholder: "Beiträge suchen...",
    search: "Suchen",
    featuredPosts: "Hervorgehobene Beiträge",
    recentPosts: "Neueste Beiträge",
    featuredBadge: "Hervorgehoben",
    minRead: "{{count}} Min. Lesezeit",
    noPosts: "Noch keine Blogbeiträge verfügbar.",
    categories: "Kategorien",
    tags: "Schlagwörter",
  }),
}

const IT: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "Risorse",
    heroTitle: "Blog",
    heroSubtitle:
      "Approfondimenti, suggerimenti e novità su prestazioni web, SEO e marketing digitale",
    loading: "Caricamento articoli...",
    searchPlaceholder: "Cerca articoli...",
    search: "Cerca",
    featuredPosts: "In evidenza",
    recentPosts: "Articoli recenti",
    featuredBadge: "In evidenza",
    minRead: "{{count}} min di lettura",
    noPosts: "Nessun articolo disponibile al momento.",
    categories: "Categorie",
    tags: "Tag",
  }),
}

const PT: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "Recursos",
    heroTitle: "Blog",
    heroSubtitle:
      "Ideias, dicas e novidades sobre desempenho web, SEO e marketing digital",
    loading: "A carregar artigos do blog...",
    searchPlaceholder: "Pesquisar artigos...",
    search: "Pesquisar",
    featuredPosts: "Destaques",
    recentPosts: "Artigos recentes",
    featuredBadge: "Destaque",
    minRead: "{{count}} min de leitura",
    noPosts: "Ainda não há artigos no blog.",
    categories: "Categorias",
    tags: "Etiquetas",
  }),
}

const RU: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "Материалы",
    heroTitle: "Блог",
    heroSubtitle:
      "Идеи, советы и новости о производительности сайтов, SEO и цифровом маркетинге",
    loading: "Загрузка записей блога...",
    searchPlaceholder: "Поиск по записям...",
    search: "Найти",
    featuredPosts: "Избранное",
    recentPosts: "Недавние записи",
    featuredBadge: "Избранное",
    minRead: "{{count}} мин чтения",
    noPosts: "Пока нет записей в блоге.",
    categories: "Категории",
    tags: "Теги",
  }),
}

const SV: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "Resurser",
    heroTitle: "Blogg",
    heroSubtitle:
      "Insikter, tips och nyheter om webbprestanda, SEO och digital marknadsföring",
    loading: "Laddar blogginlägg...",
    searchPlaceholder: "Sök inlägg...",
    search: "Sök",
    featuredPosts: "Utvalda inlägg",
    recentPosts: "Senaste inlägg",
    featuredBadge: "Utvald",
    minRead: "{{count}} min läsning",
    noPosts: "Inga blogginlägg ännu.",
    categories: "Kategorier",
    tags: "Taggar",
  }),
}

const NO: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "Ressurser",
    heroTitle: "Blogg",
    heroSubtitle:
      "Innsikt, tips og nyheter om nettytelse, SEO og digital markedsføring",
    loading: "Laster blogginnlegg...",
    searchPlaceholder: "Søk i innlegg...",
    search: "Søk",
    featuredPosts: "Utvalgte innlegg",
    recentPosts: "Nye innlegg",
    featuredBadge: "Utvalgt",
    minRead: "{{count}} min lesing",
    noPosts: "Ingen blogginnlegg ennå.",
    categories: "Kategorier",
    tags: "Tagger",
  }),
}

const DA: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "Ressourcer",
    heroTitle: "Blog",
    heroSubtitle:
      "Indsigt, tips og nyheder om webydelse, SEO og digital markedsføring",
    loading: "Indlæser blogindlæg...",
    searchPlaceholder: "Søg i indlæg...",
    search: "Søg",
    featuredPosts: "Udvalgte indlæg",
    recentPosts: "Seneste indlæg",
    featuredBadge: "Udvalgt",
    minRead: "{{count}} min læsning",
    noPosts: "Ingen blogindlæg endnu.",
    categories: "Kategorier",
    tags: "Tags",
  }),
}

const ZH: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "资源",
    heroTitle: "博客",
    heroSubtitle: "关于网站性能、SEO 与数字营销的见解、技巧与更新",
    loading: "正在加载博客文章...",
    searchPlaceholder: "搜索文章...",
    search: "搜索",
    featuredPosts: "精选文章",
    recentPosts: "最新文章",
    featuredBadge: "精选",
    minRead: "约 {{count}} 分钟阅读",
    noPosts: "暂无博客文章。",
    categories: "分类",
    tags: "标签",
  }),
}

const JA: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "リソース",
    heroTitle: "ブログ",
    heroSubtitle:
      "Web パフォーマンス、SEO、デジタルマーケティングに関する洞察・ヒント・最新情報",
    loading: "ブログ記事を読み込み中...",
    searchPlaceholder: "記事を検索...",
    search: "検索",
    featuredPosts: "おすすめ記事",
    recentPosts: "新着記事",
    featuredBadge: "おすすめ",
    minRead: "約{{count}}分で読めます",
    noPosts: "まだ記事がありません。",
    categories: "カテゴリ",
    tags: "タグ",
  }),
}

const KO: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "리소스",
    heroTitle: "블로그",
    heroSubtitle: "웹 성능, SEO, 디지털 마케팅에 대한 인사이트·팁·소식",
    loading: "블로그 글을 불러오는 중...",
    searchPlaceholder: "글 검색...",
    search: "검색",
    featuredPosts: "추천 글",
    recentPosts: "최근 글",
    featuredBadge: "추천",
    minRead: "약 {{count}}분 읽기",
    noPosts: "아직 블로그 글이 없습니다.",
    categories: "카테고리",
    tags: "태그",
  }),
}

const HI: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "संसाधन",
    heroTitle: "ब्लॉग",
    heroSubtitle:
      "वेब प्रदर्शन, SEO और डिजिटल मार्केटिंग पर अंतर्दृष्टि, सुझाव और अपडेट",
    loading: "ब्लॉग पोस्ट लोड हो रहे हैं...",
    searchPlaceholder: "पोस्ट खोजें...",
    search: "खोजें",
    featuredPosts: "विशेष पोस्ट",
    recentPosts: "हाल की पोस्ट",
    featuredBadge: "विशेष",
    minRead: "{{count}} मिनट पढ़ने का समय",
    noPosts: "अभी कोई ब्लॉग पोस्ट उपलब्ध नहीं है।",
    categories: "श्रेणियाँ",
    tags: "टैग",
  }),
}

const AR: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "الموارد",
    heroTitle: "المدونة",
    heroSubtitle:
      "رؤى ونصائح وتحديثات حول أداء المواقع وتحسين محركات البحث والتسويق الرقمي",
    loading: "جاري تحميل مقالات المدونة...",
    searchPlaceholder: "البحث في المقالات...",
    search: "بحث",
    featuredPosts: "مقالات مميزة",
    recentPosts: "أحدث المقالات",
    featuredBadge: "مميز",
    minRead: "{{count}} دقيقة قراءة",
    noPosts: "لا توجد مقالات في المدونة بعد.",
    categories: "التصنيفات",
    tags: "الوسوم",
  }),
}

const HE: BlogPayload = {
  blog: mergeBlog({
    heroBadge: "משאבים",
    heroTitle: "בלוג",
    heroSubtitle:
      "תובנות, טיפים ועדכונים על ביצועי אתרים, SEO ושיווק דיגיטלי",
    loading: "טוען פוסטים...",
    searchPlaceholder: "חיפוש פוסטים...",
    search: "חיפוש",
    featuredPosts: "פוסטים מומלצים",
    recentPosts: "פוסטים אחרונים",
    featuredBadge: "מומלץ",
    minRead: "{{count}} דק׳ קריאה",
    noPosts: "אין עדיין פוסטים בבלוג.",
    categories: "קטגוריות",
    tags: "תגיות",
  }),
}

export const BLOG_PAGE_PATCH_BY_LANG: Record<string, BlogPayload> = {
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
