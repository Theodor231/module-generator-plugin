import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Role } from 'src/modules/roles/entities/role.entity';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Role)().create({ name: 'Admin', alias: 'admin' });
    await factory(Role)().create({ name: 'Guest', alias: 'guest' });
    await factory(Role)().create({ name: 'Specialist', alias: 'specialist' });
  }
}
