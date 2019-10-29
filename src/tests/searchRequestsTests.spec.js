import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import app from '../index';
import mockData from './mockData/mockData';

chai.should();
chai.use(chaiHttp);

let userToken;
let supplierToken;
let managerToken;
let anotherManagerToken;

describe('Search Requests Tests', () => {
  before(done => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.registeredUser)
      .end((err, res) => {
        userToken = res.body.data.token;
      });
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.supplier)
      .end((err, res) => {
        supplierToken = res.body.data.token;
      });
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.manager)
      .end((err, res) => {
        managerToken = res.body.data.token;
      });
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.anotherManager)
      .end((err, res) => {
        anotherManagerToken = res.body.data.token;
        done();
      });
  });

  // User Suite
  it('Should return a user own requests', done => {
    chai.request(app)
      .get('/api/v1/requests/search')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should return 404 status, No requests found, Not match reasons', done => {
    chai.request(app)
      .get('/api/v1/requests/search?reasons=Aglagla')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        done();
      });
  });

  it('Should return 403 status, Supplier not allowed', done => {
    chai.request(app)
      .get('/api/v1/requests/search')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        done();
      });
  });

  // Manager Suite
  it('Should return requests of users assigned to the manager by sending 200 status code', done => {
    chai.request(app)
      .get('/api/v1/requests/manager/search')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should not return requests of users not assigned to the manager by sending 403 status code', done => {
    chai.request(app)
      .get('/api/v1/requests/manager/search?userId=3')
      .set('Authorization', `Bearer ${anotherManagerToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        done();
      });
  });

  it('Should not give access to non-Managers by returning 403', done => {
    chai.request(app)
      .get('/api/v1/requests/manager/search?userId=3')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        done();
      });
  });

  it('Should return requests that match duration, 200 status code', done => {
    chai.request(app)
      .get('/api/v1/requests/manager/search?duration=31')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should not return requests 404, duration not match', done => {
    chai.request(app)
      .get('/api/v1/requests/manager/search?duration=25')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        done();
      });
  });
});
