import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
// import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NewsComponent } from './news.component';
import {itemCardComponent} from './itemCard/itemCard.component';
import {environment} from '../../environments/environment';
import { Card } from './card.modal';


const BACKEND_URL = environment.url + 'product';
@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {
  public contents: any[] = [];
  constructor(private http: HttpClient, private router: Router) { }
  private  posts: Card[] = [];
  private postsUpdated = new Subject<{posts: Card[]}>();



  getPosts() {
    // an array is a refrence type so the three dots and sqaure brackets is to take the actual data from the other array
    // return [...this.posts];
     this.http.get<{products: any}>(BACKEND_URL + '/getProducts').subscribe(res => {
      this.contents = res['products'];
      console.log(this.contents);
      this.posts = this.contents;
      this.postsUpdated.next({posts: [...this.posts]});
     });
  }

  getPostUpdateListener() {
    console.log('hena');
    console.log(this.postsUpdated);
    return this.postsUpdated.asObservable(); // allow us to listen to this subject
  }



}
