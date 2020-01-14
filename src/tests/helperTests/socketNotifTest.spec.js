import chai from 'chai';
// import { io } from '../../index';
import socketNotif from '../../helpers/socketNotif';
import socketIo from 'socket.io';

const { expect } = chai;
describe('Socket Notif Test', () => {
    it('Should emit to all', (done) => {
        socketNotif(undefined, {}, {'1': ['jhjhjh', 'mnjhj']}, {to: () => {}, emit: () => {}, });
        done();
    });
});
