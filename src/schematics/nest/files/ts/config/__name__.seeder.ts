import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { <%= classify(name) %> } from '../entities/<%= lowerCase(name) %>.entity';

export default class Create<%= classify(name) %> implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(<%= classify(name) %>)().createMany(10);
  }
}
