import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { dishListReducer, orderDishReducer } from "./reducers/dishReducers";
import { categoriesListReducer } from "./reducers/categoriesReducers";
import { orderListReducer, orderDetailReducer } from "./reducers/orderReducers";
import { listTablesReducer } from "./reducers/tablesReducers";

const reducer = combineReducers({
  dishList: dishListReducer,
  categoriesList: categoriesListReducer,
  orderDishList: orderDishReducer,
  tableList: listTablesReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailReducer,
});
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
