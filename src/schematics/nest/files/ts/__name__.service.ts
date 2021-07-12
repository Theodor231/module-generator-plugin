import { Injectable } from '@nestjs/common';
import { Create<%= classify(name) %>Dto } from './dto/create-<%= lowerCase(name) %>.dto';
import { Update<%= classify(name) %>Dto } from './dto/update-<%= lowerCase(name) %>.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';

@Injectable()
export class <%= classify(name) %>Service {
  constructor(
    @InjectRepository(<%= classify(name) %>)
    private repository: Repository<<%= classify(name) %>>,
  ) {}
  create(create<%= classify(name) %>Dto: Create<%= classify(name) %>Dto) {
    const <%= lowerCase(name) %> = this.repository.create(create<%= classify(name) %>Dto);
    return this.repository.save(<%= lowerCase(name) %>);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async findAll(query): Promise<any> {
    const take = query.per_page || 10;
    const skip = (Number(query.page) - 1) * take || 0;

    const where = {} as any;
    const filter = JSON.parse(query.filter);

    if (filter.name) {
      where.name = ILike(`%${filter.name.toLowerCase()}%`);
    }

    const [result, total] = await this.repository.findAndCount({
      take: take,
      skip: skip,
      where
    });

    const headers = [
      { value: 'id', text: 'ID' },
      { value: 'name', text: 'Name' }
    ];

    return {
      headers,
      total,
      items: result,
      page: query.page,
    };
  }

  async update(id: number, update<%= classify(name) %>Dto: Update<%= classify(name) %>Dto) {
    const item: any = await this.repository.findOne(+id);
    await this.repository.update(
      +id,
      JSON.parse(JSON.stringify(update<%= classify(name) %>Dto)),
    );
    return this.repository.findOne(id);
  }

  async remove(id: number) {
     return await this.repository.delete(id);
   }
}
