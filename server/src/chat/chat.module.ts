import { Module } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatGateWay } from './chat.gateway';
import { UsersModule } from 'src/user/user.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRepository]),
    UsersModule
  ],
  providers: [ChatService, ChatGateWay],
  exports: [ChatService],
})
export class ChatModule {}
