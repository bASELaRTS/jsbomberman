class Timer {
  constructor(){
    this.elapsed = 0;
    this.elapsedTimestamp = new Date();
    this.fps = 0;
    this.fpsCounter = 0;
    this.fpsTimestamp = new Date();
  }
  update(){
    var date = new Date();
    
    this.elapsed=(date-this.elapsedTimestamp);
    this.elapsedTimestamp=date;
    
    if ((date-this.fpsTimestamp)>=1000){
      this.fpsTimestamp=date;
      this.fps=this.fpsCounter;
      this.fpsCounter=0;
    }
    this.fpsCounter++;
  }
}
