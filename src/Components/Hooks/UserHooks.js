import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { getLoggedinUser } from "../../helpers/api_helper";
import APIKey from "../../store/apikey/reducer";

const useProfile = () => {
  // const userProfileSession = getLoggedinUser();
  // var token =
  // userProfileSession &&
  // userProfileSession["token"];
  // const [loading, setLoading] = useState(userProfileSession ? false : true);
  // const [userProfile, setUserProfile] = useState(
  //   userProfileSession ? userProfileSession : null
  // );
        const {xapikey} = useSelector(state => ({
            xapikey: state.APIKey.apiKey,
        }));


  useEffect(() => {
    // const userProfileSession = getLoggedinUser();
    // var token =
    //   userProfileSession &&
    //   userProfileSession["token"];
    // setUserProfile(userProfileSession ? userProfileSession : null);
    // setLoading(token ? false : true);
  }, [xapikey]);


  return { xapikey };
};

export { useProfile };