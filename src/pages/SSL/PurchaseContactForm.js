import React, {useState} from 'react';
import {Col, Container, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import prooftrackerpic from "../../assets/images/ProofTrackerPro.jpg";
const PurchaseContactForm = () => {
    document.title = "Purchase Device | Second Sun Node Device Dashboard";
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            textAlign: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        textarea: {
            width: '100%',
            height: '100px',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        button: {
            width: '150px',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
        },
        image: {
            maxWidth: '100%',
            height: '400px',
            marginBottom: '20px',
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement email sending logic here
        console.log(`Email: ${email}, Message: ${message}`);
        alert('Form submitted. Implement email sending logic.');
    };
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Purchase" pageTitle="Second Sun Labs"/>
                    <Row>
                        <Col xs={12}>
                            <div style={styles.container}>
                                <h1>Purchase Your Device</h1>
                                <img
                                    src={prooftrackerpic}
                                    alt="Device"
                                    style={styles.image}
                                />
                                <form onSubmit={handleSubmit} style={styles.form}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={styles.input}
                                    />
                                    <textarea
                                        placeholder="Your message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        style={styles.textarea}
                                    />
                                    <button type="submit" style={styles.button}>Contact Us</button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default PurchaseContactForm;