import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatDialogTitle,
  MatSliderModule,
  MatButton,
  MatDialogModule,

  MatIconModule,
  MatTabGroup,
  MatTabsModule} from '@angular/material';
import {headerComponent} from './header/header.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeroComponent } from './home/sign/hero.component';
import { LoginComponent } from './home/login/login.component';
import { HiwComponent } from './home/hiw/hiw.component';
import { BrandComponent } from './home/brand/brand.component';
import { footerComponent } from './footer/footer.component';
import {DialogContentExampleDialog} from './home/sign/hero.component';
import { hwhComponent } from './home/hwh/hwh.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsComponent, DialogContentExampleDialogItem } from './news/news.component';
import { itemCardComponent } from './news/itemCard/itemCard.component';
import { ProfileItemCardComponent } from './profile/profile-item-card/profile-item-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { SignupService } from './signup.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ItemDescComponent } from './item-desc/item-desc.component';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { FiltersComponent } from './news/filters/filters.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FollowerInfoComponent } from './profile/follower-info/follower-info.component';
import { DisplayUsersComponent } from './display-users/display-users.component';

@NgModule({
  declarations: [
    AppComponent, headerComponent, HomeComponent, HeroComponent, LoginComponent, HiwComponent, BrandComponent,
    footerComponent, DialogContentExampleDialog, hwhComponent, NewsComponent, itemCardComponent, ProfileComponent,
    ProfileItemCardComponent, DialogContentExampleDialogItem, CheckoutComponent,ItemDescComponent, FiltersComponent
    , DialogContentExampleDialogItem, ItemDescComponent, CheckoutComponent, FollowerInfoComponent, DisplayUsersComponent

  ],
  imports: [
    BrowserModule,
    NgxTagsInputModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatTabsModule,
    MatSliderModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [DialogContentExampleDialog, DialogContentExampleDialogItem],
  providers: [SignupService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
