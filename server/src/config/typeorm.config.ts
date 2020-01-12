import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'spone',
  password: '789789',
  database: 'practice',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true
};