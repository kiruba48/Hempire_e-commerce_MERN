import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // Checking if the selected product already added to cart
      const existingItem = state.cartItems.find(
        (product) => product.productId === item.productId
      );
      console.log(existingItem);
      if (existingItem) {
        // return state;
        return {
          ...state,
          cartItems: state.cartItems.map((itemInCart) =>
            itemInCart.productId === existingItem.productId ? item : itemInCart
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.productId !== action.payload
        ),
      };
    default:
      return state;
  }
};
