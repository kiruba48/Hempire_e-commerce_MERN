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
  USER_UPDATE_ADMINS_RESET,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAILURE,
  USER_RESET_PASSWORD_CONFIRM_REQUEST,
  USER_RESET_PASSWORD_CONFIRM_SUCCESS,
  USER_RESET_PASSWORD_CONFIRM_FAILURE,
  USER_RESET_PASSWORD_RESET,
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
      return { user: {} };

    default:
      return state;
  }
};

// Reducer function
// @description Reducer TO GET ALL USERS (ADMIN ONLY)
export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, success: true, users: action.payload };
    case USER_LIST_FAILURE:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
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

// Reducer function
// @description Reducer for DELETING USER
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// Reducer function
// @description Reducer for UPDATING USER DETAIL BY ADMIN
export const userUpdateByAdminReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_ADMINS_REQUEST:
      return { loading: true };
    case USER_UPDATE_ADMINS_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_ADMINS_FAILURE:
      return { loading: false, error: action.payload };
    case USER_UPDATE_ADMINS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

// Reducer function
// @description Reducer for FORGOT PASSWORD USER
export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case USER_RESET_PASSWORD_FAILURE:
      return { loading: false, error: action.payload };
    case USER_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

// Reducer function
// @description Reducer for FORGOT PASSWORD CONFIRM REQUEST USER
export const userForgotPasswordConfirmReducer = (
  state = { user: {} },
  action
) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_CONFIRM_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_CONFIRM_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_RESET_PASSWORD_CONFIRM_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
