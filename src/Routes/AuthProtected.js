import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization,setAPIKEY } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../store/actions";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { xapikey} = useProfile();

  useEffect(() => {
    console.log('apiey haschanged')
  // }
  //
    if (xapikey == null) {
      dispatch(logoutUser());
      //

    } else{
      setAPIKEY(xapikey);
    }

    //     if (userProfile && !loading && token) {Complex check useprofile logic could be usefull later
    //   setAPIKEY(xapikey);
    //
    // } else if (!userProfile && loading && !token) {
    //   dispatch(logoutUser());
    // }
  }, [xapikey, dispatch]);

  /*
    Navigate is un-auth access protected routes via url
    */

  // if (!userProfile && loading && !token) {
  if (xapikey == null) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };