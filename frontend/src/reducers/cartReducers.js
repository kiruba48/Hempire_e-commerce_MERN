import { CART_ADD_ITEM } from '../constants/cartConstants';

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
        return state;
        // return {
        //   ...state,
        //   cartItems: state.cartItems.map(
        //     (itemInCart) =>
        //       itemInCart.productId === existingItem.productId && [
        //         {
        //           ...itemInCart,
        //           quantity: itemInCart.quantity + item.quantity,
        //         },
        //       ]
        //   ),
        // };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    default:
      return state;
  }
};
