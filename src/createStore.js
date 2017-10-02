export const ActionTypes = {
    init: 'redux.init'
};
// redux 核心代码，实现  dispatch, getState,
export default function createStore (reducer, preloadState, enhancer) {
       let currentReducer = reducer;
       let currentState = preloadState;
       let isDispatching = false;
       let currentListen = [];
       let nextListen = currentListen;

       if (typeof enhancer === 'function') {
           return enhancer(createStore)(reducer, preloadState)
       }

       function ensureListeners() {
           if (nextListen === currentListen) {
               nextListen = [...currentListen];
           }
       }

        function getState() {
            return currentState;
        }

        function dispatch(action) {
            if (isDispatching) {
                throw new Error('此时还不能dispatch');
            }

            try {
                isDispatching = true;
                currentState = currentReducer(currentState, action);
            } finally {
                isDispatching = false;
            }

            const liteners = currentListen = nextListen;
            for (let i = 0; i< liteners.length; i++) {
                const litener = liteners[i];
                litener();
            }

            return action;
        }

        function subscribe(listener) {
            if (typeof listener !== 'function') {
                throw new Error('subscript必须传入方法');
            }

            let isSubscribed = true;
            ensureListeners();
            nextListen.push(listener);

            return function unsubscribe () {
                if (!isSubscribed) {
                    return;
                }

                isSubscribed = false;
                ensureListeners();
                const index = nextListen.indexOf(listener);
                nextListen.splice(index, 1);
            }
        }

        function replaceReducer(nextReducer) {
            if (typeof nextReducer !== 'function') {
                throw new Error('redux必须是一个方法');
            }
            currentReducer = nextReducer;
            dispatch(ActionTypes.init);
        }

        return {
            dispatch,
            getState,
            subscribe,
            replaceReducer,
        }
}