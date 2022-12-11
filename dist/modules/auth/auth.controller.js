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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("@nestjs/swagger/dist/decorators");
const api_operation_decorator_1 = require("@nestjs/swagger/dist/decorators/api-operation.decorator");
const public_endpoint_1 = require("../../decorators/public-endpoint");
const user_create_dto_1 = require("./dto/user-create.dto");
const messages_1 = require("../../utils/messages");
const auth_service_1 = require("./auth.service");
const login_user_dto_1 = require("./dto/login-user.dto");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const sign_in_response_dto_1 = require("./dto/sign-in-response.dto");
const user_created_dto_1 = require("./dto/user-created.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signupUser(signUpUserDTO) {
        await this.authService.sigunp(signUpUserDTO);
        return { message: messages_1.USER_CREATED };
    }
    async loginUser(loginUserDto) {
        const result = await this.authService.login(loginUserDto);
        return result;
    }
    async refreshToken(refreshTokenDTO) {
        const result = await this.authService.verifyRefreshToken(refreshTokenDTO);
        return result;
    }
};
__decorate([
    (0, public_endpoint_1.Public)(),
    (0, api_operation_decorator_1.ApiOperation)({ description: 'creating new user' }),
    (0, decorators_1.ApiResponse)({
        type: user_created_dto_1.UserCreatedDTO,
        status: common_1.HttpStatus.CREATED,
    }),
    (0, common_1.Post)('signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupUser", null);
__decorate([
    (0, public_endpoint_1.Public)(),
    (0, api_operation_decorator_1.ApiOperation)({ description: 'Getting new pair of tokens' }),
    (0, decorators_1.ApiResponse)({
        type: sign_in_response_dto_1.SignInResponseDTO,
        status: common_1.HttpStatus.OK,
    }),
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, public_endpoint_1.Public)(),
    (0, api_operation_decorator_1.ApiOperation)({ description: 'Refreshing tokens new pair of tokens' }),
    (0, decorators_1.ApiResponse)({
        type: sign_in_response_dto_1.SignInResponseDTO,
        status: common_1.HttpStatus.CREATED,
    }),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map