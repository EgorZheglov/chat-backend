"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_entity_1 = require("./entities/users.entity");
const global_config_1 = require("../global-config");
const messages_entity_1 = require("./entities/messages.entity");
const ormConfig = {
    type: 'postgres',
    host: global_config_1.POSTGRES_HOST,
    port: global_config_1.POSTGRES_PORT,
    username: global_config_1.POSTGRES_USER,
    password: global_config_1.POSTGRES_PASSWORD,
    database: global_config_1.POSTGRES_DB,
    logging: true,
    synchronize: true,
    entities: [users_entity_1.default, messages_entity_1.default],
};
exports.default = ormConfig;
//# sourceMappingURL=orm-config.js.map