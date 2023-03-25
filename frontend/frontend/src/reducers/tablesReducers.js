import {
  TABLES_LIST_REQUEST,
  TABLES_LIST_SUCCESS,
  TABLES_LIST_FAIL,
  ROOMS_LIST_REQUEST,
  ROOMS_LIST_SUCCESS,
  ROOMS_LIST_FAIL,
  CREATE_NEW_TABLE,
  REMOVE_TABLE,
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

    case CREATE_NEW_TABLE:
      const tablesFromAction = action.payload.tables;
      const tableToAdd = {
        id: action.payload.tables.length + 1,
        isOccupied: false,
        numberOfPersons: action.payload.tableData.numberOfPersons,
        room: action.payload.tableData.room.id,
        tableNumber: action.payload.tableData.tableNumber + 1,
      };
      console.log(tableToAdd);
      return {
        loading: false,
        tables: [...tablesFromAction, tableToAdd],
      };

    case REMOVE_TABLE:
      const tablesFromRemoveAction = action.payload.tablesAfterRemove;

      return {
        loading: false,
        tables: [...tablesFromRemoveAction],
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
