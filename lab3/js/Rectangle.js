function Rectangle(X1, Y1, X2, Y2) {
    this.X1 = X1;
    this.Y1 = Y1;
    this.X2 = X2;
    this.Y2 = Y2;
}

Rectangle.prototype = Object.create(Shape.prototype);

Rectangle.prototype.propertyChanges = function(X1, Y1, X2, Y2, fillColor, borderColor) {
    this.X1 = X1;
    this.Y1 = Y1;
    this.X2 = X2;
    this.Y2 = Y2;
    this.fillColor = fillColor;
    this.borderColor = borderColor;
};

Rectangle.prototype.calculatePerimeter = function() {
    return Math.round(2 * (Math.abs(this.X2 - this.X1) + Math.abs(this.Y2 - this.Y1)));
};

Rectangle.prototype.calculateArea = function() {
    return Math.round(Math.abs(this.X2 - this.X1) * Math.abs(this.Y2 - this.Y1));
};

Rectangle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(this.X1, this.Y1, this.X2, this.Y2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.borderColor;
    ctx.rect(this.X1, this.Y1, this.X2, this.Y2);
    ctx.stroke();
};