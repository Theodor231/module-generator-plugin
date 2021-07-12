import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= lowerCase(name) %>.service';
import { Create<%= classify(name) %>Dto } from './dto/create-<%= lowerCase(name) %>.dto';
import { Update<%= classify(name) %>Dto } from './dto/update-<%= lowerCase(name) %>.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('<%= classify(name) %>')
@Controller('<%= lowerCase(name) %>')
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= lowerCase(name) %>Service: <%= classify(name) %>Service) {}

  @ApiOperation({ summary: 'create <%= lowerCase(name) %>' })
  @ApiResponse({ status: 201, type: <%= classify(name) %> })
  @Post()
  create(@Body() create<%= classify(name) %>Dto: Create<%= classify(name) %>Dto) {
        return this.<%= lowerCase(name) %>Service.create(create<%= classify(name) %>Dto);
  }

  @ApiOperation({ summary: 'Get all <%= lowerCase(name) %>' })
  @ApiResponse({ status: 200, type: [<%= classify(name) %>] })
  @Get()
  async findAll(@Query() query): Promise<Pagination<<%= classify(name) %>>> {
    return this.<%= lowerCase(name) %>Service.findAll(query);
  }

  @ApiOperation({ summary: 'Get <%= lowerCase(name) %>' })
  @ApiResponse({ status: 200, type: <%= classify(name) %> })
  @Get(':id/edit')
  findOne(@Param('id') id: string) {
    return this.<%= lowerCase(name) %>Service.findOne(+id);
  }

  @ApiOperation({ summary: 'Update <%= lowerCase(name) %>' })
  @ApiResponse({ status: 200, type: <%= classify(name) %> })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() update<%= classify(name) %>Dto: Update<%= classify(name) %>Dto,
  ) {
    return this.<%= lowerCase(name) %>Service.update(+id, update<%= classify(name) %>Dto);
  }

  @ApiOperation({ summary: 'Remove <%= lowerCase(name) %>' })
  @ApiResponse({ status: 200, type: <%= classify(name) %> })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.<%= lowerCase(name) %>Service.remove(+id);
  }
}