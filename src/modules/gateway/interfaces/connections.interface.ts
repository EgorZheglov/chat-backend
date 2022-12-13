import { Socket } from 'socket.io';

export interface IConnections {
  [userId: string]: Socket[]; //One user can be connected from different devices
}
