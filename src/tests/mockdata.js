const testdata = {
  validSignup: {
    username: 'caretdevs',
    email: 'teamcaret@gmail.com',
    password: 'Pa$5W0rd',
    confirmPassword: 'Pa$5W0rd',
  },

  verifyUser: { id: 3, isVerified: false },
 
  
  
  validuser: {
    id: '3',
    username: 'caretdevs',
    email: 'teamcaret@gmail.com',
    password: 'Pa$5W0rd',
    confirmPassword: 'Pa$5W0rd',
  },

  invaliduser: {
    id: '11',
    username: 'caretdevs',
    email: 'team11@gmail.com',
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

  passwordData: {
    email: 'teamcaret@gmail.com',
  },
  MissingEmailData: {
    email: '',
  },
  InvalidEmailData: {
    email: 'teamcaret@gmail',
  },
  passwordData3: {
    email: 'teamcaret41@gmail.com',
  },
  passwordData2: {
    email: 'teamcaret@gmail.com',
    newpassword: 'Pa$6W0rd',
    confirmpassword: 'Pa$6W0rd',
  },
  Missingpassword: {
    email: 'teamcaret@gmail.com',
    newpassword: '',
    confirmpassword: 'Pa$6W0rd',
  },
  Invalidpassword: {
    email: 'teamcaret@gmail.com',
    newpassword: 'Pa$6W0re',
    confirmpassword: 'Pa$6W0rd',
  },
  invaliduser2: {
    email: 'teamcaret41@gmail.com',
    newpassword: 'Pa$5W0re',
    confirmpassword: 'Pa$6W0rd',
  },
  wrongEmail: {
    email: 'teamcaret41@gmail.com',
    newpassword: 'Pa$5W0re',
    confirmpassword: 'Pa$6W0rd',
  },

};

export default testdata;
