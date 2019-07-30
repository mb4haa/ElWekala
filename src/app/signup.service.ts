import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(input: any) {
    console.log(input);
    // console.log(this.http.get(environment.url + 'user/getUsers').subscribe(res => {console.log(res)}));
    this.http.post(environment.url + 'user/signup', input).subscribe(res => {console.log(res)},err =>{
      alert(err['error']['message'])
      console.log(err)
    });
  }
}
