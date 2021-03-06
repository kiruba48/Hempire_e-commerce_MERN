import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';

export const addToCartAction = (id, quantity, color, size) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`/api/products/${id}`);
  console.log(data);

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

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};