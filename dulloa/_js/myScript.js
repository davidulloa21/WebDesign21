
//alert("hello world")

const myNum= 6;
const myName= "David"
alert(myName);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);

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

function main(){
    drawTriangle();
    drawSquare();
    drawCircle();
}