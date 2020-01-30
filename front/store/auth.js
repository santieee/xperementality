import getFingerPrint from '@/common/finger-print';
import decodeJwt from '@/common/decode-jwt';

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
  },
  UNSET_TOKENS: (state) => {
    state.profile.token = '';
    state.profile.refreshToken = '';
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
  async refreshToken({commit, state}){
    try{
      if(!state.profile.refreshToken) return;
      const fingerPrint = await getFingerPrint();
      const payload = {...state.profile, fingerPrint};
      commit('UNSET_TOKENS');
      const response = await this.$axios.post('/token/refresh', payload);
      commit('SET_TOKENS', response.data);
    }catch{
      commit('UNSET_PROFILE');
      $nuxt.$router.push('/auth');
    }
  },
  async isTokenExpired({state, dispatch}){
    if(!state.profile.token || !state.profile.refreshToken) return false;
    const tokenInfo = decodeJwt(state.profile.token);
    const refreshTokenInfo = decodeJwt(state.profile.refreshToken);
    const timeExpire = tokenInfo.exp;  
    const timeExpireRefresh = refreshTokenInfo.expire;
    const now = Math.ceil(new Date().getTime() / 1000);
    const leeway = 3600; 
    const leewayRefresh = 86400;
    const refreshTokenExpired = (timeExpireRefresh - now) < 0;
    if(refreshTokenExpired) return dispatch('logout');
    const isTimeForUpdateByRefresh = (timeExpireRefresh - now - leewayRefresh) < 0;
    const isTimeForUpdate = (timeExpire - now - leeway) < 0;
    if(isTimeForUpdate || isTimeForUpdateByRefresh) return true;
    else return false;
  },
  async getProfile({ getters }){
    const response = await this.$axios.get(`/user/profile/${getters.profile.username}`);
    return response.data;
  }
};