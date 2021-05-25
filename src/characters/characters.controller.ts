import { Controller, Get, Param } from '@nestjs/common';

import { CharactersService } from './characters.service';
import { Character } from './interfaces/character.inteface';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateCharacterDto } from './dto/CreateCharacter.dto';

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Get()
  @ApiOkResponse({
    description: 'Return all character ids',
    schema: {
      type: 'array',
      items: { type: 'number' },
      example: [1010846, 1011297, 1011031],
    },
  })
  async findAll(): Promise<number[]> {
    return this.charactersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return one character by ID',
    type: CreateCharacterDto,
  })
  async findOne(@Param('id') id: number): Promise<CreateCharacterDto> {
    return await this.charactersService.findOne(id);
  }
}
