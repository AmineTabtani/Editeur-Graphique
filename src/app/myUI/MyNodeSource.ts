import MyNode from "./MyNode";
import EditorCanva from "../EditorCanva";

declare var PIXI:any;
export default class MyNodeSource extends PIXI.Sprite {

    type:string;
    name:string=null;
    columns:string[];
    maxOut:number;
    maxIn:number;
    subName :any;

    constructor(maxIn:number,maxOut:number,type:string,x: number, y: number, width: number, height: number,pathImage: string) {
        super();
        this.maxIn=maxIn;
        this.maxOut=maxOut;
        this.type=type;
        this.create(x, y, width, height,pathImage);
    }

    create(x: number, y: number, width: number, height: number,pathImage: string) {
        //  generate the texture
        
        this.texture =PIXI.Texture.fromImage(pathImage);
        this.width=width;
        this.height=height;

        // set the x, y and anchor
        this.x = x;
        this.y = y;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.subName= new PIXI.Text(this.name);
        this.subName.style=new PIXI.TextStyle({
            fill:0x000000,
            fontSize:12,
            fontStyle:'oblique'
        });
        this.subName.x = this.x-this.width/2;
        this.subName.y = this.y+this.height/2;
        EditorCanva.app.stage.addChild(this);
        EditorCanva.app.stage.addChild(this.subName);

        this.on('pointerdown',event =>{
            if(EditorCanva.linkButton.nodeFrom!=null)  EditorCanva.linkButton.nodeFrom.numberOut=0;//before stop linking
            EditorCanva.linkButton.stopLinking();
            
            EditorCanva.deselectAllNodes();
            let xx=new MyNode(EditorCanva.lastIdNode,this.maxIn,this.maxOut,this.type,this.x,this.y
              ,this.width,this.height,pathImage);
              xx.setName(this.name);
              xx.type=this.type;
              xx.columns=this.columns;
              EditorCanva.lastIdNode++;
              console.log('last id +1  = '+EditorCanva.lastIdNode);
              xx.data=event.data;
              xx.dragging=true;
              EditorCanva.app.stage.addChild(xx);
      
          });

        // set the interactivity to true and assign callback functions
        this.interactive = true;
        this.buttonMode=true;
        this.on("mousedown", () => {
            this.onDown();
        }, this);

        this.on("mouseover", () => {
            this.onHover();
        }, this);

        this.on("mouseout", () => {
            this.onOut();
        }, this);
    }


    private onDown() {
        this.tint = 0xffffff;
    }

    private onHover() {
        this.tint = 0xffc4df;
    }

    private onOut() {
        this.tint = 0xffffff;
    }
    public setName(n:string){
        this.name=n;
        this.subName.setText(n);
    }
    
}