# TypeScript

## 1. 基础类型
### 1.1 布尔值
boolean
### 1.2 数字
ts 中的所有数字都是浮点数, 类型是 number. 除了支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015 中引入的二进制和八进制字面量
### 1.3 string
- 单引号, 双引号都行
- 使用反引号 ``` 或者 `${expr}` 这形式来表示
### 1.4 数组
定义方式:
```ts
let list:string[] = ['ts']
let list:Array<string> = ['js','ts']
```
### 1.5 元组
表示已知元素数量和类型的数组
```ts
let x: [string, number]
x = ['hello', 10] // OK
x = [10, 'hello'] // Error
```
当访问一个越界的元素，会使用联合类型 TODO 替代


```ts
x[3] = 'world' // OK, 字符串可以赋值给 (string | number) 类型

console.log(x[5].toString()) // OK, 'string' 和'number' 都有 toString

x[6] = true // Error, 布尔不是 (string | number) 类型
```

### 1.6 枚举
```ts
enum Language {TS,JS,GO}
```
默认从 `0` 开始编号, 可以手动指定成员的值.

### 1.7 any

主要是用在不希望编译器进行类型检查, 直接通过, 表示任何类型的情况, 对重写代码的时候十分有效.

### 1.8 void
表示没有任何类型, 和 `any` 相反. 常用在返回值. 只能赋予`undefined`和`null`
### 1.9 null & undefined
默认情况下 `null` 和 `undefined` 是所有类型的子类型。
### 1.10 never
表示永远不存在的值的类型.
 never 类型是那些
 - 总是会抛出异常
 - 根本就不会有返回值的函数表达式
 - 箭头函数表达式的返回值类型


never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给never 类型（除了 never 本身之外）。 即使 any 也不可以赋值给 never。
### 1.11 object
表示非原始类型, 也就是除了 number,string,boolean,symbol,null,undefined 之外的类型.
### 1.12 类型断言

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。

在 ts 中有两种方式:
1. 使用尖括号

    ```ts
    let someValue: any = 'this is a string'
    let strLength: number = (<string>someValue).length
    ```
2. 使用 `as`语法

    ```ts
    let strLength: number = (someValue as string).length
    ```
**在 TS 中使用 JSX 时候,只有 as 语法是允许的**
## 2. 变量声明
### 2.1 var
#### 作用域规则
var 会进行作用域提升,带来麻烦
#### 捕获变量的怪异之处
下面会一直输出: 10
```js
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i)
  }, 100 * i)
}
```
> 我们传给 setTimeout 的每一个函数表达式实际上都引用了相同作用域里的同一个 i。

解决方法: 使用立即执行的函数表达式 (IIFE: Immediately invoked function expression)

```js
for (var i = 0; i < 10; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i)
    }, 100 * i)
  })(i)
}
```
### 2.2 let

#### 块作用域
块作用域变量在包含它们的块或 for 循环之外是不能访问的。

它们不能在被声明之前读或写。 虽然这些变量始终“存在”于它们的作用域里，但在直到声明它的代码之前的区域都属于[暂时性死区](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let)。

#### 重定义和屏蔽
我们提过使用 var 声明时，它不在乎你声明多少次；你只会得到 1 个。
```js
function f(x) {
  let x = 100 // Error: 干扰参数声明
}

function g() {
  let x = 100
  var x = 100 // Error: 不能同时具有 x 的两个声明
}
```
#### 块级作用域变量的获取

每次进入一个作用域时，let 会创建一个变量的环境。就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。

当 let 声明出现在循环体里时拥有完全不同的行为。不仅是在循环里引入了一个新的变量环境，而且针对每次迭代都会创建这样一个新作用域，这就相当于我们在使用立即执行的函数表达式时做的事。

### 2.3 const

它们被赋值后不能再改变。 换句话说，它们拥有与 let 相同的作用域规则，但是不能对它们重新赋值。

它们引用的值是不可以变的.

```js
const numLivesForCat = 9
const kitty = {
  name: 'Kitty',
  numLives: numLivesForCat
}

// Error
kitty = {
  name: 'Tommy',
  numLives: numLivesForCat
};

// OK
kitty.name = 'Jerry'
kitty.numLives--
```

#### let vs const

什么时候用什么声明:
- 使用最小特权原则，所有**变量除了你计划去修改的都应该使用 const**。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值
- 使用 const 也可以让我们更容易的推测数据的流动。

### 3. 解构
#### 3.1 结构数组
```ts
let input = [1, 2]
let [first, second] = input
```
用于函数参数:
```ts
let input: [number, number] = [1, 2]

function f([first, second]: [number, number]) {
  console.log(first)
  console.log(second)
}
f(input)
```

也可以使用 `...`进行结构赋值
```ts
let [first, ...rest] = [1, 2, 3, 4]
console.log(first) // outputs 1
console.log(rest) // outputs [ 2, 3, 4 ]
```
#### 3.2 对象解构
- 也可以使用 `...`进行结构赋值
- 也可以使用对象结构

#### 3.3 属性重命名
可以给属性以不同的名字:
```ts
let {a:newName1,b:newName2} = o
```
这里的语法开始变得混乱。 你可以将 a: newName1 读做 "a 作为 newName1"。 方向是从左到右，好像你写成了以下样子：
```ts
let newName1 = o.a
let newName2 = o.b
```
令人困惑的是，这里的冒号不是指示类型的。 如果你想指定它的类型，仍然需要在其后写上完整的模式。
```ts
let {a, b}: {a: string, b: number} = o
```

#### 3.3 默认值,使用 `?`

默认值可以让你在属性为 undefined 时使用**缺省值**：
```ts
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject
}
```
现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。

#### 3.4 函数声明

```ts
type C = { a: string, b?: number }
function f({ a, b }: C): void {
  // ...
}
```
但是，通常情况下更多的是指定默认值，解构默认值有些棘手。 首先，你需要在默认值之前设置其格式。

```ts
function f({ a = '', b = 0 } = {}): void {
  // ...
}
f()
```
其次，你需要知道在解构属性上给予一个默认或可选的属性用来替换主初始化列表。 要知道 C 的定义有一个 b 可选属性：
```ts
function f({ a, b = 0 } = { a: '' }): void {
  // ...
}
f({ a: 'yes' }) // OK, 默认 b = 0
f() // OK, 默认 a: '', b = 0
f({}) // Error, 一旦传入参数则 a 是必须的
```
要小心使用解构。 从前面的例子可以看出，就算是最简单的解构表达式也是难以理解的。 尤其当存在深层嵌套解构的时候，就算这时没有堆叠在一起的重命名，默认值和类型注解，也是令人难以理解的。 解构表达式要尽量保持小而简单。
### 4. 展开
- 展开数组
- 展开对象
