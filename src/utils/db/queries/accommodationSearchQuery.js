/* eslint-disable indent */
import { Op } from 'sequelize';
import models from '../../../database/models';

export default queryParams => ({
    where: {
        ...queryParams.name && {
            name: {
                [Op.iLike]: `%${queryParams.name.trim()}%`
            }
        },
        ...queryParams.description && {
            description: {
                [Op.iLike]: `%${queryParams.description.trim()}%`
            }
        }
    },
    include: [
        {
            model: models.locations,
            as: 'accommodationLocation',
            where: {
                ...queryParams.location && {
                    name: {
                        [Op.iLike]: `%${queryParams.location.trim()}%`
                    }
                }
            },
            attributes: [
                'id', 'name'
            ]
        }
    ]
});
