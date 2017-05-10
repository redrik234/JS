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
function Triangle(X1, Y1, X2, Y2, X3, Y3) {
    this.X1 = X1;
    this.Y1 = Y1;
    this.X2 = X2;
    this.Y2 = Y2;
    this.X3 = X3;
    this.Y3 = Y3;
}

Triangle.prototype = Object.create(Shape.prototype);

Triangle.prototype.calculatePerimeter = function() {
    return Math.round(
        Math.sqrt(Math.pow(this.X2 - this.X1, 2) + Math.pow(this.X2 - this.X1, 2)) +
        Math.sqrt(Math.pow(this.X2 - this.X1, 2) + Math.pow(this.X2 - this.X1, 2)) +
        Math.sqrt(Math.pow(this.X2 - this.X1, 2) + Math.pow(this.X2 - this.X1, 2)));
};

Triangle.prototype.calculateArea = function() {
    return Math.round(0.5 * Math.abs((this.X1 - this.X3) * (this.Y2 - this.Y3) + (this.X2 - this.X3) * (this.Y1 - this.Y3)));
};


Triangle.prototype.propertyChanges = function(X1, Y1, X2, Y2, X3, Y3, fillColor, borderColor) {
    this.X1 = X1;
    this.Y1 = Y1;
    this.X2 = X2;
    this.Y2 = Y2;
    this.X3 = X3;
    this.Y3 = Y3;
    this.fillColor = fillColor;
    this.borderColor = borderColor;
};


Triangle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.moveTo(this.X1, this.Y1);
    ctx.lineTo(this.X2, this.Y2);
    ctx.lineTo(this.X3, this.Y3);
    ctx.lineTo(this.X1, this.Y1);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.borderColor;
    ctx.stroke();
    ctx.closePath();
};
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
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var currentShape = document.getElementById("shapes");

var circle = new Circle();
var triangle = new Triangle();
var rectangle = new Rectangle();

console.log("123")

function GetTypeOfShape(currentShape)
{
    var shape;
    switch(currentShape.value)
    {
    case "circle":
        shape = circle;
        document.getElementById("circleProperties").style.display="block";
        document.getElementById("triangleProperties").style.display="none";
        document.getElementById("rectangleProperties").style.display="none";
        break;
    case "triangle":
        shape = triangle;
        document.getElementById("circleProperties").style.display="none";
        document.getElementById("triangleProperties").style.display="block";
        document.getElementById("rectangleProperties").style.display="none";
        break;
    case "rectangle":
        shape =  rectangle;
        document.getElementById("circleProperties").style.display="none";
        document.getElementById("triangleProperties").style.display="none";
        document.getElementById("rectangleProperties").style.display="block";
        break;
    default:
        document.getElementById("circleProperties").style.display="none";
        document.getElementById("triangleProperties").style.display="none";
        document.getElementById("rectangleProperties").style.display="none";
        break;
    }
    return shape;
}   

function ChooseShape(currentShape, fillColor, borderColor) {
    switch (currentShape) {
    case circle:
        var circleProperties = document.getElementById("circleProperties");
        circleProperties.style.display = "block";
        var cirX = document.getElementById("cirX");
        var cirY = document.getElementById("cirY");
        var cirR = document.getElementById("cirR");
        currentShape.propertyChanges(cirR.value, cirX.value, cirY.value, fillColor.value, borderColor.value);
        break;
    case triangle:
        var triangleProperties = document.getElementById("triangleProperties");
        triangleProperties.style.display = "block";
        var trX1 = document.getElementById("trX1");
        var trY1 = document.getElementById("trY1");
        var trX2 = document.getElementById("trX2");
        var trY2 = document.getElementById("trY2");
        var trX3 = document.getElementById("trX3");
        var trY3 = document.getElementById("trY3");
        currentShape.propertyChanges(trX1.value, trY1.value, trX2.value, trY2.value, trX3.value, trY3.value, fillColor.value, borderColor.value);
        break;
    case rectangle:
        var rectangleProperties = document.getElementById("rectangleProperties");
        rectangleProperties.style.display = "block";
        var rectX1 = document.getElementById("rectX1");
        var rectY1 = document.getElementById("rectY1");
        var rectX2 = document.getElementById("rectX2");
        var rectY2 = document.getElementById("rectY2");
        currentShape.propertyChanges(rectX1.value, rectY1.value, rectX2.value, rectY2.value, fillColor.value, borderColor.value);
        break;
    }
}

function drawing() {
    var fillColor = document.getElementById("fillColor");
    var borderColor = document.getElementById("borderColor");
    var shape = GetTypeOfShape(currentShape);
    ChooseShape(shape, fillColor, borderColor);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (shape != undefined) {
        shape.draw(ctx);
        ctx.fillStyle = "#3f4aaa";
        ctx.font = "bold 18pt Arial";
        ctx.fillText("Площадь: " + shape.calculateArea(), canvas.width / 2 - 100, 40);
        ctx.fillText("Периметр: " + shape.calculatePerimeter(), canvas.width / 2 - 100, 70);
    }
}

setInterval(drawing, 100);