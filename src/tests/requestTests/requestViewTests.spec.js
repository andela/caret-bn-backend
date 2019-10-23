import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import mockData from '../mockData/mockData';

chai.use(chaiHttp);

const { expect } = chai;

let tokenForNoRequests;
let tokenForRequests;

const facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN
describe('Request Tests', () => {
    before('Sign in ', (done) => {
        chai.request(app)
            .post('/api/v1/users/login')
            .send(mockData.verifiedUser)
            .end((err, res) => {
                const { body } = res;
                tokenForNoRequests = body.data.token;
            })
            .timeout(4000);

        chai.request(app)
            .post('/api/v1/users/login')
            .send(mockData.registeredUser)
            .end((err, res) => {
                const { body } = res;
                tokenForRequests = body.data.token;
                done();
            });
    });

    it('Should reject requests from unauthenticated users', (done) => {
        chai.request(app)
            .get('/api/v1/requests')
            .end((err, res) => {
                const { status, body } = res;
                expect(status).to.be.eql(401, 'Incorrect Status Code Returned.');
                expect(body.message).to.be.eql('Please sign into the application first', 'Wrong message returned');
                done();
            });
    })

    it('Should reject malformed tokens', (done) => {
        chai.request(app)
            .get('/api/v1/requests')
            .set('Authorization', `Bearer ${tokenForNoRequests}xy`)
            .end((err, res) => {
                const { status, body } = res;
                expect(status).to.be.eql(400, 'Incorrect Status Code Returned.');
                expect(body.message).to.be.eql('Invalid token please sign again', 'Wrong message returned');
                done();
            });
    })

    it('Should return 404 if there are no requests assigned to a user', (done) => {
        chai.request(app)
            .get('/api/v1/requests')
            .set('Authorization', `Bearer ${tokenForNoRequests}`)
            .end((err, res) => {
                const { status, body } = res;
                expect(status).to.be.eql(404, 'Incorrect Status Code Returned.');
                expect(body.message).to.be.eql('No requests registered', 'Wrong message returned');
                done();
            });
    });

    it('Should return requests if assigned to a user', (done) => {
        chai.request(app)
            .get('/api/v1/requests')
            .set('Authorization', `Bearer ${tokenForRequests}`)
            .end((err, res) => {
                const { status, body } = res;
                expect(status).to.be.eql(200, 'Incorrect Status Code Returned.');
                expect(body.message).to.be.eql('Your Requests', 'Wrong message returned');
                done();
            });
    });



});