import chai from 'chai';
import emailHelper from '../../helpers/emailHelper'
// emailHelper.sendVerification(req, user.email, token, host, user.username);

const { expect } = chai;
describe('test Email verification', () => {
  
    it('Should Send an email to verify user', (done) => {
        try {
            emailHelper.sendVerification('caretDevs@devs.com', 'Testing', 'Dev Test');
        } catch (error) {
            expect(error).to.be.null;
        }
        done();
    });

    it('Should Send an email to verify with host', (done) => {
      try {
        emailHelper.sendVerification('caretDevs@devs.com', 'Testing', 'Dev Test','localhost:3000');
      } catch (error) {
          expect(error).to.be.null;
      }
      done();
  });
});
