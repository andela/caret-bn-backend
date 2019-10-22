import models from '../database/models';

const findSpecificRequest = async req => {
  const { id: userManager } = req.user.payload;
  const { id } = req.params;

  const foundRequest = await models.requests.findOne({
    where: { id },
    attributes: ['id'],
    include: [
      {
        model: models.users,
        attributes: ['id', 'username', 'email'],
        where: { lineManager: userManager }
      }]
  });
  return foundRequest;
};

export default findSpecificRequest;
