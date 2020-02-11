export default {
  state: () => ({
    isDarkTheme: true,
    locale: 'en',
    locales: ['en', 'ru'],
    snackbar: {
      status: false,
      timeout: 3000,
      type: 'priamry',
      msg: ''
    }
  }),
  getters:{
    snackbar: state => state.snackbar,
  },
  mutations: {
    CHANGE_THEME: (state, isDarkTheme) => {
      state.isDarkTheme = isDarkTheme;
    },
    SET_SNACKBAR: (state, payload) => {
      state.snackbar = payload;
    },
    CLOSE_SNACKBAR: (state) => {
      state.snackbar.status = false;
      state.snackbar.msg = '';
    },
    CHANGE_LANG (state, locale) {
      if (state.locales.includes(locale)) {
        state.locale = locale;
      }
    }
  },
  actions:{
    setTheme({commit}, isDarkTheme){
      commit('CHANGE_THEME', isDarkTheme);
      this.$cookies.set('isDarkTheme', isDarkTheme, {
        path: '/',
        maxAge: 60 * 60 * 24 * 360
      });
    },
    setLang({commit}, isLang){
      commit('CHANGE_LANG', isLang);
      this.$cookies.set('isLang', isLang, {
        path: '/',
        maxAge: 60 * 60 * 24 * 360
      });
    },
    snackbar({commit}, {msg, timeout = 3000, type = 'primary'}){
      commit('SET_SNACKBAR', {msg, status: true, timeout, type});
    }
  }
};
