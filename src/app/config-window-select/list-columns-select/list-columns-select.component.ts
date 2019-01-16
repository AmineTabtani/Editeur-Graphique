import { Component, OnInit, Input } from '@angular/core';
import EditorCanva from 'src/app/EditorCanva';

@Component({
  selector: 'app-list-columns-select',
  templateUrl: './list-columns-select.component.html',
  styleUrls: ['./list-columns-select.component.css']
})
export class ListColumnsSelectComponent implements OnInit {

   columns:string[];
   columnsSelected:string[] ;

  constructor() {
    if(EditorCanva.selectedNode.linkIn!=null){
      this.columns=EditorCanva.selectedNode.linkIn.fromNode.columns;

    }
    this.columnsSelected=EditorCanva.selectedNode.columns;

   }

  ngOnInit() {
    console.log('pobleme here '+this.columnsSelected);
  }
  onNgModelChange(event,v){
    console.log('selected ::  '+this.columnsSelected);
    
  }

}
