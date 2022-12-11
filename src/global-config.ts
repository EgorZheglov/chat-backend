import { ConfigModule } from '@nestjs/config';

let configPath: string;

switch (process.env.NODE_ENV) {
  case 'production':
    configPath = '.env.prod';
    break;
  case 'test':
    configPath = '.env.test';
    break;
  default:
    configPath = '.env';
    break;
}

ConfigModule.forRoot({
  envFilePath: configPath,
});

const checkEnvironmentFor = (variable: string) => {
  if (process.env.hasOwnProperty(variable)) return process.env[variable];

  throw `MISSING ${variable} VARIABLE IN PROCESS ENVIRONMENT`;
};

export const POSTGRES_PORT = Number(checkEnvironmentFor('POSTGRES_PORT'));
export const POSTGRES_USER = checkEnvironmentFor('POSTGRES_USER');
export const POSTGRES_HOST = checkEnvironmentFor('POSTGRES_HOST');
export const POSTGRES_PASSWORD = checkEnvironmentFor('POSTGRES_PASSWORD');
export const POSTGRES_DB = checkEnvironmentFor('POSTGRES_DB');
export const PORT = Number(checkEnvironmentFor('PORT'));
export const JWT_ACCESS_SECRET = checkEnvironmentFor('JWT_ACCESS_SECRET');
export const JWT_REFRESH_SECRET = checkEnvironmentFor('JWT_REFRESH_SECRET');
export const ACCESS_TOKEN_EXPIRES = checkEnvironmentFor('ACCESS_TOKEN_EXPIRES');
export const REFRESH_TOKEN_EXPIRES = checkEnvironmentFor(
  'REFRESH_TOKEN_EXPIRES',
);
export const LOG_LEVEL = process.env.LOG_LEVEL
  ? process.env.LOG_LEVEL
  : 'default';
export const MESSAGES_ON_REQUEST = 20;
export const USERS_TAKE_LIMIT = 20;
export const SALT_OR_ROUNDS = 10;
