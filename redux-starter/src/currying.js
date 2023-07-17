function add(a) {
    return function (b) {
        return a + b;
    }
}

const add1 = a => b => a + b;

add1(a)(b);