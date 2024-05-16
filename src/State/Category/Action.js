import {
   GET_CATEGORY_FAILURE,
   GET_CATEGORY_SUCCESS,
   GET_CATEGORY_REQUEST,
} from "./ActionType";
import { api } from "../../config/apiConfig";

export const getAllCategory = () => async (dispatch) => {
   dispatch({ type: GET_CATEGORY_REQUEST });
   try {
      const { data } = await api.get(`/api/categories`);
      dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
   } catch (error) {
      dispatch({ type: GET_CATEGORY_FAILURE, payload: error.message });
   }
};
