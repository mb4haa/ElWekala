import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hiw',
  templateUrl: './hiw.component.html',
  styleUrls: ['./hiw.component.scss']
})
// tslint:disable-next-line:class-name
export class HiwComponent implements OnInit, OnDestroy {
  who = false; // seller is false buyer is true...who
  ngOnInit() {

  }

  onWho() {
    this.who = !this.who;
  }

  ngOnDestroy() {

  }
}
