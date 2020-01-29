import getFingerPrint from '@/common/finger-print';

export default function ({ $axios, app, store }) {
  $axios.onRequest(config => {
    if (store.state.auth.profile.token) {
      config.headers.common['Authorization'] = `Bearer ${store.state.auth.profile.token}`;
    }
  });
  $axios.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    if (error.response.status === 401) {
      const fingerPrint = await getFingerPrint();
      const response = await $axios.post('/token/refresh', {...store.state.auth.profile, fingerPrint});
      store.commit('auth/SET_TOKENS', response.data);
    }
    return Promise.reject(error);
  });
}
