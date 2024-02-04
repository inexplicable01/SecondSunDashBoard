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


            // console.log(action.status)
            // console.log(action.series)
            // console.log('adsf')
            // locationhistory =
            // if (locationhistory.length<2){
            //     locationhistory = [
            //         [47.6610025, -122.3269672],  // Sao Paulo
            //         [47.6610025, -122.3269672]]
            // }
            // action.series.map(item=> [item.coordinates.latitude , item.coordinates.longitude])
            return {
                ...state,
                loading: false,
                error: null,
                deviceData:{...state.deviceData,
                    [action.deviceId]:{
    //                     time_temp:[...action.series].reverse().map(item => new Date(item.measurementTime)
    //                         .toLocaleTimeString('en-US', {
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     hour12: true
    // })),
    //                     temperaturehistory:[...action.series].reverse().map(item=> item.temperature),
                        dataseries:[...action.series].reverse(),
                        locationhistory:action.series
  .filter(item => item.coordinates && item.coordinates.latitude != null && item.coordinates.longitude != null)
  .map(item => [item.coordinates.longitude, item.coordinates.latitude]),
  //                       locationhistory:[[-122.3192532,42.6610025] ,[-122.0613245,43.6092392] ,
  //                           [-122.0613245,45.6092392],[-122.0613245,48.6092392]  ],
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
                loading: true,
            };
        case FETCH_ACCOUNT_ID_SUCCESS:
            // console.log(action.devices)
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
