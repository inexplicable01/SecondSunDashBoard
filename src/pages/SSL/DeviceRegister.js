import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Stepper, Step, StepLabel, TextField, Button, Container} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {Modal, CircularProgress, Select, MenuItem, FormControl, InputLabel,} from '@mui/material';
import {ports} from './DummyData';

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


const RegistrationWizard = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [serialNumber, setSerialNumber] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [startPort, setStartPort] = useState('');
    const [endPort, setEndPort] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleNext = () => {
        if (activeStep < 2) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                // navigate();
                navigate('/device-management', { state: { serialNumber, name, company, startPort, endPort } });

            }, 2000);  // Wait for 2 seconds before navigating
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div>
<div style={{ height: '20px' }}></div>
                    <TextField
                        fullWidth
                        label="Serial Number"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                    />
                    </div>
                );
            case 1:
                return (
                    <>
                        <div style={{ height: '20px' }}></div>
                        <TextField
                            fullWidth
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{marginBottom: '1rem'}}
                        />
                        <TextField
                            fullWidth
                            label="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </>
                );
            case 2:
    return (
        <>
            <div style={{ height: '20px' }}></div>
            <FormControl fullWidth style={{marginBottom: '1rem'}}>
                <InputLabel id="start-port-label">Choose Starting Port</InputLabel>
                <Select
                    labelId="start-port-label"
                    value={startPort}
                    onChange={(e) => setStartPort(e.target.value)}
                    label="Choose Starting Port"
                >
                    {ports.map(port => (
                        <MenuItem key={port} value={port} style={{ color: 'black' }}>
                            {port}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="end-port-label">Choose End Port</InputLabel>
                <Select
                    labelId="end-port-label"
                    value={endPort}
                    onChange={(e) => setEndPort(e.target.value)}
                    label="Choose End Port"
                >
                    {ports.map(port => (
                        <MenuItem key={port} value={port} style={{ color: 'black' }}>
                            {port}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
            default:
                return 'Unknown step';
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Register Your Devices" pageTitle="Devices"/>

                    <Stepper activeStep={activeStep} alternativeLabel>
                        <Step>
                            <StepLabel>Please Enter The Device Serial Number</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Enter Name & Company</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Enter Ports</StepLabel>
                        </Step>
                    </Stepper>
                    <div>
                        {getStepContent(activeStep)}
                        <Button variant="contained" color="primary" onClick={handleNext} style={{marginTop: '1rem'}}>
                            {activeStep === 2 ? 'Finish' : 'Next'}
                        </Button>
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
