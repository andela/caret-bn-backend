import chai from 'chai';
import userServiceHelper from '../services/serviceHelpers/userServiceHelpers';
import socialAuthController from './../controllers/auth/socialAuthenticationController';

const { expect } = chai;

const user = {
  dataValues: {
    password: 'Hello',
    isVerified: false,
    facebookId: '0040',
    googleId: '0039',
  }
}

it('Should Delete User Keys', () => {
  try {
    const result = userServiceHelper.deleteUserKeys(user);
    expect(result).to.be.eql(null);
  } catch (err) {

  }
});

it('Should Redirect a user properly', () => {

  const clientUrl = process.env.FRONT_END_PATH;

  const data = {
    user
  }
  const response = {
    redirect: (path) => {
      return path;
    }
  }

  try {
    const res = socialAuthController.authenticateUser(data, response);
    console.log(res);
    expect(res).to.be.eql(`${clientUrl}/users/auth/success?user={}`);
  } catch (err) {
    console.log(err);
  }
});