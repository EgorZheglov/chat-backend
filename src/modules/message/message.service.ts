import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Message from 'src/database/entities/messages.entity';
import User from 'src/database/entities/users.entity';
import { MESSAGES_ON_REQUEST } from 'src/global-config';
import { Repository } from 'typeorm';
import { CreateMessageDTO } from './dto/create-message.dto';
import { GetMessagesDTO } from './dto/get-messages-dto';
import { IMessage } from './interfaces/message.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  //getting messages of selected chat in time interval
  async getMessages(
    getMessagesDTO: GetMessagesDTO,
    userId: string,
  ): Promise<IMessage[]> {
    const result: IMessage[] = await this.messageRepo
      .createQueryBuilder()
      .select(
        `
        consumer.username as "consumerName",
        producer.username as "producerName",
        data,
        timestamp
        `,
      )
      .leftJoin(User, 'consumer', 'consumer.id = consumer_id')
      .leftJoin(User, 'producer', 'producer.id = producer_id')
      .where(`consumer_id = :userId OR producer_id = :userId`, {
        userId,
      })
      .andWhere(
        `consumer.id = :interlocutorId OR producer.id = :interlocutorId`,
        { interlocutorId: getMessagesDTO.interlocutorId },
      )
      .andWhere(`timestamp <= :dateFrom`, {
        dateFrom: getMessagesDTO.dateFrom,
      })
      .orderBy({ timestamp: 'DESC' })
      .limit(MESSAGES_ON_REQUEST)
      .execute();

    return result;
  }

  async createMessage(
    createMessageDTO: CreateMessageDTO,
    userId: string,
  ): Promise<void> {
    
    const messageEntity = this.messageRepo.create({
      consumer_id: createMessageDTO.consumerId,
      data: createMessageDTO.data,
      timestamp: new Date(),
      producer_id: userId,
    });
    await this.messageRepo.save(messageEntity);
    //TODO: use WebSocket connection
    return;
  }
}
