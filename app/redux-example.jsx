var redux = require('redux');

console.log('starting redux example');

var stateDefault = {
    name: 'anonymous',
    hobbies: [],
    movies: []
};

var newHobbyId = 1;
var newMovieId = 1;

var old_reducer = (state = stateDefault, action) => {
    // state = state || {name: 'Anonymous'};
        
    //check for the type of action
    switch (action.type){
        case 'CHANGE_NAME' : 
            return {
                //return new state
                ...state,
                name: action.name
            };
        case 'ADD_HOBBY' :
            return {
                ...state,
                hobbies: [
                ...state.hobbies,
                {   
                    id: newHobbyId++,
                    hobby: action.hobby
                }
                ]
            };
        case 'REMOVE_HOBBY' :
            return {
                ...state,
                hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
            };
        case 'ADD_MOVIE' :
            return {
                ...state,
                movies: [
                ...state.movies,
                {   
                    id: newMovieId++,
                    title: action.title,
                    genre: action.genre
                }
                ]
            };
        case 'REMOVE_MOVIE' :
            return {
                ...state,
                movies: state.movies.filter((movie) => movie.id !== action.id)
            };
        default:
            return state;
    }
};

var nameReducer = (state = 'anonymous', action) => {
    switch (action.type){
        case 'CHANGE_NAME':
            return action.name
        default: 
            return state;
    };
};

var hobbiesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_HOBBY':
            return [
                ...state,
                {   
                    id: newHobbyId++,
                    hobby: action.hobby
                }
            ];
        case 'REMOVE_HOBBY':
            return state.filter((hobby) => hobby.id !== action.id);
        default:
            return state;
    }
};

var moviesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MOVIE' :
            return [
                ...state,
                {
                    id: newMovieId++,
                    title: action.title,
                    genre: action.genre
                }
            ];
        case 'REMOVE_MOVIE' :
            return state.filter((movie) => movie.id !== action.id);
        default: 
            return state;
    };
};

var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
    // redux.compose allows middleware functions to be executed in application
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// listen for changes on the state using the subscribe method
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    
    console.log('name is', state.name);
    document.getElementById('app').innerHTML = state.name;
    
    console.log('New state', store.getState());
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

store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'Guitar playing'
});

store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'Walking'
});

store.dispatch({
    type: 'REMOVE_HOBBY',
    id: 2
});

// dispatch action to the store
store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Elizabeth'
});

// dispatch action to the store
store.dispatch({
    type: 'ADD_MOVIE',
    title: 'Lord of the Rings',
    genre: 'Drama'
});

// dispatch action to the store
store.dispatch({
    type: 'ADD_MOVIE',
    title: 'Madea Christmas',
    genre: 'Comedy'
});

store.dispatch({
    type: 'REMOVE_MOVIE',
    id: 1
});

