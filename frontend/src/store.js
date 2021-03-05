import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productDetailsReducer,
  productReducer,
} from './reducers/productReducers';

// combining the list of reducer functions
const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
});

// Default initial state setting
const initialState = {};

// passing all the middleware as array
const middleware = [thunk];

// Creating a store: createStore(listOfReducers, initialState, listOfMiddleware)
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
