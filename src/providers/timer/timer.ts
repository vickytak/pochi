
import { Injectable } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';

/*
  Generated class for the TimerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimerProvider {
  countDown;
  count = 10;
  constructor() {   
   this.init(this.count);
  }

  init(count){
    this.countDown = timer(0,1000).pipe(
      take(count),
      map(()=> --count)
   );   
  }

}
