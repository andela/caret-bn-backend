import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';


chai.should();
chai.use(chaiHttp);

describe('server test', () => {
  it('it should run the server ', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Welcome to Barefoot Nomad!');
        done();
      });
  });
});

describe('router test', () => {
  it('it should test wrong routes ', (done) => {
    chai.request(app)
      .get('/pi')
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Sorry this router does not exist !');
        done();
      });
  });
});
