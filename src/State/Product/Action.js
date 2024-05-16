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
   CREATE_PRODUCT_SUCCESS,
   CREATE_PRODUCT_FAILURE,
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
      search,
   } = reqData;
   dispatch({ type: FIND_PRODUCTS_REQUEST });
   try {
      const { data } = await api.get(
         `/api/products/filter?search=${search}&color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
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

export const getProducts = (userData) => async (dispatch) => {
   dispatch({ type: GET_PRODUCTS_REQUEST });
   try {
      const response = await api.get(
         `/api/admin/products/find?pageSize=${userData.pageSize}&pageNumber=${userData.pageNumber}`
      );
      const products = response.data;
      console.log(products);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
   } catch (error) {
      dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
   }
};

export const updateProduct = (productId, formData) => async (dispatch) => {
   dispatch({ type: UPDATE_PRODUCT_REQUEST });
   try {
      console.log("form ", formData);
      const response = await api.put(
         `/api/admin/products/${productId}/update`,
         formData,
         {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         }
      );
      const products = response.data;
      console.log(products);
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: products });
   } catch (error) {
      dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
   }
};

export const createProduct = (formData) => async (dispatch) => {
   dispatch({ type: CREATE_PRODUCT_REQUEST });
   try {
      console.log("form ", formData);
      const response = await api.post(`/api/admin/products/`, formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });
      const products = response.data;
      console.log(products);
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: products });
   } catch (error) {
      dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
   }
};
