import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { stringify } from 'querystring';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  tags = 'Summer,Winter,Formal,Casual,';
  conditions = 'Used,New';
  upperBound = 9999;
  sizes = 'XS,Small,Medium,Large,XL,XXL';
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onCheckbox(event: any) {
    if(this.tags.includes(event.target.value)){
      this.tags = this.tags.replace(event.target.value + ',','');
    }
    else{
      this.tags = this.tags + ',' + event.target.value;
      console.log(this.tags);
    }
  }

  onCheckboxCondition(event: any) {
    if(this.conditions.includes(event.target.value)){
      this.conditions = this.conditions.replace(event.target.value + ',','');
    }
    else{
      this.conditions = this.conditions + ',' + event.target.value;
    }
  }

  onCheckboxSize(event: any) {
    if(this.sizes.includes(event.target.value)){
      this.sizes = this.sizes.replace(event.target.value + ',','');
    }
    else{
      this.sizes = this.sizes + ',' + event.target.value;
      console.log(this.sizes);
    }
  }

  onApplyFilters() {
    this.http.patch(environment.url + 'filter/filter', { 
      size:this.sizes,
      lowerBound: 0,
      upperBound: this.upperBound,
      condition: this.conditions,
      tags: this.tags,
      category: ''
     }).subscribe(res => {
       localStorage.setItem('filtered',JSON.stringify(res));
       window.location.reload();
     })
  }

  pitch(event: any) {
    this.upperBound = event.value;
  }
}
