//<![CDATA[
window.onload=function(){
var x=500;
var y=10;
var key,pos=0;
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var img=new Image();

img.onload=function()
{
  ctx.drawImage(img,x,y);
}
img=document.getElementById("nave");
img2=document.getElementById("alienI");

//img.src="azu.png";
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
  if(key==39)x+=2;
  //if(key==40)y+=2;
    canvas.width=canvas.width;
//limites
  if(x>=canvas.width-110)
    x=canvas.width-110;
  if(x<=0)
      x=0;
  /*if(y>=canvas.height-110)
    y=canvas.height-110;
  if(y<=10)
      y=10;*/
  ctx.drawImage(img,x,y);
  ctx.drawImage(img2,0,0);
  
  //ctx.drawImage(img,x,y,img.width/2.8, img.height*1.8);
},5);
}//]]>
