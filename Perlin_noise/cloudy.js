var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var perlin = new Perlin();

perlin.noiseSeed();

var inc = 0.01;

var draw = function() {

	var pixels = ctx.createImageData(canvas.width, canvas.height);

	var y_perlin = 0;

	for (var y = 0; y < canvas.height; y++) {

		var x_perlin = 0;

    	for (var x = 0; x < canvas.width; x++) {
      		var index = (x + y * canvas.width) * 4;

      		var value = perlin.noise(x_perlin, y_perlin) * 255;


      		pixels.data[index + 0] = value;
      		pixels.data[index + 1] = value;
      		pixels.data[index + 2] = value;
      		pixels.data[index + 3] = 255;

      		x_perlin += inc;
      	}

      	y_perlin += inc;
    }

    ctx.putImageData(pixels, 0, 0);
}

draw();