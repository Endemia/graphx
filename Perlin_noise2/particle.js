var Particle = function() {

	this.pos = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
	this.vel = new Vector(Math.random(), Math.random());
	this.acc = new Vector(0, 0);
	this.maxSpeed = 2;

	this.prevpos = this.pos.copy();

	this.update = function() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.show = function() {
		ctx.strokeStyle = 'rgba(50, 0, 0, 0.005)';
		ctx.beginPath();
		ctx.moveTo(this.pos.x, this.pos.y);
		ctx.lineTo(this.prevpos.x, this.prevpos.y);
		ctx.stroke();
		ctx.closePath();

		this.prevpos = this.pos.copy();
	}

	this.follow = function(flowfield) {
		var x = Math.floor(this.pos.x / scale);
		var y = Math.floor(this.pos.y / scale);
		var index = x + y * cols;
		var force = flowfield[index];
		this.applyForce(force);
	}

	this.edges = function() {
		if (this.pos.x > canvas.width) {
			this.pos.x = 0;
			this.prevpos = this.pos.copy();
		}
		if (this.pos.x < 0) {
			this.pos.x = canvas.width - 1;
			this.prevpos = this.pos.copy();
		}
		if (this.pos.y > canvas.height) {
			this.pos.y = 0;
			this.prevpos = this.pos.copy();
		}
		if (this.pos.y < 0) {
			this.pos.y = canvas.height - 1;
			this.prevpos = this.pos.copy();
		}
	}
}