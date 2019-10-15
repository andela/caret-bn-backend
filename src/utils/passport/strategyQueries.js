const GoogleStrategyQuery = ({ id, emails, displayName }) => {
  const query = {
    defaults: {
      googleId: id,
      isVerified: true,
      email: emails[0].value,
      username: displayName
    },
    where: { googleId: id }
  };
  return query;
};

const FacebookStrategyQuery = ({ id, displayName }) => {
  const query = {
    defaults: {
      facebookId: id,
      isVerified: true,
      username: displayName
    },
    where: { facebookId: id },
  };
  return query;
};

module.exports = {
  GoogleStrategyQuery, FacebookStrategyQuery
};
