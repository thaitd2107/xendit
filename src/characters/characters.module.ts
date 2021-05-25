import { CacheModule, HttpModule, HttpService, Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

@Module({
  imports: [HttpModule, CacheModule.register({ ttl: 3600, max: 1000000 })],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CacheModule, HttpModule],
})
export class CharactersModule {}
