import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import app from '../index';
import mockData from './mockData/mockData';

chai.should();
chai.use(chaiHttp);

let userToken;
let supplierToken;
let anotherSupplierToken;

describe('Bookings Tests', () => {
  before(done => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.registeredUser)
      .end((err, res) => {
        userToken = res.body.data.token;
      });
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.anotherSupplier)
      .end((err, res) => {
        anotherSupplierToken = res.body.data.token;
      });
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.supplier)
      .end((err, res) => {
        supplierToken = res.body.data.token;
        done();
      });
  });

  // Filter Bookings
  it('Should return pending bookings', done => {
    chai.request(app)
      .get('/api/v1/accommodations/bookings/search?status=pending')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should not return rejected bookings, 404 no rejected bookings', done => {
    chai.request(app)
      .get('/api/v1/accommodations/bookings/search?status=rejected')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(404);
        done();
      });
  });

  it('Should throw a 400 error on empty query', done => {
    chai.request(app)
      .get('/api/v1/accommodations/bookings/search')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  it('Should throw a 400 error on status validation', done => {
    chai.request(app)
      .get('/api/v1/accommodations/bookings/search?status=caret')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        done();
      });
  });

  // Approve/Reject bookings
  it('Should approve a booking', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/bookings/approve/6')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should reject a booking', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/bookings/reject/7')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  // *** Filter bookings
  it('Should return rejected bookings', done => {
    chai.request(app)
      .get('/api/v1/accommodations/bookings/search?status=rejected')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should return approved bookings', done => {
    chai.request(app)
      .get('/api/v1/accommodations/bookings/search?status=approved')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should throw a 404 error, booking not found', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/bookings/reject/1000')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(404);
        done();
      });
  });

  it('Should throw a 403, booking not pending', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/bookings/reject/7')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(403);
        done();
      });
  });

  it('Should throw a 403, not owner', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/bookings/reject/7')
      .set('Authorization', `Bearer ${anotherSupplierToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(403);
        done();
      });
  });

  // View One booking
  it('Should return a booking, 200 status code', done => {
    chai.request(app)
      .get('/api/v1/accommodations/bookings/7')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should return 404, booking not found, not booking owner', done => {
    chai.request(app)
      .get('/api/v1/accommodations/bookings/4')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(404);
        done();
      });
  });

  it('Should return 404, booking not found, not accommodation owner', done => {
    chai.request(app)
      .get('/api/v1/accommodations/bookings/7')
      .set('Authorization', `Bearer ${anotherSupplierToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(404);
        done();
      });
  });

  it('Should return 404, booking not found, inexistant booking', done => {
    chai.request(app)
      .get('/api/v1/accommodations/bookings/1000')
      .set('Authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(404);
        done();
      });
  });
});
