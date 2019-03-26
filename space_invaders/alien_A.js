function Alien(x,y,vivo){
  this.x=x;
  this.y=y;
  this.vivo=vivo;
  this.imagen=document.getElementById("alienI");
  }
  function Bala(Disparador,x,y){
    this.x=x;
    this.y=y;
    this.d=Disparador;
  }
  var aliens=[];
  var naves=[];
  var balas=[];
  // var Valiens=[1,1,1,1,1,1,1,1,1,1,1,1];

  for(var g=0;g<12;g++)
  {
    if(g<=5)
      aliens.push(new Alien(550-(100*g),1,true));
    else
      aliens.push(new Alien(550-(100*(g-6)),90,true));
  }
  balas.push(new Bala(0,aliens[0].x,aliens[0].y),new Bala(1,50,50));
  naves.push(document.getElementById("nave"),document.getElementById("nave2"),document.getElementById("nave3"));


  var rand=0;
window.onload=function(){
var x=500,y=380,tx=550,ty=1,x2=0;
var key,pos=0;
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
// var img=new Image();
var sentido=0,pum=0, pam=0;
var yin=y, xin=x,yi=0,xi=0;
var Nnaves=0; //CAMBIAR a 0
var score=0;

function pintar(){
  canvas.width=canvas.width;
   // ctx.drawImage(img,x,y);
  for (var i = 0; i < aliens.length; i++) {
    if(aliens[i].vivo==true){
      ctx.drawImage(aliens[i].imagen,aliens[i].x,aliens[i].y);
    }
  }
    if(pum>=1)
    {
      ctx.moveTo(balas[1].x+55,(balas[1].y-40));
      ctx.lineTo(balas[1].x+55,balas[1].y);
      ctx.strokeStyle = "#f00";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
    if(pam>=1)
    {
      ctx.moveTo(balas[0].x+55,(balas[0].y-40));
      ctx.lineTo(balas[0].x+55,balas[0].y);
      ctx.strokeStyle = "#f00";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
// nuevo
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
//FIN nuevo
}//fin pintar
//nuevo
$.get("Ngamers", function(data){
    Nnaves=data;
  });
var actualizar = setInterval(actu, 100);
function actu() {
  var ayu=""
  // var n = x.toString();
  // n+="_"+Nnaves.toString();
  var arr = [ x.toString(),Nnaves.toString()];
  var vx = JSON.stringify(arr);
  if(Nnaves<=2)
  {
    $.ajax({
		url: "Navexy",
		type: "POST",
		data: vx
	}).done(function(data){
    var resp = JSON.parse(data);
      x2=resp[0]
    });
    var envi=""
    for(var g=0;g<12;g++)
    if(aliens[g].vivo==true)
      envi+=1;
    else
      envi+=0;
    var arr = [Nnaves.toString(),pam.toString(),balas[0].x.toString(),balas[0].y.toString()];
    var vx = JSON.stringify(arr);
    $.ajax({
		url: "Bala",
		type: "POST",
		data: vx
	}).done(function(data){
    if(Nnaves>1)
    {
      var resp = JSON.parse(data);
      if(pam==0&&resp[0]!="0")
      {
        // alert(resp[0])
        pam=Number(esp[0]);
        balas[0].x=Number(resp[1]);
        balas[0].y=Number(resp[2]);
      }
    }
  });
    var arr = [ envi, tx.toString(), Nnaves.toString()];
    var vx = JSON.stringify(arr);
    $.ajax({
		url: "Aliensxy",
		type: "POST",
		data: vx
	}).done(function(data){
    var resp = JSON.parse(data);
      if(Nnaves>1)
        tx=resp[0];
      var a=resp[1].split('');
      for (var i = 0; i < a.length; i++) {
        if(a[i]=="0"&&aliens[i].vivo==true)
            aliens[i].vivo=false;
      }
	});
    // var f=0;
    // for (var i = 0; i < aliens.length; i++) {
    //   if(aliens[i].vivo==false)
    //     f=f+1;
    // }
    // if(f==12)
    // {
    //   envi=score.toString()+"_"+Nnaves.toString();
    //   $.post("Score",
    //   {
    //     wx: envi
    //   },
    //   function(data){
    //     var resp = JSON.parse(data);
    //     alert("El jugador: "+resp[0]+" gana")
    //
    //   });
    // }
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
//fin nuevo
var myVar = setInterval(myTimer, 100);


function myTimer() {
  if(pam==0&Nnaves==1)
  {
    while(1)
    {
      a=Math.floor(Math.random() * 12);
      if(aliens[a].vivo==true){
        balas[0].x=aliens[a].x;
        balas[0].y=aliens[a].y+90;
        pam+=1;
        break;
      }
    }
  }
  //nuevo if
  if(Nnaves==1|Nnaves>=3)
  {
    if(sentido==0)
      tx=tx+10;
    else
      tx=tx-10;
  }
  //fin if
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
  if(pam>=1){
    pam=pam+5;
    balas[0].y=balas[0].y+pam;
    console.log("nave",x,y);
    console.log("bala",balas[0].x,balas[0].y);
    if(balas[0].x>=(x-56)&&balas[0].x<=(x+56) && balas[0].y>=(y+50)&&balas[0].y<=(y+110))
    {
    //  aliens[i].vivo=false;
      pam=0;
      alert("GAME OVER");
    }
  }
  if(pam>100)
  {
    pam=0;
   // balas.pop();
  }

  if(pum>=1)
  {
    pum=pum+2;
    balas[1].y=balas[1].y-pum;
    for (var i = 0; i < aliens.length; i++)
    {
        if(balas[1].x>=(aliens[i].x-40)&&balas[1].x<=(aliens[i].x+40) && balas[1].y>=(aliens[i].y)&&balas[1].y<=(aliens[i].y+60)&&aliens[i].vivo==true)
        {
          aliens[i].vivo=false;
          pum=0;
          score+=10;
          if (score==120){
            pam=-1;//-1
          alert("YOU WIN");
        }}
    }
    if(pum>40)
    {
      pum=0;
    }
  }

  for(var g=0;g<12;g++)
  {
    if(g<=5)
      aliens[g].x=tx-(100*g);
    else
      aliens[g].x=tx-(100*(g-6));
  }
  document.getElementById('ultra').innerHTML = score;
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
    if(pum==0)
    {
      balas[1].x=x;
      balas[1].y=y;
      pum+=1;
    }

}

  //if(key==40)y+=2;
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
