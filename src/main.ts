import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  await app.listen(Number(process.env.PORT) || 4000, () => {
    console.log(
      `Server is listening on port: ${Number(process.env.PORT) || 4000}`,
    );
  });
}
bootstrap();
