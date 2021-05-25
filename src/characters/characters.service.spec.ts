import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { CharactersModule } from './characters.module';
import { ConfigModule } from '@nestjs/config';

describe('CharactersService', () => {
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService],
      imports: [CharactersModule, ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
