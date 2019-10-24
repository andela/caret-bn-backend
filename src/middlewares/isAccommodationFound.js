import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';
import models from '../database/models';

const isAccommodationFound = (req, res, next) => {
  const { id } = req.params;
  const accommodationId = parseInt(id, 10);

  models.accommodations.findOne({
    where: {
      id: accommodationId,
    },
    include: [{ // Notice include takes an ARRAY
      model: models.users,
      as: 'ownerUser',
    }],
  }).then(accommodation => {
    if (!accommodation) {
      return responseError(res, 404, strings.accommodations.error.ACCOMMODATION_NOT_FOUND);
    }
    const {
      // eslint-disable-next-line max-len
      id, name, description, locationId, availableSpace, cost, currency, highlights, amenities, owner, images, createdAt, updatedAt
    } = accommodation;
    let { ownerUser } = accommodation;
    ownerUser = { id: ownerUser.id, username: ownerUser.username, email: ownerUser.email };
    const accommodationData = {
      // eslint-disable-next-line max-len
      id, name, description, locationId, availableSpace, cost, currency, highlights, amenities, owner, images, createdAt, updatedAt, ownerUser
    };
    req.accommodation = accommodationData;
    return next();
  });
};

export default isAccommodationFound;
