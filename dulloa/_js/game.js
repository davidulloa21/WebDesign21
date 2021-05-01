//When writing this code, I refered from info in class and your code and also recieved some help from a friend.
//settings for the bricks rows columns and width and height.
var rows = 13;
var columns = 3;
var bwidth = 100;
var bheight = 30;
var brickPadding = 10;
//distance right and left from the borders
var brickright = 30;
var brickleft = 30;
//variables used during the game
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//descriptions for the ball radius and height in the game
var radius = 20;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 10;
var dy = -10;
//height and width for the paddle used by the user
var pheight = 20;
var pwidth = 300;
var paddle = (canvas.width-pwidth)/2;
var keydownpaddle = false;
var keydownpaddle2 = false;
//variables for the score and the lives the player has.
var score = 0;
var lives = 1;
//explains the rows and columns that are going to be used
let WIDTH = 1470;
let HEIGHT= 720;
let GRAVITY = 9.8;
let POINTS = 0;
let paused = false;
let timerThen = Math.floor(Date.now() / 1000);
let walls = [];
let mobs1 = [];
let mobs2 = [];
let initialized = false;
let mouseX = 0;
let mouseY = 0;
let mouseClickX = 0;
let mouseClickY = 0;
var bricks = []
;
for(var c=0; c<columns; c++) {
  bricks[c] = [];

  for(var r=0; r<rows; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
/* function init() {
    
  canvasDiv = document.createElement("div");
  canvasDiv.id = "chuck";
  canvas = document.createElement('canvas');
  // add the text node to the newly created div
  canvasDiv.appendChild(canvas);
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(canvasDiv, currentDiv);
  canvas.width = 1470;
  canvas.height = 720;
  document.getElementById("chuck").style.width = canvas.width + 'px';
  document.getElementById("chuck").style.height = canvas.height + 'px';
  ctx = canvas.getContext('2d');
  initialized = true;
} 
*/
//functions draws and performs all the functions used for the game.
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spawnBricks();
  drawScore();
  hearts();
  collisions();
  ball();
  userPaddle();



  //explains how the user would lose in the game.
  if(x + dx > canvas.width-radius || x + dx < radius) {
    dx = -dx;
  }

  if(y + dy < radius) {
    dy = -dy;
  }

  //explains how the user loses if the ball goes past the paddle
  else if(y + dy > canvas.height-radius) {
    if(x > paddle && x < paddle + pwidth) {
      dy = -dy;
    }

    //sends out a game over message to the user
    else {
      lives--;
      if(!lives) {
        //only alerts if the lives have run out
        alert("Game Over");
        document.location.reload();
      }

      //if lives have not run out yet, this is used to restart the game.
      else {
        paddle = (canvas.width-pwidth)/2;
        //resets the paddle onto the board
        y = canvas.height-28;
        dx = 2;
        dy = -2;
        x = canvas.width/2;
        
      }
    }
  }
//sets paddle back in its place for a new live
  if(keydownpaddle && paddle < canvas.width-pwidth) {
    paddle += 6;
  }
  else if(keydownpaddle2 && paddle > 0) {
    paddle -= 6;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}
//function to create the ball with the radius and color.
function ball() {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*4);
  ctx.fillStyle = "#DDDDDD";
  ctx.fill();
  ctx.closePath();
}
/* class Sprite {
    constructor(w, h, x, y, c) {
      this.w = w;
      this.h = h;
      this.x = x;
      this.y = y;
      this.color = c;
      this.spliced = false;
      }
      inbounds(){
        if (this.x + this.w < WIDTH &&
            this.x > 0 &&
            this.y > 0 &&
            this.y + this.h < HEIGHT){
              console.log ('inbounds..');
          return true;
        }
        else{
          return false;
        }
      }
      collide(obj) {
        if (this.x <= obj.x + obj.w &&
          obj.x <= this.x + this.w &&
          this.y <= obj.y + obj.h &&
          obj.y <= this.y + this.h
        ) {
          return true;
        }
      }
  }
  */

  /*
  function update() {
    player.update();
    //updates all mobs in a group
    for (let w of walls){
      console.log(w);
      if (player.collide(w)){
        console.log(w);
      }
    }
    for (let m of mobs1){
      m.update();
      if (player.collide(m)){
        m.spliced = true;
      }
    }
    for (let m in mobs1){
      if (mobs1[m].spliced){
        mobs1.splice(m, 1);
      }
    }
  } */
//allows the user to control the paddle with the right and left arrow keys
function keyDown(e) {
    //explains what happens if keybinds are pressed down upon
    if(e.key == "Right" || e.key == "ArrowRight") {
        keydownpaddle = true;
    }
    //left side
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        keydownpaddle2 = true;
    }
}

function keyUp(e) {
  //explains what happens if keybinds are released
    if(e.key == "Right" || e.key == "ArrowRight") {
        keydownpaddle = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        keydownpaddle2 = false;
    }
}

//THIS IS WHAT I ADDED
//I made this using one of my friends help in which it allows you to control the paddle with your mouses movements.
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;

  //allows the paddle to follow mouse movements
  if(relativeX > 0 && relativeX < canvas.width) {
    paddle = relativeX - pwidth/2;
  }
}

//function for when the ball collides into the bricks in the game

function collisions() {
  for(var c=0; c<columns; c++) {
    //says if the ball hits a brick to break and bounce
    //also explains how you win by removing all blocks
    for(var r=0; r<rows; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        //bricks being removed
        if(x > b.x && x < b.x+bwidth && y > b.y && y < b.y+bheight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == rows*columns) {
            //alerts what happens if all blocks disappear
            alert("You Won");
            //reloads the game
            document.location.reload();
          }
        }
      }
    }
  }
}

//function for the lives including font and color
function hearts() {
  ctx.font = "20px Times New Roman";
  //number of lives and location of the lives tab
  ctx.fillText("Lives: "+lives, 8, 20);
  ctx.fillStyle = "FF0000";
}

//function to draw paddle which goes to the variables above
function userPaddle() {
  ctx.beginPath();
  ctx.rect(paddle, canvas.height-pheight
  , pwidth, pheight
  );
  ctx.fillStyle = "#FFFF96";
  ctx.fill();
  ctx.closePath();
}
document.addEventListener("keydown", keyDown, false);
//function for the bricks which go to the variables above
function spawnBricks() {
  //inticates columns in the bricks
  for(var c=0; c<columns; c++) {
    //shows the amount of rows
    for(var r=0; r<rows; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(bwidth+brickPadding))+brickleft;
        var brickY = (c*(bheight+brickPadding))+brickright;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        //color and shape of brick
        ctx.beginPath();
        ctx.rect(brickX, brickY, bwidth, bheight);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}


//function for the score in the game with the font and size.
function drawScore() {
  ctx.font = "30px Times New Roman";
//score and font
  ctx.fillText("Score: "+score, canvas.width-200, 20);
  ctx.fillStyle = "#FF0000";
}




//says how the keybind of the arrows will be if presse

document.addEventListener("keyup", keyUp, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
draw();


function drawCircle(){
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    console.log("this thing evaluated to true...")
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(50, 50, 25, 0, 2 * Math.PI);
    ctx.moveTo(75, 50);
    ctx.stroke();
    ctx.fill();
}
}