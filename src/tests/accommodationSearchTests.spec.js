import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index'
import mockData from './mockData/mockData';

chai.use(chaiHttp);

const { expect } = chai;

let token;


describe('===> Unathenticated Search Accommodation Tests <====', () => {
    it('Should not allow search without authenticating', (done) => {
        chai.request(app)
            .get('/api/v1/accommodations/search?name=marriott')
            .end((err, res) => {
                expect(res.status).to.be.eql(401, 'Wrong status returned');
                done();
            })
    });
});


describe('====> Authenticated Search Tests <=====', () => {
    before('Authenticate Client', (done) => {
        chai.request(app)
            .post('/api/v1/users/login')
            .send(mockData.admin)
            .end((err, res) => {
                token = res.body.data.token;
                done();
            });
    });

    it('Should not allow search without query parameter values', (done) => {
        chai.request(app)
            .get('/api/v1/accommodations/search?description=&location=&name=')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Wrong status returned');
                expect(res.body.message).to.be.eql('Search keys cannot be null', 'Wrong status returned');
                done();
            });
    });

    it('Should not allow search without query parameter', (done) => {
        chai.request(app)
            .get('/api/v1/accommodations/search')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(404, 'Wrong status returned');
                expect(res.body.message).to.be.eql('No search Parameters Provided', 'Wrong status returned');
                done();
            });
    });

    it('Should not allow search with invalid search keys', (done) => {
        chai.request(app)
            .get('/api/v1/accommodations/search?description=fire&location=kampala&name=marriott&mahahdh=dklsmdsd')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(400, 'Wrong status returned');
                expect(res.body.message).to.be.eql('You Provided Invalid Search Keys. Only Name, Description & Locaton Allowed.', 'Wrong status returned');
                done();
            });
    });

    it('Should Search and return data with valid search keys', (done) => {
        chai.request(app)
            .get('/api/v1/accommodations/search?description=fire')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(200, 'Wrong status returned');
                expect(res.body.message).to.be.eql('Accommodations', 'Wrong status returned');
                done();
            });
    });

    it('Should Search and return no accommodations found with valid search keys', (done) => {
        chai.request(app)
            .get('/api/v1/accommodations/search?description=fire&location=kampala&name=marriott')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.status).to.be.eql(404, 'Wrong status returned');
                expect(res.body.message).to.be.eql('No accommodations matching this criteria were found.', 'Wrong status returned');
                done();
            });
    });


});