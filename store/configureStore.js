import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/index.js';

// apply middleware for async behavior in dispatch 
// var buildStore = compose(applyMiddleware(thunk), createStore)

export default function configureStore(initialState) {
   //return buildStore(rootReducer, initialState);
   //return compose(applyMiddleware(thunk))(createStore)(rootReducer)
   const store = createStore(
     rootReducer,
     initialState,
     applyMiddleware(thunk, createLogger())
   )

   return store
}