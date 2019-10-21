import requestServices from '../../services/requestServices/index';

const verify = async (res, id) => {

  const query = id => (
    {
      where: {
        id
      }
    }
  );

  const count = await requestServices.types.countAll(query(id));
  if (count === 0) {
    return res.status(400).json({
      status: 400,
      message: 'Requests of this type do not exist on the system.'
    });
  }
};


module.exports = {
  verify
};
