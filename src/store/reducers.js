import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/registerUser/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Calendar
// import Calendar from "./TemplateReferences/calendar/reducer";
// //Chat
// import chat from "./TemplateReferences/chat/reducer";
// //Ecommerce
// import Ecommerce from "./TemplateReferences/ecommerce/reducer";

//Project
// import Projects from "./TemplateReferences/projects/reducer";
//
// // Tasks
// import Tasks from "./TemplateReferences/tasks/reducer";
// //Form advanced
// import changeNumber from "./TemplateReferences/formAdvanced/reducer";

//Crypto


//TicketsList
// import Tickets from "./TemplateReferences/tickets/reducer";
// //Crm
//
//
// //Invoice
// import Invoice from "./TemplateReferences/invoice/reducer";
//
// //Mailbox
// import Mailbox from "./TemplateReferences/mailbox/reducer";

// Dashboard Analytics


// Dashboard Cryto
import DeviceReducer from "./deviceData/reducer";

// Dashboard Cryto
// import DashboardProject from "./TemplateReferences/dashboardProject/reducer";



// Pages > Team
// import Team from "./TemplateReferences/team/reducer";
//
// // File Manager
// import FileManager from "./TemplateReferences/fileManager/reducer"
//
// // To do
// import Todos from "./TemplateReferences/todos/reducer"
//
// //Job
// import Jobs from "./TemplateReferences/job/reducer";

//API Key
import APIKey from "./apikey/reducer";
import deviceRegisterReducer from "./deviceRegister/reducer";
import AccountReducer from "./auth/registerAccount/reducer";

const rootReducer = combineReducers({
    // public
    Layout,
    Login,
    Account,
    ForgetPassword,
    Profile,
    AccountReducer,
    // Calendar,
    // chat,
    // Projects,
    // Ecommerce,
    // Tasks,
    // changeNumber,
    // Tickets,
    // Invoice,
    // Mailbox,
    DeviceReducer,
    // DashboardProject,
    // Team,
    // FileManager,
    // Todos,
    // Jobs,
    APIKey,
    deviceRegisterReducer
});

export default rootReducer;