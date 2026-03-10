import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const usersServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('create', () => {
    it('deve delegar a criação para o service', async () => {
      const body = {
        name: 'João',
        email: 'joao@email.com',
      };

      const created = {
        id: 'user-1',
        ...body,
      };

      usersServiceMock.create.mockResolvedValue(created);

      const result = await controller.create(body);

      expect(usersServiceMock.create).toHaveBeenCalledWith(body);
      expect(result).toEqual(created);
    });
  });

  describe('findAll', () => {
    it('deve retornar a lista do service', async () => {
      const users = [
        { id: '1', name: 'João', email: 'joao@email.com' },
        { id: '2', name: 'Maria', email: 'maria@email.com' },
      ];

      usersServiceMock.findAll.mockResolvedValue(users);

      const result = await controller.findAll();

      expect(usersServiceMock.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('deve buscar um usuário por id', async () => {
      const user = {
        id: 'user-1',
        name: 'João',
        email: 'joao@email.com',
      };

      usersServiceMock.findOne.mockResolvedValue(user);

      const result = await controller.findOne('user-1');

      expect(usersServiceMock.findOne).toHaveBeenCalledWith('user-1');
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário', async () => {
      const body = {
        name: 'João Atualizado',
      };

      const updated = {
        id: 'user-1',
        name: 'João Atualizado',
        email: 'joao@email.com',
      };

      usersServiceMock.update.mockResolvedValue(updated);

      const result = await controller.update('user-1', body);

      expect(usersServiceMock.update).toHaveBeenCalledWith('user-1', body);
      expect(result).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('deve remover um usuário', async () => {
      const removed = {
        id: 'user-1',
        name: 'João',
        email: 'joao@email.com',
      };

      usersServiceMock.remove.mockResolvedValue(removed);

      const result = await controller.remove('user-1');

      expect(usersServiceMock.remove).toHaveBeenCalledWith('user-1');
      expect(result).toEqual(removed);
    });
  });
});
