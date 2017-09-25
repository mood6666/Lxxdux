/**
 * 重写combineReducers
 * @时间    2017/9/25
 */
export function isPlainObject(value) {
    return Object.getPrototypeOf(value) === null || Object === value.constructor;
}

export default function combineReducers(reducerObj) {
    const keyArr = Object.keys(reducerObj);
    const finalReducer = {};

    keyArr.forEach((item) => {
        const reducerItem = reducerObj[item];
        if (typeof reducerItem === 'function') {
            finalReducer[item] = reducerObj[item];
        }
    });

    return function combine (state = {}, action) {
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


