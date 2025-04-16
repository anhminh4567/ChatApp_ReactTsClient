import Login from "@/features/login/Login";
import Register from "@/features/register/Register";
import React from "react";

const AuthenticationPage = () => {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="left col-span-1 ">
        <Login />{" "}
      </div>
      <div className="right col-span-1">
        <Register />{" "}
      </div>
    </div>
  );
};

export default AuthenticationPage;
