// sagas.js
import {put, takeLatest, call, all, fork} from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_DEVICE_DATA_SUCCESS,
    FETCH_DEVICE_DATA,
    FETCH_DEVICE_DATA_FAILURE,
    FETCH_ACCOUNT_ID,
    FETCH_ACCOUNT_ID_SUCCESS,
    FETCH_ACCOUNT_ID_FAILURE
} from "./actionType";
import qs from 'qs';

import {
    getJanSalesData,
    getAccountDevices,
    getDeviceDataStatus,
    getDeviceDataTimeSeries
}
    from "../../helpers/backend_helper";
import {watchGetProjectStatusChartsData} from "../TemplateReferences/dashboardProject/saga";
// import {watchGetBalanceChartsData, watchGetDialChartsData, watchGetSalesChartsData} from "../dashboardCRM/saga";
// import {GET_SALESFORECAST_CHARTS_DATA} from "../dashboardCRM/actionType";

// Replace 'yourApiCallFunction' with the actual function to make the API request
function* fetchDeviceDataSaga({payload: deviceId}) {
    try {
        const status = yield call(getDeviceDataStatus, deviceId);

        // Get the current date and time
        const endTime = new Date().toISOString();

// Calculate the start time by subtracting 1 day (24 hours) from the current time
        const startTime = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString();

        // let params = qs.stringify({
        //     '': oneDayAgo.toISOString(),
        //     'endTime': now.toISOString()
        // });



        const series = yield call(getDeviceDataTimeSeries, deviceId,startTime,endTime)
        console.log(series)
        yield put({type: FETCH_DEVICE_DATA_SUCCESS, series: series, status: status, deviceId: deviceId});
    } catch (error) {
        yield put({type: FETCH_DEVICE_DATA_FAILURE, error: error.message});
    }
}

function* fetchAccountIDsSaga({accountID}) {
    try {
        // console.log('Got to Saga!')
        // const response = yield call(getAccountDevices, 'testAccount');
        // // console.log(response)
        //
        // const devices = response.filter(device => device !== null).map(device =>  ({...device, status:'Active'}))
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://api.secondsunlabs.com/Devices',
          headers: {
            'x-api-key': 'SSL_API.8WkkjctJLH6eUwbhUo+2In/2nPQhr72KOAyEZ70En2c='
          }
        };

        // axios.request(config)
        // .then((response) => {
        //   console.log(response);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });

        const response= yield call(getAccountDevices);
        const devices = response.filter(device => device !== null).map(device2 => ({...device2, status: 'Active'}))
        console.log(devices)
        yield put({type: FETCH_ACCOUNT_ID_SUCCESS, devices: devices});
    } catch (error) {
        console.log('error', error)
        yield put({type: FETCH_ACCOUNT_ID_SUCCESS, error: error.message, victory: ['No']});
    }
}

export function* watchDeviceDataFetch() {
    yield takeLatest(FETCH_DEVICE_DATA, fetchDeviceDataSaga);
}

export function* watchDeviceIDFetch() {
    yield takeLatest(FETCH_ACCOUNT_ID, fetchAccountIDsSaga);
}


function* watchDeviceData() {
    yield all([fork(watchDeviceDataFetch)]);
    yield all([fork(watchDeviceIDFetch)]);
}

export default watchDeviceData;