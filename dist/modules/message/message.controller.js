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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const errmessages_1 = require("../../utils/errmessages");
const messages_1 = require("../../utils/messages");
const auth_service_1 = require("../auth/auth.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const get_messages_dto_1 = require("./dto/get-messages-dto");
const message_created_dto_1 = require("./dto/message-created.dto");
const message_dto_1 = require("./dto/message.dto");
const message_service_1 = require("./message.service");
let MessageController = class MessageController {
    constructor(messageService, authService) {
        this.messageService = messageService;
        this.authService = authService;
    }
    async getMessages(getMessagesDTO, req) {
        let result;
        const { id } = this.authService.verifyAccessToken(req.headers.authorization.split(' ')[1]);
        try {
            result = await this.messageService.getMessages(getMessagesDTO, id);
        }
        catch (e) {
            throw new common_1.HttpException(errmessages_1.INTERNAL_SERVER_ERROR, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }
    async createMessage(createMessageDTO, req) {
        const { id } = this.authService.verifyAccessToken(req.headers.authorization.split(' ')[1]);
        try {
            await this.messageService.createMessage(createMessageDTO, id);
        }
        catch (e) {
            throw new common_1.HttpException(errmessages_1.INTERNAL_SERVER_ERROR, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { message: messages_1.MESSAGE_CREATED };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        description: 'Gets messages of chat between 2 users',
    }),
    (0, swagger_1.ApiResponse)({
        type: message_dto_1.MessageDTO,
        status: common_1.HttpStatus.CREATED,
        isArray: true,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_messages_dto_1.GetMessagesDTO, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ description: 'Creates message' }),
    (0, swagger_1.ApiResponse)({
        type: message_created_dto_1.MessageCreatedDTO,
        status: common_1.HttpStatus.CREATED,
        isArray: true,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDTO, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
MessageController = __decorate([
    (0, swagger_1.ApiTags)('messages'),
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        auth_service_1.AuthService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map