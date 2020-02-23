class LinkedListObject {
  constructor(){
    this.previous = null;
    this.null = null;
    this.object = null;
  }
}

class LinkedList {
  constructor(){
    this.first = null;
    this.last = null;
  }
  add(llo){
    if (llo!=null){
      if (this.first==null){
        llo.next=null;
        llo.previous=null;
        this.first = llo;
        this.last = llo;
      } else {
        llo.previous=this.last;
        llo.next=null;
        this.last.next=llo;
        this.last=llo;
      }
    }
  }
  remove(llo){
    if (llo!=null){
      var n = llo.next;
      var p = llo.previous;
      
      if (p!=null){
        p.next = n;
      } else {
        this.first=n;
      }
      
      if (n!=null){
        n.previous = p;
      } else {
        this.last = p;
      }
      
      llo.object = null;
      llo = null;
    }
  }
  clear(){
    var o = null;
    var n = null;
    
    o = this.first;
    while(o!=null){
      n = o.next;            
      this.remove(o);            
      o = n;
    }
  }
  count(){
    var i = 0;
    var o = this.first;
    while(o!=null){
      i++;
      o = o.next;
    }
    return i;
  }
  item(index){
    var i = 0;
    var o = this.first;
    while(o!=null){
      if (i==index){
        return o;
      }
      i++;
      o = o.next;
    }
    return null;
  }
}
