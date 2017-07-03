var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var n = 0;
var c = 4;

var radians = function(degrees) {
  return degrees * Math.PI / 180;
};


var Point = function(x, y, hue) {
	this.x = x;
	this.y = y;
	this.hue = hue;

	this.draw = function() {
		ctx.beginPath();
    	ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
    	ctx.fillStyle = rgba(0, 0, 0, 0.5);
    	ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var draw = function() {

	window.requestAnimationFrame(draw);

	var a = n * radians(137.5);
	var r = c * Math.sqrt(n);
    var x = r * Math.cos(a) + canvas.width/2;
    var y = r * Math.sin(a)  + canvas.height/2;
    var hue = n / c;

    var newPoint = new Point(x, y , hue);

    newPoint.draw();

    n++;
}

draw();
