export default (clientId, clientSecret, callbackUrl) => ({
  clientID: clientId,
  clientSecret,
  callbackURL: callbackUrl,
  passReqToCallback: true
});
