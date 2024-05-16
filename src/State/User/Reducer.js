import {
   GET_USERS_FAILURE,
   GET_USERS_REQUEST,
   GET_USERS_SUCCESS,
   EDIT_USER_FAILURE,
   EDIT_USER_REQUEST,
   EDIT_USER_SUCCESS,
   DELETE_USER_FAILURE,
   DELETE_USER_REQUEST,
   DELETE_USER_SUCCESS,
} from "./ActionType";

const initialState = {
   users: null,
   isLoading: false,
   error: null,
   user: null,
   totalPages: 0,
};

export const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_USERS_REQUEST:
      case EDIT_USER_REQUEST:
      case DELETE_USER_REQUEST:
         return { ...state, isLoading: true, error: null };
      case DELETE_USER_SUCCESS:
      case EDIT_USER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            error: null,
            user: action.payload,
         };
      case GET_USERS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            error: null,
            users: action.payload.users,
            totalPages: action.payload.totalPages,
         };
      case GET_USERS_FAILURE:
      case EDIT_USER_FAILURE:
      case DELETE_USER_FAILURE:
         return { ...state, error: action.payload, isLoading: false };
      default:
         return state;
   }
};
