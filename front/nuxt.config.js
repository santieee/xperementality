module.exports = {
  head: {
    title: "Xperimentality",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  styleResources: {
    scss: ["~assets/scss/variables.scss"]
  },
  buildModules: [["@nuxtjs/style-resources"]],
  plugins: [ 
    "@/plugins/vuetify.js",
    "@/plugins/axios",
    { src: "@/store/plugins/persist.js", ssr: false },
  ],
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],
  axios: {
    baseURL: 'http://localhost:4000'
  },

  css: ["~assets/scss/"],

  loading: { color: "#3B8070" },
  router: {
    middleware: ["test"]
  },
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
