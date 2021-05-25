import { Controller, Get, Param } from '@nestjs/common';

import { CharactersService } from './characters.service';
import { Character } from './interfaces/character.inteface';

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Get()
  async findAll(): Promise<number[]> {
    return this.charactersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Character> {
    return await this.charactersService.findOne(params.id);
  }
}
