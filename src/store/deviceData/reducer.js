// reducer.js
import {
    FETCH_DEVICE_DATA_SUCCESS,
    FETCH_DEVICE_DATA,
    FETCH_DEVICE_DATA_FAILURE, FETCH_ACCOUNT_ID,
    FETCH_ACCOUNT_ID_SUCCESS

} from "./actionType";

const initialState = {
    data: null,
    loading: false,
    error: null,
    devices: [],
};

const DeviceReducer = (state = initialState, action) => {
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
                error: null,
            };
        case FETCH_DEVICE_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.error, // Store the error message here
            };
        case FETCH_ACCOUNT_ID:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ACCOUNT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                devices: action.devices,
                error: null,
            };
        default:
            return state;
    }
};


export default DeviceReducer;
