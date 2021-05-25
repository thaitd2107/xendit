import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { CharactersService } from '../characters.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class TasksService implements OnApplicationBootstrap {
  constructor(private charactersService: CharactersService) {}
  @Cron(CronExpression.EVERY_10_MINUTES)
  consumeCharacters() {
    console.log('Consuming Characters...');
    this.charactersService.consumeData();
  }

  onApplicationBootstrap() {
    console.log('Starting consuming characters data');
    this.charactersService.consumeData().pipe(
      tap({
        complete: () => {
          console.log('End consuming cache');
        },
      }),
    );
  }
}
