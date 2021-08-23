import Faker from "faker";
import { define } from "typeorm-seeding";
import { <%= classify(name) %> } from "../entities/<%= lowerCase(name) %>.entity";

define(<%= classify(name) %>, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const name = faker.name.firstName(gender);

  const role = new <%= classify(name) %>();
  role.name = name;
  return role;
});
