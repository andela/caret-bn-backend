<<<<<<< HEAD
export default (clientId, clientSecret, callbackUrl) => ({
  clientID: clientId,
  clientSecret,
  callbackURL: callbackUrl,
  passReqToCallback: true
});
=======
export default (clientId, clientSecret, callbackUrl) => {
  const res = {
    clientID: clientId,
    clientSecret,
    callbackURL: callbackUrl,
    passReqToCallback: true
  };

  return res;
};
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
