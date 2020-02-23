class Tilemap extends Map {       
  constructor(engine){
    super(engine);
    this.key="tilemap";
    this.width = 11;
    this.height = 11;
    this.data = [
      1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,0,1,
      1,0,2,0,2,0,2,0,2,0,1,
      1,0,0,0,0,0,0,0,0,0,1,
      1,0,2,0,2,0,2,0,2,0,1,
      1,0,0,0,0,0,0,0,0,0,1,
      1,0,2,0,2,0,2,0,2,0,1,
      1,0,0,0,0,0,0,0,0,0,1,
      1,0,2,0,2,0,2,0,2,0,1,
      1,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,            
    ];                   
  }
  paintTile(tile,tx,ty,tw,th){
    /*
    if (tile>0){
      this.engine.graphics.fillRect(tx,ty,tw,th,"#ff0000");
    }
    /**/
      
    var bmp = this.engine.images[tile];
    this.engine.graphics.drawImage(bmp.image,tx,ty);            
  }
} 
