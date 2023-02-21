import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { dishListReducer } from "./reducers/dishReducers";
import { categoriesListReducer } from "./reducers/categoriesReducers";

const reducer = combineReducers({
  dishList: dishListReducer,
  categoriesList: categoriesListReducer,
});
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
