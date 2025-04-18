import { useUserContext } from "@/context/useUserContext";
import React from "react";
import { useAuth } from "react-oidc-context";
import { Navigate } from "react-router";

const Logout = () => {
  const { removeUser } = useAuth();
  removeUser();
  return <Navigate to={"/security"} />;
};

export default Logout;
