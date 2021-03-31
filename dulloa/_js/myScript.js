alert("hello")

function drawTriangle() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    console.log("")
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}

function drawSquare (){
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    console.log("this thing evaluated to true...")
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(75, 75);
    ctx.fill();
}
}

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

function draw(){
    drawTriangle();
    drawSquare();
    drawCircle();
}


function randomNumber(max){
  return Math.floor(Math.random() * Math.floor(max));
}

console.log (randomNumber(3))

let fruit = ["bananas", "apples", "oranges"]
console.log(fruit);
console.log(fruit[1]);
console.log(fruit[2]);
console.log(fruit[3]);

let cpu = ["rock", "paper", "scissors"];

let cpuChoice = Math.floor(Math.random()*cpu.length);

console.log(cpu[cpuChoice]);