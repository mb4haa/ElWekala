import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import {NewsServiceService} from '../news-service.service';
import {Card} from '../card.modal';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@Component({
  selector: 'app-card',
  templateUrl: './itemCard.component.html',
  styleUrls: ['./itemCard.component.scss']
})
// tslint:disable-next-line:class-name
export class itemCardComponent implements OnInit, OnDestroy {

  cards: Card[] = [];
  cardSub = [1,2];
  BACKEND_URL = environment.URL + 'product';
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  page = 0;
  

  constructor(private NewsService: NewsServiceService, private http: HttpClient) {}
  ngOnInit() {
    // this.NewsService.getPosts();
    // this.cardSub = this.NewsService.getPostUpdateListener().subscribe( (postData: { posts: Card[]}) => {
    //   this.card = postData.posts;
    //   console.log("this.card.length");
    // } );
    this.http.patch<{products: any}>(this.BACKEND_URL + '/getProducts', {pageNumber: this.page}).subscribe(res => {
      this.cards = res['products'];
     //console.log(this.cards);
    });

  }

  onScrollDown(ev) {
    this.page++;
    console.log(this.page);
    console.log('scrolled down!!', ev);
    this.http.patch<{products: any}>(this.BACKEND_URL + '/getProducts', {pageNumber: this.page}).subscribe(res => {
      let temp: Card[] = [];
      temp = res['products']
      console.log(temp)
      temp.forEach(element => {
        this.cards.push(element);
      });
      console.log(res);
      console.log(this.cards);
    });
    // add another 20 items
    // const start = this.sum;
    // this.sum += 20;
    // this.appendItems(start, this.sum);
    // this.direction = 'down'
  }

  onUp() {
    console.log('up');
  }

  ngOnDestroy() {

  }
}
