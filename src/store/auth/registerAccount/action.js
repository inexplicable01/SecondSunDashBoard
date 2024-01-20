import {
  REGISTER_ACCOUNT,
  REGISTER_ACCOUNT_SUCCESSFUL,
  REGISTER_ACCOUNT_FAILED,

} from "./actionTypes"

export const registerAccount = (clientName, clientEmail) => {
  return {
    type: REGISTER_ACCOUNT,
    payload: { clientName, clientEmail },
  }
}

export const registerAccountSuccessful = user => {
  return {
    type: REGISTER_ACCOUNT_SUCCESSFUL,
    payload: user,
  }
}

export const registerAccountFailed = user => {
  return {
    type: REGISTER_ACCOUNT_FAILED,
    payload: user,
  }
}


