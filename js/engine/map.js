class Map extends Entity {
  constructor(engine){
    super(engine);
    this.key="map";
    this.width = 0;
    this.height = 0;
    this.tileWidth = 16;
    this.tileHeight = 16;
    this.data = [];
  }
  paint(){
    var i=0;
    var j=0;
    var t=0;
    var x=0;
    var y=0;          
    for(j=0;j<this.height;j++){
      for(i=0;i<this.width;i++){
        t = this.data[j*this.width+i];
        x = i*this.tileWidth;
        y = j*this.tileHeight;
        this.paintTile(t,x,y,this.tileWidth,this.tileHeight);
      }
    }
  }
  paintTile(tile,tx,ty,tw,th){}
  setTile(x,y,tile){
    if (x>=0&&x<this.width&&y>=0&&y<this.height){
      var i = y*this.width+x;
      this.data[i]=tile;
    }          
  }
  getTile(x,y){
    if (x>=0&&x<this.width&&y>=0&&y<this.height){
      var i = y*this.width+x;
      return this.data[i];
    }          
    return -1;
  }
}      
