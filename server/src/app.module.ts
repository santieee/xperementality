import { Module } from '@nestjs/common';
import { AppController } from './app.controller'
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ChatGateWay } from './chat/chat.gateway';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule,
    UsersModule,
    TokenModule,
    ChatModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
