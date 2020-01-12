import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse } from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Socket } from 'socket.io'

@WebSocketGateway()
export class AppGateWay implements OnGatewayInit{

  private logger: Logger = new Logger()

  afterInit(server: any){
    this.logger.log('initialization!')
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string){
    // client.emit('msgToClient', text)
    // return { event: 'msgToClient', data: 'Hello World!' }
    this.cycler(client)
  }

  cycler(client: Socket){
    let i = 10
    const timer = setInterval((): WsResponse<string> | any => {
      i--
      if(!i) return clearInterval(timer)
      return client.emit('msgToClient', `asd - ${i}`)    
    }, 1000)
  }
}