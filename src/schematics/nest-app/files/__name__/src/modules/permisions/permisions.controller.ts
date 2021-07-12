import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermisionsService } from './permisions.service';
import { CreatePermisionDto } from './dto/create-permision.dto';
import { UpdatePermisionDto } from './dto/update-permision.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Permissions')
@Controller('permissions')
export class PermisionsController {
  constructor(private readonly permissionsService: PermisionsService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermisionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get(':role')
  findAll(@Param('role') role) {
    return this.permissionsService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch()
  update(@Body() updatePermissionDto: UpdatePermisionDto[]) {
    return this.permissionsService.update(updatePermissionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
