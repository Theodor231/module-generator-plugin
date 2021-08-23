import Faker from "faker";
import { define } from "typeorm-seeding";
import { Role } from "src/modules/roles/entities/role.entity";

define(Role, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const name = faker.name.firstName(gender);

  const role = new Role();
  role.name = name;
  role.alias = name.toLowerCase();
  role.guard = "api";
  return role;
});
