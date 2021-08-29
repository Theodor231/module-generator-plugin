import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository, ILike } from "typeorm";
import { Role } from "./entities/role.entity";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
    private connection: Connection
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.repository.create(createRoleDto);
      await this.repository.save(role);
      return role;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(query): Promise<any> {
    const take = query.per_page;
    const skip = (Number(query.page) - 1) * take || 0;

    const where = {} as any;
    let filter = {} as any;
    let order = { id: 1 } as any;

    if (query.filter) {
      filter = JSON.parse(query.filter);

      if (filter.name) {
        where.name = ILike(`%${filter.name.toLowerCase()}%`);
      }

      if (filter.alias) {
        where.alias = ILike(`%${filter.alias}%`);
      }

      if (filter.guard) {
        where.guard = ILike(`%${filter.guard}%`);
      }
    }

    if (query.order) {
      order = JSON.parse(query.order);
    }

    const [result, total] = await this.repository.findAndCount({
      take,
      skip,
      where,
      order,
    });

    const headers = [
      { value: "id", text: "ID" },
      { value: "name", text: "Name " },
      { value: "alias", text: "Alias" },
      { value: "guard", text: "Guard" },
    ];

    return {
      headers,
      total,
      items: result,
      page: query.page,
    };
  }

  async findOne(id: number) {
    try {
      return await this.repository.findOne(+id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async list() {
    try {
      const items = await this.repository.find();
      return items.map((item: any) => ({ value: item.id, text: item.alias }));
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.repository.update(id, updateRoleDto);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async remove(id: number) {
    try {
      return await this.repository.delete(id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
