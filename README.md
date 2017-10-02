# Lxxdux
重写redux，并针对性做出一些优化，简化  （Aim to optimize Redux,  simpler , eleganter）。

**后续会写一系列redux周边教程（源码解析，以及redux中间件等），有兴趣的童鞋一定要持续关注fork哟，给个星星哟  ~~~**

### compose
    compose.js  相比官方redux，实现更接地气，通俗易懂些
    
### combineReducer
    和官方实现差不多，自己又重写了一遍...
    
### createStore
    实现 {dispatch, getState, subscribe, replaceReducer}
    官方实现的很美妙，模仿了一遍！
### bindActionCreator
    action的包装
### applyMiddleware
    redux的精髓所在，也是优于mobx的特点之一，灵活的中间件
    建议还需仔细研读，收获甚多

