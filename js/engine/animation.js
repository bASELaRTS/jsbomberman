class AnimationFrame {
  constructor(imageIndex,frameDelay,flipped){
    this.imageIndex=imageIndex;
    this.delay=frameDelay;
    this.flipped = false;
    if (flipped!=null) this.flipped=flipped;
  }
}
class Animation {
  constructor(){
    this.frames = [];
    this.frameTimestamp = new Date();
    this.frameIndex = -1;
    this.looping = true;
    this.stopped = false;
  }
  update(){
    var i = 0;
    var date = new Date();
    var frame = null;
    if (this.frameIndex>=0){
      frame = this.frames[this.frameIndex];
      if ((date-this.frameTimestamp)>=frame.delay){
        this.frameTimestamp=date;
        i = this.frameIndex+1;
        if (i<this.frames.length){
          this.frameIndex=i;
        } else {
          if (this.looping){
            this.frameIndex=0;
          } else {
            this.stopped=true;
          }
        }
      }
    }
  }
  addFrame(frame){
    this.frames.push(frame);
    if (this.frameIndex<0){
      this.frameIndex=0;
    }
  }
  getFrameCurrent(){
    if (this.frameIndex>=0){
      return this.frames[this.frameIndex];
    }
    return null;
  }
}
