var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var n2 = 0;
var c2 = 4;
var offseta = 0;

var radians = function(degrees) {
  return degrees * Math.PI / 180;
};

var draw2 = function() {

	window.requestAnimationFrame(draw2);

	ctx2.fillStyle = "black";
	ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

	for (var i = 0; i <= n2; i++) {
		var a = i * radians(137.5) - offseta;
		var r = c2 * Math.sqrt(i);
    	var x = r * Math.cos(a) + canvas2.width/2;
    	var y = r * Math.sin(a)  + canvas2.height/2;

    	var hue = i / c2 + (offseta*100);
    	//var hue= (a-r)% 255;

    	ctx2.beginPath();
    	ctx2.arc(x, y, 4, 0, 2 * Math.PI, false);

    	ctx2.fillStyle = 'hsl(' + hue + ',100%, 50%)';

    	ctx2.fill();
		ctx2.stroke();
		ctx2.closePath();
	}

	n2++;

	offseta += Math.PI/360;
}

draw2();
