var redux = require('redux');

console.log('starting redux example');

// name reducer
// ------------------------------------------------------
var nameReducer = (state = 'anonymous', action) => {
    switch (action.type){
        case 'CHANGE_NAME':
            return action.name
        default: 
            return state;
    };
};

// action generators
// ----------------------------
var changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
};

var addHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    }
};

var removeHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    }
};

var addMovie = (title, genre) => {
    return {
        type: 'ADD_MOVIE',
        title,
        genre
    }
};

var removeMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
};

// begin of hobbies reducer code
// -------------------------------------------------
var newHobbyId = 1;

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

// begin of movies reducer code
// ----------------------------------------------------------
var newMovieId = 1;

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

// combine reducers function
// --------------------------------------------------------------------
var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer
});

// create the store, pass in the reducer
var store = redux.createStore(reducer, redux.compose(
    // redux.compose allows middleware functions to be executed in application
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// listen for changes on the state using the subscribe method
//------------------------------------------------------------------------
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    
    console.log('name is', state.name);
    document.getElementById('app').innerHTML = state.name;
    
    console.log('New state', store.getState());
});


// getState fetches the current state of the application
//------------------------------------------------------------------------
var currentState = store.getState();
console.log('currentState', currentState);

// create an action, must have 'type' defined
//var action = {
//    type: 'CHANGE_NAME',
//    name: 'Terence'
//};

// various dispatch action calls using action generators
//------------------------------------------------------------

// dispatch action to change name to terence
store.dispatch(changeName('Terence'));

// dispatch action to add hobby play guitar
store.dispatch(addHobby('Play Guitar'));

// dispatch action to add hobby walking 
store.dispatch(addHobby('Walking'));

// dispatch action to remove hobby with id of 2
store.dispatch(removeHobby(2));

/// dispatch action to change name to elizabeth
store.dispatch(changeName('Elizabeth'));

// dispatch action to add movie 'lord of the rings'
store.dispatch(addMovie('Lord of the Rings', 'Drama'));

// dispatch action to add movie 'madea Christmas'
store.dispatch(addMovie('Madea Christmas', 'Comedy'));

// dispatch action to remove movie with id of 1
store.dispatch(removeMovie(1));

