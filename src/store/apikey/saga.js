import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Application Redux States
import { GET_API_KEY ,LOGIN_WITH_API_KEY} from "./actionType";
import { APIKeyResponseSuccess, APIKeyResponseError } from "./action";

//Include Both Helper File with needed methods
import { getAPIKey as getAPIKeyApi } from "../../helpers/backend_helper";

function* getAPIKeys({payload:{apikey}}) {

  try {
    // const response = yield call(getAPIKeyApi);
    yield put(APIKeyResponseSuccess(GET_API_KEY, apikey));
  } catch (error) {
    yield put(APIKeyResponseError(GET_API_KEY, error));
  }
}

function* checkAPIKeys({payload:{apikey}}) {
  try {
    // const response = yield call(getAPIKeyApi);
    yield put(APIKeyResponseSuccess(GET_API_KEY, apikey ));
  } catch (error) {
    yield put(APIKeyResponseError(GET_API_KEY, error));
  }
}

export function* watchGetAPIKeygetAPIKey() {
  yield takeEvery(GET_API_KEY, getAPIKeys);
  yield takeEvery(LOGIN_WITH_API_KEY, checkAPIKeys);
}

function* APIKeysaga() {
  yield all([fork(watchGetAPIKeygetAPIKey)]);
}

export default APIKeysaga;
