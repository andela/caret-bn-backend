import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import mockdata from './mockData/mockData';
import generateToken from '../utils/generateToken';
import string from '../utils/stringsUtil';

const token = generateToken(mockdata.verifiedUser);

chai.should();
chai.use(chaiHttp);

const email = mockdata.verifiedUser.email;
let newEmail;
let malformedToken;

const newProfile = {
    language: 'Spanish',
  };

describe('Profile Test Suite', () => {
    it('Should edit Profile Page Settings', (done) => {
        chai.request(app)
            .patch(`/api/v1/users/profile/${email}`)
            .set('Authorization', `Bearer ${token}`)
            .send(newProfile)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(`${string.users.success.SUCCESS_UPDATE}`);
                done();
            });
    });
    it('Should return 400 when gender is not female or male', (done) => {
        chai.request(app)
            .patch(`/api/v1/users/profile/${email}`)
            .set('Authorization', `Bearer ${token}`)
            .send(mockdata.fakeGender)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should return 400 if email is not the some of token', (done) => {
        chai.request(app)
            .patch(`/api/v1/users/profile/${newEmail}`)
            .set('Authorization', `Bearer ${token}`)
            .send(newProfile)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('should not accept malformed', (done) => {
        chai.request(app)
            .patch(`/api/v1/users/profile/${email}`)
            .set('Authorization', `Bearer ${malformedToken}`)
            .send(newProfile)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('should get a specific user', (done) => {
        chai.request(app)
            .get(`/api/v1/users/profile/${email}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('should return 400 if email is not the some of token', (done) => {
        chai.request(app)
           .get(`/api/v1/users/profile/${newEmail}`)
           .set('Authorization', `Bearer ${token}`)
           .end((err, res) => {
               console.log(res.body)
               res.should.have.status(400);
               done();
           });
    });
});
