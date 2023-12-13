// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
  ],
  // plugins: ['~/plugins/rupiahFormatter.js'],
  runtimeConfig: {
    public: {
      // baseURL: 'http://localhost:2020',
      baseURL: process.env.API_BASE_URL
    },
  },
})
