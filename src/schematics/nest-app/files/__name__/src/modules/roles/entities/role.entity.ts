import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100, nullable: true })
  alias: string;

  @Column({ length: 100, nullable: true })
  guard: string;

  @Column({ length: 100, nullable: true })
  name: string;
}
