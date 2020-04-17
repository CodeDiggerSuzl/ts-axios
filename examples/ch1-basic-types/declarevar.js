var _loop_1 = function (i) {
    setTimeout(function () {
        console.log(i);
    }, 100 * i);
};
/* 2. declare a type*/
for (var i = 0; i < 10; i++) {
    _loop_1(i);
}
