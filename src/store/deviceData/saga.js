// sagas.js
import { put, takeLatest, call ,all, fork } from 'redux-saga/effects';
import {
FETCH_DEVICE_DATA_SUCCESS,
    FETCH_DEVICE_DATA,
    FETCH_DEVICE_DATA_FAILURE,
    FETCH_ACCOUNT_ID,
    FETCH_ACCOUNT_ID_SUCCESS
} from "./actionType";

import {
  getJanSalesData,
    getAccountDevices
}
  from "../../helpers/fakebackend_helper";
import {watchGetProjectStatusChartsData} from "../dashboardProject/saga";
// import {watchGetBalanceChartsData, watchGetDialChartsData, watchGetSalesChartsData} from "../dashboardCRM/saga";
// import {GET_SALESFORECAST_CHARTS_DATA} from "../dashboardCRM/actionType";

// Replace 'yourApiCallFunction' with the actual function to make the API request
function* fetchDeviceDataSaga() {
  try {
    const response = yield call(getJanSalesData, 'http://35.160.4.251:5000/Devices/demoFast');
    yield put({ type: FETCH_DEVICE_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_DEVICE_DATA_FAILURE, error: error.message });
  }
}

function* fetchAccountIDsSaga({ accountID }) {
  try {
    console.log('Got to Saga!')
    const response = yield call(getAccountDevices, 'testAccount');
    console.log(response)

    const devices = response.map(device =>  ({...device, status:'Active'}))


    const response2 = yield call(getAccountDevices, 'test account');
    console.log(response2)

    const devices2 = response2.map(device2 =>  ({...device2, status:'Active'}))

    const combinedDevices = [...devices, ...devices2];

    yield put({ type: FETCH_ACCOUNT_ID_SUCCESS, devices: combinedDevices });
  } catch (error) {
    console.log('error',error)
    yield put({ type: FETCH_ACCOUNT_ID_SUCCESS, error: error.message,victory:['No Fuck you'] });
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