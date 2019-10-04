import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';


chai.should();
chai.use(chaiHttp);

describe('server test', () => {
  it('it should run the server ', done => {
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
  it('it should test wrong routes ', done => {
    chai.request(app)
      .get('/pi')
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        res.body.should.have.property('message').eql('Sorry this route does not exist !');
        done();
      });
  });
});

describe('Users Route Test', () => {
  it('Should Get All Users By Returning 200 Status Code', done => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });
});
