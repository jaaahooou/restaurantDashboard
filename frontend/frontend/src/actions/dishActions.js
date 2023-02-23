import axios from "axios";

import {
  DISH_LIST_REQUEST,
  DISH_LIST_SUCCESS,
  DISH_LIST_FAIL,
  ORDER_DISH_LIST_REQUEST,
  ORDER_DISH_LIST_SUCCESS,
  ORDER_DISH_LIST_FAIL,
} from "../constants/dishConstants";

export const listDishes = () => async (dispatch) => {
  try {
    dispatch({ type: DISH_LIST_REQUEST });
    const { data } = await axios.get("/dishes/get-dishes");
    dispatch({
      type: DISH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrderDishes = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DISH_LIST_REQUEST });
    const { data } = await axios.get("/dishes/get-order-dishes");

    const orderedDishes = data.filter((el) => el.order == id);

    dispatch({
      type: ORDER_DISH_LIST_SUCCESS,
      payload: orderedDishes,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DISH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
