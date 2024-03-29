import {
   CREATE_ORDER_FAILURE,
   CREATE_ORDER_REQUEST,
   CREATE_ORDER_SUCCESS,
   GET_ORDER_BY_ID_FAILURE,
   GET_ORDER_BY_ID_REQUEST,
   GET_ORDER_BY_ID_SUCCESS,
   GET_ORDER_HISTORY_FAILURE,
   GET_ORDER_HISTORY_REQUEST,
   GET_ORDER_HISTORY_SUCCESS,
} from "./ActionType";

const initialState = {
   orders: [],
   order: null,
   loading: null,
   error: null,
};

export const orderReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ORDER_BY_ID_REQUEST:
      case CREATE_ORDER_REQUEST:
      case GET_ORDER_HISTORY_REQUEST:
         return { ...state, loading: true };
      case CREATE_ORDER_SUCCESS:
         return { ...state, loading: false, order: action.payload };
      case GET_ORDER_BY_ID_SUCCESS:
         return { ...state, loading: false, order: action.payload };
      case GET_ORDER_HISTORY_SUCCESS:
         return { ...state, loading: false, orders: action.payload };
      case GET_ORDER_BY_ID_FAILURE:
      case CREATE_ORDER_FAILURE:
      case GET_ORDER_HISTORY_FAILURE:
         return { ...state, error: action.payload };
      default:
         return state;
   }
};
