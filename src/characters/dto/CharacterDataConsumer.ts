import { CreateCharacterDto } from './CreateCharacter.dto';

export class CharacterDataConsumer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CreateCharacterDto[];
}
