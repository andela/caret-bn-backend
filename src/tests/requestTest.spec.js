import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);

describe('Request Tests', () => {
    it('Should allow an authenticated user to make a test successfully', () => {
        chai.request(app)
            .post('api/v1/requests')
            .send()
            .end((res, err) => {

            });
    });
});
