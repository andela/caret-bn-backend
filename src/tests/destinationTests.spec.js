import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockData from './mockData/mockData';

const { expect } = chai;

chai.use(chaiHttp);

let token;
let supplierToken;

describe('<=== Destination Tests ===>', () => {
    before('Should log into the app', (done) => {
        chai.request(app)
            .post('/api/v1/users/login')
            .send(mockData.registeredUser)
            .end((err, res) => {
                const { data } = res.body;
                token = data.token;
            });
        chai.request(app)
            .post('/api/v1/users/login')
            .send(mockData.supplier)
            .end((err, res) => {
                const { data } = res.body;
                supplierToken = data.token;
                done();
            });
    });

    it('Should retrieve the top visited locations', (done) => {
        chai.request(app)
            .get('/api/v1/destinations/most-visited')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(200, 'Invalid Status Returned');
                done();
            });
    });

    it('Should not allow suppliers to view route', (done) => {
        chai.request(app)
            .get('/api/v1/destinations/most-visited')
            .set('Authorization', `Bearer ${supplierToken}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(403, 'Invalid Status Returned');
                done();
            });
    });

});
