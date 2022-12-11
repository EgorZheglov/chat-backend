import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { CreateMessageDTO } from './dto/create-message.dto';
import { GetMessagesDTO } from './dto/get-messages-dto';
import { MessageCreatedDTO } from './dto/message-created.dto';
import { MessageDTO } from './dto/message.dto';
import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    private readonly authService;
    constructor(messageService: MessageService, authService: AuthService);
    getMessages(getMessagesDTO: GetMessagesDTO, req: Request): Promise<MessageDTO[]>;
    createMessage(createMessageDTO: CreateMessageDTO, req: Request): Promise<MessageCreatedDTO>;
}
