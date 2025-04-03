import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },
  app: {
    head: {
      title: 'Food Recipe',
      titleTemplate: '%s - Food Recipe',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover and share amazing recipes from around the world.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.svg' }
      ]
    }
  },
});