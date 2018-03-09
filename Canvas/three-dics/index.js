let paused=true;
let animateButton=document.querySelector('#animateButton');
let ctx=document.querySelector('canvas').getContext('2d');
let dics=[
  {
    x:40,
    y:50,
    radius:25,
    velocityX:2.5,
    velocityY:3.5,
    color:'blue'
  },
  {
    x:50,
    y:40,
    radius:25,
    velocityX:2,
    velocityY:-1.5,
    color:'orange'
  },
  {
    x:100,
    y:100,
    radius:25,
    velocityX:-4.5,
    velocityY:-4.5,
    color:'red'
  }
];
let numDics=dics.length;

function drawBackground(){
  let {height,width}=ctx.canvas;
  let y=height,step=12;
  ctx.strokeStyle = 'lightgray';
  ctx.lineWidth = 0.5;
  while(y>=step*4){
    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(width,y);
    ctx.stroke();
    y-=step;
  }
}

function update(){
  const {width,height}=ctx.canvas;
  for(let dic of dics){
    const {x,y,radius,velocityX,velocityY}=dic;
    if(x+velocityX+radius>width||x+velocityX-radius<0){
      dic.velocityX=-velocityX;
    }
    if(y+velocityY+radius>height||y+velocityY-radius<0){
      dic.velocityY=-velocityY;
    }
    dic.x=dic.velocityX+x;
    dic.y=dic.velocityY+y;
  }
}

function drawDics(){
  for(let dic of dics){
    const {x,y,radius,color}=dic;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.arc(x,y,radius,0,2*Math.PI,false);
    ctx.stroke();
    ctx.restore();
  }
}

function animate(){
  if(!paused){
    const {width,height}=ctx.canvas;
    ctx.clearRect(0,0,width,height);
    drawBackground();
    update();
    drawDics();
    requestAnimationFrame(animate);
  }
}

animateButton.addEventListener('click',function(){
  paused=!paused;
  if(paused){
    animateButton.textContent='animate';
  } else {
    animateButton.textContent='pause';
    requestAnimationFrame(animate);
  }
})