import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Calendar
import Calendar from "./calendar/reducer";
//Chat
import chat from "./chat/reducer";
//Ecommerce
import Ecommerce from "./ecommerce/reducer";

//Project
import Projects from "./projects/reducer";

// Tasks
import Tasks from "./tasks/reducer";
//Form advanced
import changeNumber from "./formAdvanced/reducer";

//Crypto


//TicketsList
import Tickets from "./tickets/reducer";
//Crm


//Invoice
import Invoice from "./invoice/reducer";

//Mailbox
import Mailbox from "./mailbox/reducer";

// Dashboard Analytics


// Dashboard Cryto
import DeviceReducer from "./deviceData/reducer";

// Dashboard Cryto
import DashboardProject from "./dashboardProject/reducer";



// Pages > Team
import Team from "./team/reducer";

// File Manager
import FileManager from "./fileManager/reducer"

// To do
import Todos from "./todos/reducer"

//Job 
import Jobs from "./job/reducer";

//API Key
import APIKey from "./apikey/reducer";

const rootReducer = combineReducers({
    // public
    Layout,
    Login,
    Account,
    ForgetPassword,
    Profile,
    Calendar,
    chat,
    Projects,
    Ecommerce,
    Tasks,
    changeNumber,
    Tickets,
    Invoice,
    Mailbox,
    DeviceReducer,
    DashboardProject,
    Team,
    FileManager,
    Todos,
    Jobs,
    APIKey
});

export default rootReducer;