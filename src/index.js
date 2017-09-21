import compose from './compose';

var a = x => x + 1;
var c = x => x*x;
var d = x => x*x;
var b = compose();

console.log(b(2))


