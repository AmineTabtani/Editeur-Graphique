import MyNode from "./MyNode";
import EditorCanva from "../EditorCanva";
import MyLink from "./MyLink";

declare var PIXI:any;
export default class MyLinkButton extends PIXI.Sprite {

    isLinkingNodes=false;
    nodeFrom:MyNode=null;
    nodeTo:MyNode=null;


    constructor(x: number, y: number, width: number, height: number,pathImage: string) {
        super();
        this.create(x, y, width, height,pathImage);
        
    }

    create(x: number, y: number, width: number, height: number,pathImage: string) {
        this.texture =PIXI.Texture.fromImage(pathImage);
        this.width=width;
        this.height=height;

        // set the x, y and anchor
        this.x = x;
        this.y = y;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        // set the interactivity to true and assign callback functions
        this.interactive = true;

        this.on("mousedown", () => {
            this.onDown();
        }, this);

        this.on("mouseup", () => {
            this.onUp();
        }, this);

        this.on("mouseover", () => {
            this.onHover();
        }, this);

        this.on("mouseout", () => {
            this.onOut();
        }, this);
    }
    public linkNodes(){
        // here should traite is possible that is directed acycled graph sinon annule 
        this.nodeFrom.linkOut=new MyLink(EditorCanva.lastIdLink,this.nodeFrom,this.nodeTo);
        EditorCanva.lastIdLink++;
        EditorCanva.links.push(this.nodeFrom.linkOut);

        if(this.nodeTo.linkIn==null) this.nodeTo.linkIn=this.nodeFrom.linkOut;
        else this.nodeTo.linkIn2=this.nodeFrom.linkOut;

        
        
        console.log('link 2 nodes  :  '+this.nodeFrom+'  & '+this.nodeTo);
        // // if nodeFrom is a DataSet then store column in all successors nodes 
        // if(this.nodeFrom.columns!=null){
        //     let ll:MyLink=this.nodeFrom.linkOut;
        //     let notYet:boolean=true;
        //     while(notYet){
        //         if(  ll.toNode.type==='select' ){
        //             ll.toNode.columns=ll.fromNode.columns;
        //         }
        //         else if( ll.toNode.type==='combine' ){
        //             //this.nodeTo.columns=this.nodeFrom.columns;
        //         }
        //         else if( ll.toNode.type==='groupBy' ){
        //             //this.nodeTo.columns=this.nodeFrom.columns;
        //         }
        //         if(ll.toNode.linkOut!=null){
        //             ll=ll.toNode.linkOut;
        //         }
        //         else notYet=false;
        //     }
        // }
        // //else if  nodeFrom is a transformation then test if it contains columns =>  store column in nodeTo
        // else{
        //     if( this.nodeFrom.columns!=null && this.nodeTo.type==='select' ){
        //         this.nodeTo.columns=this.nodeFrom.columns;
        //     }
        //     else if( this.nodeFrom.columns!=null && this.nodeTo.type==='combine' ){
        //         //this.nodeTo.columns=this.nodeFrom.columns;
        //     }
        //     else if( this.nodeFrom.columns!=null && this.nodeTo.type==='groupBy' ){
        //         //this.nodeTo.columns=this.nodeFrom.columns;
        //     }
        // }
        
        
    }
    public stopLinking(){
        this.tint = 0xffffff;
        this.isLinkingNodes=false;

        this.nodeFrom=null;
        this.nodeTo=null;
    }

    onDown() {
        
        this.y += 2;
        if(this.isLinkingNodes){
            if(EditorCanva.linkButton.nodeFrom!=null) this.nodeFrom.numberOut=0;
            this.stopLinking();
        }
        else {
            this.tint = 0xe88c5d;
            this.isLinkingNodes=true;
            console.log('is linking '+this.isLinkingNodes);
        }
        EditorCanva.deselectAllNodes();
    }

    onUp() {
        //console.log('onup');
        this.y -= 2;
        
    }

    onHover() {
        //console.log('On Hover');
        //this.tint = 0xffc4df;
        // this.scale.x = 1.05;
        // this.scale.y = 1.05;
    }

    onOut() {
        //console.log('On Out');
        //this.tint = 0xffffff;
        // this.scale.x = 1;
        // this.scale.y = 1;
    }

}