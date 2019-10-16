const strings = {
  users: {
    success: {
      SIGNUP_SUCCESS: 'User Created Successfully, please check your email for verification',
      SUCCESS_VERIFIED: 'You have been verified',
      SEND_EMAIL: 'please check your email to see the link for reseting password',
      PASSWORD_CHANGED: 'password changed successfully',
      SUCCESSFUL_LOGIN: 'User logged in successfully!'
    },
    error: {
      BAD_SIGNUP_REQUEST: 'Input Error please check error!',
      ANAUTHORIZED: 'you are not authorized to access this endpoint',
      EXPERED: 'Token expired request a new one',
      USER_ALREADY_EXISTS: 'User with this email already exists',
      USE_NOT_REGISTERED: 'user not registered',
      USERNAME_ALREADY_EXISTS: 'User with this username already exists',
      PASSWORD_NOT_MATCH: 'Password and Confirm Password do not match',
      SOMETHING_WRONG: 'Internal server error',
      PASSWORD_ALREADY_EXISTS: 'you can not change password with old password',
      USER_NOT_FOUND: 'can not find that user',
      BAD_LOGIN_REQUEST: 'Bad Request, Unable to login user',
      LOGIN_FAILURE: 'Incorrect email or password!',
      VERIFY_FIRST: 'Please verify your email first!',
    },
  },

};

export default strings;
