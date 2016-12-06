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
var store = redux.createStore(reducer, redux.compose(
    // redux.compose allows middleware functions to be executed in application
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// listen for changes on the state using the subscribe method
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    
    console.log('new search text is', state.searchText);
    document.getElementById('app').innerHTML = state.searchText;
});

//unsubscribe();

// listen for changes on the state using the subscribe method
store.subscribe(() => {
    var state = store.getState();
});

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

// dispatch action to the store
store.dispatch({
    type: 'CHANGE_SEARCHTEXT',
    searchText: 'another search'
});