import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Role } from 'src/modules/roles/entities/role.entity';

define(Role, (faker: typeof Faker) => {
  const name = faker.name.firstName();

  const role = new Role();
  role.name = name;
  role.alias = name.toLowerCase();
  role.guard = 'api';
  return role;
});
