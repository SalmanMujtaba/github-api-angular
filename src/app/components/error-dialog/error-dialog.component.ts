import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { appConstants } from './../../contants/common-constants';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    if (!(this.data)) {
      this.data = appConstants.DIALOG_ERROR;
    }
  }

}
