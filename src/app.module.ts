import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/config';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
  ],
})
export class AppModule {}
