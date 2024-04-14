// reducer.js
import {
    FETCH_DEVICE_DATA_SUCCESS,
    FETCH_DEVICE_DATA,
    FETCH_DEVICE_DATA_FAILURE, FETCH_ACCOUNT_ID,
    FETCH_ACCOUNT_ID_SUCCESS, FETCH_ACCOUNT_ID_FAILURE

} from "./actionType";

const initialState = {
    data: null,
    loading: false,
    alldeviceloading:false,
    error: null,
    devices: [],
    deviceData:{},
    curdevice:null,
    locationhistory:[]
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
                deviceData:{...state.deviceData,
                    [action.deviceId]:{
                        dataseries:[...action.series].reverse(),
  //                       locationhistory:action.series
  // .filter(item => item.coordinates && item.coordinates.latitude != null && item.coordinates.longitude != null)
  // .map(item => [item.coordinates.longitude, item.coordinates.latitude, item.locationAccuracy]),
                        currenthumidity:action.status['humidity'],
                        currentluminosity:action.status['light'],
                        currentshock:action.status['accelerationG']
                        //                         currenthumidity:99,
                        // currentluminosity:99,
                        // currentshock:99
                }
                },
                curdevice:action.deviceId,
                // locationhistory:[[-122.3192532,42.6610025] ,[-122.0613245,43.6092392] ,
                //             [-122.0613245,45.6092392],[-122.0613245,48.6092392]  ]
            };
        case FETCH_DEVICE_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.error, // Store the error message here
                curdevice:action.deviceId,
            };
        case FETCH_ACCOUNT_ID:
            return {
                ...state,
                alldeviceloading: true,
            };
        case FETCH_ACCOUNT_ID_SUCCESS:
            // console.log(action.devices)
            return {
                ...state,
                alldeviceloading: false,
                devices: action.devices,
                error: null,
            };
        case FETCH_ACCOUNT_ID_FAILURE:
            return {
                ...state,
                alldeviceloading: false,
                error: action.error, // Store the error message here
                // curdevice:action.deviceId,
            };
        default:
            return state;
    }
};


export default DeviceReducer;
