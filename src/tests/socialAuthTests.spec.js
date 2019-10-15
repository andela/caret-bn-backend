import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;

const googleAccessToken = process.env.GOOGLE_ACCESS_TOKEN;
const facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;

describe('login using social sites', () => {
  it('Should authenticate with GooglePlus Successfully. New users return 201 status code', done => {
    chai.request(app)
      .post('/api/v1/auth/google/')
      .send({ access_token: googleAccessToken })
      .end((err, res) => {
        expect(res.status).to.be.eql(201, 'Incorrect Status Code Returned');
        expect(res.body.data).to.be.a('object', 'Incorrect Data Type Returned');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('username');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('createdAt');
        expect(res.body.data).to.have.property('updatedAt');
        done();
      });
  }).timeout(4000);

  it('Should authenticate with GooglePlus Successfully. Existing users return 200 status code.', done => {
    chai.request(app)
      .post('/api/v1/auth/google/')
      .send({ access_token: googleAccessToken })
      .end((err, res) => {
        expect(res.status).to.be.eql(200, 'Incorrect Status Code Returned');
        expect(res.body.data).to.be.a('object', 'Incorrect Data Type Returned');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('username');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('createdAt');
        expect(res.body.data).to.have.property('updatedAt');
        done();
      });
  }).timeout(4000);
  it('Should not authenticate with Google successfully, Bad Access Token', done => {
    chai.request(app)
      .post('/api/v1/auth/google/')
      .send({ access_token: 'mdmdmd92n' })
      .end((err, res) => {
        expect(res.status).to.be.eql(401, 'Incorrect Status Code Returned');
        expect(res.body.data).to.be.a('object', 'Incorrect Data Type Returned');
        expect(res.body).to.have.property('message', 'Invalid Credentials');
        done();
      });
  }).timeout(4000);


  it('Should authenticate with Facebook Successfully. New users return 200 status code', done => {
    chai.request(app)
      .post('/api/v1/auth/facebook/')
      .send({ access_token: facebookAccessToken })
      .end((err, res) => {
        expect(res.status).to.be.eql(201, 'Incorrect Status Code Returned');
        expect(res.body.data).to.be.a('object', 'Incorrect Data Type Returned');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('username');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('createdAt');
        expect(res.body.data).to.have.property('updatedAt');
        done();
      });
  }).timeout(4000);

  it('Should authenticate with Facebook Successfully. Existing users return 200 status code', done => {
    chai.request(app)
      .post('/api/v1/auth/facebook/')
      .send({ access_token: facebookAccessToken })
      .end((err, res) => {
        expect(res.status).to.be.eql(200, 'Incorrect Status Code Returned');
        expect(res.body.data).to.be.a('object', 'Incorrect Data Type Returned');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('username');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('createdAt');
        expect(res.body.data).to.have.property('updatedAt');
        done();
      });
  }).timeout(4000);

  it('Should not authenticate with Facebook successfully, Bad Access Token', done => {
    chai.request(app)
      .post('/api/v1/auth/facebook/')
      .send({ access_token: 'mdmdmd92n' })
      .end((err, res) => {
        expect(res.status).to.be.eql(400, 'Incorrect Status Code Returned');
        expect(res.body.data).to.be.a('object', 'Incorrect Data Type Returned');
        expect(res.body).to.have.property('message', 'Failed to fetch user profile');
        done();
      });
  }).timeout(4000);
});
