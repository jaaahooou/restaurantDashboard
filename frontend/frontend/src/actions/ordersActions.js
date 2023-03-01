import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
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

export const addToOrder = () => async(dispatch) => {};