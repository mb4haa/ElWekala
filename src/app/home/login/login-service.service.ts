import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
// import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import {environment} from '../../../environments/environment';

const BACKEND_URL = environment.URL + 'user';

@Injectable({ providedIn: 'root'})
export class LoginService {

private token: string;

constructor(private http: HttpClient, private router: Router) {}

loginUser(email: string, password: string) {

  // const data  = JSON.stringify({email, password});
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  this.http.post<{token: string, expiresIn: number,user: any}>( 'http://localhost:3000/api/user/login', {email, password} )
    .subscribe(response => {
      console.log(response);
      const token = response.token;
      this.token = token;
      var name = response.user.firstName + " " + response.user.lastName
      if (token) {
      const expiresInDuration = response.expiresIn;
    //   this.setAuthTimer(expiresInDuration);
    //   this.isAuthenticated = true;
    //   this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date (now.getTime() + expiresInDuration * 1000);
      console.log(name);
      console.log(token);
      localStorage.setItem("token",token)
      localStorage.setItem("name",name)
    //   this.saveAuthData(token, expirationDate);
      this.router.navigate(['/news']);
      }
     }, error => {
       console.log(error);
    //    this.authStatusListener.next(false);
     });
  }
}

