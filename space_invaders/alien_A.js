function Alien(x,y,vivo){
  this.x=x;
  this.y=y;
  this.vivo=vivo;
  //this.disparo=disparo;
  this.imagen=document.getElementById("alienI");
  }
  function Bala(Disparador,x,y){
    this.x=x;
    this.y=y;
    this.d=Disparador;    
  }
  var aliens=[];
  for(var g=0;g<12;g++)
  {
    if(g<=5)
      aliens.push(new Alien(550-(100*g),1,true));
    else
      aliens.push(new Alien(550-(100*(g-6)),90,true));      
  }
  var balas=[];
  balas.push(new Bala(0,aliens[0].x,aliens[0].y),new Bala(1,50,50));

  
  var rand=0;
 // console.log(aliens);
//var bala= new Disparo("Alien",1,1);
window.onload=function(){
var x=500,y=380,tx=550,ty=1;
var key,pos=0;
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var img=new Image();
var sentido=0,pum=0, pam=0;
var yin=y, xin=x,yi=0,xi=0;
var score=0;


function pintar(){
  canvas.width=canvas.width;
   ctx.drawImage(img,x,y);
  for (var i = 0; i < aliens.length; i++) {
    if(aliens[i].vivo==true){
      ctx.drawImage(aliens[i].imagen,aliens[i].x,aliens[i].y);
        //aliens[i].x=tx;
        
        //    console.log(aliens[i].disparo);}
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

   
}
img=document.getElementById("nave");

var myVar = setInterval(myTimer, 100);


function myTimer() {

  if(pam==0)
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
            pam=1;
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