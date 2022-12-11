"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT_OR_ROUNDS = exports.USERS_TAKE_LIMIT = exports.MESSAGES_ON_REQUEST = exports.LOG_LEVEL = exports.REFRESH_TOKEN_EXPIRES = exports.ACCESS_TOKEN_EXPIRES = exports.JWT_REFRESH_SECRET = exports.JWT_ACCESS_SECRET = exports.PORT = exports.POSTGRES_DB = exports.POSTGRES_PASSWORD = exports.POSTGRES_HOST = exports.POSTGRES_USER = exports.POSTGRES_PORT = void 0;
const config_1 = require("@nestjs/config");
let configPath;
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
config_1.ConfigModule.forRoot({
    envFilePath: configPath,
});
const checkEnvironmentFor = (variable) => {
    if (process.env.hasOwnProperty(variable))
        return process.env[variable];
    throw `MISSING ${variable} VARIABLE IN PROCESS ENVIRONMENT`;
};
exports.POSTGRES_PORT = Number(checkEnvironmentFor('POSTGRES_PORT'));
exports.POSTGRES_USER = checkEnvironmentFor('POSTGRES_USER');
exports.POSTGRES_HOST = checkEnvironmentFor('POSTGRES_HOST');
exports.POSTGRES_PASSWORD = checkEnvironmentFor('POSTGRES_PASSWORD');
exports.POSTGRES_DB = checkEnvironmentFor('POSTGRES_DB');
exports.PORT = Number(checkEnvironmentFor('PORT'));
exports.JWT_ACCESS_SECRET = checkEnvironmentFor('JWT_ACCESS_SECRET');
exports.JWT_REFRESH_SECRET = checkEnvironmentFor('JWT_REFRESH_SECRET');
exports.ACCESS_TOKEN_EXPIRES = checkEnvironmentFor('ACCESS_TOKEN_EXPIRES');
exports.REFRESH_TOKEN_EXPIRES = checkEnvironmentFor('REFRESH_TOKEN_EXPIRES');
exports.LOG_LEVEL = process.env.LOG_LEVEL
    ? process.env.LOG_LEVEL
    : 'default';
exports.MESSAGES_ON_REQUEST = 20;
exports.USERS_TAKE_LIMIT = 20;
exports.SALT_OR_ROUNDS = 10;
//# sourceMappingURL=global-config.js.map