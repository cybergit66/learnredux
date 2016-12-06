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
    //check for the type of action
    switch (action.type){
        case 'CHANGE_SEARCHTEXT' : 
            return {
                //return new state
                ...state,
                searchText: action.searchText
            };
        default:
            return state;
    }
};

// create the store, pass in the reducer
var store = redux.createStore(reducer);

// getState fetches the current state of the application
var currentState = store.getState();

// console log the current state of the application
console.log('currentState', currentState);

// action to change the searchText
// dispatch action to the store
store.dispatch({
    type: 'CHANGE_SEARCHTEXT',
    searchText: 'new search'
});

console.log('new search should be', store.getState());