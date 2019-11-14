import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import mockData from './mockData/mockData';
import strings from '../utils/stringsUtil';

chai.should();
chai.use(chaiHttp);

let userToken;

let id = 2;
let id1 = 4;

describe('Like and Unlike Accommodation Test', () => {
    it('it should log in a supplier User', done => {
      chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.verifiedUser4)
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
    });
    it('it should create a new like', done => {
        chai.request(app)
        .post(`/api/v1/accommodations/${id}/like`)
          .set('Authorization', `Bearer ${userToken}`)
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
      it('it should create a new unlike', done => {
        chai.request(app)
        .post(`/api/v1/accommodations/${id1}/unlike`)
          .set('Authorization', `Bearer ${userToken}`)
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
      it('it should dislike accommodation', done => {
        chai.request(app)
        .post(`/api/v1/accommodations/${id}/unlike`)
          .set('Authorization', `Bearer ${userToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
      it('it should like back', done => {
        chai.request(app)
        .post(`/api/v1/accommodations/${id}/like`)
          .set('Authorization', `Bearer ${userToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
      it('Should not like when accommodation ID does not exist', done => {
        chai.request(app)
        .post('/api/v1/accommodations/19090/like')
          .set('Authorization', `Bearer ${userToken}`)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
        });
        it('it should not like when ID is not integer', done => {
            chai.request(app)
            .post('/api/v1/accommodations/id/like')
              .set('Authorization', `Bearer ${userToken}`)
              .end((err, res) => {
                res.should.have.status(400);
                done();
              });
          });
});