export default function ({ $axios, app, store }) {
  $axios.onRequest(config => {
    if (store.state.auth.profile.token) {
      config.headers.common['Authorization'] = `Bearer ${store.state.auth.profile.token}`;
    }
  });
}
