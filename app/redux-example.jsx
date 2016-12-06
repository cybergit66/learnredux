var redux = require('redux');

console.log('starting redux example');

var reducer = (state = {
        searchText: '',
        showCompleted: false,
        todos: []
        }, action) => {
    // state = state || {name: 'Anonymous'};
    return state;
};

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);