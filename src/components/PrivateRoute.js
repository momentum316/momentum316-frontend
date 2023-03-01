import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { Login } from "./LoginPage";

const PrivateRoute = ({ user, setUser, children, setUserToken }) => {
  return user ? (
    children
  ) : (
    <Login setUser={setUser} setUserToken={setUserToken} />
  );
};

export default PrivateRoute;
