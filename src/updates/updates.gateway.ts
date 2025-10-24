import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true, path: '/ws/updates' })
export class UpdatesGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('✅ WebSocket /ws/updates initialized');
  }

  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }
}
