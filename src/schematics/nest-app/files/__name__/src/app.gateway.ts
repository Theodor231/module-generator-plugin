import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Socket, Server } from 'socket.io';
  import { SocketService } from './services/socket.service';
  
  @WebSocketGateway()
  export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer() server: Server;
  
    private logger: Logger = new Logger('AppGateway');
    constructor(private socketService: SocketService) {}
  
    @SubscribeMessage('msgToServer')
    handleMessage(payload: string): void {
      this.server.emit('callEvent', payload);
    }
  
    afterInit(server: Server) {
      this.socketService.server = server;
      this.socketService.send = this.handleMessage;
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client connected: ${client.id}`);
    }
  }