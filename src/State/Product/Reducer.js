import {
   FIND_PRODUCTS_FAILURE,
   FIND_PRODUCTS_REQUEST,
   FIND_PRODUCTS_SUCCESS,
   FIND_PRODUCT_BY_ID_FAILURE,
   FIND_PRODUCT_BY_ID_REQUEST,
   FIND_PRODUCT_BY_ID_SUCCESS,
   GET_PRODUCTS_FAILURE,
   GET_PRODUCTS_SUCCESS,
   GET_PRODUCTS_REQUEST,
   UPDATE_PRODUCT_FAILURE,
   UPDATE_PRODUCT_SUCCESS,
   UPDATE_PRODUCT_REQUEST,
   CREATE_PRODUCT_REQUEST,
   CREATE_PRODUCT_FAILURE,
   CREATE_PRODUCT_SUCCESS,
} from "./ActionType";

const initialState = {
   products: [],
   product: null,
   loading: null,
   error: null,
   totalPages: null,
};

export const customerProductReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_PRODUCTS_REQUEST:
      case FIND_PRODUCT_BY_ID_REQUEST:
      case GET_PRODUCTS_REQUEST:
      case UPDATE_PRODUCT_REQUEST:
      case CREATE_PRODUCT_REQUEST:
         return { ...state, loading: true, error: false };
      case FIND_PRODUCT_BY_ID_SUCCESS:
         return {
            ...state,
            loading: false,
            error: false,
            product: action.payload,
         };
      case FIND_PRODUCTS_SUCCESS:
         return {
            ...state,
            loading: false,
            error: false,
            products: action.payload,
         };
      case UPDATE_PRODUCT_SUCCESS:
      case CREATE_PRODUCT_SUCCESS:
         return {
            ...state,
            loading: false,
            error: false,
            product: action.payload,
         };
      case GET_PRODUCTS_SUCCESS:
         return {
            ...state,
            loading: false,
            error: false,
            products: action.payload.products,
            totalPages: action.payload.totalPages,
         };
      case GET_PRODUCTS_FAILURE:
      case FIND_PRODUCTS_FAILURE:
      case FIND_PRODUCT_BY_ID_FAILURE:
      case UPDATE_PRODUCT_FAILURE:
      case CREATE_PRODUCT_FAILURE:
         return { ...state, error: action.payload };
      default:
         return state;
   }
};
