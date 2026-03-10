import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ConflictDataException extends AppException {
  constructor(message = 'Conflito de dados') {
    super({
      message,
      error: 'CONFLICT',
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
