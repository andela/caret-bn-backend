import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import strings from '../utils/stringsUtil';
import app from '../index';
import testdata from './mockData/signupMockdata';
import generateToken from '../utils/generateToken';
import EmailToken from '../utils/EmailToken';

const token = generateToken(testdata.verifyUser);
const validTroken = EmailToken.ResetToken(testdata.validuser);
const invalidToken = EmailToken.ResetToken(testdata.invaliduser);

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


  it('it Should send Email for resetting password', done => {
    chai.request(app)
      .post('/api/v1/users/forgotpassword')
      .send(testdata.passwordData)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('please check your email to see the link for reseting password');
        done();
      });
  });
  it('it Should not send Email for resetting password with Missing Email', done => {
    chai.request(app)
      .post('/api/v1/users/forgotpassword')
      .send(testdata.MissingEmailData)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('it Should not send Email for resetting password with Invalid Email', done => {
    chai.request(app)
      .post('/api/v1/users/forgotpassword')
      .send(testdata.InvalidEmailData)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('it Should  not send Email for resetting password ', done => {
    chai.request(app)
      .post('/api/v1/users/forgotpassword')
      .send(testdata.passwordData3)
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        res.body.should.have.property('message').eql('can not find that user');
        done();
      });
  });

  it('user Should reset password', done => {
    chai.request(app)
      .patch(`/api/v1/users/resetpassword/${validTroken}`)
      .send(testdata.passwordData2)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('password changed successfully');
        done();
      });
  });

  it('user Should not reset password with exist password', done => {
    chai.request(app)
      .patch(`/api/v1/users/resetpassword/${validTroken}`)
      .send(testdata.passwordData2)
      .end((err, res) => {
        res.should.have.property('status').eql(409);
        res.body.should.have.property('message').eql('you can not change password with old password');
        done();
      });
  });

  it('user Should not reset password with exist Missing password', done => {
    chai.request(app)
      .patch(`/api/v1/users/resetpassword/${validTroken}`)
      .send(testdata.Missingpassword)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('user Should not reset password with exist Invalid password ', done => {
    chai.request(app)
      .patch(`/api/v1/users/resetpassword/${validTroken}`)
      .send(testdata.Invalidpassword)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('user Should not reset password with wrong email', done => {
    chai.request(app)
      .patch(`/api/v1/users/resetpassword/${validTroken}`)
      .send(testdata.wrongEmail)
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        res.body.should.have.property('message').eql('you are not authorized to access this endpoint');
        done();
      });
  });
  it('user Should not reset password with wrong Token', done => {
    chai.request(app)
      .patch(`/api/v1/users/resetpassword/${invalidToken}`)
      .send(testdata.passwordData2)
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        res.body.should.have.property('message').eql('you are not authorized to access this endpoint');
        done();
      });
  });
});
