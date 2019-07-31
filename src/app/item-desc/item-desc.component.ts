import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-item-desc',
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.scss']
})
export class ItemDescComponent implements OnInit {

  BACKEND_URL = environment.url + 'product';
  product;
  likes;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const pid = localStorage.getItem('desc');
    this.http.patch<{}>(this.BACKEND_URL + '/getProductById' , {_id: pid})
    .subscribe(res => {
      console.log(res.product);
      this.product = res.product;
    }, err => {
      alert(err);
      console.log(err);
    });

    this.likes = (localStorage.getItem('likes').split(','));

  }

  onBuy(pid: any) {
    const id = localStorage.getItem('uid');
    console.log(pid);
    this.http.patch<{}>(this.BACKEND_URL + '/addToCart/' + pid, {token: localStorage.getItem('token'), uid: localStorage.getItem('uid')})
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

  rate(pid: any, like ) {
    const id = localStorage.getItem('uid');
    // tslint:disable-next-line:max-line-length
    this.http.patch<{}>(this.BACKEND_URL + '/likeProduct/' + pid, { token: localStorage.getItem('token'), uid: localStorage.getItem('uid') }).subscribe(res => {
      if (res['message'] == 'Product updated') {
        this.product.likes++;

        this.likes.push(pid);
        localStorage.setItem('likes', this.likes);
      }
    });
  }
  unrate(pid: any, like) {
    const id = localStorage.getItem('uid');
    // tslint:disable-next-line:max-line-length
    this.http.patch<{}>(this.BACKEND_URL + '/unlikeProduct/' + pid, { token: localStorage.getItem('token'), uid: localStorage.getItem('uid') }).subscribe(res => {
      if (res['message'] == 'Product updated') {
        this.product.likes--;
        const x = this.likes.indexOf(pid);
        this.likes.splice(x, 1);
        localStorage.setItem('likes', this.likes);
      }
    });
  }

  test(pid: any) {
    const id = localStorage.getItem('uid');
    // tslint:disable-next-line:max-line-length
    this.http.patch<{}>(this.BACKEND_URL + '/shareProduct/' + pid, {token: localStorage.getItem('token'), uid: localStorage.getItem('uid')}).subscribe(res => {
      if (res['message'] == 'Product updated') {
        this.product.shares++;

      }
    });

  }

}
