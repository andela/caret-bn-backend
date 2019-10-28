import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import app from '../index';
import accommodationMockData from './mockData/accommodationData';
import generateToken from '../utils/generateToken';
import mockData from './mockData/mockData';

chai.should();
chai.use(chaiHttp);

const notOwner = { id: 3, isVerified: true };
let userToken;
const invalidToken = 'hljhjhlshljghsfdljgh';
const notOwnerToken = generateToken(notOwner);

describe('Accommodations Tests', () => {
  before(done => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.verifiedUser)
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });

  // Update Suite
  it('Should update an accommodation with no form-data by returning 400 status code', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/1/edit')
      .set('Authorization', `Bearer ${userToken}`)
      .set('content-type', `multipart/form-data`)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('Should update an existing accommodation with no images by returning 200 status code', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/1/edit')
      .set('Authorization', `Bearer ${userToken}`)
      .field('name', 'Hotel Des Milles Collines',)
      .field('description', 'Lorem Ipsum',)
      .attach()
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should update an existing accommodation by returning 200 status code', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/1/edit')
      .set('Authorization', `Bearer ${userToken}`)
      .field('name', 'Hotel Des Milles Collines',)
      .field('description', 'Lorem Ipsum',)
      .attach('image', 'src/tests/mockData/AI.png')
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });


  it('Should update an existing accommodation with multiple images by returning 200 status code', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/1/edit')
      .set('Authorization', `Bearer ${userToken}`)
      .field('name', 'Hotel Croco',)
      .field('description', 'Lorem Ipsum',)
      .attach('image', 'src/tests/mockData/AI.png')
      .attach('image', 'src/tests/mockData/AI2.png')
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should not update an accommodation by returning 400 status code, Invalid Token', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/1/edit')
      .set('Authorization', `Bearer ${invalidToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('Should not update an accommodation by returning 401 status code, Signin or verify first', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/1/edit')
      .send(accommodationMockData.updateAccommodation)
      .end((err, res) => {
        res.should.have.property('status').eql(401);
        done();
      });
  });

  it('Should not update an accommodation by returning 400 status code, Invalid id', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/a/edit')
      .send(accommodationMockData.updateAccommodation)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('Should not update an accommodation by returning 404 status code, Accommodation Not Found', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/200/edit')
      .send(accommodationMockData.updateAccommodation)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        done();
      });
  });

  it('Should not update an accommodation by returning 403 status code, Not Owner', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/1/edit')
      .send(accommodationMockData.updateAccommodation)
      .set('Authorization', `Bearer ${notOwnerToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        done();
      });
  });

  it('Should not update an accommodation by returning 400 status code, Invalid body information', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/1/edit')
      .send(accommodationMockData.badUpdateAccommodation)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  // Delete Suite
  it('Should not delete an accommodation by returning 400 status code, Invalid Token', done => {
    chai.request(app)
      .delete('/api/v1/accommodations/1/delete')
      .set('Authorization', `Bearer ${invalidToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('Should not delete an accommodation by returning 401 status code, Signin First', done => {
    chai.request(app)
      .delete('/api/v1/accommodations/1/delete')
      .end((err, res) => {
        res.should.have.property('status').eql(401);
        done();
      });
  });

  it('Should not delete an accommodation by returning 400 status code, Invalid id', done => {
    chai.request(app)
      .delete('/api/v1/accommodations/a/delete')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('Should not delete an accommodation by returning 404 status code, Accommodation Not Found', done => {
    chai.request(app)
      .delete('/api/v1/accommodations/200/delete')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        done();
      });
  });

  it('Should delete an accommodation by returning 200 status code, Succesully Deleted', done => {
    chai.request(app)
      .delete('/api/v1/accommodations/1/delete')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });
});
