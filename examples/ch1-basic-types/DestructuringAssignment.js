var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var input = [1, 2];
function f(_a) {
    var first = _a[0], second = _a[1];
    console.log(first);
    console.log(second);
}
f(input);
var _a = [1, 2, 3, 4], first = _a[0], rest = _a.slice(1);
console.log(first);
console.log(rest);
// * object assignment
var o = {
    a: 'foo',
    b: 12,
    c: 'bar'
};
// let { a, b } = o
var a = o.a, res = __rest(o, ["a"]);
var total = res.b + res.c.length;
console.error('total', total);
