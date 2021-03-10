import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

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
