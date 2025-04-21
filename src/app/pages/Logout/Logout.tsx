import { useUserContext } from "@/context/useUserContext";
import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Navigate } from "react-router";

const Logout = () => {
  const { removeUser } = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  useEffect(() => {
    removeUser()
      .then(() => {
        console.log("User logged out successfully");
        setIsLoggedOut(true);
      })
      .catch((error) => {
        console.error("Error logging out user:", error);
        setIsLoggedOut(true);
      });
  }, [removeUser]);

  if (isLoggedOut) {
    return <Navigate to={"/security"} />;
  }
};

export default Logout;
