import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ResourceNotFoundException extends AppException {
  constructor(message = 'Recurso não encontrado') {
    super({
      message,
      error: 'RESOURCE_NOT_FOUND',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
