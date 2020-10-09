var PLAY=1;
var END=0
var gameState=1;

var monkey, monkey_running, sadMonkey, ground1, ground2;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var beatenSound,bananaSound;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png",  "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png",  "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  beatenSound = loadSound("Rockslide.mp3");
  bananaSound = loadSound("banana_sound.mp3");
  
  sadMonkey = loadImage("sadMonkey.jpg")
}



function setup() {
  createCanvas(600,300);
  
  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,265,20,20);
   monkey.addAnimation("monkey", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground1 = createSprite(300,300,600,10);
  ground1.shapeColor="brown";
  
  ground2 = createSprite(300,295,600,5);
  ground2.shapeColor="green";
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  
}


function draw() {

  background("lightgreen");
  
    
    if(gameState===PLAY){
     
  if(keyDown("space") && monkey.y >= 160 ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 1;
  
    monkey.collide(ground2);   
  
    spawnFood();
    spawnObstacles(); 
      
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 500,50);  
      
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate()) 
    text("Survival Time: "+ survivalTime, 100,50); 
   
    if(obstaclesGroup.isTouching(monkey)){  
       gameState=END;    
       beatenSound.play();
    } 
      
    if (FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+5  
      bananaSound.play();
        }  
    
    }else if(gameState===END){
       monkey.velocityY = 0;
       obstaclesGroup.setVelocityXEach(0);
       FoodGroup.setVelocityXEach(0);
       obstaclesGroup.setLifetimeEach(-1);
       FoodGroup.setLifetimeEach(-1);
      
       monkey.addImage("monkey",sadMonkey);
       monkey.scale=0.14
             
             
    }
  drawSprites();
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(50,200);    
    banana.velocityX = -(5+4*score/10);
    
    banana.lifetime = 250;
    monkey.depth = banana.depth + 1; 
  
    banana.addImage(bananaImage);
    banana.scale=0.05;
  
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,280,10,40);
    obstacle.velocityX = -(6+3*score/10);
    
   
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.1;
    
    obstacle.lifetime = 300;
  
    obstaclesGroup.add(obstacle);
  }
}





