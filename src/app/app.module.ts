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
  MatDialogModule} from '@angular/material';
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

@NgModule({
  declarations: [
    AppComponent, headerComponent, HomeComponent, HeroComponent, LoginComponent, HiwComponent, BrandComponent,
    footerComponent, DialogContentExampleDialog, hwhComponent, ProfileComponent
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

    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,

    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [DialogContentExampleDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
