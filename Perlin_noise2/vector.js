var Vector = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
};

Vector.prototype.add = function(v2) {
  this.x += v2.x;
  this.y += v2.y;
  return this;
};

Vector.prototype.sub = function(v2) {
  this.x -= v2.x;
  this.y -= v2.y;
  return this;
};

Vector.prototype.div = function (n) {
  this.x /= n;
  this.y /= n;
  return this;
};

Vector.prototype.mult = function (n) {
  this.x *= n || 0;
  this.y *= n || 0;
  return this;
};

Vector.prototype.getDirection = function() {
	return Math.atan2(this.y, this.x);
};

Vector.prototype.setDirection = function(direction) {
  this.x = Math.cos(direction);
  this.y = Math.sin(direction);
};

Vector.prototype.getMagnitude = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.setMagnitude = function(n) {
  return this.normalize().mult(n);
};

Vector.prototype.normalize = function() {
  if (this.getMagnitude() !== 0) {
    this.div(this.getMagnitude());
  }
  return this;
}

Vector.prototype.limit = function(n) {
  if(this.getMagnitude() > n) {
    this.normalize();
    this.mult(n);
  }
  return this;
}

Vector.prototype.copy = function() {
  return new Vector(this.x, this.y);
};
