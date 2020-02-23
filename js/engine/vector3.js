class Vector3 {
  constructor(){
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
  }
  setCoordinates(dx,dy,dz){
    this.x=dx;
    this.y=dy;
    this.z=dz;
  }
  setVector(v){
    this.setCoordinates(v.x,v.y,v.z);
  }
  static add(v1,v2,v3){
    v3.x=v1.x+v2.x;
    v3.y=v1.y+v2.y;
    v3.z=v1.z+v2.z;
  }
  static subtract(v1,v2,v3){
    v3.x=v1.x-v2.x;
    v3.y=v1.y-v2.y;
    v3.z=v1.z-v2.z;
  }
}
