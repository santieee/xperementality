import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, WebSocketServer } from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io'
import { ChatService } from './chat.service'

@WebSocketGateway()
export class ChatGateWay implements OnGatewayInit{
  constructor(
    private chatService: ChatService
  ){}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger()

  afterInit(server: Server){
    this.logger.log('initialization!')
  }

  @SubscribeMessage('sendMessageAction')
  async sendMessageAction(client: Socket, data: any){
    await this.chatService.saveMsg({ message: data.msg, uId: data.profile.id })
    const chatData = await this.chatService.getAllMsg()
    this.server.emit('chatData', chatData)
  }

  @SubscribeMessage('getChatData')
  async getChatData(client: Socket){
    const chatData = await this.chatService.getAllMsg()
    return { event: 'chatData', data: chatData }
  }
}