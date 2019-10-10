const testdata = {
  validSignup: {
    username: 'caretdevs',
    email: 'teamcaret@gmail.com',
    password: 'Pa$5W0rd',
    confirmPassword: 'Pa$5W0rd',
  },


  missingEmail: {
    username: 'caretdevs1',
    password: 'Pa$5W0rd',
    confirmPassword: 'Pa$5W0rd',
  },

  emailExisting: {
    username: 'caretdevs2',
    email: 'teamcaret@gmail.com',
    password: 'Pa$5W0rd',
    confirmPassword: 'Pa$5W0rd',
  },

  usernameExisting: {
    username: 'caretdevs',
    email: 'teamcaret3@gmail.com',
    password: 'Pa$5W0rd',
    confirmPassword: 'Pa$5W0rd',
  },

  passwordNotMatch: {
    username: 'caretdevs4',
    email: 'teamcaret4@gmail.com',
    password: 'Pa$5W0rd',
    confirmPassword: 'Pa$5W0rDD',
  },

};

export default testdata;
