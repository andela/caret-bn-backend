import chai from 'chai';
import decodeToken from '../../middlewares/auth/decodeToken';
import generateToken from '../../utils/generateToken';
import mockData from '../mockData/mockData';


const { expect } = chai;
describe('Decode Token test', () => {
    it('Should decode the token', (done) => {
        try {
            decodeToken(generateToken(mockData.verifiedUser1));
        } catch (error) {
            expect(error).to.be.null;
        }
        done();
    });

    it('Should not decode the token', (done) => {
        try {
            decodeToken('malformed token');
        } catch (error) {
          console.log('error ===>', error);
            expect(error).to.be.an('object');;
        }
        done();
    });
});
