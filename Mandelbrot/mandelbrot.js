var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var map = function(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};

var hslToRgb = function(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}

var inc = 0.1;

var draw = function() {

	var maxiterations = 200;

	var pixels = ctx.createImageData(canvas.width, canvas.height);

	for (var x = 0; x < canvas.width; x++) {
		for (var y = 0; y < canvas.height; y++) {

			var a = map(x, 0, canvas.width, -2, 1);
			var b = map(y, 0, canvas.height, -1.5, 1.5);

			var ca = a;
			var cb = b;

			var n = 0;
			var z = 0;

			while (n < maxiterations) {
				var aa = a * a - b * b;
				var bb = 2 * a * b;
				a = aa + ca;
				b = bb + cb;

				if (a + b > 20) {
					break;
				}

				n++;
			}

			var index = (x + y * canvas.width) * 4;
			
			var rgb;
			if (n < maxiterations && n > 12) {
				var hue = map(n, 12, maxiterations, 0, 1);
				rgb = hslToRgb(hue, 1, 0.5);
			} else {
				rgb = [0, 0, 0];
			}
			
			pixels.data[index + 0] = rgb[0];
            pixels.data[index + 1] = rgb[1];
            pixels.data[index + 2] = rgb[2];
            pixels.data[index + 3] = 255;

			/*
			var bright = map(n, 0, maxiterations, 0, 255);
			if (n === maxiterations) {
				bright = 0;
			}

			pixels.data[index + 0] = bright;
            pixels.data[index + 1] = bright;
            pixels.data[index + 2] = bright;
            pixels.data[index + 3] = 255;
            */

		}
	}

    ctx.putImageData(pixels, 0, 0);
	
    //window.requestAnimationFrame(draw);
}

draw();