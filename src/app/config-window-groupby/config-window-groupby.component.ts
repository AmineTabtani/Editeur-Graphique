import {Component, Inject,OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-config-window-groupby',
  templateUrl: './config-window-groupby.component.html',
  styleUrls: ['./config-window-groupby.component.css']
})
export class ConfigWindowGroupbyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfigWindowGroupbyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

}
