const CONFIG = {
  profile: {
    name: "narahim",
    image: "/avatar.png",
    role: "Backend Developer",
    bio: "왜를 고민하고,\n기록하며 성장하는 백엔드 개발자",
    email: "narahim.lee@gmail.com",
    linkedin: "",
    github: "skfkgla",
  },
  projects: [
    {
      name: `SSaG\n패션 최저가 검색 서비스`,
      href: "https://github.com/nbc-expert-6/SSaG",
    },
    {
      name: `ShoongLogistics\nB2B 물류 관리 서비스`,
      href: "https://github.com/nbc-expert-6/ShoongLogistics",
    },
    {
      name: `Turkey\nB2C 음식 배달 서비스`,
      href: "https://github.com/turkey-team/delivery-service-backend",
    },
  ],
  // blog setting (required)
  blog: {
    title: "기록의 힘",
    description: "왜를 고민하고 기록하며 성장하는 백엔드 개발자 narahim의 기술 블로그입니다.",
    keywords: ["기록의 힘", "백엔드 개발자", "자바", "스프링", "Java", "Spring", "Spring Boot", "트러블슈팅", "기술 블로그", "narahim", "성장 기록"],
    scheme: "system", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "https://himlog.vercel.app",
  since: 2026, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: true,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  slack: {
    enable: process.env.SLACK_WEBHOOK_URL ? true : false,
    config: {
      url: process.env.SLACK_WEBHOOK_URL || "",
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 3600, // revalidate time for [slug], index
}

module.exports = { CONFIG }
