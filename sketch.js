
var monkey , monkey_running,monkey_stopped;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,gameState,PLAY=1,END=0;
var edge,invisibleGround;
var restart,restartImg;
var backGround,backGroundImg;


function preload(){
  
  //load animation for monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_stopped=loadAnimation("sprite_0.png");
  
  //load animation for obstacle and banana
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  restartImg=loadImage("restart.png");
  
  backGroundImg=loadImage("forest.png");
  
  //forestSound=loadSound("jungle book.m4a");
}



function setup() {
  
  createCanvas(500,400);
  
  backGround=createSprite(250,200);
  backGround.addImage("bk",backGroundImg);
  backGround.scale=0.6;
  
  monkey=createSprite(100,350);
  monkey.addAnimation("Monkey",monkey_running);
  monkey.addAnimation("stopped",monkey_stopped);
  monkey.scale=0.15;
  
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  
  invisibleGround=createSprite(100,400,200,10);
  invisibleGround.visible=false;
  
  restart=createSprite(250,200);
  restart.addImage("Restart",restartImg);
  restart.visible=false;
  
  edge=createEdgeSprites();
  
  gameState=PLAY;
  
  score=0;
}


function draw() {

  background("lightblue");
  
  //gravity
  monkey.velocityY=monkey.velocityY+0.6;
  
  //to jump monkey
  if(gameState===PLAY){
    
    //when  I tried sound my device is hanging and game is not working
   // forestSound.play();
    
  if(keyDown("space")&& monkey.y>348){
    monkey.velocityY=-13;
  }
    
  //console.log(monkey.y);
  
  score=score+Math.round(frameCount/100);
    
  spawnBanana();  
  spawnObstacle(); 
    
    //to end game
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
      
    }
  }  
  
  
  else if(gameState===END){
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.changeAnimation("stopped",monkey_stopped);
    
    restart.visible=true;
    
    if(mousePressedOver(restart)){
      reset();
    }
    
    
  }
  
  //catching banana and increasing score
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    
  }
 
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  textSize(20);
  fill("red");
  text("survival time  "+score,300,50);
  
}

function spawnBanana(){
  if(frameCount%80===0){
    banana=createSprite(400,Math.round(random(200,300)));
    banana.addImage("Banana",bananaImage);
    banana.velocityX=-4;
    banana.scale=0.15;
    banana.lifetime=100;
    bananaGroup.add(banana);
   
    
  }
}

function spawnObstacle(){
  if(frameCount%300===0){
    obstacle=createSprite(400,370,20,20);
    obstacle.velocityX=-4;
    obstacle.addImage("stone",obstacleImage);
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
    obstacle.scale=0.15;
    obstacle.debug=false;
    obstacle.setCollider("circle",0,0,150);
  }
}

function reset(){
  gameState=PLAY;
  monkey.changeAnimation("Monkey",monkey_running);
  restart.visible=false;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  score=0;
}




