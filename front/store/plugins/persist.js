import createPersistedState from 'vuex-persistedstate';

export default ({store, app}) => {
  createPersistedState()(store);
};

