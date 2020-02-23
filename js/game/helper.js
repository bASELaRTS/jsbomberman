function deg2rad(deg){return deg * (Math.PI/180.0);}
function rad2deg(rad){return rad * (180.0/Math.PI);}
function distance(x1,y1,x2,y2){
  var x = x2-x1;
  var y = y2-y1;
  var l = x*x + y*y;
  return Math.sqrt(l);
}
function collisionBoxBox(x1,y1,w1,h1,x2,y2,w2,h2){
  var h=(x1<(x2+w2))&&((x1+w1)>x2);
  var v=(y1<(y2+h2))&&((y1+h1)>y2);
  return (h&&v);
}
