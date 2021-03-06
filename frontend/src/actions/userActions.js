import axios from 'axios';
import { ORDER_MY_ORDERS_RESET } from '../constants/orderConstants';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAILURE,
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_PASSWORD_CHANGE_FAILURE,
  USER_DETAILS_FAILURE,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_ADMINS_REQUEST,
  USER_UPDATE_ADMINS_SUCCESS,
  USER_UPDATE_ADMINS_FAILURE,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAILURE,
  USER_RESET_PASSWORD_CONFIRM_REQUEST,
  USER_RESET_PASSWORD_CONFIRM_SUCCESS,
  USER_RESET_PASSWORD_CONFIRM_FAILURE,
} from '../constants/userConstants';

// USER LOGIN
export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // Fetching user details for server
    const config = {
      //Configuration for axios request
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// USER REGISTRATION
export const userRegisterAction = (name, email, password) => async (
  dispatch
) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    // Fetching user details for server
    const config = {
      //Configuration for axios request
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // Login the user as soon as they register.
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// USER LOGOUT
export const logoutAction = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: USER_LOGOUT,
  });

  dispatch({
    type: USER_DETAILS_RESET,
  });

  dispatch({
    type: ORDER_MY_ORDERS_RESET,
  });

  dispatch({
    type: USER_LIST_RESET,
  });
};

// GET USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      //Configuration for axios request
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // id is GOING to be 'profile' when we access this from logged in user.
    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    // Updating the user details stored in the state and local storage
    if (id === 'profile') {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET ALL USER DETAILS (ONLY ADMIN)
export const getAllUserAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      //Configuration for axios request
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// PATCH UPDATE USER DETAILS
export const updateUserDetailsAction = (name, email) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_DETAILS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      //Configuration for axios request
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // id is goning to be 'profile' when we access this from logged in user.
    const { data } = await axios.patch(
      `/api/users/updateUser`,
      { name, email },
      config
    );

    dispatch({
      type: USER_DETAILS_UPDATE_SUCCESS,
      payload: data,
    });

    // Updating the user details stored in the state and local storage
    // dispatch({
    //   type: USER_DETAILS_SUCCESS,
    //   payload: data,
    // });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_UPDATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// PATCH UPDATE USER PASSWORD DETAILS
export const updateUserPasswordAction = (
  passwordCurrent,
  password,
  passwordConfirm
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PASSWORD_CHANGE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      //Configuration for axios request
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // id is goning to be 'profile' when we access this from logged in user.
    const { data } = await axios.patch(
      `/api/users/updatePassword`,
      { passwordCurrent, password, passwordConfirm },
      config
    );

    dispatch({
      type: USER_PASSWORD_CHANGE_SUCCESS,
      payload: data,
    });

    // Updating the user details stored in the state and local storage
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_CHANGE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE USER
export const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      //Configuration for axios request
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // id is goning to be 'profile' when we access this from logged in user.
    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE USER
export const userUpdateByAdminAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_ADMINS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      //Configuration for axios request
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // id is goning to be 'profile' when we access this from logged in user.
    const { data } = await axios.patch(`/api/users/${user._id}`, user, config);

    dispatch({
      type: USER_UPDATE_ADMINS_SUCCESS,
    });

    // Dispatch update user Detail.
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ADMINS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// FORGOT PASSWORD PUBLIC
export const userForgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RESET_PASSWORD_REQUEST,
    });

    // Fetching user details for server
    const config = {
      //Configuration for axios request
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.post('/api/users/forgotPassword', { email }, config);

    dispatch({
      type: USER_RESET_PASSWORD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// FORGOT PASSWORD CONFIRM REQUEST PUBLIC
export const userForgotPasswordConfirmAction = (password, token) => async (
  dispatch
) => {
  try {
    dispatch({
      type: USER_RESET_PASSWORD_CONFIRM_REQUEST,
    });

    // Fetching user details for server
    const config = {
      //Configuration for axios request
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.patch(
      `/api/users/resetPassword/${token}`,
      { password },
      config
    );

    dispatch({
      type: USER_RESET_PASSWORD_CONFIRM_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_CONFIRM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
