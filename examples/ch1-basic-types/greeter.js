var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
    }
    return User;
    // closure TODO
}());
function greeter(person) {
    return 'hello,' + person.firstName + ' ' + person.lastName;
}
var user = new User('joe', 'sue');
console.log(greeter(user));
