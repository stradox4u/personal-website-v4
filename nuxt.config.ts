// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    'nuxt-icon',
    'nuxt-mailer',
  ],
  image: {
    format: ['webp'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  css: [
    '@/assets/css/main.css',
  ],
  runtimeConfig: {
    mailerUser: '',
    mailerPass: '',
    mailerLog: '',
    mailerDriver: '',
    mailerHost: '',
    mailerPort: '',
    mailerSmtpTls: '',
    mailerFromAddress: '',
    mailerFromName: '',
  }
})
