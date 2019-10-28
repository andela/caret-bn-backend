import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockData from './mockData/mockData';
import strings from '../utils/strings';

chai.use(chaiHttp);

const { expect } = chai;

let tokenForNoRequests;
let tokenForRequests;
let managerToken;
let userToken;

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
    
    it('Should return requests if assigned to a user', (done) => {
        chai.request(app)
        .get('/api/v1/requests')
        .set('Authorization', `Bearer ${tokenForRequests}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(200, 'Incorrect Status Code Returned.');
            expect(body.message).to.be.eql('Your Requests are retrieveed successfully!', 'Wrong message returned');
            done();
        });
    });

    it('Should log in a manager', (done) => {
        chai.request(app)
        .post('/api/v1/users/login')
        .send(mockData.manager)
        .end((err, res) => {
            const { body } = res;
            managerToken = body.data.token;
            done();
        });
    });

    it('Should return requests that are assigned to the logged in manager', (done) => {
        chai.request(app)
        .get('/api/v1/requests/manager')
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(200);
            expect(body.message).to.be.eql(strings.user.requests.ASSIGNED_REQUESTS);
            done();
        });
    });

    it('Should approve a request', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/manager/approve/1')
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
            const { status } = res;
            expect(status).to.be.eql(200);
            done();
        });
    });

    it('Should not approve a request twice', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/manager/approve/1')
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
            const { status } = res;
            expect(status).to.be.eql(400);
            done();
        });
    });

    it('Should reject a request', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/manager/reject/1')
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(200);
            done();
        });
    });

    it('Should not reject a request twice', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/manager/reject/1')
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(400);
            done();
        });
    });

    it('Should return an error on an incorrect id format', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/manager/reject/wrongFormat')
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
            const { status } = res;
            expect(status).to.be.eql(400);
            done();
        });
    });

    it('Should log in a normal user', (done) => {
        chai.request(app)
        .post('/api/v1/users/login')
        .send(mockData.registeredUser)
        .end((err, res) => {
            const { body } = res;
            userToken = body.data.token;
            done();
        });
    });

    it('Should return an error for permissions', (done) => {
        chai.request(app)
        .get('/api/v1/requests/manager')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
            const { status } = res;
            expect(status).to.be.eql(403);
            done();
        });
    });
});