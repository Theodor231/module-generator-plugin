import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermisionDto } from './dto/create-permision.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/modules/permisions/entities/permision.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermisionsService {
  constructor(
    @InjectRepository(Permission)
    private repository: Repository<Permission>,
  ) {}
  create(createPermisionDto: CreatePermisionDto) {
    return 'This action adds a new permision';
  }

  async findAll(role: string) {
    const items = await this.repository.find({ where: { role } });
    const response = [] as any;

    for (const item of items) {
      if (!response.some((el: any) => el.module === item.module)) {
        response.push({
          module: item.module,
          items: items.filter((el: any) => el.module === item.module),
        });
      }
    }
    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} permision`;
  }

  async update(updatePermisionDto: Array<any>) {
    for (const item of updatePermisionDto) {
      item.items.forEach((el: any) => {
        this.repository.update(el.id, el);
      });
    }

    return HttpStatus.OK;
  }

  remove(id: number) {
    return `This action removes a #${id} permision`;
  }
}
