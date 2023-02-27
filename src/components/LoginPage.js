import jwtDecode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { Stack, TextField, Box } from "@mui/material";

export default function Login() {
  /*global google*/
  const [userCredential, setUserCredential] = useState(null);
  const handleCredentialResponse = (cred) => {
    setUserCredential(jwtDecode(cred.credential));
  };
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      callback: handleCredentialResponse,
    });
    google.accounts.id.prompt();
  };

  return <h1>Hello, Welcome to Congregate</h1>;
}
