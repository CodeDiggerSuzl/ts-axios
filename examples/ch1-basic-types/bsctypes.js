/**
 * boolean
 */
var isDone = false;
/**
 * decimal & hex-number & binary & octal
 */
var decLiteral = 20;
var hexLiteral = 0x18;
var binLiteral = 20;
var octalLiter = 20;
/**
 * strings
 */
var myName = 'joe';
var age = 30;
var speak = "hello, " + myName + " ,I am  " + age + " years old. \n\n, I'd like to ask your out.";
console.log(speak);
/**
 * array
 */
var list = [1, 2, 3];
// or
var secList = [1, 2, 3, 4];
/**
 * tuple:
 * 1. an array that already know it type and length
 * 2. each element can be different
 */
var x;
x = ['this tuple is string and number and can only have 2 element', 10];
console.log(x[0].substr(1));
// when access the out of the tuple is ok
// type can not be assign to something that is not string or number
console.log(x.toString());
/**
 * enum: has a start index which can be changed.
 */
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;
console.log(Color);
