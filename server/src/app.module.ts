import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { AppGateWay } from './app.gateway'

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      TasksModule,
      AppGateWay
    ],
})
export class AppModule {}
