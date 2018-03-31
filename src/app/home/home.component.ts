import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('logs', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1})
          ]))]), {optional: true})
      ])
    ])
  
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add Log';
  logText: string = 'My first log';
  logs = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.log.subscribe(res => this.logs = res);
    this.itemCount = this.logs.length;
    this._data.changeLog(this.logs);
  }

  addItem() {
    this.logs.push(this.logText);
    this.logText = '';
    this.itemCount = this.logs.length;
    this._data.changeLog(this.logs);
  }

  removeItem(i) {
    this.logs.splice(i, 1);
    this._data.changeLog(this.logs);
  }

}
