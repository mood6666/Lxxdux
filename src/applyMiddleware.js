/**
 * @作者    xiongjin@douyu.tv
 * @时间    2017/10/1
 */
import compose from './compose';

export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        const store = createStore(reducer, preloadedState, enhancer);
        let dispatch = store.dispatch;
        let chain = [];

        const middlewareApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }

        chain = middlewares.map(middleware => middleware(middlewareApi))
        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            dispatch,
        }
    }
}