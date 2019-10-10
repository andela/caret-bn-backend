
const GoogleStrategyQuery = profile => {
  const query = {
    defaults: {
      googleId: profile.id,
      isValid: true,
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
      facebookId: profile.id, isValid: true, username: profile.displayName
    },
    where: { facebookId: profile.id },
  };
  return query;
};


module.exports = {
  GoogleStrategyQuery, FacebookStrategyQuery
};
