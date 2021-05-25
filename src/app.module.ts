import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './characters/tasks/tasks.service';
import { CharactersService } from './characters/characters.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CharactersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [TasksService, CharactersService, ConfigService],
})
export class AppModule {}
