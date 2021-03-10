import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productDetailsReducer,
  productReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers';

// combining the list of reducer functions
const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

// Accessing the local storage to get the cartItems stored (if any)
const storedCartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// Accessing the local storage to get the userInfo stored (if any)
const storedUserInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Default initial state setting
const initialState = {
  cart: { cartItems: storedCartItems },
  userLogin: { userInfo: storedUserInfo },
};

// passing all the middleware as array
const middleware = [thunk];

// Creating a store: createStore(listOfReducers, initialState, listOfMiddleware)
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
