import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { SignupService } from '../../signup.service';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})

export class HeroComponent implements OnInit, OnDestroy {

  constructor(public dialog: MatDialog) { }

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
  url = '../../../assets/imgs/avatar.png';
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';
  private gender: string = 'Rather not specify';
  private size: string = 'Unknown';
  private password: string = '';
  genders: string[] = ['Rather not specify', 'Male', 'Female'];
  sizes: string[] = ['Unknown', 'XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'];

  constructor(private signupService: SignupService) { }

  onSendFile(event) {
    console.log('Ya SAAALEH');
    const sendFile: HTMLInputElement = document.querySelector('input#exampleFormControlFile1');
    console.log(sendFile);
    const file = sendFile.files[0];
    console.log(file);

    this.reader.readAsDataURL(event.target.files[0]);
    this.reader.onload = (ev) => {
      this.url = ev.target.result;
    };
  }

  onFirstName(event) {
    console.log('firstname' + event.target.value);
    this.firstName = event.target.value;
  }

  onLastName(event: any) {
    console.log('lastname' + event.target.value);
    this.lastName = event.target.value;
  }

  onEmail(event: any) {
    console.log('email' + event.target.value);
    this.email = event.target.value;
  }

  onPassword(event: any) {
    console.log('pass' + event.target.value);
    this.password = event.target.value;
  }

  onSignup(event: any) {
    console.log(this.signupService);
    this.signupService.signup({
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      size: this.size,
      password: this.password,
      email: this.email,
      image: this.url
    });
  }

  onGenderSelected(event: any) {
    console.log(event.target.value)

    this.gender = event.target.value;
  }

  onSizeSelected(event: any) {
    console.log(event.target.value)
    this.size = event.target.value;
  }
}

