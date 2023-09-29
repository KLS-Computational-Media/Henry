let img, cvsWidth = 400, cvsHeight = 400, imgWidth = 200, imgHeight = 200;
let leftmost = (cvsWidth - imgWidth) / 4, rightmost = (cvsWidth - imgWidth) * 3/4, upmost = (cvsHeight - imgHeight) / 4, bottommost = (cvsHeight - imgHeight) * 3/4; // this will determine where the image is drawn, in map(...)
let backgroundImage, middleImage;

function preload() {
  img = loadImage("lildroptop.png");
  backgroundImage = loadImage("lildroptop-toilet.webp");
  middleImage = loadImage("lildroptop.png");
}

function setup() {
  createCanvas(cvsWidth, cvsHeight);
  img.resize(imgWidth, imgHeight);
  middleImage.resize(imgWidth*1.5, imgHeight*1.5);
  backgroundImage.resize(cvsWidth, cvsHeight);
}

function draw() {
  image(backgroundImage, 0, 0);
  let baseX = map(mouseX, 0, cvsWidth, leftmost, rightmost), baseY = map(mouseY, 0, cvsHeight, upmost, bottommost); // this will be where the middle of the 4 corners is going to be drawn.
  
  // there will be 5 lil droptops
  // no forloop unless this gets difficult
  image(img, baseX + cvsWidth / 2, baseY + cvsHeight / 2);
  image(img, baseX - cvsWidth / 2, baseY - cvsHeight / 2);
  image(img, baseX + cvsWidth / 2, baseY - cvsHeight / 2);
  image(img, baseX - cvsWidth / 2, baseY + cvsHeight / 2);
  
  // the middle one will be flipped for more immersive effect.
  image(middleImage, map(baseX, leftmost, rightmost, rightmost, leftmost), map(baseY, upmost, bottommost, bottommost, upmost));
  
}
