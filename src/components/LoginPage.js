import jwtDecode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Grid,
} from "@mui/material";
import { LogoCard } from "./NoteCards";

import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export function Login({ setUser, setUserToken }) {
  /*global google*/
  const navigate = useNavigate();
  const [userCredential, setUserCredential] = useState(null);

  const errorMessage = (error) => {
    console.log(error);
  };
  const handleCredentialResponse = (cred) => {
    setUser(jwtDecode(cred.credential));
    let credential = jwtDecode(cred.credential);
    console.log(credential);
    axios
      .post(`http://congregate.herokuapp.com/login`, {
        email: credential.email,
        username: `${credential.given_name}_${credential.family_name}`,
        first_name: credential.given_name,
        last_name: credential.family_name,
        avatar: credential.picture,
      })
      .then((res) => {
        console.log(res.data);
        setUserToken(res.data.token);
        setUser(res.data);
        navigate(`/home/${res.data.user.username}`);
      });
  };

  // window.onload = function () {
  //   google.accounts.id.initialize({
  //     client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
  //     callback: handleCredentialResponse,
  //   });
  //   google.accounts.id.prompt((notification) => {
  //     if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
  //       // try next provider if OneTap is not displayed or skipped
  //     }
  //   });
  // };

  return (
    <div>
      <Stack direction='column' justifyContent='center' alignItems='center'>
        <LogoCard />
        <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={errorMessage}
          size='large'
        />
      </Stack>
    </div>
  );
}

export function MidRegistration() {}
