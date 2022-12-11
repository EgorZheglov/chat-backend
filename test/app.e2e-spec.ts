import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const app = await NestFactory.create(AppModule);

    await app.listen(Number(process.env.PORT) || 4000, () => {
      console.log(
        `Server is listening on port: ${Number(process.env.PORT) || 4000}`,
      );
    });
  });

  it('/ (GET)', () => {
    return request('http://localhost:4000').get('/').expect(404);
  });
});
