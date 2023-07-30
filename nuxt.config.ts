// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    'nuxt-icon',
  ],
  image: {},
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  css: [
    '@/assets/css/main.css',
  ]
})
