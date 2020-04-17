/* 1. basic type */
/**
 * boolean
 */
var isDone = false
/**
 * decimal & hex-number & binary & octal
 */
var decLiteral = 20
var hexLiteral = 0x18
var binLiteral = 20
var octalLiter = 20
/**
 * strings
 */
var myName = 'joe'
var age = 30
var speak = 'hello, ' + myName + ' ,I am  ' + age + " years old. \n\n, I'd like to ask your out."
console.log(speak)
/**
 * array
 */
var list = [ 1, 2, 3 ]
// or
var secList = [ 1, 2, 3, 4 ]
/**
 * tuple:
 * 1. an array that already know it type and length
 * 2. each element can be different
 */
var x
x = [ 'this tuple is string and number and can only have 2 element', 10 ]
console.log(x[0].substr(1))
// when access the out of the tuple is ok
// type can not be assign to something that is not string or number
console.log(x.toString())
/**
 * enum: has a start index which can be changed.
 */
var Color
;(function(Color) {
	Color[(Color['Red'] = 1)] = 'Red'
	Color[(Color['Green'] = 2)] = 'Green'
	Color[(Color['Blue'] = 3)] = 'Blue'
})(Color || (Color = {}))
var c = Color.Blue
var colorName = Color[2]
console.log(colorName)
console.log(Color)
// any type: good but use less
// will not check the data type and basic gram
var notSure = 'Now I am a string'
// let notSure = 'Now I am a string'
console.log(notSure)
// void return nothing
// declare a void makes no sense
function alertSomething() {
	console.log(1.0 - 3)
}
// undefined and null
// undefined an be assigned to null, cause undefined is the son type of null
// let num: number | null = 20
var num = null
console.log(num)
// never mean data will never happen, all type's son data type
function error(message) {
	throw new Error(message)
}
function fail() {
	return error('sometimes failed')
}
create({ prop: 0 })
create(null)
console.log(create)
