import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharactersModule } from './characters.module';
import { ConfigModule } from '@nestjs/config';
import { CreateCharacterDto } from './dto/CreateCharacter.dto';

describe('CharactersController', () => {
  let controller: CharactersController;
  let service: CharactersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [CharactersService],
      imports: [CharactersModule, ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = moduleRef.get<CharactersController>(CharactersController);
    service = moduleRef.get<CharactersService>(CharactersService);
  });

  describe('findAll and findOne', () => {
    it('should return an array of characters', async () => {
      const result: number[] = [1234, 4567];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
    it('should return a character', async () => {
      const result = new CreateCharacterDto({ id: 123 });
      const id = 123;
      jest.spyOn(service, 'findOne').mockReturnValue(Promise.resolve(result));

      expect(await controller.findOne(id)).toBe(result);
    });
  });
});
