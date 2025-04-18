import Authentication from "@/features/authentication/Authentication";
import React from "react";

const AuthenticationPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-full">
      <div className=" w-[80%] md:w-full h-[80%] md:col-start-2 bg-white  m-8 !my-auto mx-auto md:m-4 p-4 rounded-lg shadow-md">
        <Authentication />
      </div>
    </div>
  );
};

export default AuthenticationPage;
