/**
 * @时间    2017/10/1
 */

// dispatch的容器
// 能够直接调用方法，而不用dispatch。具体使用方法，和官方API保持一致
function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator(...args));
}

export default function bindActionCreators (actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }
    const keys = Object.keys(actionCreators);
    const boundActionCreators = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
        }
    }
    return boundActionCreators;
}



































