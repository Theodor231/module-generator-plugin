import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function parseErrors(validationErrors: Array<any>) {
  const errors = {} as any;
  for (const error of validationErrors) {
    errors[error.property] =
      error.constraints[Object.keys(error.constraints)[0]];
  }

  return errors;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors();
  app.use(express.static(join(process.cwd(), '../storage/')));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      exceptionFactory: (error) => {
        return new UnprocessableEntityException({
          errors: parseErrors(error),
          message: 'Was given invalid data.'
        });
      },
    }),
  );
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('Api test')
    .setDescription('Test Desription')
    .setVersion('1.0')
    .addTag('online')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.port, process.env.host);
}
bootstrap().then((r) => r);
