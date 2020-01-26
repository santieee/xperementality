import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import colors from "@/assets/scss/variables.scss";

Vue.use(Vuetify);
export default ctx => {
  ctx.app.vuetify = vuetify;
};

const vuetify = new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: colors["dark-primary"],
        secondary: colors["dark-secondary"],
        accent: colors["dark-accent"],
        error: colors["dark-error"],
        info: colors["dark-info"],
        success: colors["dark-success"],
        warning: colors["dark-warning"]
      },
      light: {
        primary: colors["light-primary"],
        secondary: colors["light-secondary"],
        accent: colors["light-accent"],
        error: colors["light-error"],
        info: colors["light-info"],
        success: colors["light-success"],
        warning: colors["light-warning"]
      }
    }
  }
});
