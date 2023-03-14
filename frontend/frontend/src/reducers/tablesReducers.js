import {
  TABLES_LIST_REQUEST,
  TABLES_LIST_SUCCESS,
  TABLES_LIST_FAIL,
  ROOMS_LIST_REQUEST,
  ROOMS_LIST_SUCCESS,
  ROOMS_LIST_FAIL,
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

export const listRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOMS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ROOMS_LIST_SUCCESS:
      return {
        loading: false,
        rooms: action.payload,
      };

    case ROOMS_LIST_FAIL:
      return {
        loading: false,
        rooms: action.payload,
      };
    default:
      return state;
  }
};
