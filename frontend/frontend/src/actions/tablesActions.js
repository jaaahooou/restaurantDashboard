import {
    TABLES_LIST_REQUEST,
    TABLES_LIST_SUCCESS,
    TABLES_LIST_FAIL,
    ROOMS_LIST_REQUEST,
    ROOMS_LIST_SUCCESS,
    ROOMS_LIST_FAIL,
    CREATE_NEW_TABLE,
    CREATE_NEW_TABLE_FAIL,
} from "../constants/tablesConstants";

import axios from "axios";

export const listTables = () => async(dispatch) => {
    try {
        const { data } = await axios.get("/orders/get-tables");
        dispatch({
            type: TABLES_LIST_REQUEST,
        });

        dispatch({
            type: TABLES_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: TABLES_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};

export const listRooms = () => async(dispatch) => {
    try {
        const { data } = await axios.get("/orders/get-rooms");
        dispatch({
            type: ROOMS_LIST_REQUEST,
        });

        dispatch({
            type: ROOMS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROOMS_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};

export const createNewTable =
    (room, numberOfPersons, tables, rooms) => async(dispatch, getState) => {
        function findTableRoom(tableRoom) {
            return tableRoom.name === room;
        }

        // Find table room
        let roomObject = rooms.find(function(filteredRoom) {
            return filteredRoom.name == room;
        });

        //table array is used to get number of next table
        let tableArray = tables.filter(function(filteredTable) {
            return filteredTable.room === roomObject.id;
        });

        const tableRoomToSend = rooms.find(findTableRoom);
        console.log("Room: ", roomObject);
        console.log("tableArray: ", tableArray.length);

        console.log(tables);
        const tableData = {
            room: tableRoomToSend,
            tableNumber: tableArray.length + 1,
            numberOfPersons: numberOfPersons,
            isOccupied: false,
        }
        try {
            dispatch({
                type: CREATE_NEW_TABLE,
                payload: {
                    tableData,

                },
            });

            const config = {
                headers: {
                    "Content-type": "application/json",

                },
                body: {
                    tableData
                },
            };

            const { data } = await axios.post("orders/create-new-table", config);
        } catch (error) {
            dispatch({
                type: CREATE_NEW_TABLE_FAIL,
                payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message,
            });
        }
    };
// room = models.ForeignKey(Room, on_delete=models.CASCADE)
// tableNumber = models.IntegerField(null=False, blank=False)
// numberOfPersons = models.IntegerField(null=False, blank=False, default =2)
// isOccupied = models.BooleanField(null=False, blank=False, default=False)