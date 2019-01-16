import { Component, OnInit, ViewChild } from '@angular/core';
//import "data" from "./data"
// import * as myJson from './data.json';

import MyButton from '../myUI/MyButton';
import MyNodeSource from '../myUI/MyNodeSource';
import EditorCanva from '../EditorCanva';
import MyLinkButton from '../myUI/MyLinkButton';
import { MatDialog } from '@angular/material';
import { ConfigWindowSelectComponent } from '../config-window-select/config-window-select.component';
import { ConfigWindowCombineComponent } from '../config-window-combine/config-window-combine.component';
import { ConfigWindowGroupbyComponent } from '../config-window-groupby/config-window-groupby.component';
import { HttpClient } from '@angular/common/http';
// import { ConfigDataService } from './configdata.service';
declare var PIXI:any;

@Component({
  selector: 'app-editor-node',
  templateUrl: './editor-node.component.html',
  styleUrls: ['./editor-node.component.css']
})
export class EditorNodeComponent implements OnInit {

  @ViewChild('pixiContainer') pixiContainer;
  //public app: any;
  public ConfigWindow :any;
  x0=EditorCanva.widthWindow-EditorCanva.widthPanel+40;
  x00=EditorCanva.widthWindow-EditorCanva.widthPanel+40;
  y0=(EditorCanva.heightWindow+EditorCanva.heightZoneTitle*2-100)/2;
  indexRow=1;
  indexColumn=1;
  widthNode=47;heightNode=60;
  // configDataFiles = new Array<ConfigDataFiles>();

  constructor(public dialog: MatDialog) {
    // constructor(public dialog: MatDialog, private configDataService:ConfigDataService) {
  }
  openSelectConfig(): void {
    const dialogRef = this.dialog.open(ConfigWindowSelectComponent, {
      width: EditorCanva.widthWindow+'px',
      height: EditorCanva.heightScene+'px',
      //disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  openCombineConfig(): void {
    const dialogRef = this.dialog.open(ConfigWindowCombineComponent, {
      width: EditorCanva.widthWindow+'px',
      height: EditorCanva.heightScene+'px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  openGroupbyConfig(): void {
    const dialogRef = this.dialog.open(ConfigWindowGroupbyComponent, {
      width: EditorCanva.widthWindow+'px',
      height: EditorCanva.heightScene+'px',
      //disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  ngOnInit(){
    //console.log('my data JSON :' );
    // let obs= this.configDataService.getDataServer();
    // obs.subscribe(()=>console.log('GOT RESPONSE FROM SERVER  ') );
    //obs.subscribe((data: ConfigDataFiles) => this.configDataFiles = { ...data });
    //console.log('GOT RESPONSE FROM SERVER  ',this.configDataFiles);
    // obs.subscribe((data =>
    //   {
    //     this.configDataFiles = data.map(item =>
    //     {
    //       let c=new ConfigDataFiles( item.fileName,item.fileType,item.columns);
    //      console.log('GOT RESPONSE FROM SERVER add ',c);
    //      this.createDatasetsSource(c);
    //       return c;
    //     });
    //   }));

    EditorCanva.app = new PIXI.Application(EditorCanva.widthWindow , EditorCanva.heightWindow, { autoResize: true,backgroundColor: 0x999999 ,antialias:true});
    this.pixiContainer.nativeElement.appendChild(EditorCanva.app.view);

    //background all part of screen
    let graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0x000000, 1);
      //where run and view
    graphics.beginFill(0x9d8f8f);
    graphics.drawRect(0, 0, EditorCanva.widthWindow-EditorCanva.widthPanel, EditorCanva.heightZoneTitle);
    graphics.endFill();
      // scene where node
    graphics.beginFill(0xbcbab8);
    graphics.drawRect(0, EditorCanva.heightZoneTitle, EditorCanva.widthWindow-EditorCanva.widthPanel, EditorCanva.heightWindow-EditorCanva.heightZoneTitle);
    graphics.endFill();
    // where title Palette
    graphics.beginFill(0x535962);
    graphics.drawRect(EditorCanva.widthWindow-EditorCanva.widthPanel, 0, EditorCanva.widthPanel, EditorCanva.heightZoneTitle);
    graphics.endFill();
    // title transformation
    graphics.beginFill(0x5c7893);
    graphics.drawRect(EditorCanva.widthWindow-EditorCanva.widthPanel, EditorCanva.heightZoneTitle, EditorCanva.widthPanel, EditorCanva.heightZoneTitle);
    graphics.endFill();
    // where  transformation
    graphics.beginFill(0x84a1be);
    graphics.drawRect(EditorCanva.widthWindow-EditorCanva.widthPanel, EditorCanva.heightZoneTitle*2, EditorCanva.widthPanel,EditorCanva.heightPanel/2 );
    graphics.endFill();

    // title  datasets
    graphics.beginFill(0x5c7893);
    graphics.drawRect(EditorCanva.widthWindow-EditorCanva.widthPanel, (EditorCanva.heightWindow+EditorCanva.heightZoneTitle)/2-EditorCanva.heightPanel/2, EditorCanva.widthPanel, EditorCanva.heightZoneTitle);
    graphics.endFill();
    // where  datasets
    graphics.beginFill(0x84a1be);
    graphics.drawRect(EditorCanva.widthWindow-EditorCanva.widthPanel,(EditorCanva.heightWindow+EditorCanva.heightZoneTitle*3)/2-EditorCanva.heightPanel/2 , EditorCanva.widthPanel,EditorCanva.heightPanel*3/2 );
    graphics.endFill();

    EditorCanva.app.stage.addChild(graphics);

    // button Run ,View result
    let runButton=new MyButton(200,25,EditorCanva.widthButton,EditorCanva.heightButton,'assets/images/node4.png');
    EditorCanva.app.stage.addChild(runButton);
    runButton.clicked = () => {
      if(EditorCanva.linkButton.nodeFrom!=null)  EditorCanva.linkButton.nodeFrom.numberOut=0;
      EditorCanva.linkButton.stopLinking();
      console.log('RUN clicked');
      console.log(EditorCanva.selectedNode.id);
      //console.log(''+EditorCanva.nodes[2].type);      
    }
    let previewButton=new MyButton(800,25,EditorCanva.widthButton,EditorCanva.heightButton,'assets/images/node5.png');
    EditorCanva.app.stage.addChild(previewButton);
    previewButton.clicked = () => {
      if(EditorCanva.linkButton.nodeFrom!=null) EditorCanva.linkButton.nodeFrom.numberOut=0;
      EditorCanva.linkButton.stopLinking();
      
      console.log('REVIEW clicked');
      console.log('links{'+EditorCanva.links.length+'}='+ EditorCanva.links);
      console.log('nodes{'+EditorCanva.nodes.length+'}='+EditorCanva.nodes);
      console.log('cose node of Selected Node :');
      if(EditorCanva.selectedNode.linkIn!=null)
      console.log('  '+EditorCanva.selectedNode.linkIn.fromNode.id+'  '+EditorCanva.selectedNode.linkIn.fromNode.type);
      if(EditorCanva.selectedNode.linkIn2!=null)
      console.log('  '+EditorCanva.selectedNode.linkIn2.fromNode.id+'  '+EditorCanva.selectedNode.linkIn2.fromNode.type);
      if(EditorCanva.selectedNode.linkOut!=null)
      console.log('  '+EditorCanva.selectedNode.linkOut.toNode.id+'  '+EditorCanva.selectedNode.linkOut.toNode.type);
    }

    //Titles

    var paletteTitle = new PIXI.Text('Palette');
    paletteTitle.style=new PIXI.TextStyle({
      fill:0xffffff,
      stroke:0x000000,
      strokeThickness:5,
      dropShadow:true,
      dropShadowColor:0x333333
    });
    paletteTitle.x = EditorCanva.widthWindow-(EditorCanva.widthPanel+paletteTitle.width)/2;
    paletteTitle.y = 12;
    EditorCanva.app.stage.addChild(paletteTitle);

    var transformationTitle = new PIXI.Text('Transformations');
    transformationTitle.style=new PIXI.TextStyle({
      fill:0xffffff,
      stroke:0x000000,
      strokeThickness:5,
      dropShadow:true,
      dropShadowColor:0x333333
    });
    transformationTitle.x = EditorCanva.widthWindow-(EditorCanva.widthPanel+transformationTitle.width)/2;
    transformationTitle.y = 62;
    EditorCanva.app.stage.addChild(transformationTitle);
    
    var datasetsTitle = new PIXI.Text('Datasets');
    datasetsTitle.style=new PIXI.TextStyle({
      fill:0xffffff,
      stroke:0x000000,
      strokeThickness:5,
      dropShadow:true,
      dropShadowColor:0x333333
    });
    datasetsTitle.x = EditorCanva.widthWindow-(EditorCanva.widthPanel+datasetsTitle.width)/2;
    datasetsTitle.y = 6+(EditorCanva.heightWindow+EditorCanva.heightZoneTitle)/2-EditorCanva.heightPanel/2;
    EditorCanva.app.stage.addChild(datasetsTitle);

    //Transformation Node

    let selectNode=new MyNodeSource(1,1,'select',EditorCanva.widthWindow-EditorCanva.widthPanel*3/4,EditorCanva.heightZoneTitle*2+EditorCanva.heightButton*0.6
                                ,EditorCanva.widthButton,EditorCanva.heightButton,'assets/images/node.png');
    //  EditorCanva.app.stage.addChild(selectNode);
    selectNode.columns=null;


    let combineNode=new MyNodeSource(2,1,'combine',selectNode.x+EditorCanva.widthPanel/2,selectNode.y
                                  ,EditorCanva.widthButton,EditorCanva.heightButton,'assets/images/node2.png');
    // EditorCanva.app.stage.addChild(combineNode);
    combineNode.columns=null;


    let groupByNode=new MyNodeSource(1,1,'groupBy',combineNode.x,combineNode.y+EditorCanva.heightButton+10
                                ,EditorCanva.widthButton,EditorCanva.heightButton,'assets/images/node3.png');
    // EditorCanva.app.stage.addChild(groupByNode);
    groupByNode.columns=null;

    this.createDatasetsSource();
    

    // button LINK two Nodes

    EditorCanva.linkButton=new MyLinkButton(selectNode.x,groupByNode.y,EditorCanva.widthButton,EditorCanva.heightButton,'assets/images/buttonLink.png');
    EditorCanva.app.stage.addChild(EditorCanva.linkButton);

    //Button delete
    let deleteButton=new MyButton(500,27,EditorCanva.heightButton,EditorCanva.heightButton,'assets/images/delete.png');
    EditorCanva.app.stage.addChild(deleteButton);
    deleteButton.clicked = () => {
      EditorCanva.linkButton.stopLinking();
      EditorCanva.deleteSelectedNode();
      console.log('DELETE clicked');
    }
    //Button Config Node
    let configButton=new MyButton(560,27,EditorCanva.heightButton,EditorCanva.heightButton,'assets/images/config.png');
    EditorCanva.app.stage.addChild(configButton);
    configButton.clicked = () => {
      // console.log('GOT RESPONSE FROM SERVER  ',this.configDataFiles);
      if(EditorCanva.selectedNode!=null){
        if(EditorCanva.selectedNode.type=='select') this.openSelectConfig();
        else if(EditorCanva.selectedNode.type=='combine') this.openCombineConfig();
        else if(EditorCanva.selectedNode.type=='groupBy') this.openGroupbyConfig();
      }
      
      console.log('Config clicked');
    }

    //draw links
    EditorCanva.app.stage.addChild(EditorCanva.graphicLinks);
    EditorCanva.updateLinks();
  }

  createDatasetsSource(){
    //DataSets examples
    let nbrDataStes:number=16;
    let x0=EditorCanva.widthWindow-EditorCanva.widthPanel+40;
    let x00=x0;
    let y0=(EditorCanva.heightWindow+EditorCanva.heightZoneTitle*2-100)/2;
    let indexRow=1;
    let indexColumn=1;
    let widthNode=47,heightNode=60;
    let i=0;
    for(i=0;i<16;i++){
      let dataSetsNode=new MyNodeSource(0,1,'dataset',x0,y0
                                ,widthNode,heightNode,'assets/images/dataset.png');
      EditorCanva.app.stage.addChild(dataSetsNode);
      dataSetsNode.setName('File1.csv');
      dataSetsNode.columns=['id','nom','age','prénom','métier','id-entreprise'];
      indexColumn++;
      if(indexColumn>4){
        indexColumn=1;
        indexRow++;
        y0=y0+heightNode+20;
        x0=x00;
      } else{
        x0=x0+widthNode+10;
      }
       
    }



    // let dataSetsNode=new MyNodeSource(0,1,config.fileName.concat('.'.concat(config.fileType)),this.x0,this.y0
    //                             ,this.widthNode,this.heightNode,'assets/images/dataset.png');
    //   // EditorCanva.app.stage.addChild(dataSetsNode);
    //   dataSetsNode.setName(config.fileName);
    //   dataSetsNode.columns=config.columns;
    //   this.indexColumn++;
    //   if(this.indexColumn>4){
    //     this.indexColumn=1;
    //     this.indexRow++;
    //     this.x0=this.x0+this.widthNode+10;
    //     this.x0=this.x00;
    //   } else{
    //     this.y0=this.y0+this.heightNode+20;
    //   }
  }

}
