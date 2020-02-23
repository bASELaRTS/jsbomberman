class Bomb extends Entity {
  constructor(engine){
    super(engine);
    this.key="bomb";
    this.size.setCoordinates(16,16,0);
    
    this.player = null;
    this.flameLength = 1;
    this.life=3000;
    this.lifeTimestamp=new Date();

    this.animation = new Animation();
    this.animation.addFrame(new AnimationFrame(4,100));
    this.animation.addFrame(new AnimationFrame(5,100));
    this.animation.addFrame(new AnimationFrame(6,100));
    this.animation.addFrame(new AnimationFrame(5,100));
  }
  update(){
    var date = new Date();
    
    this.animation.update();
    
    if ((date-this.lifeTimestamp)>=this.life){
      this.detonate();
    }
  }
  paint(){
    var x = (this.position.x|0);
    var y = (this.position.y|0);
    var w = (this.size.x|0);
    var h = (this.size.y|0);
    //this.engine.graphics.fillRect(x,y,w,h,"#a0a0a0");
    
    var frame = this.animation.getFrameCurrent();
    if (frame!=null){
      var bmp = this.engine.images[frame.imageIndex];
      this.engine.graphics.drawImage(bmp.image,x,y);
    }
  }
  addFlame(x,y,flameType){
    var flame=new Flame(this.engine,flameType);
    flame.position.setCoordinates(x,y,0);
    this.engine.addEntity(flame);
  }
  detonate(){
    var map = this.engine.getEntity("collisionmap");
    var tmap = this.engine.getEntity("tilemap");
    var tx=((this.position.x+(this.size.x*0.5))/map.tileWidth)|0;
    var ty=((this.position.y+(this.size.y*0.5))/map.tileHeight)|0;          
    var i=0;
    var j=0;
    var k=0;
    var t=0;
    var n=true;
    var s=true;
    var e=true;
    var w=true;

    if (this.remove) return;

    // create flames
    this.addFlame(tx*map.tileWidth,ty*map.tileHeight,12);
    k=1;
    while((k<=this.flameLength)&&(n||s||e||w)){
      if (n) {
        i = tx;
        j = ty+k;
        t = map.getTile(i,j);
        if (map.isSolid(t)){
          n = false;
          if (t!=1) {
            this.addFlame(i*map.tileWidth,j*map.tileHeight,7);
            tmap.setTile(i,j,0);
          }
        } else {
          if (k==this.flameLength){
            this.addFlame(i*map.tileWidth,j*map.tileHeight,20);
          } else {
            this.addFlame(i*map.tileWidth,j*map.tileHeight,16);
          }
        }
      }
      if (s) {
        i = tx;
        j = ty-k;
        t = map.getTile(i,j);
        if (map.isSolid(t)){
          s = false;
          if (t!=1) {
            this.addFlame(i*map.tileWidth,j*map.tileHeight,7);
            tmap.setTile(i,j,0);
          }
        } else {
          if (k==this.flameLength){
            this.addFlame(i*map.tileWidth,j*map.tileHeight,20);
          } else {
            this.addFlame(i*map.tileWidth,j*map.tileHeight,16);
          }
        }
      }
      if (e) {
        i = tx-k;
        j = ty;
        t = map.getTile(i,j);
        if (map.isSolid(t)){
          e = false;
          if (t!=1) {
            this.addFlame(i*map.tileWidth,j*map.tileHeight,7);
            tmap.setTile(i,j,0);
          }
        } else {
          if (k==this.flameLength){
            this.addFlame(i*map.tileWidth,j*map.tileHeight,20);
          } else {
            this.addFlame(i*map.tileWidth,j*map.tileHeight,16);
          }
        }
      }
      if (w) {
        i = tx+k;
        j = ty;
        t = map.getTile(i,j);
        if (map.isSolid(t)){
          w = false;
          if (t!=1) {
            this.addFlame(i*map.tileWidth,j*map.tileHeight,7);
            tmap.setTile(i,j,0);
          }
        } else {
          if (k==this.flameLength){
            this.addFlame(i*map.tileWidth,j*map.tileHeight,20);
          } else {
            this.addFlame(i*map.tileWidth,j*map.tileHeight,16);
          }
        }
      }
    
      k++;
    }
    
    // remove bomb
    map.setTile(tx,ty,0);
    this.visible=false;
    this.remove=true;
  }
}
