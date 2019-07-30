import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public ownProfile;
  public firstName;
  public lastName;
  public followers;
  public following;
  public listings;
  public email;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    if(localStorage.getItem('otherId')){
      this.ownProfile = false;
      this.loadProfile(localStorage.getItem('otherId'));
      this.loadListings(localStorage.getItem('otherId'));
    }
    else{
      this.ownProfile = true;
      this.loadProfile(localStorage.getItem('uid'));
      this.loadListings(localStorage.getItem('uid'));
    }
    //
  }

  loadProfile(id: string){
    var result = this.profileService.loadProfile(id);
    this.firstName = localStorage.getItem('dispfirstname');
    this.lastName = localStorage.getItem('displastname');
    this.email= localStorage.getItem('dispemail');
    this.followers= localStorage.getItem('dispfollowers').split(',').length - 1;
    this.following= localStorage.getItem('dispfollowing').split(',').length - 1;
    this.listings= localStorage.getItem('displistings').split(',').length - 1;
    // console.log(result);
  }

  loadListings(id: string){
    this.profileService.loadListings(id);
  }
}
