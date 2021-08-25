import Faker from "faker";
import { define } from "typeorm-seeding";
import { <%= classify(name) %> } from "../entities/<%= lowerCase(name) %>.entity";

define(<%= classify(name) %>, (faker: typeof Faker) => {
  const name = faker.name.firstName();

  const item = new <%= classify(name) %>();
  item.name = name;
  return item;
});
