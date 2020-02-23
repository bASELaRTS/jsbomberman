class Bomberman extends Engine {      
  constructor(){
    super();
    
    this.images = [];
  }
  setup(){
    // 0-3
    this.images.push(new Bitmap("data/tile0.png"));
    this.images.push(new Bitmap("data/tile1.png"));
    this.images.push(new Bitmap("data/tile2.png"));          
    this.images.push(new Bitmap("data/tile3.png"));          
    // 4-6
    this.images.push(new Bitmap("data/bomb0.png"));          
    this.images.push(new Bitmap("data/bomb1.png"));          
    this.images.push(new Bitmap("data/bomb2.png"));          
    // 7-11
    this.images.push(new Bitmap("data/wall0.png"));          
    this.images.push(new Bitmap("data/wall1.png"));          
    this.images.push(new Bitmap("data/wall2.png"));          
    this.images.push(new Bitmap("data/wall3.png"));          
    this.images.push(new Bitmap("data/wall4.png"));          
    // 12-15
    this.images.push(new Bitmap("data/flame00.png"));          
    this.images.push(new Bitmap("data/flame01.png"));          
    this.images.push(new Bitmap("data/flame02.png"));          
    this.images.push(new Bitmap("data/flame03.png"));          
    // 16-19
    this.images.push(new Bitmap("data/flame10.png"));          
    this.images.push(new Bitmap("data/flame11.png"));          
    this.images.push(new Bitmap("data/flame12.png"));          
    this.images.push(new Bitmap("data/flame13.png"));          
    // 20-23
    this.images.push(new Bitmap("data/flame20.png"));          
    this.images.push(new Bitmap("data/flame21.png"));          
    this.images.push(new Bitmap("data/flame22.png"));          
    this.images.push(new Bitmap("data/flame23.png"));          
    // 24
    this.images.push(new Bitmap("data/player0.png"));  // idle down
    // 25-27
    this.images.push(new Bitmap("data/player1.png"));  // walk down
    this.images.push(new Bitmap("data/player2.png"));
    this.images.push(new Bitmap("data/player3.png"));
    // 28
    this.images.push(new Bitmap("data/player4.png"));  // idle up
    // 29-31
    this.images.push(new Bitmap("data/player5.png"));  // walk up
    this.images.push(new Bitmap("data/player6.png"));
    this.images.push(new Bitmap("data/player7.png"));
    // 32
    this.images.push(new Bitmap("data/player8.png"));  // idle right
    // 33-38
    this.images.push(new Bitmap("data/player9.png"));  // walk right
    this.images.push(new Bitmap("data/player10.png"));
    this.images.push(new Bitmap("data/player11.png"));
    this.images.push(new Bitmap("data/player12.png"));
    this.images.push(new Bitmap("data/player13.png"));
    this.images.push(new Bitmap("data/player14.png"));
    // 39-41
    this.images.push(new Bitmap("data/player15.png")); // idle bored
    this.images.push(new Bitmap("data/player16.png"));
    this.images.push(new Bitmap("data/player17.png"));
    // 42-45
    this.images.push(new Bitmap("data/player18.png")); // death
    this.images.push(new Bitmap("data/player19.png"));
    this.images.push(new Bitmap("data/player20.png"));
    this.images.push(new Bitmap("data/player21.png"));
    // 46-47
    this.images.push(new Bitmap("data/player22.png")); // idle jump
    this.images.push(new Bitmap("data/player23.png"));
    // 48-51
    this.images.push(new Bitmap("data/item0.png")); // item bomb
    this.images.push(new Bitmap("data/item1.png")); // item flame
    this.images.push(new Bitmap("data/item2.png")); // item speed
    this.images.push(new Bitmap("data/item3.png")); // item skull
    // 52-57
    this.images.push(new Bitmap("data/smoke0.png"));
    this.images.push(new Bitmap("data/smoke1.png"));
    this.images.push(new Bitmap("data/smoke2.png"));
    this.images.push(new Bitmap("data/smoke3.png"));
    this.images.push(new Bitmap("data/smoke4.png"));
    this.images.push(new Bitmap("data/smoke5.png"));
    
    while(!this.imagesLoaded()){}

    var collisionmap = new Collisionmap(this);
    var tilemap = new Tilemap(this);
    var player = new Player(this);
    
    this.entities.clear();
    this.addEntity(collisionmap);
    this.addEntity(tilemap);
    this.addEntity(player);
    
    // create random blowup walls
    var i=0;
    var j=0;
    var t=0;
    for(j=0;j<collisionmap.width;j++){
      for(i=0;i<collisionmap.height;i++){
        t = collisionmap.getTile(i,j);
        if (t==3){
          if (Math.random()*10>=2){
            tilemap.setTile(i,j,3);
            collisionmap.setTile(i,j,2);
          } else {
            collisionmap.setTile(i,j,0);
          }
        } else if (t==4){
          player.position.setCoordinates(
            i*collisionmap.tileWidth,
            j*collisionmap.tileHeight,
            0
          );
        }
      }
    }          
  }
  paint(){
    super.paint();
    
    var span = document.getElementById("lblMessage");
    span.innerText  = ""+this.timer.fps;
    span.innerText += "\r\n"+this.entities.count();
  }
  imagesLoaded(){
    var i=0;
    for(i=0;i<this.images.loaded;i++){
      if (!this.images[i].loaded) {
        return false;
      }
    }
    return true;
  }
}      
