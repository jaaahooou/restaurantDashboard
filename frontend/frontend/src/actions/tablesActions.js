import {
  TABLES_LIST_REQUEST,
  TABLES_LIST_SUCCESS,
  TABLES_LIST_FAIL,
} from "../constants/tablesConstants";

import axios from "axios";

export const listTables = () => async (dispatch) => {
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
