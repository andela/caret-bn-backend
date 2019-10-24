const requestData = {
    oneWayTrip: {
        "typeId": 1,
        "locationId": 3,
        "departureDate": "2019-10-30",
        "destinations": [
            {
                "arrivalDate": "2019-10-31",
                "reasons": "Meeting potential comms manager",
                "isFinal": true,
                "locationId": 2,
                "bookingId": 1
            }
        ]
    },

    oneWayTripNoType: {
        "typeId": 5,
        "locationId": 3,
        "departureDate": "2019-10-30",
        "destinations": [
            {
                "arrivalDate": "2019-10-29",
                "departureDate": "2019-10-30",
                "reasons": "Meeting potential comms manager",
                "isFinal": true,
                "locationId": 2,
                "bookingId": 1
            }
        ]
    },

    oneWayTripNoLocation: {
        "typeId": 5,
        "locationId": 60,
        "departureDate": "2019-10-30",
        "destinations": [
            {
                "arrivalDate": "2019-10-29",
                "departureDate": "2019-10-30",
                "reasons": "Meeting potential comms manager",
                "isFinal": true,
                "locationId": 2,
                "bookingId": 1
            }
        ]
    },

    oneWayTripNoLocationInDestination: {
        "typeId": 2,
        "locationId": 3,
        "departureDate": "2019-10-30",
        "returnDate": "2019-11-30",
        "destinations": [
            {
                "arrivalDate": "2019-10-29",
                "departureDate": "2019-10-30",
                "reasons": "Meeting potential comms manager",
                "isFinal": true,
                "locationId": 25,
                "bookingId": 1
            }
        ]
    },


    TripBadDates: {
        "typeId": 3,
        "locationId": 3,
        "departureDate": "2019-10-29",
        "returnDate": "2019-11-15",
        "destinations": [
            {
                "arrivalDate": "2019-11-16",
                "departureDate": "2019-11-29",
                "reasons": "Meeting potential comms manager",
                "isFinal": false,
                "locationId": 2,
                "bookingId": 1
            },
            {
                "arrivalDate": "2019-11-30",
                "departureDate": "2019-12-10",
                "reasons": "Meeting with people",
                "isFinal": true,
                "locationId": 4,
                "bookingId": 7
            }
        ]
    },

    originalLocationTravel: {
        "typeId": 2,
        "locationId": 3,
        "departureDate": "2019-10-29",
        "returnDate": "2019-11-15",
        "destinations": [

            {
                "arrivalDate": "2019-11-30",
                "departureDate": "2019-12-10",
                "reasons": "Meeting with people",
                "isFinal": true,
                "locationId": 3,
                "bookingId": 7
            }
        ]
    },

    returnTrip: {
        "typeId": 2,
        "locationId": 2,
        "departureDate": "2019-11-29",
        "returnDate": "2019-12-30",
        "destinations": [
            {
                "arrivalDate": "2019-11-30",
                "departureDate": "2019-12-29",
                "reasons": "Meeting potential comms manager",
                "isFinal": true,
                "locationId": 4,
                "bookingId": 3
            }
        ]
    },

    returnTripBadDates: {
        "typeId": 2,
        "locationId": 2,
        "departureDate": "2019-10-31",
        "returnDate": "2019-11-10",
        "destinations": [
            {
                "arrivalDate": "2019-11-01",
                "departureDate": "2019-11-09",
                "reasons": "Meeting potential comms manager",
                "isFinal": true,
                "locationId": 4,
                "bookingId": 3
            }
        ]
    },

    multiCityTrip: {
        "typeId": 3,
        "locationId": 2,
        "departureDate": "2019-11-15",
        "returnDate": "2020-02-27",
        "destinations": [
            {
                "arrivalDate": "2019-11-16",
                "departureDate": "2019-11-24",
                "reasons": "Meeting potential comms manager",
                "isFinal": false,
                "locationId": 5,
                "bookingId": 3
            },
            {
                "arrivalDate": "2019-11-25",
                "departureDate": "2020-01-30",
                "reasons": "Meeting with people",
                "isFinal": false,
                "locationId": 3,
                "bookingId": 7
            },
            {
                "arrivalDate": "2020-02-01",
                "departureDate": "2020-02-26",
                "reasons": "Meeting with the democrats",
                "isFinal": true,
                "locationId": 6,
                "bookingId": 6
            }
        ]
    },
    multiCityTripSameBookings: {
        "typeId": 3,
        "locationId": 2,
        "departureDate": "2019-11-15",
        "returnDate": "2020-01-10",
        "destinations": [
            {
                "arrivalDate": "2019-11-16",
                "departureDate": "2019-11-24",
                "reasons": "Meeting potential comms manager",
                "isFinal": false,
                "locationId": 5,
                "bookingId": 3
            },
            {
                "arrivalDate": "2019-11-25",
                "departureDate": "2020-01-30",
                "reasons": "Meeting with people",
                "isFinal": false,
                "locationId": 3,
                "bookingId": 3
            },
            {
                "arrivalDate": "2020-02-01",
                "departureDate": "2020-02-30",
                "reasons": "Meeting with the democrats",
                "isFinal": true,
                "locationId": 6,
                "bookingId": 3
            }
        ]
    },

    multiCityTripSameDest: {
        "typeId": 3,
        "locationId": 2,
        "departureDate": "2019-11-15",
        "returnDate": "2020-01-10",
        "destinations": [
            {
                "arrivalDate": "2019-11-16",
                "departureDate": "2019-11-24",
                "reasons": "Meeting potential comms manager",
                "isFinal": false,
                "locationId": 5,
                "bookingId": 3
            },
            {
                "arrivalDate": "2019-11-25",
                "departureDate": "2020-01-30",
                "reasons": "Meeting with people",
                "isFinal": false,
                "locationId": 5,
                "bookingId": 7
            },
            {
                "arrivalDate": "2020-02-01",
                "departureDate": "2020-02-30",
                "reasons": "Meeting with the democrats",
                "isFinal": true,
                "locationId": 6,
                "bookingId": 6
            }
        ]
    },

    multiCityTripMultipleFinalFlags: {
        "typeId": 3,
        "locationId": 2,
        "departureDate": "2019-11-15",
        "returnDate": "2020-03-01",
        "destinations": [
            {
                "arrivalDate": "2019-11-16",
                "departureDate": "2019-11-24",
                "reasons": "Meeting potential comms manager",
                "isFinal": false,
                "locationId": 5,
                "bookingId": 3
            },
            {
                "arrivalDate": "2019-11-25",
                "departureDate": "2020-01-30",
                "reasons": "Meeting with people",
                "isFinal": true,
                "locationId": 3,
                "bookingId": 7
            },
            {
                "arrivalDate": "2020-02-01",
                "departureDate": "2020-02-30",
                "reasons": "Meeting with the democrats",
                "isFinal": true,
                "locationId": 6,
                "bookingId": 6
            }
        ]
    },

    multiCityTripNoFinalFlags: {
        "typeId": 3,
        "locationId": 2,
        "departureDate": "2019-11-15",
        "returnDate": "2020-03-01",
        "destinations": [
            {
                "arrivalDate": "2019-11-16",
                "departureDate": "2019-11-24",
                "reasons": "Meeting potential comms manager",
                "isFinal": false,
                "locationId": 5,
                "bookingId": 3
            },
            {
                "arrivalDate": "2019-11-25",
                "departureDate": "2020-01-30",
                "reasons": "Meeting with people",
                "isFinal": false,
                "locationId": 3,
                "bookingId": 7
            },
            {
                "arrivalDate": "2020-02-01",
                "departureDate": "2020-02-30",
                "reasons": "Meeting with the democrats",
                "isFinal": false,
                "locationId": 6,
                "bookingId": 6
            }
        ]
    },

    multiCityTripPreceedingDates: {
        "typeId": 3,
        "locationId": 2,
        "departureDate": "2019-11-15",
        "returnDate": "2020-01-10",
        "destinations": [
            {
                "arrivalDate": "2019-11-16",
                "departureDate": "2019-11-24",
                "reasons": "Meeting potential comms manager",
                "isFinal": false,
                "locationId": 5,
                "bookingId": 3
            },
            {
                "arrivalDate": "2019-11-25",
                "departureDate": "2020-01-30",
                "reasons": "Meeting with people",
                "isFinal": false,
                "locationId": 3,
                "bookingId": 7
            },
            {
                "arrivalDate": "2020-01-29",
                "departureDate": "2020-02-30",
                "reasons": "Meeting with the democrats",
                "isFinal": false,
                "locationId": 6,
                "bookingId": 6
            }
        ]
    },

    multiCityTripOneDestination: {
        "typeId": 3,
        "locationId": 2,
        "departureDate": "2019-11-15",
        "returnDate": "2020-01-10",
        "destinations": [
            {
                "arrivalDate": "2019-11-16",
                "departureDate": "2019-11-24",
                "reasons": "Meeting potential comms manager",
                "isFinal": false,
                "locationId": 5,
                "bookingId": 3
            }
        ]
    },

    returnTripNoReturnDate: {
        "typeId": 2,
        "locationId": 2,
        "departureDate": "2020-03-01",
        "destinations": [
            {
                "arrivalDate": "2020-03-02",
                "departureDate": "2020-03-10",
                "reasons": "Meeting potential comms manager",
                "isFinal": true,
                "locationId": 4,
                "bookingId": 3
            }
        ]
    },
};
export default requestData;
