import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-desc',
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.scss']
})
export class ItemDescComponent implements OnInit {
str:string
  BACKEND_URL: string = environment.url;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
comment(pid:any){
 // console.log(this.str)
 this.http.patch<{}>(this.BACKEND_URL + '/addComment  /'+pid, {id:localStorage.getItem('uid'),token:localStorage.getItem('token'),uid:localStorage.getItem('uid'),name:localStorage.getItem('name'),comment:this.str}).subscribe(res => {
  if(res['message']=='Comment added'){
    console.log("AS")
  }
  else{

  }
 });
}
doTextareaValueChange(event){
  this.str = event.target.value
}
}
