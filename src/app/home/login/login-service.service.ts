import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
// import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.url + 'user';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(email: string, password: string) {

    // const data  = JSON.stringify({email, password});
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    this.http.post<{ token: string, expiresIn: number, user: any }>('http://localhost:3000/api/user/login', { email, password });
  }
}

