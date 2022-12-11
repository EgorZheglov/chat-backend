import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { INTERNAL_SERVER_ERROR } from 'src/utils/errmessages';
import { MESSAGE_CREATED } from 'src/utils/messages';
import { AuthService } from '../auth/auth.service';
import { CreateMessageDTO } from './dto/create-message.dto';
import { GetMessagesDTO } from './dto/get-messages-dto';
import { MessageCreatedDTO } from './dto/message-created.dto';
import { MessageDTO } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMessages(
    @Query() getMessagesDTO: GetMessagesDTO,
    @Req() req: Request,
  ): Promise<MessageDTO[]> {
    let result: MessageDTO[];

    const { id } = this.authService.verifyAccessToken(
      req.headers.authorization.split(' ')[1],
    );

    try {
      result = await this.messageService.getMessages(getMessagesDTO, id);
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
    @Body() createMessageDTO: CreateMessageDTO,
    @Req() req: Request,
  ): Promise<MessageCreatedDTO> {
    const { id } = this.authService.verifyAccessToken(
      req.headers.authorization.split(' ')[1],
    );

    try {
      await this.messageService.createMessage(createMessageDTO, id);
    } catch (e) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { message: MESSAGE_CREATED };
  }
}
