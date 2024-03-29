import {
   FIND_PRODUCTS_FAILURE,
   FIND_PRODUCTS_REQUEST,
   FIND_PRODUCTS_SUCCESS,
   FIND_PRODUCT_BY_ID_FAILURE,
   FIND_PRODUCT_BY_ID_REQUEST,
   FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";
import { api } from "../../config/apiConfig";

export const findProducts = (reqData) => async (dispatch) => {
   const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
   } = reqData;
   dispatch({ type: FIND_PRODUCTS_REQUEST });
   try {
      const { data } = await api.get(
         `/api/products/filter?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
   } catch (error) {
      dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
   }
};

export const findProductById = (productId) => async (dispatch) => {
   dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
   try {
      const { data } = await api.get(`/api/products/id/${productId}`);
      dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });

      console.log("data: ", data);
   } catch (error) {
      dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
   }
};

export const findProductCategories = (reqData) => async (dispatch) => {
   const { categories, numberOfProducts } = reqData;
   dispatch({ type: FIND_PRODUCTS_REQUEST });
   try {
      const { data } = await api.get(
         `/api/products/latest?categories=${categories}&numberOfProducts=${numberOfProducts}`
      );
      dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
   } catch (error) {
      dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
   }
};
