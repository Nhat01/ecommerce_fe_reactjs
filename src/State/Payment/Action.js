import { api } from "../../config/apiConfig";
import {
   CREATE_PAYMENT_FAILURE,
   CREATE_PAYMENT_REQUEST,
   UPDATE_PAYMENT_FAILURE,
   UPDATE_PAYMENT_REQUEST,
} from "./ActionType";

export const createPayment = (orderId) => async (dispatch) => {
   dispatch({ type: CREATE_PAYMENT_REQUEST });
   try {
      const { data } = await api.post(`/api/payments/${orderId}`);
      console.log(data);
      if (data.link_payment) {
         window.location.href = data.link_payment;
      }
   } catch (error) {
      dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
   }
};

export const createPaymentVnPay = (orderId) => async (dispatch) => {
   dispatch({ type: CREATE_PAYMENT_REQUEST });
   try {
      const { data } = await api.post(
         `/api/payments/create_payment_url/${orderId}`
      );
      console.log(data);
      if (data.link_payment) {
         window.location.href = data.link_payment;
      }
   } catch (error) {
      dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
   }
};

export const updatePayment = (reqData) => async (dispatch) => {
   dispatch({ type: UPDATE_PAYMENT_REQUEST });
   try {
      const { data } = await api.get(
         `/api/payment/${reqData.orderId}?paymentId=${reqData.paymentId}&PayerID=${reqData.payerId}`
      );
      console.log(data);
   } catch (error) {
      dispatch({ type: UPDATE_PAYMENT_FAILURE, payload: error.message });
   }
};
