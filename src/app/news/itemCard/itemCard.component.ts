import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { NewsServiceService } from '../news-service.service';
import { Card } from '../card.modal';
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
  cardSub = [1, 2];
  BACKEND_URL = environment.url + 'product';
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  page = 0;
  likes;


  constructor(private NewsService: NewsServiceService, private http: HttpClient) { }
  ngOnInit() {
    // this.NewsService.getPosts();
    // this.cardSub = this.NewsService.getPostUpdateListener().subscribe( (postData: { posts: Card[]}) => {
    //   this.card = postData.posts;
    //   console.log("this.card.length");
    // } );
    if (localStorage.getItem('likes') != null) {
      console.log("hena")
      this.likes = (localStorage.getItem('likes').split(","));
      console.log(this.likes)
    }
    console.log((this.likes))
    if (localStorage.getItem('filtered')) {
      this.cards = JSON.parse(localStorage.getItem('filtered'))['products'];
      localStorage.removeItem('filtered');
    }
    else {
      this.http.patch<{ products: any }>(this.BACKEND_URL + '/getProducts', { pageNumber: this.page }).subscribe(res => {
        this.cards = res['products'];
        // console.log(this.cards);
      });
    }


  }
  rate(pid: any) {
    let id = localStorage.getItem('uid')
    this.http.patch<{}>(this.BACKEND_URL + '/likeProduct/' + pid, { token: localStorage.getItem('token'), uid: localStorage.getItem('uid') }).subscribe(res => {
      if (res['message'] == 'Product updated') {
        this.cards.forEach(element => {
          if (element._id == pid) {
            element.likes += 1;
          }
        });
        this.likes.push(pid)
        localStorage.setItem('likes', this.likes);
      }
    });
  }
  unrate(pid: any) {
    let id = localStorage.getItem('uid')
    this.http.patch<{}>(this.BACKEND_URL + '/unlikeProduct/' + pid, { token: localStorage.getItem('token'), uid: localStorage.getItem('uid') }).subscribe(res => {
      if (res['message'] == 'Product updated') {
        this.cards.forEach(element => {
          if (element._id == pid) {
            element.likes -= 1;
          }
        });
        const x = this.likes.indexOf(pid)
        this.likes.splice(x, 1)
        localStorage.setItem('likes', this.likes);
      }
    });
  }
  test(pid: any) {
    let id = localStorage.getItem('uid')
    this.http.patch<{}>(this.BACKEND_URL + '/shareProduct/' + pid, { token: localStorage.getItem('token'), uid: localStorage.getItem('uid') }).subscribe(res => {
      if (res['message'] == 'Product updated') {
        this.cards.forEach(element => {
          if (element._id == pid) {
            element.shares += 1;
          }
        });

      }
    });

  }

  onBuy(pid: any) {
    const id = localStorage.getItem('uid');
    console.log(pid);
    this.http.patch<{}>(this.BACKEND_URL + '/addToCart/' + pid, { token: localStorage.getItem('token'), uid: localStorage.getItem('uid') })
      .subscribe(res => {
        console.log(res);
        const cart = localStorage.getItem('cart');
        const newCart = cart + ',' + pid;
        localStorage.setItem('cart', newCart);
        alert('Added to cart');
      }, err => {
        alert('Already in cart');
      });
  }

  onDesc(pid) {
    localStorage.setItem('desc', pid);
    console.log(pid);
  }

  onScrollDown(ev) {
    this.page++;
    console.log(this.page);
    console.log('scrolled down!!', ev);
    this.http.patch<{ products: any }>(this.BACKEND_URL + '/getProducts', { pageNumber: this.page }).subscribe(res => {
      let temp: Card[] = [];
      temp = res.products
      console.log(temp);
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
