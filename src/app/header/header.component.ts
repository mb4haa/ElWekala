import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
// tslint:disable-next-line:class-name
export class headerComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private router: Router ) {}

    ngOnInit() {
      if (localStorage.getItem('token')) {
        this.userIsAuthenticated = true;
      } else {
        this.userIsAuthenticated = false;
      }
    }

    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        this.router.navigate(['/']).then( ev => {
          window.location.reload();
        });
    }

    ngOnDestroy() {
    }
}
