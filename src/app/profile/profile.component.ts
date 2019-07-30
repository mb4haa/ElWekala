import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Card } from './card.modal';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private currTab: string = 'listings';
  public ownProfile;
  public firstName;
  public lastName;
  public followers;
  public following;
  public listings;
  public email;
  public cards: Card[];
  public likes = [];
  public shares = [];
  public followersProfs = [];
  public followingProfs = [];
  public followerIds;
  public followingIds;
  public sharesIds;
  public likesIds;
  public image;
  constructor(private profileService: ProfileService, private http: HttpClient) { }

  ngOnInit() {
    if (localStorage.getItem('otherId')) {
      this.ownProfile = false;
      this.loadProfile(localStorage.getItem('otherId'));
    }
    else {
      this.ownProfile = true;
      this.loadProfile(localStorage.getItem('uid'));

    }

  }

  loadProfile(id: string) {
    console.log(id)
    this.http.patch(environment.url + 'user/viewProfile', { _id: id }).subscribe(response => {
      this.firstName = response['user'].firstName;
      this.lastName = response['user'].lastName;
      this.email = response['user'].email;
      this.image = response['user'].image;
      this.followers = response['user'].followers.length ;
      this.following = response['user'].following.length ;
      this.listings = response['user'].listings.length ;
      this.followerIds = response['user'].followers;
      this.followingIds = response['user'].following;
      this.sharesIds = response['user'].retweets;
      this.likesIds = response['user'].likes;
      this.loadListings(localStorage.getItem('uid'));
      this.getProductsinLikes();
      this.getProductsinShares();
      this.getFollowers();
      // this.getFollowing();
    })
  }

  loadListings(id: string) {
    this.http.patch(environment.url + 'product/getListings', { _id: id }).subscribe(response => {
      this.cards = response['products'];
    })
  }

  getProductsinLikes() {
    for (var i = 0; i < this.likesIds.length; i++) {
      this.http.patch(environment.url + 'product/getProductById', { _id: this.likesIds[i] }).subscribe(response => {
        this.likes.push(response['product']);
      })
    }
  }

  getProductsinShares() {
    for (var i = 0; i < this.sharesIds.length; i++) {
      this.http.patch(environment.url + 'product/getProductById', { _id: this.sharesIds[i] }).subscribe(response => {
        this.shares.push(response['product']);
      })
    }
  }

  getFollowers() {
    for (var i = 0; i < this.followerIds.length; i++) {
      this.http.patch(environment.url + 'user/getUserById', { _id: this.followerIds[i] }).subscribe(response => {
        this.followersProfs.push(response['user']);
      })
    }
  }

  getFollowing() {
    for (var i = 0; i < this.followingIds.length; i++) {
      this.http.patch(environment.url + 'user/getUserById', { _id: this.followingIds[i] }).subscribe(response => {
        this.followingProfs.push(response['user']);
      })
    }
  }

}
