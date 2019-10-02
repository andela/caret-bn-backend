import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('server test', () => {
  it('it should not run the server ', (done) => {
    chai.request(app)
      .get('/api/')
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        done();
      });
  });
});
