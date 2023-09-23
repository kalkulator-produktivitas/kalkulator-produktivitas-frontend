// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      baseURL: 'https://dev-api.japrieats.com/kalkulator-produktivitas',
    },
  },
})
