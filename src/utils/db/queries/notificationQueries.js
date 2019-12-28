/* eslint-disable import/prefer-default-export */
import models from '../../../database/models/index';

export const userNotidicationQuery = userId => {
  const query = {
    where:
        {
          userNotified: userId
        },
    attributes: [
      'id', 'entity', 'entityId', 'activity', 'isRead', 'createdAt', 'timestamp', 'updatedAt'
    ],
    include: [
      {
        model: models.users,
        as: 'notifiedUser',
        attributes: [
          'id', 'email', 'username'
        ]
      }
    ]
  };

  return query;
};
