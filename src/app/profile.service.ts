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
    
  }

  loadListings(id: string) {
    
  }
}
