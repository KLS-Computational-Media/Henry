let arr = [];
let step = 0, framesPerStep = 3, largest = 0, totalSteps = 0, sorted = false;
let iteration = 0;
let screenHeight = 400, screenWidth = 400;

function setup() {
  frameRate(120);
  
  for (let i = 0; i < 50; i++) {
    arr[i] = random(100);
  }
  
  noStroke();
  
  createCanvas(screenHeight, screenWidth);
  background(0);
  fill(255);
  for (let i = 0; i < arr.length; i++) {
    largest = max(largest, arr[i]);
  }
}

function drawArrIndex(index, colorToFill) {
  // first, calculate where it would be
  let centerLocation = screenWidth * index / arr.length;
  let rectHeight = screenHeight / largest * arr[index];
  
  fill(0);
  rect(centerLocation - (screenWidth * 0.4 / arr.length), 0, screenWidth * 0.4 / arr.length, screenHeight);
  fill(colorToFill);
  rect(centerLocation - (screenWidth * 0.4 / arr.length), screenHeight - rectHeight, screenWidth * 0.4 / arr.length, rectHeight);
  
}

function draw() {
  if (sorted) return;
  step++;
  totalSteps++;
  if (step == framesPerStep) {
    step = 0;
    
    iteration++;
    if (iteration == arr.length) iteration = 0;
    
    for (let i = 0; i < arr.length; i++) {
      drawArrIndex(i, "white");
    }
    
    if (arr[iteration] < arr[iteration - 1]) {
      let temp = arr[iteration];
      arr[iteration] = arr[iteration-1];
      arr[iteration-1] = temp;
      
      
      drawArrIndex(iteration, "green");
      drawArrIndex(iteration - 1, "red");
    } else {
      drawArrIndex(iteration, "red");
      drawArrIndex(iteration - 1, "green");
    }
  }
}

function mousePressed() {
  console.log("Mouse coords: " + mouseX + ", " + mouseY);
}
