import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_RESET,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // Checking if the selected product already added to cart
      const existingItem = state.cartItems.find(
        (product) => product.productId === item.productId
      );
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

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_RESET:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
