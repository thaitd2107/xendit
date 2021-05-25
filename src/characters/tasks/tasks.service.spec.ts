import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CharactersModule } from '../characters.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CharactersService } from '../characters.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CharactersModule, ConfigModule.forRoot({ isGlobal: true })],
      providers: [TasksService, ConfigService, CharactersService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
