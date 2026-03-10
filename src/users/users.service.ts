import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictDataException } from 'src/common/exceptions/conflict.exception';
import { ResourceNotFoundException } from 'src/common/exceptions/resource-not-found.exception';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictDataException('Já existe um usuário com este e-mail');
    }

    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ResourceNotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    await this.findOne(id);

    if (data.email) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: { id },
        },
      });

      if (existingUser) {
        throw new ConflictDataException('Já existe um usuário com este e-mail');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
