import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt2-guideline',
    title: 'nuxt2-guideline',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '@/plugins/api.js' }, { src: '@/plugins/utils.js' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',

    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],

  i18n: {
    seo: true,
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'th',
    locales: [
      // { name: 'English', code: 'en', iso: 'en-US', file: 'en.json' },
      { name: 'ไทย', code: 'th', iso: 'th-TH', file: 'th.json' },
    ],
    detectBrowserLanguage: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 8080,
    host: ['staging', 'production'].includes(process.env.BUILD_MODE)
      ? '0.0.0.0'
      : 'localhost',
    timing: false,
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL,
    },
    version: process.env.VERSION,
  },
}
