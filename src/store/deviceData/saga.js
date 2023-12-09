// sagas.js
import { put, takeLatest, call ,all, fork } from 'redux-saga/effects';
import {
FETCH_DEVICE_DATA_SUCCESS,
    FETCH_DEVICE_DATA,
    FETCH_DEVICE_DATA_FAILURE,
    FETCH_ACCOUNT_ID,
    FETCH_ACCOUNT_ID_SUCCESS,
    FETCH_ACCOUNT_ID_FAILURE
} from "./actionType";

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
function* fetchDeviceDataSaga({payload:deviceId}) {
  try {
    const status = yield call(getDeviceDataStatus, deviceId);
    // console.log(status)
    const series = yield call(getDeviceDataTimeSeries, deviceId);
    yield put({ type: FETCH_DEVICE_DATA_SUCCESS, series: series,status:status, deviceId:deviceId});
  } catch (error) {
    yield put({ type: FETCH_DEVICE_DATA_FAILURE, error: error.message });
  }
}

function* fetchAccountIDsSaga({ accountID }) {
  try {
    // console.log('Got to Saga!')
    // const response = yield call(getAccountDevices, 'testAccount');
    // // console.log(response)
    //
    // const devices = response.filter(device => device !== null).map(device =>  ({...device, status:'Active'}))


    const response2 = yield call(getAccountDevices, 'test account');
    // console.log(response2)

    const devices2 = response2.filter(device => device !== null).map(device2 =>  ({...device2, status:'Active'}))
    const response3 = yield call(getAccountDevices, 'default');
    // console.log(response2)

    const devices3 = response3.filter(device => device !== null).map(device =>  ({...device, status:'Active'}))
    const combinedDevices = [ ...devices2,...devices3];
    console.log(combinedDevices)

    yield put({ type: FETCH_ACCOUNT_ID_SUCCESS, devices: combinedDevices });
  } catch (error) {
    console.log('error',error)
    yield put({ type: FETCH_ACCOUNT_ID_SUCCESS, error: error.message,victory:['No'] });
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