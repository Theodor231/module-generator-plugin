import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'user name' })
  @Length(2, 100)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'File(binary)', description: 'user avatar' })
  roleId: number;
  avatar: any;

  @ApiProperty({ example: 'john231@gmail.com', description: 'user email' })
  @Length(2, 100)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234567', description: 'user password' })
  @Length(8, 255)
  @IsNotEmpty()
  password: string;
}
