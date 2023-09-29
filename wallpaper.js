let screenWidth = 800, screenHeight = 450;
let totalStreaks = 50;

function doTrig(degree, length) {
  // Convert degrees to radians
  var radians = (degree * Math.PI) / 180;

  // Calculate the x and y coordinates
  var x = length * Math.cos(radians);
  var y = length * Math.sin(radians);

  return { x, y };
}

class BaseStreak {
  constructor(func, colour, size, x=random(screenWidth), y=random(screenHeight), angle=random(360), angleDifference=random(-10, 10)) {
    this.func = func;
    
    this.colour = colour;
    this.size = size;
    
    this.angle = angle;
    this.angleDifference = angleDifference;
    
    this.x = x;
    this.y = y;
  }
  
  move(amount) {
    let temp = (this.angleDifference + random(-2, 2))
    this.angleDifference = (temp < -15 || temp > 15) ? 0 : temp;
    this.angle = (this.angle + this.angleDifference) % 360;
    
    let deltaPosition = doTrig(this.angle, amount);
    this.x += deltaPosition.x;
    this.y += deltaPosition.y;
  }
}

let streaks = new Set();

function preload() {
  colorMode(RGB);
  let startColor = color(random(255), random(255), random(255));
  for (let i = 0; i < totalStreaks; i++) {
    let diameter = random(10, 50);
    
    streaks.add(new BaseStreak(streak => {
      fill(streak.colour);
      circle(streak.x, streak.y, streak.size);
    }, startColor, diameter));
  }
}

function setup() {
  createCanvas(screenWidth, screenHeight);
  noStroke();
  background(0);
}

function draw() {
  background(0);
  streaks.forEach((streak) => {
    streak.move(2);
    streak.func(streak);

    // if they are outside of the screen, destroy them and create a new one
    if (streak.x < 0 || streak.x > screenWidth || streak.y < 0 || streak.y > screenHeight) {
      streaks.delete(streak);
      // delete one streak, but clone another one
      // first get random streak
      let toBeCopied = Array.from(streaks)[Math.floor(random(streaks.size))];
      // now copy it but modify it slightly
      // first copy the color
      let newColor = toBeCopied.colour;
      newColor.setRed(max((red(newColor) + Math.floor(random(-5, 15))) % 255), 50);
      newColor.setGreen(max((green(newColor) + Math.floor(random(-5, 15))) % 255), 50);
      newColor.setBlue(max((blue(newColor) + Math.floor(random(-5, 15))) % 255), 50);
      streaks.add(new BaseStreak((e) => {
        fill(e.colour);
        circle(e.x, e.y, e.size);
      }, newColor, (toBeCopied.size + random(-15, -10)) % 50 + 15),
                  x=toBeCopied.x, y=toBeCopied.y, angle=toBeCopied.angle);
    }
  });
}
