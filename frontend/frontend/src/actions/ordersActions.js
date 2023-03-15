import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_DELETE_ITEM,
  ORDER_ADD_NEW_ITEM,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (id) => async (dispatch) => {
  console.log("Działam");
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const authTokens = localStorage.setItem("authTokens", JSON.stringify(data));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    };
    const { data } = await axios.post(`/orders/create-order/${id}`, config);
    console.log("DATA IN ADD ORDER: ", data);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    console.log(error);
  }
};

export const listOrders = () => async (dispatch) => {
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
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
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const increaseDishQty = (filteredDish, id) => async (dispatch) => {
  const { data } = await axios.get(`/dishes/get-order-dish/${filteredDish.id}`);

  dispatch({
    type: ORDER_ADD_ITEM,
    payload: {
      data,
      id,
      filteredDish,
    },
  });

  const config = {
    headers: {
      "Content-type": "application/json",
    },
    body: {
      order: data.orderedDishData.order,
      dish: data.orderedDishData.dish,
      qty: data.orderedDishData.qty + 1,
    },
  };

  const { orderedDish } = await axios.post(
    `/orders/update-qty/${filteredDish.id}`,
    config
  );
};

export const addToOrder = (filteredDish, id) => async (dispatch) => {
  console.log("FilteredDish: ", filteredDish);

  const { data } = await axios.get("/dishes/get-order-dishes");

  const orderedDishes = data.filter((el) => el.order == id);
  console.log(orderedDishes);
  console.log(filteredDish);
  const ordereDishExist = orderedDishes.filter(
    (el) => el.dish == filteredDish.id
  );

  if (ordereDishExist.length < 1) {
    console.log("OrderderDishesExist: ", ordereDishExist);
    dispatch({
      type: ORDER_ADD_NEW_ITEM,
      payload: {
        id,
        filteredDish,
      },
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
      body: {
        dish: filteredDish.id,
        order: id,
        qty: 1,
        price: filteredDish.price,
      },
    };

    const { dishToAdd } = await axios.post(`/orders/add-dish-to-order`, config);
  }
  if (ordereDishExist.length > 0) {
    alert("Dish you want to add already exist in order. Try to increase qty");
  }
};

export const removeFromOrder = (filteredDish, id) => async (dispatch) => {
  //filteredDish - dish we want to change
  //id - order id
  const { data } = await axios.get(`/dishes/get-order-dish/${filteredDish.id}`);

  dispatch({
    type: ORDER_REMOVE_ITEM,
    payload: {
      data,
      id,
      filteredDish,
    },
  });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    body: {
      order: data.orderedDishData.order,
      dish: data.orderedDishData.dish,
      qty: data.orderedDishData.qty - 1,
    },
  };

  const { orderedDish } = await axios.post(
    `/orders/update-qty/${filteredDish.id}`,
    config
  );
};

export const deleteFromOrder = (filteredDish, id) => async (dispatch) => {
  //filteredDish - dish we want to change
  //id - order id
  const { data } = await axios.get(`/dishes/get-order-dish/${filteredDish.id}`);

  dispatch({
    type: ORDER_DELETE_ITEM,
    payload: {
      data,
      id,
      filteredDish,
    },
  });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const { orderedDish } = await axios.delete(
    `/orders/remove-dish-from-order/${filteredDish.id}`,
    config
  );
};
