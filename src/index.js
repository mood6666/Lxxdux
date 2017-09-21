import compose from './compose';

var a = (a,b) => a + b;

var b = x => x * x;

var c =compose(b, a);
var aaa = c(1,2);
console.log(aaa)



