export default defineNuxtConfig({
  ssr: true,
  app: {
    pageTransition: { name: 'liquid-page', mode: 'out-in' }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/rss.xml']
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '~/assets/css/main.css'
  ],
  runtimeConfig: {
    mongoUri: process.env.MONGODB_URI,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000'
    }
  },
  build: {
    transpile: ['vuetify']
  },
  vite: {
    ssr: {
      noExternal: ['vuetify']
    }
  }
})
