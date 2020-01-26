export const actions = {
  nuxtServerInit({ commit }, { app }) {
    const vuex = app.$cookies.get('vuex');
    if(!vuex) return;
    commit('auth/INIT', vuex.auth);
    commit('ui/INIT', vuex.ui);
  }
};