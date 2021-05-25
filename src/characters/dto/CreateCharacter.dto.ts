import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiPropertyOptional()
  id?: number;
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  description?: string;

  public constructor(b: Partial<CreateCharacterDto> = {}) {
    Object.assign(this, b);
  }
}
