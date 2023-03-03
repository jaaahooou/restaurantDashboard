import {
    DISH_LIST_REQUEST,
    DISH_LIST_SUCCESS,
    DISH_LIST_FAIL,
    ORDER_DISH_LIST_REQUEST,
    ORDER_DISH_LIST_SUCCESS,
    ORDER_DISH_LIST_FAIL,

} from "../constants/dishConstants";
import { ORDER_ADD_ITEM } from "../constants/orderConstants"

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
            console.log("item from payloadL: ", item.data)
            console.log("Id in rducer: ", action.payload.id)
            let changedItem = item.data.find(x=> x.id == item.filteredDish.id)
            console.log("Changed: ", changedItem)
            console.log("Filtered Dish",item.filteredDish)
            



            console.log("STATE: ", state)
            if (item) {
                console.log('Getting state')
                return {
                    ...state,
                    orderDishes: {...item,
                        qty: item.qty + 1
                    },
                };
            }

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