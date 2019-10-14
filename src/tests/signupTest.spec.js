import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import strings from '../utils/stringsUtil';
import app from '../index';
<<<<<<< HEAD
import testdata from './mockdata';
import generateToken from '../utils/generateToken';


const token = generateToken(testdata.verifyUser);
=======
import testdata from './mockData/signupMockdata';
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240

chai.should();
chai.use(chaiHttp);

describe('Signup Test Suite', () => {
  it('Should signup a user successfully by return 201 status code', done => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send(testdata.validSignup)
      .end((err, res) => {
        res.should.have.property('status').eql(201);
        done();
      });
  });

  it('Should not signup a user with an incomplete body', done => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send(testdata.missingEmail)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('Should not signup a user if the email already exists', done => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send(testdata.emailExisting)
      .end((err, res) => {
        res.should.have.property('status').eql(409);
        done();
      });
  });

  it('Should not signup a user if the username already exists', done => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send(testdata.usernameExisting)
      .end((err, res) => {
        res.should.have.property('status').eql(409);
        done();
      });
  });

  it('Should not signup a user if password != confirmPassword', done => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send(testdata.passwordNotMatch)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });
  it('it should verify a user', done => {
    chai.request(app)
      .get(`/api/v1/users/verify/${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql(`${strings.users.success.SUCCESS_VERIFIED}`);
        done();
      });
  });
});
