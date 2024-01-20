import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
// //Auth
// import AccountSaga from "./auth/register/saga";
// import AuthSaga from "./auth/login/saga";
// import ForgetSaga from "./auth/forgetpwd/saga";
// import ProfileSaga from "./auth/profile/saga";
//
// //calendar
// import calendarSaga from "./TemplateReferences/calendar/saga";
// //chat
// import chatSaga from "./TemplateReferences/chat/saga";
// //ecommerce
// import ecommerceSaga from "./TemplateReferences/ecommerce/saga";
//
// //Project
// import projectSaga from "./TemplateReferences/projects/saga";
// // Task
// import taskSaga from "./TemplateReferences/tasks/saga";
// // Crypto
// //TicketsList
// import ticketsSaga from "./TemplateReferences/tickets/saga";
//
// //invoice
// import invoiceSaga from "./TemplateReferences/invoice/saga";
//mailbox
// import mailboxSaga from "./TemplateReferences/mailbox/saga";


// Dashboard Crypto
import watchDeviceData from "./deviceData/saga";

// Dashboard Project
// import dashboardProjectSaga from "./TemplateReferences/dashboardProject/saga";

// Dashboard NFT

// Pages > Team
// import teamSaga from "./TemplateReferences/team/saga";

// File Manager
// import fileManager from "./TemplateReferences/fileManager/saga";

// To do
// import todos from "./TemplateReferences/todos/saga"

//Job
// import jobSaga from "./TemplateReferences/job/saga";

//API Key
import APIKeysaga from "./apikey/saga";
import registerDeviceSaga from "./deviceRegister/saga"
import accountSaga from "./auth/registerAccount/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(accountSaga),
    // fork(AuthSaga),
    // fork(ForgetSaga),
    // fork(ProfileSaga),
    // fork(chatSaga),
    // fork(projectSaga),
    // fork(taskSaga),
    // fork(ticketsSaga),
    // fork(calendarSaga),
    // fork(ecommerceSaga),
    // fork(invoiceSaga),
    // fork(mailboxSaga),
    fork(watchDeviceData),
    // fork(dashboardProjectSaga),
    // fork(teamSaga),
    // fork(fileManager),
    // fork(todos),
    // fork(jobSaga),
    fork(APIKeysaga),
      fork(registerDeviceSaga)
  ]);
}
