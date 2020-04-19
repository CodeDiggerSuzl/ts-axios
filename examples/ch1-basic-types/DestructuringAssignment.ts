let input: [number, number] = [ 1, 2 ]
function f([ first, second ]: [number, number]) {
	console.log(first)
	console.log(second)
}
f(input)

let [ first, ...rest ] = [ 1, 2, 3, 4 ]
console.log(first)
console.log(rest)

// * object assignment
let o = {
	a: 'foo',
	b: 12,
	c: 'bar'
}
// let { a, b } = o
let { a, ...res } = o
let total = res.b + res.c.length
console.error('total', total)

// 现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值
function keepWholeObject(wholeObject: { a: string; b?: number }) {
	let { a, b = 1001 } = wholeObject
}

type C = { a: string; b?: number }
function f({ a, b }: C): void {}
