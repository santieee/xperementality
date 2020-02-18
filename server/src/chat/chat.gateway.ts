import { 
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { WsJwtGuard } from 'src/common/guards/ws-jwt-guard';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class ChatGateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private chatService: ChatService,
  ){}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger();
  private users: Array<String> = [];

  afterInit(server: Server){
    this.logger.log('initialization!');
  }

  @SubscribeMessage('sendMessageAction')
  async sendMessageAction(client: Socket, data: any){
    await this.chatService.saveMsg({ message: data.msg, uId: data.profile.id });
    const chatData = await this.chatService.getAllMsg();
    this.server.emit('chatData', chatData);
  }

  @SubscribeMessage('getChatData')
  async getChatData(client: Socket){
    const chatData = await this.chatService.getAllMsg()
    return { event: 'chatData', data: chatData }
  }

  async handleConnection(client: Socket){
    const { username } = JSON.parse(client.handshake.query.profile);
    if(!username || this.users.includes(username)) return;
    this.users.push(username);
    this.server.emit('online', this.users);
    console.log('+', this.users)
  }

  async handleDisconnect(client: Socket){
    const { username } = JSON.parse(client.handshake.query.profile);
    if(!username) return;
    this.users.splice(this.users.indexOf(username), 1)
    this.server.emit('online', this.users);
    console.log('-',this.users)
  }
} 