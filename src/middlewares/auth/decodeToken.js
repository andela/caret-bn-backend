import jwt from 'jsonwebtoken';

export default token => {
  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    return verifiedUser;
  } catch (error) {
    return error;
  }
};
