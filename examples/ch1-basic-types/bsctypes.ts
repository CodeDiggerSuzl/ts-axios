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
	Red = 1,
	Green,
	Blue
}

let c: Color = Color.Blue
let colorName: string = Color[2]
console.log(colorName)
console.log(Color)

// any type: good but use less
// will not check the data type and basic gram
let notSure: any = 'Now I am a string'

// let notSure = 'Now I am a string'
console.log(notSure)

// void return nothing
// declare a void makes no sense
function alertSomething(): void {
	console.log(1.0 - 3)
}

// undefined and null
// undefined an be assigned to null, cause undefined is the son type of null
// let num: number | null = 20
let num = null
console.log(num)

// never mean data will never happen, all type's son data type
function error(message: string): never {
	throw new Error(message)
}

function fail() {
	return error('sometimes failed')
}

// object
declare function create(o: object | null): void

create({ prop: 0 })

create(null)

console.log(create)

// type assert
let value: any = 'string'
// first way
let strLength = (<string>value).length
// second use ass
let strLength = (value as string).length
