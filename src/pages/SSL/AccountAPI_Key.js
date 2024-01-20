import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Stepper, Step, StepLabel, TextField, Button, Container} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {Modal, CircularProgress, Select, MenuItem, FormControl, InputLabel,} from '@mui/material';
import {ports} from './Components/DummyData';
import {registerAccount} from "../../store/auth/registerAccount/action";
import {useDispatch} from "react-redux"

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

const AccountRegister= () => {
    const dispatch = useDispatch()
    // const [activeStep, setActiveStep] = useState(0);

    const [clientName, setClientName] = useState('Waichak');
    const [clientEmail, setClientEmail] = useState('waichak.luk@gmail.com');


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

        dispatch(registerAccount(clientName, clientEmail))
        setLoading(false)
    };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container>

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

export default function StyledAccountRegistrationWizard() {
    return (
        <ThemeProvider theme={darkTheme}>
            <AccountRegister/>
        </ThemeProvider>
    );
}
