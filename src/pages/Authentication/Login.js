import React, {useEffect, useState} from 'react';
import {
    Card,
    CardBody,
    Col,
    Container,
    Input,
    Label,
    Row,
    Button,
    Form,
    FormFeedback,
    Alert,
    Spinner
} from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import {useSelector, useDispatch} from "react-redux";

import {Link} from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
// import { setAPIKEY } from "../../helpers/api_helper";


//Social Media Imports
import {GoogleLogin} from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// actions
import {loginUser, socialLogin, resetLoginFlag, loginWithAPIKkey, logoutUser} from "../../store/actions";

import logoLight from "../../assets/images/SSL/LEGACY_WEB_PNG.png";

//Import config
import {facebook, google} from "../../config";
import withRouter from '../../Components/Common/withRouter';
import APIKey from "../../store/apikey/reducer";
import {setAPIKEY as setvalidatedapikey} from "../../helpers/api_helper";

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, loading, errormsg, validatedAPIKEY} = useSelector(state => ({
        user: state.Account.user,
        loading: state.Login.loading,
        errormsg: state.APIKey.errormsg,
        validatedAPIKEY: state.APIKey.apiKey
    }));


    const [apikey, setAPIKEY] = useState(process.env.REACT_APP_XAPIKEY);
    // const [apikey, setAPIKEY] = useState();
    // const [passwordShow, setPasswordShow] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-body-image", "img-3");
        document.documentElement.setAttribute("data-layout-mode", "dark");
    }, []);


    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            apikey: apikey || '' || '',
            // password: userLogin.password || "123456" || '',
        },
        validationSchema: Yup.object({
            apikey: Yup.string().required("Please Enter your APIKEY"),
            // password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            // console.log(values)

            dispatch(loginWithAPIKkey(values.apikey));
        }
    });
    useEffect(() => {
        // console.log(validatedAPIKEY)
        if (validatedAPIKEY == null) {
            // If API key is present, navigate to the dashboard

        } else {
            setvalidatedapikey(validatedAPIKEY);
            navigate('/dashboard');
        }
    }, [validatedAPIKEY, navigate]);
    // const signIn = (res, type) => {
    //     if (type === "google" && res) {
    //         const postData = {
    //             name: res.profileObj.name,
    //             email: res.profileObj.email,
    //             token: res.tokenObj.access_token,
    //             idToken: res.tokenId,
    //         };
    //         dispatch(socialLogin(postData, props.router.navigate, type));
    //     } else if (type === "facebook" && res) {
    //         const postData = {
    //             name: res.name,
    //             email: res.email,
    //             token: res.accessToken,
    //             idToken: res.tokenId,
    //         };
    //         dispatch(socialLogin(postData, props.router.navigate, type));
    //     }
    // };

    //handleGoogleLoginResponse
    // const googleResponse = response => {
    //     signIn(response, "google");
    // };

    //handleTwitterLoginResponse
    // const twitterResponse = e => {}

    //handleFacebookLoginResponse
    // const facebookResponse = response => {
    //     signIn(response, "facebook");
    // };

    useEffect(() => {

        console.log('errormsg',errormsg)
        if (errormsg) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, errormsg]);

    document.title = "APIKey SignIn | Second Sun Node Device Dashboard";
    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="100"/>
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">SSL Dashboard</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4 card-bg-fill">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Second Sun Lab
                                                Dasboard.</p>
                                        </div>
                                        {errormsg && errormsg ? (<Alert color="danger"> {errormsg} </Alert>) : null}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="apikey" className="form-label">API KEY</Label>
                                                    <Input
                                                        name="apikey"
                                                        className="form-control"
                                                        placeholder="Enter APIKEY"
                                                        type="apikey"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        // value={validation.values.email || ""}
                                                        // invalid={
                                                        //     validation.touched.email && validation.errors.email ? true : false
                                                        // }
                                                    />
                                                    {/*{validation.touched.email && validation.errors.email ? (*/}
                                                    {/*    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>*/}
                                                    {/*) : null}*/}
                                                </div>

                                                {/*<div className="form-check">*/}
                                                {/*    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />*/}
                                                {/*    <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>*/}
                                                {/*</div>*/}

                                                <div className="mt-4">
                                                    <Button color="primary"
                                                            disabled={errormsg ? null : loading ? true : false}
                                                            className="btn btn-primary w-100" type="submit">
                                                        {errormsg ? null : loading ? <Spinner size="sm"
                                                                                           className='me-2'> Loading... </Spinner> : null}
                                                        Sign In
                                                    </Button>
                                                </div>
                                                {/*{errorMsg && (*/}
                                                {/*    <Alert color="danger">{errorMsg}</Alert>*/}
                                                {/*)}*/}

                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                {/*<div className="mt-4 text-center">*/}
                                {/*    <p className="mb-0">Don't have an account ? <Link to="/register" className="fw-semibold text-primary text-decoration-underline"> Signup </Link> </p>*/}
                                {/*</div>*/}

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);


// <div className="mb-3">
//     <div className="float-end">
//         <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
//     </div>
//     <Label className="form-label" htmlFor="password-input">Password</Label>
//     <div className="position-relative auth-pass-inputgroup mb-3">
//         <Input
//             name="password"
//             value={validation.values.password || ""}
//             type={passwordShow ? "text" : "password"}
//             className="form-control pe-5"
//             placeholder="Enter Password"
//             onChange={validation.handleChange}
//             onBlur={validation.handleBlur}
//             invalid={
//                 validation.touched.password && validation.errors.password ? true : false
//             }
//         />
//         {validation.touched.password && validation.errors.password ? (
//             <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
//         ) : null}
//         <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
//     </div>
// </div>

// <div className="mt-4 text-center">
//     <div className="signin-other-title">
//         <h5 className="fs-13 mb-4 title">Sign In with</h5>
//     </div>
//     {/*<div>*/}
//     {/*    <FacebookLogin*/}
//     {/*        appId={facebook.APP_ID}*/}
//     {/*        autoLoad={false}*/}
//     {/*        callback={facebookResponse}*/}
//     {/*        render={renderProps => (*/}
//     {/*            <Button color="primary"*/}
//     {/*                className="btn-icon me-1"*/}
//     {/*                onClick={renderProps.onClick}*/}
//     {/*            >*/}
//     {/*                <i className="ri-facebook-fill fs-16" />*/}
//     {/*            </Button>*/}
//     {/*        )}*/}
//     {/*    />*/}
//
//         {/*<GoogleLogin*/}
//         {/*    clientId={*/}
//         {/*        google.CLIENT_ID ? google.CLIENT_ID : ""*/}
//         {/*    }*/}
//         {/*    render={renderProps => (*/}
//         {/*        <Button color="danger"*/}
//         {/*            to="#"*/}
//         {/*            className="btn-icon me-1"*/}
//         {/*            onClick={renderProps.onClick}*/}
//         {/*        >*/}
//         {/*            <i className="ri-google-fill fs-16" />*/}
//         {/*        </Button>*/}
//         {/*    )}*/}
//         {/*    onSuccess={googleResponse}*/}
//         {/*    onFailure={() => {*/}
//
//         {/*    }}*/}
//         {/*/>*/}
//
//         {/*<Button color="dark" className="btn-icon"><i className="ri-github-fill fs-16"></i></Button>{" "}*/}
//         {/*<Button color="info" className="btn-icon"><i className="ri-twitter-fill fs-16"></i></Button>*/}
//     {/*</div>*/}
// </div>