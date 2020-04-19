function t() {
	var a = 10
	// Closure
	return function g() {
		var b = a + 1
		return b
	}
}

function f(shouldInitialize) {
	if (shouldInitialize) {
		var x = 10
	}
	console.log('-' + x)
	return x
}
console.log(f(true))
console.info(f(false))

/**
 * setTimeout 会在若干毫秒的延时后执行一个函数（**等待其它代码执行完毕**）：10
 * 我们传给 setTimeout 的每一个函数表达式实际上都引用了相同作用域里的同一个 i。
 * setTimeout 在若干毫秒后执行一个函数，并且是在 for 循环结束后。for 循环结束后，i 的值为 10。 所以当函数被调用的时候，它会打印出 10
 */

for (var i = 0; i < 10; i++) {
	setTimeout(function() {
		// log after the for loop ends
		console.error(i)
	}, 100 * i)
}

// 一个通常的解决方法是使用立即执行的函数表达式（IIFE）来捕获每次迭代时 i 的值：
for (var i = 0; i < 10; i++) {
	;(function(i) {
		setTimeout(function() {
			console.log(i)
		}, 100 * i)
	})(i)
}

// ** let declare
// ! var 函数作用域
// ! let 块作用域

for (let i = 0; i < 10; i++) {
	setTimeout(function() {
		console.log(i)
	}, 100 * i)
}

// ** const: block zone
const life4Cat = 9
const kitty = {
	name: 'kitty',
	numLives: life4Cat
}
// error: Assignment to constant variable
kitty = {
	name: 'Tom',
	numLives: life4Cat
}

kitty.name = 'Jerry'
kitty.numLives--
