import auth from 'src/modules/auth/config/permissions';
import permissions from 'src/modules/permisions/config/permissions';
import roles from 'src/modules/roles/config/permissions';
import users from 'src/modules/users/config/permissions';

export default {
  admin: {
    ...auth.admin,
    ...permissions.admin,
    ...roles.admin,
    ...users.admin,
  },
  guest: {
    ...auth.guest,
    ...permissions.guest,
    ...roles.guest,
    ...users.guest,
  },
};
