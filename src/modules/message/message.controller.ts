import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { INTERNAL_SERVER_ERROR } from 'src/utils/errmessages';
import { MESSAGE_CREATED } from 'src/utils/messages';
import { CreateMessageDTO } from './dto/create-message.dto';
import { GetMessagesDTO } from './dto/get-messages-dto';
import { MessageCreatedDTO } from './dto/message-created.dto';
import { MessageDTO } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMessages(
    @Query() getMessagesDTO: GetMessagesDTO,
  ): Promise<MessageDTO[]> {
    let result: MessageDTO[];

    try {
      result = await this.messageService.getMessages(getMessagesDTO);
    } catch (e) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMessage(
    @Query() createMessageDTO: CreateMessageDTO,
  ): Promise<MessageCreatedDTO> {
    try {
      await this.messageService.createMessage(createMessageDTO);
    } catch (e) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { message: MESSAGE_CREATED };
  }
}
