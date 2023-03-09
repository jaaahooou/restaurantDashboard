import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
} from "../constants/orderConstants";
import axios from "axios";

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailReducer = async (
  state = { loading: true, order: [] },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_ADD_ITEM:
      const id = action.payload.id;
      console.log(id);

<<<<<<< HEAD
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                order: action.payload,
            };
        case ORDER_ADD_ITEM:
            //console.log(action.payload)
            return {
=======
      const getData = async () => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              //Authorization: "Bearer " + String(authTokens.access),
            },
          };
          const order = await axios.get(`/orders/get-order/${id}`, config);
          state.order.data.totalPrice = order.data.totalPrice + 10;
          return {
            loading: false,
            order: order,
          };
        } catch (err) {
          console.log(err);
        }
      };
      getData();
      console.log(state);
>>>>>>> c4ca97f134d5424a8d717d8fef754b1a1ebe1292

      return {
        loading: false,
        order: order,
      };

    default:
      return state;
  }
};

// return {
//   ...state,
//   orderDishes: state.orderDishes.map((x) =>
//     x.id == item.filteredDish.id
//       ? { ...item.filteredDish, qty: item.filteredDish.qty + 1 }
//       : x
//   ),
// };
