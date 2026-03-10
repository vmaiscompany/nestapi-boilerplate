import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ValidationException extends AppException {
  constructor(message: string | string[] = 'Dados inválidos') {
    super({
      message,
      error: 'VALIDATION_ERROR',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
