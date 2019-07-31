import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HeroComponent} from './home/sign/hero.component';

import { ProfileComponent } from './profile/profile.component';

import { NewsComponent } from './news/news.component';
import { ItemDescComponent } from './item-desc/item-desc.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DisplayUsersComponent } from './display-users/display-users.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'users', component: DisplayUsersComponent},
  {path: 'news', component: NewsComponent},
  {path: 'item-desc', component: ItemDescComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path:'display', component: DisplayUsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
