class Item extends Entity {
  constructor(engine){
    super(engine);
    this.key="item";
    this.size.setCoordinates(16,16,0);
    
    this.animationIndex=0;
    this.animations = [];
    
    var animation = null;
    
    animation = new Animation();
    animation.addFrame(new AnimationFrame(48,100));
    this.animations.push(animation);
    animation = new Animation();
    animation.addFrame(new AnimationFrame(49,100));
    this.animations.push(animation);
    animation = new Animation();
    animation.addFrame(new AnimationFrame(50,100));
    this.animations.push(animation);
    animation = new Animation();
    animation.addFrame(new AnimationFrame(51,100));
    this.animations.push(animation);
    
    animation = new Animation();
    animation.looping=false;
    animation.addFrame(new AnimationFrame(52,100));
    animation.addFrame(new AnimationFrame(53,100));
    animation.addFrame(new AnimationFrame(54,100));
    animation.addFrame(new AnimationFrame(55,100));
    animation.addFrame(new AnimationFrame(56,100));
    animation.addFrame(new AnimationFrame(57,100));
    this.animations.push(animation);
  }
  update(){
    this.animations[this.animationIndex].update();
    if (this.animationIndex==4){
      if (this.animations[this.animationIndex].stopped){
        this.visible=false;
        this.remove=true;
      }
    } else {
      var e = null;
      var o = this.engine.entities.first;
      while(o!=null){
        e=o.object;
        if (e.key=="player"){
          if (collisionBoxBox(
            this.position.x,this.position.y,this.size.x,this.size.y,
            e.position.x,e.position.y,e.size.x,e.size.y,
          )){
            this.action(e);
            this.visible=false;
            this.remove=true;
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
    var frame = this.animations[this.animationIndex].getFrameCurrent();
    var bmp = this.engine.images[frame.imageIndex];
    this.engine.graphics.drawImage(bmp.image,x,y);
  }
  action(player){
    // do something
  }
  kill(){
    this.animationIndex=4;
  }
}
class ItemBomb extends Item {
  constructor(engine){
    super(engine);
    this.animationIndex=0;
  }
  action(player){
    player.bombCountMax++;
  }
}
class ItemFlame extends Item {
  constructor(engine){
    super(engine);
    this.animationIndex=1;
  }
  action(player){
    player.flameCountMax++;
  }
}