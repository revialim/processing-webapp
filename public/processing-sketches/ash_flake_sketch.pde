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