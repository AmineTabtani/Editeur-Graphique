import {Component, Inject,OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import EditorCanva from '../EditorCanva';
import { ListColumnsSelectComponent } from './list-columns-select/list-columns-select.component';

@Component({
  selector: 'app-config-window-select',
  templateUrl: './config-window-select.component.html',
  styleUrls: ['./config-window-select.component.css']
})
export class ConfigWindowSelectComponent implements OnInit {

  @ViewChild('ListColumn') listColumns:ListColumnsSelectComponent;
  condition:string;

  constructor(public dialogRef: MatDialogRef<ConfigWindowSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      dialogRef.disableClose = true;
      this.condition=EditorCanva.selectedNode.conditionWhere;
    }

  ngOnInit() {
    console.log('Config select  node = '+EditorCanva.selectedNode.id)
  }
  onClose(){
    this.dialogRef.close();
  }
  onSave(){
    console.log(this.listColumns.columnsSelected);
    EditorCanva.selectedNode.columns=this.listColumns.columnsSelected;
    EditorCanva.selectedNode.conditionWhere=this.condition;

    //update other nodes
    let n=EditorCanva.selectedNode;
    let notYet=true;
    while(notYet){
      if(n.linkOut!=null){
        if(n.linkOut.toNode.type=='combine'){
          n.linkOut.toNode.columns=[];
          if(n.linkOut.toNode.linkIn!=null)
          n.linkOut.toNode.columns=n.linkOut.toNode.columns.concat(n.linkOut.toNode.linkIn.fromNode.columns);
          if(n.linkOut.toNode.linkIn2!=null)
          n.linkOut.toNode.columns=n.linkOut.toNode.columns.concat(n.linkOut.toNode.linkIn2.fromNode.columns);
          
        }
        else if(n.linkOut.toNode.type=='select'){
          n.linkOut.toNode.columns=[];
        }
        //console.log('boucle infini');
        if(n.linkOut.toNode.linkOut==null){
          notYet=false;
        }
        else n=n.linkOut.toNode;
      }
      else{
        notYet=false;
      }
      
    }

    

    this.onClose();
  }
}
