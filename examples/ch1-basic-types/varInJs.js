for (var i = 0; i < 10; i++) {
	// log ten 10
	setTimeout(function() {
		console.log(i)
	}, 100 * i)
}
// last for loop will log ten 10, use instant function will do
for (var i = 0; i < 10; i++) {
	(function(j) {
		setTimeout(function() {
			console.log(j)
		}, 100 * j)
	})(i)
}
// --------------------let-------------------
// block scope
// only can be used after declaration
// can't be redeclare block-scoped variable
a++
let a = 1
console.log(a) // Cannot access 'a' before initialization


// --------------------const-------------------
// can not be reassigned
const a  = 100
a = 20
console.log(a) // Identifier 'a' has already been declared