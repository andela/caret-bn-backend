const deleteUserKeys = user => {
  delete user.dataValues.password;
  delete user.dataValues.isVerified;
  delete user.dataValues.facebookId;
  delete user.dataValues.googleId;

  return user;
};

module.exports = {
  deleteUserKeys
};
