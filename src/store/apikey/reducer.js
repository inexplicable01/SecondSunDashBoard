import {
  API_KEY_RESPONSE_SUCCESS,
  API_KEY_RESPONSE_ERROR,
  GET_API_KEY,
} from "./actionType";

const INIT_STATE = {
  apiKey: null,
  errormsg:null
};

const APIKey = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_KEY_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_API_KEY:
          // action.payload.navigate('/dashboard')
          return {
            ...state,
            apiKey: action.payload.apikey,
          };
        default:
          return { ...state };
      }

    case API_KEY_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_API_KEY:
          return {
            ...state,
            errormsg: action.payload.error.message? action.payload.error.message: 'API key not incorrect',
          };

        default:
          return { ...state };
      }

    case GET_API_KEY: {
      return {
        ...state,
      };
    }

    default:
      return { ...state };
  }
};

export default APIKey;
