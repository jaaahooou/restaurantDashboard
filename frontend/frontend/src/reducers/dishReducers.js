import {
  DISH_LIST_REQUEST,
  DISH_LIST_SUCCESS,
  DISH_LIST_FAIL,
  ORDER_DISH_LIST_REQUEST,
  ORDER_DISH_LIST_SUCCESS,
  ORDER_DISH_LIST_FAIL,
} from "../constants/dishConstants";
import {
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_DELETE_ITEM,
  ORDER_ADD_NEW_ITEM,
} from "../constants/orderConstants";

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
    case ORDER_ADD_NEW_ITEM:
      const data = action.payload;

      const itemToAddToOrder = {
        order: data.id,
        dish: data.filteredDish.id,
        qty: 1,
      };

      return {
        ...state,
        orderDishes: [...state.orderDishes, itemToAddToOrder],
      };

    case ORDER_ADD_ITEM:
      const item = action.payload;

      return {
        ...state,
        orderDishes: state.orderDishes.map((x) =>
          x.id == item.filteredDish.id
            ? { ...item.filteredDish, qty: item.filteredDish.qty + 1 }
            : x
        ),
      };

    case ORDER_REMOVE_ITEM:
      const itemToRemove = action.payload;
      return {
        ...state,
        orderDishes: state.orderDishes.map((x) =>
          x.id == itemToRemove.filteredDish.id
            ? {
                ...itemToRemove.filteredDish,
                qty:
                  itemToRemove.filteredDish.qty > 1
                    ? itemToRemove.filteredDish.qty - 1
                    : itemToRemove.filteredDish.qty,
              }
            : x
        ),
      };

    case ORDER_DELETE_ITEM:
      const itemToDelete = action.payload.data;
      return {
        ...state,
        orderDishes: state.orderDishes.filter(
          (dishToDelete) => dishToDelete.id !== itemToDelete.orderedDishData.id
        ),
      };

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
