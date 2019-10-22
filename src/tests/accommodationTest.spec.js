import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import mockData from './mockData/mockData';
import strings from '../utils/stringsUtil';

chai.should();
chai.use(chaiHttp);

let userToken;
let requesterToken;
let adminToken;
let supplierToken;

let invalidToken = 'wdsfwsadwsadsadsqa';

describe('Accommodation Test', () => {
    before((done) => {
        chai.request(app)
          .post('/api/v1/users/login')
          .send(mockData.supplier)
          .end((err, res) => {
            supplierToken = res.body.data.token;
            done();
          });
      });
      it('it should tell the user that they have not created accommodations yet', done => {
        chai.request(app)
          .get('/api/v1/accommodations')
          .set('Authorization', `Bearer ${supplierToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql(strings.accommodation.success.NO_INFO_YET)
            done();
          });
      });
      it('it should log in a supplier User', done => {
        chai.request(app)
        .post('/api/v1/users/login')
        .send(mockData.verifiedUser)
        .end((err, res) => {
          userToken = res.body.data.token;
          done();
        });
      });
  it('it should create a new accommodation successfully with a single image', done => {
    chai.request(app)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${userToken}`)
      .field('name', 'Accommodation name')
      .field('description', 'description')
      .field('locationId', '2')
      .field('currency', 'USD')
      .field('availableSpace', '5')
      .field('cost', '1000')
      .field('highlights', 'Accommodation highlights')
      .field('amenities', 'Accommodation amenities')
      .attach('image', 'src/tests/mockData/AI.png')
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('it should not create an accommodation with the same name twice', done => {
    chai.request(app)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${userToken}`)
      .field('name', 'Accommodation name')
      .field('description', 'description')
      .field('locationId', '3')
      .field('currency', 'USD')
      .field('availableSpace', '5')
      .field('cost', '1000')
      .field('highlights', 'Accommodation highlights')
      .field('amenities', 'Accommodation amenities')
      .attach('image', 'src/tests/mockData/AI.png')
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
  it('it should return an error when no image is selected', done => {
    chai.request(app)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${userToken}`)
      .field('name', 'Accommodation')
      .field('description', 'description')
      .field('locationId', '2')
      .field('availableSpace', '5')
      .field('cost', '1000')
      .field('highlights', 'Accommodation highlights')
      .field('amenities', 'Accommodation amenities')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should create a new accommodation successfully with multiple images ', done => {
    chai.request(app)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${userToken}`)
      .field('name', 'Accommodation namess')
      .field('description', 'description')
      .field('locationId', '2')
      .field('currency', 'USD')
      .field('availableSpace', '5')
      .field('cost', '1000')
      .field('highlights', 'Accommodation highlights')
      .field('amenities', 'Accommodation amenities')
      .attach('image', 'src/tests/mockData/AI.png')
      .attach('image', 'src/tests/mockData/AI2.png')
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('it should return error on invalid inputs', done => {
    chai.request(app)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${userToken}`)
      .send(mockData.missingData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should return error on invalid token', done => {
    chai.request(app)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${invalidToken}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should return error when no token is provided', done => {
    chai.request(app)
      .post('/api/v1/accommodations')
      .send(mockData.missingData)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should return a list of all accommodations for the logged in user', done => {
    chai.request(app)
      .get('/api/v1/accommodations')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('it should log in a requester User', done => {
    chai.request(app)
    .post('/api/v1/users/login')
    .send(mockData.requester)
    .end((err, res) => {
      requesterToken = res.body.data.token;
      done();
    });
  });
  it('it should return permission error', done => {
    chai.request(app)
      .get('/api/v1/accommodations')
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql(strings.users.error.NO_ACCESS)
        done();
      });
  });
  it('it should return permission error', done => {
    chai.request(app)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql(strings.users.error.NO_ACCESS)
        done();
      });
  });
  it('it should log in an admin User', done => {
    chai.request(app)
    .post('/api/v1/users/login')
    .send(mockData.admin)
    .end((err, res) => {
      adminToken = res.body.data.token;
      done();
    });
  });
  it('it should return all accommodations created', done => {
    chai.request(app)
      .get('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
