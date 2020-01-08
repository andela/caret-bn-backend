import chai from 'chai';
import { sendVerification } from '../../helpers/emailHelper'

const { expect } = chai;
describe('test Email verification', () => {
  
    it('Should Send an email to verify user', (done) => {
        try {
            sendVerification('caretDevs@devs.com', 'Testing', 'Dev Test');
        } catch (error) {
            expect(error).to.be.null;
        }
        done();
    });

    it('Should Send an email to verify with host', (done) => {
      try {
        sendVerification('caretDevs@devs.com', 'Testing', 'Dev Test','localhost:3000');
      } catch (error) {
          expect(error).to.be.null;
      }
      done();
  });
});
