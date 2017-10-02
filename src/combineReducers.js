/**
 * 重写combineReducers
 * @时间    2017/9/25
 */
export function isPlainObject(value) {
    return Object.getPrototypeOf(value) === null || Object === value.constructor;
}

// 简单讲下思路吧
// 首先 传给combineReducers的必须是一个对象，先遍历这个对象会过滤除了function类型的所有数据类型。然后遍历出一个reducer的集合，每一次dispatch的时候，就会调用combine,遍历reducer,然后根据key,重写store。
// 这里的代码不是很难，耐点心一定可以理解
export default function combineReducers(reducerObj) {
    const keyArr = Object.keys(reducerObj);
    const finalReducer = {};

    keyArr.forEach((item) => {
        const reducerItem = reducerObj[item];
        if (typeof reducerItem === 'function') {
            finalReducer[item] = reducerObj[item];
        }
    });

    return function combine (state = {}, action)  {
        const reducerKeyArr = Object.keys(finalReducer);
        const nextState = {};
        let hasChanged = false;
        reducerKeyArr.forEach((item) => {
            const reducer = finalReducer[item];
            const preStateForKey = state[item];
            const nextStateForKey = reducer(preStateForKey, action);
            nextState[item] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== preStateForKey;
        });
        return hasChanged ? nextState : state;
    }
}


