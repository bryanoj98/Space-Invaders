var aliens=[];
var naves=[];

var Valiens=[1,1,1,1,1,1,1,1,1,1,1,1];
for (var i = 0; i < 12; i++) {
  aliens.push(document.getElementById('alienI'));
}
// aliens.push(document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),
// document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'),document.getElementById('alienI'));

window.onload=function(){
var x=500,y=380,tx=550,ty=1,x2=800;
var key,pos=0;
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var img=new Image();
var sentido=0,pum=0;
var Nnaves=0;

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
  if(Nnaves>2)
  {
    ctx.font = "100px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    mensa="Espere su turno #"+Nnaves.toString();
    ctx.fillText(mensa, canvas.width/2, canvas.height/2);
    ctx.drawImage(naves[(Nnaves-1)],x,y);
  }
  else {
    for (var i = 0; i < 2; i++) {
      if(i==(Nnaves-1))
        ctx.drawImage(naves[i],x,y);
      else
      {
        if(x2!=0)
          ctx.drawImage(naves[i],x2,y);
      }
    }
  }


}
naves.push(document.getElementById("nave"),document.getElementById("nave2"),document.getElementById("nave3"));
$.get("Ngamers", function(data){
    Nnaves=data;
  });
/*img=document.getElementById("nave");
nave2=document.getElementById("nave2");*/
var actualizar = setInterval(actu, 100);
function actu() {
  if(Nnaves<=2)
  {
    var n = x.toString();
    n+="_"+Nnaves.toString();
    $.post("Navexy",
    {
      xs: n
    },
    function(data){
      x2=data;
    });

    var ayu=""
    var envi=""
    for (var i = 0; i < Valiens.length; i++)
      envi+=Valiens[i];
    envi+="_"+tx.toString()+"_"+sentido.toString()+"_"+Nnaves.toString();
    $.post("Aliensxy",
    {
      wx: envi
    },
    function(data){
      if(Nnaves>1)
        tx=data;
      ayu=data;
    });
  }
  else {
    var envi=Nnaves.toString();
    $.post("Cola",
    {
      wx: envi
    },
    function(data){
      Nnaves=data;
    });
  }
}

var myVar = setInterval(MoverAlient, 100);

function MoverAlient() {
if(Nnaves==1|Nnaves>=3)
{
  if(sentido==0)
    tx=tx+10;
  else
    tx=tx-10;
}
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
  document.getElementById('ultra').innerHTML = key;
}
document.onkeyup=function(e){pos=0;}
setInterval(function()
{
  if(pos==0)return;
  if(key==37)
  {
    x-=2;
  }
  //if(key==38)y-=2;
  else if(key==39){
    x+=2;
  }
  else if(key==32){
    pum=1;
  }
  //if(key==40)y+=2;
  else if(key==65)x2-=2;
  else if(key==68)x2+=2;

    //canvas.width=canvas.width;
//limites
  if(x>=canvas.width-110)
    x=canvas.width-110;
  else if(x<=1)
      x=1;
  /*if(y>=canvas.height-110)
    y=canvas.height-110;
  if(y<=10)
      y=10;*/
  //ctx.drawImage(img,x,y);
  pintar();

},5);
}
