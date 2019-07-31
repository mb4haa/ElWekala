import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent implements OnInit {

  constructor(private http: HttpClient) { }
  users = [];
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get(environment.url + 'user/getUsers').subscribe(res => {
      this.users = res['users'];
      console.log(this.users);
    })
  }
}
