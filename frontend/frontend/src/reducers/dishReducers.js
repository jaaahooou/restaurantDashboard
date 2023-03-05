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
      console.log("Item to delete: ", itemToDelete.id);
      const ItemToDeleteIndex = state.orderDishes.findIndex(
        (x) => x.id == itemToDelete.id
      );
      console.log(state.orderDishes);
      console.log("Index: ", ItemToDeleteIndex);

      return {
        ...state,
        orderDishes: state.orderDishes.splice(ItemToDeleteIndex, 1),
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
