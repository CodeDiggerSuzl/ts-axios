# 接口
TypeScript 的核心原则之一是对值所具有的结构进行类型检查。
## 1. 引入
```ts
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)
```
类型检查器会查看 printLabel 的调用。printLabel 有一个参数，并要求这个对象参数有一个名为 label 类型为 string 的属性。 需要注意的是，**我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，以及其类型是否匹配。**

使用接口重写:必须包含一个label 属性且类型为 string
```ts
interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = {size: 10, label: 'Size 10 Object'}
printLabel(myObj)
```

**需要注意的是，我们在这里并不能像在其它语言里一样，说传给 printLabel 的对象实现了这个接口。我们只会去关注值的外形。**

## 2. 可选属性 使用`?`
接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。例如给函数传入的参数对象中只有部分属性赋值了。
```ts
interface SquareConfig {
  color?: string
  width?: number
}
```

可以捕获属性名是否正确

## 3. 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性:
```ts
interface Point {
  readonly x: number
  readonly y: number
}
```
TypeScript 具有 ReadonlyArray<T> 类型，它与 Array<T> 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
```ts
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
```

### readonly and const
- 做为变量使用的话用 const
- 若做为属性则使用 readonly

## 4. 额外的属性检查
对象字面量会被特殊对待而且会经过额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，typo 你会得到一个错误.

```ts
// error: 'colour' 不存在于类型 'SquareConfig' 中
let mySquare = createSquare({ colour: 'red', width: 100 })
```

第一种方式: 使用类型断言
```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)
```

使用字符串索引签名TODO:

```ts
interface SquareConfig {
  color?: string
  width?: number
  [propName: string]: any
}
```
## 5. 函数类型
为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
```ts
interface SearchFunc {
  (source: string, subString: string): boolean
}
```
这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。

创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
```ts
let mySearch: SearchFunc
mySearch = function(source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1
}
```

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。

```ts
let mySearch: SearchFunc
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1
}
```

如果你不想指定类型，TypeScript 的类型系统会推断出参数类型，因为函数直接赋值给了 SearchFunc 类型变量。 函数的返回值类型是通过其返回值推断出来的（此例是 false 和 true）。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与 SearchFunc 接口中的定义不匹配

## 6. 可以索引的类型 (index)

 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。
 ```ts
interface StringArray {
  [index: number]: string
}

let myArray: StringArray
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]
```
上面例子里，我们定义了 StringArray 接口，它具有索引签名。 这个索引签名表示了当用 number 去索引 StringArray 时会得到 string 类型的返回值。

两种索引签名: 字符串和数字

可以同时使用两种类型的索引，但是**数字索引的返回值必须是字符串索引返回值类型的子类型。**
> 这是因为当使用 number 来索引时，JavaScript 会将它转换成string 然后再去索引对象。 也就是说用 100（一个 number）去索引等同于使用'100'（一个 string ）去索引，因此两者需要保持一致。

最后，你可以将索引签名设置为只读，这样就防止了给索引赋值：

```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
```


## 7. 类类型
### 7.1 实现接口
TypeScript 也能够用它来明确的强制一个类去符合某种契约。

也可以在接口中描述一个方法,在类中进行实现:

```ts
interface ClockInterface {
  currentTime: Date
  setTime(d: Date)
}

class Clock implements ClockInterface {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) { }
}
```

### 7.2 类静态部分和实例部分的区别(TODO)

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用**构造器**签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

```ts
interface ClockConstructor {
  new (hour: number, minute: number)
}

// error
class Clock implements ClockConstructor {
  currentTime: Date
  constructor(h: number, m: number) { }
}
```

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。**constructor 存在于类的静态部分**，所以不在检查的范围内。


我们定义了两个接口， ClockConstructor 为构造函数所用和 ClockInterface 为实例方法所用。 为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。

```ts
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface
}
interface ClockInterface {
  tick()
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute) // TODO new
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('beep beep')
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock')
  }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)
```

因为 createClock 的第一个参数是 ClockConstructor 类型，在 createClock(AnalogClock, 7, 32) 里，会检查 AnalogClock 是否符合构造函数签名。

## 8. 继承 extends

- 能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里
- 一个接口可以继承多个接口，创建出多个接口的合成接口。


## 9. 混合类型
接口能够描述 JavaScript 里丰富的类型: 一个对象可以同时做为函数和对象使用，并带有额外的属性

## 10. 接口继承类 ?
当接口继承了一个类类型时，**它会继承类的成员但不包括其实现**。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的 **private** 和 **protected** 成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。


```ts
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// Error：“ImageC”类型缺少“state”属性。
class ImageC implements SelectableControl {
  select() { }
}
```
- SelectableControl 包含了 Control 的所有成员，包括私有成员 state。 因为 state 是私有成员，所以只能够是 Control 的子类们才能实现 SelectableControl 接口。 因为只有 Control 的子类才能够拥有一个声明于Control 的私有成员 state，这对私有成员的兼容性是必需的。


- 在 Control 类内部，是允许通过 SelectableControl 的实例来访问私有成员 state 的。 实际上，SelectableControl 接口和拥有 select 方法的 Control 类是一样的。Button和 TextBox 类是 SelectableControl 的子类（因为它们都继承自Control 并有 select 方法），但 ImageC 类并不是这样的。