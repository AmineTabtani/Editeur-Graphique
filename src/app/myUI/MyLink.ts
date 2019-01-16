import MyNode from "./MyNode";
import EditorCanva from "../EditorCanva";
declare var PIXI:any;

export default class MyLink {

    

    fromNode: MyNode;
    toNode: MyNode;
    arrow:any;
    id:number;

    constructor(id:number, from: MyNode, to: MyNode) {
        this.id=id;
        this.fromNode=from;
        this.toNode=to;
        this.arrow=new PIXI.Sprite();
        this.arrow.texture=PIXI.Texture.fromImage('assets/images/triangle.png');
        EditorCanva.app.stage.addChild(this.arrow);
        this.arrow.width=15;
        this.arrow.height=15;
        this.arrow.anchor.set(0.5);
    }

}