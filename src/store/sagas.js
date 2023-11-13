import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";

//calendar
import calendarSaga from "./calendar/saga";
//chat
import chatSaga from "./chat/saga";
//ecommerce
import ecommerceSaga from "./ecommerce/saga";

//Project
import projectSaga from "./projects/saga";
// Task
import taskSaga from "./tasks/saga";
// Crypto
//TicketsList
import ticketsSaga from "./tickets/saga";

//invoice
import invoiceSaga from "./invoice/saga";
//mailbox
import mailboxSaga from "./mailbox/saga";


// Dashboard Crypto
import watchDeviceData from "./deviceData/saga";

// Dashboard Project
import dashboardProjectSaga from "./dashboardProject/saga";

// Dashboard NFT

// Pages > Team
import teamSaga from "./team/saga";

// File Manager
import fileManager from "./fileManager/saga";

// To do
import todos from "./todos/saga"

//Job
import jobSaga from "./job/saga";

//API Key
import APIKeysaga from "./apikey/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(chatSaga),
    fork(projectSaga),
    fork(taskSaga),
    fork(ticketsSaga),
    fork(calendarSaga),
    fork(ecommerceSaga),
    fork(invoiceSaga),
    fork(mailboxSaga),
    fork(watchDeviceData),
    fork(dashboardProjectSaga),
    fork(teamSaga),
    fork(fileManager),
    fork(todos),
    fork(jobSaga),
    fork(APIKeysaga),
  ]);
}
