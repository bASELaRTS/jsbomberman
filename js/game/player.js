class Player extends Entity {
  constructor(engine){
    super(engine);
    this.key="player";
    this.position.setCoordinates(72,90,0);
    this.size.setCoordinates(16,16,0);
    this.direction = new Vector3(0,1,0);
    this.lastDirection = 0;
    this.bombCountMax = 1;
    this.flameCountMax = 1;
    this.movementTimestamp = new Date();
    this.animationDuration = 3000;
    this.animationIndex = 0;
    this.animationTimestamp = new Date();
    this.animations = [];

    var animation = null;    
    // idle down 0
    animation = new Animation();
    animation.addFrame(new AnimationFrame(24,150));
    this.animations.push(animation);
    // walk down 1
    animation = new Animation();
    animation.addFrame(new AnimationFrame(25,100));
    animation.addFrame(new AnimationFrame(26,100));
    animation.addFrame(new AnimationFrame(27,100));
    animation.addFrame(new AnimationFrame(25,100,true));
    animation.addFrame(new AnimationFrame(26,100,true));
    animation.addFrame(new AnimationFrame(27,100,true));
    this.animations.push(animation);
    // idle up 2
    animation = new Animation();
    animation.addFrame(new AnimationFrame(28,150));
    this.animations.push(animation);
    // walk up 3
    animation = new Animation();
    animation.addFrame(new AnimationFrame(29,100));
    animation.addFrame(new AnimationFrame(30,100));
    animation.addFrame(new AnimationFrame(31,100));
    animation.addFrame(new AnimationFrame(29,100,true));
    animation.addFrame(new AnimationFrame(30,100,true));
    animation.addFrame(new AnimationFrame(31,100,true));
    this.animations.push(animation);
    // idle right 4
    animation = new Animation();
    animation.addFrame(new AnimationFrame(32,150));
    this.animations.push(animation);
    // walk right 5
    animation = new Animation();
    animation.addFrame(new AnimationFrame(33,100));
    animation.addFrame(new AnimationFrame(34,100));
    animation.addFrame(new AnimationFrame(35,100));
    animation.addFrame(new AnimationFrame(36,100));
    animation.addFrame(new AnimationFrame(37,100));
    animation.addFrame(new AnimationFrame(38,100));
    this.animations.push(animation);
    // idle left 6
    animation = new Animation();
    animation.addFrame(new AnimationFrame(32,150,true));
    this.animations.push(animation);
    // walk left 7
    animation = new Animation();
    animation.addFrame(new AnimationFrame(33,100,true));
    animation.addFrame(new AnimationFrame(34,100,true));
    animation.addFrame(new AnimationFrame(35,100,true));
    animation.addFrame(new AnimationFrame(36,100,true));
    animation.addFrame(new AnimationFrame(37,100,true));
    animation.addFrame(new AnimationFrame(38,100,true));
    this.animations.push(animation);
    // idle bored 8
    animation = new Animation();
    animation.addFrame(new AnimationFrame(39,150));
    animation.addFrame(new AnimationFrame(40,150));
    animation.addFrame(new AnimationFrame(41,150));
    this.animations.push(animation);
    // death 9
    animation = new Animation();
    animation.looping=false;
    animation.addFrame(new AnimationFrame(42,150));
    animation.addFrame(new AnimationFrame(43,150));
    animation.addFrame(new AnimationFrame(44,150));
    animation.addFrame(new AnimationFrame(45,150));
    this.animations.push(animation);
    // jump 10
    animation = new Animation();
    animation.addFrame(new AnimationFrame(46,150));
    animation.addFrame(new AnimationFrame(47,150));
    this.animations.push(animation);
  }
  update(){
    var i = 0;
    var a = new Vector3();
    var p = new Vector3();
    var s = new Vector3();
    var v = new Vector3();
    var map = this.engine.getEntity("collisionmap");
    var tx=0;
    var ty=0;
    var tile=0;
    var up=this.engine.keyboard.getState(38);
    var down=this.engine.keyboard.getState(40);
    var right=this.engine.keyboard.getState(39);
    var left=this.engine.keyboard.getState(37);
    
    p.setVector(this.position);
    s.setVector(this.speed);
    
    if (left){      
      this.direction.x=-1;
      a.x = -1;
    } else if (right){
      this.direction.x= 1;
      a.x =  1;
    } else {
      if (s.x<-0.5) {
        a.x= 0.5;
      } else if (s.x>0.5){
        a.x=-0.5;
      } else {
        this.direction.x=0;
        s.x=0.0;
      }            
    }
    
    if (up){
      this.direction.y=-1;
      a.y = -1;
    } else if (down){
      this.direction.y=1;
      a.y =  1;
    } else {
      if (s.y<-0.5) {
        a.y= 0.5;
      } else if (s.y>0.5){
        a.y=-0.5;
      } else {
        this.direction.y=0;
        s.y=0.0;
      }            
    }

    if (this.engine.keyboard.getState(32)){
      if (this.getBombCount()<this.bombCountMax){
        tx = ((p.x+(this.size.x*0.5))/map.tileWidth)|0;
        ty = ((p.y+(this.size.y*0.5))/map.tileHeight)|0;
        tile = map.getTile(tx,ty);
        if (tile==0){
          var bomb = new Bomb(this.engine);
          bomb.flameLength = this.flameCountMax;
          bomb.player=this;
          bomb.position.setCoordinates(
            tx*map.tileWidth,
            ty*map.tileHeight,
            0
          );
          this.engine.addEntity(bomb);
          map.setTile(tx,ty,10);
        }
      }
    }
    
    Vector3.add(a,s,v);
    s.setVector(v);
    if (s.x> 2) s.x= 2;
    if (s.x<-2) s.x=-2;
    if (s.y> 2) s.y= 2;
    if (s.y<-2) s.y=-2;
    
    Vector3.add(s,p,v);
    p.setVector(v);
    
    this.handleCollisionMap(p,s);
    this.handleAnimation();
    
    this.position.setVector(p);
    this.speed.setVector(s);    
  }
  paint(){
    var x = (this.position.x|0)-1;
    var y = (this.position.y|0)-8;
    var w = (this.size.x|0);
    var h = (this.size.y|0);
    //this.engine.graphics.fillRect(x,y,w,h,"#ffff00");
    var frame = this.animations[this.animationIndex].getFrameCurrent();
    if (frame!=null){
      var bmp = this.engine.images[frame.imageIndex];
      if (!frame.flipped){
        this.engine.graphics.drawImage(bmp.image,x,y);
      } else {
        this.engine.graphics.drawImageFlippedHorizontal(bmp.image,x,y);
      }
    }
  }
  handleCollisionMap(p,s){
    var map = this.engine.getEntity("collisionmap");
    var tx=0;
    var ty=0;
    var tile=0;

    tx = ((p.x+(this.size.x*0.5))/map.tileWidth)|0;
    ty = ((p.y+(this.size.y*0.5))/map.tileHeight)|0;
    tile = map.getTile(tx,ty);
    if (!map.isSolid(tile)){
      tx = ((p.x+(this.size.x*0.5))/map.tileWidth)|0;
      ty = ((p.y)/map.tileHeight)|0;
      tile = map.getTile(tx,ty);
      if (map.isSolid(tile)){
        p.y=(ty*map.tileHeight)+map.tileHeight;
        s.y=0;
      }
      tx = ((p.x+(this.size.x*0.5))/map.tileWidth)|0;
      ty = ((p.y+this.size.y)/map.tileHeight)|0;
      tile = map.getTile(tx,ty);
      if (map.isSolid(tile)){
        p.y=(ty*map.tileHeight)-this.size.y;
        s.y=0;
      }
      tx = (p.x/map.tileWidth)|0;
      ty = ((p.y+(this.size.y*0.5))/map.tileHeight)|0;
      tile = map.getTile(tx,ty);
      if (map.isSolid(tile)){
        p.x=(tx*map.tileWidth)+map.tileWidth;
        s.x=0;
      }
      tx = ((p.x+this.size.x)/map.tileWidth)|0;
      ty = ((p.y+(this.size.y*0.5))/map.tileHeight)|0;
      tile = map.getTile(tx,ty);
      if (map.isSolid(tile)){
        p.x=(tx*map.tileWidth)-this.size.x;;
        s.x=0;
      }
    }
  }
  handleAnimation(){
    var i = 0;
    var up=this.engine.keyboard.getState(38);
    var down=this.engine.keyboard.getState(40);
    var right=this.engine.keyboard.getState(39);
    var left=this.engine.keyboard.getState(37);
    var timestamp = new Date();
    
    // default animation based on movement
    if (this.direction.y>0){
      this.animationIndex=1;
    } else if (this.direction.y<0){
      this.animationIndex=3;
    } else if (this.direction.x>0){
      this.animationIndex=5;
    } else if (this.direction.x<0){
      this.animationIndex=7;
    } else {
      if (this.animationIndex==1) {
        this.animationIndex=0;
      } else if (this.animationIndex==3){
        this.animationIndex=2;
      } else if (this.animationIndex==5){
        this.animationIndex=4;
      } else if (this.animationIndex==7){
        this.animationIndex=6;
      } else if (this.animationIndex==8){
        if ((timestamp-this.animationTimestamp)>=this.animationDuration){
          this.animationIndex=0;
        }
      } else if (this.animationIndex==9){
        if (this.animations[this.animationIndex].stopped){
          this.animationIndex=0;
          this.visible=false;
          this.remove=true;
        }
      } else if (this.animationIndex==10){
        if ((timestamp-this.animationTimestamp)>=this.animationDuration){
          this.animationIndex=0;
        }
      }
    }
    
    // random idle/bored animation
    if (up||down||left||right){
      this.movementTimestamp=timestamp;
    } else if ((this.animationIndex!=8)&&((timestamp-this.movementTimestamp)>=5000)){      
      this.movementTimestamp=timestamp;
      i = Math.random()*100;
      if (i>=90){
        this.animationIndex=10;
        this.animationTimestamp=timestamp;
        this.animationDuration=1000;
      } else if (i>=50) {
        this.animationIndex=8;
        this.animationTimestamp=timestamp;
        this.animationDuration=3000;
      }
    }
    
    // animate
    this.animations[this.animationIndex].update();
  }
  getBombCount(){
    var i = 0;
    var e = null;
    var o = this.engine.entities.first;
    while(o!=null){
      e=o.object;
      if (e.key=="bomb"){
        if (e.player===this){
          i++;
        }
      }
      o=o.next;
    }
    return i;
  }
  kill(){
    this.animationIndex=9;
  }
}
