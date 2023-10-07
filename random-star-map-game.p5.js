let backgroundColor;
let starColorRange = [220, 256]; // [low, high)
let stars = [];
let starCount = 50;

let p;
let pressedKeys = {};

let startTime = -1, endTime = -1;

let endColor = 0;
let endScreen = false;

class Star {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    
    this.radius = radius;
    
    this.clr = color(random(starColorRange[0], starColorRange[1]), random(starColorRange[0], starColorRange[1]), random(starColorRange[0], starColorRange[1]));
  }
  
  display() {
    fill(this.clr);
    circle(this.x, this.y, this.radius*2);
  }
  
}

class Player {
  // the player will be a black hole.
  // the player will have to see how fast they can eat every star.
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    
    this.speed = 5;
  }
  
  display() {
    fill(color(red(backgroundColor) + 20,
               green(backgroundColor) + 20,
               blue(backgroundColor) + 20));
    circle(this.x, this.y, this.radius*2);
  }
  
  
  eatStars() {
    // all the stars nearby will be devoured.
    // Note: A possible optimization could be to have all the stars be put into grid cells, and only check the ones in nearby grid cells. For the purpose of simplicity, this optimization will NOT be added.
    for (let i = 0; i < stars.length; i++) {
      let e = stars[i];
    
      let dx = (e.x - this.x);
      let dy = (e.y - this.y);
      
      if (dx*dx + dy*dy < this.radius*this.radius) {
        // eat the star
        stars.splice(i, 1);
       // console.log("devouring star " + i + " (" + e.x + ", " + e.y + "), location is (" + this.x + ", " + this.y + ") because dx of " + dx + " and dy of " + dy + " (Remaining: " + stars.length + ")");
      }
    }
  }
}

function preload() {
  /* initialization */
  backgroundColor = color(10, 10, 30); // a nice dark blue color
  p = new Player(0, 0, 100);
  
  // add the stars
  for (let i = 0; i < starCount; i++) {
    stars[i] = new Star(random(0, windowWidth), random(0, windowHeight), random(2, 3));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(50);
}

function keyPressed(e) {
  // if start time is 0, start time is now
  if (startTime == -1) startTime = Date.now();
  
  pressedKeys[e.code] = true;
 // console.log(e.code + ": true");
}
function keyReleased(e) {
  pressedKeys[e.code] = false;
 // console.log(e.code + ": false");
}

function draw() {
  
  if (endScreen) {
    if (endColor >= 255) {
      noLoop(); // stop it
    } else
      endColor += 5;
    
    background(color(endColor));
    // display text
    text("You win! Time: " + (endTime - startTime) / 1000 + "seconds", 100, 100);
    
    return;
  }
  
  background(backgroundColor);
  
  
  if (startTime == -1) {
    // hasn't loaded into it yet, so output a tutorial text
    fill(color(150, 150, 210));
    text("Goal: Eat all the stars!\nHow to move:\nUse WASD or Arrow Keys\n\nNote: Timer doesn't start until you press a key.", 100, 100, windowWidth - 100, windowHeight - 100);
  }
  
  if (pressedKeys.KeyW || pressedKeys.ArrowUp) p.y -= p.speed;
  if (pressedKeys.KeyA || pressedKeys.ArrowLeft) p.x -= p.speed;
  if (pressedKeys.KeyS || pressedKeys.ArrowDown) p.y += p.speed;
  if (pressedKeys.KeyD || pressedKeys.ArrowRight) p.x += p.speed;
  
  p.display();
  p.eatStars();
  
  // if there are no stars remaining, you win and output the time
  if (stars.length == 0) {
    // display an end screen.
    endScreen = true;
    endTime = Date.now();
  }
  
  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }
}
