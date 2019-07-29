import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { SignupService } from '../../signup.service';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})

export class HeroComponent implements OnInit, OnDestroy {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {

  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

ngOnDestroy() {

}

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./hero.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {
  reader = new FileReader();
  url = '';
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';
  private gender: string = '';
  private size: string = '';

  constructor(public signupService: SignupService){}

  onSendFile(event) {
    console.log('Ya SAAALEH');
    const sendFile: HTMLInputElement = document.querySelector('input#exampleFormControlFile1');
    console.log(sendFile);
    const file = sendFile.files[0];
    console.log(file);

    this.reader.readAsDataURL(event.target.files[0]);
    this.reader.onload = (ev) => {
      this.url = ev.target.result;
      console.log(this.url);
    };
  }

  onFirstName(event){
    this.firstName = event.target.value;
  }

  onLastName(event: any){
    this.firstName = event.target.value;
    console.log(this.firstName);
  }

  onEmail(event: any){
    this.firstName = event.target.value;
    console.log(this.firstName);
  }

  onSignup(form: NgForm){
    console.log(form.value);
    this.signupService.signup({});
  }

  onGenderSelected(event: any){

  }
}

