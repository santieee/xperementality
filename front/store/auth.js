import getFingerPrint from '@/common/finger-print';
import decodeJwt from '@/common/decode-jwt';

export const state = () => ({
  profile: {
    refreshToken: '',
    token: '',
    id: '',
    username: '',
    photoName: '',
  },
  sessions: []
});

export const getters = {
  isAuth: state => !!state.profile.token,
  token: state => state.profile.token,
  profile: state => state.profile,
  sessions: state => state.sessions.map( session => ({
    ...session, 
    fingerPrint: JSON.parse(session.fingerPrint),
    current: session.token == state.profile.token
  })).reverse()
};

export const mutations = {
  INIT: (state) => {
    state.profile = {...state.profile};
  },
  SET_RESET: (state, flag) => {
    state.profile.reset = flag;
  },
  SET_PROFILE: (state, payload) => {
    state.profile = {
      ...payload,
      token: state.profile.token,
      refreshToken: state.profile.refreshToken
    };
  },
  UNSET_PROFILE: (state) => {
    state.profile = {
      refreshToken: '',
      token: '',
      id: '',
      username: '',
      photoPath: '',
      sessions: []
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
  },
  SET_SESSIONS: (state, sessions) => {
    state.sessions = sessions;
  },
  SET_PHOTOPATH: (state, photoPath) => {
    state.profile.photoPath = photoPath; 
  },
};

export const actions = {
  async signIn({ commit }, payload) {
  const fingerPrint = await getFingerPrint();
  const response = await this.$axios.post('/auth/login', {...payload, fingerPrint}, {withCredentials: true});
  if(response.data && response.data.status == '401') return this.dispatch('ui/snackbar', {msg: `Wrong credentials`, type: 'error'});;
  $nuxt.$router.push('/profile');
  const { token, refreshToken } = response.data;
  commit('SET_TOKENS', { token, refreshToken });
  commit('SET_PROFILE', response.data);
  this.dispatch('ui/snackbar', {msg: `Hi ${payload.username}`});
  },
  async signUp({ commit }, payload) {
    const fingerPrint = await getFingerPrint();
    const response = await this.$axios.post('/auth/register', {...payload, fingerPrint}, {withCredentials: true});
    if(response.data && !response.data.token) return;
    $nuxt.$router.push('/');
    const { token, refreshToken } = response.data;
    commit('SET_TOKENS', { token, refreshToken });
    commit('SET_PROFILE', response.data);
    this.dispatch('ui/snackbar', {msg: `Hi ${payload.username}`});
  },
  async logout({commit, state}){
    const token = state.profile.token; 
    await this.$axios.post('/auth/logout', {token}, {withCredentials: true});
    commit('UNSET_PROFILE');
    $nuxt.$router.push('/');
    this.dispatch('ui/snackbar', {msg: 'Goodbye!'});
  },
  async refreshToken({commit, state}){
    try{
      if(!state.profile.refreshToken) return;
      const fingerPrint = await getFingerPrint();
      const payload = {...state.profile, fingerPrint};
      commit('UNSET_TOKENS');
      const response = await this.$axios.post('/token/refresh', payload);
      if(!response.data.token) return $nuxt.$router.push('/');
      commit('SET_TOKENS', response.data);
    }catch(e){
      commit('UNSET_PROFILE');
    }
  },
  async isTokenExpired({state, dispatch}){
    if(!state.profile.token || !state.profile.refreshToken) return false;
    const now = Math.ceil(new Date().getTime() / 1000);

    const tokenInfo = decodeJwt(state.profile.token);
    const timeExpire = tokenInfo.exp;  
    const leeway = 3600; 
    const isTimeForUpdate = (timeExpire - now - leeway) < 0;

    const refreshTokenInfo = decodeJwt(state.profile.refreshToken);
    const timeExpireRefresh = refreshTokenInfo.exp;
    const leewayRefresh = 86400;
    const refreshTokenExpired = (timeExpireRefresh - now) < 0;
    if(refreshTokenExpired){
      await dispatch('logout');
      return false;
    }
    const isTimeForUpdateByRefresh = (timeExpireRefresh - now - leewayRefresh) < 0;
    
    if(isTimeForUpdate || isTimeForUpdateByRefresh) return true;
    else return false;
  },
  async getProfile({ getters, commit }){
    const response = await this.$axios.get(`/user/profile/${getters.profile.username}`);
    let {profile, sessions} = response.data;
    commit('SET_PROFILE', profile);
    commit('SET_SESSIONS', sessions);
    return response.data;
  },
  async saveAvatar({ commit }, photo){
    const response = await this.$axios({
      method: 'post',
      url: '/user/avatar',
      data: photo,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    commit('SET_PHOTOPATH', response.data);
  },
  async closeSession(ctx, token){
    const response = await this.$axios.delete(`/token`, {data: {token}});
    return response.data;
  },
  async initProfile({commit}, tokens){
    if(!tokens) return commit('SET_RESET', true);
    const { token, refreshToken } = tokens;
    const { username, id } = decodeJwt(token);
    commit('SET_TOKENS', {token, refreshToken,});
    commit('SET_PROFILE', {username, id});  
  }
};