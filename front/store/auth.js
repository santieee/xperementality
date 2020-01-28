import getFingerPrint from '@/common/finger-print';

export const state = () => ({
  profile: {
    token: '',
    id: '',
    username: '2',
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
      token: '',
      id: '',
      username: '',
    };
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
      const response = await this.$axios.post('/auth/register', payload);
      if(response.data && !response.data.token) return;
      $nuxt.$router.push('/');
      commit('SET_PROFILE', response.data);
    }catch(e){
      console.log('err', e);
    }
  },
  async logout({commit}){
    commit('UNSET_PROFILE');
    $nuxt.$router.push('/');
  },
  async getProfile({ getters }){
    console.log(getters.profile.username);
    const response = await this.$axios.get(`/user/profile/${getters.profile.username}`);
    return response.data;
  }
};