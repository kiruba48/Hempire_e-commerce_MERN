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
  USER_DETAILS_FAILURE,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAILURE,
  USER_DETAILS_UPDATE_RESET,
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_PASSWORD_CHANGE_FAILURE,
  USER_PASSWORD_CHANGE_RESET,
  USER_DETAILS_RESET,
} from '../constants/userConstants';

// Reducer function
// @description Reducer for user Registration
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer function
// @description Reducer for user login
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// Reducer function
// @description Reducer for accessing user data
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, detailSuccess: true, user: action.payload };
    case USER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

// Reducer function
// @description Reducer for updating user data
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_UPDATE_REQUEST:
      return { loading: true };
    case USER_DETAILS_UPDATE_SUCCESS:
      return { loading: false, updateSuccess: true, userInfo: action.payload };
    case USER_DETAILS_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    case USER_DETAILS_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

// Reducer function
// @description Reducer for updating user password
export const userPasswordUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_CHANGE_REQUEST:
      return { loading: true };
    case USER_PASSWORD_CHANGE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_PASSWORD_CHANGE_FAILURE:
      return { loading: false, error: action.payload };
    case USER_PASSWORD_CHANGE_RESET:
      return {};

    default:
      return state;
  }
};
