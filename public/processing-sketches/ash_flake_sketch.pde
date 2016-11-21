Flake flakey;
boolean moving = false;
Flake[] flakes;
//numbers of flakes
int count = 6000;
float tx, ty; //target coordinates
int doneFlakes = 0;


void setup() {
  size(720, 480);
  flakes = new Flake[count];
  for (int i = 0; i< count; i++) {
    /*
    tx = exp((i/10)*0.5)*cos((i/10))+200;
     ty = exp((i/10)*0.5)*sin((i/10))+200;
     flakes[i]= new Flake(tx,ty);
    /**/
    flakes[i]= new Flake(i);
    flakes[i].display();
  }
  frameRate(30);
}

void draw() {
  background(255);
  if (mousePressed) {
    moving = true;
  }

  if (moving) {
    for (Flake flake : flakes) {
      flake.moveToDestination();
      if (flake.isDone() && !flake.hasCounted()) {
        doneFlakes = doneFlakes +1;
        flake.setCounted(true);
      }
    }
  }


  for (Flake flake : flakes) {
    flake.display();
  }
}

// ashflake simulation

class Flake{
  float x;//initial starting coord.
  float y;
  float speed = 5;
  float tx;//target (used for mouse coord.)
  float ty;
  float dx;//destination
  float dy;
  
  boolean flakeCounted = false;
  
  int rgrey;//colour of ash flake
  

  Flake(){    
     rgrey = floor(random(100,200));//every ash flake has a different shade
     x= random(500);
     y= random(500);
  }
  
  Flake(float dx, float dy){ //call with desired destination coordinates
     //dx and dy are the destination coordinates
     this();//ruft den obrigen Konstruktor auf bzw. führt aus, was dort drin steht, weil doppelter code ist blöd pups :(
     
     this.dx = dx;
     this.dy = dy;
  }
  
  Flake(int i){ //call with number of flake – place it on the spiral depending on its number
    //initiate flake the otherway arount, so animation is reverse in the end
    this();
    
    float scalefactor = 40.0;
    float yo = i/scalefactor;
    
    x = (exp((yo*0.1)*0.5)*cos(yo*0.1)+600)*0.5;
    y = (exp((yo*0.1)*0.5)*sin(yo*0.1)+450)*0.5;
    
    dx = random(720);
    dy = random(480);
  } 
  

  void moveToDestination(){
    // new coordinates after each frame – depending on destination coord.
    if(isClose(x, y, dx, dy) == false){
      float p2x = x - speed* (1/dist(x,y,dx,dy))*(x-dx);
      float p2y = y - speed* (1/dist(x,y,dx,dy))*(y-dy);
      x = p2x;
      y = p2y;
    }
  }
  
  
  boolean isClose(float x, float y, float tx, float ty){ 
    if(dist(x, y, tx, ty)<5){
      return true;
    }
    else{
      return false;
    }
  }
  
  boolean isDone(){
    if(isClose(x, y, dx, dy)){
      return true;
    }
    else{
      return false;
    }
  }
  
  void setCounted(boolean counted){
    flakeCounted = counted;
  }
  
  boolean hasCounted(){
    return flakeCounted;
  }


  void display() {
    //display self
    fill(rgrey);
    stroke(rgrey);
    //rect(x,y,3,3);
    ellipse(x,y,2,2);
  }

  /*
  void moveToDestination(float dx, float a){
    // new coordinates after each frame – depending on destination coord.
    dy = dy + random(-1,1)*a;
    speed = random(1, 20);
    if(isClose(x, y, dx, dy) == false){
      float p2x = x - speed* (1/dist(x,y,dx,dy))*(x-dx);
      float p2y = y - speed* (1/dist(x,y,dx,dy))*(y-dy);
      x = p2x;
      y = p2y;
    }
  }
  
  void changeCoordinates(){ 
    tx = mouseX;
    ty = mouseY;
  }

  void moveToMouse(){
    // new coordinates after each frame – depending on mouse coord.
    float p2x = x - (1/dist(x,y,tx,ty))*(x-tx);
    float p2y = y - (1/dist(x,y,tx,ty))*(y-ty);
    x = p2x;
    y = p2y;
  }
  
  boolean isCloseToTarget(){ 
    if(dist(x, y, tx, ty)<5){
      return true;
    }
    else return false;
  }
  */
}