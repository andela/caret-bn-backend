const strings = {
  auth: {
    social: {
      SUCCESSFULLY_AUTHENTICATED: 'Successfully Authenticated Account',
      UNSUCCESSFULLY_AUTHENTICATED: 'Unable To Authenticate Account',
    },
    token: {
      UNABLE_TO_PROCESS: 'Invalid token please sign again',
      SIGN_IN_FIRST: 'Please sign into the application first'
    },
  },
  user: {
    requests: {
      SUCCESSFULLY_RETRIEVED_REQUESTS: 'Your Requests',
      NO_REQUESTS: 'No requests registered',
    }
  },
  validation: {
    requests: {
      locations: {
        DOES_NOT_EXIST: 'Location Does not exist on the system.',
        TRAVEL_TO_ORIGIN: 'You cannot travel to original location.',
        TRAVEL_TO_SAME_LOCATION: 'You cannot travel to the same location.',
      },
      types: {
        DOES_NOT_EXIST: 'Requests of this type do not exist on the system.'
      },
      bookings: {
        MULTIPLE_BOOKINGS: 'You cannot use the same booking in multiple destinations.'
      }

    }
  }
};

export default strings;
