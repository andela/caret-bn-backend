import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import strings from '../utils/stringsUtil';
import mockData from './mockData/mockData';


chai.should();
chai.use(chaiHttp);

describe('User Login Test', () => {
  it('it should should return 200 and log in a user successfully ', done => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.verifiedUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql(`${strings.users.success.SUCCESSFUL_LOGIN}`);
        done();
      });
  });
  it('it should should return 400 and tell the user that email or password is incorrect ', done => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.invalidData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should should return 400 and tell the user to verify first ', done => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.unVerifiedUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should should return 400 and give the user a descriptive error message ', done => {
    chai.request(app)
      .post('/api/v1/users/login')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should should return 400 and give the user a descriptive error message ', done => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.missingFields)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
