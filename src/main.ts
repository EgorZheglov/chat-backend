import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Chat-Backend petproject')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  fs.writeFileSync('./doc/swagger-spec.json', JSON.stringify(document));
  
  await app.listen(Number(process.env.PORT) || 4000, () => {
    console.log(
      `Server is listening on port: ${Number(process.env.PORT) || 4000}`,
    );
  });
}
bootstrap();
