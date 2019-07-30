import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit, OnDestroy {

constructor(public dialog: MatDialog) {}
  ngOnInit() {

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogItem);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy() {

  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog-Item',
  templateUrl: 'dialog-content-example-dialog-item.html',
  styleUrls: ['./news.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialogItem {
  private gender = 'Rather not specify';
  private size = 'Unknown';
  private password = '';
  genders: string[] = ['Rather not specify', 'Male', 'Female'];
  sizes: string[] = ['Unknown', 'XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'];

  reader = new FileReader();
  url = '../../../assets/imgs/avatar.png';


  constructor() { }

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
  onGenderSelected(event: any) {
    this.gender = event.target.value;
  }

  onSizeSelected(event: any) {
    this.gender = event.target.value;
  }



}



