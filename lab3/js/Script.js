var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var currentShape = document.getElementById("shapes");

var circle = new Circle();
var triangle = new Triangle();
var rectangle = new Rectangle();

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
