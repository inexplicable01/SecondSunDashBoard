import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Stepper, Step, StepLabel, TextField, Button, Container} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {Modal, CircularProgress, Select, MenuItem, FormControl, InputLabel,} from '@mui/material';
import {ports} from './Components/DummyData';

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

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch your action here
    dispatchAction({ clientName, clientEmail });
  };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Register Your Devices" pageTitle="Devices"/>

                    <div style={{maxWidth: '500px', margin: '0 auto', padding: '20px', boxSizing: 'border-box'}}>
                        <form onSubmit={handleSubmit}>
                            <h2 style={{textAlign: 'center'}}>Registration Form</h2>
                            <div style={{marginBottom: '10px'}}>
                                <label htmlFor="clientName"
                                       style={{display: 'block', marginBottom: '5px'}}>Name:</label>
                                <input
                                    type="text"
                                    id="clientName"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                />
                            </div>
                            <div style={{marginBottom: '10px'}}>
                                <label htmlFor="clientEmail"
                                       style={{display: 'block', marginBottom: '5px'}}>Email:</label>
                                <input
                                    type="email"
                                    id="clientEmail"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                />
                            </div>
                            <button type="submit" style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                Register
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
