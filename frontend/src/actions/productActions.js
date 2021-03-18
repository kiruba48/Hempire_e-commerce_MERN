import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_SECTION_LIST_REQUEST,
  PRODUCT_SECTION_LIST_SUCCESS,
  PRODUCT_SECTION_LIST_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../constants/productConstants';

//   Action Creators
// @description Action creator for all products
export const listOfProducts = (keyword = '', page = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // Making request to server for products
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&page=${page}`
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   Action Creators
// @description Action creator for all products
export const listOfProductsBySection = (
  section,
  minPrice,
  maxPrice,
  size
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SECTION_LIST_REQUEST });

    // Making request to server for products
    const { data } = await axios.get(
      `/api/products?sex=${section}&price[gte]=${minPrice}&price[lte]=${maxPrice}&size=${size}`
    );
    dispatch({
      type: PRODUCT_SECTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SECTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   Action Creators
// @description Action creator for all products
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    // Making request to server for products
    const { data } = await axios.get(`/api/products?sort=rating`);
    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   Action Creators
// @description Action creator for product details page
export const productDetailsAction = (productID) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // Making request to server for products
    const { data } = await axios.get(`/api/products/${productID}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   Action Creators
// @description Action creator for DELETE PRODUCT BY ADMIN
export const productDeleteAction = (productID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      //Configuration for axios request
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Making request to server for products
    await axios.delete(`/api/products/${productID}`, config);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   Action Creators
// @description Action creator for UPDATE PRODUCT BY ADMIN
export const productUpdateAction = (productId, product) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

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

    // Making request to server for products
    const { data } = await axios.patch(
      `/api/products/${productId}`,
      product,
      config
    );
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   Action Creators
// @description Action creator for CREATE PRODUCT BY ADMIN
export const productCreateAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

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

    // Making request to server for products
    const { data } = await axios.post(`/api/products`, product, config);
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: PRODUCT_DETAILS_SUCCESS,
    //   payload: data,
    // });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   Action Creators
// @description Action creator for CREATE PRODUCT REVIEW BY USERS
export const productReviewCreateAction = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

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

    // Making request to server for products
    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      config
    );
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: PRODUCT_DETAILS_SUCCESS,
    //   payload: data,
    // });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
