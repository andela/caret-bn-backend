import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import generateToken from '../utils/generateToken';
import mockData from './mockData/mockData';

chai.should();
chai.use(chaiHttp);

const userToken = generateToken(mockData.requester);
const wrongToken = 'token'

describe("Chat tests", ()=> {
    
    it('it should tell the user that the chat history is empty', done => {
        chai.request(app)
          .get('/api/v1/chats')
          .set('Authorization', `Bearer ${userToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
    it('it should view all chats', done => {
        chai.request(app)
          .get('/api/v1/chats')
          .set('Authorization', `Bearer ${userToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
    it('it should reject an invalid token', done => {
      chai.request(app)
        .get('/api/v1/chats')
        .set('Authorization', `Bearer ${wrongToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
      });
    it('it should reject a missing token', done => {
      chai.request(app)
        .get('/api/v1/chats')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
      });
});