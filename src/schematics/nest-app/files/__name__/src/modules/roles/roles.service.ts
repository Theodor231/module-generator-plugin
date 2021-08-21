import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository, ILike } from "typeorm";
import { Role } from "./entities/role.entity";
import permissions from "src/services/permissions";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
    private connection: Connection
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.repository.create(createRoleDto);
    try {
      await this.repository.save(role);
      await this.addPermissions(role.alias);
    } catch (e) {
      console.log(e);
    }

    return role;
  }

  async findAll(query): Promise<any> {
    const take = query.per_page;
    const skip = (Number(query.page) - 1) * take || 0;

    const where = {} as any;
    const filter = JSON.parse(query.filter);

    if (filter.name) {
      where.name = ILike(`%${filter.name.toLowerCase()}%`);
    }

    if (filter.alias) {
      where.alias = ILike(`%${filter.alias}%`);
    }

    if (filter.guard) {
      where.guard = ILike(`%${filter.guard}%`);
    }

    const [result, total] = await this.repository.findAndCount({
      take: take,
      skip: skip,
      where,
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

  findOne(id: number) {
    try {
      return this.repository.findOne(+id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async list() {
    const items = await this.repository.find();
    return items.map((item: any) => ({ value: item.id, text: item.alias }));
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return this.repository.update(id, updateRoleDto);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  remove(id: number) {
    try {
      return this.repository.delete(id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async addPermissions(role: string): Promise<void> {
    const repository = this.connection.getRepository("permissions");

    for (const permission in permissions.guest) {
      const entity = permissions.guest;
      for (const action in entity[permission]) {
        const record: any = await repository.findOne({
          where: { module: permission, role: role, action },
        });
        const newRecord = {
          action,
          module: permission,
          levels: entity[permission][action].levels,
          access: entity[permission][action].access,
          role: role,
          fields: entity[permission][action].fields,
        };

        if (!record) {
          await repository.save(newRecord);
        }
      }
    }
  }
}
