import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import requestData from './../mockData/requestData';
import mockData from './../mockData/mockData';

chai.use(chaiHttp);

const facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;

const { expect } = chai;

let authToken;

describe('Request Tests', () => {
    before('Sign in ', (done) => {
        chai.request(app)
            .post('/api/v1/auth/facebook/')
            .send({ access_token: facebookAccessToken })
            .end((err, res) => {
                authToken = res.body.data.token;
                done();
            });
    });
    it('Should allow an authenticated user to make a one way request successfully', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.oneWayTrip)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(201, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });
    it('Should allow an authenticated user to make a return successfully', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.returnTrip)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(201, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });
    it('Should allow an authenticated user to make a multi city request successfully', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.multiCityTrip)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(201, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow an authenticated user to make a multi city request twice', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.multiCityTrip)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow an authenticated user to make a return trip without a return date', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.returnTripNoReturnDate)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow a user to make a multicity trips with multiple is final flags', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.multiCityTripMultipleFinalFlags)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                expect(res.body.message).to.be.eql('You are already set the previous destination as your final.', 'Incorrect Message Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow a user to make a multicity trips with multiple no final flag', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.multiCityTripNoFinalFlags)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                expect(res.body.message).to.be.eql('You need to set a destination as final.', 'Incorrect Message Being Returned');
                done();
            })
            .timeout(4000);
    });


    it('Should not allow a user to make a multicity trips with one destination', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.multiCityTripOneDestination)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow a user to make a multicity trips with inconcistent dates', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.multiCityTripPreceedingDates)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow a user to make request during another request', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.TripBadDates)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow a user to make requests if departure falls between dates', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.returnTripBadDates)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow a user to travel to original location', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.originalLocationTravel)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow a user to use same booking in different cities', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.multiCityTripSameBookings)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow a user to travel on non existent type', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.oneWayTripNoType)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });
    it('Should not allow a user to travel to non existent location', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.oneWayTripNoLocation)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow a user to travel to non existent location destination', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.oneWayTripNoLocationInDestination)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });

    it('Should not allow a user to travel to the same destination', (done) => {
        chai.request(app)
            .post('/api/v1/requests')
            .send(requestData.multiCityTripSameDest)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            })
            .timeout(4000);
    });








});
