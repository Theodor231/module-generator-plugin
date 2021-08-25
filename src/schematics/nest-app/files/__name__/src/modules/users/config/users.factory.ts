import Faker from "faker";
import { define, factory } from "typeorm-seeding";
import { User } from "src/modules/users/entities/user.entity";

define(User, (faker: typeof Faker) => {
  const name = faker.name.firstName();

  const user = new User();
  user.name = name;
  user.email = faker.internet.email(name.toLowerCase());
  user.password = "1111111";
  user.roleId = faker.random.number({
    min: 1,
    max: 3,
  });
  user.avatar = `{url: ${faker.image.imageUrl(300, 300)} }`
  return user;
});
