// nuxt.config.ts

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase"],
  supabase: {
    url: process.env.VITE_SUPABASE_URL, // Bruker miljøvariabelen for Supabase URL
    key: process.env.VITE_SUPABASE_ANON_KEY, // Bruker miljøvariabelen for Anon Key
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    }
  }
});