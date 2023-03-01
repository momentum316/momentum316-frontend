import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { Login } from "./LoginPage";

const PrivateRoute = ({ user, setUser, children, setUserToken }) => {
  return user ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
