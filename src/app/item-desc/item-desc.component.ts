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
  str:string;
  comments;
  userNames:any[] = [];
  commentBodies:any[] = [];
  finalComment:Comment[] = [];
  testComment:Comment
  finalArr = [];
  constructor(private http: HttpClient) { }
//  
  ngOnInit() {
    const pid = localStorage.getItem('desc');
    this.http.patch<{product:any}>(this.BACKEND_URL + '/getProductById', {_id: pid})
    .subscribe(res => {
      console.log(res.product);
      this.product = res.product;
    }, err => {
      alert(err);
      console.log(err);
    });
    const id = pid
    this.likes = (localStorage.getItem('likes').split(','));
    this.http.patch<{comments:any}>(this.BACKEND_URL + '/getProductComments/'+id, {token:localStorage.getItem('token'),uid:localStorage.getItem('uid')})
    .subscribe(res => {

      console.log(res.comments);
      this.comments = res.comments;

      this.comments.forEach(element => {
        console.log(element)
        var arr = element.split(",") 
        var t = {comment:arr[1],commenter:arr[0]} 
        this.finalArr.push(t)
        console.log(arr)
        this.userNames.push(arr[0])
        this.commentBodies.push(arr[1])
      });
    }, err => {
      alert(err);
      console.log(err);
    });
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
comment(pid:any){
 // console.log(this.str)
 this.http.post<{}>(this.BACKEND_URL + '/addComment/'+pid, {id:localStorage.getItem('uid'),token:localStorage.getItem('token'),uid:localStorage.getItem('uid'),name:localStorage.getItem('name'),comment:this.str}).subscribe(res => {
  if(res['message']=='Comment added'){
    console.log("AS")
    this.str = ""
    console.log(res['Product'])
  }
  else{

  }
 });
}
doTextareaValueChange(event){
  this.str = event.target.value
}
}
