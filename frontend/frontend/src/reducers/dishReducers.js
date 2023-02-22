import {
  DISH_LIST_REQUEST,
  DISH_LIST_SUCCESS,
  DISH_LIST_FAIL,
  ORDER_DISH_LIST_REQUEST,
  ORDER_DISH_LIST_SUCCESS,
  ORDER_DISH_LIST_FAIL,
} from "../constants/dishConstants";

export const dishListReducer = (state = { dishes: [] }, action) => {
  switch (action.type) {
    case DISH_LIST_REQUEST:
      return { loading: true, dishes: [] };

    case DISH_LIST_SUCCESS:
      return { loading: false, dishes: action.payload };

    case DISH_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDishReducer = (state = { orderDishes: [] }, action) => {
  switch (action.type) {
    case ORDER_DISH_LIST_REQUEST:
      return { loading: true, orderDishes: [] };

    case ORDER_DISH_LIST_SUCCESS:
      return { loading: false, orderDishes: action.payload };

    case ORDER_DISH_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
