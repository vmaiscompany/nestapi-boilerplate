import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'João Atualizado',
    description: 'Nome do usuário',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'novoemail@email.com',
    description: 'E-mail do usuário',
  })
  email?: string;
}
