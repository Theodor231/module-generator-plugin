import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class User {
  @ApiProperty({ example: '1', description: 'уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John', description: 'уникальный идентификатор' })
  @Column()
  name: string;

  @ApiProperty({ example: 'File(binary)', description: 'Аватар' })
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'{}'",
    nullable: true,
  })
  avatar: any;

  @ApiProperty({ example: '1', description: 'емэйл' })
  @Column()
  email: string;

  @ApiProperty({ example: '1234567', description: 'пароль' })
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  token: string;

  @ApiProperty({ example: 'admin', description: 'роль' })
  @ManyToOne(() => Role, { eager: true })
  @JoinColumn()
  role: Role;

  @Column({ nullable: true })
  roleId: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
