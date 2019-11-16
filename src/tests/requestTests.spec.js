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
let anotherManagerToken;
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
            expect(body.message).to.be.eql('Your Requests are retrieved successfully!', 'Wrong message returned');
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
    it('Should log in a anotherManager', (done) => {
        chai.request(app)
        .post('/api/v1/users/login')
        .send(mockData.anotherManager)
        .end((err, res) => {
            const { body } = res;
            anotherManagerToken = body.data.token;
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

    it('Should return requests that are assigned to the logged in manager', (done) => {
        chai.request(app)
        .get('/api/v1/requests/manager')
        .set('Authorization', `Bearer ${anotherManagerToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(200);
            expect(body.message).to.be.eql(strings.user.requests.NO_REQUESTS);
            done();
        });
    });

    it('Should return requests that are assigned to the logged in user', (done) => {
        chai.request(app)
        .get('/api/v1/requests/')
        .set('Authorization', `Bearer ${tokenForNoRequests}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(200);
            expect(body.message).to.be.eql(strings.user.requests.NO_REQUESTS);
            done();
        });
    });

    it('Should return a wrong action message', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/manager/skibidipapa/1')
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(400);
            expect(body.message).to.be.eql('Ooops! Cannot proceed with action \'skibidipapa\'. Action must be \'approve\' or \'reject\'');
            done();
        });
    });

    it('Should not allow another manager to change status', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/manager/approve/1')
        .set('Authorization', `Bearer ${anotherManagerToken}`)
        .end((err, res) => {
            const { status } = res;
            expect(status).to.be.eql(403);
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
    it('it Should be able to edit comment', (done) => {
        chai.request(app)
        .put('/api/v1/requests/comments/1')
        .send(mockData.commentData)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(200);
            expect(body.message).to.be.eql('Comment Successfully Updated!');
            done();
        });
    });
    it('it Should not be able to edit comment with wrong id', (done) => {
        chai.request(app)
        .put('/api/v1/requests/comments/1677')
        .send(mockData.commentData)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(404);
            expect(body.message).to.be.eql('Ooops! This comment does not exist!');
            done();
        });
    });
    it('it Should not be able to edit comment with empty comment', (done) => {
        chai.request(app)
        .put('/api/v1/requests/comments/1')
        .send(mockData.emptyComment)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
            const { status } = res;
            expect(status).to.be.eql(400);
            done();
        });
    });
    it('it Should not be able to edit comment with anauthorized user', (done) => {
        chai.request(app)
        .put('/api/v1/requests/comments/1')
        .send(mockData.commentData)
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(403);
            expect(body.message).to.be.eql('Oops! You are not the owner of this comment!');
            done();
        });
    });
    
    it('it Should not be able to delete a comment with wrong id', (done) => {
        chai.request(app)
        .delete('/api/v1/requests/comments/15566')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(404);
            expect(body.message).to.be.eql('Ooops! This comment does not exist!');
            done();
        });
    });

   it('it Should not be able to delete a comment with anauthorized user', (done) => {
        chai.request(app)
        .delete('/api/v1/requests/comments/1')
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(403);
            expect(body.message).to.be.eql('Oops! You are not the owner of this comment!');
            done();
        });
    });
    it('it Should be able to delete a comment', (done) => {
        chai.request(app)
        .delete('/api/v1/requests/comments/1')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
            const { status, body } = res;
            expect(status).to.be.eql(200);
            expect(body.message).to.be.eql('Comment Successfully Deleted!');
            done();
        });
    });

    // Manager View Single Request
    it('Should return requests to requester\'s manager', (done) => {
        chai.request(app)
        .get('/api/v1/requests/6')
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {            
            const { status, body } = res;
            expect(status).to.be.eql(200);
            done();
        });
    });

    it('Should not return requests to another manager', (done) => {
        chai.request(app)
        .get('/api/v1/requests/6')
        .set('Authorization', `Bearer ${anotherManagerToken}`)
        .end((err, res) => {            
            const { status, body } = res;
            expect(status).to.be.eql(403);
            done();
        });
    });

    it('Should return requests to requester', (done) => {
        chai.request(app)
        .get('/api/v1/requests/6')
        .set('Authorization', `Bearer ${tokenForRequests}`)
        .end((err, res) => {            
            const { status, body } = res;
            expect(status).to.be.eql(200);
            done();
        });
    });

    it('Should return 404, No requests found', (done) => {
        chai.request(app)
        .get('/api/v1/requests/1000')
        .set('Authorization', `Bearer ${tokenForRequests}`)
        .end((err, res) => {            
            const { status, body } = res;
            expect(status).to.be.eql(404);
            done();
        });
    });

    it('Should return 404, No requests found', (done) => {
        chai.request(app)
        .get('/api/v1/requests/11')
        .set('Authorization', `Bearer ${tokenForRequests}`)
        .end((err, res) => {            
            const { status, body } = res;
            expect(status).to.be.eql(404);
            done();
        });
    });
});