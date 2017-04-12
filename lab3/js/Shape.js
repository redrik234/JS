function Shape(fillColor, borderColor) {
    this.fillColor = fillColor;
    this.borderColor = borderColor;
}

Shape.prototype.setFillColor = function(fillColor) {
    this.fillColor = fillColor;
};

Shape.prototype.setBorderColor = function(borderColor) {
    this.borderColor = borderColor;
};

Shape.prototype.getBorderColor = function() {
    return this.borderColor;
};

Shape.prototype.getFillColor = function() {
    return this.fillColor;
};

Shape.prototype.draw = function ()
{
};

Shape.prototype.calculateArea = function ()
{
};

Shape.prototype.calculatePerimeter = function ()
{
};