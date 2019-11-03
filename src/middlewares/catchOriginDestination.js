import { Op } from 'sequelize';
import findLocation from '../helpers/findLocation';

const catchProperty = async (req, property) => {
  if (Object.keys(req.body).includes(property)) {
    const array = [];
    const locations = await findLocation({ name: { [Op.iLike]: `%${req.body[property]}%` }, });

    locations.forEach(location => {
      array.push(location.id);
    });

    req.body[property] = array;
  }
};

const catchOriginDestination = async (req, res, next) => {
  await catchProperty(req, 'origin');
  await catchProperty(req, 'destination');
  return next();
};

export default catchOriginDestination;
