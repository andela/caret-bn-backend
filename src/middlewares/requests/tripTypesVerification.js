import requestServices from '../../services/requestServices/index';

const verify = async id => {

  const query = id => (
    {
      where: {
        id
      }
    }
  );

  const count = await requestServices.types.countAll(query(id));
  if (count === 0) {
    return false;
  }
  return true;
};


module.exports = {
  verify
};
