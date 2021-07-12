import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: '<%= lowerCase(name) %>' })
export class <%= classify(name) %> {
  @ApiProperty({ example: '1', description: '<%= classify(name) %> description' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '<%= classify(name) %>', description: '<%= classify(name) %> description' })
  @Column()
  name: string;
}