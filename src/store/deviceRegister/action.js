import {
  REGISTER_DEVICE,
  REGISTER_DEVICE_SUCCESSFUL,
  REGISTER_DEVICE_FAILED,
REGISTER_DEVICE_RESET
} from "./actionTypes"

export const registerDevice = (clientName, deviceDescription, deviceGroupID, deviceType, id) => {
  return {
    type: REGISTER_DEVICE,
    payload: {
                clientName: clientName,
                deviceDescription: deviceDescription,
                deviceGroupID: deviceGroupID,
                deviceType: deviceType,
                id:id
            },
  }
}

export const registerDeviceSuccessful = (devicedata) => {
  return {
    type: REGISTER_DEVICE_SUCCESSFUL,
    payload: devicedata
  }
}

export const registerDeviceFailed = data => {
  return {
    type: REGISTER_DEVICE_FAILED,
    payload: data,
  }
}

export const resetdevice = ()=>{
      return {
    type: REGISTER_DEVICE_RESET,

  }
}


