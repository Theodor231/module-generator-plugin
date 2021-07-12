import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  Header,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { SaveFile } from '../../helpers/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  @SaveFile('avatar', 'users')
  create(@UploadedFile() file, @Body() createUserDto: CreateUserDto) {
    if (file) {
      createUserDto.avatar = {
        ...file,
        url: `${process.env.server_url}/${file.path}`,
      };
    }
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, type: [User] })
  @Header('action', 'index')
  @Get()
  async findAll(@Query() query): Promise<Pagination<User>> {
    return this.usersService.findAll(query);
  }

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id/edit')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update users' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':id')
  @SaveFile('avatar', 'users')
  async update(
    @UploadedFile() file,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (file) {
      updateUserDto.avatar = {
        ...file,
        url: `${process.env.server_url}/${file.path}`,
      };
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Remove users' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
