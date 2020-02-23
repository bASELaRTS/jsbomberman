class Bitmap {
  constructor(filename){
    this.loaded = false;
    this.image = new Image();          
    this.image.src=filename;
    this.image.onload = ()=>{
      this.loaded=true;
    };
  }
}
