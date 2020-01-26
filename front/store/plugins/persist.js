import createPersistedState from 'vuex-persistedstate';

export default ({store, app}) => {
  createPersistedState({
    getState: key => app.$cookies.get(key),
    setState: (key, value) => app.$cookies.set(key, value)
  })(store);
};

