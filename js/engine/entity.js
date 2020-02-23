class Entity {
  constructor(engine){
    this.engine = engine;
    this.key="";
    this.position = new Vector3();
    this.size = new Vector3();
    this.speed = new Vector3();
    this.visible = true;
    this.remove = false;
  }
  update(){}
  paint(){}
}
