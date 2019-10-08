import { describe } from 'mocha';
import test from './test';
import loginTest from './loginTest';
import signUpTest from './signupTest.spec';

describe('Testing Barefoot Nomad...', () => {
  describe('Initial Tests', test);
  describe('User Tests', loginTest);
  describe('User Tests', signUpTest);
});
