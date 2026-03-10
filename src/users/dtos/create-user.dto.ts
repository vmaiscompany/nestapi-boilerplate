import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome do usuário',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'E-mail do usuário',
  })
  @IsEmail()
  email: string;
}
