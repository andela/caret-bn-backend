import chai from 'chai';
import emailHelper from '../../helpers/emailHelper';

const { expect } = chai;
describe('test Email Sender', () => {
    it('Should Send an email', (done) => {
        try {
            emailHelper.sendEmail('caretDevs@devs.com', 'Testing', 'Dev Test', 'Testing out mail helper');
        } catch (error) {
            expect(error).to.be.null;
        }
        done();
    });

    it('Should Throw an Error', (done) => {
        const response = emailHelper.resetEmail(null, 'anemail@email', 'sjdiojsdoi90we0jnsls');
        expect(response.message).to.be.eql('Cannot read property \'protocol\' of null');
        done();
    });
});
