class Graphics {
  constructor(){
    this.canvas = document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
  }
  clear(){
    this.fillRect(0,0,this.width,this.height,"#000000");
  }      
  fillRect(x,y,w,h,c){
    this.context.fillStyle=c;
    this.context.fillRect(x,y,w,h);
  }        
  drawCircle(x,y,r,c){
    this.context.strokeStyle=c;
    this.context.beginPath();
    this.context.arc(x,y,r,0,deg2rad(360));
    this.context.stroke();
  } 
  drawImage(image,x,y){
    this.context.drawImage(image,x,y);
  }
  drawImageFlippedHorizontal(image,x,y){
    this.context.save();
    this.context.scale(-1,1);
    this.context.drawImage(image,(image.width*-1)-x,y);
    this.context.restore();
  }
}
