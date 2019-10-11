export default (clientId, clientSecret, callbackUrl) => {
  const res = {
    clientID: clientId,
    clientSecret,
    callbackURL: callbackUrl,
    passReqToCallback: true
  };

  return res;
};
