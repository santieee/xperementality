export default token => {
  const [header, body] = token.split('.');
  if (process.server) return JSON.parse(Buffer.from(body, 'base64').toString('ascii'));
  return JSON.parse(atob(body));
};