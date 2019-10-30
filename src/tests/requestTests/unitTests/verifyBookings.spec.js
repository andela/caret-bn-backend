import bookingVerification from '../../../middlewares/requests/bookingsVerification';
import chai from 'chai';

const { expect } = chai;
const destinations = [
    {
        id: 1,
        bookingId: 1,
    },
    {
        id: 2,
        bookingId: 1,
    },
    {
        id: 3,
        bookingId: 3,
    }
]
const destinations2 = [
    {
        id: 1,
        bookingId: 1,
    },
    {
        id: 2,
        bookingId: 2,
    },
    {
        id: 3,
        bookingId: 3,
    }
]
const destinations3 = [
    {
        id: 1,
        bookingId: 1,
    },
    {
        id: 2,
        bookingId: 2,
    },
    {
        id: 3,
        bookingId: 3,
    }
]

describe('Test bookingsVerification', () => {
    it('Should Reject Destinations that have multiple bookings', async () => {
        try {
            await bookingVerification.checkMultiple(destinations)
        } catch (err) {
            expect(err.message).to.be.eql('You have 2 destinations with the same booking');
        }
    });


    it('Should Reject with no bookings', async () => {
        try {
            await bookingVerification.checkOwnership(destinations2, 15)
        } catch (err) {
            expect(err.message).to.be.eql('You have no registered bookings');
        }
    });


    it('Should Reject with no bookings belonging to the user', async () => {
        try {
            await bookingVerification.checkOwnership(destinations3, 3)
        } catch (err) {
            expect(err.message).to.be.eql('Please verify your booking.');
        }
    });




});