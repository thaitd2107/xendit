import { CACHE_MANAGER, HttpService, Inject, Injectable } from '@nestjs/common';
import { Character } from './interfaces/character.inteface';
import { Cache } from 'cache-manager';
import {
  concat,
  ConnectableObservable,
  defer,
  EMPTY,
  Observable,
  of,
} from 'rxjs';
import { map, mergeMap, publish, toArray } from 'rxjs/operators';
import { Md5 } from 'ts-md5';
import { CreateCharacterDto } from './dto/CreateCharacter.dto';
import { CharacterDataWrapper } from './dto/CharacterDataWrapper';
import { CharacterDataConsumer } from './dto/CharacterDataConsumer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CharactersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  limit = 100;

  async findAll(): Promise<number[]> {
    return await this.cacheManager.get('_all_');
  }

  async findOne(id: number): Promise<Character> {
    return await this.cacheManager.get(`${id}`);
  }

  fetchAllPages(): Observable<Character[]> {
    return this.fetchItems();
  }

  fetchData(pageNo: number): Observable<CharacterDataConsumer> {
    const apiKey = this.configService.get<string>('PUBLIC_KEY');
    const privateKey = this.configService.get<string>('PRIVATE_KEY');
    const baseUrl = this.configService.get<string>('BASE_URL');
    const offset = pageNo * this.limit;
    const ts: number = new Date().valueOf();
    const hash = Md5.hashStr(ts + privateKey + apiKey);
    return this.httpService
      .get<CharacterDataWrapper>(
        `${baseUrl}?apikey=${apiKey}&hash=${hash}&ts=${ts}&offset=${offset}&limit=${this.limit}`,
        { validateStatus: null },
      )
      .pipe(mergeMap((value) => of(value.data.data)));
  }

  fetchItems(pageNo = 0): Observable<Character[]> {
    return defer(() => this.fetchData(pageNo)).pipe(
      mergeMap(({ results, offset, limit, total }) => {
        const items = of(results);
        const next =
          offset + limit < total ? this.fetchItems(pageNo + 1) : EMPTY;
        return concat(items, next);
      }),
    );
  }

  consumeData(): ConnectableObservable<Character> {
    console.log('Consuming all ids');
    const allCharacters: ConnectableObservable<Character> =
      this.fetchAllPages().pipe(
        mergeMap((characters) => characters.map((character) => of(character))),
        mergeMap((value) => value.toPromise()),
        publish<Character>(),
      ) as ConnectableObservable<Character>;

    allCharacters
      .pipe(
        map((value) => value.id),
        toArray(),
      )
      .subscribe(async (value) => {
        await this.cacheManager.set('_all_', value);
        console.log(`Done consuming all ids. Size=${value.length}`);
      });

    allCharacters
      .pipe(
        map(
          (value) =>
            new CreateCharacterDto({
              id: value.id,
              name: value.name,
              description: value.description,
            }),
        ),
      )
      .subscribe(async (value) => {
        await this.cacheManager.set(`${value.id}`, value);
      });

    allCharacters.connect();
    return allCharacters;
  }
}
