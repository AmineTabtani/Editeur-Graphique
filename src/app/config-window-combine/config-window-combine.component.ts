import {Component, Inject,OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ListColumnsCombineComponent } from './list-columns-combine/list-columns-combine.component';
import EditorCanva from '../EditorCanva';

@Component({
  selector: 'app-config-window-combine',
  templateUrl: './config-window-combine.component.html',
  styleUrls: ['./config-window-combine.component.css']
})
export class ConfigWindowCombineComponent implements OnInit {

  @ViewChild('ListColumn1') listColumns1:ListColumnsCombineComponent;
  @ViewChild('ListColumn2') listColumns2:ListColumnsCombineComponent;

  constructor(public dialogRef: MatDialogRef<ConfigWindowCombineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    if(EditorCanva.selectedNode.columns==null) EditorCanva.selectedNode.columns=[];
    if(EditorCanva.selectedNode.linkIn2!=null && EditorCanva.selectedNode.linkIn2.fromNode.columns!=null){
      this.listColumns2.columns =EditorCanva.selectedNode.linkIn2.fromNode.columns;
      // if(EditorCanva.selectedNode.linkIn2!=null)
      // EditorCanva.selectedNode.columns=EditorCanva.selectedNode.columns.concat(EditorCanva.selectedNode.linkIn2.fromNode.columns);
    }
    if(EditorCanva.selectedNode.linkIn!=null && EditorCanva.selectedNode.linkIn.fromNode.columns!=null){
      this.listColumns1.columns =EditorCanva.selectedNode.linkIn.fromNode.columns;
      // if(EditorCanva.selectedNode.linkIn1!=null)
      // EditorCanva.selectedNode.columns=EditorCanva.selectedNode.columns.concat(EditorCanva.selectedNode.linkIn1.fromNode.columns);
    }
    
    this.listColumns1.columnsSelected=EditorCanva.selectedNode.column1;
    this.listColumns2.columnsSelected=EditorCanva.selectedNode.column2;
    
  }
  onClose(){
    this.dialogRef.close();
  }
  onSave(){
    EditorCanva.selectedNode.column1= this.listColumns1.columnsSelected;
    EditorCanva.selectedNode.column2= this.listColumns2.columnsSelected;

    this.onClose();
  }

}
