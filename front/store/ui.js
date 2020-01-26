export default {
  state: () => ({
    isDarkTheme: true
  }),
  mutations: {
    INIT: (state, payload) => {
      state.isDarkTheme = payload.isDarkTheme;
    },
    CHANGE_THEME: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    }
  }
};
