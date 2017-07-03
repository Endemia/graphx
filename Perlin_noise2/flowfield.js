var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


/*** FPS CALCULATION ***/
var lastCalledTime;
var counter = 0;
var fpsArray = [];
/*** FPS CALCULATION ***/


var perlin = new Perlin();
perlin.noiseSeed();

var inc = 0.1;
var scale = 10;

var rows = Math.floor(canvas.width / scale);
var cols = Math.floor(canvas.height / scale);

var z_perlin = 0;

var particles = [];

for (var i = 0; i < 10000; i++) {
	particles[i] = new Particle();
}

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var draw = function() {

	window.requestAnimationFrame(draw);

	var flowfield = [];
	
	var y_perlin = 0;
	for (var y = 0; y < rows; y++) {
		var x_perlin = 0;
        for (var x = 0; x < cols; x++) {

        	var angle = perlin.noise(x_perlin, y_perlin, z_perlin) * Math.PI * 2;

        	var v = new Vector();
            v.setDirection(angle);
        	v.setMagnitude(1);

        	flowfield.push(v)

        	x_perlin += inc;
        }
        y_perlin += inc;
    }
    z_perlin += (inc / 20);

    for (var i = 0; i < particles.length; i++) {
    	particles[i].edges();
    	particles[i].follow(flowfield);
		particles[i].update();
		particles[i].show();
	}


    /*** FPS CALCULATION ***/
    var fps;
    if (!lastCalledTime) {
        lastCalledTime = new Date().getTime();
        fps = 0;
    }

    var delta = (new Date().getTime() - lastCalledTime) / 1000;
    lastCalledTime = new Date().getTime();
    fps = Math.ceil((1/delta));

    if (counter >= 60) {
        var sum = fpsArray.reduce(function(a,b) { return a + b });
        var average = Math.ceil(sum / fpsArray.length);
        document.getElementById('fps').value = average;
        counter = 0;
    } else {
        if (fps !== Infinity) {
            fpsArray.push(fps);
        }

        counter++;
    }
    /*** FPS CALCULATION ***/

}

draw();