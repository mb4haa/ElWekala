import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  name: string = ""
  price: Number = -1
  condition: string = 'Unspecified';
  size: string = 'Unknown';
  conditions: string[] = ['Unspecified', 'New', 'Used'];
  sizes: string[] = ['Unknown', 'XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'];
  tags: any = [];
  reader = new FileReader();
  url = '../../../assets/imgs/avatar.png';
  BACKEND_URL = environment.url + 'product';



  constructor(private http: HttpClient) { }

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
  onName(event) {
    this.name = event.target.value;
  }

  onPrice(event: any) {
    this.price = event.target.value;
  }

  onCondition(event: any) {
    this.condition = event.target.value;
  }

  onSize(event: any) {
    this.size = event.target.value;
  }
  onTagsChanged(event: any){
    //this.tags = event.target.value;
  }

  onAdd(event: any) {
    let finalTags = []
    this.tags.forEach(element => {
      finalTags.push(element['displayValue'])
    });
    this.http.post(this.BACKEND_URL+"/addProduct",{category:finalTags,size: this.size, condition: this.condition, price: this.price, name: this.name, img: 'img'})
    .subscribe((response) => {
      console.log(response);

    })
  }



}



