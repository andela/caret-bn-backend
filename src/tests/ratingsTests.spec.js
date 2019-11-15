import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockData from './mockData/mockData';

chai.use(chaiHttp);

const { expect } = chai;
const ratineOne = {
    accommodationId: 4,
    rating: 4
}
const ratingTwo = {
    accommodationId: 4,
}

let authToken;
let authTokenUnbooked;

describe('<==== Ratings Tests ====> ', () => {
    before('Sign in ', (done) => {
        chai.request(app)
            .post('/api/v1/users/login')
            .send(mockData.admin)
            .end((err, res) => {
                authToken = res.body.data.token
            });

        chai.request(app)
            .post('/api/v1/users/login')
            .send(mockData.registeredUser)
            .end((err, res) => {
                authTokenUnbooked = res.body.data.token
                done();
            });
    });

    it('it should tell the user that no accommodations were found', done => {
        chai.request(app)
            .get(`/api/v1/accommodations/ratings/top-rated`)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });


    it('===> Should Successfully Rate an Accomodation <===', (done) => {
        chai.request(app)
            .post('/api/v1/ratings')
            .send(ratineOne)
            .set('Authorization', `Bearer ${authToken}`)
            .end((error, res) => {
                expect(res.status).to.be.eql(201, 'Incorrect Status Code Being Returned');
                done();
            });
    });

    it('it should retrieve the top 5 highest rated accommodations', done => {
        chai.request(app)
          .get(`/api/v1/accommodations/ratings/top-rated`)
          .set('Authorization', `Bearer ${authToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

    it('===> Should Not Rate an Accomodation Twice <===', (done) => {
        chai.request(app)
            .post('/api/v1/ratings')
            .send(ratineOne)
            .set('Authorization', `Bearer ${authToken}`)
            .end((error, res) => {
                expect(res.status).to.be.eql(409, 'Incorrect Status Code Being Returned');
                done();
            });
    });

    it('===> Should Not Rate an Accomodation If No Bookings are present for user <===', (done) => {
        chai.request(app)
            .post('/api/v1/ratings')
            .send(ratineOne)
            .set('Authorization', `Bearer ${authTokenUnbooked}`)
            .end((error, res) => {
                expect(res.status).to.be.eql(403, 'Incorrect Status Code Being Returned');
                done();
            });
    });

    it('===> Should Not Rate an Accomodation If Format is Wrong <===', (done) => {
        chai.request(app)
            .post('/api/v1/ratings')
            .send(ratingTwo)
            .set('Authorization', `Bearer ${authTokenUnbooked}`)
            .end((error, res) => {
                expect(res.status).to.be.eql(400, 'Incorrect Status Code Being Returned');
                done();
            });
    });

    it('===> Should view all ratings <===', (done) => {
        chai.request(app)
            .get('/api/v1/ratings/marriot')
            .set('Authorization', `Bearer ${authToken}`)
            .end((error, res) => {
                expect(res.status).to.be.eql(200, 'Incorrect Status Code Being Returned');
                done();
            });
    });

    it('===> Shouldnot show ratings for non existent accomodation <===', (done) => {
        chai.request(app)
            .get('/api/v1/ratings/isimbi-hotel')
            .set('Authorization', `Bearer ${authToken}`)
            .end((error, res) => {
                expect(res.status).to.be.eql(404, 'Incorrect Status Code Being Returned');
                done();
            });
    });

});