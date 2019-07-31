import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-checkout',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.scss']
  }) 

export class CheckoutComponent implements OnInit {
    BACKEND_URL = environment.url + 'product';

    uid;
    inCart;
    getToCart;
    toBuy = [];
    totalPrice=0;
    ourCut = 0;
    fees = 0;
    
    constructor(private http: HttpClient) {}

    ngOnInit() {
      this.uid = localStorage.getItem('uid');
      const cart = localStorage.getItem('cart');
      this.inCart = cart.split(',');
      console.log(this.inCart);
      this.inCart.forEach(pid => {
        // tslint:disable-next-line:max-line-length
        this.http.patch<{}>(this.BACKEND_URL + '/getProductById' , {_id: pid})
        .subscribe(res => {
            // console.log(res.product);
            console.log(this.toBuy);
            this.toBuy.push(res.product);

            this.totalPrice += res.product.price;
            this.ourCut += res.product.price * 1.15;
            this.fees += res.product.price * 0.15;
        }, err => {
          alert(err);
          console.log(err);
        });
      });

    }
    onRemove(id: any) {
this.http.patch<{}>(this.BACKEND_URL + '/removeFromCart/' + id , {token : localStorage.getItem('token'),uid: localStorage.getItem('uid')})
        .subscribe(res => {
        const y = this.inCart.indexOf(id);
        this.inCart.splice(y, 1);
        localStorage.setItem('cart', this.inCart );
        this.totalPrice = 0;
        this.ourCut = 0;
        this.fees = 0;
        let pos = -1;
        this.toBuy.forEach(element => {
            console.log(element);
            if (element._id == id) {
                pos = this.toBuy.indexOf(element);
            } else {
            this.totalPrice += element.price;
            this.ourCut += element.price * 1.15;
            this.fees += element.price * 0.15;

            }
        });
        this.toBuy.splice(pos, 1);

        }, err => {
          alert(err);
          console.log(err);
        });
    }

}
