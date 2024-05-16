import {
   GET_CATEGORY_FAILURE,
   GET_CATEGORY_SUCCESS,
   GET_CATEGORY_REQUEST,
} from "./ActionType";

const initialState = {
   categories: null,
   loading: null,
   error: null,
};

export const customerCategoryReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_CATEGORY_REQUEST:
         return { ...state, loading: true, error: false };
      case GET_CATEGORY_SUCCESS:
         return {
            ...state,
            loading: false,
            error: false,
            categories: action.payload,
         };
      case GET_CATEGORY_FAILURE:
         return { ...state, error: action.payload };
      default:
         return state;
   }
};
