import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

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
})
// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {}

