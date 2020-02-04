export const actions = {
  nuxtServerInit({ commit, dispatch }, { app }) {
    const tokens = app.$cookies.get('_h');
    dispatch('auth/initProfile', tokens);    

    let isDarkTheme = app.$cookies.get('isDarkTheme');
    if(isDarkTheme === undefined) isDarkTheme = true;
    dispatch('ui/setTheme', isDarkTheme);
  },
  nuxtClientInit({commit, state}){
    commit('auth/INIT');
    if(state.auth.profile.reset) commit('auth/UNSET_PROFILE');
  }
};