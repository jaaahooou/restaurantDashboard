import {
    TABLES_LIST_REQUEST,
    TABLES_LIST_SUCCESS,
    TABLES_LIST_FAIL,
    ROOMS_LIST_REQUEST,
    ROOMS_LIST_SUCCESS,
    ROOMS_LIST_FAIL,
    CREATE_NEW_TABLE
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
            console.log("tables in reducer: ", action.payload.tables);
            console.log("table in reducer: ", action.payload.tableData);
            const tablesFromAction = action.payload.tables
            const tableToAdd = {
                id: action.payload.tables.length + 1,
                isOccupied: false,
                numberOfPersons: action.payload.tableData.numberOfPersons,
                room: action.payload.tableData.room.id,
                tableNumber: action.payload.tableData.tableNumber + 1
            }
            console.log(tableToAdd);
            return {
                loading: false,
                tables: [...tablesFromAction, tableToAdd]

            }

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