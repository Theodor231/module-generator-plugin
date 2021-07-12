import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column({ default: '' })
  action: string;

  @Column({ default: '' })
  module: string;

  @Column({ default: false })
  access: boolean;

  @Column({ default: 'own' })
  levels: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  fields: any[];

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  availableFields: any[];
}
