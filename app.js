var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var start=document.getElementsByClassName("ex");
var starts=document.getElementsByClassName("expl");
var mode=document.getElementsByClassName("stageSelect");
var select=document.getElementById("stages");
var level=document.getElementById("level");
var lastScreen=document.createElement("div");
var lastContent=document.createElement("div");
var lastMessage=document.createElement("h1");
var lastScore=document.createElement("p");
var lastDemon=document.createElement("img");
var lastDemonMes=document.createElement("p");
var lasttalk=document.createElement("img");
var result=document.createElement("div");
var demonPosition=document.createElement("div");

demonPosition.style.position="absolute";
demonPosition.style.top="55px";
demonPosition.style.left="390px";
demonPosition.style.width="120px";
demonPosition.style.height="110px";
demonPosition.style.opacity="0";
document.body.appendChild(demonPosition);

lastScreen.style.position="absolute";
lastScreen.id="lastS";
lastScreen.style.top="10px";
lastScreen.style.left="10px";
lastScreen.style.zIndex="3";
lastScreen.style.width="960px";
lastScreen.style.height="640px";
lastScreen.style.backgroundColor="#ffff99";

lastContent.id="lastC";
lastContent.style.position="relative";
lastContent.style.textAlign="center";
lastContent.style.top="200px";

lastMessage.style.position="absolute";
lastMessage.style.left="350px";
lastMessage.textContent="GAME CLEAR!!";

lastDemon.src="demon-human.png";
lastDemon.style.position="relative";
lastDemon.style.width="100px";
lastDemon.style.height="120px";
lastDemon.style.right="115px";
lastDemon.style.top="160px";

lasttalk.src="comment.png";
lasttalk.style.position="absolute";
lasttalk.style.width="600px";
lasttalk.style.height="270px";
lasttalk.style.right="150px";
lasttalk.style.top="10px";

lastDemonMes.style.position="absolute";
lastDemonMes.style.right="180px";
lastDemonMes.style.height="320px";
lastDemonMes.style.fontSize="25px";
lastDemonMes.style.width="540px";

lastScore.style.position="absolute";
lastScore.style.top="50px";
lastScore.style.left="430px";
lastScore.style.fontSize="20px";
lastScore.style.fontWeight="bold";

result.style.position="absolute";
result.style.top="70px";
result.style.left="240px";
result.style.color="#7f00ff";
result.style.zIndex="6";
result.style.textAlign="center";
result.style.fontWeight="bold";
result.style.fontSize="50px";

var demontouch=false;
var r=10;
var timing=0;
var time=0;
var bNumber=10;
var heighE=5;
var sx=435;
var sy=150;
var bx=[];
var by=[];
var heatR=0;
var heatL=0;
var coldR=0;
var coldL=0;
var clear=false;
var jadgeFirst=true;
var loopout=false;

mode[3].onmouseup=function(event){
  bNumber=4;heighE=2;
  level.textContent="EASY";
  select.remove();
}
mode[2].onmouseup=function(event){
  bNumber=8;heighE=4;
  level.textContent="NORMAL";
  select.remove();
}
mode[1].onmouseup=function(event){
  bNumber=12;heighE=6;
  level.textContent="HARD";
  select.remove();
}
mode[0].onmouseup=function(event){
  bNumber=16;heighE=8;
  level.textContent="VERY HARD";
  select.remove();
}
mode[3].addEventListener("touchend",event=>{
  bNumber=4;heighE=2;
  level.textContent="EASY";
  select.remove();
});

mode[2].addEventListener("touchend",event=>{
  bNumber=8;heighE=4;
  level.textContent="NORMAL";
  select.remove();
});
mode[1].addEventListener("touchend",event=>{
  bNumber=12;heighE=6;
  level.textContent="HARD";
  select.remove();
});
mode[0].addEventListener("touchend",event=>{
  bNumber=16;heighE=8;
  level.textContent="VERY HARD";
  select.remove();
});

function setBalls(){
for(var i=0;i<bNumber;i++){
  if(Math.random()>0.5){
  bx[i]=110+r+Math.random()*(325-2*r);
}else{
  bx[i]=455+r+Math.random()*(335-2*r);
}
by[i]=160+r+Math.random()*(380-2*r);
}
jadgeFirst=false;
}

var xSpeed=[];
var ySpeed=[];

function setSpeed(){
for(var i=0;i<bNumber;i++){
if(Math.random()>0.5){
  if(i<heighE){
  xSpeed[i]=3+1.5*Math.random();
  }else{  xSpeed[i]=0.5+1.5*Math.random();}
}else{
  if(i<heighE){
  xSpeed[i]=-3-1.5*Math.random();
}else{xSpeed[i]=-0.5-1.5*Math.random();}
}
if(Math.random()>0.5){
  if(i<heighE){
  ySpeed[i]=3+1.5*Math.random();
}else{ySpeed[i]=0.5+1.5*Math.random();}
}else{
  if(i<heighE){
  ySpeed[i]=-3-1.5*Math.random();
}else {ySpeed[i]=-0.5-1.5*Math.random();}
}
}
}

function drawMessage(){
  ctx.font="20px Arial";
  ctx.fillStyle="red";
  ctx.fillText("TOUCH!→",300,120);
}

var img=new Image();
img.src="demon.png";

function ball(bs){
  drawBall(bs);
  ballCollision(bs);
}

function drawBall(bNum){
  ctx.beginPath();
  ctx.arc(bx[bNum],by[bNum],r,0,Math.PI*2,false);
  if(Math.abs(xSpeed[bNum])>=3){
    ctx.fillStyle="#ff0000";
  }else{ctx.fillStyle="#0000ff";}

  ctx.fill();
  ctx.closePath();
}

function demonController(){
  if(demontouch&&sy+400>=160){
    sy-=10;
  }
  if(demontouch===false&&sy+400<=545){
    sy+=10;
  }
}

function drawSample(){
  ctx.beginPath();
  ctx.arc(850,250,r,0,Math.PI*2,false);
  ctx.fillStyle="#ff0000";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(850,300,r,0,Math.PI*2,false);
  ctx.fillStyle="#0000ff";
  ctx.fill();
  ctx.closePath();
  ctx.font="15px Arial";
  ctx.fillStyle="black";
  ctx.fillText("High Speed",870,255);
  ctx.font="15px Arial";
  ctx.fillStyle="black";
  ctx.fillText("Low Speed",870,305);
}

function difference(){
  heatL=heatR=coldL=coldR=0;
  for(var i=0;i<heighE;i++){
    if(bx[i]-r>450){
      heatR++;
    }
    if(bx[i]+r<438){
      heatL++;
    }
  }
  for(var i=heighE;i<bNumber;i++){
  if(bx[i]-r>450){
    coldR++;
  }
  if(bx[i]+r<438){
    coldL++;
  }
}

}
function ballCollision(bn){
  if((by[bn]-r<=160||by[bn]+r>=540)||(bx[bn]>=435&&bx[bn]<=455&&by[bn]-r<sy+400)){
    ySpeed[bn]=-ySpeed[bn];
  }
  if((by[bn]-r<sy+400&&bx[bn]+r>=435&&bx[bn]+r<=440)||(bx[bn]-r<=110||bx[bn]+r>790)||(by[bn]-r<sy+400&&bx[bn]>455&&xSpeed[bn]<0&&bx[bn]-r<=455)){
    xSpeed[bn]=-xSpeed[bn];
  }
  bx[bn]+=xSpeed[bn];
  by[bn]+=ySpeed[bn];

}
demonPosition.addEventListener('touchstart',event=>{
  demontouch=true;
});
demonPosition.addEventListener('touchend',event=>{
  demontouch=false;
});
demonPosition.onmousedown=function(event){
  demontouch=true;
}
demonPosition.onmouseup=function(event){
  demontouch=false;
}
/*demonPosition.touchstart=function(event){
  demontouch=true;
}
demonPosition.touchend=function(event){
  demontouch=false;
}*/

document.addEventListener('keydown',event=>{
  if(event.key==="ArrowUp"){
    if(sy+400>=160)sy-=10;
  }
  if(event.key==="ArrowDown"){
    if(sy+400<=545)sy+=10;
  }
});
function drawBox(){
  ctx.beginPath();
  ctx.rect(100,150,700,400);
  ctx.fillStyle="#deb887";
  ctx.fill();
  ctx.closePath();
}
function drawRoomR(){
    ctx.beginPath();
    ctx.rect(455,160,335,380);
    if(heatR===bNumber){
      ctx.fillStyle="#ff8e8e";
    }else if(coldR===bNumber){
      ctx.fillStyle="#8e8eff";
    }else if(heatR+coldR===0){
      ctx.fillStyle="white";
    }else if(heatR+coldR===bNumber){
      ctx.fillStyle="#bf7fff";
    }else if(heatR+coldR>bNumber/4*3){
      if(heatR>coldR){
        ctx.fillStyle="#ff93c9";
      }else if(heatR===coldR){
        ctx.fillStyle="#ff93ff";
      }else{
        ctx.fillStyle="#c993ff";
      }
    }else if(heatR+coldR>bNumber/2){
      if(heatR>coldR){
        ctx.fillStyle="#ffadd6";
      }else if(heatR===coldR){
        ctx.fillStyle="#ffadff";
      }else{
        ctx.fillStyle="#d6adff";
      }
    }else if(heatR+coldR>bNumber/4){
      if(heatR>coldR){
        ctx.fillStyle="#ffc1e0";
      }else if(heatR===coldR){
        ctx.fillStyle="#ffc1ff";
      }else{
        ctx.fillStyle="#e0c1ff";
      }
    }else{
      if(heatR>coldR){
        ctx.fillStyle="#ffd6ea";
      }else if(heatR===coldR){
        ctx.fillStyle="#ffd6ff";
      }else{
        ctx.fillStyle="#ead6ff";
      }
    }
    ctx.fill();
    ctx.closePath();
}

function countDown(){
ctx.font="30px Arial";
ctx.fillStyle="black";
ctx.fillText("TIME: "+(time/100),c.width-200,30);

}
function drawRoomL(){
    ctx.beginPath();
    ctx.rect(110,160,325,380);
    if(heatL===bNumber){
      ctx.fillStyle="#ff8e8e";
    }else if(coldL===bNumber){
      ctx.fillStyle="#8e8eff";
    }else if(heatL+coldL===0){
      ctx.fillStyle="white";
    }else if(heatL+coldL===bNumber){
      ctx.fillStyle="#bf7fff";
    }else if(heatL+coldL>bNumber/4*3){
      if(heatL>coldL){
        ctx.fillStyle="#ff93c9";
      }else if(heatL===coldL){
        ctx.fillStyle="#ff93ff";
      }else{
        ctx.fillStyle="#c993ff";
      }
    }else if(heatR+coldR>bNumber/2){
      if(heatL>coldL){
        ctx.fillStyle="#ffadd6";
      }else if(heatL===coldL){
        ctx.fillStyle="#ffadff";
      }else{
        ctx.fillStyle="#d6adff";
      }
    }else if(heatL+coldL>bNumber/4){
      if(heatL>coldL){
        ctx.fillStyle="#ffc1e0";
      }else if(heatL===coldL){
        ctx.fillStyle="#ffc1ff";
      }else{
        ctx.fillStyle="#e0c1ff";
      }
    }else{
      if(heatL>coldL){
        ctx.fillStyle="#ffd6ea";
      }else if(heatL===coldL){
        ctx.fillStyle="#ffd6ff";
      }else{
        ctx.fillStyle="#ead6ff";
      }
    }
    ctx.fill();
    ctx.closePath();
}

function stick(){
  ctx.beginPath();
  ctx.rect(435,sy,20,400);
  ctx.fillStyle="#deb887";
  ctx.fill();
  ctx.closePath();
}
function stickSpace(){
  ctx.beginPath();
  ctx.rect(435,150,20,390);
  ctx.fillStyle="white";
  ctx.fill();
  ctx.closePath();
}
function loop(){
  ctx.clearRect(0,0,c.width,c.height);
  drawMessage();
  if(jadgeFirst){
    setBalls();
    setSpeed();
  }
  drawBox();
  drawSample();
  difference();
  drawRoomR();
  drawRoomL();
  ctx.drawImage(img,400,55,100,100);
  stickSpace();
  demonController();
  stick();
  for (var i = 0; i <bNumber; i++) {
    ball(i);
  }
  if(((heatR===heighE&&coldL===heighE)||(heatL===heighE&&coldR===heighE))&&sy>=148){
    clear=true;
  }
  if(clear){
    timing++;
    if(timing>100){
      ctx.font="70px Arial";
      ctx.fillStyle="black";
      ctx.fillText("CLEAR!!",300,280);
    }
  }
  if(timing>230){
    loopout=true;
    drawLast();
    stopTimer();
  }
  time++;
  countDown();
}
function drawLast(){
if(loopout){
  lastScore.textContent="Time: "+Math.floor(time/100+"s");
  document.body.appendChild(lastScreen);
  document.body.appendChild(result);
  lastScreen.appendChild(lastContent);
  lastContent.appendChild(lastMessage);
  lastContent.appendChild(lastScore);
  lastContent.appendChild(lastDemon);
  lastContent.appendChild(lasttalk);
  lastContent.appendChild(lastDemonMes);
  lastDemonMes.textContent="この人でなし！";
  result.textContent="あなたは立派な悪魔です";
}
}
var loopController;
function startTimer(){
loopController=setInterval(function(){
loop();
} , 10);
}

function stopTimer(){
clearInterval(loopController);
}

start[0].onmouseup=function(event){
  starts[0].remove();
  startTimer();
}
