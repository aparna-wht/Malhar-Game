var edges;
var bg;
var police,policeImg;
var thief1,thief2,thief1Img,thief2Img,thief1Flipped,thief2Flipped;
var gun,gunImg,bullet,bulletImg;
var gunflag = 0, bulletFlag = 0 , killedThief = 0;
var bulletGroup;
var gameState = 1;
var bulletFlipped;
var blastImg;
var thiefGroup;
var amo;
var msg = "GRAB THE GUN";




function preload()
{
  bg = loadImage("./Images/Background.png");
  policeImg = loadGif("./Images/Police Walking.gif");
  thief1Img = loadGif("./Images/Thief1.gif");
  thief2Img = loadGif("./Images/Thief2.gif");
  gunImg = loadImage("./Images/gun.png");
  bulletImg = loadImage('./Images/bullet.png');
  thief1Flipped = loadGif('./Images/thief1Flipped.gif');
  thief2Flipped = loadGif('./Images/thief2Flipped.gif');
  bulletFlipped = loadImage('./Images/bulletFlipped.png');
  blastImg = loadImage("./Images/blast.png")
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

   police = createSprite(40,350,50,50);
   police.addImage(policeImg);
   police.scale = 1.5;

 gun = createSprite(950,50,20,20);
 gun.addImage(gunImg);
 gun.scale = 0.10;

 bullet = createSprite(950,650,20,20);
 bullet.addImage(bulletImg);
 bullet.scale = 0.2;
 bullet.visible = false;

 thief1 = createSprite(50,50,100,100);
 thief1.addImage(thief1Img);
 thief1.scale = 0.05;
 thief1.velocityX = 2;
 thief1.velocityY = 1.3;
 //thief1.setCollider('rectangle',100,100,100,100,0)
 thief1.debug = true;
 

 thief2 = createSprite(950,650,100,100);
 thief2.addImage(thief2Img);
 thief2.scale = 0.5;
 thief2.velocityX = -2;
 thief2.velocityY = -1;
 thief2.debug = true;
 //thief2.setCollider('rectangle',0,0,70,70);

 leftWall = createSprite(0,350,20,700);
 rightWall = createSprite(1000,350,20,700);
 topWall = createSprite(500,0,1000,20);
 bottomWall = createSprite(500,700,1000,20);

  

  rectMode(CENTER);
  textSize(15);

  msgBoard= createElement("h2");
  scoreboard= createElement("h1");

  bulletGroup = createGroup();
  thiefGroup = createGroup();
  thiefGroup.add(thief1);
  thiefGroup.add(thief2);

}

function draw() 
{
  background(bg);

  msgBoard.html("👮‍♂️ "+msg)
  msgBoard.style('color:#E67E22'); 
  msgBoard.position(80,20)

  police.velocityX = 0;
  police.velocityY = 0;

  police.collide(leftWall);
  police.collide(rightWall);
  police.bounceOff(topWall);
  police.collide(bottomWall);

  if(gameState == 1)
  {
    thief1Bouncing();
    thief2Bouncing();
  
    movePolice();
    
    if(police.isTouching(gun) && gunflag == 0)
    {
       showBullet();
       msg = "GRAB THE BULLET"
     
       gunflag = 1;
    }
  
    if(gunflag == 1)
    {
      gun.x=police.x+70;
      gun.y=police.y;
    }
  
    if(police.collide(bulletGroup) && bulletFlag == 0)
    {
      grabBullet();
      msg = "AMO LOaded !! Shoot the thief with space"
      bulletFlag = 1;
    }
    if(keyWentDown("space") && bulletFlag == 1)
    {
      amo = shootBullet();
     
     

      
     
    }
    if(amo!== undefined && thiefGroup.isTouching(amo)){
     
     killThief(amo);
     msg = "YAY !! Thief Killed ! Grab the Bullet Again"
     
     bulletFlag = 0;
   
   }
  if(killedThief == 2)
  {
    msg = "YOu WON!!";
    won();


  }
   
   
  }

  movePolice();

  
  
  drawSprites();

  }
  function killThief(b){

    blast= createSprite(b.x+60, b.y, 50,50);
    blast.addImage(blastImg)
    blast.scale=0.3
    blast.life=20
    if(b.collide(thief1))
      thief1.destroy();
    else 
       thief2.destroy();
    b.destroy();
    killedThief++;
    showBullet();
    console.log("thief killed");
}


  function showBullet()
  {
    bullet = createSprite(950,650,20,20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.2;
    bulletGroup.add(bullet);
    gun.x = police.x+70;
    gun.y = police.y;
    
    console.log("gun taken");
  }

  function grabBullet()
  {
  
         bulletGroup[0].destroy();

  }
  function shootBullet()
  {
    var b = createSprite(police.x,police.y,20,20);
    b.addImage(bulletFlipped);
    b.scale = 0.2;
 
    b.velocityX = 5;
    
     b.debug = true;
  

     
    b.life = 200;
    for(var i = police.x;i<=innerWidth;i= i+20)
    {
      stroke ("red");
      line(i,police.y,i+10,police.y)

    }
         
     return b;

  }



  function movePolice()
  {
    if(keyDown("right"))
    {
      police.velocityX = 3;
    }
    if(keyDown("left"))
    {
      police.velocityX = -3;
    }
    if(keyDown("up"))
    {
      police.velocityY = -3;
    }
    if(keyDown("down"))
    {
      police.velocityY = 3;
    }
  }

function thief2Bouncing()
{
  if(thief2.isTouching(leftWall))
  {
    thief2.addImage(thief2Flipped);
    thief2.velocityX = 2;
    thief2.velocityY = 1;
  }
  else if(thief2.isTouching(topWall))
  {
    thief2.addImage(thief2Img);
    thief2.velocityX = -2;
    thief2.velocityY = 1;
  }
  else if(thief2.isTouching(bottomWall))
  {
    thief2.addImage(thief2Flipped);
    thief2.velocityX = 2;
    thief2.velocityY = -1;
  }
    if(thief2.isTouching(rightWall))
    {
      thief2.addImage(thief2Img);
      thief2.velocityX = -1;
      thief2.velocityY = -1;
    }
  
}

  function thief1Bouncing()
  {
    if(thief1.isTouching(rightWall))
    {
      thief1.addImage(thief1Flipped);
      thief1.velocityX = -2;
      thief1.velocityY = 1;
      console.log("turn");
    }
    else if(thief1.isTouching(leftWall))
    {
      thief1.addImage(thief1Img);
      thief1.velocityX = 2;
      thief1.velocityY = -1;
    }
    else if(thief1.isTouching(topWall))
    {
      thief1.addImage(thief1Img);
      thief1.velocityX = 2;
      thief1.velocityY = 1;
    }
    else if(thief1.isTouching(bottomWall))
    {
      thief1.addImage(thief1Flipped);
      thief1.velocityX = -2;
      thief1.velocityY = -1;
    }
  }
function won()
{
  swal({
    title: `You WON`,
    text: "You Killed Both The Thief!!!",
    
    imageUrl:
      "./Images/policeThief.png",
    imageSize: "100x100",
    confirmButtonText: "Play Again"
  },
  function (isConfirm)
    {
      if(isConfirm)
      {
        location.reload();

      }
    }
    );
} 



