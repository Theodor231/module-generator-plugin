import { IsNotEmpty, Length } from 'class-validator';

export class CreateRoleDto {
  @Length(2, 100)
  @IsNotEmpty()
  name: string;

  @Length(2, 100)
  @IsNotEmpty()
  alias: string;

  @Length(2, 100)
  @IsNotEmpty()
  guard: string;
}
