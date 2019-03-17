var aliens=[];
aliens.push(document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),
document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'));

window.onload=function(){
var x=500,y=380,tx=550,ty=1;
var key,pos=0;
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var img=new Image();
var sentido=0,pum=0;

function pintar(){
  canvas.width=canvas.width;
  for (var i = 0; i < aliens.length; i++) {
    if(i<=5)
      ctx.drawImage(aliens[i],tx-(100*i),ty);
    else
      ctx.drawImage(aliens[i],tx-(100*(i-6)),ty+90);
  }
  if(pum>=1)
  {
    ctx.moveTo(x+55,(y-40)-pum);
    ctx.lineTo(x+55,y-pum);
    ctx.strokeStyle = "#f00";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  /*ctx.drawImage(img3,tx+90,ty);
  ctx.drawImage(img2,tx,ty);*/
  ctx.drawImage(img,x,y);
}
/*img.onload=function()
{
  ctx.drawImage(img,x,y);
}*/
img=document.getElementById("nave");

var myVar = setInterval(myTimer, 100);

function myTimer() {
  if(sentido==0)
    tx=tx+10;
  else
    tx=tx-10;
  if(tx>=canvas.width-90)
  {
    tx=canvas.width-90;
    sentido=1;
  }
  else if(tx<=500)
  {
    tx=500;
    sentido=0;
  }
  if(pum>=1)
    pum=pum+5;
  pintar();
}
document.onkeydown=function(e)
{
  pos=1;
  key=window.event?e.keyCode:e.which;
}
document.onkeyup=function(e){pos=0;}
setInterval(function()
{
  if(pos==0)return;
  if(key==37)x-=2;
  //if(key==38)y-=2;
  else if(key==39)x+=2;
  else if(key==32){
    pum=1;
  }

  //if(key==40)y+=2;
    //canvas.width=canvas.width;
//limites
  if(x>=canvas.width-110)
    x=canvas.width-110;
  else if(x<=0)
      x=0;
  /*if(y>=canvas.height-110)
    y=canvas.height-110;
  if(y<=10)
      y=10;*/
  //ctx.drawImage(img,x,y);
  pintar();

},5);
}
