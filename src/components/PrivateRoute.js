import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useLocalStorageState("CongregateToken", "");
  const navigate = useNavigate();
  return user ? children : navigate("/login");
};

export default PrivateRoute;
