class Collisionmap extends Map {       
  constructor(engine){
    super(engine);
    this.key="collisionmap";
    this.visible = false;
    this.width = 11;
    this.height = 11;
    this.data = [
      1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,3,3,3,3,3,0,0,1,
      1,0,1,3,1,3,1,3,1,0,1,
      1,3,3,3,3,3,3,3,3,3,1,
      1,3,1,3,1,0,1,3,1,3,1,
      1,3,3,3,0,0,0,3,3,3,1,
      1,3,1,3,1,0,1,3,1,3,1,
      1,3,3,3,3,3,3,3,3,3,1,
      1,0,1,3,1,3,1,3,1,0,1,
      1,0,0,3,3,3,3,3,0,4,1,
      1,1,1,1,1,1,1,1,1,1,1,            
    ];                   
  }
  isSolid(tile){
    if (tile==1) return true;  // solid wall
    if (tile==2) return true;  // brick wall
    if (tile==10) return true; // bomb
    return false;
  }
} 
