import getFingerPrint from '@/common/finger-print';

export const state = () => ({
  profile: {
    refreshToken: '',
    token: '',
    id: '',
    username: '',
  }
});

export const getters = {
  isAuth: state => !!state.profile.token,
  token: state => state.profile.token,
  profile: state => state.profile
};

export const mutations = {
  INIT: (state, payload) => {
    state.profile = payload.profile;
  },
  SET_PROFILE: (state, payload) => {
    state.profile = payload;
  },
  UNSET_PROFILE: (state) => {
    state.profile = {
      refreshToken: '',
      token: '',
      id: '',
      username: '',
    };
  },
  SET_TOKENS: (state, payload) => {
    const { token, refreshToken } = payload;
    state.profile.token = token;
    state.profile.refreshToken = refreshToken;
  }
};

export const actions = {
  async signIn({ commit }, payload) {
    try{
      const fingerPrint = await getFingerPrint();
      const response = await this.$axios.post('/auth/login', {...payload, fingerPrint});
      if(response.data && !response.data.token) return;
      $nuxt.$router.push('/');
      commit('SET_PROFILE', response.data);
    }catch(e){
      console.log('err', e);
    }
  },
  async signUp({ commit }, payload) {
    try{
      const fingerPrint = await getFingerPrint();
      const response = await this.$axios.post('/auth/register', {...payload, fingerPrint});
      if(response.data && !response.data.token) return;
      $nuxt.$router.push('/');
      commit('SET_PROFILE', response.data);
    }catch(e){
      console.log('err', e);
    }
  },
  async logout({commit, state}){
    const token = state.profile.token; 
    await this.$axios.post('/auth/logout', {token});
    commit('UNSET_PROFILE');
    $nuxt.$router.push('/');
  },
  async getProfile({ getters }){
    const response = await this.$axios.get(`/user/profile/${getters.profile.username}`);
    return response.data;
  }
};