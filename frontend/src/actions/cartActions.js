import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const addToCartAction = (id, quantity, color, size) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`/api/products/${id}`);

  // We do not need every detail of product in 'data' so we take the specifics
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
      color,
      size,
    },
  });

  // Saving the current state after dispatching the action above.
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCartAction = (productId) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddressAction = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const choosePaymentMethodAction = (paymentMethod) => async (
  dispatch
) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
};

export const cartResetAction = () => async (dispatch) => {
  dispatch({
    type: CART_RESET,
  });

  localStorage.removeItem('cartItems');
};
