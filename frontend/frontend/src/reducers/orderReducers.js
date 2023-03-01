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

export const orderDetailReducer = (
  state = { loading: true, orderDishes: [] },
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
    default:
      return state;
  }
};

export const orderChangeReducer = (state = { filteredDish: [] }, action) => {
  switch (action.type) {
    case ORDER_ADD_ITEM:
      const item = action.payload;
      console.log("ITEM in reducer: ", item.qty);
      console.log("Fdish: ", state.filteredDish);

      return {
        ...state,
        filteredDish: [...state.filteredDish, item],
      };

      //const existItem = state.orderDishes.find((x) => x.dish === item.dish);
      // if (existItem) {
      //     return {
      //         ...state,
      //         cartItems: state.orderDishes.map((x) =>
      //             x.dish === existItem.dish ? item : x
      //         ),
      //     };
      // } else {
      //     return {
      //         ...state,
      //         orderDishes: [...state.orderDishes, item],
      //     };
      // }
      console.log("object");

    default:
      return state;
  }
};
