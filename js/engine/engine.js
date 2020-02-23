class Engine {
  constructor(){
    this.graphics = new Graphics();
    this.keyboard = new Keyboard();
    this.entities = new LinkedList();     
    this.timer = new Timer();
  }
  setup(){}
  loop(){
    this.timer.update();
    this.update();
    this.paint();
  }
  update(){
    var i=0;
    var e=null;
    var o=this.entities.first;
    var n=null;
    while(o!=null){
      n=o.next;
      e=o.object;
      if (e.remove){
        this.entities.remove(o);
      } else {
        e.update();
      }
      o=n;
    }
  }
  paint(){
    this.graphics.clear();
    
    var i=0;
    var e=null;
    var o=this.entities.first;
    while(o!=null){
      e=o.object;
      if (e.visible){
        e.paint();
      }
      o=o.next;
    }
  }
  addEntity(entity){
    var llo = new LinkedListObject();
    llo.object=entity;
    this.entities.add(llo);
  }
  getEntity(key){
    var i=0;
    var e=null;
    var o=this.entities.first;
    while(o!=null){
      e=o.object;
      if (e.key==key){
        return e;
      }
      o=o.next;
    }
    return null;
  }
}
