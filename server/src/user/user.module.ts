import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TokenModule
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UsersModule {}