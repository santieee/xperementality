export default function ({ store, redirect, app }) {
  if (store.getters['auth/isAuth']) {
    return redirect('/');
  }
} 