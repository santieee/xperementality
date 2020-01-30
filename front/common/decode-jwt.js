export default token => {
  const [header, body] = token.split('.');
  return JSON.parse(atob(body));
};