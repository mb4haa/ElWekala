import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login-service.service';
import { Subscription } from 'rxjs';

@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
 
  constructor(private authService: LoginService) {}

  ngOnInit() {
    // this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
    //   authStatus => {
    //     this.isLoading = false;
    //   }
    // );
  }

  onLogin(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authService.loginUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    // this.authStatusSub.unsubscribe();
  }
} 

