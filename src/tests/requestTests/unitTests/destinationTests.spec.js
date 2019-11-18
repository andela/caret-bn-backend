import destinationVerification from "../../../middlewares/requests/destinationVerification";
import locationVerification from "../../../middlewares/requests/locationVerification";
import chai from "chai";

const { expect } = chai;
const destinations = [
  {
    id: 1,
    isFinal: false
  },
  {
    id: 2,
    isFinal: true
  },
  {
    id: 3,
    isFinal: false
  }
];
const destinations2 = [
  {
    id: 1,
    locationId: 1000
  },
  {
    id: 2,
    locationId: 1000
  },
  {
    id: 3,
    locationId: 1000
  }
];

describe("Test destinationVerification", () => {
  it("Should reject destination isFinal if no last destination", async () => {
    try {
      await destinationVerification.verify(destinations);
    } catch (err) {
      expect(err.message).to.be.eql(
        "You need to set your final destination as final."
      );
    }
  });
});

describe("Test locationVerification", () => {
  it("Should reject destination isFinal if location does not exist", async () => {
    try {
      await locationVerification.verifyDestinations(destinations2);
    } catch (err) {
      expect(err.message).to.be.eql("Location does not exist on the system.");
    }
  });
});
