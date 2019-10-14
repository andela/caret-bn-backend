import authTests from './socialAuthTests.spec'
import defaultTests from './defaultTests.spec'
<<<<<<< HEAD

describe('Social Authentication Tests', defaultTests);
describe('Social Authentication Tests', authTests);
=======
import signupTests from './signupTest.spec'
import loginTest from './loginTest.spec';

describe('Default Tests', defaultTests);
describe('Social Authentication Tests', authTests);
describe('Signup Tests', signupTests);
describe('Social Authentication Tests', loginTest);
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
