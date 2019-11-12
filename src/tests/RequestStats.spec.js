import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import app from '../index';
import mockData from './mockData/mockData';

chai.should();
chai.use(chaiHttp);

let userToken;
let supplierToken;
let requesterToken; 

describe('stats Requests Tests', () => {
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
      .send(mockData.requester)
      .end((err, res) => {
        requesterToken = res.body.data.token;
        done();
      });
  });


  it('Should return stats ', done => {
    chai.request(app)
      .get('/api/v1/requests/stats?startDate=2019-03-03&endDate=2019-11-07')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        console.log(res.body);
        
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Your number of trips are:');
        done();
      });
  });

  it('Should return stats with invalid date', done => {
    chai.request(app)
      .get('/api/v1/requests/stats?startDate=2019-12-07&endDate=2019-11-03')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('startDate  must not be greater than endDate');
        done();
      });
  });

  it('Should tell the user that Either startDate or endDate must not be greater than today\'s date', done => {
    chai.request(app)
      .get('/api/v1/requests/stats?startDate=2019-12-07&endDate=2020-11-03')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        console.log(res.body);
        
        res.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Either startDate or endDate must not be greater than today\'s date');
        done();
      });
  });
  
  it('Should return 403 status, Supplier not allowed', done => {
    chai.request(app)
      .get('/api/v1/requests/stats?startDate=2019-03-03&endDate=2019-11-07')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        done();
      });
  });

  it('Should return 400 status, with invalid input', done => {
    chai.request(app)
      .get('/api/v1/requests/stats?days=-23')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('Should tell the user that they have no trips', done => {
    chai.request(app)
      .get('/api/v1/requests/stats?startDate=2019-01-07&endDate=2019-11-12')
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((err, res) => {
        console.log(res.body);
        
        res.should.have.property('status').eql(200);
        done();
      });
  });
});
