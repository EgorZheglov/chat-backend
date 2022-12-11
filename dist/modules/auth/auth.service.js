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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const errmessages_1 = require("../../utils/errmessages");
const jwt = require("jsonwebtoken");
const global_config_1 = require("../../global-config");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async sigunp(signUpUserDTO) {
        await this.userService.createUser(signUpUserDTO);
    }
    async login(loginUserDto) {
        const result = await this.userService.findByUsername(loginUserDto.username);
        const isPasswordMatch = await bcrypt.compare(loginUserDto.password, result.password);
        if (!result || !isPasswordMatch) {
            throw new common_1.UnauthorizedException(errmessages_1.ERROR_LOGIN);
        }
        return {
            accessToken: jwt.sign({ id: result.id, username: result.username }, global_config_1.JWT_ACCESS_SECRET),
            refreshToken: jwt.sign({ id: result.id, password: result.password }, global_config_1.JWT_REFRESH_SECRET),
        };
    }
    verifyAccessToken(token) {
        return jwt.verify(token, global_config_1.JWT_ACCESS_SECRET);
    }
    async verifyRefreshToken(token) {
        let tokenPayload;
        try {
            tokenPayload = jwt.verify(token, global_config_1.JWT_REFRESH_SECRET);
        }
        catch (e) {
            throw new common_1.UnauthorizedException(errmessages_1.INCORRECT_TOKEN);
        }
        const user = await this.userService.findById(tokenPayload.id);
        return {
            accessToken: jwt.sign({ id: user.id, username: user.username }, global_config_1.JWT_ACCESS_SECRET),
            refreshToken: jwt.sign({ id: user.id, password: user.password }, global_config_1.JWT_REFRESH_SECRET),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map