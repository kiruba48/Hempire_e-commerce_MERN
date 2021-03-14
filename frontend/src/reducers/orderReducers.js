import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_ORDERS_FAIL,
  ORDER_MY_ORDERS_REQUEST,
  ORDER_MY_ORDERS_RESET,
  ORDER_MY_ORDERS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../constants/orderConstants';

// Reducer function
// @description Reducer to Create order
export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// Reducer function
// @description Reducer to GET order by id
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// Reducer function
// @description Reducer to PATCH order payment details
export const updatePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

// Reducer function
// @description Reducer to // GET LOGGED IN USER'S ORDERS
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MY_ORDERS_REQUEST:
      return { loading: true };
    case ORDER_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_MY_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_MY_ORDERS_RESET:
      return { orders: [] };

    default:
      return state;
  }
};
