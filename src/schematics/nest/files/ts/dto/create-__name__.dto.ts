
import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Create<%= classify(name) %>Dto {
    @ApiProperty({ example: '<%= classify(name) %>', description: '<%= lowerCase(name) %> name' })
    @Length(2, 100)
    name: string;
}
