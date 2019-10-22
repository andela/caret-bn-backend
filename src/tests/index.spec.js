import authTests from './socialAuthTests.spec'
import defaultTests from './defaultTests.spec'
import signupTests from './signupTest.spec'
import profileTests from './profile.spec'
import loginTest from './loginTest.spec';
import requestTest from './requestTests.spec'
import accommodationTest from './accommodationTest.spec';
import editDeleteAccommodationsTests from './editDeleteAccommodationsTests.spec';

describe('Default Tests', defaultTests);
describe('Social Authentication Tests', authTests);
describe('Signup Tests', signupTests);
describe('Login Tests', loginTest);
describe('Request Test', requestTest);
describe('Accommodation Tests', accommodationTest);
describe('Setting Profile Test',profileTests);
describe('Social Authentication Tests', loginTest);
describe('Edit-Delete Accommodations Tests', editDeleteAccommodationsTests);
