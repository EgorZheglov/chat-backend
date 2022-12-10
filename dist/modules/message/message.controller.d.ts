import { CreateMessageDTO } from './dto/create-message.dto';
import { GetMessagesDTO } from './dto/get-messages-dto';
import { MessageCreatedDTO } from './dto/message-created.dto';
import { MessageDTO } from './dto/message.dto';
import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getMessages(getMessagesDTO: GetMessagesDTO): Promise<MessageDTO[]>;
    createMessage(createMessageDTO: CreateMessageDTO): Promise<MessageCreatedDTO>;
}
