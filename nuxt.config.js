export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TimeManagement',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/vuetify',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase'
  ],

  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    }
  },

  firebase: {
      config: {
        apiKey: "AIzaSyDsKl4zOr5yfcZMZ7qUBnyk20hXZTOVkCc",
        authDomain: "timemanagement-aed5b.firebaseapp.com",
        projectId: "timemanagement-aed5b",
        storageBucket: "timemanagement-aed5b.appspot.com",
        messagingSenderId: "932640212870",
        appId: "1:932640212870:web:079fc6010eb518c78b4e07",
        measurementId: "G-YFQV9JRETH"
      },
      services: {
        auth: true,
        database: true
      }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
