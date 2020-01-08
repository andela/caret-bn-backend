import chai from 'chai';
import { resetEmail } from '../../helpers/emailHelper'

const { expect } = chai;
describe('test Email Sender for rest password', () => {
  
    it('Should Send an email to reset password', (done) => {
        try {
            resetEmail('caretDevs@devs.com', 'Testing', 'Dev Test');
        } catch (error) {
            expect(error).to.be.null;
        }
        done();
    });

    it('Should Send an email to reset password with host', (done) => {
      try {
          resetEmail('caretDevs@devs.com', 'Testing', 'Dev Test','localhost:3000');
      } catch (error) {
          expect(error).to.be.null;
      }
      done();
  });
});
