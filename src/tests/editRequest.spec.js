import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import app from '../index';
import mockdata from './mockData/mockData';
import generateToken from '../utils/generateToken';

const token = generateToken(mockdata.verifiedUser1);

chai.should();
chai.use(chaiHttp);

const id = mockdata.verifiedUser1.id;
const newRequest = {
	locationId: 1,
	destinations: [
		{
			id: 8,
			reasons: 'visit andela'
		}
		]
}
const newRequest1 = {
	locationId: 1,
	destinations: [
		{
			id: 82222,
			reasons: 'visit andela'
		}
		]
}
const newRequest2 = {
	locationId: 1,
	destinations: [
		]
}

describe('update trip request', () =>{
      it('should edit his/her trip request', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/6')
        .set('Authorization', `Bearer ${token}`)
        .send(newRequest)
        .end((err, res) => {
            res.should.have.property('status').eql(200);
        done();
        });
        
    });
      it('destinations must contain at least 1 items', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/6')
        .set('Authorization', `Bearer ${token}`)
        .send(newRequest2)
        .end((err, res) => {
            res.should.have.property('status').eql(400);
        done();
        });
        
    });
    it('should edit not edit others trip request', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/4')
        .set('Authorization', `Bearer ${token}`)
        .send(newRequest)
        .end((err, res) => {
            res.should.have.property('status').eql(400);
        done();
        });
        
    });
    it('should not edit trip request with wrong destination', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/6')
        .set('Authorization', `Bearer ${token}`)
        .send(newRequest1)
        
        
        .end((err, res) => {
            res.should.have.property('status').eql(403);
        done();
        });
        
    });
});