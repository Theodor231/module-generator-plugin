import { Module } from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= lowerCase(name) %>.service';
import { <%= classify(name) %>Controller } from './<%= lowerCase(name) %>.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';

@Module({
  imports: [TypeOrmModule.forFeature([<%= classify(name) %>])],
  controllers: [<%= classify(name) %>Controller],
  providers: [<%= classify(name) %>Service],
  exports: [<%= classify(name) %>Service],
})
export class <%= classify(name) %>Module {}