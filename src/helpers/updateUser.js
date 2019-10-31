import models from '../database/models';

const updateUser = async (dataObj, id) => {
  const user = await models.users.update(
    dataObj,
    {
      where: { id },
      returning: true,
    }
  );
  return user;
};

export default updateUser;
