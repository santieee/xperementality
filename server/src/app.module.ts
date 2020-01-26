import { Module } from '@nestjs/common';
import { AppController } from './app.controller'
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AppGateWay } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AppGateWay,
    AuthModule,
    UsersModule,
    TokenModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
