class Key {
  constructor(k){
    this.code = k;
    this.state = false;
  }
}

class Keyboard {
  constructor(){
    this.keys = [];
    
    this.keys.push(new Key(37)); //left
    this.keys.push(new Key(38)); //up
    this.keys.push(new Key(39)); //right
    this.keys.push(new Key(40)); //down
    this.keys.push(new Key(32)); //space
  }
  setState(keycode,state){
    var k = this.getKey(keycode);
    if (k!=null){
      k.state=state;            
    } else {
      console.log("Keyboard:" + keycode + ":" + state);
    }
  }
  getState(keycode){
    var k = this.getKey(keycode);
    if (k!=null){
      return k.state;
    }
    return false;
  }
  getKey(keycode){
    var i=0;
    var k=null;
    for(i=0;i<this.keys.length;i++){
      k = this.keys[i];
      if (k.code==keycode){
        return k;
      }
    }
    return null;
  }
}
