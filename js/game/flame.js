class Flame extends Entity {
  constructor(engine,flameType){
    super(engine);
    this.key="flame";
    this.size.setCoordinates(16,16,0);
    this.life=1000;
    this.lifeTimestamp=new Date();
    
    this.flameType = flameType;
    this.animation = new Animation();
    this.animation.looping=false;
    if (this.flameType==7){
      this.animation.addFrame(new AnimationFrame(0,200));
      this.animation.addFrame(new AnimationFrame(1,200));
      this.animation.addFrame(new AnimationFrame(2,200));
      this.animation.addFrame(new AnimationFrame(3,200));
      this.animation.addFrame(new AnimationFrame(4,200));
    } else {
      this.animation.addFrame(new AnimationFrame(0,250));
      this.animation.addFrame(new AnimationFrame(1,250));
      this.animation.addFrame(new AnimationFrame(2,250));
      this.animation.addFrame(new AnimationFrame(3,250));
    }
  }
  update(){
    var cmap = this.engine.getEntity("collisionmap");
    var tmap = this.engine.getEntity("tilemap");
    var tx=((this.position.x+(this.size.x*0.5))/cmap.tileWidth)|0;
    var ty=((this.position.y+(this.size.y*0.5))/cmap.tileHeight)|0;
    var date = new Date();
    
    this.animation.update();
    
    if ((date-this.lifeTimestamp)>=this.life){
      cmap.setTile(tx,ty,0);
      tmap.setTile(tx,ty,0);

      if (Math.random()*100>=80){
        var item = null;
        var rnd = Math.random()*100;
        if (rnd>75) {
          item = new ItemBomb(this.engine);
          item.position.setCoordinates(tx*cmap.tileWidth,ty*cmap.tileHeight,0);
          this.engine.addEntity(item);
        } else if (rnd>50) {
          item = new ItemFlame(this.engine);
          item.position.setCoordinates(tx*cmap.tileWidth,ty*cmap.tileHeight,0);
          this.engine.addEntity(item);
        } else if (rnd>25) {
        } else {
        }
      }
      
      this.remove=true;
    }
    
    if (!this.remove){
      var e = null;
      var o = this.engine.entities.first;
      while(o!=null){
        e=o.object;
        if (collisionBoxBox(
          this.position.x,this.position.y,this.size.x,this.size.y,
          e.position.x,e.position.y,e.size.x,e.size.y
        )) {
          if (e.key=="player"){
            e.kill();
          } else if (e.key=="bomb"){
            e.detonate();
          } else if (e.key=="item"){
            e.kill();
          }
        }
        o=o.next;
      }
    }
  }
  paint(){
    var x = (this.position.x|0);
    var y = (this.position.y|0);
    var w = (this.size.x|0);
    var h = (this.size.y|0);
    //this.engine.graphics.fillRect(x,y,w,h,"#ff6a00");
    var frame = this.animation.getFrameCurrent();
    if (frame!=null){
      var bmp = this.engine.images[frame.imageIndex+this.flameType];
      this.engine.graphics.drawImage(bmp.image,x,y);
    }
  }
}
