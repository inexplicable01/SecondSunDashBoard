import React, {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Stepper, Step, StepLabel, TextField, Button, Container} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {Modal, CircularProgress, Select, MenuItem, FormControl, InputLabel,} from '@mui/material';
import {ports} from './Components/DummyData';
import {registerDevice, resetdevice} from "../../store/deviceRegister/action";
import {useDispatch, useSelector} from "react-redux"
import deviceRegisterReducer from "../../store/deviceRegister/reducer";

const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#90caf9'
        },
        text: {
            primary: '#fff', // Setting default text to white
            secondary: '#ccc', // For slightly muted text if needed
        },
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                InputLabelProps: {
                    style: {
                        color: '#fff', // white color for text labels

                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& $notchedOutline': {
                        borderColor: '#808080', // Adjust this color to your preferred shade of gray
                    },
                    '&:hover $notchedOutline': {
                        borderColor: '#fff', // white outline on hover
                    },
                    '&.Mui-focused $notchedOutline': {
                        borderColor: '#fff', // white outline when focused
                        backgroundColor: '#683333'
                    },

                },
            },
        },
        MuiStepLabel: {
            styleOverrides: {
                "root": {
                    "&.Mui-active": {
                        "color": "#fff !important"
                    }
                }
            },
        },
    },
});
const inputFieldStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '5px'
};
const inputStyle = {
    marginBottom: '15px',
};
const submitButtonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

const RegistrationWizard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {success} = useSelector(state=> ({
        success: state.deviceRegisterReducer.success,
    }))
    // const [activeStep, setActiveStep] = useState(0);


    //     const {user, loading, errormsg, validatedAPIKEY} = useSelector(state => ({
    //
    //     loading: state.Login.loading,
    //     errormsg: state.APIKey.errormsg,
    //     validatedAPIKEY: state.APIKey.apiKey
    // }));

    const [clientName, setClientName] = useState('register');
    const [deviceDescription, setDeviceDescription] = useState('Internal Test Device');
    const [deviceGroupID, setDeviceGroupID] = useState('admingroup');
    const [deviceType, setDeviceType] = useState('Pro1');
    const [deviceiccid, setDeviceiccid] = useState('89457300000013894228');

    // const [serialNumber, setSerialNumber] = useState('');
    // const [name, setName] = useState('');
    // const [company, setCompany] = useState('');
    // const [startPort, setStartPort] = useState('');
    // const [endPort, setEndPort] = useState('');
    const [loading, setLoading] = useState(false)
    // const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here, you can dispatch your action with the form data
        setLoading(true);

        dispatch(registerDevice(clientName, deviceDescription, deviceGroupID, deviceType, deviceiccid))
        setLoading(false)
    };

    useEffect(()=>{
        if (success){
          navigate('/dashboard')
            dispatch(resetdevice())

        }
    },[success, navigate,dispatch])
    return (
        <React.Fragment>
            <div className="page-content">
                <Container>
                    <BreadCrumb title="Register Your Devices" pageTitle="Devices"/>
                    <div style={{maxWidth: '500px', margin: '0 auto', padding: '20px', boxSizing: 'border-box'}}>
                        <form onSubmit={handleSubmit}>
                            <h2 style={{textAlign: 'center'}}>Device Registration Form</h2>

                            {/* Client Name Input */}
                            <div style={inputStyle}>
                                <label htmlFor="clientName">Client Name:</label>
                                <input
                                    type="text"
                                    id="clientName"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    style={inputFieldStyle}
                                />
                            </div>

                            {/* Device Description Input */}
                            <div style={inputStyle}>
                                <label htmlFor="deviceDescription">Device Description:</label>
                                <input
                                    type="text"
                                    id="deviceDescription"
                                    value={deviceDescription}
                                    onChange={(e) => setDeviceDescription(e.target.value)}
                                    style={inputFieldStyle}
                                />
                            </div>

                            {/* Device Group ID Input */}
                            <div style={inputStyle}>
                                <label htmlFor="deviceGroupID">Device Group ID:</label>
                                <input
                                    type="text"
                                    id="deviceGroupID"
                                    value={deviceGroupID}
                                    onChange={(e) => setDeviceGroupID(e.target.value)}
                                    style={inputFieldStyle}
                                />
                            </div>

                            {/* Device Type Input */}
                            <div style={inputStyle}>
                                <label htmlFor="deviceType">Device Type:</label>
                                <input
                                    type="text"
                                    id="deviceType"
                                    value={deviceType}
                                    onChange={(e) => setDeviceType(e.target.value)}
                                    style={inputFieldStyle}
                                />
                            </div>

                            {/* Device ICCID Input */}
                            <div style={inputStyle}>
                                <label htmlFor="deviceiccid">Device ICCID:</label>
                                <input
                                    type="text"
                                    id="deviceiccid"
                                    value={deviceiccid}
                                    onChange={(e) => setDeviceiccid(e.target.value)}
                                    style={inputFieldStyle}
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" style={submitButtonStyle}>
                                Register Device
                            </button>
                        </form>
                    </div>

                </Container>
            </div>

            <Modal
                open={loading}
                aria-labelledby="loading-modal-title"
                aria-describedby="loading-modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{background: '#fff', padding: '20px', borderRadius: '4px'}}>
                    <CircularProgress/>
                    <p id="loading-modal-description" style={{marginTop: '10px'}}>Loading...</p>
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default function StyledRegistrationWizard() {
    return (
        <ThemeProvider theme={darkTheme}>
            <RegistrationWizard/>
        </ThemeProvider>
    );
}
