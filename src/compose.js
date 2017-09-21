// 从右往左
/**
 * 官方自己也实现了一套，不过个人认为略显装逼，臣妾看不懂
 *  var a = function (x) {
 *      return x + 1;
 *  }
 *
 *  var b = function (x) {
 *      return x * x;
 *  }
 *
 * var c = compose(b,a);
 * c(1);    // 4
 *
 * **/

// function compose(arg,arg2) {
//     return function (aaa) {
//         return arg(arg2(aaa));
//     }
// }

// 无需多言，更简单，更霸道，一看就懂
function compose(...argFun) {
    return function (...arg) {
        let returnFunc = arg;

        for (let i = argFun.length - 1; i > -1; i--) {
            if (typeof argFun[i] === "function") {
                if (i === argFun.length - 1) {
                    returnFunc = argFun[i].apply(this, returnFunc)
                } else {
                    returnFunc = argFun[i].call(this, returnFunc)
                }
            } else {
                throw new Error(`compose方法${argFun}必须是function`);
            }
        }
        return returnFunc;
    }
}

export default compose;





