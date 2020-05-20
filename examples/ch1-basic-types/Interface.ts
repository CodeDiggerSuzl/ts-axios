/**
 * TypeScript 的核心原则之一是对值所具有的结构进行类型检查。它有时被称做“鸭式辨型法”或“结构性子类型化”。
 *
 * 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
 */
function printLabel(labelledObject: { label: string }) {
	console.log(labelledObject.label)
}
let myObj = { size: 100, label: 'size 100 Object' }
printLabel(myObj)

// interface way
interface LabelledValue {
	label: string
}
/*LabelledValue 接口就好比一个名字，用来描述上面例子里的结构。
 * 它代表了有一个 label 属性且类型为string 的对象。
 * 需要注意的是，我们在这里并不能像在其它语言里一样，说传给 printLabel 的对象实现了这个接口。
 * 我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
 * 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
 */

function printIn(labelledObject: LabelledValue) {
	console.log(labelledObject.label)
}
printIn(myObj)

/**
 * 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。
 * 例如给函数传入的参数对象中只有部分属性赋值了。
 */
interface Square {
	color: string
	area: number
}
interface SquareConf {
	color?: string
	width?: number
}
/**
 * 一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly 来指定只读属性
 */
interface Point {
	readonly x: string
	readonly y: string
}

/**
 * TypeScript 具有 ReadonlyArray<T> 类型，它与 Array<T> 相似，
 * 只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
 */
let nar: number[] = [ 1, 3, 4, 5 ]
let ro: ReadonlyArray<number> = nar
/**
 * 上面代码的最后一行，可以看到就算把整个 ReadonlyArray 赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
 */
nar = ro as number[]

/**
 * 最简单判断该用 readonly 还是 const 的方法是看要把它做为变量使用还是做为一个属性。
 * 做为变量使用的话用 const，若做为属性则使用 readonly。
 */
function createSquare(config: SquareConf): { color: string; area: number } {
	let newSquare = { color: 'white', area: 100 }
	if (config.color) {
		newSquare.color = config.color
	}
	if (config.width) {
		newSquare.area = config.width * config.width
	}
	return newSquare
}
// let mySquare = createSquare({ colour: 'red', width: 100 })
// up is wrong
/*绕开这些检查非常简单。 最简便的方法是使用类型断言：*/
// let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConf)

/**
 *然而，最佳的方式是能够添加一个字符串索引签名，
 前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。
 如果 SquareConfig 带有上面定义的类型的 color 和 width 属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：
*/

interface SquareConf2 {
	color?: string
	width?: number
	[propName: string]: any
}

/**
 * 还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，
 * 它就是将这个对象赋值给一个另一个变量： 因为 squareOptions 不会经过额外属性检查，所以编译器不会报错。
 */
let squareOptions = { colour: 'red', width: 100 }
let mySquare = createSquare(squareOptions)

// * 函数类型
/**
 * 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。
 * 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
 */
interface SearchFunc {
	(source: string, subString: string): boolean
}

// 展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
let mySearch: SearchFunc
mySearch = function(source: string, subString: string): boolean {
	let result = source.search(subString)
	return result > -1
}
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
// 比如，我们使用下面的代码重写上面的例子：
let mySearch2: SearchFunc

mySearch = function(src: string, sub: string): boolean {
	return src.search(sub) > -1
}

interface ClockConstructor {
	new (hour: number, minute: number): ClockInterface
}
interface ClockInterface {
	tick()
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
	return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
	constructor(h: number, m: number) {}
	tick() {
		console.log('beep beep')
	}
}
class AnalogClock implements ClockInterface {
	constructor(h: number, m: number) {}
	tick() {
		console.log('tick tock')
	}
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)
