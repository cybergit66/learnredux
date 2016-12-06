var redux = require('redux');

console.log('starting redux todo example');

// create default state
var stateDefault = {
    searchText: '',
    showCompleted: false,
    todos: []
};

// define the reducer as a pure function. it takes state and action
var reducer = (state = stateDefault, action) => {
    // state = state || {name: 'Anonymous'};
    return state;
};

// create the store, pass in the reducer
var store = redux.createStore(reducer);

// getState fetches the current state of the application
var currentState = store.getState();

// console log the current state of the application
console.log('currentState', currentState);