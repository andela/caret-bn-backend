
const GoogleStrategyQuery = profile => {
  const query = {
    defaults: {
      googleId: profile.id,
<<<<<<< HEAD
      isValid: true,
=======
      isVerified: true,
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
      email: profile.emails[0].value,
      username: profile.displayName
    },
    where: { googleId: profile.id }
  };
  return query;
};

const FacebookStrategyQuery = profile => {
  const query = {
    defaults: {
<<<<<<< HEAD
      facebookId: profile.id, isValid: true, username: profile.displayName
=======
      facebookId: profile.id, isVerified: true, username: profile.displayName
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
    },
    where: { facebookId: profile.id },
  };
  return query;
};


module.exports = {
  GoogleStrategyQuery, FacebookStrategyQuery
};
