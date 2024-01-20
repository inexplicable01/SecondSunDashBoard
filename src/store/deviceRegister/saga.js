import {takeEvery, fork, put, all, call} from "redux-saga/effects";

//Account Redux states
import {REGISTER_DEVICE} from "./actionTypes";
import {registerDeviceSuccessful, registerDeviceFailed} from "./action";

//Include Both Helper File with needed methods
// import {getFirebaseBackend} from "../../../helpers/firebase_helper";
import {
    registerDeviceCall,
} from "../../helpers/backend_helper";

// initialize relavant method of both Auth
// const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
function* registerdevice({payload: {clientName, deviceDescription, deviceGroupID, deviceType, id}, navigate:navigate}) {
    try {
        // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        //   const response = yield call(
        //     fireBaseBackend.registerUser,
        //     user.email,
        //     user.password
        //   );
        //   yield put(registerUserSuccessful(response));
        // } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
        //   const response = yield call(postJwtRegister, "/post-jwt-register", user);
        //   yield put(registerUserSuccessful(response));
        // } else if (process.env.REACT_APP_API_URL) {
        //   const response = yield call(postFakeRegister, user);
        //   if (response.message === "success") {
        //     yield put(registerUserSuccessful(response));
        //   } else {
        //     yield put(registerUserFailed(response));
        //   }
        // }

        const response = yield call(
            registerDeviceCall, {
                clientName: clientName,
                deviceDescription: deviceDescription,
                deviceGroupID: deviceGroupID,
                deviceType: deviceType
            }, id
        );
        if ('deviceId' in response) {
            yield put(registerDeviceSuccessful(response,navigate));
        } else {
            yield put(registerDeviceFailed(response));
        }


    } catch (error) {
        console.log(error)
        yield put(registerDeviceFailed(error));

    }
}

export function* watchDeviceRegister() {
    yield takeEvery(REGISTER_DEVICE, registerdevice);
}

function* registerDeviceSaga() {
    yield all([fork(watchDeviceRegister)]);
}

export default registerDeviceSaga;
