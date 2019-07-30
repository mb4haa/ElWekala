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
  MatButton,
  MatDialogModule,
  MatIconModule} from '@angular/material';
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
import { NewsComponent } from './news/news.component';
import { itemCardComponent } from './news/itemCard/itemCard.component';
<<<<<<< HEAD
import { SignupService } from './signup.service';
=======
>>>>>>> 5ccfa605f8c9b472e5500dbd494832596059fd14
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent, headerComponent, HomeComponent, HeroComponent, LoginComponent, HiwComponent, BrandComponent,
    footerComponent, DialogContentExampleDialog, hwhComponent, NewsComponent, itemCardComponent,ProfileComponent

  ],
  imports: [
    BrowserModule,
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
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
<<<<<<< HEAD
=======

>>>>>>> 5ccfa605f8c9b472e5500dbd494832596059fd14
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [DialogContentExampleDialog],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
