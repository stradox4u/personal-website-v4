// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    'nuxt-icon',
    'nuxt-mailer',
  ],
  image: {
    provider: 'ipx',
    options: {
      baseURL: process.env.NUXT_API_BASE_URL + '/ipx',
    },
    // providers: {
    //   proxy: {
    //     provider: 'ipx',
    //     options: {
    //       baseURL: process.env.NUXT_API_BASE_URL + '/ipx',
    //     },
    //   },
    // },
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
    mailgun: {
      host: process.env.NUXT_MAILGUN_HOST,
      port: process.env.NUXT_MAILGUN_PORT,
      user: process.env.NUXT_MAILGUN_USER,
      password: process.env.NUXT_MAILGUN_PASSWORD,
    }
  }
})
