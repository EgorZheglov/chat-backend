import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import ormConfig from '../src/database/orm-config';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: DataSource;

  beforeAll(async () => {
    const app = await NestFactory.create(AppModule);
    dbConnection = new DataSource(ormConfig);
    await dbConnection.initialize();

    await app.listen(2000, () => {
      console.log(`Server is listening on port: ${2000}`);
    });
  });

  it('should signup', async () => {
    const response = await request('http://localhost:2000')
      .post('/signup')
      .send({ username: 'testUser', password: 'password' })
      .expect(201);

    console.log(response);
    expect(response).toBeDefined();
  });

  it('should signin', async () => {
    const response = await request('http://localhost:2000')
      .post('/signin')
      .send({ username: 'testUser', password: 'password' })
      .expect(200);

    expect(response).toBeDefined();
  });

  afterAll(async () => {
    await dbConnection.query(`DELETE * FROM USERS WHERE username = $1`, ['testUser']);
  });
});
