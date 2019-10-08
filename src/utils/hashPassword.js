import bcrypt from 'bcrypt';

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

export default hashPassword;
