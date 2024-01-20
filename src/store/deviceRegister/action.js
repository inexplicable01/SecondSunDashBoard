import {
  REGISTER_DEVICE,
  REGISTER_DEVICE_SUCCESSFUL,
  REGISTER_DEVICE_FAILED,

} from "./actionTypes"

export const registerDevice = (clientName, deviceDescription, deviceGroupID, deviceType, id,navigate) => {
  return {
    type: REGISTER_DEVICE,
    payload: {
                clientName: clientName,
                deviceDescription: deviceDescription,
                deviceGroupID: deviceGroupID,
                deviceType: deviceType,
                id:id
            },
      navigate: navigate
  }
}

export const registerDeviceSuccessful = (devicedata,navigate) => {
  return {
    type: REGISTER_DEVICE_SUCCESSFUL,
    payload: devicedata,
      navigate:navigate
  }
}

export const registerDeviceFailed = data => {
  return {
    type: REGISTER_DEVICE_FAILED,
    payload: data,
  }
}


