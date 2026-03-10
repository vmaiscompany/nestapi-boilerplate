import { Test, TestingModule } from '@nestjs/testing';
import { ConflictDataException } from '../common/exceptions/conflict.exception';
import { ResourceNotFoundException } from '../common/exceptions/resource-not-found.exception';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const prismaMock = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('deve criar um usuário quando o e-mail não existir', async () => {
      const input = {
        name: 'João',
        email: 'joao@email.com',
      };

      const createdUser = {
        id: 'user-1',
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue(createdUser);

      const result = await service.create(input);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: input.email },
      });
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(createdUser);
    });

    it('deve lançar conflito quando o e-mail já existir', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'existing-user',
        name: 'Maria',
        email: 'joao@email.com',
      });

      await expect(
        service.create({
          name: 'João',
          email: 'joao@email.com',
        }),
      ).rejects.toBeInstanceOf(ConflictDataException);

      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('deve listar usuários ordenados por createdAt desc', async () => {
      const users = [
        { id: '2', name: 'Maria', email: 'maria@email.com' },
        { id: '1', name: 'João', email: 'joao@email.com' },
      ];

      prismaMock.user.findMany.mockResolvedValue(users);

      const result = await service.findAll();

      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('deve retornar um usuário quando encontrado', async () => {
      const user = {
        id: 'user-1',
        name: 'João',
        email: 'joao@email.com',
      };

      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await service.findOne('user-1');

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-1' },
      });
      expect(result).toEqual(user);
    });

    it('deve lançar not found quando o usuário não existir', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne('missing-id')).rejects.toBeInstanceOf(
        ResourceNotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar usuário sem trocar e-mail', async () => {
      const existingUser = {
        id: 'user-1',
        name: 'João',
        email: 'joao@email.com',
      };

      const updatedUser = {
        ...existingUser,
        name: 'João Silva',
      };

      prismaMock.user.findUnique.mockResolvedValue(existingUser);
      prismaMock.user.update.mockResolvedValue(updatedUser);

      const result = await service.update('user-1', {
        name: 'João Silva',
      });

      expect(prismaMock.user.findFirst).not.toHaveBeenCalled();
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { name: 'João Silva' },
      });
      expect(result).toEqual(updatedUser);
    });

    it('deve atualizar usuário trocando e-mail quando não houver conflito', async () => {
      const existingUser = {
        id: 'user-1',
        name: 'João',
        email: 'joao@email.com',
      };

      const updatedUser = {
        ...existingUser,
        email: 'novo@email.com',
      };

      prismaMock.user.findUnique.mockResolvedValue(existingUser);
      prismaMock.user.findFirst.mockResolvedValue(null);
      prismaMock.user.update.mockResolvedValue(updatedUser);

      const result = await service.update('user-1', {
        email: 'novo@email.com',
      });

      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: {
          email: 'novo@email.com',
          NOT: { id: 'user-1' },
        },
      });
      expect(result).toEqual(updatedUser);
    });

    it('deve lançar conflito ao atualizar para um e-mail já existente', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'user-1',
        name: 'João',
        email: 'joao@email.com',
      });

      prismaMock.user.findFirst.mockResolvedValue({
        id: 'user-2',
        name: 'Maria',
        email: 'maria@email.com',
      });

      await expect(
        service.update('user-1', {
          email: 'maria@email.com',
        }),
      ).rejects.toBeInstanceOf(ConflictDataException);

      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('deve remover um usuário existente', async () => {
      const existingUser = {
        id: 'user-1',
        name: 'João',
        email: 'joao@email.com',
      };

      prismaMock.user.findUnique.mockResolvedValue(existingUser);
      prismaMock.user.delete.mockResolvedValue(existingUser);

      const result = await service.remove('user-1');

      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id: 'user-1' },
      });
      expect(result).toEqual(existingUser);
    });

    it('deve lançar not found ao remover usuário inexistente', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.remove('missing-id')).rejects.toBeInstanceOf(
        ResourceNotFoundException,
      );

      expect(prismaMock.user.delete).not.toHaveBeenCalled();
    });
  });
});
