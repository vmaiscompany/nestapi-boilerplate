import { HttpException, HttpStatus } from '@nestjs/common';

type AppExceptionParams = {
  message: string | string[];
  error: string;
  statusCode: HttpStatus;
};

export class AppException extends HttpException {
  constructor({ message, error, statusCode }: AppExceptionParams) {
    super(
      {
        success: false,
        statusCode,
        error,
        message,
      },
      statusCode,
    );
  }
}