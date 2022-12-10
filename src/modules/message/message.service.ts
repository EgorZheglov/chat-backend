import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Message from 'src/database/entities/messages.entity';
import User from 'src/database/entities/users.entity';
import { MESSAGES_ON_REQUEST } from 'src/global-config';
import { Repository } from 'typeorm';
import { GetMessagesDTO } from './dto/get-messages-dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  //getting messages of selected chat in time interval
  async getMessages(getMessagesDTO: GetMessagesDTO) {
    const result = this.messageRepo
      .createQueryBuilder()
      .select(
        `
        consumer.name as "consumerName",
        producer.name as "producerName",
        data,
        timestamp
        `,
      )
      .leftJoin(User, 'consumer', 'consumer.id = consumer_id')
      .leftJoin(User, 'producer', 'producer.id = producer_id')
      .where(`consumer_id = :userId OR producer_id = :userId`, {
        userId: getMessagesDTO.userId,
      })
      .andWhere(
        `consumer.name = :interlocutor OR producer.name = :interlocutor`,
        { interlocutor: getMessagesDTO.interlocutor },
      )
      .andWhere(`timestamp >= :dateFrom AND timestamp <= :dateTo`, {
        dateFrom: getMessagesDTO.dateFrom,
        dateTo: getMessagesDTO.dateTo,
      })
      .orderBy({ timestamp: 'DESC' })
      .limit(MESSAGES_ON_REQUEST)
      .execute();

    return result;
  }
}
