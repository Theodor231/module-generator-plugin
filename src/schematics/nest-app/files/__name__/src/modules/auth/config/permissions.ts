const resource = 'auth';

export default {
  admin: {
    [resource]: {
      findAll: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
      create: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
      findOne: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
      list: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
      update: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
      remove: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
    },
  },
  guest: {
    [resource]: {
      findAll: {
        access: false,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
      create: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
      findOne: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
      list: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
      update: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
      remove: {
        access: true,
        fields: [],
        levels: 'all',
        availableFields: ['id', 'name'],
      },
    },
  },
};
