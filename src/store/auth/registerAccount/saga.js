import {takeEvery, fork, put, all, call} from "redux-saga/effects";
import axios from "axios";
//Account Redux states
import {REGISTER_ACCOUNT} from "./actionTypes";
import {registerAccountSuccessful, registerAccountFailed} from "./action";

//Include Both Helper File with needed methods
import {getFirebaseBackend} from "../../../helpers/firebase_helper";
import {

    registerAccountCall,
} from "../../../helpers/backend_helper";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
function* registerAccount({payload: {clientName, clientEmail}}) {
    try {
        console.log({
            "clientName": clientName,
            "clientEmail": clientEmail
        })
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
// clientName, deviceDescription,deviceGroupID,deviceType
//         let data = JSON.stringify({
//             "clientName": "Waichak1234",
//             "clientEmail": "waichak1234.luk@gmail.com"
//         });
//
//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'https://api.secondsunlabs.com/Register/account',
//             headers: {
//                 'x-api-key': 'SSL_API.8WkkjctJLH6eUwbhUo+2In/2nPQhr72KOAyEZ70En2c=',
//                 'Content-Type': 'application/json'
//             },
//             data: data
//         };
//         axios.request(config)
//             .then((response) => {
//                 console.log(JSON.stringify(response.data));
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
        const response = yield call(registerAccountCall, clientName, clientEmail)
        if (response.message === "success") {
            yield put(registerAccountSuccessful(response));
        } else {
            yield put(registerAccountFailed(response));
        }


    } catch
        (error
        ) {
        yield put(registerAccountFailed(error));
    }
}

export function* watchAccountRegister() {
    yield takeEvery(REGISTER_ACCOUNT, registerAccount);
}

function* accountSaga() {
    yield all([fork(watchAccountRegister)]);
}

export default accountSaga;
