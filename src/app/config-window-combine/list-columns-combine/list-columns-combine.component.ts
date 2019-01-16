import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material';

@Component({
  selector: 'app-list-columns-combine',
  templateUrl: './list-columns-combine.component.html',
  styleUrls: ['./list-columns-combine.component.css']
})
export class ListColumnsCombineComponent implements OnInit {

  @ViewChild(MatSelectionList) selectionList: MatSelectionList;
  @Input() mytitle:string;

  columns:string[]=[];
  columnsSelected:string[] ;

  constructor() { }

  ngOnInit() {
    this.selectionList.selectionChange.subscribe((s: MatSelectionListChange) => {          
    this.selectionList.deselectAll();
    s.option.selected = true;
  });
  }

  onNgModelChange(event,v){
    // console.log('selected ::  '+this.columnsSelected);
    
  }
}
