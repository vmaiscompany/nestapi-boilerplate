import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
  @ApiBadRequestResponse({
    description: 'Dados inválidos',
    type: ErrorResponseDto,
  })
  @ApiConflictResponse({
    description: 'E-mail já cadastrado',
    type: ErrorResponseDto,
  })
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuários' })
  @ApiOkResponse({ description: 'Lista de usuários' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', example: 'clx123abc456' })
  @ApiOkResponse({ description: 'Usuário encontrado' })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    type: ErrorResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({ name: 'id', example: 'clx123abc456' })
  @ApiOkResponse({ description: 'Usuário atualizado' })
  @ApiBadRequestResponse({
    description: 'Dados inválidos',
    type: ErrorResponseDto,
  })
  @ApiConflictResponse({
    description: 'E-mail já cadastrado',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    type: ErrorResponseDto,
  })
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário' })
  @ApiParam({ name: 'id', example: 'clx123abc456' })
  @ApiOkResponse({ description: 'Usuário removido' })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    type: ErrorResponseDto,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
