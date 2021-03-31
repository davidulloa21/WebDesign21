let canvasDiv;
let canvas;
let ctx;
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

function spawnMob(x, arr){
  for (i = 0; i < x; i++){
    arr.push(new Mob(10,10,10, 10, 'pink', Math.random()*-2, Math.random()*-2));
  }
  }
function drawText(color, font, align, base, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = base;
  ctx.fillText(text, x, y);
}
function init() {
    
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
  
 /* function countUp(end) {
    timerNow = Math.floor(Date.now() / 1000);
    currentTimer = timerNow - timerThen;
    if (currentTimer >= end){
      if (mobs2.length < 10){
      spawnMob(1, mobs2);
    }
      return end;
    }
    return currentTimer;
  }
  
  function counter() {
    timerNow = Math.floor(Date.now() / 1000);
    currentTimer = timerNow - timerThen;
    return currentTimer;
  }
  
  function timerUp(x, y) {
    timerNow = Math.floor(Date.now() / 1000);
    currentTimer = timerNow - timerThen;
    if (currentTimer <= y && typeof (currentTimer + x) != "undefined") {
        return currentTimer;
    } else {
        timerThen = timerNow;
        return x;
    }
  }
  
  function timerDown() {
    this.time = function (x, y) {
        // this.timerThen = Math.floor(Date.now() / 1000);
        // this.timerNow = Math.floor(Date.now() / 1000);
        this.timerThen = timerThen;
        this.timerNow = Math.floor(Date.now() / 1000);
        this.tick = this.timerNow - this.timerThen;
        if (this.tick <= y && typeof (this.tick + x) != "undefined") {
            return y - this.tick;
        } else {
            this.timerThen = this.timerNow;
            return x;
        }
    };
  }
  */
  class Sprite {
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
  
  class Player extends Sprite {
    constructor(w, h, x, y, c, vx, vy) {
    super(w, h, x, y, c);
    this.vx = vx;
    this.vy = vy;
    this.speed = 3;
    this.canjump = true;
    }
    moveinput() {
      if ('a' in keysDown || 'A' in keysDown) { // Player control
          this.vy = 0;
          this.vx = -this.speed;
      } else if ('d' in keysDown || 'D' in keysDown) { // Player control
          this.vy = 0;
          this.vx = this.speed;
      }
      else{
        this.vx = 0;
        this.vy = 0;
      }
  }
    update(){
      this.moveinput();
      if (!this.inbounds()){
        if (this.x <= 0) {
          this.x = 0;
        }
        if (this.x + this.w >= WIDTH) {
          this.x = WIDTH-this.w;
        }
        if (this.y+this.h >= HEIGHT) {
          this.y = HEIGHT-this.h;
          this.canjump = true;
        }
        // alert('out of bounds');
        // console.log('out of bounds');
      }
      
      this.x += this.vx;
      this.y += this.vy;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
  }
  
  class Mob extends Sprite {
    constructor(w, h, x, y, c, vx, vy) {
      super(w, h, x, y, c);
      this.vx = vx;
      this.vy = vy;
      this.type = "normal";
      }
      update(){
        this.x += this.vx;
        this.y += this.vy;
        if (!this.inbounds()){
          if (this.x < 0 || this.x > WIDTH) {
            this.vx *= -1;
          }
          if (this.y < 0 || this.y > HEIGHT) {
            this.vy *= -1;
          }
          // alert('out of bounds');
          // console.log('out of bounds');
        }
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);
      }
  }
  
  class Wall extends Sprite {
    constructor(w, h, x, y, c) {
      super(w, h, x, y, c);
      this.type = "normal";
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);
      }
  }
  
  // ###################### INSTANTIATE CLASSES ##########################
  let player = new Player(200, 10, WIDTH/2, 700, 'red', 0, 0);
  
  // adds two different sets of mobs to the mobs array
  //for (i = 0; i < 10; i++){
  //  mobs1.push(new Mob(60,60, 200, 100, 'pink', Math.random()*-2, Math.random()*-2));
  //}
  for (x=0; x < 100; x++){
    for(y=0; y < 10; y++){
          walls.push(new Wall(10, 10, 10*x, 10*y, 'orange'));
    }
}
  // ########################## USER INPUT ###############################
  
  let keysDown = {};
  
  addEventListener("keydown", function (e) {
      keysDown[e.key] = true;
  }, false);
  
  addEventListener("keyup", function (e) {
      delete keysDown[e.key];
  }, false);
  
  
  
 
  // ########## UPDATE ALL ELEMENTS ON CANVAS ################################
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
  }
  
  // ########## DRAW ALL ELEMENTS ON CANVAS ##########
  function draw() {
    // clears the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawText('black', "24px Helvetica", "left", "top", "Points: " + POINTS, 0, 0);
    player.draw();
  
    for (let w of walls){
      w.draw();
    }
    for (let m of mobs1){
      m.draw();
    }
   
  }
  
  
  // set variables necessary for game loop
  let fps;
  let now;
  let delta;
  let gDelta;
  let then = performance.now();
  
  // ########## MAIN GAME LOOP ##########
  function main() {
    now = performance.now();
    delta = now - then;
    gDelta = (Math.min(delta, 17));
    fps = Math.ceil(1000 / gDelta);
    if (initialized) {
      if (!paused){
        update(gDelta);
      }
      draw();
    }
    then = now;
    requestAnimationFrame(main);
  }