import Message from 'src/database/entities/messages.entity';
import { Repository } from 'typeorm';
import { CreateMessageDTO } from './dto/create-message.dto';
import { GetMessagesDTO } from './dto/get-messages-dto';
import { IMessage } from './interfaces/message.interface';
export declare class MessageService {
    private readonly messageRepo;
    constructor(messageRepo: Repository<Message>);
    getMessages(getMessagesDTO: GetMessagesDTO, userId: string): Promise<IMessage[]>;
    createMessage(createMessageDTO: CreateMessageDTO, userId: string): Promise<void>;
}
