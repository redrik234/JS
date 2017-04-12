function Circle(radius, centerX, centerY) {
    this.radius = radius;
    this.centerX = centerX;
    this.centerY = centerY;
}

Circle.prototype = Object.create(Shape.prototype);

Circle.prototype.calculatePerimeter = function() {
    return Math.round(2 * Math.PI * this.radius);
};

Circle.prototype.calculateArea = function() {
    return Math.round(2 * Math.PI * this.radius * this.radius);
};

Circle.prototype.propertyChanges = function(radius, centerX, centerY, fillColor, borderColor) {
    this.radius = radius;
    this.centerX = centerX;
    this.centerY = centerY;

    this.fillColor = fillColor;
    this.borderColor = borderColor;
};

Circle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.borderColor;
    ctx.stroke();
    ctx.closePath();
};