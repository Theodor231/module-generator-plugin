import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { User } from "src/modules/users/entities/user.entity";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    try {
      await factory(User)().create({
        name: "Admin",
        email: "admin@gmail.com",
        password: "12345678",
        roleId: 1,
      });
    } catch (e) {
      console.log(e);
    }
    await factory(User)().createMany(10);
  }
}
