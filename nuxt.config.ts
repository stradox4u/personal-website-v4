// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    'nuxt-icon',
    'nuxt-mailer',
    'nuxt-simple-robots'
  ],
  image: {
    imgix: {
      baseURL: process.env.NUXT_IMGIX_BASE_URL,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  robots: {
    disallow: ['/blog', '/contact'],
  },
  css: [
    '@/assets/css/main.css',
  ],
  runtimeConfig: {
    mailer: {
      host: process.env.NUXT_MAILER_HOST,
      port: process.env.NUXT_MAILER_PORT,
      user: process.env.NUXT_MAILER_USER,
      password: process.env.NUXT_MAILER_PASSWORD,
      fromEmail: process.env.NUXT_MAILER_FROM_ADDRESS,
      toEmail: process.env.NUXT_MAILER_RECIPIENT
    }
  }
})
