const deleteRequestKeys = request => {
  delete request.dataValues.typeId;
  delete request.dataValues.userId;
  delete request.dataValues.locationId;
  delete request.dataValues.statusId;

  return request;
};

module.exports = {
  deleteRequestKeys
};
