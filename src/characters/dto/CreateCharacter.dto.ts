export class CreateCharacterDto {
  id: number;
  name: string;
  description: string;

  public constructor(b: Partial<CreateCharacterDto> = {}) {
    Object.assign(this, b);
  }
}
