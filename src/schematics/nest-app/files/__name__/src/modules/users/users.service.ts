import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, Connection } from "typeorm";
import { User } from "./entities/user.entity";
import { deleteFile } from "../../helpers/files-utils";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private connection: Connection,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.repository.create(createUserDto);
      return await this.repository.save(user);
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.repository.findOneOrFail(id);
      delete user.password;
      return user;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async findAll(query): Promise<any> {
    const take = query.per_page || 10;
    const skip = (Number(query.page) - 1) * take || 0;

    const where = {} as any;
    let filter = { } as any
    let order = { id: 1 } as any

    if (query.filter) {
      filter = JSON.parse(query.filter);

      if (filter.name) {
        where.name = ILike(`%${filter.name.toLowerCase()}%`);
      }

      if (filter.email) {
        where.email = ILike(`%${filter.email.toLowerCase()}%`);
      }

      if (filter.roleId) {
        where.roleId = filter.roleId;
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

    let headers = this.connection
    .getMetadata(User)
    .ownColumns.map((column) => column.propertyName);

  headers = (headers as any).map((item: string) => ({
    value: item,
    text: item.toUpperCase(),
  }));

    return {
      headers,
      total,
      items: result,
      page: query.page,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const item: any = await this.repository.findOne(+id);
      if (item.avatar) {
        await deleteFile(item.avatar.path);
      }
      await this.repository.update(
        +id,
        JSON.parse(JSON.stringify(updateUserDto))
      );
      return this.repository.findOne(id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async remove(id: number) {
    try {
      const item: any = await this.repository.findOneOrFail(+id);
      if (item.avatar) {
        await deleteFile(item.avatar.path);
      }
      await this.repository.delete(id);
      return true;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
