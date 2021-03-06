var num=100;
var onPressed=false;
var pts=Array(0);



function setup(){
createCanvas(windowWidth, windowHeight);
background(255);
frameRate(30);
}


function draw(){
//background(255);
beginShape();
noFill();
println(pts.length);


  if (onPressed) {
     var newP = new Particle(mouseX, mouseY, 0,pts.length, pts.length);
      pts.push(newP);
  }
 
  for (var i=0; i<pts.length; i++) {
    var p = pts[i];
    p.update();
    p.display();
  }
 
  for (var i=pts.length-1; i>-1; i--) {
    var p = pts[i];
    if (p.dead) {
      pts.splice(i,1);
    }
  }
}



function mousePressed() {
  onPressed = true;
}
 
function mouseReleased() {
  onPressed = false;
}



function Particle(x,y,xOffset,yOffset){
  this.loc=createVector(x, y)
   this.randDegrees = random(360);
   this.vel = createVector(cos(radians(this.randDegrees)), sin(radians(this.randDegrees)));
   this.vel.mult(random(5));
   this.acc = createVector(0,0);
   this.lifeSpan=int(random(30, 90));
   this.passedLife=0;
   this.dead=false;
   this.weight=0;
   this.weightRange=random(1,15);
   this.decay= random(0.75, 0.9);
   this.xOffset, yOffset;
   this.c=color(random(255),random(255),255);
   this.xOffset = xOffset;
   this.yOffset = yOffset;

   this.update= function(){
    if(this.passedLife>=this.lifeSpan){
      this.dead = true;
    }else{
      this.passedLife++;
    }
     
    this.alpha2 = float(this.lifeSpan-this.passedLife)/this.lifeSpan * 70+50;
    this.weight = float(this.lifeSpan-this.passedLife)/this.lifeSpan * this.weightRange;
     
    this.acc.set(0,0);
     
    var rn = (noise((this.loc.x+frameCount+this.xOffset)*0.01, (this.loc.y+frameCount+this.yOffset)*0.01)-0.5)*4*PI;
    var maga = noise((this.loc.y+frameCount)*0.01, (this.loc.x+frameCount)*0.01);
    var dir = createVector(cos(rn),sin(rn));
    this.acc.add(dir);
    this.acc.mult(maga);
     
    var randDegrees = random(360);
    var randV = createVector(cos(radians(this.randDegrees)), sin(radians(this.randDegrees)));
    randV.mult(0.5);
    this.acc.add(randV);
     
    this.vel.add(this.acc);
    this.vel.mult(this.decay);
    this.vel.limit(3);
    this.loc.add(this.vel);
  }
   
  this.display = function(){
    //stroke(0, alpha);
    //point(loc.x, loc.y);

     
    push();
    //strokeWeight(this.weight*0.2);
    translate(this.loc.x,this.loc.y);
    point(0,0);
    noStroke();
    stroke(0,this.alpha2);
    fill(this.c);
    //sphere(weight);
    pop();
     
    /**
    strokeWeight(weight);
    stroke(c);
    point(loc.x, loc.y);
    **/
     
    //strokeWeight(weight);
    //stroke(c);
   // point(loc.x, loc.y,loc.y);
  }
}