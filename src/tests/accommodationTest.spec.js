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
let travelAdminToken;
let slug;

let invalidToken = 'wdsfwsadwsadsadsqa';
// it should not book an accommodation with supplier Token:
describe('Accommodation Test', () => {
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
      .get(`/api/v1/accommodations/admin/deactivated`)
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
  it('it should return a specific available accommodation', done => {
    chai.request(app)
      .get(`/api/v1/accommodations/${slug}`)
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((err, res) => {
        res.should.have.status(200);
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
  it('it should book an accommodation', done => {
    chai.request(app)
      .patch('/api/v1/accommodations/book')
      .set('Authorization', `Bearer ${requesterToken}`)
      .send(mockData.bookingdata)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Booking done successfully')
        done();
      });
    });
    it('it should not book an accommodation with wrong id', done => {
      chai.request(app)
        .patch('/api/v1/accommodations/book')
        .set('Authorization', `Bearer ${requesterToken}`)
        .send(mockData.bookingdata2)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Ooops! This accommodation id does not exist!')
          done();
        });
      });
      it('it should not book an accommodation with ivalid Id', done => {
        chai.request(app)
          .patch('/api/v1/accommodations/book')
          .set('Authorization', `Bearer ${requesterToken}`)
          .send(mockData.bookingdata3)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
        });
        it('it should not book an accommodation with ivalid Date', done => {
          chai.request(app)
            .patch('/api/v1/accommodations/book')
            .set('Authorization', `Bearer ${requesterToken}`)
            .send(mockData.invalidbookingdata)
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
          });
      it('it should not book an accommodation with no space', done => {
        chai.request(app)
          .patch('/api/v1/accommodations/book')
          .set('Authorization', `Bearer ${requesterToken}`)
          .send(mockData.bookingdata4)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').eql('There is no space available in accommodation')
            done();
          });
        });
        it('it should not book an accommodation twice', done => {
          chai.request(app)
            .patch('/api/v1/accommodations/book')
            .set('Authorization', `Bearer ${requesterToken}`)
            .send(mockData.bookingdata)
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.have.property('message').eql('you have already booked this accommodation')
              done();
            });
          });
          it('it should not book an accommodation with invalid token', done => {
            chai.request(app)
              .patch('/api/v1/accommodations/book')
              .set('Authorization', `Bearer ${invalidToken}`)
              .send(mockData.bookingdata)
              .end((err, res) => {
                res.should.have.status(400);
                done();
              });
            });
            it('it should not book an accommodation checkOut greater than checkIn', done => {
              chai.request(app)
                .patch('/api/v1/accommodations/book')
                .set('Authorization', `Bearer ${requesterToken}`)
                .send(mockData.invalidBookingDate)
                .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.have.property('message').eql('checkout date must not be less than checkin date')
                  done();
                });
              });
              it('it should not book an accommodation with outdate dates', done => {
                chai.request(app)
                  .patch('/api/v1/accommodations/book')
                  .set('Authorization', `Bearer ${requesterToken}`)
                  .send(mockData.OutdateBookingDate)
                  .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql('CheckOut and CheckIn must not be outdate dates')
                    done();
                  });
                });
                
                it('it should not book an accommodation with supplier Token', done => {
                  chai.request(app)
                    .patch('/api/v1/accommodations/book')
                    .set('Authorization', `Bearer ${userToken}`)
                    .send(mockData.bookingdata)
                    .end((err, res) => {
                      console.log(res.body);
                      res.should.have.status(403);
                      done();
                    });
                  });
                  it('it should get all bookings', done => {
                    chai.request(app)
                      .get('/api/v1/accommodations/bookings')
                      .set('Authorization', `Bearer ${requesterToken}`)
                      .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql('Your bookings')
                        done();
                      });
                    });
                    it('it should get all bookings', done => {
                      chai.request(app)
                        .get('/api/v1/accommodations/bookings')
                        .set('Authorization', `Bearer ${requesterToken}`)
                        .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.have.property('message').eql('Your bookings')
                          done();
                        });
                      });

                      it('it should not book an accommodation with unvailable rooms', done => {
                        chai.request(app)
                          .patch('/api/v1/accommodations/book')
                          .set('Authorization', `Bearer ${requesterToken}`)
                          .send(mockData.bookingdata5)
                          .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.have.property('message').eql('roomsNumber exceed number of available rooms')
                            done();
                          });
                        });         
  it('it should log in a travel admin ', done => {
    chai.request(app)
    .post('/api/v1/users/login')
    .send(mockData.travelAdmin)
    .end((err, res) => {
      travelAdminToken = res.body.data.token;
      done();
    });
  });
  it('it should create a new accommodation for travel admin successfully with a single image', done => {
    chai.request(app)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${travelAdminToken}`)
      .field('name', 'test accommodation')
      .field('description', 'description')
      .field('locationId', '1')
      .field('currency', 'USD')
      .field('availableSpace', '5')
      .field('cost', '500')
      .field('highlights', 'Accommodation highlights')
      .field('amenities', 'Accommodation amenities')
      .attach('image', 'src/tests/mockData/AI.png')
      .end((err, res) => {
        slug = res.body.data.slug;
        res.should.have.status(201);
        done();
      });
  });
  it('it should return a specific accommodation regardless of the available space', done => {
    chai.request(app)
      .get(`/api/v1/accommodations/${slug}`)
      .set('Authorization', `Bearer ${travelAdminToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('it should deactivate an accommodation and send an email', done => {
    chai.request(app)
      .patch(`/api/v1/accommodations/activate/${slug}`)
      .set('Authorization', `Bearer ${travelAdminToken}`)
      .send(mockData.activationInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('it should retrieve all deactivated accommodations', done => {
    chai.request(app)
      .get(`/api/v1/accommodations/admin/deactivated`)
      .set('Authorization', `Bearer ${travelAdminToken}`)
      .send(mockData.activationInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('it should activate an accommodation and send an email', done => {
    chai.request(app)
      .patch(`/api/v1/accommodations/activate/${slug}`)
      .set('Authorization', `Bearer ${travelAdminToken}`)
      .send(mockData.activationInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('it should tell the user that no deactivated accommodations are found', done => {
    chai.request(app)
      .get(`/api/v1/accommodations/admin/deactivated`)
      .set('Authorization', `Bearer ${travelAdminToken}`)
      .send(mockData.activationInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
