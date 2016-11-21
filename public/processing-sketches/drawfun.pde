void setup(){
  size(500,500);
  background(200);
  stroke(10);
  rect(0,0,499,499);
}

void draw(){
  if(mousePressed == true){
    stroke(50);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
