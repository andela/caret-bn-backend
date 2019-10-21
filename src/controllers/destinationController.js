import destinationServices from '../services/requestServices/destinationServices';

export default class destinationController {
  static async storeDestination({ destinations }, requestId) {
    const destinationsArray = [];

    destinations.forEach(async destination => {
      const newDestination = await destinationServices.createDestination(destination, requestId);
      destinationsArray.push(newDestination);
    });

    return destinationsArray;
  }
}
