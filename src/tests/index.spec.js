import authTests from './socialAuthTests.spec'
import defaultTests from './defaultTests.spec'
import signupTests from './signupTest.spec'
import profileTests from './profile.spec'
import loginTest from './loginTest.spec';
import accommodationTest from './accommodationTest.spec';
import editRequest from './editRequest.spec';
import editDeleteAccommodationsTests from './editDeleteAccommodationsTests.spec';
import adminTest from './adminTest.spec';
import searchRequestsTests from './searchRequestsTests.spec';

describe('Default Tests', defaultTests);
describe('Edit Request Tests',editRequest);
describe('Social Authentication Tests', authTests);
describe('Signup Tests', signupTests);
describe('Login Tests', loginTest);
// describe('Edit Request Tests',editRequest);
describe('Accommodation Tests', accommodationTest);
describe('Setting Profile Test', profileTests);
describe('Social Authentication Tests', loginTest);
describe('Edit-Delete Accommodations Tests', editDeleteAccommodationsTests);
describe('Social Authentication Tests', loginTest);
describe('Admin routes test', adminTest);
describe('Search Requests Tests', searchRequestsTests);
