import { api } from "../../config/apiConfig";
import { API_BASE_URL } from "../../config/apiConfig";
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

const getUsersRequest = () => ({
   type: GET_USERS_REQUEST,
});
const getUsersSuccess = (user) => ({
   type: GET_USERS_SUCCESS,
   payload: user,
});
const getUsersFailure = (error) => ({
   type: GET_USERS_FAILURE,
   payload: error,
});

const editUserRequest = () => ({
   type: EDIT_USER_REQUEST,
});
const editUserSuccess = (user) => ({
   type: EDIT_USER_SUCCESS,
   payload: user,
});
const editUserFailure = (error) => ({
   type: EDIT_USER_FAILURE,
   payload: error,
});

const deleteUserRequest = () => ({
   type: DELETE_USER_REQUEST,
});
const deleteUserSuccess = (user) => ({
   type: DELETE_USER_SUCCESS,
   payload: user,
});
const deleteUserFailure = (error) => ({
   type: DELETE_USER_FAILURE,
   payload: error,
});

export const getUsers = (userData) => async (dispatch) => {
   dispatch(getUsersRequest());
   try {
      const response = await api.get(
         `${API_BASE_URL}/api/admin/users/find?pageSize=${userData.pageSize}&pageNumber=${userData.pageNumber}`
      );
      const users = response.data;
      console.log(users);
      dispatch(getUsersSuccess(users));
   } catch (error) {
      dispatch(getUsersFailure(error.message));
   }
};

export const editUser = (userData) => async (dispatch) => {
   dispatch(editUserRequest());
   try {
      const response = await api.put(
         `${API_BASE_URL}/api/admin/users/update`,
         userData
      );
      const user = response.data;
      dispatch(editUserSuccess(user));
   } catch (error) {
      dispatch(editUserFailure(error.message));
   }
};

export const deleteUser = (userId) => async (dispatch) => {
   dispatch(deleteUserRequest());
   try {
      const response = await api.delete(
         `${API_BASE_URL}/api/admin/users/delete/${userId}`
      );
      const user = response.data;
      dispatch(deleteUserSuccess(user));
   } catch (error) {
      dispatch(deleteUserFailure(error.message));
   }
};
