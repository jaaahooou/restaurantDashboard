import {
  TABLES_LIST_REQUEST,
  TABLES_LIST_SUCCESS,
  TABLES_LIST_FAIL,
} from "../constants/tablesConstants";

export const listTablesReducer = (state = { tables: [] }, action) => {
  switch (action.type) {
    case TABLES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case TABLES_LIST_SUCCESS:
      return {
        loading: false,
        tables: action.payload,
      };

    case TABLES_LIST_FAIL:
      return {
        loading: false,
        tables: action.payload,
      };
    default:
      return state;
  }
};
