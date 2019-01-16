import MyNode from "./myUI/MyNode";
import MyLink from "./myUI/MyLink";
import MyLinkButton from "./myUI/MyLinkButton";
declare var PIXI:any;

export default class EditorCanva{

  public static app: any;

  public static graphicLinks= new PIXI.Graphics();

  public static  widthWindow=screen.availWidth-40;
  public static  heightWindow=screen.availHeight-110;
  public static heightZoneTitle=55;
  public static widthPanel=300;
  public static heightPanel=(EditorCanva.heightWindow-EditorCanva.heightZoneTitle*3)/2;
  public static xScene=0;
  public static yScene=EditorCanva.heightZoneTitle;
  public static widthScene=EditorCanva.widthWindow-EditorCanva.widthPanel;
  public static heightScene= EditorCanva.heightWindow-EditorCanva.heightZoneTitle;
  public static widthButton=102;
  public static heightButton=50;


  public static nodes:MyNode[]=[];
  public static links:MyLink[]=[];

  public static linkButton:MyLinkButton;
  public static lastIdNode=0;
  public static lastIdLink=0;
  public static selectedNode:MyNode=null;

  public static updateLinks() {
    console.log('update   Links')
    let s = 3, c = 0x000000;
    this.graphicLinks.clear();
    this.graphicLinks.lineStyle(s, c);

    EditorCanva.links.forEach(link => {

        let d=50;

        let vx=link.toNode.x-link.fromNode.x;
        let vy=link.toNode.y-link.fromNode.y;
        let vd=Math.sqrt(vx*vx+vy*vy);
        vx=d*vx/vd;
        vy=d*vy/vd;

        this.graphicLinks.moveTo(link.fromNode.x+vx, link.fromNode.y+vy);
        this.graphicLinks.lineTo(link.toNode.x-vx, link.toNode.y-vy);

        link.arrow.x=link.toNode.x-vx;
        link.arrow.y=link.toNode.y-vy;
        if(vy>0) link.arrow.rotation=Math.acos(vx/d);
        else link.arrow.rotation=Math.acos(-vx/d)+Math.PI;
        
    });

}

  public static deselectAllNodes(){
    this.nodes.forEach(element => {
      element.deselect();
    });
  }
  public static isLinkExist(from : MyNode ,to : MyNode) : boolean {
    let result=false;
    this.links.forEach(link => {
      console.log(link.fromNode.id+' == '+from.id+' && '+ link.toNode.id+' == '+to.id);
      if(link.fromNode.id===from.id && link.toNode.id===to.id) {
        console.log('there is one here');
        result=true;
      }

    });
    return result;
  }
  public static deleteItemFromLinks(index:number){
      let array1=this.links;
      let array2=this.links;
      array1=this.links.slice(0,index);
      array2=this.links.slice(index+1,this.links.length);
      this.links=array1.concat(array2);
  }
  public static deleteItemFromNodes(index:number){
    let array1=this.nodes;
    let array2=this.nodes;
    array1=this.nodes.slice(0,index);
    array2=this.nodes.slice(index+1,this.nodes.length);
    this.nodes=array1.concat(array2);
}
  public static deleteSelectedNode(){
    if(this.selectedNode!=null){
      //update column list
      let n=this.selectedNode;
      n.columns=[];
      n.column1=n.column2=[];
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
      
      //delete node and its links
      this.links.forEach((link, index) => {
        if(link.fromNode.id==this.selectedNode.id){
          //console.log('delete  link '+link.toNode.id);
          link.toNode.numberIn--;
          if( link.toNode.linkIn!=null && link.id==link.toNode.linkIn.id)
            link.toNode.linkIn=null;
          if(link.toNode.linkIn2!=null && link.id==link.toNode.linkIn2.id )
            link.toNode.linkIn2=null;  
          EditorCanva.app.stage.removeChild(link.arrow);
          console.log(index);
          this.deleteItemFromLinks(index);
          
        } 
      });
      let deletedFirst=false;
      this.links.forEach((link, index) => {
        
        if(link.toNode.id==this.selectedNode.id && !deletedFirst){
          console.log('delete  link '+link.fromNode.id);
          link.fromNode.numberOut--;
          link.fromNode.linkOut=null;
          EditorCanva.app.stage.removeChild(link.arrow);
          console.log(index);
          this.deleteItemFromLinks(index);
          deletedFirst=true;
        } 
      });
      this.links.forEach((link, index) => {
        if(link.toNode.id==this.selectedNode.id){
          link.fromNode.numberOut--;
          link.fromNode.linkOut=null;
          EditorCanva.app.stage.removeChild(link.arrow);
          this.deleteItemFromLinks(index);
        } 
      });
      
      this.nodes.forEach((node, index) => {
        if(node.id==this.selectedNode.id ){
          EditorCanva.app.stage.removeChild(node.subName);
            EditorCanva.app.stage.removeChild(node);
            this.deleteItemFromNodes(index);
        } 
      });
      EditorCanva.updateLinks();
    }
    
  }

}