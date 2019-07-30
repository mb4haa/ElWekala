import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  loadProfile(id: string) {
    // console.log(id);
    this.http.patch(environment.url + 'user/viewProfile', { _id: id }).subscribe(response => {
      // console.log(response);
      localStorage.setItem("dispfirstname", response['user'].firstName);
      // console.log(localStorage.getItem("dispfirstname"));
      localStorage.setItem("displastname", response['user'].lastName);
      // console.log(localStorage.getItem("displastname"));

      localStorage.setItem("dispfollowers", response['user'].followers);
      localStorage.setItem("dispfollowing", response['user'].following);
      localStorage.setItem("displistings", response['user'].listings);
      localStorage.setItem("dispemail", response['user'].email);

    })
  }

  loadListings(id: string) {
    this.http.patch(environment.url + 'product/getListings', {_id: id}).subscribe(response => {
      console.log(response);
    })
  }
}
