const strings = {
  users: {
    success: {
      SIGNUP_SUCCESS: 'User Created Successfully, please check your email for verification',
      ALL: 'users found',
      FOUND: 'roles found',
      SUCCESS_VERIFIED: 'You have been verified',
      SEND_EMAIL: 'please check your email to see the link for reseting password',
      PASSWORD_CHANGED: 'password changed successfully',
      SUCCESS_UPDATE: 'User Updated',
      SUCCESSFUL_LOGIN: 'User logged in successfully!',
      SUCCESSFUL_ASSIGN: 'you assign the role to user',
      ROLE_ADDED: 'role added successfully'
    },
    error: {
      BAD_SIGNUP_REQUEST: 'Input Error please check error!',
      ANAUTHORIZED: 'you are not authorized to access this endpoint',
      EXPERED: 'Token expired request a new one',
      ROLE_NOTFOUND: 'role not found',
      ROLE_ALREADY_IN: 'role already exist',
      ROLE_ALREADY_EXISTS: 'user already has this role',
      USER_ALREADY_EXISTS: 'User with this email already exists',
      USE_NOT_REGISTERED: 'user not registered',
      USERNAME_ALREADY_EXISTS: 'User with this username already exists',
      PASSWORD_NOT_MATCH: 'Password and Confirm Password do not match',
      SOMETHING_WRONG: 'Internal server error',
      PASSWORD_ALREADY_EXISTS: 'you can not change password with old password',
      USER_NOT_FOUND: 'can not find that user',
      BAD_LOGIN_REQUEST: 'Bad Request, Unable to login user',
      LOGIN_FAILURE: 'Incorrect email or password!',
      VERIFY_FIRST: 'Please verify your email first!',
      SIGN_IN_FIRST: 'sign in first',
      INVALID_TOKEN: 'Invalid token',
      TRUE_TOKEN_NEEDED: 'Provide true token',
      ACCESS_TOKEN_NEEDED: 'Access token is needed',
      INVALID_INPUT: 'Please provide valid inputs!',
      USER_SAME_EMAIL: 'this email is not for this token',
      NO_ACCESS: 'Access denied! Only system administrators and pre-screened suppliers can access this part of the system!',
    },
  },
  token: {
    INVALID_TOKEN: 'Invalid token!',
    SIGN_IN_FIRST: 'Please login first!'
  },
  accommodation: {
    success: {
      CREATED: 'New accommodation facility added successfully!',
      NO_INFO_YET: 'You have not added any accommodation facilities yet!',
      NO_ACCOMMODATION: 'No accommodatin facilities were found',
      RETRIEVED: 'Accommodation facilities are retrieved successfully!',
    },
    error: {
      EXISTING: 'This accommodation already exists!',
    }
  },
  images: {
    NO_IMAGE: 'No image file(s) selected!',
    BAD_FORMAT: 'The selected file is not an image!'
  },
  accommodations: {
    success: {
      ACCOMMODATION_UPDATED: 'Accommodation Successfully Updated!',
      ACCOMMODATION_DELETED: 'Accommodation Successfully Deleted!'
    },
    error: {
      ACCOMMODATION_NOT_FOUND: 'Ooops! This accommodation id does not exist!',
      ACCOMMODATION_BAD_REQUEST: 'Bad Request, The accommodation information is invalid',
      NOT_OWNER: 'Oops! You are not the owner of this accommodation!',
      EMPTY_FORM: 'Oops! You have submitted an empty form! Make sure to add information to the form-data!',
    },
  },
  id: {
    error: {
      ID_INVALID: 'Invalid id, id should be an integer',
    },
  },

};

export default strings;
