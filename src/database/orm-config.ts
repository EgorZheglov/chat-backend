import User from 'src/database/entities/users.entity';
import { DataSourceOptions } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../global-config';
import Message from './entities/messages.entity';

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: true,
  synchronize: true,
  entities: [User, Message],

  //migrations: ['../db/migrations/*.ts'],
  //logger: 'simple-console',
};

export default ormConfig;
