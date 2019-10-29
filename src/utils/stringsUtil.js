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
      ANAUTHORIZED: 'you are not authorized to access this page',
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
      SUPPLIER_NOT_ALLOWED: 'Access denied! Suppliers can not access this part of the system!',
      NO_PENDED_REQUEST: 'Access denied! you have no pending request',
      NO_ACCESS: 'Access denied! Only system administrators and pre-screened suppliers can access this part of the system!',
      TRAVEL_ADMINS_ONLY: 'Access denied! Only travel administrators can access this part of the system!',
    },
  },
  request: {
    success: {
      SUCCESS_UPDATE_REQUEST: 'Request Updated',
      SUCCESS_ADD_COMMENT: 'Comment Added',
    },
    error: {
      INTERNAL_ERROR: 'Internal server error',
      NO_REQUEST_REQUEST: 'This Id request does not exist',
      EDIT_YOUR_REQUEST: 'Access denied! you are not the owner of this request',
      NO_REQUEST: 'Access denied! You have no request to edit',
      NO_ACCESS: 'Access denied! Only system administrators and pre-screened suppliers can access this part of the system!',
      SUPPLIER_NOT_ALLOWED: 'Access denied! Suppliers can not access this part of the system!',
      NOT_ALLOWED: 'Access denied! a supplier can not access this part of the system!',
      TRAVEL_ADMINS_ONLY: 'Access denied! Only travel administrators can access this part of the system!',
      NOT_YOUR_REQUEST: 'You are not the owner of the request or the line manager of the user who placed it!',
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
      NO_ACCOMMODATION: 'No accommodation facilities were found',
      RETRIEVED: 'Accommodation facilities are retrieved successfully!',
      FOUND: 'all available accommodation',
      BOOKED_FOUND: 'Your bookings',
      SUCCESSFUL_BOOKED: 'Booking done successfully',
      SINGLE_ACCOMMODATION: 'Accommodation retrieved successfully!',
      SINGLE_NOT_FOUND: 'Accommodation not found or fully booked!',
      NOT_FOUND: 'Accommodation not found',
      ACTIVATED: 'Accommodation successfully activated!',
      DEACTIVATED: 'Accommodation successfully deactivated!',
      DEACTIVATED_ACCOMMODATIONS: 'All Deactivated accommodations are retrieved successfully!',
    },
    error: {
      EXISTING: 'This accommodation already exists!',
      NOT_AVAILABLE: 'There is no space available in accommodation',
      ALREADY_BOOKED: 'you have already booked this accommodation',
      DATE_ERROR: 'checkout date must not be less than checkin date',
      INVALID_DATE: 'CheckOut and CheckIn must not be outdate dates',
      EXCEED_NUMBER: 'roomsNumber exceed number of available rooms',
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
  notifications: {
    NOTIF_FOUND: 'Your Notifications',
    NOTIF_NOT_FOUND: 'No Notifications Found',
  },
  requests: {
    APPROVED: 'Request approved successfully!',
    REJECTED: 'Request rejected!',
    NOT_FOUND: 'No request was found',
    MANAGERS_ONLY: 'Unable to proceed! This is reserved for managers only',
    RESQUEST_ALREADY_APPROVED: 'This request has already been approved!',
    RESQUEST_ALREADY_REJECTED: 'This request has already been rejected!',
    SUCCESSFULLY_RETRIEVED_REQUESTS: 'Your Requests are retrieveed successfully!',
  },
  id: {
    error: {
      ID_INVALID: 'Invalid id, id should be an integer',
    },
  },
  comments: {
    success: {
      COMMENT_UPDATED: 'Comment Successfully Updated!',
      COMMENT_DELETED: 'Comment Successfully Deleted!'
    },
    error: {
      COMMENT_NOT_FOUND: 'Ooops! This comment does not exist!',
      NOT_OWNER: 'Oops! You are not the owner of this comment!',
    },
  },
};

export default strings;
