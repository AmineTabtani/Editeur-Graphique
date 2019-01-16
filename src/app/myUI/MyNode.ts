import EditorCanva from "../EditorCanva";
import MyLink from "./MyLink";

declare var PIXI:any;
export default class MyNode extends PIXI.Sprite {

    name:string;
    columns:string[];
    column1:string[];
    column2:string[];
    conditionWhere:string=null;
    linkOut:MyLink;
    linkIn:MyLink;
    linkIn2:MyLink;
    subName :any;

    isInsideScene=false;
    isSelected=false;
    type:string;
    id:number;
    maxOut:number;
    maxIn:number;
    numberOut:number=0;
    numberIn:number=0;
    

    constructor(id:number,maxIn:number,maxOut:number,type:string,x: number, y: number, width: number, height: number,pathImage: string) {
        super();
        this.id=id;
        this.maxIn=maxIn;
        this.maxOut=maxOut;
        this.type=type;
        this.create(x, y, width, height,pathImage);
        //if(type==='dataset')this.columns=['test','test2'];
        //else this.columns=null;
        this.columns=null;
        this.linkOut=null;
        this.linkIn2=null;
        this.linkIn=null;
    }
    public setName(n:string){
        this.name=n;
        this.subName.setText(n);
    }
    public setColumns(c:[]){
        this.columns=c;
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

        // set the interactivity to true and assign callback functions
        this.interactive = true;
        this.buttonMode=true;

       
        this.on('pointerdown',this.onDragStart)
            .on('pointerup',this.onDragEnd)
            .on('pointerupoutside',this.onDragEnd)
            .on('pointermove',this.onDragMove);
        
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
    select(){
        this.isSelected=true;
        this.tint = 0xffc4df;
        EditorCanva.selectedNode=this;
    }
    deselect(){
        this.isSelected=false;
        this.tint = 0xffffff;
    }
    // public updateColumns(){
    //     if(this.linkOut!=null && this.linkOut.toNode.type=="combine"){
            
    //     }
    //     else if(this.linkOut!=null && this.linkOut.toNode.type=="select"){
    //         this.linkOut.toNode.column=this.columns;
    //     }
    // }
    private onDown() {
        if(EditorCanva.linkButton.isLinkingNodes){
            // select first node to link
            if(  EditorCanva.linkButton.nodeFrom===null){
                if(this.numberOut<this.maxOut ){
                    console.log('select first node');
                    EditorCanva.linkButton.nodeFrom=this;
                    this.numberOut++;
                }
                else EditorCanva.linkButton.stopLinking();
            }
            else if(EditorCanva.linkButton.nodeFrom!==this &&
                    !EditorCanva.isLinkExist(this,EditorCanva.linkButton.nodeFrom) ){
                if(this.numberIn<this.maxIn && EditorCanva.linkButton.nodeTo===null){
                    //add second node to link 
                    EditorCanva.linkButton.nodeTo=this;
                    //we have here 2 nodes to connect
                    console.log('select second node ');
                    EditorCanva.linkButton.linkNodes();
                    //update columns
                    let n=EditorCanva.linkButton.nodeFrom;
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
                    
                    // forget 2 two node this.nodeFrom=this.nodeTo=null
                    EditorCanva.linkButton.stopLinking();
                    EditorCanva.deselectAllNodes();
                    EditorCanva.updateLinks();
                    
                    
                    this.numberIn++;
                }
                else {
                    if(EditorCanva.linkButton.nodeFrom!=null)  EditorCanva.linkButton.nodeFrom.numberOut=0;
                    EditorCanva.linkButton.stopLinking();
                    if(EditorCanva.linkButton.nodeFrom!=null)  EditorCanva.linkButton.nodeFrom.numberOut=0;
                }
            }
            else{
                if(EditorCanva.linkButton.nodeFrom!=null) EditorCanva.linkButton.nodeFrom.numberOut=0;
                EditorCanva.linkButton.stopLinking();
            } 
        }
        else{
            EditorCanva.deselectAllNodes();
        }
        if(this.isSelected){
            this.deselect();
        }
        
        else {
            console.log('node selected ID :'+this.id+' type : '+this.type+' name : '+this.name+' : in  = '+this.numberIn+'  out =  '+this.numberOut);
            console.log('columns '+this.columns+'       condition '+this.conditionWhere);
            this.select();
        }
    }
    private onHover() {
        this.tint = 0xf2f2b0;
    }
    private onOut() {
        if(this.isSelected)  this.tint = 0xffc4df;
        else this.tint = 0xffffff;
    }

    onDragStart(event) {
        //console.log('Clicked');
        // this.tint = 0xffffff;
        this.data=event.data;
        this.dragging=true;
    }

    onDragEnd(event) {
        //console.log('onup');
        // this.tint = 0xffc4df;
        delete this.data;
        this.dragging=false;
        
        if(this.x < EditorCanva.widthScene && this.x>EditorCanva.xScene &&
           this.y < EditorCanva.heightWindow && this.y>EditorCanva.yScene){
            if(!this.isInsideScene) {
                EditorCanva.nodes.push(this);
                this.isInsideScene=true;
                this.select();
            }
        }
        else{
            if(!this.isInsideScene)
            this.parent.removeChild(this.subName); 
            this.parent.removeChild(this);
        }
        
    }

    onDragMove(event) {
        //console.log('On Hover');
        //this.tint = 0xffc4df;
        if(this.dragging===true){
            const newPosition=this.data.getLocalPosition(this.parent);
            if(this.isInsideScene){
                if( this.x <= EditorCanva.widthScene && this.x>=EditorCanva.xScene &&
                    this.y <= EditorCanva.heightWindow && this.y>=EditorCanva.yScene){
                        this.position.x = newPosition.x;
                        this.position.y = newPosition.y;
                        this.subName.x = this.x-this.width/2;
                        this.subName.y = this.y+this.height/2;
                }
                else{
                    this.dragging=false;
                    if((this.x+this.width/2) > EditorCanva.widthScene) this.x = EditorCanva.widthScene-this.width/2;
                    if((this.x-this.width/2) < EditorCanva.xScene) this.x = EditorCanva.xScene+this.width/2;
                    if(this.y+this.height/2 > EditorCanva.heightWindow) this.y = EditorCanva.heightWindow-this.height/2;
                    if(this.y-this.height/2 < EditorCanva.yScene) this.y = EditorCanva.yScene+this.height/2;
                }
            }
            else{
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                this.subName.x = this.x-this.width/2;
                this.subName.y = this.y+this.height/2;
            }
            EditorCanva.updateLinks();
            
        }
        
    }

}