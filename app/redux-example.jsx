var redux = require('redux');

console.log('starting redux example');

var reducer = (state = {name: 'anonymous'}, action) => {
    // state = state || {name: 'Anonymous'};
        
    //check for the type of action
    switch (action.type){
        case 'CHANGE_NAME' : 
            return {
                //return new state
                ...state,
                name: action.name
            };
        default:
            return state;
    }
};

var store = redux.createStore(reducer, redux.compose(
    // redux.compose allows middleware functions to be executed in application
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// listen for changes on the state using the subscribe method
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    
    console.log('name is', state.name);
    document.getElementById('app').innerHTML = state.name;
});

//unsubscribe();

var currentState = store.getState();
console.log('currentState', currentState);

// create an action, must have 'type' defined
//var action = {
//    type: 'CHANGE_NAME',
//    name: 'Terence'
//};

// dispatch action to the store
store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Terence'
});


// dispatch action to the store
store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Elizabeth'
});
