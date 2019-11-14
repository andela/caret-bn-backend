import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import mockData from './mockData/mockData';
import generateToken from '../utils/generateToken';

const token = generateToken(mockData.verifiedUser1);

chai.should();
chai.use(chaiHttp);

describe('User Logout Test', () => {
    it('check for successfull logout', (done) => {
        chai.request(app)
          .patch('/api/v1/users/logout')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
});
