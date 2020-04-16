/**
 * boolean
 */
let isDone: boolean = false

/**
 * decimal & hex-number & binary & octal
 */
let decLiteral: number = 20
let hexLiteral: number = 0x18
let binLiteral: number = 0b10100
let octalLiter: number = 0o24

/**
 * strings
 */
let myName: string = 'joe'
let age: number = 30
let speak = `hello, ${myName} ,I am  ${age} years old. \n\n, I\'d like to ask your out.`
console.log(speak)
/**
 * array
 */
let list: number[] = [ 1, 2, 3 ]
// or
let secList: Array<number> = [ 1, 2, 3, 4 ]

/**
 * tuple:
 * 1. an array that already know it type and length
 * 2. each element can be different
 */
let x: [string, number]
x = [ 'this tuple is string and number and can only have 2 element', 10 ]
console.log(x[0].substr(1))
// when access the out of the tuple is ok
// type can not be assign to something that is not string or number
console.log(x.toString())

/**
 * enum: has a start index which can be changed.
 */
enum Color {
	Red,
	Green,
	Blue
}

let c: Color = Color.Blue
console.log(Color)
