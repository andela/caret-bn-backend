import models from '../database/models';

const findUser = async dataObj => {
  const user = await models.users.findOne({
    where: dataObj
  });
  if (!user) { return new Error(); }
  return user;
};

export default findUser;
