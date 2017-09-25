import combineReducer from './combineReducers';

const aaa = {
    aaa: 1111,
    bbb: 222,
    ccc: (state = {}, action) => '1111',
    ddd: (a = {}, b) => '222222'
};

var bbb = combineReducer(aaa);
console.log(bbb())



