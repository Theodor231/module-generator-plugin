import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from 'src/modules/users/entities/user.entity';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const name = faker.name.firstName(gender);

  const user = new User();
  user.name = name;
  user.email = `${faker.name.firstName()}@mail.ru`;
  user.password = '1111111';
  return user;
});
