import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { INCORRECT_TOKEN, SHOULD_CONTAINS_TOKEN } from 'src/utils/errmessages';
import { AuthService } from '../auth/auth.service';
import { IAccessTokenPayload } from '../auth/interfaces/access-token-payload.interface';
import { IConnections } from './interfaces/connections.interface';
import { IMessagePayload } from './interfaces/message-payload.interface';

@WebSocketGateway()
export class GatewayService implements OnModuleInit {
  @WebSocketServer()
  private readonly server: Server;
  //connections pool
  private readonly connections: IConnections = {};

  constructor(private readonly authService: AuthService) {}

  onModuleInit() {
    this.server.on('connection', async (socket: Socket) => {
      //checking auth header also on socket connection...

      const authorizationHeader = socket.handshake.headers.authorization;

      if (!authorizationHeader) {
        socket.send(SHOULD_CONTAINS_TOKEN);
        return socket.disconnect();
      }

      const headerParts = authorizationHeader.split(' ');
      if (headerParts[0] !== 'Bearer') {
        socket.send(INCORRECT_TOKEN);
        return socket.disconnect();
      }

      const accessToken = headerParts[1];
      let tokenPayload: IAccessTokenPayload;
      try {
        tokenPayload = this.authService.verifyAccessToken(accessToken);
      } catch (e) {
        socket.send(INCORRECT_TOKEN);
        return socket.disconnect();
      }

      if (!this.connections[tokenPayload.id]) {
        this.connections[tokenPayload.id] = [socket];
      } else {
        //If user already connect from the another device
        this.connections[tokenPayload.id].push(socket);
      }

      socket.on('close', () => {
        if (this.connections[tokenPayload.id].length === 1) {
          delete this.connections[tokenPayload.id];
        } else {
          //on close on current device - delete only connection for this device
          this.connections[tokenPayload.id] = this.connections[
            tokenPayload.id
          ].filter((connection: Socket) => connection.id !== socket.id);
        }
      });
    });
  }

  sendMessage(payload: IMessagePayload): void {
    const { consumerId, ...messageData } = payload;
    const connections: Socket[] = this.connections[consumerId];
    const messageString = JSON.stringify(messageData);

    if (!connections) return;

    //sending message on every device user connected
    connections.forEach((connection: Socket) => {
      console.log(connection);
      connection.send(messageString);
    });

    return;
  }
}
