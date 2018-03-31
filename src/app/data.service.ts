import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private logs = new BehaviorSubject<any>(['Arrived at SAG A', 'Holy neutron star batman!']);
  log = this.logs.asObservable();

  constructor() { }

  changeLog(log) {
    this.logs.next(log);
  }

}
