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

export default function Login({ setUser, setUserToken }) {
  /*global google*/
  const [userCredential, setUserCredential] = useState(null);
  const handleCredentialResponse = (cred) => {
    setUser(jwtDecode(cred.credential));
    let credential = jwtDecode(cred.credential);
    console.log(credential);
    axios
      .post(`http://congregate.herokuapp.com/login`, {
        email: credential.email,
        first_name: credential.given_name,
        last_name: credential.family_name,
      })
      .then((res) => {
        console.log(res.data);
        setUserToken(res.data.token);
      });
  };
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      callback: handleCredentialResponse,
    });
    google.accounts.id.prompt();
  };

  return (
    <div>
      <LogoCard />
    </div>
  );
}
