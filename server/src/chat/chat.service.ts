import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRepository } from './chat.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { Chat } from './chat.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRepository)
    private chatRepository: ChatRepository,
    private userService: UserService
  ){}

  async saveMsg(createMessageDto: CreateMessageDto){
    const { message, uId } = createMessageDto
    const user = await this.userService.findOne({id: uId})
    let chat = new Chat(); 
    chat.message = message
    chat.user = user
    const result = await chat.save()
    return result;
  }
  
  async getAllMsg(){
    return await this.chatRepository.find({ relations: ["user"] })
  }
}
