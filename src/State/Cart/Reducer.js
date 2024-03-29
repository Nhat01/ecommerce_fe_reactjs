import {
   ADD_ITEM_TO_CART_FAILURE,
   ADD_ITEM_TO_CART_REQUEST,
   ADD_ITEM_TO_CART_SUCCESS,
   GET_CART_FAILURE,
   GET_CART_REQUEST,
   GET_CART_SUCCESS,
   REMOVE_CART_ITEM_FAILURE,
   REMOVE_CART_ITEM_REQUEST,
   REMOVE_CART_ITEM_SUCCESS,
   UPDATE_CART_ITEM_FAILURE,
   UPDATE_CART_ITEM_REQUEST,
   UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

const initialState = {
   cart: null,
   loading: null,
   error: null,
   cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_CART_REQUEST:
      case ADD_ITEM_TO_CART_REQUEST:
      case REMOVE_CART_ITEM_REQUEST:
      case UPDATE_CART_ITEM_REQUEST:
         return { ...state, loading: true, error: false };
      case ADD_ITEM_TO_CART_SUCCESS:
         return {
            ...state,
            loading: false,
            error: false,
            cartItems: action.payload,
         };
      case GET_CART_SUCCESS:
         return {
            ...state,
            loading: false,
            error: false,
            cartItems: action.payload.cartItems,
            cart: action.payload,
         };
      case REMOVE_CART_ITEM_SUCCESS:
         return {
            ...state,
            loading: false,
            deleteCart: action.payload,
         };

      case UPDATE_CART_ITEM_SUCCESS:
         return {
            ...state,
            loading: true,
            updateCart: action.payload,
         };
      case UPDATE_CART_ITEM_FAILURE:
      case REMOVE_CART_ITEM_FAILURE:
      case ADD_ITEM_TO_CART_FAILURE:
      case GET_CART_FAILURE:
         return { ...state, loading: false, error: action.payload };
      default:
         return state;
   }
};
