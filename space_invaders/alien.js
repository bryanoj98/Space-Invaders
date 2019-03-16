//<![CDATA[
window.onload=function(){
var x=120;
var y=120;
var key,pos=0;
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var img=new Image();
img.onload=function()
{
  ctx.drawImage(img,x,y);
}
img.src="azu.png";
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
  if(key==38)y-=2;
  if(key==39)x+=2;
  if(key==40)y+=2;
    canvas.width=canvas.width;
  ctx.drawImage(img,x,y);
},5);
}//]]>

/*function myCanvas() {
  var c = document.getElementById("imagen");
  var ctx = c.getContext("2d");
  var img = document.getElementById("alienI");
  c.setAttribute("width","220");
  c.setAttribute("height","220");
  ctx.drawImage(img,0,0);
}*/
