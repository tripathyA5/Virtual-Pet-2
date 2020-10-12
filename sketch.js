
//Create variables here
var dog, happyDog, database, foodS, foodStock, dogIMG,food,feed,foodObj;
function preload()
{
  //load images here
  dogIMG=loadImage("images/dogImg.png");
  dogIMG=loadImage("images/dogImg1.png"); 
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  dog=createSprite(250,250,50,50);
  dog.addImage(dogIMG);

dog.scale=0.2;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogIMG);
  }
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12, "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed:12 AM",350,30);
  }else{
    text("Last Feed:"+lastFed+"AM",350,30);
  }
  //add styles here

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



