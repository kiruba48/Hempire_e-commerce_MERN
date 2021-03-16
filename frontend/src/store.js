import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productDetailsReducer,
  productReducer,
  productDeleteReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateReducer,
  userPasswordUpdateReducer,
  getAllUsersReducer,
  userDeleteReducer,
  userUpdateByAdminReducer,
} from './reducers/userReducers';
import {
  createOrderReducer,
  orderDetailsReducer,
  updatePaymentReducer,
  myOrdersReducer,
} from './reducers/orderReducers';

// combining the list of reducer functions
const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfileDetail: userDetailsReducer,
  userProfileUpdate: userUpdateReducer,
  userPasswordUpdate: userPasswordUpdateReducer,
  userList: getAllUsersReducer,
  userDelete: userDeleteReducer,
  userUpdateByAdmin: userUpdateByAdminReducer,
  orderCreate: createOrderReducer,
  orderDetails: orderDetailsReducer,
  paymentUpdate: updatePaymentReducer,
  ordersOfLoggedUser: myOrdersReducer,
});

// Accessing the local storage to get the cartItems stored (if any)
const storedCartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// Accessing the local storage to get the userInfo stored (if any)
const storedUserInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const storedShippingAddress = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// Default initial state setting
const initialState = {
  cart: { cartItems: storedCartItems, shippingAddress: storedShippingAddress },
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
