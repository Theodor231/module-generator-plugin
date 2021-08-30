import { Injectable } from '@nestjs/common';
import { Create<%= classify(name) %>Dto } from './dto/create-<%= lowerCase(name) %>.dto';
import { Update<%= classify(name) %>Dto } from './dto/update-<%= lowerCase(name) %>.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';
import { UnprocessableEntityException } from '@nestjs/common';

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

  async findOne(id: number) {
    try {
      return await this.repository.findOneOrFail(id);
    } catch (e) {
      throw new UnprocessableEntityException(e)
    }
  }

  async findAll(query): Promise<any> {
    try {
      const take = query.per_page || 10;
      const skip = (Number(query.page) - 1) * take || 0;
  
      const where = {} as any;
      let filter = {} as any;
      let order = {} as any;

      if (query.filter)   {
        filter = JSON.parse(query.filter);

        if (filter.name) {
          where.name = ILike(`%${filter.name.toLowerCase()}%`);
        }

        if (query.order) {
          order = JSON.parse(query.order);
        }
      }
  
      const [result, total] = await this.repository.findAndCount({
        take,
        skip,
        where,
        order,
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
    } catch (e) {
      throw new UnprocessableEntityException(e)
    }
    
  }

  async update(id: number, update<%= classify(name) %>Dto: Update<%= classify(name) %>Dto) {
    try {
      const item: any = await this.repository.findOneOrFail(+id);
      await this.repository.update(
        +id,
        JSON.parse(JSON.stringify(update<%= classify(name) %>Dto)),
      );
      return this.repository.findOne(id);
    } catch (e) {
      throw new UnprocessableEntityException(e)
    }
  }

  async remove(id: number) {
    try {
      return await this.repository.delete(id);
    } catch (e) {
      throw new UnprocessableEntityException(e)
    }
     
   }
}
