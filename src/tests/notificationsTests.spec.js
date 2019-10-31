import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import app from '../index';
import mockData from './mockData/mockData';


chai.should();
chai.use(chaiHttp);

let userToken;
let anotherToken;

describe('Notifications Tests', () => {
  before(done => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.registeredUser)
      .end((err, res) => {
        userToken = res.body.data.token;
      });
    chai.request(app)
      .post('/api/v1/users/login')
      .send(mockData.verifiedUser)
      .end((err, res) => {
        anotherToken = res.body.data.token;
        done();
      });
  });

  // Mark notifications
  it('Should mark a notification as read', done => {
    chai.request(app)
      .patch('/api/v1/notifications/3/mark')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql(`This notification status has been marked as 'read'`);
        done();
      });
  });

  it('Should rmark a notification as unread', done => {
    chai.request(app)
      .patch('/api/v1/notifications/3/mark')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql(`This notification status has been marked as 'unread'`);
        done();
      });
  });

  // Get notifications
  it('Should get all notifications', done => {
    chai.request(app)
      .get('/api/v1/notifications/')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {        
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should get one notification', done => {
    chai.request(app)
      .get('/api/v1/notifications/3/')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should not get one notification', done => {
    chai.request(app)
      .get('/api/v1/notifications/1/')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        done();
      });
  });

  // Acivate/Deactivate Email Notifications
  it('Should deactivate email notifications', done => {
    chai.request(app)
      .patch('/api/v1/users/email-notification')
      .set('Authorization', `Bearer ${anotherToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Email Notifcation Deactivated');
        done();
      });
  });

  it('Should activate email notifications', done => {
    chai.request(app)
      .patch('/api/v1/users/email-notification')
      .set('Authorization', `Bearer ${anotherToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Email Notifcation Activated');
        done();
      });
  });

  // Acivate/Deactivate App Notifications
  it('Should deactivate App notifications', done => {
    chai.request(app)
      .patch('/api/v1/users/app-notification')
      .set('Authorization', `Bearer ${anotherToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('App Notifcation Deactivated');
        done();
      });
  });

  it('Should activate App notifications', done => {
    chai.request(app)
      .patch('/api/v1/users/app-notification')
      .set('Authorization', `Bearer ${anotherToken}`)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('App Notifcation Activated');
        done();
      });
  });
});
