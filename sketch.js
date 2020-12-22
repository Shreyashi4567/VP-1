var dog, happyDog, database, foodS, foodStock;

function preload()
{
  DogImg = loadImage("images/dogImg.png");
  HappyImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,800);
  dog = createSprite(300,300,10,10);
  dog.addImage(DogImg);
  dog.scale=0.5;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

function draw() {  
  background(46,139,87);
  if(keyWentDown((UP_ARROW)))
  {
    writeStock(foodS);
    dog.addImage(HappyImg);
  }
  drawSprites();
  stroke("white");
  fill("white");
  textSize(30);
  text("Note: Press the up arrow key to feed Tommy milk!!!",300,100);
}
function readStock(data)
{
  foodS = data.val();
}
function writeStock(x)
{
  if(x<=0)
  {
    x = 0;
  }
  else
  {
    x = x - 1;
  }
  database.ref('/').update
  (
    {
      Food:x
    }
  )
}