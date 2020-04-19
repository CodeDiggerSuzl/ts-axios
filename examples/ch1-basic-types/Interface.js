/**
 * TypeScript 的核心原则之一是对值所具有的结构进行类型检查。它有时被称做“鸭式辨型法”或“结构性子类型化”。
 *
 * 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
 */
function printLabel(labelledObject) {
    console.log(labelledObject.label);
}
var myObj = { size: 100, label: 'size 10 Object' };
printLabel(myObj);
