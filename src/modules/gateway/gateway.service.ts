import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  readonly server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }
}
