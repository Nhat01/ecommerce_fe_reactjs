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
   GET_ALL_ORDER_REQUEST,
   GET_ALL_ORDER_FAILURE,
   GET_ALL_ORDER_SUCCESS,
   UPDATE_ORDER_FAILURE,
   UPDATE_ORDER_SUCCESS,
   UPDATE_ORDER_REQUEST,
} from "./ActionType";
import { api } from "../../config/apiConfig";

export const createOrder = (reqData) => async (dispatch) => {
   dispatch({ type: CREATE_ORDER_REQUEST });
   try {
      const { data } = await api.post(`/api/orders/`, reqData.address);
      console.log(data);
      if (data._id) {
         reqData.navigate({ search: `step=2&order_id=${data._id}` });
      }
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: CREATE_ORDER_FAILURE,
         payload: error.message,
      });
   }
};

export const getOrderById = (orderId) => async (dispatch) => {
   dispatch({ type: GET_ORDER_BY_ID_REQUEST });
   try {
      const { data } = await api.get(`/api/orders/${orderId}`);
      dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: GET_ORDER_BY_ID_FAILURE,
         payload: error.message,
      });
   }
};

export const getAllOrder = () => async (dispatch) => {
   dispatch({ type: GET_ALL_ORDER_REQUEST });
   try {
      const { data } = await api.get(`/api/admin/orders`);
      dispatch({ type: GET_ALL_ORDER_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: GET_ALL_ORDER_FAILURE,
         payload: error.message,
      });
   }
};

export const confirmOrder = (orderId) => async (dispatch) => {
   dispatch({ type: UPDATE_ORDER_REQUEST });
   try {
      const { data } = await api.put(`/api/admin/orders/${orderId}/confirmed`);
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: UPDATE_ORDER_FAILURE,
         payload: error.message,
      });
   }
};

export const shipOrder = (orderId) => async (dispatch) => {
   dispatch({ type: UPDATE_ORDER_REQUEST });
   try {
      const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: UPDATE_ORDER_FAILURE,
         payload: error.message,
      });
   }
};

export const deliverOrder = (orderId) => async (dispatch) => {
   dispatch({ type: UPDATE_ORDER_REQUEST });
   try {
      const { data } = await api.put(`/api/admin/orders/${orderId}/deliver`);
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: UPDATE_ORDER_FAILURE,
         payload: error.message,
      });
   }
};

export const cancelOrder = (orderId) => async (dispatch) => {
   dispatch({ type: UPDATE_ORDER_REQUEST });
   try {
      const { data } = await api.get(`/api/admin/orders/${orderId}/cancel`);
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: UPDATE_ORDER_FAILURE,
         payload: error.message,
      });
   }
};

export const getOrderHistory = () => async (dispatch) => {
   dispatch({ type: GET_ORDER_HISTORY_REQUEST });
   try {
      const { data } = await api.get(`/api/orders/user`);
      dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: GET_ORDER_HISTORY_FAILURE,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};
