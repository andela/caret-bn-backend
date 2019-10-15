import models from './../../../database/models/index';

const requestsModel = (userId) => {
    return models.requests.build({
        typeId: 1,
        userId,
        locationId: 5,
        statusId: 1
    });
}

const destinationsModel = (requestId) => {
    return models.destinations.build({
        locationId: 1,
        accomodationId: 1,
        arrivalDate: '2019-10-25',
        departureDate: '2019-11-10',
        requestId,
        reasons: 'Road Trip',
        isFinal: true
    });
}


module.exports = {
    requestsModel, destinationsModel
}