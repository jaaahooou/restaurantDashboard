import {
<<<<<<< HEAD
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
=======
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_ADD_ITEM,
>>>>>>> d53edf3f99324f7a686521f7158257e68266adae
} from "../constants/orderConstants";
import axios from "axios";

export const listOrders = () => async(dispatch) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        const { data } = await axios.get("/orders/get-orders");
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message,
        });
    }
};

export const getOrderDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json",
                //Authorization: "Bearer " + String(authTokens.access),
            },
        };
        const { data } = await axios.get(`/orders/get-order/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message,
        });
    }
};

<<<<<<< HEAD
export const addToOrder = () => async(dispatch) => {};
=======
export const addToOrder = (filteredDish, qty) => async (dispatch) => {
  const { data } = await axios.get(`/dishes/get-order-dish/${filteredDish.id}`);

  dispatch({
    type: ORDER_ADD_ITEM,
    payload: {
      order: data.order,
      dish: data.dish,
      qty: data.qty + 1,
    },
  });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    body: {
      order: data.order,
      dish: data.dish,
      qty: data.qty + 1,
    },
  };

  //const { orderedDish } = await axios.post(`/orders/update-qty/${id}`, config);

  // dispatch : order, dish, qty
};
>>>>>>> d53edf3f99324f7a686521f7158257e68266adae
