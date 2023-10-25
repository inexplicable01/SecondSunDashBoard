// sagas.js
import { put, takeLatest, call ,all, fork } from 'redux-saga/effects';
import {
FETCH_DEVICE_DATA_SUCCESS,
    FETCH_DEVICE_DATA,
    FETCH_DEVICE_DATA_FAILURE
} from "./actionType";

import {
  getJanSalesData
}
  from "../../helpers/fakebackend_helper";
import {watchGetBalanceChartsData, watchGetDialChartsData, watchGetSalesChartsData} from "../dashboardCRM/saga";
import {GET_SALESFORECAST_CHARTS_DATA} from "../dashboardCRM/actionType";

// Replace 'yourApiCallFunction' with the actual function to make the API request
function* fetchDeviceDataSaga() {
  try {
    const response = yield call(getJanSalesData, 'http://35.160.4.251:5000/Devices/demoFast');
    yield put({ type: FETCH_DEVICE_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_DEVICE_DATA_FAILURE, error: error.message });
  }
}

export function* watchDeviceDataFetch() {
  yield takeLatest(FETCH_DEVICE_DATA, fetchDeviceDataSaga);
}


function* watchDeviceData() {
  yield all([fork(watchDeviceDataFetch)]);

}

export default watchDeviceData;