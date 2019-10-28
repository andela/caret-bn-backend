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
	typeId: 1,
	locationId: 1,
	
	destinations: [
		{
			id: 1,
			reasons: 'visit andela'
		}
		
		]
}

describe('update trip request', () =>{
      it('should edit his/her trip request', (done) => {
        chai.request(app)
        .patch('/api/v1/requests/2')
        .set('Authorization', `Bearer ${token}`)
        .send(newRequest)
        .end((err, res) => {
            res.should.have.property('status').eql(200);
            res.body.should.have.property('message').eql('Request Updated');
        done();
        });
    });
});