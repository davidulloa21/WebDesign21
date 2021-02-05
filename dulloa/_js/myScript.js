
//alert("hello world")

//alerts the site
const myNum= 6;
const myName= "David"
alert(myName);



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);

//creates function to draw the triangle
function drawTriangle() {
    var canvas = document.getElementById('canvasSquare');
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
  var canvas = document.getElementById('canvasSquare');
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
  var canvas = document.getElementById('canvasSquare');
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

let drawTri = true;
let drawCir = true;
let drawSqu = true;


d = new Date();
function main(){
  if (d < 3){
    drawTriangle();
  }
  else if (d < 4) {
    drawSquare();
  }
  else {
    drawCircle();
  }
}