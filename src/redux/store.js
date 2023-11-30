import { combineReducers, legacy_createStore as createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import filmsReducer from "./films-reducer";

let reducers = combineReducers({
    films: filmsReducer
});

let store = createStore(reducers, applyMiddleware(thunk));


export default store;