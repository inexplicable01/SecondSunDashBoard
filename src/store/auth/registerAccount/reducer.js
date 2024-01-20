import {
  REGISTER_ACCOUNT,
  REGISTER_ACCOUNT_SUCCESSFUL,
  REGISTER_ACCOUNT_FAILED,
} from "./actionTypes";

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  ACCOUNT_API_KEY:null,
  user: null,
  success: false,
  error: false
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ACCOUNT:
      state = {
        ...state,
        loading: true,
        registrationError: null,
      };
      break;
    case REGISTER_ACCOUNT_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
        registrationError: null,
ACCOUNT_API_KEY:action.ACCOUNT_API_KEY
      };
      break;
    case REGISTER_ACCOUNT_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
        error: true
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default AccountReducer;
