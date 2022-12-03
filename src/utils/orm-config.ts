import User from 'src/modules/users/users.entity';
import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'abul.db.elephantsql.com',
  port: 5432,
  username: 'ctaxjmji',
  password: 'D8O17l7fngPOP9LLO5jEsql3HkJ1iSIb',
  database: 'ctaxjmji',
  logging: true,
  synchronize: true,
  entities: [User],
  //migrations: ['../db/migrations/*.ts'],
  //logger: 'simple-console',
};

export default ormConfig;
