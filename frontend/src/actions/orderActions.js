import axios from 'axios';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from '../constants/orderConstants';

// USER LOGIN
export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // Fetching user details for server
    const config = {
      //Configuration for axios request
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post('/api/orders', order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    //   localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
