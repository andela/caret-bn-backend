import chai from 'chai';
import { sendEmail, resetEmail } from '../../helpers/emailHelper';

const { expect } = chai;
describe('test Email Sender', () => {
    it('Should Send an email', (done) => {
        try {
            sendEmail('caretDevs@devs.com', 'Testing', 'Dev Test', 'Testing out mail helper');
        } catch (error) {
            expect(error).to.be.null;
        }
        done();
    });

    it('Should Throw an Error', (done) => {
        const response = resetEmail(null, 'anemail@email', 'sjdiojsdoi90we0jnsls');
        expect(response.message).to.be.eql('Cannot read property \'protocol\' of null');
        done();
    });
});
