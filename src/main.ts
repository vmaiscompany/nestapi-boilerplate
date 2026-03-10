import dotenv from 'dotenv';
dotenv.config();
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationException } from 'src/common/exceptions/validation.exception';
import { GlobalExceptionFilter } from 'src/common/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('main');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) =>
          error.constraints ? Object.values(error.constraints) : [],
        );

        return new ValidationException(
          messages.length ? messages : 'Dados inválidos',
        );
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Boilerplate API')
    .setDescription('Documentação da API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
  logger.debug(`API running on http://localhost:${port}/api`);
  logger.debug(`Documentation available on http://localhost:${port}/docs`);
}

bootstrap();
