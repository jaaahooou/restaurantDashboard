import {
  DISH_LIST_REQUEST,
  DISH_LIST_SUCCESS,
  DISH_LIST_FAIL,
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
