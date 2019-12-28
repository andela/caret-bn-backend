import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import app from '../index';
import mockdata from './mockData/mockData';
import generateToken from '../utils/generateToken';

const token = generateToken(mockdata.verifiedUser1);
const token2 = generateToken(mockdata.requester);
const token3 = generateToken(mockdata.verifiedUser);
let managerToken;
let userToken;

chai.should();
chai.use(chaiHttp);

const id = mockdata.verifiedUser1.id;

const newRequest = {
    comment:'dsknfkjsnfkdsnkl'
}

describe('comment tests', () =>{
    before(done => {
        chai.request(app)
          .post('/api/v1/users/login')
          .send(mockdata.registeredUser)
          .end((err, res) => {
            userToken = res.body.data.token;
          });
        chai.request(app)
          .post('/api/v1/users/login')
          .send(mockdata.manager)
          .end((err, res) => {
            managerToken = res.body.data.token;
            done();
          });
      });
    

    it('should add new comment', (done) => {
      chai.request(app)  
      .post('/api/v1/comments/2')
      .set('Authorization', `Bearer ${userToken}`)
      .send(newRequest)
      .end((err, res) => {
          res.should.have.property('status').eql(200);
          done();
        });
    });
    it('should add new comment', (done) => {
        chai.request(app)  
        .post('/api/v1/comments/2')
        .set('Authorization', `Bearer ${managerToken}`)
        .send(newRequest)
        .end((err, res) => {
          res.should.have.property('status').eql(200);
      done();
      });
  });
  it('should get all comment ', (done) => {
    chai.request(app)  
    .get('/api/v1/comments/2')
    .set('Authorization', `Bearer ${token}`)
    .end((err, res) => {
        res.should.have.property('status').eql(200);
    done();
    });
});
it('should return a 400 when you are not owner of the request or manager', (done) => {
    chai.request(app)  
    .get('/api/v1/comments/2')
    .set('Authorization', `Bearer ${token3}`)
    .end((err, res) => {
        res.should.have.property('status').eql(400);
    done();
    });
});
it('should get 400 when there is no data in the body ', (done) => {
    chai.request(app)  
    .post('/api/v1/comments/3')
    .set('Authorization', `Bearer ${token}`)
    .end((err, res) => {
        res.should.have.property('status').eql(400);
    done();
    });
});
it('should get 400 when there is no data in the body ', (done) => {
    chai.request(app)  
    .post('/api/v1/comments/333')
    .set('Authorization', `Bearer ${token}`)
    .end((err, res) => {
        res.should.have.property('status').eql(400);
    done();
    });
});
it('should get 400 when there is no data in the body ', (done) => {
    chai.request(app)  
    .get('/api/v1/comments/3')
    .set('Authorization', `Bearer ${token3}`)
    .end((err, res) => {
        res.should.have.property('status').eql(400);
    done();
    });
});
});