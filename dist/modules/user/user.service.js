"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const errmessages_1 = require("../../utils/errmessages");
const users_entity_1 = require("../../database/entities/users.entity");
const global_config_1 = require("../../global-config");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(payload) {
        const user = this.userRepository.create(payload);
        try {
            await this.userRepository.save(user);
        }
        catch (e) {
            if (e.message.startsWith('duplicate key value violates unique constraint')) {
                throw new common_1.HttpException(errmessages_1.USER_ALREADY_EXISTS, common_1.HttpStatus.CONFLICT);
            }
        }
        return;
    }
    async findByUsername(username) {
        const [user] = await this.userRepository.find({ where: { username } });
        return user;
    }
    async findById(id) {
        const [user] = await this.userRepository.find({ where: { id } });
        return user;
    }
    async find(username) {
        const users = await this.userRepository.find({
            select: {
                username: true,
                id: true,
            },
            where: { username: (0, typeorm_2.Like)(username) },
            take: global_config_1.USERS_TAKE_LIMIT,
        });
        return users;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map