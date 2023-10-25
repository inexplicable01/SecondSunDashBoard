// reducer.js
import {
FETCH_DEVICE_DATA_SUCCESS,
    FETCH_DEVICE_DATA,
    FETCH_DEVICE_DATA_FAILURE
} from "./actionType";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const deviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEVICE_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DEVICE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload, // Store the fetched data here
        error: null,
      };
    case FETCH_DEVICE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error, // Store the error message here
      };
    default:
      return state;
  }
};

export default deviceReducer;
