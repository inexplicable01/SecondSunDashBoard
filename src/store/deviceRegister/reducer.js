import {
  REGISTER_DEVICE,
  REGISTER_DEVICE_SUCCESSFUL,
  REGISTER_DEVICE_FAILED,
} from "./actionTypes";

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false
};

const deviceRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_DEVICE:
      state = {
        ...state,
        loading: true,
        registrationError: null,
      };
      break;
    case REGISTER_DEVICE_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
        registrationError: null,
        navigate:action.navigate

      };
      // navigate('/')
      break;
    case REGISTER_DEVICE_FAILED:
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

export default deviceRegisterReducer;
