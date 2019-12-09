import { Op } from 'sequelize';

const GoogleStrategyQuery = ({ id, emails }) => {
  const query = {
    defaults: {
      googleId: id,
      isVerified: true,
      email: emails[0].value,
      username: emails[0].value
    },
    where: {
      [Op.or]: [
        {
          googleId: id,
        },
        {
          email: emails[0].value
        }]
    },
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
