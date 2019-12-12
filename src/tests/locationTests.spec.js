import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import mockData from './mockData/mockData';

chai.should();
chai.use(chaiHttp);

let userToken;


describe('Like and Unlike Accommodation Test', () => {
    it('it should log in a User', done => {
        chai.request(app)
            .post('/api/v1/users/login')
            .send(mockData.verifiedUser4)
            .end((err, res) => {
                userToken = res.body.data.token;
                done();
            });
    });


    it('it should get all locations', done => {
        chai.request(app)
            .post(`/api/v1/locations`)
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
