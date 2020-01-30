export default function ({ $axios, app, store }) {
  $axios.onRequest(async (config) => {
    if(await store.dispatch('auth/isTokenExpired')){
      await store.dispatch('auth/refreshToken');
    }
    if (store.state.auth.profile.token) {
      config.headers.common['Authorization'] = `Bearer ${store.state.auth.profile.token}`;
    }
      return config;
  });
  
  $axios.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    if (error.response && error.response.status === 401) {
      await store.dispatch('auth/refreshToken');
    }
    return Promise.reject(error);
  });
}
