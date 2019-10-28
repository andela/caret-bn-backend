import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import testdata from './mockData/signupMockdata';
import generateToken from '../utils/generateToken';

const adminToken = generateToken(testdata.user);
const invalidTroken = generateToken(testdata.user2);

chai.should();
chai.use(chaiHttp);

describe('Admin Test', () => {
  it('admin Should view all roles', done => {
    chai.request(app)
      .get('/api/v1/admin/roles')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should get all users', done => {
    chai.request(app)
      .get('/api/v1/admin/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should get one user', done => {
  chai.request(app)
    .get('/api/v1/admin/users/1')
    .set('Authorization', `Bearer ${adminToken}`)
    .end((err, res) => {
      res.should.have.property('status').eql(200);
      done();
    });
});

it('Should not get one user', done => {
  chai.request(app)
    .get('/api/v1/admin/users/122435')
    .set('Authorization', `Bearer ${adminToken}`)
    .end((err, res) => {
      res.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('can not find that user');
      done();
    });
});

it('Should asign role to user ', done => {
  chai.request(app)
    .patch('/api/v1/admin/roles/assign/2')
    .set('Authorization', `Bearer ${adminToken}`)
    .send(testdata.role)
    .end((err, res) => {
      res.should.have.property('status').eql(200);
      done();
    });
});
it('Should asign role to user twice', done => {
  chai.request(app)
    .patch('/api/v1/admin/roles/assign/2')
    .set('Authorization', `Bearer ${adminToken}`)
    .send(testdata.role)
    .end((err, res) => {
      res.should.have.property('status').eql(409);
      res.body.should.have.property('message').eql('user already has this role');
      done();
    });
});
it('Should not asign  wrong role ', done => {
  chai.request(app)
    .patch('/api/v1/admin/roles/assign/2')
    .set('Authorization', `Bearer ${adminToken}`)
    .send(testdata.role2)
    .end((err, res) => {
      res.should.have.property('status').eql(400);
      done();
    });
});

it('Should not asign  role to unkown user ', done => {
  chai.request(app)
    .patch('/api/v1/admin/roles/assign/26465757')
    .set('Authorization', `Bearer ${adminToken}`)
    .send(testdata.role)
    .end((err, res) => {
      res.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('can not find that user');
      done();
    });
});

it('Should  not asign role to user  with wrong Token', done => {
  chai.request(app)
    .patch('/api/v1/admin/roles/assign/1')
    .set('Authorization',`Bearer ${invalidTroken}`)
    .send(testdata.role)
    .end((err, res) => {
      res.should.have.property('status').eql(403);
      res.body.should.have.property('message').eql('you are not authorized to access this page');
      done();
    });
});

});
