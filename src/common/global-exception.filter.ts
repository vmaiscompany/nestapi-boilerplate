import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
const logger = new Logger('GlobalExceptionFilter');

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let error = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const responseObj = exceptionResponse as Record<string, unknown>;

        message =
          (responseObj.message as string | string[]) ?? exception.message;

        error =
          (responseObj.error as string) ??
          (statusCode >= 500 ? 'INTERNAL_SERVER_ERROR' : 'HTTP_EXCEPTION');
      }
    }

    logger.error(exception);

    response.status(statusCode).json({
      success: false,
      statusCode,
      error,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
