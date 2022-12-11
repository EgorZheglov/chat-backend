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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messages_entity_1 = require("../../database/entities/messages.entity");
const users_entity_1 = require("../../database/entities/users.entity");
const global_config_1 = require("../../global-config");
const typeorm_2 = require("typeorm");
let MessageService = class MessageService {
    constructor(messageRepo) {
        this.messageRepo = messageRepo;
    }
    async getMessages(getMessagesDTO, userId) {
        const result = await this.messageRepo
            .createQueryBuilder()
            .select(`
        consumer.username as "consumerName",
        producer.username as "producerName",
        data,
        timestamp
        `)
            .leftJoin(users_entity_1.default, 'consumer', 'consumer.id = consumer_id')
            .leftJoin(users_entity_1.default, 'producer', 'producer.id = producer_id')
            .where(`consumer_id = :userId OR producer_id = :userId`, {
            userId,
        })
            .andWhere(`consumer.id = :interlocutorId OR producer.id = :interlocutorId`, { interlocutorId: getMessagesDTO.interlocutorId })
            .andWhere(`timestamp <= :dateFrom`, {
            dateFrom: getMessagesDTO.dateFrom,
        })
            .orderBy({ timestamp: 'DESC' })
            .limit(global_config_1.MESSAGES_ON_REQUEST)
            .execute();
        return result;
    }
    async createMessage(createMessageDTO, userId) {
        const messageEntity = this.messageRepo.create({
            consumer_id: createMessageDTO.consumerId,
            data: createMessageDTO.data,
            timestamp: new Date(),
            producer_id: userId,
        });
        await this.messageRepo.save(messageEntity);
        return;
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(messages_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map